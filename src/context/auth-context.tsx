'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useUser, useAuth as useFirebaseAuth, useFirestore } from '@/firebase';
import type { User as FirebaseUser } from 'firebase/auth';
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import {
  initiateEmailSignIn,
  initiateEmailSignUp,
} from '@/firebase/non-blocking-login';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc } from 'firebase/firestore';

type User = {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  loginWithGoogle: () => void;
  logout: () => void;
  signup: (email: string, password: string, name: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user: firebaseUser, isUserLoading } = useUser();
  const auth = useFirebaseAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (firebaseUser) {
      // Create user profile in Firestore if it doesn't exist
      const userRef = doc(firestore, 'userProfiles', firebaseUser.uid);
      setDocumentNonBlocking(
        userRef,
        {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        },
        { merge: true }
      );
      
      setUser({
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      });
    } else {
      setUser(null);
    }
  }, [firebaseUser, firestore]);

  const login = (email: string, password: string) => {
    initiateEmailSignIn(auth, email, password);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(error => {
      // This error occurs when the user closes the popup.
      // It's a common user action and not a bug, so we can safely ignore it.
      if (
        error.code === 'auth/cancelled-popup-request' ||
        error.code === 'auth/popup-closed-by-user'
      ) {
        return;
      }
      console.error('Google sign-in error', error);
    });
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await initiateEmailSignUp(auth, email, password);
      if (userCredential && userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        // The useEffect hook will handle creating the firestore doc
        // and setting the user state.
      }
    } catch (error) {
      console.error('Sign up error', error);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isUserLoading,
        login,
        loginWithGoogle,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

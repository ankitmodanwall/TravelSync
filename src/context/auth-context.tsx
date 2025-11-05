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
  createUserWithEmailAndPassword,
} from 'firebase/auth';
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
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
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

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error', error);
      // Optionally re-throw or handle specific errors for UI feedback
      throw error;
    }
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential && userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        
        // Manually update the local user state to trigger redirects faster
        const updatedUser = userCredential.user;
        setUser({
          uid: updatedUser.uid,
          name: updatedUser.displayName,
          email: updatedUser.email,
          photoURL: updatedUser.photoURL,
        });

        // The useEffect will also run to sync firestore, but this state update is faster.
      }
    } catch (error) {
      console.error('Sign up error', error);
      throw error;
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

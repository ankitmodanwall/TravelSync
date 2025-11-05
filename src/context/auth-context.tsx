'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser, useAuth as useFirebaseAuth } from '@/firebase';
import type { User as FirebaseUser } from 'firebase/auth';
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  initiateEmailSignIn,
  initiateEmailSignUp,
} from '@/firebase/non-blocking-login';

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (firebaseUser) {
      setUser({
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      });
    } else {
      setUser(null);
    }
  }, [firebaseUser]);

  const login = (email: string, password: string) => {
    initiateEmailSignIn(auth, email, password);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(error => {
      // This error occurs when the user closes the popup.
      // It's a common user action and not a bug, so we can safely ignore it.
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        return;
      }
      console.error("Google sign-in error", error);
    });
  };

  const signup = (email: string, password: string, name: string) => {
    // The `initiateEmailSignUp` function doesn't currently handle setting the display name.
    // This will be addressed in a subsequent step.
    initiateEmailSignUp(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading: isUserLoading, login, loginWithGoogle, logout, signup }}
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

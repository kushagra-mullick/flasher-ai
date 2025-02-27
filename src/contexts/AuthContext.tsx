import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
  multiFactor,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator
} from 'firebase/auth';
import { auth, googleProvider, isConfigured } from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  isConfigured: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
  setupTwoFactorAuth: (phoneNumber: string) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isConfigured) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signUp(email: string, password: string, displayName: string) {
    if (!isConfigured) {
      throw new Error('Firebase is not properly configured. Please check your environment variables.');
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
      await sendEmailVerification(user);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async function login(email: string, password: string) {
    if (!isConfigured) {
      throw new Error('Firebase is not properly configured. Please check your environment variables.');
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    if (!isConfigured) {
      throw new Error('Firebase is not properly configured. Please check your environment variables.');
    }
    return signInWithPopup(auth, googleProvider);
  }

  async function logout() {
    if (!isConfigured) {
      setCurrentUser(null);
      return;
    }
    return signOut(auth);
  }

  async function resetPassword(email: string) {
    if (!isConfigured) {
      throw new Error('Firebase is not properly configured. Please check your environment variables.');
    }
    return sendPasswordResetEmail(auth, email);
  }

  async function updateUserProfile(displayName: string, photoURL?: string) {
    if (!currentUser || !isConfigured) {
      throw new Error('No user logged in or Firebase is not properly configured');
    }
    return updateProfile(currentUser, { displayName, photoURL });
  }

  async function verifyEmail() {
    if (!currentUser || !isConfigured) {
      throw new Error('No user logged in or Firebase is not properly configured');
    }
    return sendEmailVerification(currentUser);
  }

  async function setupTwoFactorAuth(phoneNumber: string) {
    if (!currentUser || !isConfigured) {
      throw new Error('No user logged in or Firebase is not properly configured');
    }
    
    // This is a simplified version - in a real app, you'd need to handle verification codes
    const multiFactorSession = await multiFactor(currentUser).getSession();
    
    // Phone auth provider
    const phoneInfoOptions = {
      phoneNumber,
      session: multiFactorSession
    };
    
    const phoneAuthProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, multiFactor(currentUser));
    
    // In a real app, you'd prompt the user for the verification code here
    // and then complete enrollment with:
    // const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
    // await multiFactor(currentUser).enroll(PhoneMultiFactorGenerator.assertion(cred), "Phone number");
    
    return verificationId;
  }

  const value = {
    currentUser,
    isLoading,
    isConfigured,
    signUp,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    verifyEmail,
    setupTwoFactorAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
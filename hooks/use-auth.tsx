"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

import { auth, isFirebaseConfigured } from "@/lib/firebase";

interface AuthContextValue {
  /** The signed-in user, or null when signed out / not configured. */
  user: User | null;
  /** True until the initial auth state has resolved. */
  loading: boolean;
  /** Whether Firebase is configured at all (else auth is unavailable). */
  configured: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const NOT_CONFIGURED = new Error(
  "Authentication is not available. Add your Firebase config to enable sign in.",
);

/** Turn a Firebase auth error code into a friendly, user-facing message. */
export function authErrorMessage(error: unknown): string {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code: unknown }).code)
      : "";
  switch (code) {
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}

/**
 * Provides Firebase auth state and actions to the app. When Firebase isn't
 * configured, `user` stays null and the actions reject, so callers can degrade
 * to localStorage-only mode.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    // Keep the session across reloads.
    void setPersistence(auth, browserLocalPersistence).catch(() => {});
    const unsubscribe = onAuthStateChanged(auth, (nextUser: User | null) => {
      setUser(nextUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured: isFirebaseConfigured,
      signInWithEmail: async (email, password) => {
        if (!auth) throw NOT_CONFIGURED;
        await signInWithEmailAndPassword(auth, email, password);
      },
      signUpWithEmail: async (name, email, password) => {
        if (!auth) throw NOT_CONFIGURED;
        const credential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        if (name.trim()) {
          await updateProfile(credential.user, { displayName: name.trim() });
        }
      },
      signInWithGoogle: async () => {
        if (!auth) throw NOT_CONFIGURED;
        await signInWithPopup(auth, new GoogleAuthProvider());
      },
      logout: async () => {
        if (!auth) return;
        await signOut(auth);
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Access the auth context. Must be used within `AuthProvider`. */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Firebase client initialisation.
 *
 * All config comes from `NEXT_PUBLIC_FIREBASE_*` env vars (see
 * `.env.local.example`). These keys are public by design — access is guarded by
 * Firestore security rules, not by secrecy.
 *
 * The app is fully usable without any Firebase config: when the env vars are
 * absent, `auth`/`db` are `undefined` and the app runs in localStorage-only
 * mode. Every consumer must therefore null-check these exports.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** Whether the minimum required Firebase config is present. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

let firebaseApp: FirebaseApp | undefined;
let firebaseAuth: Auth | undefined;
let firestore: Firestore | undefined;

if (isFirebaseConfigured) {
  firebaseApp = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig as Record<string, string>);
  firebaseAuth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);
}

export const auth = firebaseAuth;
export const db = firestore;

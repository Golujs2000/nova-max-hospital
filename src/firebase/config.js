// ─────────────────────────────────────────────────────────────
// firebase/config.js
// Initialises the Firebase app and exports service instances.
// All credentials are pulled from .env via VITE_ prefixed vars
// so they are never hard-coded in source control.
// ─────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

// Firebase project configuration (values injected at build time)
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialise the Firebase app (singleton)
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)           // Firebase Authentication
export const db = getFirestore(app)        // Firestore database
export const storage = getStorage(app)     // Cloud Storage for images/files

// Analytics is only available in browser environments (not SSR/Node)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

export default app

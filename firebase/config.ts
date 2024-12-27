import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { initializeFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxT6tOfsPgH7NOjtOvMy2zO53Bae5bm3c",
  authDomain: "base-de-ia-26.firebaseapp.com",
  projectId: "base-de-ia-26",
  storageBucket: "base-de-ia-26.firebasestorage.app",
  messagingSenderId: "226788546876",
  appId: "1:226788546876:web:bca6e689f2f8cb053ba639"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore with optimized settings
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  ignoreUndefinedProperties: true
});

// Initialize Auth
export const auth = getAuth(app);

// Connect to emulators in development
if (import.meta.env.DEV) {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
  } catch (err) {
    console.warn('Error connecting to emulators:', err);
  }
}
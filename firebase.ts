import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxT6tOfsPgH7NOjtOvMy2zO53Bae5bm3c",
  authDomain: "base-de-ia-26.firebaseapp.com",
  projectId: "base-de-ia-26",
  storageBucket: "base-de-ia-26.firebasestorage.app",
  messagingSenderId: "226788546876",
  appId: "1:226788546876:web:bca6e689f2f8cb053ba639"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with settings
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// Enable offline persistence
try {
  enableIndexedDbPersistence(db);
} catch (err) {
  console.error('Firebase persistence error:', err);
}

// Initialize other Firebase services
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, db, storage };
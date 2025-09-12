// Firebase initialization and exports
import { initializeApp } from "firebase/app";
// Auth functions and types (re-exported for convenience)
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  signInWithPopup,
  type User as FirebaseUser,
} from "firebase/auth";
// Firestore helpers (re-exported)
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBltuQHkqAKprB_Ifs4G7OcnPah1jcrYk",
  authDomain: "aaranya-jharkhand-c8976.firebaseapp.com",
  projectId: "aaranya-jharkhand-c8976",
  storageBucket: "aaranya-jharkhand-c8976.firebasestorage.app",
  messagingSenderId: "773816492037",
  appId: "1:773816492037:web:b787fd519bef7e285d7c6c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth and Firestore exports
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Providers
export const googleProvider = new GoogleAuthProvider();

// Re-export common auth functions/types so other files can import from this module
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  firebaseUpdateProfile,
  signInWithPopup,
};

export type { FirebaseUser };

// Re-export Firestore helpers
export { doc, setDoc, getDoc, serverTimestamp, updateDoc };

export default app;

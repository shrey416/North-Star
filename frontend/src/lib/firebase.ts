import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDXopWZNli9AktwpqBGZGA6uMOunK_utvA",
  authDomain: "north-star-3d114.firebaseapp.com",
  projectId: "north-star-3d114",
  storageBucket: "north-star-3d114.firebasestorage.app",
  messagingSenderId: "740266100852",
  appId: "1:740266100852:web:031c639826c51e51a2a921"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
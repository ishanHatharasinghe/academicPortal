// src/firebase.js
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAChUDGJ4tQf6aiEFLG_2wrD2Tvb06BwO8",
  authDomain: "mylms-a7420.firebaseapp.com",
  projectId: "mylms-a7420",
  storageBucket: "mylms-a7420.appspot.com",
  messagingSenderId: "1099033221621",
  appId: "1:1099033221621:web:95dd6d12fef58c62b4e8bc",
  measurementId: "G-TLRXVTBHBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
    auth, createUserWithEmailAndPassword, googleProvider, signInWithEmailAndPassword, signInWithPopup, signOut
};

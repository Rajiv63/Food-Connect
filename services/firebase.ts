// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_UuRZV0DAe8bsKJV2uowoi1r2HUy4GoY",
  authDomain: "food-connect-bee03.firebaseapp.com",
  projectId: "food-connect-bee03",
  storageBucket: "food-connect-bee03.firebasestorage.app",
  messagingSenderId: "229187535654",
  appId: "1:229187535654:web:fc352b82b9dda95fec37e7",
  measurementId: "G-T6CCCPDWLZ",
  databaseUrl:"https://food-connect-bee03-default-rtdb.firebaseio.com",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
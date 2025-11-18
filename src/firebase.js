// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyASCFQLeQpHEcbxFnLyzRevT8XXYX0urj8",
    authDomain: "jojo-d6db1.firebaseapp.com",
    projectId: "jojo-d6db1",
    storageBucket: "jojo-d6db1.firebasestorage.app",
    messagingSenderId: "100279086096",
    appId: "1:100279086096:web:4160ce0a5e7ae92b902e95",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

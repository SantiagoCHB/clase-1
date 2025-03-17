// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Para Firestore (opcional)

const firebaseConfig = {
    apiKey: "AIzaSyCud50rye6yRiPkAJapUnAa4q98G04ft-U",
    authDomain: "clase-1-33e5c.firebaseapp.com",
    projectId: "clase-1-33e5c",
    storageBucket: "clase-1-33e5c.firebasestorage.app",
    messagingSenderId: "1087158860772",
    appId: "1:1087158860772:web:025c91d2a35071a805e5f1"
  };
  
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Si usas Firestore

export { db }; // Exportar si es necesario

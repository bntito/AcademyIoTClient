import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

/* Configuración del proyecto */
const firebaseConfig = {
  apiKey: "AIzaSyBOBjU4WZnLpzIykt-WaxQ-fHU_PG0nGWA",
  authDomain: "iotacademy-8d744.firebaseapp.com",
  projectId: "iotacademy-8d744",
  storageBucket: "iotacademy-8d744.appspot.com",
  messagingSenderId: "622551065502",
  appId: "1:622551065502:web:a58adbf1108e7aab26ec8f"
};

// Initializar Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const auth = getAuth(app);
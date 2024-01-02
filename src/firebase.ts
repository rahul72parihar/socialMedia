// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABZPITXSjIFCFgvAv7FR8R8ConkKvGgY0",
  authDomain: "socialmediaapp-623c1.firebaseapp.com",
  projectId: "socialmediaapp-623c1",
  storageBucket: "socialmediaapp-623c1.appspot.com",
  messagingSenderId: "897467652755",
  appId: "1:897467652755:web:f7f9f4b730376333cc8b66",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db: any = getFirestore(app);
export const storage = getStorage(app);

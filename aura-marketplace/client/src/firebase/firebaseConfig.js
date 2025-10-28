// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNnbV9-5XLyyVEBpw7hXM474kJh_vjjC8",
  authDomain: "balama-55eef.firebaseapp.com",
  projectId: "balama-55eef",
  storageBucket: "balama-55eef.firebasestorage.app",
  messagingSenderId: "813525407253",
  appId: "1:813525407253:web:89c340bf813ced49b2e01c",
  measurementId: "G-2P0SYEL0S8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Export the app instance for potential reuse
export default app;
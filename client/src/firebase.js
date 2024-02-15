// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-app-35886.firebaseapp.com",
  projectId: "mern-app-35886",
  storageBucket: "mern-app-35886.appspot.com",
  messagingSenderId: "532098393731",
  appId: "1:532098393731:web:203841672fbbed02cdddb6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
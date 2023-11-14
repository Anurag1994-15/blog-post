// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLo1g_E7sw8Mb9Y3IjL6rXrrpQAkXI0Ik",
  authDomain: "blog-6c989.firebaseapp.com",
  projectId: "blog-6c989",
  storageBucket: "blog-6c989.appspot.com",
  messagingSenderId: "603334740093",
  appId: "1:603334740093:web:0099ffab21835569064914",
  measurementId: "G-89V30C8GLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export const db=getFirestore(app)
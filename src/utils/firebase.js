// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw2s-ioYgawg-k2S8aqrrjY10RXZRwXRg",
  authDomain: "netflixgpt-93b41.firebaseapp.com",
  projectId: "netflixgpt-93b41",
  storageBucket: "netflixgpt-93b41.appspot.com",
  messagingSenderId: "252403480333",
  appId: "1:252403480333:web:3d074b22776127264e6244",
  measurementId: "G-F99567CRE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
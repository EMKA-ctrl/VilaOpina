// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaCJRgDcxUN7rEDwESwk8ByECuD0JzeC0",
  authDomain: "autoads-1006a.firebaseapp.com",
  projectId: "autoads-1006a",
  storageBucket: "autoads-1006a.firebasestorage.app",
  messagingSenderId: "825520274800",
  appId: "1:825520274800:web:8bd708eb0def9786b863b5",
  measurementId: "G-34PNX93MV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
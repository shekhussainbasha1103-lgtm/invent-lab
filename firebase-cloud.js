// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7-RiyazikjV_8yqptPFWFHcRRPGCZZBM",
  authDomain: "inventlab-pro.firebaseapp.com",
  projectId: "inventlab-pro",
  storageBucket: "inventlab-pro.firebasestorage.app",
  messagingSenderId: "175048317391",
  appId: "1:175048317391:web:35cf50fe0c8ee224d1daba",
  measurementId: "G-DVXLDKDS1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

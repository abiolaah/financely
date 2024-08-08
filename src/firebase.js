// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDizQcdS4SsaUJiP3B3RG8xaQIGEP4h8_4",
  authDomain: "financely-50da2.firebaseapp.com",
  projectId: "financely-50da2",
  storageBucket: "financely-50da2.appspot.com",
  messagingSenderId: "260807450916",
  appId: "1:260807450916:web:695e2cb3bb47aeab8093b1",
  measurementId: "G-1XVXKLXVLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
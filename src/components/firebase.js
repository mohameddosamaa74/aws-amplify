// Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth"
// import "firebase/compat/firestore"
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBkc0zHZGyxap89jSoRcNywaWo8MssxVZY",
  authDomain: "Connect-asl.site",
  projectId: "connect-be9f5",
  storageBucket: "connect-be9f5.appspot.com",
  messagingSenderId: "792973719285",
  appId: "1:792973719285:web:9b0cad929a4efa6d4a77bc",
  measurementId:"G-JLG4BXWN2W"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
const authentication =getAuth(app)
export default authentication;

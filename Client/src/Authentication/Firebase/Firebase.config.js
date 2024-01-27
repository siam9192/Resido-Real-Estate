// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM9oynz7exHpu62bTVlTiM8UUAj-KaMuQ",
  authDomain: "find-house-f6fad.firebaseapp.com",
  projectId: "find-house-f6fad",
  storageBucket: "find-house-f6fad.appspot.com",
  messagingSenderId: "175584841973",
  appId: "1:175584841973:web:267f05a5735d676a64f5bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth
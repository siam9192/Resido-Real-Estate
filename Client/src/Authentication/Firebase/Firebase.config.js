// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyASC33EE1vPg8cfL9IRNrdeNzCwZneDrFk",

  authDomain: "resido-real-state-9878.firebaseapp.com",

  projectId: "resido-real-state-9878",

  storageBucket: "resido-real-state-9878.appspot.com",

  messagingSenderId: "471740266847",

  appId: "1:471740266847:web:5a5f1afbb64dfc654d5eea"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth
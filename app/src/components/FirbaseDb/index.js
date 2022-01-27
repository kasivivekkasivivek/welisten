// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6w2KnAMpcWF8FbHeYO8tj01Z5tGQC15A",
  authDomain: "welisten-sample.firebaseapp.com",
  projectId: "welisten-sample",
  storageBucket: "welisten-sample.appspot.com",
  messagingSenderId: "16933173700",
  appId: "1:16933173700:web:ada591b8fd66166d3ecc91",
  measurementId: "G-Q275XXGXEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
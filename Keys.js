// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy-K1taX2iNIuaocjSxV_XA3Bq7xNS15w",
  authDomain: "civconnect.firebaseapp.com",
  projectId: "civconnect",
  storageBucket: "civconnect.appspot.com",
  messagingSenderId: "835314540645",
  appId: "1:835314540645:web:0b8fa50d7ad969903b668c",
  measurementId: "G-J8FPK50CHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
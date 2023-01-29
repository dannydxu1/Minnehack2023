import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebaseConfig } from "./Keys.js"

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
export default firebase;

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

// // Initialize Cloud Firestore through Firebase
// firebase.initializeApp({
//   apiKey: "AIzaSyBy-K1taX2iNIuaocjSxV_XA3Bq7xNS15w",
//   authDomain: "civconnect.firebaseapp.com",
//   projectId: "civconnect"
// });

//var db = firebase.firestore();

var menu = [
  {
    "id": 1,
    "name": "Focaccia al rosmarino",
    "description": "Wood fired rosemary and garlic focaccia",
    "price": 8.50,
    "type": "Appetizers"
  },
  {
    "id": 2,
    "name": "Burratta con speck",
    "description": "Burratta cheese, imported smoked prok belly prosciutto, pached balsamic pear",
    "price": 13.50,
    "type": "Appetizers"
  }
]

const registerWithUsernameAndPassword = async (username, password) => {
  var retVal = null;
  try {
    const res = await auth.createUserWithEmailAndPassword(username, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      authProvider: "local",
      username,
      password,
    });
  } catch (err) {
    retVal = err.message;
  }
  return retVal;
};

menu.forEach(function (obj) {
  db.collection("menu").add({
    id: obj.id,
    name: obj.name,
    description: obj.description,
    price: obj.price,
    type: obj.type
  }).then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});

export {
  db
};
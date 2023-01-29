import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc } from "firebase/firestore";

//Setting up db
const firebaseConfig = {
  apiKey: "AIzaSyBy-K1taX2iNIuaocjSxV_XA3Bq7xNS15w",
  authDomain: "civconnect.firebaseapp.com",
  projectId: "civconnect",
  storageBucket: "civconnect.appspot.com",
  messagingSenderId: "835314540645",
  appId: "1:835314540645:web:0b8fa50d7ad969903b668c",
  measurementId: "G-J8FPK50CHZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//adding things to it: (now need to read json file & parse contents to read)
const addData = async (x, y, z) => {
  try {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: x,
        last: y,
        born: z
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } catch (err) {
    console.log("Error with the |add data| function: ", err.message);
  }
}

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Sameen",
    last: "Rahman",
    born: 2004
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

/*
Plan:
Learn to add things to db (eventually take on json docs)
Then learn to retrieve specific data (ezier for front-end)
*/
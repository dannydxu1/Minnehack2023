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
      //parse the json file to extract the data & feed it into 
      const docRef = await addDoc(collection(db, "users"), {
        bio: x,
        info: y,
        party: z
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } catch (err) {
    console.log("Error with the |add data| function: ", err.message);
  }
}

addData("Sameen", "Rahman", "2004");
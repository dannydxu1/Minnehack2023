import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

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
const addData = async (bio, info, party) => {
  try {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        x: bio,
        y: info,
        z: party
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } catch (err) {
    console.log("Error with the |add data| function: ", err.message);
  }
}


const getBio = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

const getInfo = async () => {

}
const getParty = async () => {

}

export {
  addData
};
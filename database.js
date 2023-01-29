import { initializeApp } from "firebase/app";
<<<<<<< Updated upstream:database.js
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
=======
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
} from "firebase/firestore";
>>>>>>> Stashed changes:sto.js

//Setting up db
const firebaseConfig = {
  apiKey: "AIzaSyBy-K1taX2iNIuaocjSxV_XA3Bq7xNS15w",
  authDomain: "civconnect.firebaseapp.com",
  projectId: "civconnect",
  storageBucket: "civconnect.appspot.com",
  messagingSenderId: "835314540645",
  appId: "1:835314540645:web:0b8fa50d7ad969903b668c",
  measurementId: "G-J8FPK50CHZ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//adding things to it: (now need to read json file & parse contents to read)
<<<<<<< Updated upstream:database.js
const addData = async (bio, info, party) => {
  try {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        x: bio,
        y: info,
        z: party
=======
// const addData = async (x, y, z) => {
//   try {
//     try {
//       //parse the json file to extract the data & feed it into
//       const docRef = await addDoc(collection(db, "users"), {
//         bio: x,
//         info: y,
//         party: z,
//       });
//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   } catch (err) {
//     console.log("Error with the |add data| function: ", err.message);
//   }
// };

async function addData(x, y, z) {
  try {
    try {
      //parse the json file to extract the data & feed it into
      const docRef = await addDoc(collection(db, "users"), {
        bio: x,
        info: y,
        party: z,
>>>>>>> Stashed changes:sto.js
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } catch (err) {
    console.log("Error with the |add data| function: ", err.message);
  }
}

<<<<<<< Updated upstream:database.js

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
=======
async function getBio() {
  try {
    try {
      //parse the json file to extract the data & feed it into
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data().bio}`);
        const bioData = doc.data().bio
        return bioData
      });
    } catch (e) {
      console.error("Error accessing document: ", e);
    }
  } catch (err) {
    console.log("Error with the |access data| function: ", err.message);
  }
}

async function getInfo() {
  try {
    try {
      //parse the json file to extract the data & feed it into
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        const infoData = doc.data().info;
        return infoData
      });
    } catch (e) {
      console.error("Error accessing document: ", e);
    }
  } catch (err) {
    console.log("Error with the |access data| function: ", err.message);
  }
}

async function getParty() {
  try {
    try {
      //parse the json file to extract the data & feed it into
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        const partyData = doc.data().party;
        return partyData
      });
    } catch (e) {
      console.error("Error accessing document: ", e);
    }
  } catch (err) {
    console.log("Error with the |access data| function: ", err.message);
  }
}

export default "sto.js";
export { addData, getBio };
>>>>>>> Stashed changes:sto.js

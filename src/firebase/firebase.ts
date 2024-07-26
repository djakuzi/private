import {initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// PrivateSocial

// const firebaseConfig = {
//   apiKey: "AIzaSyDOxoiM7G2kSzz2QUHr05p59TXcskGrrbI",
//   authDomain: "privatesocial-6bbb1.firebaseapp.com",
//   projectId: "privatesocial-6bbb1",
//   storageBucket: "privatesocial-6bbb1.appspot.com",
//   messagingSenderId: "265753329822",
//   appId: "1:265753329822:web:fb389dfcea2d131c687b8f"
// };

// Private2

const firebaseConfig = {
  apiKey: "AIzaSyA4gMz0-jEGrG3E7rLokrQufMqDdXvkKFg",
  authDomain: "private2-3b573.firebaseapp.com",
  projectId: "private2-3b573",
  storageBucket: "private2-3b573.appspot.com",
  messagingSenderId: "1076304166399",
  appId: "1:1076304166399:web:33b0bbb7d2d0eb00dd3bca"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) ;
export const db = getFirestore(app)









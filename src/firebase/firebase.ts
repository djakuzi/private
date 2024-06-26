import {initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDOxoiM7G2kSzz2QUHr05p59TXcskGrrbI",
  authDomain: "privatesocial-6bbb1.firebaseapp.com",
  projectId: "privatesocial-6bbb1",
  storageBucket: "privatesocial-6bbb1.appspot.com",
  messagingSenderId: "265753329822",
  appId: "1:265753329822:web:fb389dfcea2d131c687b8f"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) ;
export const db = getFirestore(app)




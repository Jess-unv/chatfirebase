import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBwe2jXZoXQXnQV_tVWeomTu7spUBsROQ",
  authDomain: "reacchat-67e10.firebaseapp.com",
  projectId: "reacchat-67e10",
  storageBucket: "reacchat-67e10.appspot.com",
  messagingSenderId: "155588771861",
  appId: "1:155588771861:web:82ef7192d99a0e0f73ce1c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

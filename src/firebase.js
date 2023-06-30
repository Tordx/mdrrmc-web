import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqUbaxi7dp8xZKrteVMYGx7rgNXmtVPZk",
  authDomain: "pwdchat-8999c.firebaseapp.com",
  projectId: "pwdchat-8999c",
  storageBucket: "pwdchat-8999c.appspot.com",
  messagingSenderId: "121243708821",
  appId: "1:121243708821:web:a41f47c91d33f80d005a9c",
  measurementId: "G-1M0NRC3439"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

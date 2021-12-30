import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "<apiKey>",
  authDomain: "<authDomain>",
  projectId: "<projectId>",
  storageBucket: "<storageBucket>",
  messagingSenderId: "<messagingSenderId>",
  appId: "<appId>",
  measurementId: "<measurementId>",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

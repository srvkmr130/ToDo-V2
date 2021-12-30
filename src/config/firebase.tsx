import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWE9rlDJUXe452ja6TND1xWz86gdPUUFA",
  authDomain: "todo-app-db743.firebaseapp.com",
  projectId: "todo-app-db743",
  storageBucket: "todo-app-db743.appspot.com",
  messagingSenderId: "297459420402",
  appId: "1:297459420402:web:32602e3629a7fe320e146b",
  measurementId: "G-71WWR1YK29",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

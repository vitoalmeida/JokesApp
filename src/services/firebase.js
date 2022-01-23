// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKRxUbvSQVONTMD2rqxoWhHArKJ3eS460",
  authDomain: "petlog-74588.firebaseapp.com",
  projectId: "petlog-74588",
  storageBucket: "petlog-74588.appspot.com",
  messagingSenderId: "755289721682",
  appId: "1:755289721682:web:9c1261f474297b566e888b",
  measurementId: "G-RNY3Y7JE9D",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth()
const database = firebase.firestore();

export { auth, database }
// const analytics = getAnalytics(app);
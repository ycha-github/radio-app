// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYq5NK2tA4EDIma8G2HjPRf59YVDe33g8",
  authDomain: "react-cursos-53a2b.firebaseapp.com",
  projectId: "react-cursos-53a2b",
  storageBucket: "react-cursos-53a2b.appspot.com",
  messagingSenderId: "217332052663",
  appId: "1:217332052663:web:b1b53ab242208f323b5332",
  measurementId: "G-B4XM0ZF15W"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);
//const analytics = getAnalytics(app);
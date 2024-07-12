// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnGLv-qc-BnIivU7ZP3nlHA2SWj7_Pg0k",
  authDomain: "benyaptim.firebaseapp.com",
  projectId: "benyaptim",
  storageBucket: "benyaptim.appspot.com",
  messagingSenderId: "99273443983",
  appId: "1:99273443983:web:ed63d8e310a0c620b13efa",
  measurementId: "G-VYNPH9ELP1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
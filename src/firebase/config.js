import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9fa97zcWpsK5KNe6FYN9fvAz9lyseaSQ",
  authDomain: "coderhouse-react-8f4ca.firebaseapp.com",
  projectId: "coderhouse-react-8f4ca",
  storageBucket: "coderhouse-react-8f4ca.appspot.com",
  messagingSenderId: "713824564065",
  appId: "1:713824564065:web:c31b193abf0620ecc5cb20",
  measurementId: "G-0XZC0NWM0T",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

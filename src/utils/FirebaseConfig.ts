// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore"; // Change this line

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2Dc3xY-gzl_oJwjFF2Hnhgxm-KlBKyMc",
  authDomain: "riverside-9300a.firebaseapp.com",
  projectId: "riverside-9300a",
  storageBucket: "riverside-9300a.appspot.com",
  messagingSenderId: "123581689732",
  appId: "1:123581689732:web:0da4d8f379469a1079b7d1",
  measurementId: "G-WFQX3L82LF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use the getAuth function to get the Auth service
export const auth = getAuth(app);

// Export the firestore and collection functions for use in other parts of your application
export const firebaseDB = getFirestore(app);
export const userRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");

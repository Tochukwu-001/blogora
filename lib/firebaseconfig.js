// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMqTlG4BfepA4EAWSww87-AGE_dYFadgw",
  authDomain: "blogora-bb1ad.firebaseapp.com",
  projectId: "blogora-bb1ad",
  storageBucket: "blogora-bb1ad.firebasestorage.app",
  messagingSenderId: "664025768830",
  appId: "1:664025768830:web:8027ad93fbee2a149d492f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE,
  authDomain: "kids-story-2d1ab.firebaseapp.com",
  projectId: "kids-story-2d1ab",
  storageBucket: "kids-story-2d1ab.appspot.com",
  messagingSenderId: "893018232491",
  appId: "1:893018232491:web:27feb3bffe2185910f89ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBodtwb4qLAYLfVF8fcL-tfL4bjvQThYfo",
  authDomain: "stepz-833e9.firebaseapp.com",
  projectId: "stepz-833e9",
  storageBucket: "stepz-833e9.appspot.com",
  messagingSenderId: "682772982947",
  appId: "1:682772982947:web:914e2f5079d08a4e7ea316",
  measurementId: "G-NJPRMC8FV5"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
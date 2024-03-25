import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPH8qGRIESQQRZBmqP7z7cmjMqBYhG2LM",
  authDomain: "tapop-bd19f.firebaseapp.com",
  projectId: "tapop-bd19f",
  storageBucket: "tapop-bd19f.appspot.com",
  messagingSenderId: "447360071196",
  appId: "1:447360071196:web:4c14e58a1bfdcd49ad91d9",
  measurementId: "G-FQLGNECC3F"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };

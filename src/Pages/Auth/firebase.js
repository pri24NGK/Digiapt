import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDOwpJTNcP6ND9ycozK4fnCNwlws08zDr4",
  authDomain: "feed-de54f.firebaseapp.com",
  projectId: "feed-de54f",
  storageBucket: "feed-de54f.appspot.com",
  messagingSenderId: "69003273282",
  appId: "1:69003273282:web:d3052472c559f935faf9db",
  databaseURL: "https://feed-de54f-default-rtdb.firebaseio.com/",
};

initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);


export { auth, provider, database };

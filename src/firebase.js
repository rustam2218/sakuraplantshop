// -------------------- Конфигурация Firebase --------------------
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZBYJpj6NXQK3wJTzuxlc89uSvnRX2q9M",
  authDomain: "sakura-3e1b4.firebaseapp.com",
  databaseURL: "https://sakura-3e1b4-default-rtdb.firebaseio.com",
  projectId: "sakura-3e1b4",
  storageBucket: "sakura-3e1b4.firebasestorage.app",
  messagingSenderId: "951971411963",
  appId: "1:951971411963:web:68efd3c34028b226e43d5e",
  measurementId: "G-73H20DNNWY"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };

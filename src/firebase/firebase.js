import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdvwA7YTI_bSGC9v6YLKwlHYMGkXvWNyo",
  authDomain: "teamflow-5e54a.firebaseapp.com",
  projectId: "teamflow-5e54a",
  storageBucket: "teamflow-5e54a.firebasestorage.app",
  messagingSenderId: "718387441872",
  appId: "1:718387441872:web:fd8ae9623e39dcc124eed5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
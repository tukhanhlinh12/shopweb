import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChFeRx0uF_a6zexZIYWq3XYLSjRBzzQMA",
  authDomain: "market-978e0.firebaseapp.com",
  projectId: "market-978e0",
  storageBucket: "market-978e0.appspot.com",
  messagingSenderId: "344085671048",
  appId: "1:344085671048:web:9623a35fa6786985e0433d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;

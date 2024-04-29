import { app } from "./firebase";
import { getFirestore } from "firebase/firestore/lite";

const db = getFirestore(app);

export default db;

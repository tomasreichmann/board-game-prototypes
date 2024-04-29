import { addDoc, collection } from "firebase/firestore/lite";
import db from "../../../services/Firebase/cloudFirestore";

export const createAdventure = async () => {
    try {
        const docRef = await addDoc(collection(db, "adventures"), {
            meta: {
                createdAt: new Date(),
            },
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
        return Promise.reject(e);
    }
};

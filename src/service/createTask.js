import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase";

export const createTask = async (task) => {
  try {
    await addDoc(collection(db, "tasks"), task);
    console.log("Task created successfully");
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

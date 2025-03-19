import { defineStore } from "pinia";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export const useCounterStore = defineStore("counter", {
  state: (): { count: number; name: string } => ({
    count: 0,
    name: "Eduardo",
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    async testFirebase() {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
});

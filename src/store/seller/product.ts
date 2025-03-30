import { defineStore } from "pinia";
import { db } from "../../firebase";

import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

interface FormData {
  coverImg: string;
  name: string;
  quality: number;
  price: number;
  detail: string;
  colors: string[];
  sizes: string[];
}

export const useSellerProductStore = defineStore("sellerProductStore", {
  state: (): {} => ({}),
  actions: {
    async addProduct(data: FormData) {
      try {
        const colRef = collection(db, "products");
        const response = await addDoc(colRef, data);
        console.log(response)
      } catch (error) {
        console.log("error from add product : ", error);
      }
    },
  },
});

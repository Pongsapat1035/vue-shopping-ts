import { defineStore } from "pinia";
import { db } from "../../firebase";

import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

interface CheckBoxOption {
  name: string;
  isCheck: boolean;
}

interface FormData {
  coverImg: string;
  name: string;
  quantity: number;
  remainQuantity?: number;
  price: number;
  detail: string;
  colors: CheckBoxOption[];
  sizes: CheckBoxOption[];
}

interface ProductData extends FormData {
  id: string;
}

export const useSellerProductStore = defineStore("sellerProductStore", {
  state: (): {
    product: FormData;
    colorsConfig: string[];
    sizesConfig: string[];
    checkConfigLoaded: boolean;
  } => ({
    product: {
      coverImg: "",
      name: "",
      quantity: 0,
      remainQuantity: 0,
      price: 0,
      detail: "",
      colors: [],
      sizes: [],
    },
    colorsConfig: [],
    sizesConfig: [],
    checkConfigLoaded: false,
  }),
  actions: {
    async loadAllProducts(): Promise<ProductData[]> {
      try {
        const docRef = collection(db, "products");
        const response = await getDocs(docRef);
        const products: any[] = [];
        response.forEach((doc) => {
          const convertData = doc.data();
          convertData.id = doc.id;
          products.push(convertData);
        });
        return products;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },

    async loadProduct(productId: string) {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data());

          return docSnap.data();
        } else {
          throw new Error("Not found doc");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addProduct(data: FormData) {
      try {
        const colRef = collection(db, "products");
        data.remainQuantity = data.quantity;
        const response = await addDoc(colRef, data);
        console.log(response);
      } catch (error) {
        console.log("error from add product : ", error);
      }
    },

    async updateProduct(productId: string, data: FormData) {
      console.log("recieved id : ", productId);
      console.log("data : ", data);
      try {
        const docRef = doc(db, "products", productId);
        const response = await setDoc(docRef, data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteProduct(productId: string) {
      try {
        await deleteDoc(doc(db, "products", productId));
        console.log("delete success !!");
      } catch (error) {
        console.log(error);
      }
    },

    async setConfig() {
      try {
        if (!this.checkConfigLoaded) {
          const colors = [
            "#F7374F",
            "#FCB454",
            "#27548A",
            "#77B254",
            "#A31D1D",
          ];
          const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
          const docRef = doc(db, "config", "productConfig");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // console.log(docSnap.data());
            const { colors, sizes } = docSnap.data();
            this.colorsConfig = colors;
            this.sizesConfig = sizes;
          } else {
            await setDoc(doc(db, "config", "productConfig"), {
              colors,
              sizes,
            });
            console.log("create config success");
          }

          this.checkConfigLoaded = true;
        }
      } catch (error) {
        console.log("error from set config");
      }
    },
  },
});

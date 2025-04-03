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
  remainQuantity: number;
  price: number;
  detail: string;
  colors: CheckBoxOption[];
  sizes: CheckBoxOption[];
}

interface ProductData extends FormData {
  id: string;
}

export const useClientProductStore = defineStore("clientProductStore", {
  state: (): {
    productLists: ProductData[];
    backupProduct: ProductData[];
    product: ProductData;
    filterState: boolean;
  } => ({
    productLists: [],
    backupProduct: [],
    filterState: true,
    product: {
      id: "",
      coverImg: "",
      name: "",
      quantity: 0,
      remainQuantity: 0,
      price: 0,
      detail: "",
      colors: [],
      sizes: [],
    },
  }),
  getters: {
    getColor: (state) => {
      const filterColor = state.product.colors
        .filter((color) => color.isCheck === true)
        .map((color) => color.name);
      return filterColor;
    },
    getSize: (state) => {
      const filterColor = state.product.sizes
        .filter((size) => size.isCheck === true)
        .map((size) => size.name);
      return filterColor;
    },
  },
  actions: {
    async loadAllProducts() {
      try {
        const docRef = collection(db, "products");
        const response = await getDocs(docRef);
        const products: any[] = [];
        response.forEach((doc) => {
          const convertData = doc.data();
          convertData.id = doc.id;
          products.push(convertData);
        });
        this.productLists = products;
        this.backupProduct = products;
        // return products;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },

    async loadProduct(productId: string) {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log(docSnap.data());
          const {
            coverImg,
            name,
            quantity,
            remainQuantity,
            price,
            detail,
            colors,
            sizes,
          } = docSnap.data();
          this.product = {
            id: docSnap.id,
            coverImg,
            name,
            quantity: parseInt(quantity),
            price: parseInt(price),
            remainQuantity: parseInt(remainQuantity),
            detail,
            colors,
            sizes,
          };
        } else {
          throw new Error("Not found doc");
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    sortProductByName(type: string) {
      if (type === "A - Z") {
        this.productLists.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        this.productLists.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
    sortProductByPrice(type: string) {
      if (type === "Low to Hight") {
        this.productLists.sort((a, b) => a.price - b.price);
      } else {
        this.productLists.sort((a, b) => b.price - a.price);
      }
    },
  },
});

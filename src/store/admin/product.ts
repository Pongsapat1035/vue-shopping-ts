import { defineStore } from "pinia";
import { db } from "../../firebase";
import type { AdminProductData, AdminProductFormData } from "../../types";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useAlertStore } from "../alert";


type ProductData = Pick<
  AdminProductData,
  "id" | "coverImg" | "name" | "remainQuantity" | "status"
>;

export const useAdminProductStore = defineStore("adminProductStore", {
  state: (): {
    product: AdminProductFormData;
    colorsConfig: string[];
    sizesConfig: string[];
    checkConfigLoaded: boolean;
    productLists: ProductData[];
  } => ({
    product: {
      coverImg: "",
      name: "",
      quantity: 0,
      quantityServe: 0,
      remainQuantity: 0,
      price: 0,
      status: true,
      detail: "",
      colors: [],
      sizes: [],
    },
    colorsConfig: [],
    sizesConfig: [],
    checkConfigLoaded: false,
    productLists: [],
  }),
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
      } catch (error) {
        // throw new Error(error instanceof Error ? error.message : String(error));
        console.log(error);
      }
    },
    async loadProduct(productId: string) {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          throw new Error("Not found doc");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addProduct(data: AdminProductFormData) {
      try {
        const colRef = collection(db, "products");
        data.remainQuantity = Number(data.quantity);
        data.quantity = Number(data.quantity);
        data.quantityServe = 0;
        data.usedQuantity = 0;
        data.status = true
        await addDoc(colRef, data);
      } catch (error) {
        console.log("error from add product : ", error);
      }
    },
    async updateProduct(productId: string, data: AdminProductFormData) {
      try {
        const docRef = doc(db, "products", productId);
        await updateDoc(docRef, data as Partial<AdminProductData>);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct(productId: string) {
      try {
        await deleteDoc(doc(db, "products", productId));
      } catch (error) {
        console.log(error);
      }
    },
    async toggleProductStatus(id: string, prevStatus: boolean) {
      try {
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, {
          status: prevStatus,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async updateQuantity(id: string, newQuantity: number, mode: string) {
      try {
        const docRef = doc(db, "products", id);
        const convertQuantity = mode === 'Add' ? newQuantity : -newQuantity
        if(mode === 'Remove') {
          
        }
        updateDoc(docRef, {
          quantity: increment(convertQuantity),
          remainQuantity: increment(convertQuantity),
        });
        const productIndex = this.productLists.findIndex(
          (product) => product.id === id
        );
        if (this.productLists[productIndex].remainQuantity) {
          this.productLists[productIndex].remainQuantity += Number(convertQuantity);
        }
        const alertStore = useAlertStore()
        alertStore.toggleAlert("success", `${mode} quantity success`)
      
      } catch (error) {
        console.log("add quantity error : ", error);
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

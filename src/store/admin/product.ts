import { defineStore } from "pinia";
import { db } from "../../firebase";
import type {
  ProductData,
  ProductInfo,
  TotalQuantity,
} from "../../types";
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
  query,
  where,
} from "firebase/firestore";
import { useAlertStore } from "../alert";

type ProductListsData = Pick<ProductData, "id" | "status"> & Pick<ProductInfo, "coverImg" | "name"> & Pick<TotalQuantity, "remainQty">;

export const useAdminProductStore = defineStore("adminProductStore", {
  state: (): {
    
    colorsConfig: string[];
    sizesConfig: string[];
    checkConfigLoaded: boolean;
    productLists: ProductListsData[];
  } => ({
  
    colorsConfig: [],
    sizesConfig: [],
    checkConfigLoaded: false,
    productLists: [],
  }),
  getters: {
    convertedConfig() {
      return (lists: string[]) => {
        const convertItem = lists.map((item) => ({
          name: item,
          enable: false,
          remainQuantity: 0,
        }));
        return convertItem;
      };
    },
  },
  actions: {
    async loadAllProducts() {
      try {
        const docRef = collection(db, "products");
        const response = await getDocs(docRef);
        const products: ProductListsData[] = [];
        response.forEach((doc) => {
          const docData = doc.data() as ProductData;
          const totalQuantity = (docData.totalQuantity?.remainQty || 0) + (docData.totalQuantity?.soldQty || 0)
          const convertData = {
            id: doc.id,
            name: docData.productInfo.name,
            coverImg: docData.productInfo.coverImg,
            remainQty: totalQuantity,
            status: docData.status
          };
          products.push(convertData);
        });
        console.log('check product : ', products)
        this.productLists = products;
      } catch (error) {
        console.log("load product error : ", error);
      }
    },
    async loadProduct(productId: string) : Promise<ProductData | undefined>  {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data() as ProductData;
        } else {
          throw new Error("Not found doc");
        }
      } catch (error) {
        console.log(error);
        if(error instanceof Error) {
          throw new Error(error.message)
        }
      }
    },
    async addProduct(data: ProductData) {
      try {
        const productName = data.productInfo.name;

        const colRef = collection(db, "products");
        const querySnap = query(
          colRef,
          where("productInfo.name", "==", productName)
        );
        const response = await getDocs(querySnap);
        if (!response.empty) throw new Error("Name is already used");

        await addDoc(colRef, data);
      } catch (error) {
        console.log("error from add product : ", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    },
    async updateProduct(productId: string, data: ProductData) {
      try {
        const docRef = doc(db, "products", productId);
        await updateDoc(docRef, data as Partial<ProductData>);
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
    async toggleProductStatus(id: string, newStatus: boolean) {
      try {
        const productIndex = this.productLists.findIndex(product => product.id === id)
        this.productLists[productIndex].status = newStatus
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, {
          status: newStatus,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async updateQuantity(id: string, newQuantity: number, mode: string) {
      try {
        const docRef = doc(db, "products", id);
        const convertQuantity = mode === "Add" ? newQuantity : -newQuantity;
        if (mode === "Remove") {
        }
        updateDoc(docRef, {
          quantity: increment(convertQuantity),
          remainQuantity: increment(convertQuantity),
        });
        const productIndex = this.productLists.findIndex(
          (product) => product.id === id
        );
        if (this.productLists[productIndex].remainQty) {
          this.productLists[productIndex].remainQty +=
            Number(convertQuantity);
        }
        const alertStore = useAlertStore();
        alertStore.toggleAlert("success", `${mode} quantity success`);
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

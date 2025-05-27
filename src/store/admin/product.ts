import { defineStore } from "pinia";
import { db } from "../../firebase";
import type {
  ProductData,
  ProductFormData,
  ProductInfo,
  TotalQuantity,
} from "../../types";
import {
  collection,
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
    productLists: ProductListsData[];
  } => ({
    colorsConfig: [],
    sizesConfig: [],
    productLists: [],
  }),
  getters: {
    convertedConfig() {
      return (lists: string[]) => {
        const convertItem = lists.map((item) => ({
          name: item,
          enable: false,
          remainQuantity: 0,
          serveQuantity: 0,
          soldQuantity: 0
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
          const totalQuantity = (docData.totalQuantity?.remainQty || 0)
         
          const convertData = {
            id: doc.id,
            name: docData.productInfo.name,
            coverImg: docData.productInfo.coverImg,
            remainQty: totalQuantity,
            status: docData.status
          };
          products.push(convertData);
        });
        this.productLists = products;
      } catch (error) {
        console.log("load product error : ", error);
      }
    },
    async loadProduct(productId: string): Promise<ProductData | undefined> {
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
        if (error instanceof Error) {
          throw new Error(error.message)
        }
      }
    },
    async addProduct(productId: string, data: ProductFormData) {
      try {
        const { productInfo, quantity, variants, variantType } = data
        const variantName: string[] = variants.filter(variant => variant.enable === true).map(item => item.name)
        const convertData: ProductData = {
          productInfo,
          variants,
          variantType,
          variantName,
          status: true,
          totalQuantity: {
            remainQty: quantity
          },
          createAt: new Date()
        }

        const productName = data.productInfo.name;

        const checkNameExist = await this.isNameUsed(productName)
        if (!checkNameExist) throw new Error("Name is already used");

        const colRef = doc(db, "products", productId)
        await setDoc(colRef, convertData);
      } catch (error) {
        console.log("error from add product : ", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    },
    async updateProduct(productId: string, data: ProductFormData) {
      try {
        const { variants, variantType, quantity, productInfo } = data

        const colRef = collection(db, "products");
        const querySnap = query(
          colRef,
          where("productInfo.name", "==", productInfo.name)
        );
        const response = await getDocs(querySnap);

        if (!response.empty) {
          response.forEach(doc => {
            if (doc.id !== productId) {
              throw new Error("Name is already use")
            }
          })
        }

        const enableVariants = variants.filter(variant => variant.enable === true)
        const variantName: string[] = enableVariants.map(item => item.name)
        const totalUpdateQuantity = variantType !== 'none' ? enableVariants.reduce((acc, currentVal) => acc + currentVal.remainQuantity, 0) : quantity

        const convertData = { productInfo, variants, variantType, variantName, totalQuantity: { remainQty: totalUpdateQuantity } }

        const docRef = doc(db, "products", productId);
        await updateDoc(docRef, convertData as Partial<ProductData>);

      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    },
    async deleteProduct(productId: string) {
      try {
        const productRef = doc(db, "products", productId)
        const productSnap = await getDoc(productRef)
        if (productSnap.exists()) {
          const quantityInServe = productSnap.data().totalQuantity.serveQty
          if (quantityInServe > 0)
            throw new Error("This product is part of one or more active orders")

        } else {
          throw new Error("Product not found !")
        }
        await deleteDoc(doc(db, "products", productId));
        const productIndex = this.productLists.findIndex(product => product.id === productId)
        this.productLists.splice(productIndex, 1)
      } catch (error) {
        if (error instanceof Error)
          throw new Error(error.message)
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
    async loadConfig() {
      try {
        const docRef = doc(db, "config", "productConfig");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const { colors, sizes } = docSnap.data();
          this.colorsConfig = colors;
          this.sizesConfig = sizes;
        }
      } catch (error) {
        console.log('load config error : ', error)
      }

    },
    async isNameUsed(name: string): Promise<boolean> {
      const colRef = collection(db, "products");
      const querySnap = query(
        colRef,
        where("productInfo.name", "==", name)
      );

      const response = await getDocs(querySnap);
      if (!response.empty) return false
      return true
    },
    async setConfig() {
      try {
        const colors = [
          "#F7374F",
          "#FCB454",
          "#27548A",
          "#77B254",
          "#A31D1D",
        ];
        const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
        await setDoc(doc(db, "config", "productConfig"), {
          colors,
          sizes,
        });
      } catch (error) {
        console.log("error from set config");
      }
    },
  },
});

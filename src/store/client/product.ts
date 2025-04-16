import { defineStore } from "pinia";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import type {  ClientProductCard, AdminProductData } from "../../types";

interface QueryProduct {
  searchText: string;
  sortBy: string;
  colorFilter: string[];
  sizeFilter: string[];
  priceFilter: string;
}

export const useClientProductStore = defineStore("clientProductStore", {
  state: (): {
    productLists: ClientProductCard[];
    backupProduct: ClientProductCard[];
    product: AdminProductData;
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
    getColor(state): string[] {
      const filterColor = state.product.colors
        .filter((color) => color.isCheck === true)
        .map((color) => color.name);
      return filterColor;
    },
    getSize(state): string[] {
      const filterColor = state.product.sizes
        .filter((size) => size.isCheck === true)
        .map((size) => size.name);
      return filterColor;
    },
    getMaxPrice(state): number {
      const productPrices = state.backupProduct.map((product) => product.price);
      const maxPrice = Math.max(...productPrices);
      return maxPrice;
    },
  },
  actions: {
    async loadAllProducts() {
      try {
        const docRef = query(
          collection(db, "products"),
          where("status", "==", true)
        );
        const response = await getDocs(docRef);
        const products: any[] = [];
        response.forEach((doc) => {
          const convertData = doc.data();
          convertData.id = doc.id;
          convertData.price = parseInt(convertData.price);
          products.push(convertData);
        });
        this.productLists = products;
        this.backupProduct = products;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },
    async loadHomeProduct() :Promise<ClientProductCard[]>  {
      try {
        const docRef = query(
          collection(db, "products"),
          where("status", "==", true), limit(4)
        );
        const response = await getDocs(docRef);
        const products: any[] = [];
        response.forEach((doc) => {
          const data = doc.data();
          const convertData: ClientProductCard = {
            id: doc.id,
            name: data.name,
            coverImg: data.coverImg,
            detail: data.detail,
            price: data.price,
            remainQuantity: data.remainQuantity
          }
          products.push(convertData);
        });
        return products
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },
    async loadProduct(productId: string) {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
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
    searchByName(text: string) {
      const productSearchByName = this.productLists.filter((product) =>
        product.name.includes(text)
      );
      this.productLists = productSearchByName;
    },

    queryProduct(query: QueryProduct) {
      console.log("check query : ", query);
      let queryProduct = <ClientProductCard[]>[...this.backupProduct];

      if (query.sortBy === "A - Z") {
        queryProduct.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        queryProduct.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (query.colorFilter.length > 0) {
        // convert to set for use method has()
        const colorFilter = new Set(query.colorFilter);
        const productFilterByColor = queryProduct.filter((product) => {
          return product.colors?.some(
            (color) => colorFilter.has(color.name) && color.isCheck
          );
        });
        queryProduct = [...productFilterByColor];
      }

      if (query.sizeFilter.length > 0) {
        const sizeFilter = new Set(query.sizeFilter);
        const productFilterBySize = queryProduct.filter((product) => {
          return product.sizes?.some(
            (size) => sizeFilter.has(size.name) && size.isCheck
          );
        });
        queryProduct = [...productFilterBySize];
      }

      const maxPrice = parseInt(query.priceFilter);
      if (maxPrice > 0) {
        const productFilterByPrice = queryProduct.filter(
          (product) => product.price <= maxPrice
        );
        queryProduct = [...productFilterByPrice];
      }

      if (query.searchText !== "") {
        const productSearchByName = queryProduct.filter((product) =>
          product.name.includes(query.searchText)
        );
        queryProduct = productSearchByName;
      }

      this.productLists = queryProduct;
    },
  },
});

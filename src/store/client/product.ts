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
import type {
  ProductData,
  ProductInfo,
  TotalQuantity,
  ProductVariants,
  ProductCardData,
} from "../../types";

interface QueryProduct {
  searchText: string;
  sortBy: string;
  colorFilter: string[];
  sizeFilter: string[];
  priceFilter: string;
}

export const useClientProductStore = defineStore("clientProductStore", {
  state: (): {
    productLists: ProductCardData[];
    backupProduct: ProductCardData[];
    product: ProductData;
    filterState: boolean;
  } => ({
    productLists: [],
    backupProduct: [],
    filterState: true,
    product: {
      productInfo: {
        name: "",
        price: 0,
        coverImg: "",
        description: "",
      },
      totalQuantity: {
        quantity: 0,
        remainQty: 0,
      },
      status: false,
      variantType: "",
    },
  }),
  getters: {
    getVariant(state) {
      const selectedVariants = state.product.variants
        ?.filter((item) => item.enable === true)
        .map((item) => item.name);
      return selectedVariants;
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
        const products: ProductCardData[] = [];
        response.forEach((doc) => {
          const data: Partial<ProductData> = doc.data();
          const convertData: ProductCardData = {
            id: doc.id,
            name: data.productInfo?.name ?? "",
            coverImg: data.productInfo?.coverImg ?? "",
            description: data.productInfo?.description ?? "",
            price: data.productInfo?.price ?? 0,
            remainQuantity: data.totalQuantity?.remainQty ?? 0,
            variants: data.variants ?? [],
          };
          products.push(convertData);
        });
        this.productLists = products;
        this.backupProduct = products;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },
    async loadHomeProduct(): Promise<ProductCardData[]> {
      try {
        const docRef = query(
          collection(db, "products"),
          where("status", "==", true),
          limit(4)
        );
        const response = await getDocs(docRef);
        const products: ProductCardData[] = [];
        response.forEach((doc) => {
          const data: Partial<ProductData> = doc.data();
          console.log("check data : ", data);
          const convertData: ProductCardData = {
            id: doc.id,
            name: data.productInfo?.name ?? "",
            coverImg: data.productInfo?.coverImg ?? "",
            description: data.productInfo?.description ?? "",
            price: data.productInfo?.price ?? 0,
            remainQuantity: data.totalQuantity?.remainQty ?? 0,
            variantType: data.variantType ?? "",
            variants: data.variants ?? [],
          };
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
          console.log("check product : ", docSnap.data());
          this.product = docSnap.data() as ProductData;
        } else {
          throw new Error("Not found doc");
        }
      } catch (error) {
        console.log(error);
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

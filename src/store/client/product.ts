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
  ProductCardData,
} from "../../types";
import { searchClient } from "@algolia/client-search";

const client = searchClient(
  import.meta.env.VITE_ALGOLIA_APPID,
  import.meta.env.VITE_ALGOLIA_API_KEY
);


interface QueryProduct {
  searchText: string,
  sortBy: string;
  variants: string[];
  priceFilter: { min: number, max: number };
}

export const useClientProductStore = defineStore("clientProductStore", {
  state: (): {
    productLists: ProductCardData[];
    backupProduct: ProductCardData[];
    product: ProductData;
    filterState: boolean;
    productQuery: QueryProduct
  } => ({
    productLists: [],
    backupProduct: [],
    filterState: true,
    productQuery: {
      searchText: "",
      sortBy: "",
      variants: [],
      priceFilter: { min: 0, max: 0 }
    },
    product: {
      productInfo: {
        name: "",
        price: 0,
        coverImg: "",
        description: "",
      },
      totalQuantity: {
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
    async loadProducts(productLimit: number = 10) {
      try {
        const docRef = query(
          collection(db, "products"),
          where("status", "==", true),
          limit(productLimit)
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
            variantType: data.variantType ?? "",
            variants: data.variants ?? [],
          };
          products.push(convertData);
        });
        this.productLists = products

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
    async searchProduct() {
      const indexName = "test-index";
      try {
        const { results } = await client.search({
          requests: [
            {
              indexName,
              query: "product", facetFilters: [['tag:number'], ['price >= 150']]
            },
          ],
        });
        console.log('check result : ', results)
      } catch (error) {
        console.log(error)
      }

    },
    queryProduct() {
      console.log('recieved query : ', this.productQuery)
    },
  },
});

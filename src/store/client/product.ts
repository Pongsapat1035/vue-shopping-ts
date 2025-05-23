import { defineStore } from "pinia";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  type OrderByDirection,
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
    productMaxprice: number
    productQuery: QueryProduct
    isLoading: boolean
  } => ({
    productLists: [],
    productMaxprice: 0,
    backupProduct: [],
    filterState: false,
    productQuery: {
      searchText: "",
      sortBy: "Newest First",
      variants: [],
      priceFilter: { min: 0, max: 1000 }
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
      variantName: [],
      variants: [],
      createAt: new Date()
    },
    isLoading: false
  }),
  getters: {
    getVariant(state) {
      const selectedVariants = state.product.variants
        ?.filter((item) => item.enable === true)
        .map((item) => item.name);
      return selectedVariants;
    },

  },
  actions: {
    async loadProducts(productLimit: number = 10, priceSort: boolean = true) {
      try {
        this.isLoading = true
        const { sortBy, variants, priceFilter } = this.productQuery
        const sortField = this.getFirestoreSortText(sortBy)

        let constraints = [];
        constraints.push(where("status", "==", true))

        if (variants.length > 0) {
          constraints.push(where('variantName', 'array-contains-any', variants))
        }

        if (priceSort) {
          constraints.push(where("productInfo.price", ">=", priceFilter.min))
          constraints.push(where("productInfo.price", "<=", priceFilter.max))
        }

        constraints.push(limit(productLimit))
        constraints.push(orderBy(sortField.field, sortField.type as OrderByDirection))

        const productsRef = collection(db, "products")
        const docRef = query(productsRef, ...constraints);
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
            variantName: data.variantName ?? [],
          };
          products.push(convertData);
        });

        this.productLists = products
        setTimeout(() => {
          this.isLoading = false
        }, 1000)

      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },
    async loadHomeProducts(productLimit: number = 10): Promise<ProductCardData[]> {
      try {
        this.isLoading = true

        const productsRef = collection(db, "products")
        const docRef = query(productsRef, where("status", "==", true), limit(productLimit));
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
            variantName: data.variantName ?? [],
          };
          products.push(convertData);
        });

        this.productLists = products
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
        return products
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },
    async getMaxPrice(): Promise<number> {
      try {
        const productSnap = query(
          collection(db, "products"),
          orderBy("productInfo.price", "desc"),
          limit(1)
        );

        const querySnapshot = await getDocs(productSnap);
        let maxPrice = 0
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          maxPrice = data.productInfo.price
        });
        return maxPrice
      } catch (error) {
        console.log(error)
        return 0
      }
    },
    async loadProduct(productId: string) {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.product = docSnap.data() as ProductData;
        } else {
          throw new Error("Not found doc");
        }
      } catch (error) {
        console.log(error);
      }
    },
    getAlgoliaSortText(sort: string): string {
      let replica = ""
      switch (sort) {
        case "Newest First":
          replica = 'products_create_desc'
          break
        case "Name A-Z":
          replica = 'products_name_asc'
          break
        default:
          replica = 'products_name_desc'
      }
      return replica
    },
    getFirestoreSortText(sort: string): { field: string, type: string } {
      let field = ""
      let type = ""
      switch (sort) {
        case "Newest First":
          field = "createAt"
          type = "desc"
          break
        case "Name (A-Z)":
          field = "productInfo.name"
          type = "asc"
          break
        default:
          field = "productInfo.name"
          type = "desc"
      }
      return { field, type }
    },
    async fetchProductAlgolia() {
      const { searchText, sortBy, variants, priceFilter } = this.productQuery

      const priceFilterText = `price:${priceFilter.min} TO ${priceFilter.max}`
      const variantText = variants.map(variant => `variants:${variant}`)
      const selectReplica = this.getAlgoliaSortText(sortBy)

      const { results } = await client.search({
        requests: [
          {
            indexName: selectReplica,
            query: searchText, facetFilters: [variantText], filters: priceFilterText
          },
        ],
      }) as any;
      const foundProducts = results[0].nbHits

      if (foundProducts > 0) {
        const products: ProductCardData[] = []
        const foundProduct = results[0].hits
        foundProduct.forEach((product: any) => {
          const { id, name, coverImg, description, variantType, variants, remainQuantity, price } = product
          const convertData = {
            id, name, coverImg, description, variantType, variantName: variants, remainQuantity, price
          }
          products.push(convertData)
        })
        console.log('check products : ', products)
        this.productLists = products
      } else {
        this.productLists = []
        console.log('product not found')
      }
    },
    async queryProduct() {
      try {
        console.log(this.productQuery)
        const { searchText } = this.productQuery
        if (searchText) {
          this.fetchProductAlgolia()
        } else {
          console.log('fetch from firebase')
          this.loadProducts()

        }

      } catch (error) {
        console.log(error)
      }

    },
  },
});

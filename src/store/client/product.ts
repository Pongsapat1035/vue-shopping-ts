import { defineStore } from "pinia";
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

type CheckBoxOption = { name: string; isCheck: boolean };

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

interface QueryProduct {
  searchText: string;
  sortBy: string;
  colorFilter: string[];
  sizeFilter: string[];
  priceFilter: string;
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
    getMaxPrice: (state) => {
      let maxPrice: number = 0;
      for (let i = 1; i < state.backupProduct.length; i++) {
        if (state.backupProduct[i].price > state.backupProduct[i - 1].price) {
          maxPrice = state.backupProduct[i].price;
        } else {
          maxPrice = state.backupProduct[i - 1].price;
        }
      }
      return maxPrice;
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
    searchByName(text: string) {
      const productSearchByName = this.productLists.filter((product) =>
        product.name.includes(text)
      );
      this.productLists = productSearchByName;
    },

    queryProduct(query: QueryProduct) {
      console.log("check query : ", query);
      let queryProduct = <ProductData[]>[...this.backupProduct];

      if (query.sortBy === "A - Z") {
        queryProduct.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        queryProduct.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (query.colorFilter.length > 0) {
        // convert to set for use method has()
        const colorFilter = new Set(query.colorFilter);
        const productFilterByColor = queryProduct.filter((product) => {
          return product.colors.some(
            (color) => colorFilter.has(color.name) && color.isCheck
          );
        });
        queryProduct = [...productFilterByColor];
      }

      if (query.sizeFilter.length > 0) {
        const sizeFilter = new Set(query.sizeFilter);
        const productFilterBySize = queryProduct.filter((product) => {
          return product.sizes.some(
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

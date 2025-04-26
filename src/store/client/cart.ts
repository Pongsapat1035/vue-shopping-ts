import { defineStore } from "pinia";
import { useAuthStore } from "../auth";
import { realtimeDB, db } from "../../firebase";

import { ref, onValue, set, type DatabaseReference } from "firebase/database";
import { useAlertStore } from "../alert";
import { useAdminProductStore } from "../admin/product";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";

interface Product {
  id: string;
  color: string | "";
  size: string | "";
  quantity: number;
}

interface ProductData extends Product {
  name: string;
  price: number;
  totalPrice: number;
  remainQuantity: number;
  coverImg: string;
}
interface OrderDetail {
  totalProductPrice: number;
  totalShippingPrice: number;
  totalPrice: number;
  status: string;
  createdDate: Date;
  products: ProductData[];
  userId: string;
  name: string
}
export const useCartStore = defineStore("cartStore", {
  state: (): {
    cartItems: Product[];
    productLists: ProductData[];
    userId: string;
    shippingPrice: number;
  } => ({
    cartItems: [],
    productLists: [],
    userId: "",
    shippingPrice: 10,
  }),
  getters: {
    user(): string {
      return useAuthStore().userId;
    },
    customerName():string{
      return useAuthStore().userInfo.name
    },
    cartRef(): DatabaseReference {
      return ref(realtimeDB, `carts/${this.user}`);
    },
    getTotalItem(): number {
      return this.cartItems.reduce(
        (acc, currentVal) => acc + (currentVal.quantity ?? 0),
        0
      );
    },
    getTotalProductPrice(): number {
      return this.productLists.reduce(
        (acc, currentVal) => acc + (currentVal.totalPrice ?? 0),
        0
      );
    },
    getTotalShipping(): number {
      return this.shippingPrice * this.productLists.length;
    },
    getTotalPrice(): number {
      return this.getTotalProductPrice + this.getTotalShipping;
    },
  },
  actions: {
    async loadCart() {
      if (this.user) {
        const productStore = useAdminProductStore();
        onValue(this.cartRef, async (snapShot) => {
          const data = snapShot.val();
          this.cartItems = data || [];
          if (data) {
            const promise = data.map(async (product: Product) => {
              const recievedProduct = await productStore.loadProduct(
                product.id
              );
              if (recievedProduct) {
                const { price, name, remainQuantity, coverImg } =
                  recievedProduct;
                const convertPrice = parseInt(price);
                const convertData: ProductData = {
                  id: product.id,
                  color: product.color,
                  size: product.size,
                  quantity: product.quantity,
                  coverImg,
                  name,
                  price: convertPrice,
                  totalPrice: convertPrice * (product.quantity || 0),
                  remainQuantity: parseInt(remainQuantity),
                };
                return convertData;
              }
            });
            const productLists = await Promise.all(promise);
            this.productLists = productLists;
          }
        });
      }
    },
    addItemToCart(product: Product) {
      const findProductIndex = this.cartItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );
      if (findProductIndex >= 0) {
        // item exits
        const currentItem: Product = this.cartItems[findProductIndex];
        this.updateQuantity(
          findProductIndex,
          (currentItem.quantity ?? 0) + (product.quantity ?? 0)
        );
        return;
      } else {
        this.cartItems.push(product);
        set(this.cartRef, this.cartItems);
      }
    },
    updateQuantity(index: number, newQuantity: number) {
      this.cartItems[index].quantity = newQuantity;
      set(this.cartRef, this.cartItems);
    },
    async removeCart(id: string) {
      try {
        const productIndex = this.cartItems.findIndex(
          (product) => product.id === id
        );
        this.cartItems.splice(productIndex, 1);
        await set(this.cartRef, this.cartItems);
        useAlertStore().toggleAlert("success", "Delete product success");
      } catch (error) {
        console.log(error);
      }
    },
    removeAllItem() {
      this.cartItems = [];
      set(this.cartRef, this.cartItems);
    },
    async createOrder() {
      try {
        const orderDetail: OrderDetail = {
          totalProductPrice: this.getTotalProductPrice,
          totalShippingPrice: this.getTotalShipping,
          totalPrice: this.getTotalPrice,
          products: this.productLists,
          status: "Pending",
          createdDate: new Date(),
          userId: this.user,
          name: this.customerName
        };

        // check stock
        for (const product of this.productLists) {
          const docRef = doc(db, "products", product.id);
          const docSnap = await getDoc(docRef);

          const productData = docSnap.data() as ProductData;
          if (product.quantity > Number(productData.remainQuantity)) {
            // console.log("item out of stock");
            throw new Error(`${productData.name} out of stock`);
          }
        }

        const docRef = collection(db, "orders");
        const docSnapshot = await addDoc(docRef, orderDetail);
        // console.log(docSnapshot);
        for (const product of this.productLists) {
          const productDocRef = doc(db, "products", product.id);
          await updateDoc(productDocRef, {
            quantityServe: increment(product.quantity),
            remainQuantity: increment(-product.quantity),
          });
        }
        this.removeAllItem();
        return docSnapshot.id;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },
  },
});

import { defineStore } from "pinia";
import { useAuthStore } from "../auth";
import { realtimeDB } from "../../firebase";
import { ref, onValue, set, type DatabaseReference } from "firebase/database";

interface Product {
  id: string;
  color?: string | null;
  size?: string | null;
  quantity: number | null;
}

export const useCartStore = defineStore("cartStore", {
  state: (): {
    cartItems: Product[];
    userId: string;
  } => ({
    cartItems: [],
    userId: "",
  }),
  getters: {
    user(): string {
      return useAuthStore().userId;
    },
    cartRef(): DatabaseReference {
      return ref(realtimeDB, `carts/${this.user}`);
    },
    totalItem(): number {
      return this.cartItems.reduce(
        (acc, currentVal) => acc + (currentVal.quantity ?? 0),
        0
      );
    },
  },
  actions: {
    loadCart() {
      if (this.user) {
        onValue(this.cartRef, (snapShot) => {
          const data = snapShot.val();
          console.log("check snap shot : ", data);
          this.cartItems = data || [];
        });
        console.log("check product on cart : ", this.cartItems);
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
    async removeCart(index: number) {
      this.cartItems.splice(index, 1);
      await set(this.cartRef, this.cartItems);
      console.log("delete success !!")
    },
  },
});

import { defineStore } from "pinia";
import { useAuthStore } from "../auth";
import { realtimeDB } from "../../firebase";
import { ref, onValue, set } from "firebase/database";

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
    user(){
      return useAuthStore().userId 
    },
    cartRef() {
      return ref(realtimeDB, `carts/${this.user}`);
    },
  },
  actions: {
    loadCart() {
      if (this.user) {
        // console.log(this.userId)
        onValue(this.cartRef, (snapShot) => {
          const data = snapShot.val();
          console.log("check snap shot : ", data);
          this.cartItems = data || [];
        });
        console.log("check product : ", this.cartItems);
      }
    },
    addItemToCart(product: Product) {
      console.log('check product : ', typeof(this.cartItems))
      this.cartItems.push(product);
      set(this.cartRef, this.cartItems);
    },
    testWrite() {
      set(ref(realtimeDB, "users/" + "asd-"), {
        username: "name",
        email: ",art",
      });
    },
  },
});

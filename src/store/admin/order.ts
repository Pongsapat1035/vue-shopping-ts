import { defineStore } from "pinia";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { OrderDetail } from "../../types/order";

export const useAdminOrderStore = defineStore("adminOrderStore", {
  state: (): {
    orderLists: Array<OrderDetail>;
  } => ({
    orderLists: [],
  }),
  getters: {
    totalOrder(state){
      return state.orderLists.length
    },
    totalAmout(state){
      const successOrderLists = state.orderLists.filter((order) => order.status === 'Success')
      return successOrderLists.reduce((acc, cur) => acc + cur.totalPrice, 0)
    }
    
  },
  actions: {
    async loadOrders() {
      try {
        const docRef = query(
          collection(db, "orders"),
          where("status", "!=", "Cancel")
        );
        const docSnap = await getDocs(docRef);
        const orders: OrderDetail[] = []
        docSnap.forEach((doc) => {
          const orderData = doc.data();
          const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          };
          const date = orderData.createdDate.toDate().toLocaleDateString("en-us", options)
          orderData.createdDate = date
          orderData.id = doc.id;

          orders.push(orderData as OrderDetail);
        });
        this.orderLists = orders
      } catch (error) {
        console.log(error);
      }
    },
  },
});

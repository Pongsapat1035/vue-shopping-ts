import { defineStore } from "pinia";
import { db } from "../../firebase";
import { collection, getDocs, query, doc, getDoc, updateDoc, orderBy } from "firebase/firestore";
import type { OrderDetail } from "../../types/order";

export const useAdminOrderStore = defineStore("adminOrderStore", {
  state: (): {
    orderLists: Array<OrderDetail>;
    isLoading: boolean
  } => ({
    orderLists: [],
    isLoading: false
  }),
  getters: {
    totalOrder(state) {
      return state.orderLists.length
    },
    totalAmout(state) {
      const successOrderLists = state.orderLists.filter((order) => order.status === 'Successful')
      return successOrderLists.reduce((acc, cur) => acc + cur.totalPrice, 0)
    }
  },
  
  actions: {
    async loadOrders() {
      try {
        this.isLoading = true
        const docRef = query(collection(db, "orders"), orderBy("createdDate", "desc"));

        const docSnap = await getDocs(docRef);
        const orders: OrderDetail[] = []
        docSnap.forEach((doc) => {
          const orderData = doc.data();
          const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          };
          const date = orderData.createdDate.toDate().toLocaleDateString("en-GB", options)
          orderData.createdDate = date
          orderData.id = doc.id;

          orders.push(orderData as OrderDetail);
        });
        this.orderLists = orders
        setTimeout(() => {
            this.isLoading = false
        }, 800);
      } catch (error) {
        console.log(error);
      }
    },
    async loadOrder(orderId: string) {
      try {
        const docRef = doc(db, "orders", orderId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const orderDetail = docSnap.data()
          const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          };
          const date = orderDetail.createdDate.toDate().toLocaleDateString("en-GB", options)
          orderDetail.createdDate = date
          orderDetail.id = docSnap.id;
          return orderDetail as OrderDetail
        }
      } catch (error) {
        console.log("error from load order detail : ", error)
      }
    },
    async cancelOrder(orderId: string) {
      try {
        const docRef = doc(db, "orders", orderId)
        await updateDoc(docRef, { status: 'Canceled' })
        window.location.reload()
      } catch (error) {
        console.log('error from cancel order : ', error)
      }
    }
  },
});

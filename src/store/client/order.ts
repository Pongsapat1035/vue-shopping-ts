import { defineStore } from "pinia";
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useAuthStore } from "../auth";

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
  id: string;
  totalProductPrice: number;
  totalShippingPrice: number;
  totalPrice: number;
  status: string;
  createdDate: Date;
  products: ProductData[];
}

export const useOrderStore = defineStore("orderStore", {
  state: (): {
    orderLists: OrderDetail[];
    orderDetail: OrderDetail;
  } => ({
    orderLists: [],
    orderDetail: {
      id: "",
      totalPrice: 0,
      totalProductPrice: 0,
      totalShippingPrice: 0,
      products: [],
      status: "",
      createdDate: new Date(),
    },
  }),
  getters: {
    user(): string {
      return useAuthStore().userId;
    },
  },
  actions: {
    async loadOrder(orderId: string) {
      try {
        const docRef = doc(db, "orders", this.user, "orderLists", orderId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          // const recievedData = { ...(docSnapshot.data() as OrderDetail) }
          // convertData.createdDate = convertData.createdDate.seconds
          // const recievedData:OrderDetail = docSnapshot.data() as OrderDetail
          // recievedData.createdDate = recievedData.createdDate.seconds
          const recievedData = docSnapshot.data() ;
          recievedData.createdDate = recievedData.createdDate.toDate()
          console.log('check data : ', recievedData)
          // console.log(recievedData)
          this.orderDetail = { ...(recievedData as OrderDetail) };
        }
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },
    async loadAllOrders() {
      try {
        const docRef = collection(db, "orders", this.user, "orderLists");
        const docSnapshot = await getDocs(docRef);
        const result: any[] = [];
        docSnapshot.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          result.push(docData);
        });
        this.orderLists = result;
      } catch (error) {
        console.log(error);
      }
    },
    getOrderDetail() {},
  },
});

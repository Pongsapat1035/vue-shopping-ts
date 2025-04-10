import { defineStore } from "pinia";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuthStore } from "../auth";
import axios from "axios";

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

Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY);

const createSource = (amount: number) => {
  return new Promise((resolve, reject) => {
    // ทำการส่ง source ที่ต้องการจ่ายไป omise เพื่อนำ source token กลับมา
    Omise.createSource(
      "rabbit_linepay",
      {
        amount: amount * 100,
        currency: "THB",
      },
      (statusCode, response) => {
        if (statusCode !== 200) {
          // get error
          return reject(response);
        }
        resolve(response);
      }
    );
  });
};

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
        const docRef = doc(db, "orders", orderId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const recievedData = docSnapshot.data();
          recievedData.createdDate = recievedData.createdDate.toDate();
          recievedData.id = docSnapshot.id;
          this.orderDetail = { ...(recievedData as OrderDetail) };
        }
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },
    async loadAllOrders() {
      try {
        const docRef = query(
          collection(db, "orders"),
          where("userId", "==", this.user)
        );
        // const docRef = collection(db, "orders", this.user, "orderLists");
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
    async payment(): Promise<string | null> {
      // const test = { m: "1233", b: "556" };
      try {
        const omiseResponse: any = await createSource(
          this.orderDetail.totalPrice
        );
        interface CheckoutDetail {
          sourceId: string;
          checkout: OrderDetail;
        }
        const sourceId = omiseResponse.id;
        const checkOutDetail: CheckoutDetail = {
          sourceId,
          checkout: this.orderDetail,
        };

        // console.log("check response : ", omiseResponse);
        const response = await axios.post("/api/payment", checkOutDetail);
        // console.log("check url : ", response.data);
        return response.data.paymentUrl;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
});

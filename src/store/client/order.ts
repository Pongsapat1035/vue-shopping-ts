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
import type { OrderDetail } from "../../types";

Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY);

type OrderList = Pick<OrderDetail, "id" | "status"> & {
  products: string[]
}

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
          return reject(response);
        }
        resolve(response);
      }
    );
  });
};

export const useOrderStore = defineStore("orderStore", {
  state: (): {
    orderLists: OrderList[];
    orderDetail: OrderDetail;
  } => ({
    orderLists: [],
    orderDetail: {
      id: "",
      totalPrice: 0,
      totalProductPrice: 0,
      totalShippingPrice: 0,
      userId: '',
      customerName: '',
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
        const docSnapshot = await getDocs(docRef);
        const result: OrderList[] = [];
        docSnapshot.forEach((doc) => {
          const docData:Partial<OrderDetail> = doc.data();
          const productName: string[] = (docData.products ?? []).map(product => (product.productInfo?.name ?? ""))
       
          const orderData: OrderList = {
            id: doc.id,
            status: docData.status ?? "",
            products: productName
          }
          
          result.push(orderData);
        });
        this.orderLists = result;
        console.log('order lists : ', this.orderLists)
      } catch (error) {
        console.log(error);
      }
    },
    async payment(): Promise<string | null> {
      try {
        const omiseResponse: any = await createSource(this.orderDetail.totalPrice);
        type CheckoutDetail =  {
          sourceId: string;
          checkout: OrderDetail;
        }
        const sourceId = omiseResponse.id;

        const checkOutDetail: CheckoutDetail = {
          sourceId,
          checkout: this.orderDetail,
        };
       
        const response = await axios.post("/api/payment", checkOutDetail);
        // console.log("check url : ", response.data);
        console.log("check response : ", response);

        return response.data.paymentUrl;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }

        return null;
      }
    },
  },
});

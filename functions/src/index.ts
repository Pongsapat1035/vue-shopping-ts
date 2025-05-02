import { onRequest } from "firebase-functions/v2/https";

import express from "express";
import { Request, Response } from "express";
import { realtimeDB, } from "./firebaseConfig";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import type { OrderDetail } from "./types";

import { paymentHandle, webhookHandle, restockHandle } from "./controller";

const app = express();

app.get("/checkConnect", (req: Request, res: Response) => {
  res.status(200).json({ message: "ok" });
});

app.post("/payment", paymentHandle);
app.post("/webhook", webhookHandle);
app.post("/restock", restockHandle)

export const api = onRequest(app);

const updateTotalDashboard = async (data: OrderDetail) => {
  const orderStatus = data.status
  const orderStatRef = realtimeDB.ref("dashboard/total");
  const isSuccess = orderStatus === "Successful";
  const totalPrice = isSuccess ? data.totalPrice : 0

  await orderStatRef.transaction((currentVal) => {
    if (!currentVal) {
      return {
        successOrder: isSuccess ? 1 : 0,
        cancelOrder: isSuccess ? 0 : 1,
        sell: totalPrice
      };
    }
    if (isSuccess) {
      currentVal.successOrder++;
    } else {
      currentVal.cancelOrder++;
    }

    currentVal.sell += totalPrice;
    return currentVal
  });
}

const updateChartData = async (sale: number) => {
  const date = new Date()
  const month = date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  const day = date.getDate()
  const dbRef = realtimeDB.ref(`dashboard/chart/${month}/${day}`);
  await dbRef.transaction((currentVal) => {
    if (!currentVal) {
      return {
        order: 1,
        sale: sale
      };
    }
    currentVal.order++;
    currentVal.sale += sale;
    return currentVal
  });

}

export const orderUpdate = onDocumentUpdated(
  "orders/{docId}",
  async (event) => {
    const orderData = event.data?.after.data() as OrderDetail;
    const orderStatus = orderData.status

    if (orderStatus !== "Pending") {
      updateTotalDashboard(orderData)
      if (orderStatus === "Successful")
        updateChartData(orderData.totalPrice)
    }

  }
);

// export const productUpdate = onDocumentUpdated(
//   "products/{docId}",
//   async (event) => {
//     const newData = event.data?.after.data() as ProductData;
//     const oldData = event.data?.before.data() as ProductData;

//     // console.log("check event : ", event);
//     console.log("check old data : ", oldData)
//     console.log("check new data : ", newData)
//     // const productId = event.params.docId;
//     // const { remainQuantity, status } = newData;
//     // if (newData && newData !== oldData && remainQuantity === 0 && !status) {
//     //   const productRef = db.collection("products").doc(productId);
//     //   productRef.update({
//     //     status: false,
//     //   });
//     // }
//   }
// );

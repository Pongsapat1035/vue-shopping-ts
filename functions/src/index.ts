import { onRequest } from "firebase-functions/v2/https";
import { db, realtimeDB } from "./firebaseConfig.js";
import express from "express";
import Omise from "omise";
import { FieldValue } from "firebase-admin/firestore";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

const omise = Omise({
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: "2019-05-29",
});

const app = express();

const createCharge = (source: string, amount: number, orderId: string) => {
  return new Promise((reslove, reject) => {
    omise.charges.create(
      {
        amount: amount * 100,
        currency: "thb",
        return_uri: `${process.env.REDIRECT_URL_HOST}/user/checkout/${orderId}`,
        source,
        metadata: {
          orderId,
        },
      },
      function (error, charge) {
        if (error) {
          reject(error);
        }
        reslove(charge);
      }
    );
  });
};

interface ProductData {
  name: string;
  price: number;
  totalPrice: number;
  remainQuantity: number;
  coverImg: string;
  id: string;
  color: string | "";
  size: string | "";
  quantity: number;
  status: boolean;
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

app.get("/checkConnect", (req, res) => {
  res.status(200).json({ message: "ok" });
});

app.post("/payment", async (req, res) => {
  try {
    const { sourceId, checkout } = req.body;
    const orderId = checkout.id;
    type PaymentUrl = { authorize_uri: string };

    const { authorize_uri } = (await createCharge(
      sourceId,
      checkout.totalPrice,
      orderId
    )) as PaymentUrl;

    res.json({ paymentUrl: authorize_uri });
  } catch (error) {
    if (error instanceof Error) {
      console.log("trigger");
      res.status(500).json({
        message: error.message || "Something went wrong",
      });
    }
  }
});

app.post("/webhook", async (req, res) => {
  const event: any = req.body;
  const status = event.data.status;
  const orderId = event.data.metadata.orderId;
  try {
    if (event.key === "charge.complete") {
      if (status) {
        const orderRef = db.collection("orders").doc(orderId);

        await db.runTransaction(async (transection) => {
          const orderSnapshot = await transection.get(orderRef);
          if (!orderSnapshot.exists) {
            throw "Order does not exists";
          }
          const orderData = orderSnapshot.data() as OrderDetail;
          const products: ProductData[] = orderData.products;

          // update all
          for (const product of products) {
            const productRef = db.collection("products").doc(product.id);
            console.log("check status");
            if (status === "successful") {
              transection.update(productRef, {
                quantityServe: FieldValue.increment(-product.quantity),
              });
            } else {
              console.log("payment fail");
              transection.update(productRef, {
                remainQuantity: FieldValue.increment(product.quantity),
                quantityServe: FieldValue.increment(-product.quantity),
              });
              console.log("restore stock success !! ");
            }
            transection.update(orderRef, {
              status: status === "successful" ? "Success" : "Failue",
            });
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

export const api = onRequest(app);

export const orderUpdate = onDocumentUpdated(
  "orders/{docId}",
  async (event) => {
    const newData = event.data?.after.data() as OrderDetail;
    const status = newData.status;
    const orderStatRef = realtimeDB.ref("stats/order");

    if (newData && status === "Success") {
      const products = newData.products;
      await db.runTransaction(async (transection) => {
        for (const product of products) {
          const productRef = db.collection("products").doc(product.id);
          transection.update(productRef, {
            usedQuantity: FieldValue.increment(product.quantity),
          });
        }
      });
      // update total price
      await orderStatRef.transaction((currentVal) => {
        return currentVal + newData.totalPrice;
      });
    }
  }
);

export const productUpdate = onDocumentUpdated(
  "products/{docId}",
  async (event) => {
    const newData = event.data?.after.data() as ProductData;
    const oldData = event.data?.before.data() as ProductData;
    console.log("check event : ", event);
    const productId = event.params.docId;
    const { remainQuantity, status } = newData;
    if (newData && newData !== oldData && remainQuantity === 0 && !status) {
      const productRef = db.collection("products").doc(productId);
      productRef.update({
        status: false,
      });
    }
  }
);

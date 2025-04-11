import { onRequest } from "firebase-functions/v2/https";
import { db } from "./firebaseConfig.js";
import express from "express";
import Omise from "omise";

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
        metadata:{
          orderId
        }
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
  id: string;
  color: string | "";
  size: string | "";
  quantity: number;
  name: string;
  price: number;
  totalPrice: number;
  remainQuantity: number;
  coverImg: string;
}

app.post("/payment", async (req, res) => {
  try {
    const { sourceId, checkout } = req.body;
    const orderId = checkout.id;
    type PaymentUrl = { authorize_uri: string };

    type ProductId = { id: string; quantity: number };
    const productsIdLists: ProductId[] = checkout.products.map(
      (product: any) => ({
        id: product.id,
        quantity: product.quantity,
      })
    );

    for (const product of productsIdLists) {
      const docRef = db.collection("products").doc(product.id);
      const docSnap = await docRef.get();

      const productData = docSnap.data() as ProductData;
      if (
        docSnap.exists &&
        product.quantity > Number(productData.remainQuantity)
      ) {
        console.log('item out of stock')
        throw new Error(`${productData.name} out of stock`);
      }
    };

    const { authorize_uri } = (await createCharge(
      sourceId,
      checkout.totalPrice,
      orderId
    )) as PaymentUrl;

    res.json({ paymentUrl: authorize_uri });
  } catch (error) {
    if(error instanceof Error){
      console.log("trigger")
      res.status(500).json({
        message: error.message || 'Something went wrong',
      });
    }
  }
});

app.post("/webhook", (req, res) => {
  const event: any = req.body;
  const status = event.data.status;
  if (event.key === "charge.complete") {
    if (status === "successful") {
      console.log("payment success !!!");
      // set status to success
      // decrease quantityServe 
      // db.collection("orders").doc()
    } else {
      console.log("Payment fail"); 
      
    }
  }

  res.json({ message: "ok" });
});

export const api = onRequest(app);

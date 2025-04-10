import { onRequest } from "firebase-functions/v2/https";
import { db } from "../firebase";
import express from "express";
import Omise from "omise";

const omise = Omise({
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: "2019-05-29",
});

const createCharge = (source: string, amount: number, orderId: string) => {
  return new Promise((reslove, reject) => {
    omise.charges.create(
      {
        amount: amount * 100,
        currency: "thb",
        return_uri: `${process.env.REDIRECT_URL_HOST}/user/checkout/${orderId}`,
        source,
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

const app = express();

app.post("/payment", async (req, res) => {
  try {
    const { sourceId, checkout } = req.body;
    const orderId = checkout.id;
    type PaymentUrl = { authorize_uri: string };

    // check stock

    const { authorize_uri } = (await createCharge(
      sourceId,
      checkout.totalPrice,
      orderId
    )) as PaymentUrl;

    res.json({ paymentUrl: authorize_uri });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.post("/webhook", (req, res) => {
  console.log("webhook body : ", req.body);
  const event: any = req.body;
  const status = event.data.status;
  if (event.key === "charge.complete") {
    if (status === "successful") {
      console.log("payment success !!!");
      // set status to success
    } else {
      console.log("Payment fail");
    }
  }

  res.json({ message: "ok" });
});

export const api = onRequest(app);

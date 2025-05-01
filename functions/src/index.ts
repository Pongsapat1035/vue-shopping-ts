import { onRequest } from "firebase-functions/v2/https";
import { db, realtimeDB } from "./firebaseConfig";
import express from "express";
import { Request, Response } from "express";
import Omise from "omise";
import { FieldValue } from "firebase-admin/firestore";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import type { ProductData, OrderDetail, ProductDetail, ProductVariants } from "./types";

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

app.get("/checkConnect", (req: Request, res: Response) => {
  res.status(200).json({ message: "ok" });
});

app.post("/payment", async (req: Request, res: Response) => {
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

const manageStock = async (mode: string, product: ProductDetail): Promise<ProductVariants[]> => {
  const productSnap = await db.collection("products").doc(product.id).get();
  if (!productSnap.exists) throw new Error("Product not found")

  const productData = productSnap.data() as ProductData
  const productVariant = productData.variants as ProductVariants[]
  const variantIndex = productVariant?.findIndex(item => item.name === product.variant)

  if (productVariant.length > 0) {
    productVariant[variantIndex].serveQuantity -= product.quantity
    if (mode === 'success') {
      productVariant[variantIndex].soldQuantity += product.quantity
    } else {
      productVariant[variantIndex].remainQuantity += product.quantity
    }
  }
  return productVariant
}

app.post("/webhook", async (req: Request, res: Response) => {
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
          const products: ProductDetail[] = orderData.products;

          // update all
          for (const product of products) {
            const productRef = db.collection("products").doc(product.id);

            if (status === "successful") {
              const variantType = product.variantType
              const newVariant: ProductVariants[] = await manageStock('success', product)

              transection.update(productRef, {
                'totalQuantity.serveQty': FieldValue.increment(-product.quantity),
                'totalQuantity.soldQty': FieldValue.increment(product.quantity),
                variants: variantType === 'none' ? [] : newVariant
              });
              transection.update(orderRef, {
                status: "Success"
              });
            }
          }
        });
      }
    }
  } catch (error) {
    console.log('error from webhook : ', error);
  }
});



app.post("/restock", async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body
    if (!orderId) res.status(401).json({ message: 'Order id not found' })

    await db.runTransaction(async (transection) => {
      const orderRef = db.collection("orders").doc(orderId);
      const orderSnapshot = await transection.get(orderRef);

      if (!orderSnapshot.exists) {
        throw "Order does not exists";
      }

      const orderData = orderSnapshot.data() as OrderDetail;
      const products: ProductDetail[] = orderData.products;

      for (const product of products) {
        const productRef = db.collection("products").doc(product.id);
        const variantType = product.variantType
        let newVariant: ProductVariants[] = await manageStock('restock', product)

        transection.update(productRef, {
          'totalQuantity.serveQty': FieldValue.increment(-product.quantity),
          'totalQuantity.remainQty': FieldValue.increment(product.quantity),
          variants: variantType === 'none' ? [] : newVariant
        });
      }
      transection.update(orderRef, {
        status: "Success"
      });

    })
  } catch (error) {
    console.log('restock error :', error)
    if (error instanceof Error)
      res.status(500).json({ message: error.message })
  }
})

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

// export const productUpdate = onDocumentUpdated(
//   "products/{docId}",
//   async (event) => {
//     const newData = event.data?.after.data() as ProductData;
//     const oldData = event.data?.before.data() as ProductData;
//     console.log("check event : ", event);
//     const productId = event.params.docId;
//     const { remainQuantity, status } = newData;
//     if (newData && newData !== oldData && remainQuantity === 0 && !status) {
//       const productRef = db.collection("products").doc(productId);
//       productRef.update({
//         status: false,
//       });
//     }
//   }
// );

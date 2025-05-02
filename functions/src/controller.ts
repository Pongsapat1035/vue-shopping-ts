import { Request, Response } from "express";
import { createCharge } from "./utils";
import { db } from "./firebaseConfig";
import type {  OrderDetail, ProductDetail, ProductVariants } from "./types";
import { FieldValue } from "firebase-admin/firestore";
import { manageStock } from "./utils";

export const paymentHandle = async (req: Request, res: Response) => {
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
}

export const webhookHandle = async (req: Request, res: Response) => {
    const event: any = req.body;
    const status = event.data.status;
    const orderId = event.data.metadata.orderId;

    try {
        if (event.key === "charge.complete") {
            if (status === "successful") {
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
                        const variantType = product.variantType
                        const newVariant: ProductVariants[] = await manageStock('success', product)

                        transection.update(productRef, {
                            'totalQuantity.serveQty': FieldValue.increment(-product.quantity),
                            'totalQuantity.soldQty': FieldValue.increment(product.quantity),
                            variants: variantType === 'none' ? [] : newVariant
                        });
                    }
                    transection.update(orderRef, {
                        status: "Successful"
                    });
                });
            }
        }
    } catch (error) {
        console.log('error from webhook : ', error);
    }
}

export const restockHandle = async (req: Request, res: Response) => {
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
                status: "Canceled"
            });

        })
    } catch (error) {
        console.log('restock error :', error)
        if (error instanceof Error)
            res.status(500).json({ message: error.message })
    }
}
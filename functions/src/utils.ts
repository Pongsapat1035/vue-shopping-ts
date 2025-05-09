import Omise from "omise";
import type { ProductDetail, ProductData, ProductVariants, OrderDetail } from "./types";
import { db, realtimeDB } from "./firebaseConfig";
import algolia from './algoliaConfig'

const omise = Omise({
    secretKey: process.env.OMISE_SECRET_KEY,
    omiseVersion: "2019-05-29",
});
const indexName = "products";

export const createCharge = (source: string, amount: number, orderId: string) => {
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

export const manageStock = async (mode: string, product: ProductDetail): Promise<ProductVariants[]> => {
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

export const updateTotalDashboard = async (data: OrderDetail) => {
    const orderStatus = data.status
    const orderStatRef = realtimeDB.ref("dashboard/total");
    const isSuccess = orderStatus === "Successful";
    const totalPrice = isSuccess ? data.totalPrice : 0

    await orderStatRef.transaction((currentVal) => {
        if (!currentVal) {
            return {
                successOrder: isSuccess ? 1 : 0,
                cancelOrder: isSuccess ? 0 : 1,
                sale: totalPrice
            };
        }
        if (isSuccess) {
            currentVal.successOrder++;
        } else {
            currentVal.cancelOrder++;
        }

        currentVal.sale += totalPrice;
        return currentVal
    });
}

export const updateChartData = async (sale: number) => {
    const date = new Date()
    const month = date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    const day = date.toLocaleDateString("en-US", { month: "short", day: '2-digit' })
    const dbRef = realtimeDB.ref(`dashboard/chart/${month}/${day}`);
    await dbRef.transaction((currentVal) => {
        if (!currentVal) {
            return {
                // order: 1,
                sale: sale
            };
        }
        // currentVal.order++;
        currentVal.sale += sale;
        return currentVal
    });
}

export const checkStockInVariants = (newVariants: ProductVariants[], oldVariants: ProductVariants[], id: string) => {

    let haveUpdate = false

    for (let i = 0; i < newVariants.length; i++) {
        if (newVariants[i].remainQuantity === 0 && oldVariants[i].enable) {
            newVariants[i].enable = false
            haveUpdate = true
        }

        if (newVariants[i].remainQuantity !== 0 && !oldVariants[i].enable) {
            newVariants[i].enable = true
            haveUpdate = true
        }
    }

    if (haveUpdate) {
        const productRef = db.collection("products").doc(id);
        productRef.update({
            variants: newVariants,
        });
        haveUpdate = false
    }
}

export const createRecord = async (docData: ProductData, docId: string) => {
    const variantType = docData.variantType
    const productData = {
        id: docId,
        name: docData.productInfo.name,
        price: docData.productInfo.price,
        description: docData.productInfo.description,
        coverImg: docData.productInfo.coverImg,
        remainQuantity: (docData.totalQuantity?.remainQty ?? 0),
        variantType,
        variants : variantType !== 'none' ? docData.variantName : [],
        createAt: new Date()
    }

    const { taskID } = await algolia.addOrUpdateObject({
        indexName,
        objectID: docId,
        body: productData,
    });
    return taskID
}

export const deleteRecord = async (docId: string) => {
    const response = await algolia.deleteObject({ indexName, objectID: docId });
    return response
}
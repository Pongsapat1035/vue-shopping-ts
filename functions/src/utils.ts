import Omise from "omise";
import type { ProductDetail, ProductData, ProductVariants } from "./types";
import { db } from "./firebaseConfig";

const omise = Omise({
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: "2019-05-29",
});

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
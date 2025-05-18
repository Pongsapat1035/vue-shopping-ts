import { defineStore } from "pinia";
import { useAuthStore } from "../auth";
import { realtimeDB, db } from "../../firebase";

import { ref, onValue, set, type DatabaseReference } from "firebase/database";
import { useAlertStore } from "../alert";
import { useAdminProductStore } from "../admin/product";
import {
  collection,
  addDoc,
  doc,
  increment,
  getDoc,
  runTransaction,
} from "firebase/firestore";
import type {
  ProductData,
  ProductCart,
  ProductCartDetail,
  OrderDetail, AddressInfo
} from "../../types";
import { allInputIsFilled } from "../../utils/validate.method";

export const useCartStore = defineStore("cartStore", {
  state: (): {
    cartItems: ProductCart[];
    productLists: ProductCartDetail[];
    userId: string;
    shippingPrice: number;
  } => ({
    cartItems: [],
    productLists: [],
    userId: "",
    shippingPrice: 10,
  }),
  getters: {
    user(): string {
      return useAuthStore().userId;
    },
    cartRef(): DatabaseReference {
      return ref(realtimeDB, `carts/${this.user}`);
    },
    getTotalItem(): number {
      return this.cartItems.reduce(
        (acc, currentVal) => acc + (currentVal.quantity ?? 0),
        0
      );
    },
    getTotalProductPrice(): number {
      return this.productLists.reduce(
        (acc, currentVal) => acc + currentVal.totalPrice,
        0
      );
    },
    getTotalShipping(): number {
      return this.shippingPrice * this.productLists.length;
    },
    getTotalPrice(): number {
      return Number(this.getTotalProductPrice) + Number(this.getTotalShipping);
    },
  },
  actions: {
    async loadCart() {
      try {
        if (this.user) {
          const productStore = useAdminProductStore();

          onValue(this.cartRef, async (snapShot) => {
            const data = snapShot.val();
            this.cartItems = data || [];
            if (data) {
              // have product on cart
              const promise = data.map(async (product: ProductCart) => {
                const recievedProduct = (await productStore.loadProduct(product.id)) as ProductData;

                if (recievedProduct) {
                  // found product
                  const { productInfo, variantType, totalQuantity, variants } = recievedProduct;
                  const totalPrice = Number(productInfo.price) * product.quantity;
                  const findVariant = variants?.find((el) => el.name === product.variant);

                  const productRemain = findVariant?.remainQuantity ?? 0;
                  const remainQuantity =
                    variantType === "none"
                      ? totalQuantity?.remainQty
                      : productRemain;

                  const convertData: ProductCartDetail = {
                    id: product.id,
                    productInfo: productInfo,
                    totalPrice,
                    remainQuantity: remainQuantity || 0,
                    quantity: product.quantity,
                    variant: product.variant,
                    variantType: product.variantType,
                  };
                  return convertData;
                } else {
                  this.removeCart(product.id);
                }
              });
              this.productLists = await Promise.all(promise);
              console.log("check product lists : ", this.productLists);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    addItemToCart(product: ProductCart) {
      const findProductIndex = this.cartItems.findIndex(
        (item) => item.id === product.id && item.variant === product.variant
      );
      if (findProductIndex >= 0) {
        // item exits
        const currentItem: ProductCart = this.cartItems[findProductIndex];
        this.updateQuantity(
          findProductIndex,
          (currentItem.quantity ?? 0) + (product.quantity ?? 0)
        );
      } else {
        this.cartItems.push(product);
        set(this.cartRef, this.cartItems);
      }
    },
    updateQuantity(index: number, newQuantity: number) {
      this.cartItems[index].quantity = newQuantity;
      set(this.cartRef, this.cartItems);
    },
    async removeCart(id: string) {
      try {
        const productIndex = this.cartItems.findIndex(
          (product) => product.id === id
        );
        this.cartItems.splice(productIndex, 1);
        this.productLists.splice(productIndex, 1)
        await set(this.cartRef, this.cartItems);

        useAlertStore().toggleAlert("Success", "Delete product success");
      } catch (error) {
        console.log(error);
      }
    },
    removeAllItem() {
      this.cartItems = [];
      set(this.cartRef, this.cartItems);
    },
    async checkStock() {
      for (const product of this.productLists) {
        const docRef = doc(db, "products", product.id);
        const docSnap = await getDoc(docRef);

        const productData = docSnap.data() as ProductData;
        const variantType = product.variantType;
        let productRemainQuantity = 0;
        if (variantType !== "none") {
          const findVariant = productData.variants?.find(
            (item) => item.name === product.variant
          );
          const remainQuantity = findVariant?.remainQuantity ?? 0;
          productRemainQuantity = remainQuantity;
        } else {
          productRemainQuantity = Number(productData.totalQuantity?.remainQty);
        }
        if (product.quantity > productRemainQuantity) {
          throw new Error(`${productData.productInfo.name} out of stock`);
        }
      }
    },
    async serveQuantity() {
      for (const product of this.productLists) {
        const productDocRef = doc(db, "products", product.id);

        await runTransaction(db, async (transection) => {
          const variantType = product.variantType;
          if (variantType !== "none") {
            const productSnap = await transection.get(productDocRef);
            const productData = productSnap.data() as ProductData;
            const variantIndex: number =
              productData.variants?.findIndex(
                (item) => item.name === product.variant
              ) || 0;
            const productVariants = productData.variants || [];

            const prevQuantity = productVariants[variantIndex].remainQuantity;
            const prevServe = productVariants[variantIndex].serveQuantity;

            const newQuantity = (prevQuantity || 0) - product.quantity;
            const newServe = (prevServe || 0) + product.quantity;

            productVariants[variantIndex].remainQuantity = newQuantity;
            productVariants[variantIndex].serveQuantity = newServe;

            transection.update(productDocRef, {
              variants: productVariants,
            });
          }
          transection.update(productDocRef, {
            "totalQuantity.serveQty": increment(product.quantity),
            "totalQuantity.remainQty": increment(-product.quantity),
          });
        });
      }
    },
    async createOrder() {
      try {
        await this.checkStock();
        const addressInfo = useAuthStore().userInfo.addressInfo;
        const checkAddress = allInputIsFilled(addressInfo)

        if(!checkAddress) {
          throw new Error("Please set shipping address in profile setting")
        }

        const orderDetail: OrderDetail = {
          totalProductPrice: this.getTotalProductPrice,
          totalShippingPrice: this.getTotalShipping,
          totalPrice: this.getTotalPrice,
          products: this.productLists,
          status: "Pending",
          createdDate: new Date(),
          userId: this.user,
          customerName: addressInfo.name,
          address: addressInfo
        };

        const docRef = collection(db, "orders");
        const docSnapshot = await addDoc(docRef, orderDetail);

        await this.serveQuantity();
        this.removeAllItem();
        return docSnapshot.id;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },
  },
});

import {onRequest} from "firebase-functions/v2/https";
import {onDocumentCreated, onDocumentDeleted, onDocumentUpdated} from "firebase-functions/v2/firestore";

import express from "express";
import type {OrderDetail, ProductData} from "./types";
import {
  updateTotalDashboard,
  updateChartData,
  checkStockInVariants,
  checkBestSellerProduct,
  createRecord, deleteRecord,
} from "./utils";
import {paymentHandle, webhookHandle, restockHandle, testConnection} from "./controller";

const app = express();

app.get("/api/checkConnect", testConnection);

app.post("/api/payment", paymentHandle);
app.post("/webhook", webhookHandle);
app.post("/api/restock", restockHandle);

export const api = onRequest(app);

export const orderUpdate = onDocumentUpdated(
  {
    document: "orders/{docId}",
    region: "asia-southeast1",
  },
  async (event) => {
    const orderData = event.data?.after.data() as OrderDetail;
    const orderStatus = orderData.status;

    if (orderStatus !== "Pending") {
      updateTotalDashboard(orderData);
      if (orderStatus === "Successful") {
        updateChartData(orderData.totalPrice);
      }
    }
  }
);

export const productUpdate = onDocumentUpdated(
  {
    document: "products/{docId}",
    region: "asia-southeast1",
  },
  async (event) => {
    try {
      const newData = event.data?.after.data() as ProductData;
      const oldData = event.data?.before.data() as ProductData;
      const docId = event.params.docId;
      const variantType = newData.variantType;

      const productSoldQty = newData.totalQuantity.soldQty;
      const productName = newData.productInfo.name;
      checkBestSellerProduct((productSoldQty ?? 0), productName);

      if (variantType !== "none") {
        const newVariants = (newData.variants ?? []);
        const oldVariants = (oldData.variants ?? []);
        const productId = event.params.docId;
        checkStockInVariants(newVariants, oldVariants, productId);
      }

      const taskId = await createRecord(newData, docId);
      console.log("create record Success task id : ", taskId);
    } catch (error) {
      console.log("trigger : update product ERROR : ", error);
    }
  }
);

export const productCreate = onDocumentCreated(
  {
    document: "products/{docId}",
    region: "asia-southeast1",
  },
  async (event) => {
    try {
      const docData = event.data?.data() as ProductData;
      const docId = event.params.docId;

      const taskId = await createRecord(docData, docId);
      console.log("create recordSuccess task id : ", taskId);
    } catch (error) {
      console.log("trigger : create product ERROR : ", error);
    }
  }
);

export const productDelete = onDocumentDeleted(
  {
    document: "products/{docId}",
    region: "asia-southeast1",
  },
  async (event) => {
    try {
      const docId = event.params.docId;
      const response = deleteRecord(docId);

      console.log("delete record success : ", response);
    } catch (error) {
      console.log("trigger : delete product ERROR : ", error);
    }
  }
);

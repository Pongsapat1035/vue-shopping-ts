import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

initializeApp({
  projectId: process.env.FB_PROJECT_ID,
});

const db = getFirestore();
const auth = getAuth();

export { db, auth };

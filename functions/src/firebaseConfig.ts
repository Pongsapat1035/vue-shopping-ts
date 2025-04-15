import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

initializeApp({
  projectId: process.env.FB_PROJECT_ID,
  databaseURL: 'http://127.0.0.1:9000/?ns=vue-shopping-web-default-rtdb'
});

const db = getFirestore();
const auth = getAuth();
const realtimeDB = getDatabase()

export { db, auth, realtimeDB };

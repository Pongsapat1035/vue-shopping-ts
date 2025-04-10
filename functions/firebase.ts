import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

initializeApp({
  credential: applicationDefault(),
  projectId: process.env.FB_PROJECT_ID,
  databaseURL: process.env.FB_DATABASE_URL,
});

const db = getFirestore();
const auth = getAuth();
const realtimeDB = getDatabase();
export { db, auth, realtimeDB };

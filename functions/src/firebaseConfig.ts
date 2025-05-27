import {initializeApp, applicationDefault} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {getAuth} from "firebase-admin/auth";
import {getDatabase} from "firebase-admin/database";
import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.resolve(__dirname, "../.env")});

initializeApp({
  credential: applicationDefault(),
  databaseURL: process.env.FB_DATABASE_URL,
});

const db = getFirestore();
const auth = getAuth();
const realtimeDB = getDatabase();

export {db, auth, realtimeDB};

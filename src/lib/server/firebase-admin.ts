import {
  initializeApp,
  cert,
  type ServiceAccount,
  getApps,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { FIREBASE_ADMIN } from "$env/static/private";
import { getAuth } from "firebase-admin/auth";
const serviceAccount = JSON.parse(FIREBASE_ADMIN) as ServiceAccount;

if (getApps().length === 0) {
  initializeApp({ credential: cert(serviceAccount) });
}
export const db = getFirestore();
export const auth = getAuth();

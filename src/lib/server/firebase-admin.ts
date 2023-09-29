import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { FIREBASE_ADMIN } from "$env/static/private";
const serviceAccount = JSON.parse(FIREBASE_ADMIN) as ServiceAccount;

initializeApp({ credential: cert(serviceAccount) });
export const db = getFirestore();

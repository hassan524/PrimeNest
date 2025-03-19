import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = JSON.parse(process.env.FIREBASE_CREDENTIALS as string);

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

console.log("Firebase connected successfully!");

export default admin;

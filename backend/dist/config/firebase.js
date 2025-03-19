"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const firebaseConfig = JSON.parse(process.env.FIREBASE_CREDENTIALS);
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(firebaseConfig),
});
console.log("Firebase connected successfully!");
exports.default = firebase_admin_1.default;

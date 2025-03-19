"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const firebase_1 = __importDefault(require("../config/firebase"));
const db = firebase_1.default.firestore();
const setupSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "https://prime-nest-a9x1.vercel.app",
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    io.on("connection", (socket) => {
        socket.on("join_room", (roomid) => __awaiter(void 0, void 0, void 0, function* () {
            socket.join(roomid);
            try {
                const messagesSnapshot = yield db
                    .collection("messages")
                    .where("roomid", "==", roomid)
                    .orderBy("timestamp", "asc")
                    .get();
                const messages = messagesSnapshot.docs.map((doc) => doc.data());
                socket.emit("previous_messages", messages);
            }
            catch (error) {
                console.error("Error fetching messages:", error);
            }
        }));
        socket.on("check_room_status", (room) => {
            const rooms = Array.from(socket.rooms);
            const isJoined = rooms.includes(room);
            socket.emit("room_status", { room, status: isJoined });
        });
        socket.on("send_message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const messageData = {
                    senderId: data.senderId,
                    text: data.text,
                    timestamp: firebase_1.default.firestore.FieldValue.serverTimestamp(),
                };
                yield db
                    .collection("messages")
                    .doc(data.roomId)
                    .collection("chats")
                    .add(messageData);
                io.to(data.roomId).emit("receive_message", Object.assign(Object.assign({}, messageData), { roomId: data.roomId }));
                console.log("Message sent and saved:", Object.assign(Object.assign({}, messageData), { roomId: data.roomId }));
            }
            catch (error) {
                console.error("Error saving message:", error);
            }
        }));
        socket.on("disconnect", () => {
            io.emit("user_disconnected");
        });
    });
    return io;
};
exports.default = setupSocket;

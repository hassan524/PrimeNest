import { Server } from "socket.io";
import admin from "../config/firebase";

// ✅ Configure Firestore to ignore undefined values
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

const setupSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "https://prime-nest-a9x1.vercel.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`✅ New client connected: ${socket.id}`);

    // ✅ User joins a room
    socket.on("join_room", async (roomId) => {
      console.log(`📌 User joined room: ${roomId}`);
      socket.join(roomId);
    });

    // ✅ Check if user is in a room
    socket.on("check_room_status", (room) => {
      const rooms = Array.from(socket.rooms);
      const isJoined = rooms.includes(room);
      console.log(`🔍 Checking room status: ${room} -> ${isJoined}`);

      socket.emit("room_status", { room, status: isJoined });
    });

    // ✅ Sending a message
    socket.on("send_message", async (messagePayload) => {
      console.error("⚡ send_message event TRIGGERED! 🚀");

      if (!messagePayload) {
        console.error("❌ No message payload received!");
        return;
      }

      console.error("📨 Received message payload:", JSON.stringify(messagePayload, null, 2));

      // ✅ Validate incoming messagePayload
      if (!messagePayload.from || !messagePayload.message || !messagePayload.roomId) {
        console.error("❌ Missing required fields in message payload!", messagePayload);
        return;
      }

      try {
       const messageData: any = {
  senderId: data.senderId || "unknown_sender",
  from: data.from || "Unknown Sender",
  to: data.to || "unknown",
  message: data.message || "",
  timestamp: admin.firestore.FieldValue.serverTimestamp(),
  roomId: data.roomId || "unknown_room",
};

        console.error("✅ Before Removing Undefined Values:", JSON.stringify(messageData, null, 2));

        // 🔥 Remove undefined or null fields
        Object.keys(messageData).forEach(
          (key) => (messageData[key] === undefined || messageData[key] === null) && delete messageData[key]
        );

        console.error("✅ Final Message Data:", JSON.stringify(messageData, null, 2));

        const docRef = await db.collection("messages").add(messageData);
        const docId = docRef.id;
        await docRef.update({ messageId: docId });

        io.to(messagePayload.roomId).emit("receive_message", { ...messageData, messageId: docId });

        console.error(`✅ Message stored in Firestore with ID: ${docId}`);
      } catch (error) {
        console.error("❌ Error saving message:", error);
      }
    });

    // ✅ Handle user disconnection
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
      io.emit("user_disconnected");
    });
  });

  return io;
};

export default setupSocket;

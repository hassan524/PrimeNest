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
socket.on("send_message", async (data) => {
  console.error("⚡ send_message event TRIGGERED! 🚀"); // Use console.error for better visibility

  if (!data) {
    console.error("❌ No data received!");
    return;
  }

  console.error("📨 Received message data:", JSON.stringify(data, null, 2)); // Force logs

  try {
  const messageData: any = {
   from: data.from || "Unknown Sender", // Prevent undefined
   to: data.to || "unknown",
   message: data.message || "",
   timestamp: admin.firestore.FieldValue.serverTimestamp(),
   roomId: data.roomId || "unknown_room",
 }

    console.error("✅ Before Removing Undefined Values:", JSON.stringify(messageData, null, 2));

    Object.keys(messageData).forEach(
      (key) => messageData[key] === undefined && delete messageData[key]
    );

    console.error("✅ Final Message Data:", JSON.stringify(messageData, null, 2));

    const docRef = await db.collection("messages").add(messageData);
    const docId = docRef.id;
    await docRef.update({ messageId: docId });

    io.to(data.roomId).emit("receive_message", { ...messageData, messageId: docId });

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

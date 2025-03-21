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
    socket.on("send_message", (messagePayload) => {
  console.error("📨 Received message payload:", JSON.stringify(messagePayload, null, 2));

  if (!messagePayload) {
    console.error("❌ No messagePayload received!");
    return;
  }

  if (!messagePayload.senderId) {
    console.error("❌ senderId is missing or undefined!");
  }

  // Just emit the message back to the room
  io.to(messagePayload.roomId).emit("receive_message", messagePayload);

  console.error("✅ Message emitted to room:", messagePayload.roomId);
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

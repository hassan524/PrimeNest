import { Server } from "socket.io";
import admin from "../config/firebase";

const db = admin.firestore();

const setupSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "https://prime-nest-a9x1.vercel.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join_room", async (roomId) => {
      console.log(`User joined room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on("check_room_status", (room) => {
      const rooms = Array.from(socket.rooms);
      const isJoined = rooms.includes(room);
      console.log(`🔍 Checking room status: ${room} -> ${isJoined}`);

      socket.emit("room_status", { room, status: isJoined });
    });

    socket.on("send_message", async (messagePayload) => {
      console.log("📨 Received message payload:", JSON.stringify(messagePayload, null, 2));

      if (!messagePayload || !messagePayload.from || !messagePayload.to || !messagePayload.roomId || !messagePayload.message) {
        console.error("❌ Invalid message payload!");
        return;
      }

      try {
        // Save message to Firestore
        const messageRef = await db.collection("messages").add({
          from: messagePayload.from,
          to: messagePayload.to,
          roomId: messagePayload.roomId,
          message: messagePayload.message,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });

        console.log("✅ Message saved to Firestore with ID:", messageRef.id);

        // Emit message to the room
        io.to(messagePayload.roomId).emit("receive_message", {
          id: messageRef.id,
          ...messagePayload,
          timestamp: new Date(), // Add timestamp for UI update
        });

        console.log("📤 Message emitted to room:", messagePayload.roomId);
      } catch (error) {
        console.error("❌ Error saving message to Firestore:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      io.emit("user_disconnected");
    });
  });

  return io;
};

export default setupSocket;

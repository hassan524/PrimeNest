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

    // User joins a room
    socket.on("join_room", async (roomId) => {
      console.log(`User joined room: ${roomId}`);
      socket.join(roomId);

      try {
        const messagesSnapshot = await db
          .collection("messages")
          .where("roomId", "==", roomId)
          .orderBy("timestamp", "asc") // Oldest messages first
          .get();

        const messages = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        socket.emit("load_previous_messages", messages);
      } catch (error) {
        console.error("Error fetching previous messages:", error);
      }
    });

    // Send message event
    socket.on("send_message", async (messagePayload) => {
      console.log("Received message payload:", messagePayload);

      if (!messagePayload?.from || !messagePayload?.to || !messagePayload?.roomId || !messagePayload?.message) {
        console.error("Invalid message payload!");
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

        console.log("Message saved to Firestore with ID:", messageRef.id);

        const savedMessage = {
          id: messageRef.id,
          ...messagePayload,
          timestamp: new Date().toISOString(),
        };

        io.to(messagePayload.roomId).emit("receive_message", savedMessage);
      } catch (error) {
        console.error("Error saving message to Firestore:", error);
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

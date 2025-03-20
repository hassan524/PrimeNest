import { Server } from "socket.io";
import admin from "../config/firebase";

// ✅ Configure Firestore to ignore undefined values
admin.firestore().settings({ ignoreUndefinedProperties: true });
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
    console.log(`✅ New client connected: ${socket.id}`);

    // ✅ User joins a room
    socket.on("join_room", async (roomId) => {
      console.log(`📌 User joined room: ${roomId}`);
      socket.join(roomId);

      try {
        // ✅ Fetch previous messages for the room
        const messagesSnapshot = await db
          .collection("messages")
          .where("roomId", "==", roomId) // ✅ Now matching frontend!
          .orderBy("timestamp", "asc")
          .get();

        const messages = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(`📩 Sending previous messages for room ${roomId}`, messages);
        socket.emit("previous_messages", messages);
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
      }
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
      try {
        console.log("📨 Received message data:", data);

        if (!data.roomId) {
          console.error("❌ Error: Missing roomId in message data.");
          return;
        }

        // ✅ Create message object
        const messageData: any = {
          from: data.from ?? null,
          to: data.to ?? null,
          message: data.message ?? null,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          roomId: data.roomId, // ✅ Now matching frontend!
        };

        // ✅ Remove undefined values
        Object.keys(messageData).forEach(
          (key) => messageData[key] === undefined && delete messageData[key]
        );

        console.log("✅ Final message data before saving:", messageData);

        // ✅ Add message to Firestore
        const docRef = await db.collection("messages").add(messageData);
        const docId = docRef.id;

        // ✅ Update Firestore document with its own ID
        await docRef.update({ messageId: docId });

        // ✅ Send message to the room
        const finalMessageData = { ...messageData, messageId: docId };
        io.to(data.roomId).emit("receive_message", finalMessageData);

        console.log(`✅ Message stored in Firestore with ID: ${docId}`);

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

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
      try {
        console.log("📨 Received message data:", data);

        if (!data.roomId || !data.from || !data.message) {
          console.error("❌ Error: Missing required fields!", data);
          return;
        }

        // ✅ Create message object (Ensure no undefined values)
        const messageData: any = {
          from: data.from, 
          to: data.to || "unknown", 
          message: data.message,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          roomId: data.roomId,
        };

        // ✅ Remove any undefined fields
        Object.keys(messageData).forEach(
          (key) => messageData[key] === undefined && delete messageData[key]
        );

        console.log("✅ Final message data before saving:", messageData);

        // ✅ Save to Firestore
        const docRef = await db.collection("messages").add(messageData);
        const docId = docRef.id;  // ✅ Ensure `docId` is set

        // ✅ Update Firestore document with its own ID
        await docRef.update({ messageId: docId });

        // ✅ Emit the message back to the room
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

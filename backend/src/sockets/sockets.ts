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
        const roomRef = db.collection("messages").doc(roomId);
        const roomDoc = await roomRef.get();

        if (roomDoc.exists) {
          const roomData = roomDoc.data();
          socket.emit("load_previous_messages", roomData.messages || []);
        } else {
          socket.emit("load_previous_messages", []);
        }
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

      const newMessage = {
        from: messagePayload.from,
        to: messagePayload.to,
        message: messagePayload.message,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      };

      try {
        const roomRef = db.collection("messages").doc(messagePayload.roomId);

        await roomRef.set(
          {
            messages: admin.firestore.FieldValue.arrayUnion(newMessage),
          },
          { merge: true }
        );

        console.log("Message added to Firestore:", newMessage);

        io.to(messagePayload.roomId).emit("receive_message", newMessage);
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

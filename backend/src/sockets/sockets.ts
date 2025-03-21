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

    socket.on("join_room", async (roomId: string) => {
      console.log(`User joined room: ${roomId}`);
      socket.join(roomId);

      try {
        const roomRef = db.collection("messages").doc(roomId);
        const roomDoc = await roomRef.get();

        if (roomDoc.exists && roomDoc.data()) {
          const roomData = roomDoc.data() as { messages?: any[] }; // Ensuring roomData is defined
          const messages = roomData.messages || [];

          // Sort messages by timestamp
          messages.sort((a, b) => (a.timestamp?.toMillis() || 0) - (b.timestamp?.toMillis() || 0));

          socket.emit("load_previous_messages", messages);
        } else {
          socket.emit("load_previous_messages", []);
        }
      } catch (error) {
        console.error("Error fetching previous messages:", error);
      }
    });

    socket.on("send_message", async (messagePayload: { from: string; roomId: string; message: string }) => {
      console.log("Received message payload:", JSON.stringify(messagePayload, null, 2));

      if (!messagePayload || !messagePayload.from || !messagePayload.roomId || !messagePayload.message) {
        console.error("Invalid message payload!");
        return;
      }

      try {
        const roomRef = db.collection("messages").doc(messagePayload.roomId);
        const newMessage = {
          from: messagePayload.from,
          message: messagePayload.message,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        };

        await roomRef.set(
          {
            messages: admin.firestore.FieldValue.arrayUnion(newMessage),
          },
          { merge: true }
        );

        io.to(messagePayload.roomId).emit("receive_message", {
          ...newMessage,
          timestamp: new Date(),
        });

        console.log("Message emitted to room:", messagePayload.roomId);
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

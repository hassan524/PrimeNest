import { Server } from "socket.io";
import admin from "../config/firebase";

const db = admin.firestore();

const setupSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "https://prime-nest-eim4.vercel.app/",
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

          console.log('sending previous msgs', messages)
          socket.emit("load_previous_messages", messages);
        } else {
          socket.emit("load_previous_messages", []);
        }
      } catch (error) {
        console.error("Error fetching previous messages:", error);
      }
    });

    socket.on("send_message", async (messagePayload: { from: string; roomId: string; message: string }) => {
      console.log('get msg bro', messagePayload)

      if (!messagePayload || !messagePayload.from || !messagePayload.roomId || !messagePayload.message) {
        console.error("Invalid message payload!");
        return;
      }

      try {
        const roomRef = db.collection("messages").doc(messagePayload.roomId);

        const timestamp = admin.firestore.Timestamp.now();

        const newMessage = {
          from: messagePayload.from,
          message: messagePayload.message,
          timestamp: timestamp,
        };

        await roomRef.set(
          {
            messages: admin.firestore.FieldValue.arrayUnion(newMessage),
          },
          { merge: true }
        );

        // Step 4: Emit the message back to all users in the room
        io.to(messagePayload.roomId).emit("receive_message", {
          ...newMessage,
          timestamp: timestamp.toDate(), // Convert Firestore timestamp to JS Date
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

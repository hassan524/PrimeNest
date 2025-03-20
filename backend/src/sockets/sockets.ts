import { Server } from 'socket.io';
import admin from '../config/firebase';

admin.firestore().settings({ ignoreUndefinedProperties: true }); 
const db = admin.firestore();

const setupSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "https://prime-nest-a9x1.vercel.app",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    
    socket.on("join_room", async (roomid) => {  
      socket.join(roomid);

      try {
        const messagesSnapshot = await db
          .collection("messages")
          .where("roomid", "==", roomid)
          .orderBy("timestamp", "asc")
          .get();

        const messages = messagesSnapshot.docs.map((doc) => doc.data());
        socket.emit("previous_messages", messages);
        
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    });

    socket.on("check_room_status", (room) => {
      const rooms = Array.from(socket.rooms);
      const isJoined = rooms.includes(room);

      socket.emit("room_status", { room, status: isJoined });
    });

   socket.on("send_message", async (data) => {
  try {
    // ✅ Create message object
    const messageData: any = {
      from: data.from ?? null,  
      to: data.to ?? null,      
      message: data.message ?? null, 
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    // ✅ Remove undefined values
    Object.keys(messageData).forEach(
      (key) => messageData[key] === undefined && delete messageData[key]
    );

    console.log("Final Message Data Before Saving:", messageData);

    // ✅ Add message to Firestore and get the document reference
    const docRef = await db.collection("messages").add(messageData);
    
    // ✅ Get the generated Firestore document ID
    const docId = docRef.id;

    // ✅ Now update the document to include its own ID as `roomId`
    await docRef.update({ roomId: docId });

    // ✅ Send updated message data to clients
    const finalMessageData = { ...messageData, roomId: docId };
    socket.to(docId).emit("receive_message", finalMessageData);

    console.log("Message stored with roomId:", docId);
  } catch (error) {
    console.error("Error saving message:", error);
  }
});


    socket.on("disconnect", () => {
      io.emit("user_disconnected");
    });

  });

  return io;
};

export default setupSocket;

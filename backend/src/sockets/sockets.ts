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
    
        const messageData = {
          from: data.from,  
          to: data.to,      
          message: data.message, 
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        };
    
        await db.collection("messages").add({
          ...messageData,
          roomId: data.roomId,  
        });
    
        console.log("Message stored in Firestore:", messageData);
    
        socket.to(data.roomId).emit("receive_message", messageData);
    
        console.log("Message sent to room:", data.roomId);
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

import { Server } from 'socket.io';

const setupSocket = (server: any) => {

  const io = new Server(server, {
    cors: {
      origin: "*",  
      methods: ["GET", "POST"],
      credentials: true,
    }
  });
  
  io.on("connection", (socket) => {

    socket.on('join_room', (data) => {
      socket.join(data)
    })

    socket.on("check_room_status", (room) => {
      const rooms = Array.from(socket.rooms);
      const isJoined = rooms.includes(room);
      socket.emit("room_status", { room, status: isJoined });
    });

    socket.on("send_message", (data) => {
      socket.to(data.roomId).emit("receive_message", data);
      console.log(data)
    });
  
    socket.on('disconnect', () => {
      io.emit('user_disconnected');
    });

  });



  return io;
};

export default setupSocket;

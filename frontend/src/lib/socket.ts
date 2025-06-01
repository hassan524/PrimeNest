import { io } from "socket.io-client";

const socket = io("http://localhost:5200", {
  autoConnect: false, 
  withCredentials: true,
});

export default socket;

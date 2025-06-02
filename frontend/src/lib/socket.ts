import { io } from "socket.io-client";

const socket = io("https://constant-datha-hscode524-c599d95b.koyeb.app", {
  autoConnect: false, 
  withCredentials: true,
});

export default socket;

// sockets/socket.js
import { Server } from "socket.io";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.emit("message", "Welcome to LifeLink Live Server ✅");

    socket.on("chat-message", (msg) => {
      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });
};

export default setupSocket;
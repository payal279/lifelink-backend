const setupSocket = (server) => {
  const { Server } = await import("socket.io");

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  });

  // Make io available in controllers
  server.on("request", (req, res) => {});
  server.app?.set?.("io", io);

  return io;
};

export default setupSocket;
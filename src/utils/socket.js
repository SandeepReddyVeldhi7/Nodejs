

const {Server}= require("socket.io")
const connectionSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinChat", ({ targetUserId, loggedInUser }) => {
      const room = [loggedInUser, targetUserId];
      const roomId = room.sort().join(",");
console.log("roomjoined",roomId)
      socket.join(roomId);
    });

 socket.on("send_message", (message) => {
      const room = [message.sender, message.receiver].sort().join(",");
      socket.to(room).emit("receive_message", message);
    });


    socket.on("disconnect", () => {});

    // You can add more event listeners here...
  })


  
}
  module.exports= connectionSocket;

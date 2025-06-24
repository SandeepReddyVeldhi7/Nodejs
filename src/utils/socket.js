const { Server } = require("socket.io");
const Chat = require("../model/Chat");
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
      console.log("roomjoined", roomId);
      socket.join(roomId);
    });

    socket.on("send_message", async(message) => {
      const room = [message.sender, message.receiver].sort().join(",");
      io.to(room).emit("receive_message", message);

      try {
      let chat = await Chat.findOne({
      participants: { $all: [message.sender, message.receiver] }
    });

    if (!chat) {
chat=new Chat({
  participants:[message.sender,message.receiver],
  messages:[]
})  
    }

    chat.messages.push({
      senderId: message.sender,
      text: message.text
    })

    

    await chat.save();
    console.log("Message saved successfully");

      } catch (error) {
        console.log("error", error);
      }
    });

    socket.on("disconnect", () => {});

    // You can add more event listeners here...
  });
};
module.exports = connectionSocket;

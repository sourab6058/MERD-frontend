const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const {
  getCurrentUser,
  userJoin,
  userLeave,
  getRoomUsers,
}  =  require("../utils/users");

const chats = [];

io.on("connection", (socket) => {
  console.log(`${socket.id} connected!`);
  socket.on("joinRoom", ({username, room})=>{
    const user = userJoin(socket.id, username, room);
    console.log("room joined");

    socket.join(user.room);

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        [...chats, {name:user.username, message:`${user.username} joined.`}]
      );

  })
  socket.on("message", (message) => {
    const user = getCurrentUser(socket.id);
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        [...chats, {name:user.username, message}]
      );
  });
});

app.get("/", (_, res) => {
  res.send("Customer chat server");
});

http.listen(4000, function () {
  console.log("listening on port 4000");
});
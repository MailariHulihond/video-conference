import express from "express";
import http from "http";
import * as socketIO from "socket.io";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*", allowedHeaders: ["Access-Control-Allow-Origin"] }));

const server = http.createServer(app);

const current_users = [];

const io = new socketIO.Server(server, {
  cors: { origin: "*", allowedHeaders: ["Access-Control-Allow-Origin"] },
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log("Your video Conference backend is up and running on : " + port);
});

io.on("connection", (socket) => {
  console.log("New user connection established: ", socket.id);

  current_users.push(socket.handshake.query.name);
  io.emit("current_users", JSON.stringify(current_users));
  socket.on("disconnecting", () => {
    console.log("User left conference :", socket.id);
    current_users.splice(
      current_users.findIndex((i) => i == socket.handshake.query.name)
    );
    io.emit("current_users", JSON.stringify(current_users));
  });
});

io.on("", (error) => {
  console.log({ error });
});

const express = require("express");
const app = express();

// ============================= middlewares =============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes")(app);

// ============================= socket code ==============================
const pool = require("./db");
const io = require("socket.io")(3001, {
  cors: "http://localhost:3000",
  methods: ["GET", "POST"],
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("send-message", (message) => {
    console.log(message);
    io.emit("receive-message", message);
  });

  socket.on("get-document", (documentId) => {
    console.log("id:", documentId);
    const data = "";
    socket.join(documentId);
    socket.emit("load-document", data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
  });
});

// ============================ express code ============================
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

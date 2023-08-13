require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const express = require("express");
const app = express();

// ============================= middlewares =============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `${process.env.FRONTEND_URI}`,
  })
);
require("./routes")(app);

// ============================= socket code ==============================
const pool = require("./db");
const { isValidToken } = require("./utils/utils");
const { getDocumentQuery } = require("./db/queries");
const { updateDocumentContentMutation } = require("./db/mutations");
const io = require("socket.io")(3001, {
  cors: "http://localhost:3000",
  methods: ["GET", "POST"],
});

io.use((socket, next) => {
  const authToken = socket.handshake.auth.token;

  if (!authToken) return next(new Error("Unauthorized"));

  if (isValidToken(authToken)) return next();

  return next(new Error("Unauthorized"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("send-message", (message) => {
    console.log(message);
    io.emit("receive-message", message);
  });

  socket.on("get-document", async (documentId) => {
    const [data] = await pool.query(getDocumentQuery(), [documentId]);

    socket.join(documentId);
    console.log("socket rooms", socket.rooms);

    socket.emit("load-document", data[0].content);

    socket.on("send-changes", (delta) => {
      console.log("doc changes", documentId);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      console.log("data, documentId", JSON.stringify(data), documentId);
      await pool.query(updateDocumentContentMutation(), [
        JSON.stringify(data),
        documentId,
      ]);

      socket.emit("changes-saved");
    });
  });
});

// ============================ express code ============================
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

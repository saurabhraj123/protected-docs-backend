// Library imports
const router = require("express").Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// Local imports
const pool = require("../db");
const {
  getRoomIdQuery,
  getPasswordQuery,
  getAllDocumentsQuery,
  getDocumentQuery,
} = require("../db/queries");
const { validateUserQuery } = require("../db/queries");
const { createRoomMutation, deleteRoomMutation } = require("../db/mutations");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/:roomName", async (req, res) => {
  try {
    const roomName = req.params.roomName;
    const [room] = await pool.query(getRoomIdQuery(), [roomName]);

    if (room.length === 0) res.status(404).json({ error: "Room not found" });

    res.status(200).json(room[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { roomName, password } = req.body;

    if (password === "")
      return res.status(400).json({ error: "Password cannot be empty" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(createRoomMutation(), [roomName, hashedPassword]);
    const [room] = await pool.query(getRoomIdQuery(), [roomName]);

    const token = jwt.sign(
      { roomId: room[0].id, roomName },
      process.env.JWT_SECRET
    );

    res.status(200).json({ roomId: room[0].id, token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/auth/:roomName", async (req, res) => {
  try {
    const roomName = req.params.roomName;
    const { password } = req.body;

    const [result] = await pool.query(getPasswordQuery(), [roomName]);
    const dbPassword = result[0].password;

    const isValidPassword = await bcrypt.compare(password, dbPassword);
    if (!isValidPassword)
      return res.status(401).send({ error: "Invalid password" });

    const [room] = await pool.query(getRoomIdQuery(), [roomName]);
    const token = jwt.sign(
      { roomId: room[0].id, roomName },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const roomId = req.user.roomId;

    const [result] = await pool.query(deleteRoomMutation(), [roomId]);

    if (result.affectedRows === 0)
      res.status(401).json({ error: "Room doesn't exist" });

    res.status(200).json({ id: roomId, message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});

module.exports = router;

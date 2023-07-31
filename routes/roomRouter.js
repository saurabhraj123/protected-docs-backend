// Library imports
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Local imports
const pool = require("../db");
const { getRoomIdQuery, getPasswordQuery } = require("../db/queries");
const { validateUserQuery } = require("../db/queries");
const { createRoomMutation } = require("../db/mutations");

router.get("/:roomName", async (req, res) => {
  try {
    const roomName = req.params.roomName;
    const [room] = await pool.query(getRoomIdQuery(), [roomName]);

    if (room.length === 0) res.status(401).json({ error: "Room not found" });

    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create/:roomName", async (req, res) => {
  try {
    const roomName = req.params.roomName;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(createRoomMutation(), [roomName, hashedPassword]);
    const [room] = await pool.query(getRoomIdQuery(), [roomName]);

    res.status(200).json({ id: room[0].id });
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

    res.status(200).json({ id: result[0].id, roomName: roomName });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

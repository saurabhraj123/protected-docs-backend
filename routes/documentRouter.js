const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const pool = require("../db");
const {
  getRoomIdQuery,
  getAllDocumentsQuery,
  getDocumentQuery,
} = require("../db/queries");
const {
  createDocumentMutation,
  updateDocumentTitleMutation,
  updateDocumentContentMutation,
  deleteDocumentMutation,
} = require("../db/mutations");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const roomId = req.user.roomId;

    console.log("roomId", roomId);

    // const [room] = await pool.query(getRoomIdQuery(), [roomName]);

    // if (room.length === 0) res.status(401).json({ error: "Room not found" });

    const [documents] = await pool.query(getAllDocumentsQuery(), [roomId]);

    res.status(200).json({ roomId, documents });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", msg: err.message });
  }
});

router.get("/:documentId", authMiddleware, async (req, res) => {
  try {
    const documentId = req.params.documentId;

    const [document] = await pool.query(getDocumentQuery(), [documentId]);

    if (document.length === 0)
      res.status(401).json({ error: "Document not found" });

    res.status(200).json(document[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", msg: err.message });
  }
});

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const roomId = req.user.roomId;

    const [result] = await pool.query(createDocumentMutation(), [
      roomId,
      title,
      content,
    ]);

    if (result.length === 0)
      res.status(401).json({ error: "Document not created" });

    res.status(200).json({ id: result.insertId, message: "Document created" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", msg: err.message });
  }
});

router.put("/update/title/:documentId", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;
    const documentId = req.params.documentId;

    const [result] = await pool.query(updateDocumentTitleMutation(), [
      title,
      documentId,
    ]);

    if (result.length === 0 || result.affectedRows === 0)
      res.status(401).json({ error: "Document doesn't exist" });

    res
      .status(200)
      .json({ id: documentId, message: "Document updated", result });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", msg: err.message });
  }
});

router.put("/update/content/:documentId", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const documentId = req.params.documentId;

    const [result] = await pool.query(updateDocumentContentMutation(), [
      content,
      documentId,
    ]);

    if (result.length === 0 || result.affectedRows === 0)
      res.status(401).json({ error: "Document doesn't exist" });

    res.status(200).json({ id: documentId, message: "Document updated" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", msg: err.message });
  }
});

router.delete("/delete/:documentId", authMiddleware, async (req, res) => {
  try {
    const documentId = req.params.documentId;

    const [result] = await pool.query(deleteDocumentMutation(), [documentId]);

    if (result.length === 0 || result.affectedRows === 0)
      res.status(401).json({ error: "Document doesn't exist" });

    res.status(200).json({ id: documentId, message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", msg: err.message });
  }
});

module.exports = router;

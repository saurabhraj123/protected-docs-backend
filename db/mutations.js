const createDocumentMutation = () => {
  return `INSERT INTO Documents (room_id, title, content) VALUES (?, ?, ?); `;
};

const updateDocumentContentMutation = () => {
  return `UPDATE Documents SET content = ? WHERE id = ?`;
};

const updateDocumentTitleMutation = () => {
  return `UPDATE Documents SET title = ? WHERE id = ?`;
};

const deleteDocumentMutation = () => {
  return `DELETE FROM Documents WHERE id = ?`;
};

const deleteRoomMutation = () => {
  return `DELETE FROM Rooms WHERE id = ?`;
};

const createRoomMutation = () => {
  return `INSERT INTO Rooms (room_name, password) VALUES (?, ?);`;
};

module.exports = {
  createDocumentMutation,
  updateDocumentTitleMutation,
  updateDocumentContentMutation,
  deleteDocumentMutation,
  createRoomMutation,
  deleteRoomMutation,
};

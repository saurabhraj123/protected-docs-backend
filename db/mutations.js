const createDocumentMutation = () => {
  return `INSERT INTO Documents (room_id, title, data) VALUES (?, ?, ?); `;
};

const updateDocumentMutation = () => {
  return `UPDATE Documents SET data = ? WHERE id = ?`;
};

const deleteDocumentMutation = () => {
  return `DELETE FROM Documents WHERE id = ?`;
};

const createRoomMutation = () => {
  return `INSERT INTO Rooms (room_name, password) VALUES (?, ?);`;
};

module.exports = {
  createDocumentMutation,
  updateDocumentMutation,
  deleteDocumentMutation,
  createRoomMutation,
};

const getAllDocumentsQuery = () => {
  return `SELECT id, title FROM Documents where room_name = ?`;
};

const getDocumentQuery = () => {
  return `SELECT data FROM Documents where id = ?`;
};

const getRoomIdQuery = () => {
  return `SELECT id FROM Rooms WHERE room_name = ?`;
};

const validateUserQuery = () => {
  return `SELECT id FROM Rooms WHERE room_name = ? AND password = ?`;
};

const getPasswordQuery = () => {
  return `SELECT id, password FROM Rooms WHERE room_name = ?`;
};

module.exports = {
  getAllDocumentsQuery,
  getDocumentQuery,
  getRoomIdQuery,
  validateUserQuery,
  getPasswordQuery,
};

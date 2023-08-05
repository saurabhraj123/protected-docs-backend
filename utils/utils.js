const jwt = require("jsonwebtoken");

const isValidToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) return false;

  return true;
};

module.exports = { isValidToken };

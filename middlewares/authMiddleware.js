const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
      if (!decoded) return res.status(401).json({ error: "Unauthorized" });

      console.log("decoded is", decoded);
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;

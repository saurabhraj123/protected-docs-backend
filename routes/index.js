const roomRouter = require("./roomRouter");
const documentRouter = require("./documentRouter");

module.exports = (app) => {
  app.use("/api/rooms", roomRouter);
  app.use("/api/documents", documentRouter);
};

const express = require("express");
const roomRouter = require("./roomRouter");

module.exports = (app) => {
  console.log("called");
  app.use("/api", roomRouter);
};

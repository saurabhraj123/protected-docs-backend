const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    database: "protected_docs",
    password: "1234567890",
    connectionLimit: 10,
  })
  .promise();

module.exports = pool;

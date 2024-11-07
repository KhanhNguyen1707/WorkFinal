// src/db.js
const mysql = require("mysql");

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookstore",
});

// Connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

module.exports = db;

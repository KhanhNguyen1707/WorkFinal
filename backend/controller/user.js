// backend/user.js
const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const router = express.Router();

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Update with your DB user
  password: "", // Update with your DB password
  database: "bookstore",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Register route
router.post("/register", (req, res) => {
  const { Name, Email, Password, Address, Phone, Role } = req.body;

  // Hash the password
  bcrypt.hash(Password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    // Insert user into database
    const sql =
      "INSERT INTO users (Name, Email, PasswordHash, Address, Phone, Role) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [Name, Email, hash, Address, Phone, Role],
      (error, results) => {
        if (error) {
          return res.status(500).json({ message: "Error creating user" });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
});

// Login route
router.post("/login", (req, res) => {
  const { Email, Password } = req.body;

  const sql = "SELECT * FROM users WHERE Email = ?";
  db.query(sql, [Email], (error, results) => {
    if (error || results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    bcrypt.compare(Password, user.PasswordHash, (err, match) => {
      if (err || !match) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Successfully logged in
      res.status(200).json({
        message: "Login successful",
        user: {
          ID: user.ID,
          Name: user.Name,
          Email: user.Email,
          Role: user.Role,
        },
      });
    });
  });
});

module.exports = router;

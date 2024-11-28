const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();

// Fetch user profile
router.get("/", (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  const sql = `
    SELECT Name, Email, Address, Phone
    FROM users
    WHERE ID = ?;
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching profile:", err);
      return res.status(500).json({ error: "Server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(result[0]); // Send the profile data as a response
  });
});

// Update user profile
router.put("/", (req, res) => {
  const { userId, name, email, address, phone } = req.body;

  console.log("Request Body:", req.body);

  if (!userId || !name || !email || !address || !phone) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  console.log("Updating profile for userId:", userId);
  console.log("New data:", { name, email, address, phone });

  const sql = `
    UPDATE users
    SET Name = ?, Email = ?, Address = ?, Phone = ?
    WHERE ID = ?;
  `;

  db.query(sql, [name, email, address, phone, userId], (err, result) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ error: "Failed to update profile." });
    }

    console.log("Profile updated successfully:", result);
    res.status(200).json({ message: "Profile updated successfully." });
  });
});

// Route to change password (only new password and confirm password)
router.put("/change-password", (req, res) => {
  const { userId, newPassword, confirmPassword } = req.body;

  // Validate input
  if (!userId || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  // Hash the new password
  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing new password:", err);
      return res.status(500).json({ error: "Failed to hash new password." });
    }

    // Update the password in the database with the hashed new password
    db.query(
      'UPDATE users SET passwordHash = ? WHERE ID = ?',
      [hashedPassword, userId],
      (err, result) => {
        if (err) {
          console.error("Error updating password:", err);
          return res.status(500).json({ error: "Failed to update password." });
        }

        res.status(200).json({ message: "Password updated successfully." });
      }
    );
  });
});


module.exports = router;

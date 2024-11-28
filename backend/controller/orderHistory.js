const express = require("express");
const db = require("../db");
const router = express.Router();

// Fetch order history for a specific user
router.get("/history", (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).send("User ID is required.");
  }

  const sql = `
    SELECT orders.ID, orders.UserID, orders.OrderDate, orders.TotalPrice, orders.Status,
           users.Name, orders.PhoneNumber, orders.ShippingMethod, orders.Address
    FROM orders
    INNER JOIN users ON orders.UserID = users.ID
    WHERE orders.UserID = ?
    ORDER BY orders.OrderDate DESC;
  `;

  db.query(sql, [userId], (err, orders) => {
    if (err) {
      console.error("Error fetching order history:", err);
      return res.status(500).send("Server error");
    }
    res.json(orders);
  });
});

module.exports = router;

const express = require("express");
const db = require("../db");
const router = express.Router();

// Fetch all cart items for a specific user (unchanged)
router.get("/cart", (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).send("User ID is required.");
  }

  const sql = `
    SELECT cartitems.ID AS CartItemID, cartitems.Quantity, cartitems.Price,
           books.ID AS BookID, books.Title, books.Img, books.Price AS BookPrice
    FROM cartitems
    INNER JOIN books ON cartitems.BookID = books.ID
    INNER JOIN cart ON cartitems.CartID = cart.ID
    WHERE cart.UserID = ?
    ORDER BY cartitems.ID;
  `;
  db.query(sql, [userId], (err, cartItems) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      return res.status(500).send("Server error");
    }
    res.json(cartItems);
  });
});

router.put("/update", (req, res) => {
  const { userId, itemId, newQuantity } = req.body;

  if (!userId || !itemId || newQuantity == null) {
    return res.status(400).send("Missing required fields.");
  }

  const sql = `
    UPDATE cartitems
    INNER JOIN cart ON cartitems.CartID = cart.ID
    SET cartitems.Quantity = ?
    WHERE cart.UserID = ? AND cartitems.ID = ?;
  `;

  db.query(sql, [newQuantity, userId, itemId], (err, result) => {
    if (err) {
      console.error("Error updating cart item quantity:", err);
      return res.status(500).send("Failed to update cart item quantity.");
    }

    res.status(200).send("Cart item quantity updated successfully.");
  });
});


router.delete("/remove", (req, res) => {
  const { userId, ID } = req.body;

  if (!userId || !ID) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const sql = `
    DELETE cartitems
    FROM cartitems
    INNER JOIN cart ON cartitems.CartID = cart.ID
    WHERE cart.UserID = ? AND cartitems.ID = ?;
  `;

  db.query(sql, [userId, ID], (err, result) => {
    if (err) {
      console.error("Error removing cart item:", err);
      return res
        .status(500)
        .json({ message: "Failed to remove item from cart." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    res.status(200).json({ message: "Cart item removed successfully." });
  });
});

// Fetch total number of items in cart for a specific user
router.get("/cart/total", (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).send("User ID is required.");
  }

  const sql = `
    SELECT SUM(cartitems.Quantity) AS totalItems
    FROM cartitems
    INNER JOIN cart ON cartitems.CartID = cart.ID
    WHERE cart.UserID = ?;
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching cart total:", err);
      return res.status(500).send("Server error");
    }

    // Send the total number of items in the cart
    res.json({ totalItems: result[0].totalItems || 0 });
  });
});

module.exports = router;

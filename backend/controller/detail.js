const express = require("express");
const db = require("../db");
const router = express.Router();

// Fetch product details by ID
router.get("/books/:id", (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM books WHERE ID = ?";
  db.query(sql, [id], (err, product) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).send("Server error");
    }
    if (product.length === 0) {
      return res.status(404).send("Product not found");
    }
    res.json(product[0]);
  });
});

// Fetch featured products
router.get("/featured-books", (req, res) => {
  let sql = "SELECT * FROM books ORDER BY ReleaseDate DESC LIMIT 9";
  db.query(sql, (err, featuredProducts) => {
    if (err) {
      console.error("Error fetching featured products:", err);
      return res.status(500).send("Server error");
    }
    res.json(featuredProducts);
  });
});

// Add item to cart
router.post("/cart/add", (req, res) => {
  const { userId, bookId, quantity } = req.body;

  if (!userId || !bookId || !quantity) {
    return res.status(400).send("Missing required fields.");
  }

  // Query for the most recent cart for the user
  db.query(
    "SELECT ID FROM cart WHERE UserID = ? ORDER BY CreatedAt DESC LIMIT 1",
    [userId],
    (err, result) => {
      if (err) {
        console.error("Error querying cart:", err);
        return res.status(500).send("Server error");
      }

      let cartId;
      if (result.length === 0) {
        db.query(
          "INSERT INTO cart (UserID) VALUES (?)",
          [userId],
          (err, insertResult) => {
            if (err) {
              console.error("Failed to create a new cart:", err);
              return res.status(500).send("Failed to create a new cart.");
            }
            cartId = insertResult.insertId;
            addOrUpdateCartItem(cartId);
          }
        );
      } else {
        cartId = result[0].ID;
        addOrUpdateCartItem(cartId);
      }

      // Function to add or update cart item
      function addOrUpdateCartItem(cartId) {
        db.query(
          "SELECT * FROM cartitems WHERE CartID = ? AND BookID = ?",
          [cartId, bookId],
          (err, existingCartItem) => {
            if (err) {
              console.error("Error checking cart item:", err);
              return res.status(500).send("Server error");
            }

            if (existingCartItem.length > 0) {
              const newQuantity =
                existingCartItem[0].Quantity + parseInt(quantity);
              db.query(
                "UPDATE cartitems SET Quantity = ? WHERE CartID = ? AND BookID = ?",
                [newQuantity, cartId, bookId],
                (err) => {
                  if (err) {
                    console.error("Error updating cart item:", err);
                    return res.status(500).send("Failed to update cart item.");
                  }
                  res.status(200).send("Cart item updated successfully.");
                }
              );
            } else {
              db.query(
                "INSERT INTO cartitems (CartID, BookID, Quantity, Price) VALUES (?, ?, ?, (SELECT Price FROM books WHERE ID = ?))",
                [cartId, bookId, quantity, bookId],
                (err) => {
                  if (err) {
                    console.error("Error adding new cart item:", err);
                    return res.status(500).send("Failed to add item to cart.");
                  }
                  res.status(200).send("Item added to cart successfully.");
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;

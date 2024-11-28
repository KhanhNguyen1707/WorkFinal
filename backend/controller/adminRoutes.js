const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");

// CRUD for Books
router.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving books");
    } else {
      res.json(result);
    }
  });
});

router.post("/books", (req, res) => {
  const { title, authorID, genreID, releaseDate, price, description, img } =
    req.body;
  db.query(
    "INSERT INTO books (Title, AuthorID, GenreID, ReleaseDate, Price, Description, Img) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, authorID, genreID, releaseDate, price, description, img],
    (err, result) => {
      if (err) {
        res.status(500).send("Error inserting book");
      } else {
        res.json({
          message: "Book added successfully",
          bookID: result.insertId,
        });
      }
    }
  );
});

router.put("/books/:id", (req, res) => {
  const { title, authorID, genreID, releaseDate, price, description, img } =
    req.body;
  db.query(
    "UPDATE books SET Title = ?, AuthorID = ?, GenreID = ?, ReleaseDate = ?, Price = ?, Description = ?, Img = ? WHERE ID = ?",
    [
      title,
      authorID,
      genreID,
      releaseDate,
      price,
      description,
      img,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating book");
      } else {
        res.json({ message: "Book updated successfully" });
      }
    }
  );
});

router.delete("/books/:id", (req, res) => {
  db.query("DELETE FROM books WHERE ID = ?", [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting book");
    } else {
      res.json({ message: "Book deleted successfully" });
    }
  });
});

// CRUD for Authors
router.get("/authors", (req, res) => {
  db.query("SELECT * FROM authors", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving authors");
    } else {
      res.json(result);
    }
  });
});

// Similar routes for genres, users, and orders...
// CRUD for Authors
router.get("/authors", (req, res) => {
  db.query("SELECT * FROM authors", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving authors");
    } else {
      res.json(result);
    }
  });
});

router.post("/authors", (req, res) => {
  const { name } = req.body;
  db.query(
    "INSERT INTO authors (Name) VALUES (?)",
    [name],
    (err, result) => {
      if (err) {
        res.status(500).send("Error inserting author");
      } else {
        res.json({
          message: "Author added successfully",
          authorID: result.insertId,
        });
      }
    }
  );
});

router.put("/authors/:id", (req, res) => {
  const { name } = req.body;
  db.query(
    "UPDATE authors SET Name = ? WHERE ID = ?",
    [name, req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating author");
      } else {
        res.json({ message: "Author updated successfully" });
      }
    }
  );
});

router.delete("/authors/:id", (req, res) => {
  db.query("DELETE FROM authors WHERE ID = ?", [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting author");
    } else {
      res.json({ message: "Author deleted successfully" });
    }
  });
});

// CRUD for Genres
router.get("/genres", (req, res) => {
  db.query("SELECT * FROM genres", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving genres");
    } else {
      res.json(result);
    }
  });
});

router.post("/genres", (req, res) => {
  const { name } = req.body;
  db.query(
    "INSERT INTO genres (Name) VALUES (?)",
    [name],
    (err, result) => {
      if (err) {
        res.status(500).send("Error inserting genre");
      } else {
        res.json({
          message: "Genre added successfully",
          genreID: result.insertId,
        });
      }
    }
  );
});

router.put("/genres/:id", (req, res) => {
  const { name } = req.body;
  db.query(
    "UPDATE genres SET Name = ? WHERE ID = ?",
    [name, req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating genre");
      } else {
        res.json({ message: "Genre updated successfully" });
      }
    }
  );
});

router.delete("/genres/:id", (req, res) => {
  db.query("DELETE FROM genres WHERE ID = ?", [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting genre");
    } else {
      res.json({ message: "Genre deleted successfully" });
    }
  });
});

// Fetch paginated orders
router.get("/orders", (req, res) => {
  const skip = parseInt(req.query.skip) || 0; // Default to 0 if no skip is provided
  const limit = parseInt(req.query.limit) || 5; // Default to 5 if no limit is provided

  // Fetch orders with pagination
  db.query(
    "SELECT * FROM orders LIMIT ? OFFSET ?",
    [limit, skip],
    (err, result) => {
      if (err) {
        console.error("Error fetching orders:", err);
        res.status(500).send("Error fetching orders");
      } else {
        // Query to get the total count of orders for pagination
        db.query("SELECT COUNT(*) AS total FROM orders", (countErr, countResult) => {
          if (countErr) {
            console.error("Error fetching total order count:", countErr);
            res.status(500).send("Error fetching total order count");
          } else {
            const totalOrders = countResult[0].total; // Get the total number of orders
            res.json({
              orders: result,  // List of orders
              total: totalOrders, // Total number of orders for pagination
            });
          }
        });
      }
    }
  );
});


// Fetch all order items for a specific order
router.get("/orderitems/:orderID", (req, res) => {
  const { orderID } = req.params;
  db.query("SELECT * FROM orderitems WHERE OrderID = ?", [orderID], (err, result) => {
    if (err) {
      console.error("Error fetching order items:", err);
      res.status(500).send("Error fetching order items");
    } else {
      res.json(result);
    }
  });
});

// Delete a specific order item
router.delete("/orderitems/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM orderitems WHERE ID = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting order item:", err);
      res.status(500).send("Error deleting order item");
    } else {
      res.json({ message: "Order item deleted successfully" });
    }
  });
});

// Delete an entire order (including associated order items)
router.delete("/orders/:id", (req, res) => {
  const { id } = req.params;

  // First, delete the order items associated with this order
  db.query("DELETE FROM orderitems WHERE OrderID = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting order items:", err);
      res.status(500).send("Error deleting order items");
    } else {
      // Then delete the order itself
      db.query("DELETE FROM orders WHERE ID = ?", [id], (err, result) => {
        if (err) {
          console.error("Error deleting order:", err);
          res.status(500).send("Error deleting order");
        } else {
          res.json({ message: "Order deleted successfully" });
        }
      });
    }
  });
});

// Fetch paginated users
router.get("/users", (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 5;

  // Fetch users with pagination
  db.query(
    "SELECT ID, Name, Email, Address, Phone, Role FROM users LIMIT ? OFFSET ?",
    [limit, skip],
    (err, result) => {
      if (err) {
        res.status(500).send("Error retrieving users");
      } else {
        // Query to get the total count of users for pagination
        db.query("SELECT COUNT(*) AS total FROM users", (countErr, countResult) => {
          if (countErr) {
            res.status(500).send("Error retrieving total user count");
          } else {
            const totalUsers = countResult[0].total;
            res.json({
              users: result,
              total: totalUsers, // Return the total number of users
            });
          }
        });
      }
    }
  );
});


// Update a user
router.put("/users/:id", async (req, res) => {
  const { name, email, address, phone, role, password } = req.body;

  let passwordHash = null;

  if (password) {
    try {
      passwordHash = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).send("Error hashing password");
    }
  }

  db.query(
    `UPDATE users SET Name = ?, Email = ?, Address = ?, Phone = ?, Role = ?, ${
      passwordHash ? "PasswordHash = ?" : ""
    } WHERE ID = ?`,
    passwordHash
      ? [name, email, address, phone, role, passwordHash, req.params.id]
      : [name, email, address, phone, role, req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating user");
      } else {
        res.json({ message: "User updated successfully" });
      }
    }
  );
});

// Delete a user
router.delete("/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE ID = ?", [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting user");
    } else {
      res.json({ message: "User deleted successfully" });
    }
  });
});

module.exports = router;

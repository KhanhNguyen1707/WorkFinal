const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/submit", (req, res) => {
  const {
    userId,
    orderDate,
    totalPrice,
    status,
    items,
    name,
    phoneNumber,
    address,
    shippingMethod,
  } = req.body;

  const insertOrderQuery = `
    INSERT INTO orders (UserID, OrderDate, TotalPrice, Status, Name, PhoneNumber, Address, ShippingMethod)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertOrderQuery,
    [
      userId,
      orderDate,
      totalPrice,
      status,
      name,
      phoneNumber,
      address,
      shippingMethod,
    ],
    (err, orderResult) => {
      if (err) {
        console.error("Error inserting order:", err);
        return res
          .status(500)
          .json({ message: "Failed to create order", error: err });
      }

      const orderId = orderResult.insertId;

      if (items.length > 0) {
        const itemsData = items.map((item) => [
          orderId,
          item.bookId,
          item.quantity,
          item.price,
        ]);
        const valuesString = itemsData
          .map((item) => `(${item.join(", ")})`)
          .join(", ");

        const insertItemsQuery = `
          INSERT INTO orderitems (OrderID, BookID, Quantity, Price)
          VALUES ${valuesString}
        `;

        db.query(insertItemsQuery, (err) => {
          if (err) {
            console.error("Error inserting order items:", err);
            return res
              .status(500)
              .json({ message: "Failed to add order items", error: err });
          }

          const deleteCartQuery = `
            DELETE cartitems
            FROM cartitems
            INNER JOIN cart ON cartitems.CartID = cart.ID
            WHERE cart.UserID = ?;
          `;
          db.query(deleteCartQuery, [userId], (err) => {
            if (err) {
              console.error("Error clearing cart:", err);
              return res
                .status(500)
                .json({ message: "Failed to clear cart", error: err });
            }

            res
              .status(200)
              .json({ message: "Order placed and cart cleared successfully." });
          });
        });
      } else {
        res.status(400).json({ message: "No items found in the order." });
      }
    }
  );
});

module.exports = router;

const express = require("express");
const cors = require("cors");
const productRoutes = require("./backend/controller/product");
const userRoutes = require("./backend/controller/user");
const detailRoutes = require("./backend/controller/detail");

const app = express();
app.use(cors());
app.use(express.json());

// Use the product, user, and detail routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/detail", detailRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});

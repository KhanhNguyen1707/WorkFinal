const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const productRoutes = require("./backend/controller/product");
const userRoutes = require("./backend/controller/user");
const detailRoutes = require("./backend/controller/detail");
const cartRoutes = require("./backend/controller/cart");
const checkoutRoutes = require("./backend/controller/checkout");
const adminRoutes = require("./backend/controller/adminRoutes");
const orderHistoryRoutes = require("./backend/controller/orderHistory");
const profileRoutes = require("./backend/controller/editProfile");

const app = express();

// Enable Cross-Origin Requests
app.use(cors());
app.use(express.json());

// Session management
app.use(
  session({
    secret: "webdev",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/detail", detailRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/admin", adminRoutes);
app.use("/orders", orderHistoryRoutes);
app.use("/profile", profileRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});

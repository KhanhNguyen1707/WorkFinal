// src/App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cart from "./component/Cart";
import Checkout from "./component/Checkout";
import Contact from "./component/Contact";
import Detail from "./component/Detail";
import Home from "./component/Home";
import MyAccount from "./component/MyAccount";
import Product from "./component/Product";
import Login from "./component/LoginRegister";
import PrivateRoute from "./component/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<PrivateRoute component={Cart} />} />{" "}
        <Route
          path="/checkout"
          element={<PrivateRoute component={Checkout} />}
        />{" "}
        <Route
          path="/profile"
          element={<PrivateRoute component={MyAccount} />}
        />{" "}
        <Route path="/product" element={<Product />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

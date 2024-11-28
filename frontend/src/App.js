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
import AdminBookPage from "./component/AdminBookPage";
import AdminAuthorPage from "./component/AdminAuthorPage";
import AdminGenrePage from "./component/AdminGenrePage";
import AdminOrderPage from "./component/AdminOrderPage";
import AdminUserPage from "./component/AdminUserPage";
import AdminHome from "./component/AdminHome";
import OrderHistory from "./component/OrderHistory";
import EditProfile from "./component/EditProfile";
import EditPassword from "./component/EditPassword";
import NotFound from "./component/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<PrivateRoute component={Cart} />} />
        <Route
          path="/checkout"
          element={<PrivateRoute component={Checkout} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute component={MyAccount} />}
        />
        <Route path="/product" element={<Product />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/orderhistory"
          element={<PrivateRoute component={OrderHistory} />}
        />
        <Route
          path="/profile/edit"
          element={<PrivateRoute component={EditProfile} />}
        />
        <Route
          path="/password/edit"
          element={<PrivateRoute component={EditPassword} />}
        />
        <Route path="*" element={<NotFound />} />
        {/* Admin routes */}
        <Route
          path="/managebook"
          element={
            <PrivateRoute component={AdminBookPage} roleRequired="admin" />
          }
        />
        <Route
          path="/manageauthor"
          element={
            <PrivateRoute component={AdminAuthorPage} roleRequired="admin" />
          }
        />
        <Route
          path="/managegenre"
          element={
            <PrivateRoute component={AdminGenrePage} roleRequired="admin" />
          }
        />
        <Route
          path="/manageorder"
          element={
            <PrivateRoute component={AdminOrderPage} roleRequired="admin" />
          }
        />
        <Route
          path="/manageuser"
          element={
            <PrivateRoute component={AdminUserPage} roleRequired="admin" />
          }
        />
        <Route
          path="/managehome"
          element={<PrivateRoute component={AdminHome} roleRequired="admin" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

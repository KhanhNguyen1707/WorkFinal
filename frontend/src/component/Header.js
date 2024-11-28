import "jquery-ui/themes/base/all.css";
import "jquery-ui/ui/widgets/slider";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (currentUser) {
      axios
        .get(
          `http://localhost:5000/cart/cart/total?userId=${currentUser.ID}`
        )
        .then((response) => {
          setCartItemCount(response.data.totalItems);
        })
        .catch((error) => {
          console.error("Error fetching cart total:", error);
        });
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  const handleStoreClick = (e) => {
    e.preventDefault();
    window.location.href = "/product";
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    navigate("/cart");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <>
      <div className="main-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="custom-select-box"></div>
              <div className="right-phone-box">
                <p>
                  Call US : 0386106329
                </p>
              </div>
              <div className="our-link">
                <ul>
                  <li>
                    <Link to="/profile">My Account</Link>
                  </li>
                  <li>
                    <Link to="/location">Our Location</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Main Top */}
      {/* Start Main Top */}
      <header className="main-header">
        {/* Start Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav">
          <div className="container">
            {/* Start Header Navigation */}
            <div className="navbar-header">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar-menu"
                aria-controls="navbars-rs-food"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fa fa-bars" />
              </button>
              <Link className="navbar-brand" to="/" onClick={handleHomeClick}>
                <img
                  src="images/logo.jpg"
                  width={120}
                  height={70}
                  className="logo"
                  alt=""
                />
              </Link>
            </div>
            {/* End Header Navigation */}
            {/* Collect the nav links, forms, and other content for toggling */}
            <div className="collapse navbar-collapse" id="navbar-menu">
              <ul
                className="nav navbar-nav ml-auto"
                data-in="fadeInDown"
                data-out="fadeOutUp"
              >
                <li className={`nav-item ${isActive("/")}`}>
                  <Link className="nav-link" to="/" onClick={handleHomeClick}>
                    Home
                  </Link>
                </li>
                <li className={`nav-item ${isActive("/product")}`}>
                  <Link
                    className="nav-link"
                    to="/product"
                    onClick={handleStoreClick}
                  >
                    Store
                  </Link>
                </li>
                <li className={`nav-item ${isActive("/contact")}`}>
                  <Link className="nav-link" to="/contact">
                    Contact Us
                  </Link>
                </li>
                {/* Conditionally Render Admin Menu */}
                {currentUser?.Role === "admin" && (
                  <li className={`nav-item ${isActive("/managehome")}`}>
                    <Link className="nav-link" to="/managehome">
                      Admin
                    </Link>
                  </li>
                )}
                {/* Welcome and Logout Links */}
                {currentUser && (
                  <li
                    className="nav-item d-flex align-items-center"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span
                      className="navbar-text me-3"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "1.1em",
                      }}
                    >
                      Welcome,{" "}
                      <Link
                        to="/profile"
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: "1.1em",
                          textDecoration: "none",
                        }}
                      >
                        {currentUser.Name}
                      </Link>
                    </span>
                    <Link
                      className="nav-link"
                      to="#"
                      onClick={handleLogout}
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "1.1em",
                      }}
                    >
                      <i className="fa fa-sign-out" /> Logout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            {/* /.navbar-collapse */}

            {/* Start Attribute Navigation (User and Cart Icons) */}
            <div
              className="attr-nav d-flex align-items-center"
              style={{ marginLeft: "auto" }}
            >
              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  listStyleType: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {/* Conditionally Render User Icon */}
                {!currentUser && (
                  <li className="user" style={{ marginRight: "20px" }}>
                    <Link to="/login">
                      <i className="fa fa-user" />
                    </Link>
                  </li>
                )}
                <li className="cart" style={{ marginRight: "20px" }}>
                  {/* Make sure cart icon does not trigger the sidebar */}
                  <Link to="/cart" onClick={handleCartClick}>
                    <i className="fa fa-shopping-bag" />
                    <span className="badge">{cartItemCount}</span>{" "}
                    {/* Dynamic Cart Item Count */}
                  </Link>
                </li>
              </ul>
            </div>
            {/* End Attribute Navigation */}
          </div>
        </nav>
        {/* End Navigation */}
      </header>
    </>
  );
};

export default Header;

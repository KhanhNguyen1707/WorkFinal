import "jquery-ui/themes/base/all.css";
import "jquery-ui/ui/widgets/slider";
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../context/AuthContext"; // Import your useAuth hook

const Header = () => {
  const { currentUser, logout } = useAuth(); // Use the useAuth hook
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to home after logout
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
                  Call US :- <a href="#"> </a>
                </p>
              </div>
              <div className="our-link">
                <ul>
                  <li>
                    <Link to="/my-account">My Account</Link>
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
              <Link className="navbar-brand" to="/">
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
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Our Service
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact Us
                  </Link>
                </li>
                {/* Welcome and Logout Links */}
                {currentUser && (
                  <li
                    className="nav-item"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span
                      className="navbar-text"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "1.1em",
                        marginRight: "10px", // Space between welcome and logout
                      }}
                    >
                      Welcome, {currentUser.Name}
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
            {/* Start Attribute Navigation */}
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
                <li className="user">
                  {currentUser ? (
                    <Link to="#" onClick={handleLogout}></Link>
                  ) : (
                    <Link to="/login">
                      <i className="fa fa-user" />
                    </Link>
                  )}
                </li>
                <li className="side-menu">
                  <Link to="/cart">
                    <i className="fa fa-shopping-bag" />
                    <span className="badge">0</span>
                  </Link>
                </li>
              </ul>
            </div>
            {/* End Attribute Navigation */}
          </div>
          {/* Start Side Menu */}
          <div className="side">
            <a href="#" className="close-side">
              <i className="fa fa-times" />
            </a>
            <li className="cart-box">
              <ul className="cart-list">
                <li></li>
                <li></li>
                <li></li>
                <li className="total"></li>
              </ul>
            </li>
          </div>
          {/* End Side Menu */}
        </nav>
        {/* End Navigation */}
      </header>
    </>
  );
};

export default Header;

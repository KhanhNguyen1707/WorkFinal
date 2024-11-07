// src/component/LoginRegister.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Address: "",
    Phone: "",
    Role: "user",
  });

  const { login } = useAuth(); // Ensure useAuth is correctly called
  const navigate = useNavigate(); // Use navigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:5000/login"
      : "http://localhost:5000/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        if (isLogin) {
          login(data.user); // Call login function to set the user data
          navigate("/"); // Use navigate to redirect to the home page
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Shop</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Authenticate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header text-center bg-danger text-white">
                <h3>{isLogin ? "Login" : "Register"}</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-5 d-none d-md-block">
                    <img
                      src="https://message.org.za/wp-content/uploads/2023/02/1-400x400.png"
                      alt="Login illustration"
                      className="img-fluid h-100"
                      style={{ objectFit: "cover", borderRadius: "5px" }}
                    />
                  </div>
                  <div className="col-md-7">
                    <form onSubmit={handleSubmit}>
                      {isLogin && (
                        <>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="Email"
                              placeholder="Enter email"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="Password"
                              placeholder="Enter password"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </>
                      )}
                      {!isLogin && (
                        <>
                          <div className="form-group">
                            <label>Username</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Name"
                              placeholder="Enter username"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="Email"
                              placeholder="Enter email"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="Password"
                              placeholder="Enter password"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Confirm password"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Address"
                              placeholder="Enter address"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              name="Phone"
                              placeholder="Enter phone number"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </>
                      )}
                      <button
                        type="submit"
                        className="btn btn-danger btn-block mt-3"
                      >
                        {isLogin ? "Login" : "Register"}
                      </button>
                    </form>
                    <div className="text-center mt-3">
                      <p>
                        {isLogin
                          ? "Don't have an account?"
                          : "Already have an account?"}{" "}
                        <span
                          onClick={() => setIsLogin(!isLogin)}
                          style={{ color: "#d33b33", cursor: "pointer" }}
                        >
                          {isLogin ? "Register" : "Login"} here.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginRegister;

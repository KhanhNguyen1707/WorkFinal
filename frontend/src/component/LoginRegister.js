import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Role: "user",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    emailExistsError: "",
  });

  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/"); // Redirect to home if logged in
    }

    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get("user");

    if (userParam) {
      const user = JSON.parse(decodeURIComponent(userParam));
      login(user); // Save user in context
      navigate("/"); // Redirect after login
    }
  }, [currentUser, login, navigate]);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      emailExistsError: "",
    });

    const { Name, Email, Password, ConfirmPassword } = formData;
    let valid = true;

    // Validate email
    if (!validateEmail(Email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Please enter a valid email.",
      }));
      valid = false;
    }

    // Validate password
    if (!validatePassword(Password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError:
          "Password must be at least 6 characters long, contain an uppercase letter, and a special character.",
      }));
      valid = false;
    }

    // Confirm password validation (only for registration)
    if (!isLogin && Password !== ConfirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPasswordError: "Passwords do not match.",
      }));
      valid = false;
    }

    // Check if email already exists (only for registration)
    if (!isLogin) {
      try {
        const response = await fetch(
          "http://localhost:5000/users/email-exists",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email }),
          }
        );

        const data = await response.json();

        if (data.exists) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            emailExistsError: "Email already exists.",
          }));
          valid = false;
        }
      } catch (error) {
        console.error("Error checking email existence:", error);
        alert(
          "There was a problem connecting to the server. Please try again later."
        );
      }
    }

    if (valid) {
      // Submit the form data
      const url = isLogin
        ? "http://localhost:5000/users/login"
        : "http://localhost:5000/users/register";

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
            login(data.user);
            navigate("/"); // redirect to homepage after login
          } else {
            // After registration, navigate to login page
            navigate("/login"); // redirect to the login page
          }
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
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
                <form onSubmit={handleSubmit}>
                  {/* Login and Registration Form JSX */}
                  {!isLogin && (
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      required
                    />
                    {errors.emailError && (
                      <small className="text-danger">{errors.emailError}</small>
                    )}
                    {errors.emailExistsError && (
                      <small className="text-danger">
                        {errors.emailExistsError}
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="Password"
                      value={formData.Password}
                      onChange={handleChange}
                      required
                    />
                    {errors.passwordError && (
                      <small className="text-danger">
                        {errors.passwordError}
                      </small>
                    )}
                  </div>
                  {!isLogin && (
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="ConfirmPassword"
                        value={formData.ConfirmPassword}
                        onChange={handleChange}
                        required
                      />
                      {errors.confirmPasswordError && (
                        <small className="text-danger">
                          {errors.confirmPasswordError}
                        </small>
                      )}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-danger btn-block mt-3"
                  >
                    {isLogin ? "Login" : "Register"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-block mt-3"
                    onClick={() => {
                      window.location.href =
                        "http://localhost:5000/users/google";
                    }}
                  >
                    Login with Google
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
      <Footer />
    </>
  );
};

export default LoginRegister;

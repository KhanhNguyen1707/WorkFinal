import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";

const EditPassword = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const validatePassword = (password) => {
    // Check if the password meets the requirements: at least 6 characters, contains an uppercase letter, and contains a special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setConfirmPasswordError(null);
    setError(null);

    // Validate that both fields are filled
    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    // Validate the new password
    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must be at least 6 characters long, contain an uppercase letter, and a special character."
      );
    }

    // Validate if passwords match
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    }

    // If either validation fails, stop the process
    if (passwordError || confirmPasswordError) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/profile/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser.ID,
            newPassword,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to update password.");
      }

      alert("Password updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Failed to update password.");
    }
  };

  return (
    <>
      <Header />
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Change Password</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/profile">Profile</a>
                </li>
                <li className="breadcrumb-item active">Change Password</li>
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
                <h3>Change Your Password</h3>
              </div>
              <div className="card-body">
                {error && (
                  <p className="error-message" style={{ color: "red" }}>
                    {error}
                  </p>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="form-control"
                      placeholder="Enter new password"
                      required
                    />
                    {passwordError && (
                      <small className="form-text text-danger">
                        {passwordError}
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control"
                      placeholder="Re-enter new password"
                      required
                    />
                    {confirmPasswordError && (
                      <small className="form-text text-danger">
                        {confirmPasswordError}
                      </small>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-danger btn-block mt-3"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditPassword;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const EditProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    Name: "",
    Email: "",
    Address: "",
    Phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchProfileData();
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/profile?userId=${currentUser.ID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile data.");
      }
      const data = await response.json();
      setProfileData(data);
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setError("Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileData.Name || !profileData.Address || !profileData.Phone) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.ID,
          name: profileData.Name,
          email: profileData.Email,
          address: profileData.Address,
          phone: profileData.Phone,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to update profile.");
      }

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <>
      <Header />
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Edit Profile</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="breadcrumb-item active">Edit Profile</li>
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
                <h3>Edit Your Profile</h3>
              </div>
              <div className="card-body">
                {error && (
                  <p className="error-message" style={{ color: "red" }}>
                    {error}
                  </p>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="Name">Name</label>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      value={profileData.Name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input
                      type="email"
                      id="Email"
                      name="Email"
                      value={profileData.Email}
                      className="form-control"
                      placeholder="Enter your email"
                      readOnly // Make the Email field non-editable
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Address">Address</label>
                    <input
                      type="text"
                      id="Address"
                      name="Address"
                      value={profileData.Address}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Phone">Phone</label>
                    <input
                      type="text"
                      id="Phone"
                      name="Phone"
                      value={profileData.Phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your phone number"
                      required
                    />
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

export default EditProfile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    role: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0); // Track the total number of users for pagination

  // Fetch users from the backend with pagination
  const fetchUsers = () => {
    const skip = (currentPage - 1) * usersPerPage;
    axios
      .get(
        `http://localhost:5000/admin/users?skip=${skip}&limit=${usersPerPage}`
      )
      .then((response) => {
        setUsers(response.data.users);
        setTotalUsers(response.data.total); // Assume the API returns total user count
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when component mounts or page changes
  }, [currentPage]);

  const handleAddOrUpdateUser = () => {
    const url = isEditing
      ? `http://localhost:5000/admin/users/${currentUserId}`
      : "http://localhost:5000/admin/users";

    const method = isEditing ? "put" : "post";

    axios[method](url, newUser)
      .then(() => {
        fetchUsers();
        setNewUser({
          name: "",
          email: "",
          address: "",
          phone: "",
          role: "",
          password: "",
        });
        setIsEditing(false);
        setCurrentUserId(null);
      })
      .catch((error) => console.error("Error saving user:", error));
  };

  const handleEditUser = (user) => {
    setNewUser({
      name: user.Name,
      email: user.Email,
      address: user.Address,
      phone: user.Phone,
      role: user.Role,
      password: "",
    });
    setIsEditing(true);
    setCurrentUserId(user.ID);
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/admin/users/${id}`)
      .then(() => fetchUsers())
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      {/* Start All Title Box */}
      <div className="all-title-box bg-primary text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>Admin Dashboard</h2>
              <ul className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <a href="/managehome" className="text-white">
                    Admin
                  </a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End All Title Box */}
      <div className="container mt-5">
        <h1 className="text-center mb-4">Admin Panel - Manage Users</h1>

        {/* Form to add/edit user */}
        <div className="card shadow-sm p-4 mb-4">
          <h3 className="mb-4">{isEditing ? "Edit User" : "Add New User"}</h3>
          <form>
            <div className="row">
              <div className="col-sm-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </div>

              <div className="col-sm-6 mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>

              <div className="col-sm-6 mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="address"
                  value={newUser.address}
                  onChange={(e) =>
                    setNewUser({ ...newUser, address: e.target.value })
                  }
                />
              </div>

              <div className="col-sm-6 mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                />
              </div>

              <div className="col-sm-6 mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="role"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                />
              </div>

              <div className="col-sm-6 mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-100 mt-3"
              onClick={handleAddOrUpdateUser}
            >
              {isEditing ? "Update User" : "Add User"}
            </button>
          </form>
        </div>

        {/* Users List Table */}
        <h2 className="mt-5">Users List</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover mt-3">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.ID}>
                  <td>{user.ID}</td>
                  <td>{user.Name}</td>
                  <td>{user.Email}</td>
                  <td>{user.Address}</td>
                  <td>{user.Phone}</td>
                  <td>{user.Role}</td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteUser(user.ID)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                key={index}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
};

export default ManageUsersPage;

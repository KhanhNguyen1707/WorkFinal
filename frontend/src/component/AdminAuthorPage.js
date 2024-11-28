import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";

const AdminAuthorPage = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentAuthorId, setCurrentAuthorId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage, setAuthorsPerPage] = useState(5);

  // Fetch authors from the backend
  const fetchAuthors = () => {
    axios
      .get("http://localhost:5000/admin/authors")
      .then((response) => setAuthors(response.data))
      .catch((error) => console.error("Error fetching authors:", error));
  };

  useEffect(() => {
    fetchAuthors(); // Fetch authors on component mount
  }, []);

  const handleAddAuthor = () => {
    // Send a POST request to add a new author
    axios
      .post("http://localhost:5000/admin/authors", newAuthor)
      .then(() => {
        fetchAuthors(); // Re-fetch authors after adding
        setNewAuthor({ name: "" });
      })
      .catch((error) => console.error("Error adding author:", error));
  };

  const handleDeleteAuthor = (id) => {
    // Send a DELETE request to remove the author
    axios
      .delete(`http://localhost:5000/admin/authors/${id}`)
      .then(() => {
        fetchAuthors(); // Re-fetch authors after deletion
      })
      .catch((error) => console.error("Error deleting author:", error));
  };

  const handleEditAuthor = (author) => {
    setNewAuthor({ name: author.Name });
    setIsEditing(true);
    setCurrentAuthorId(author.ID);
  };

  const handleUpdateAuthor = () => {
    // Send a PUT request to update the author details
    axios
      .put(`http://localhost:5000/admin/authors/${currentAuthorId}`, newAuthor)
      .then(() => {
        fetchAuthors(); // Re-fetch authors after update
        setNewAuthor({ name: "" });
        setIsEditing(false);
        setCurrentAuthorId(null);
      })
      .catch((error) => console.error("Error updating author:", error));
  };

  // Get authors for the current page
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  // Handle page number change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(authors.length / authorsPerPage);

  return (
    <>
      <Header />
      {/* Start All Title Box */}
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Admin Dashboard</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/managehome">Admin</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End All Title Box */}
      <div className="container mt-5">
        <h1 className="text-center mb-4">Admin Panel - Manage Authors</h1>

        {/* Form to add or edit an author */}
        <div className="card p-4">
          <h3>{isEditing ? "Edit Author" : "Add New Author"}</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={newAuthor.name}
                onChange={(e) =>
                  setNewAuthor({ ...newAuthor, name: e.target.value })
                }
              />
            </div>

            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={isEditing ? handleUpdateAuthor : handleAddAuthor}
            >
              {isEditing ? "Update Author" : "Add Author"}
            </button>
          </form>
        </div>

        {/* Authors Table */}
        <h2 className="mt-5">Authors List</h2>
        <table className="table table-striped table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAuthors.map((author) => (
              <tr key={author.ID}>
                <td>{author.ID}</td>
                <td>{author.Name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditAuthor(author)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDeleteAuthor(author.ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

export default AdminAuthorPage;

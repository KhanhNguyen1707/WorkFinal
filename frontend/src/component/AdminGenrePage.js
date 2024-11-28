import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";

const AdminGenrePage = () => {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState({
    name: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentGenreId, setCurrentGenreId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [genresPerPage, setGenresPerPage] = useState(5);

  // Fetch genres from the backend
  const fetchGenres = () => {
    axios
      .get("http://localhost:5000/admin/genres")
      .then((response) => setGenres(response.data))
      .catch((error) => console.error("Error fetching genres:", error));
  };

  useEffect(() => {
    fetchGenres(); // Fetch genres on component mount
  }, []);

  const handleAddGenre = () => {
    // Send a POST request to add a new genre
    axios
      .post("http://localhost:5000/admin/genres", newGenre)
      .then(() => {
        fetchGenres(); // Re-fetch genres after adding a new one
        setNewGenre({ name: "" });
      })
      .catch((error) => console.error("Error adding genre:", error));
  };

  const handleDeleteGenre = (id) => {
    // Send a DELETE request to remove the genre
    axios
      .delete(`http://localhost:5000/admin/genres/${id}`)
      .then(() => {
        fetchGenres(); // Re-fetch genres after deletion
      })
      .catch((error) => console.error("Error deleting genre:", error));
  };

  const handleEditGenre = (genre) => {
    // Populate the form with the current genre's details
    setNewGenre({ name: genre.Name });
    setIsEditing(true);
    setCurrentGenreId(genre.ID);
  };

  const handleUpdateGenre = () => {
    // Send a PUT request to update the genre details
    axios
      .put(`http://localhost:5000/admin/genres/${currentGenreId}`, newGenre)
      .then(() => {
        fetchGenres(); // Re-fetch genres after update
        setNewGenre({ name: "" });
        setIsEditing(false);
        setCurrentGenreId(null);
      })
      .catch((error) => console.error("Error updating genre:", error));
  };

  // Get the genres for the current page
  const indexOfLastGenre = currentPage * genresPerPage;
  const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
  const currentGenres = genres.slice(indexOfFirstGenre, indexOfLastGenre);

  // Handle page number change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(genres.length / genresPerPage);

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
        <h1 className="text-center mb-4">Admin Panel - Manage Genres</h1>

        {/* Form to add or edit a genre */}
        <div className="card p-4">
          <h3>{isEditing ? "Edit Genre" : "Add New Genre"}</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Genre Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={newGenre.name}
                onChange={(e) =>
                  setNewGenre({ ...newGenre, name: e.target.value })
                }
              />
            </div>

            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={isEditing ? handleUpdateGenre : handleAddGenre}
            >
              {isEditing ? "Update Genre" : "Add Genre"}
            </button>
          </form>
        </div>

        {/* Genres Table */}
        <h2 className="mt-5">Genres List</h2>
        <table className="table table-striped table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Genre Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentGenres.map((genre) => (
              <tr key={genre.ID}>
                <td>{genre.ID}</td>
                <td>{genre.Name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditGenre(genre)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDeleteGenre(genre.ID)}
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

export default AdminGenrePage;

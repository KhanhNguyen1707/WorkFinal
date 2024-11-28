import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";

const AdminBookPage = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    authorID: "",
    genreID: "",
    releaseDate: "",
    price: "",
    description: "",
    img: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Track if we are editing a book
  const [currentBookId, setCurrentBookId] = useState(null); // Store the ID of the book being edited
  const [currentPage, setCurrentPage] = useState(1); // Current page of the table
  const [booksPerPage, setBooksPerPage] = useState(5); // Number of books to display per page

  // Fetch books from the backend
  const fetchBooks = () => {
    axios
      .get("http://localhost:5000/admin/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  };

  useEffect(() => {
    fetchBooks(); // Fetch books on component mount
  }, []);

  const handleAddBook = () => {
    // Send a POST request to add a new book
    axios
      .post("http://localhost:5000/admin/books", newBook)
      .then(() => {
        fetchBooks(); // Re-fetch books after adding a new one
        setNewBook({
          title: "",
          authorID: "",
          genreID: "",
          releaseDate: "",
          price: "",
          description: "",
          img: "",
        });
      })
      .catch((error) => console.error("Error adding book:", error));
  };

  const handleDeleteBook = (id) => {
    // Send a DELETE request to remove the book
    axios
      .delete(`http://localhost:5000/admin/books/${id}`)
      .then(() => {
        fetchBooks(); // Re-fetch books after deletion
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  const handleEditBook = (book) => {
    // Populate the form with the current book's details
    setNewBook({
      title: book.Title,
      authorID: book.AuthorID,
      genreID: book.GenreID,
      releaseDate: book.ReleaseDate,
      price: book.Price,
      description: book.Description,
      img: book.Img,
    });
    setIsEditing(true);
    setCurrentBookId(book.ID);
  };

  const handleUpdateBook = () => {
    // Send a PUT request to update the book details
    axios
      .put(`http://localhost:5000/admin/books/${currentBookId}`, newBook)
      .then(() => {
        fetchBooks(); // Re-fetch books after update
        setNewBook({
          title: "",
          authorID: "",
          genreID: "",
          releaseDate: "",
          price: "",
          description: "",
          img: "",
        });
        setIsEditing(false);
        setCurrentBookId(null);
      })
      .catch((error) => console.error("Error updating book:", error));
  };

  // Get the books for the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Handle page number change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(books.length / booksPerPage);

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
        <h1 className="text-center mb-4">Admin Panel - Manage Books</h1>

        {/* Form to add or edit a book */}
        <div className="card p-4">
          <h3>{isEditing ? "Edit Book" : "Add New Book"}</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="authorID" className="form-label">
                Author ID
              </label>
              <input
                type="text"
                className="form-control"
                id="authorID"
                value={newBook.authorID}
                onChange={(e) =>
                  setNewBook({ ...newBook, authorID: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="genreID" className="form-label">
                Genre ID
              </label>
              <input
                type="text"
                className="form-control"
                id="genreID"
                value={newBook.genreID}
                onChange={(e) =>
                  setNewBook({ ...newBook, genreID: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="releaseDate" className="form-label">
                Release Date
              </label>
              <input
                type="date"
                className="form-control"
                id="releaseDate"
                value={newBook.releaseDate}
                onChange={(e) =>
                  setNewBook({ ...newBook, releaseDate: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={newBook.price}
                onChange={(e) =>
                  setNewBook({ ...newBook, price: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                value={newBook.description}
                onChange={(e) =>
                  setNewBook({ ...newBook, description: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="img" className="form-label">
                Image Link
              </label>
              <input
                type="text"
                className="form-control"
                id="img"
                value={newBook.img}
                onChange={(e) =>
                  setNewBook({ ...newBook, img: e.target.value })
                }
              />
            </div>

            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={isEditing ? handleUpdateBook : handleAddBook}
            >
              {isEditing ? "Update Book" : "Add Book"}
            </button>
          </form>
        </div>

        {/* Books Table */}
        <h2 className="mt-5">Books List</h2>
        <table className="table table-striped table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author ID</th>
              <th>Genre ID</th>
              <th>Release Date</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book.ID}>
                <td>{book.ID}</td>
                <td>{book.Title}</td>
                <td>{book.AuthorID}</td>
                <td>{book.GenreID}</td>
                <td>{book.ReleaseDate}</td>
                <td>${book.Price}</td>
                <td>{book.Description}</td>
                <td>
                  <img
                    src={book.Img}
                    alt={book.Title}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditBook(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDeleteBook(book.ID)}
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

export default AdminBookPage;

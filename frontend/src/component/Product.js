import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Product = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const itemsPerPage = 9; // 9 items per page
  const [totalPages, setTotalPages] = useState(1);

  // Fetch books with sorting, searching, category filtering, and pagination
  const fetchBooks = () => {
    let url = `http://localhost:5000/products/books?sortBy=${sortOption}&search=${searchTerm}&category=${selectedCategory}&page=${currentPage}&limit=${itemsPerPage}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.books);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error("Error fetching books:", error));
  };

  // Fetch categories from backend
  const fetchCategories = () => {
    fetch("http://localhost:5000/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  // Fetch books when sort option, search term, category, or page changes
  useEffect(() => {
    fetchBooks();
  }, [sortOption, searchTerm, selectedCategory, currentPage]);

  // Fetch categories once on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Header></Header>

      {/* Start Top Search */}
      <div className="top-search">
        <div className="container">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-search" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="input-group-addon close-search">
              <i className="fa fa-times" />
            </span>
          </div>
        </div>
      </div>
      {/* End Top Search */}

      {/* Start All Title Box */}
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Shop</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Shop</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End All Title Box */}

      {/* Start Shop Page */}
      <div className="shop-box-inner">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12 sidebar-shop-left">
              <div className="product-categori">
                <div className="search-product">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      fetchBooks();
                    }}
                  >
                    <input
                      className="form-control"
                      placeholder="Search here..."
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">
                      <i className="fa fa-search" />
                    </button>
                  </form>
                </div>
                {/* Categories */}
                {/* Categories */}
                <div className="filter-sidebar-left">
                  <div className="title-left">
                    <h3>Categories</h3>
                  </div>
                  <div className="list-group">
                    {/* Option to display all categories */}
                    <a
                      className="list-group-item list-group-item-action"
                      href=""
                      onClick={(e) => {
                        e.preventDefault(); // Prevent page reload
                        setSelectedCategory(""); // Reset category to show all
                      }}
                    >
                      All Categories
                    </a>
                    {categories.map((category) => (
                      <a
                        key={category.ID}
                        className="list-group-item list-group-item-action"
                        href=""
                        onClick={(e) => {
                          e.preventDefault(); // Prevent page reload
                          setSelectedCategory(category.ID); // Set selected category
                        }}
                      >
                        {category.Name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* End Sidebar */}

            <div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12 shop-content-right">
              <div className="right-product-box">
                <div className="product-item-filter row">
                  {/* Sort By Dropdown */}
                  <div className="col-12 col-sm-8 text-center text-sm-left">
                    <div className="toolbar-sorter-right">
                      Sort by{" "}
                      <select
                        id="basic"
                        className="selectpicker show-tick form-control."
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                      >
                        <option value="">None</option>
                        <option value="priceHighLow">
                          High Price → Low Price
                        </option>
                        <option value="priceLowHigh">
                          Low Price → High Price
                        </option>
                        <option value="dateNewOld">
                          New Release → Old Release
                        </option>
                        <option value="dateOldNew">
                          Old Release → New Release
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 text-center text-sm-right">
                    <ul className="nav nav-tabs ml-auto">
                      <li>
                        <a
                          className="nav-link active"
                          href="#grid-view"
                          data-toggle="tab"
                        >
                          {" "}
                          <i className="fa fa-th" />{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link"
                          href="#list-view"
                          data-toggle="tab"
                        >
                          {" "}
                          <i className="fa fa-list-ul" />{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Product Listing */}
                <div className="row product-categorie-box">
                  <div className="tab-content">
                    <div
                      role="tabpanel"
                      className="tab-pane fade show active"
                      id="grid-view"
                    >
                      <div className="row">
                        {books.map((book) => (
                          <div
                            className="col-sm-6 col-md-6 col-lg-4 col-xl-4"
                            key={book.ID}
                          >
                            <div className="products-single fix">
                              <div className="box-img-hover">
                                <img
                                  src={book.Img}
                                  className="img-fluid"
                                  alt={book.Title}
                                />
                                <div className="mask-icon">
                                  <ul>
                                    <li>
                                      <Link
                                        to={`/detail/${book.ID}`}
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title="View"
                                      >
                                        <i className="fas fa-eye" />
                                      </Link>
                                    </li>
                                    {/* Other actions */}
                                  </ul>
                                  <a className="cart" href="#">
                                    Add to Cart
                                  </a>
                                </div>
                              </div>
                              <div className="why-text">
                                <h4>{book.Title}</h4>
                                <h5>${book.Price}</h5>
                                <p>{book.Description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      role="tabpanel"
                      className="tab-pane fade"
                      id="list-view"
                    >
                      <div className="row">
                        {books.map((book) => (
                          <div
                            className="col-sm-12 col-md-12 col-lg-12 col-xl-12"
                            key={book.ID}
                          >
                            <div className="products-single fix">
                              <div className="box-img-hover">
                                <img
                                  src={book.Img}
                                  className="img-fluid"
                                  alt={book.Title}
                                />
                              </div>
                              <div className="why-text">
                                <h4>{book.Title}</h4>
                                <h5>${book.Price}</h5>
                                <p>{book.Description}</p>
                                <a className="cart" href="#">
                                  Add to Cart
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pagination */}
                <div className="pagination-box">
                  <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i + 1}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        <a className="page-link" href="#">
                          {i + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* End Pagination */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Shop Page */}
      <Footer></Footer>
    </>
  );
};

export default Product;

import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";

const Detail = () => {
  const { id } = useParams(); // Get book ID from URL params
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch book details
    fetch(`http://localhost:5000/detail/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoadingProduct(false);
      })
      .catch((error) => console.error("Error fetching product:", error));

    // Fetch featured books
    fetch("http://localhost:5000/detail/featured-books")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data);
        setLoadingFeatured(false);
      })
      .catch((error) =>
        console.error("Error fetching featured products:", error)
      );
  }, [id]);

  const addToCart = async () => {
    if (!product || !product.ID) {
      alert("Invalid product.");
      return;
    }

    if (!currentUser) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const userId = currentUser.ID;
    const quantity = document.querySelector(".quantity-box input").value || 1;

    const requestBody = { userId, bookId: product.ID, quantity };

    try {
      const response = await fetch("http://localhost:5000/detail/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Item added to cart!");
      } else {
        alert("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loadingProduct) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Header />
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Shop Detail</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/product">Shop</Link>
                </li>
                <li className="breadcrumb-item active">Shop Detail</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="shop-detail-box-main">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-6">
              <img
                className="d-block w-100"
                src={product.Img}
                alt={product.Title}
              />
            </div>
            <div className="col-xl-7 col-lg-7 col-md-6">
              <div className="single-product-details">
                <h2>{product.Title}</h2>
                <h5>${product.Price}</h5>
                <h4>Short Description:</h4>
                <p>{product.Description}</p>
                <div className="form-group quantity-box">
                  <label className="control-label">Quantity</label>
                  <input
                    className="form-control"
                    value={quantity}
                    min={1}
                    max={20}
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <button
                  className="btn hvr-hover"
                  onClick={addToCart}
                  disabled={loadingProduct || !product.ID}
                >
                  Add to cart
                </button>
                <div className="add-to-btn">
                  <Link to="/product" className="btn hvr-hover">
                    Back to shop
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Start Featured Products Section */}
          <div className="title-all text-center">
            <h1>Featured Products</h1>
          </div>
          {loadingFeatured ? (
            <p>Loading featured products...</p>
          ) : (
            <OwlCarousel
              className="featured-products-box"
              items={3}
              margin={10}
              nav
              dots
              loop
              autoplay
            >
              {featuredProducts.length > 0 ? (
                featuredProducts.map((featured) => (
                  <div className="item" key={featured.ID}>
                    <div className="products-single fix">
                      <div className="box-img-hover">
                        <img src={featured.Img} alt={featured.Title} />
                        <div className="mask-icon">
                          <ul>
                            <li>
                              <Link to={`/detail/${featured.ID}`}>
                                <i className="fas fa-eye" />
                              </Link>
                            </li>
                          </ul>
                          <a className="cart">Add to Cart</a>
                        </div>
                      </div>
                      <div className="why-text">
                        <h4>{featured.Title}</h4>
                        <h5>${featured.Price}</h5>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No featured products available</p>
              )}
            </OwlCarousel>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Detail;

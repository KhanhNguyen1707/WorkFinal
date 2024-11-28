import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";

const Detail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const handleBackToShopClick = (e) => {
    e.preventDefault();
    window.location.href = "/product";
  };

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

  // Ensure OwlCarousel initializes after the component has mounted
  useEffect(() => {
    const $ = window.$; // Ensure jQuery is accessible
    if ($ && featuredProducts.length > 0) {
      // Initialize OwlCarousel only if it's not already initialized
      const owl = $(".owl-carousel").data("owl.carousel");
      if (!owl) {
        $(".owl-carousel").owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          dots: true,
          autoplay: true,
          responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 },
          },
        });
      }
    }
  }, [featuredProducts]);

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
                  <a href="/product">Shop</a>
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
              {product && (
                <img
                  className="img-fluid w-75 mx-auto d-block"
                  src={product.Img}
                  alt={product.Title}
                />
              )}
            </div>

            <div className="col-xl-7 col-lg-7 col-md-6">
              <div className="single-product-details">
                <h2>{product ? product.Title : "Loading..."}</h2>
                <h5>{product ? `$${product.Price}` : "Loading..."}</h5>
                <h4>Short Description:</h4>
                <p>{product ? product.Description : "Loading..."}</p>
                <div className="form-group quantity-box">
                  <label className="control-label">Quantity</label>
                  <input
                    className="form-control"
                    value={quantity}
                    min={1}
                    max={20}
                    type="number"
                    onChange={(e) => {
                      const value = Math.max(1, Math.min(20, e.target.value));
                      setQuantity(value);
                    }}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn hvr-hover text-white"
                    onClick={addToCart}
                    disabled={loadingProduct || !product?.ID}
                  >
                    Add to cart
                  </button>
                  <Link
                    to="/product"
                    className="btn hvr-hover text-white"
                    onClick={handleBackToShopClick}
                  >
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
          <OwlCarousel
            className="owl-carousel featured-products-box"
            items={3} // Default for larger screens
            margin={10}
            nav
            dots
            loop
            autoplay
            responsive={{
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 3 },
            }}
          >
            {featuredProducts.length > 0 ? (
              featuredProducts.map((featured) => (
                <div className="item" key={featured.ID}>
                  <div className="products-single fix">
                    <div className="box-img-hover">
                      {/* Clicking on image or title will redirect to product detail */}
                      <Link to={`/detail/${featured.ID}`}>
                        <img src={featured.Img} alt={featured.Title} />
                      </Link>
                    </div>
                    <div className="why-text">
                      {/* Clicking on title will redirect to product detail */}
                      <Link to={`/detail/${featured.ID}`}>
                        <h4>{featured.Title}</h4>
                      </Link>
                      <h5>${featured.Price}</h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No featured products available</p>
            )}
          </OwlCarousel>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Detail;

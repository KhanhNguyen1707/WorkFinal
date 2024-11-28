import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import Footer from "./Footer";
import Header from "./Header";

const Cart = () => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingCost] = useState(2);

  const navigate = useNavigate();

   const handleBackToShopClick = (e) => {
     e.preventDefault();
     window.location.href = "/product";
   };

  useEffect(() => {
    if (currentUser) {
      fetchCartItems();
    }
  }, [currentUser]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/cart/cart?userId=${currentUser.ID}`
      );
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    const userId = currentUser.ID;
    const validQuantity = Math.max(1, Math.min(newQuantity, 20));
    try {
      const response = await fetch("http://localhost:5000/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, itemId, newQuantity: validQuantity }),
      });
      if (!response.ok) {
        throw new Error("Failed to update item quantity");
      }
      fetchCartItems();
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const removeItem = async (ID) => {
    const userId = currentUser.ID;
    try {
      const response = await fetch("http://localhost:5000/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ID, userId }),
      });
      const responseText = await response.text();
      try {
        const responseData = JSON.parse(responseText);
        if (!response.ok) {
          throw new Error(
            responseData.message || "Failed to remove item from cart"
          );
        }
        fetchCartItems(); // Refresh cart after removing item
      } catch (error) {
        throw new Error(
          "Failed to parse response as JSON. Response: " + responseText
        );
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const calculateSubTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
  };

  const calculateGrandTotal = () => {
    const subTotal = calculateSubTotal();
    return subTotal + (cartItems.length > 0 ? shippingCost : 0);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>My Cart</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a
                    href="/product"
                  >
                    Shop
                  </a>
                </li>
                <li className="breadcrumb-item active">My Cart</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-box-main">
        <div className="container">
          <div className="table-main table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Images</th>
                  <th className="d-none d-md-table-cell">Product Name</th>{" "}
                  <th className="d-none d-md-table-cell">Price</th>{" "}
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <p>
                        Add product to cart at{" "}
                        <a
                          href="/product"
                          style={{ color: "red", textDecoration: "underline" }}
                        >
                          Here!
                        </a>
                      </p>
                    </td>
                  </tr>
                ) : (
                  cartItems.map((item) => (
                    <tr key={item.ID}>
                      <td className="thumbnail-img" data-label="Images">
                        <img
                          className="img-fluid"
                          src={item.Img}
                          alt={item.Title}
                        />
                      </td>
                      <td
                        className="name-pr d-none d-md-table-cell"
                        data-label="Product Name"
                      >
                        <a href="#">{item.Title}</a>
                      </td>
                      <td
                        className="price-pr d-none d-md-table-cell"
                        data-label="Price"
                      >
                        <p>${item.Price}</p>
                      </td>
                      <td className="quantity-box" data-label="Quantity">
                        <input
                          type="number"
                          value={item.Quantity}
                          min={1}
                          max={20}
                          className="form-control"
                          onChange={(e) =>
                            updateQuantity(
                              item.CartItemID,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td className="total-pr" data-label="Total">
                        <p>${(item.Price * item.Quantity).toFixed(2)}</p>
                      </td>
                      <td className="remove-pr" data-label="Remove">
                        <button
                          className="btn btn-danger"
                          onClick={() => removeItem(item.CartItemID)}
                        >
                          <i className="fas fa-times" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Order Summary Section */}
          {cartItems.length > 0 && (
            <div className="row my-5">
              <div className="col-12 col-lg-8">
                {/* Empty column for spacing */}
              </div>
              <div className="col-12 col-lg-4">
                <div className="order-box">
                  <h3>Order summary</h3>
                  <div className="d-flex justify-content-between">
                    <h4>Sub Total</h4>
                    <div className="ml-auto font-weight-bold">
                      ${calculateSubTotal()}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h4>Shipping Cost</h4>
                    <div className="ml-auto font-weight-bold">
                      ${shippingCost}
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between gr-total">
                    <h5>Grand Total</h5>
                    <div className="ml-auto h5">${calculateGrandTotal()}</div>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center shopping-box">
                {cartItems.length > 0 && (
                  <button className="btn hvr-hover" onClick={handleCheckout}>
                    Checkout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;

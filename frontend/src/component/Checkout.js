import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    shippingMethod: "Standard",
  });
  const [shippingCost, setShippingCost] = useState(10);
  const [subtotal, setSubtotal] = useState(0);
  const [payPalLoaded, setPayPalLoaded] = useState(false);
  const [payPalButtonClicked, setPayPalButtonClicked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // New state for form validation
  const [isCartEmpty, setIsCartEmpty] = useState(false); // State for checking if cart is empty

  useEffect(() => {
    if (currentUser) {
      fetchCartItems();
      loadPayPalScript();
    }
  }, [currentUser]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/cart/cart?userId=${currentUser.ID}`
      );
      const data = await response.json();
      setCartItems(data);

      // Set cart empty state based on the fetched data
      setIsCartEmpty(data.length === 0);

      const calculatedSubtotal = data.reduce(
        (acc, item) => acc + item.Quantity * item.Price,
        0
      );
      setSubtotal(calculatedSubtotal);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingChange = (e) => {
    const selectedShipping = e.target.value;
    const shippingRates = {
      Standard: 0,
      Express: 10,
      NextDay: 20,
    };
    setShippingCost(shippingRates[selectedShipping]);
    setBillingDetails((prev) => ({
      ...prev,
      shippingMethod: selectedShipping,
    }));
  };

  const handleCheckout = async () => {
    const orderData = {
      userId: currentUser.ID,
      orderDate: new Date().toISOString(),
      totalPrice: subtotal + shippingCost,
      status: "Paid",
      items: cartItems.map((item) => ({
        bookId: item.BookID,
        quantity: item.Quantity,
        price: item.Price,
      })),
      name: billingDetails.name,
      phoneNumber: billingDetails.phoneNumber,
      address: billingDetails.address,
      shippingMethod: billingDetails.shippingMethod,
    };

    try {
      const response = await fetch("http://localhost:5000/checkout/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();
      console.log("Response from backend:", responseData);

      if (response.ok) {
        alert("Order placed successfully!");
        window.location.href = "/product";
      } else {
        alert("Failed to place the order.");
        console.error("Backend error:", responseData);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred while placing the order.");
    }
  };

  const loadPayPalScript = () => {
    if (window.paypal) {
      setPayPalLoaded(true);
    } else {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AZ_BliHP5bWMrLInfIqlkddav6mWYDd6ohOoH0gleGZqDadTI9VBPEbTp2ae02ayzDCLvcIih_rFYTFr&currency=USD";
      script.async = true;
      script.onload = () => setPayPalLoaded(true);
      document.body.appendChild(script);
    }
  };

  const initializePayPalButtons = () => {
    if (payPalLoaded && !payPalButtonClicked) {
      const paypalContainer = document.getElementById(
        "paypal-button-container"
      );
      paypalContainer.innerHTML = ""; // Clear any previous button

      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: (subtotal + shippingCost).toFixed(2),
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            return actions.order.capture().then(() => {
              handleCheckout();
            });
          },
          onError: (err) => {
            console.error("PayPal Error:", err);
            alert("An error occurred with PayPal. Please try again.");
          },
        })
        .render("#paypal-button-container");
    }
  };

  const handlePayPalButtonClick = () => {
    setPayPalButtonClicked(true);
    initializePayPalButtons();
  };

  // Check if the form is valid
  const checkFormValidity = () => {
    const isValid =
      billingDetails.name &&
      billingDetails.phoneNumber &&
      billingDetails.address &&
      billingDetails.shippingMethod;
    setIsFormValid(isValid);
  };

  // Track changes in form fields to check validity
  useEffect(() => {
    checkFormValidity();
  }, [billingDetails]);

  useEffect(() => {
    if (payPalLoaded && payPalButtonClicked) {
      initializePayPalButtons();
    }
  }, [payPalLoaded, payPalButtonClicked, subtotal, shippingCost]);

  return (
    <>
      <Header />
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Checkout</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="Product">Shop</a>
                </li>
                <li className="breadcrumb-item active">Checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="cart-box-main">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-6 mb-3">
              <div className="checkout-address">
                <div className="title-left">
                  <h3>Billing Address</h3>
                </div>
                <form className="needs-validation">
                  <div className="mb-3">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={billingDetails.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber">Phone Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={billingDetails.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={billingDetails.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="shipping-method-box">
                <div className="title-left">
                  <h3>Shipping Method</h3>
                </div>
                <div className="mb-4">
                  <div className="custom-control custom-radio">
                    <input
                      id="shippingOption1"
                      name="shipping-option"
                      className="custom-control-input"
                      type="radio"
                      value="Standard"
                      onChange={handleShippingChange}
                      defaultChecked
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="shippingOption1"
                    >
                      Standard Delivery
                    </label>{" "}
                    <span className="float-right font-weight-bold">FREE</span>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="shippingOption2"
                      name="shipping-option"
                      className="custom-control-input"
                      type="radio"
                      value="Express"
                      onChange={handleShippingChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="shippingOption2"
                    >
                      Express Delivery
                    </label>{" "}
                    <span className="float-right font-weight-bold">$10.00</span>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="shippingOption3"
                      name="shipping-option"
                      className="custom-control-input"
                      type="radio"
                      value="NextDay"
                      onChange={handleShippingChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="shippingOption3"
                    >
                      Next Business Day
                    </label>{" "}
                    <span className="float-right font-weight-bold">$20.00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-6 mb-3">
              <div className="order-box">
                <div className="title-left">
                  <h3>Your Order</h3>
                </div>
                <ul className="list-unstyled">
                  {cartItems.map((item) => (
                    <li key={item.BookID}>
                      {item.Title} x {item.Quantity} - $$
                      {(item.Price * item.Quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <div className="d-flex justify-content-between">
                  <strong>Subtotal</strong>
                  <strong>${subtotal.toFixed(2)}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Shipping</strong>
                  <strong>${shippingCost.toFixed(2)}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>${(subtotal + shippingCost).toFixed(2)}</strong>
                </div>
                {isCartEmpty ? (
                  <p>
                    Your cart is empty. Please add items to your cart to proceed
                    with checkout.
                  </p>
                ) : (
                  <>
                    <div
                      id="paypal-button-container"
                      className="paypal-button-container"
                    ></div>
                    {isFormValid && !payPalButtonClicked && (
                      <button
                        className="btn btn-warning mt-4 w-100"
                        onClick={handlePayPalButtonClick}
                      >
                        Pay with PayPal
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

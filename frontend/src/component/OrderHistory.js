import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      fetchOrderHistory();
    }
  }, [currentUser]);

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/orders/history?userId=${currentUser.ID}`
      );
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Order History</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="breadcrumb-item active">Order History</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="order-history-box">
        <div className="container">
          <div className="table-main table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th className="d-none d-md-table-cell">Order ID</th>
                  <th>Order Date</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th className="d-none d-md-table-cell">Name</th>
                  <th className="d-none d-md-table-cell">Phone Number</th>
                  <th className="d-none d-md-table-cell">Shipping Method</th>
                  <th className="d-none d-md-table-cell">Address</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      <p>No orders found.</p>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.ID}>
                      <td className="d-none d-md-table-cell">{order.ID}</td>
                      <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
                      <td>${order.TotalPrice}</td>
                      <td>{order.Status}</td>
                      <td className="d-none d-md-table-cell">{order.Name}</td>
                      <td className="d-none d-md-table-cell">
                        {order.PhoneNumber}
                      </td>
                      <td className="d-none d-md-table-cell">
                        {order.ShippingMethod}
                      </td>
                      <td className="d-none d-md-table-cell">
                        {order.Address}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderHistory;

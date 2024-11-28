import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [isViewingOrderItems, setIsViewingOrderItems] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [totalOrders, setTotalOrders] = useState(0); // Track the total number of orders

  // Fetch orders with pagination
  const fetchOrders = () => {
    const skip = (currentPage - 1) * ordersPerPage;
    axios
      .get(
        `http://localhost:5000/admin/orders?skip=${skip}&limit=${ordersPerPage}`
      )
      .then((response) => {
        setOrders(response.data.orders);
        setTotalOrders(response.data.total); // Assume the API returns the total order count
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when component mounts or page changes
  }, [currentPage]);

  const handleViewOrderItems = (orderID) => {
    setIsViewingOrderItems(true);
    setCurrentOrderId(orderID);
    // Fetch order items for the selected order
    axios
      .get(`http://localhost:5000/admin/orderitems/${orderID}`)
      .then((response) => {
        setOrderItems(response.data);
      })
      .catch((error) => console.error("Error fetching order items:", error));
  };

  const handleDeleteOrder = (orderID) => {
    axios
      .delete(`http://localhost:5000/admin/orders/${orderID}`)
      .then(() => {
        // Re-fetch orders after deleting
        fetchOrders();
        setIsViewingOrderItems(false); // Stop viewing order items
      })
      .catch((error) => console.error("Error deleting order:", error));
  };

  const handleDeleteOrderItem = (itemID) => {
    axios
      .delete(`http://localhost:5000/admin/orderitems/${itemID}`)
      .then(() => {
        // Re-fetch order items after deleting an item
        axios
          .get(`http://localhost:5000/admin/orderitems/${currentOrderId}`)
          .then((response) => {
            setOrderItems(response.data);
          })
          .catch((error) =>
            console.error("Error fetching order items:", error)
          );
      })
      .catch((error) => console.error("Error deleting order item:", error));
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <h1 className="text-center mb-4">Admin Panel - Manage Orders</h1>

        {/* Orders Table */}
        <h2 className="mt-5">Orders List</h2>
        <table className="table table-striped table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.ID}>
                <td>{order.ID}</td>
                <td>{order.UserID}</td>
                <td>${order.TotalPrice}</td>
                <td>{order.Status}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleViewOrderItems(order.ID)}
                  >
                    View Items
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDeleteOrder(order.ID)}
                  >
                    Delete Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isViewingOrderItems && (
          <div className="mt-5">
            <h3>Order Items for Order ID: {currentOrderId}</h3>
            <table className="table table-striped table-bordered mt-3">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Book ID</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr key={item.ID}>
                    <td>{item.ID}</td>
                    <td>{item.BookID}</td>
                    <td>{item.Quantity}</td>
                    <td>${item.Price}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteOrderItem(item.ID)}
                      >
                        Delete Item
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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

export default AdminOrderPage;

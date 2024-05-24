

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyOrders.css';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortBy, setSortBy] = useState('orderDate');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchOrders();
  }, [sortBy, sortOrder]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let sortedOrders = response.data.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      });
      setOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleOrderClick = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      <div className="order-sort-controls">
        <label>Sort by:</label>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="orderDate">Order Date</option>
          <option value="totalPrice">Total Price</option>
          {/* Add more sorting criteria options here */}
        </select>
        <label>Sort order:</label>
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Shipping Address</th>
            <th>Order Date</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId} onClick={() => handleOrderClick(order.orderId)}>
              <td>{order.orderId}</td>
              <td>{order.userId}</td>
              <td>{order.shippingAddress}</td>
              <td>{order.orderDate}</td>
              <td>{order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && (
        <div>
          <h3>Selected Order Details</h3>
          <p>Order ID: {selectedOrder.orderId}</p>
          <p>User ID: {selectedOrder.userId}</p>
          <p>Shipping Address: {selectedOrder.shippingAddress}</p>
          <p>Order Date: {selectedOrder.orderDate}</p>
          <p>Total Price: {selectedOrder.totalPrice}</p>
          <p>Payment Method: {selectedOrder.paymentMethod}</p>
          <p>Order Status: {selectedOrder.orderStatus ? 'Delivered' : 'Pending'}</p>
          {/* Add more details here as needed */}
        </div>
      )}
    </div>
  );
}

export default MyOrders;



import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getOrdersByUser, Order } from '../services/api';
import '../styles/UserOrders.scss';

const UserOrders: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByUser(id!);
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Error fetching orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [id]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-orders-container">
      <Navbar />
      <h1>User Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found for this user.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  Product ID: {item.productId} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
      <Link to={`/profile/${id}`}>Back to Profile</Link>
    </div>
  );
};

export default UserOrders;

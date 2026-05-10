import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await fetch(`https://govimithuru-backend.onrender.com/orders?customerName=${encodeURIComponent(user.firstname + ' ' + user.lastname)}`);
          if (!response.ok) throw new Error('Failed to fetch orders');
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div>
        <h2>Please log in to view your profile.</h2>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Profile Details</h2>
      <p><strong>First Name:</strong> {user.firstname}</p>
      <p><strong>Last Name:</strong> {user.lastname}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      
      <h3>Purchase History</h3>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <strong>Order ID:</strong> {order._id} - <strong>Total Price:</strong> ${order.totalPrice}
            </li>
          ))}
        </ul>
      )}
      
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Profile;

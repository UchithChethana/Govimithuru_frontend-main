import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img2 from "./img/3135715.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    imageUrl: img2
  });
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
   // Focus effect for inputs with onFocus/onBlur handlers
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (!username) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      setLoadingUser(true);
      try {
        const response = await fetch(`https://govimithuru-backend.onrender.com/user/getByUsername/${username}`);
        const data = await response.json();

        if (data.user) {
          setUser({
            ...data.user,
            imageUrl: data.user.imageUrl || img2
          });
          fetchUserOrders(data.user.email);
        } else {
          toast.error("User not found");
        }
      } catch (error) {
        toast.error("Error fetching user profile");
      } finally {
        setLoadingUser(false);
      }
    };

    const fetchUserOrders = async (email) => {
      setLoadingOrders(true);
      try {
        const response = await fetch(`https://govimithuru-backend.onrender.com/orders/by-customer?email=${encodeURIComponent(email)}`);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        toast.error(`Error fetching orders: ${error.message}`);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchUserProfile();
  }, [username, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://govimithuru-backend.onrender.com/user/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        toast.success("User updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Error updating user");
      }
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    navigate('/login');
    toast.success("Logged out successfully");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await fetch(`https://govimithuru-backend.onrender.com/user/delete/${user._id}`, { method: 'DELETE' });

        if (response.ok) {
          toast.success("Account deleted successfully!");
          handleLogout();
        } else {
          toast.error("Error deleting account");
        }
      } catch (error) {
        toast.error("Error deleting account");
      }
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = orders.filter(order => {
      return order.productDetails.some(item => item.itemName.toLowerCase().includes(value.toLowerCase()));
    });

    setFilteredOrders(filtered);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      const priceA = a.productDetails.reduce((sum, item) => sum + item.totalPrice, 0);
      const priceB = b.productDetails.reduce((sum, item) => sum + item.totalPrice, 0);
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
    setFilteredOrders(sortedOrders);
  };

  if (loadingUser) {
    return <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem', color: '#087B5B' }}>Loading user profile...</div>;
  }

  // --- PREMIUM INLINE STYLES ---
  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    backgroundColor: '#ffffff',
    padding: '30px 40px',
    borderRadius: '15px',
    boxShadow: '0 12px 25px rgba(8, 123, 91, 0.25)',
    fontFamily: "'Poppins', sans-serif",
    color: '#333',
  };

  const headingStyle = {
    fontSize: '2.6rem',
    fontWeight: '800',
    color: '#087B5B',
    marginBottom: '20px',
    textAlign: 'center',
    letterSpacing: '1.5px',
  };

  const profileTopStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    marginBottom: '35px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const imageStyle = {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 8px 20px rgba(8, 123, 91, 0.4)',
    border: '4px solid #087B5B',
  };

  const infoFieldsStyle = {
    flexGrow: 1,
    minWidth: '260px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px 30px',
  };

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: '600',
    fontSize: '1.05rem',
    color: '#555',
  };

  const inputStyle = {
    marginTop: '6px',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '2px solid #ccc',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#333',
    transition: 'border-color 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: '#087B5B',
    boxShadow: '0 0 6px rgba(8,123,91,0.6)',
    outline: 'none',
  };

  const buttonGroupStyle = {
    marginTop: '25px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
  };

  const buttonBase = {
    padding: '12px 26px',
    fontSize: '1.1rem',
    fontWeight: '700',
    borderRadius: '50px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
    minWidth: '160px',
  };

  const editButtonStyle = {
    ...buttonBase,
    backgroundColor: '#087B5B',
    color: '#fff',
  };

  const logoutButtonStyle = {
    ...buttonBase,
    backgroundColor: '#6c757d',
    color: '#fff',
  };

  const deleteButtonStyle = {
    ...buttonBase,
    backgroundColor: '#e63946',
    color: '#fff',
  };

  const historyButtonStyle = {
    ...buttonBase,
    backgroundColor: '#264653',
    color: '#fff',
  };

  const purchaseHistoryStyle = {
    marginTop: '40px',
  };

  const searchInputStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '10px 14px',
    borderRadius: '50px',
    border: '2px solid #ccc',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#333',
    marginBottom: '15px',
    transition: 'border-color 0.3s ease',
  };

  const sortButtonStyle = {
    ...buttonBase,
    padding: '10px 20px',
    fontSize: '1rem',
    minWidth: '140px',
    backgroundColor: '#2a9d8f',
    color: '#fff',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '1rem',
  };

  const thStyle = {
    backgroundColor: '#087B5B',
    color: '#fff',
    padding: '12px 15px',
    textAlign: 'left',
    letterSpacing: '0.05em',
  };

  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '12px 15px',
    verticalAlign: 'top',
  };

  const noOrdersStyle = {
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
    marginTop: '15px',
  };





  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Profile Details</h1>
      <div style={profileTopStyle}>
        <img src={user.imageUrl} alt="Profile" style={imageStyle} />
        <div style={infoFieldsStyle}>
          {['firstname', 'lastname', 'username', 'email'].map((field) => (
            <label key={field} style={labelStyle}>
              {field.charAt(0).toUpperCase() + field.slice(1).replace('name', ' Name')}
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={user[field]}
                disabled={!isEditing}
                onChange={handleInputChange}
                onFocus={() => setFocusedField(field)}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputStyle,
                  ...(focusedField === field ? inputFocusStyle : {}),
                  backgroundColor: isEditing ? '#fff' : '#f9f9f9',
                  cursor: isEditing ? 'text' : 'default',
                }}
              />
            </label>
          ))}
        </div>
      </div>

      <div style={buttonGroupStyle}>
        {isEditing ? (
          <button style={editButtonStyle} onClick={handleUpdate} aria-label="Update profile">
            Update
          </button>
        ) : (
          <button
            style={editButtonStyle}
            onClick={() => setIsEditing(true)}
            aria-label="Edit profile"
          >
            Edit
          </button>
        )}
        <button style={logoutButtonStyle} onClick={handleLogout} aria-label="Logout">
          Logout
        </button>
        <button
          style={deleteButtonStyle}
          onClick={handleDeleteAccount}
          aria-label="Delete account"
        >
          Delete Account
        </button>
        <button
          style={historyButtonStyle}
          onClick={() => setShowHistory(!showHistory)}
          aria-expanded={showHistory}
          aria-controls="purchase-history-section"
        >
          {showHistory ? 'Hide Purchase History' : 'Show Purchase History'}
        </button>
      </div>

      {showHistory && (
        <section id="purchase-history-section" style={purchaseHistoryStyle}>
          <h2 style={{ color: '#087B5B', marginBottom: '15px' }}>Purchase History</h2>
          <input
            type="text"
            placeholder="Search by item name"
            value={searchTerm}
            onChange={handleSearchChange}
            style={searchInputStyle}
            aria-label="Search orders by item name"
            onFocus={() => setFocusedField('search')}
            onBlur={() => setFocusedField(null)}
          />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <button
              style={{ ...sortButtonStyle, backgroundColor: sortOrder === 'asc' ? '#1b5e20' : '#2a9d8f' }}
              onClick={() => handleSortChange('asc')}
              aria-pressed={sortOrder === 'asc'}
            >
              Sort by Price Ascending
            </button>
            <button
              style={{ ...sortButtonStyle, backgroundColor: sortOrder === 'desc' ? '#b71c1c' : '#2a9d8f' }}
              onClick={() => handleSortChange('desc')}
              aria-pressed={sortOrder === 'desc'}
            >
              Sort by Price Descending
            </button>
          </div>

          {loadingOrders ? (
            <p style={{ textAlign: 'center', color: '#087B5B' }}>Loading orders...</p>
          ) : filteredOrders.length === 0 ? (
            <p style={noOrdersStyle}>No orders found.</p>
          ) : (
            <table style={tableStyle} aria-label="Purchase history table">
              <thead>
                <tr>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Total Price</th>
                  <th style={thStyle}>Items</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td style={tdStyle}>
                      {new Date(order.saleDate).toLocaleDateString()}
                    </td>
                    <td style={{ ...tdStyle, color: '#388e3c', fontWeight: '700' }}>
                      Rs.{order.productDetails.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                    </td>
                    <td style={tdStyle}>
                      <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
                        {order.productDetails.map((item) => (
                          <li key={item.itemName} style={{ padding: '4px 0' }}>
                            {item.itemName} (Qty: {item.quantitySold})
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      <ToastContainer position="top-center" autoClose={2500} theme="colored" />
    </div>
  );
}

export default Profile;

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaInfoCircle, FaEnvelope, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './css/Navbar.css';
import logo from './img/logo.png';

function Navbar({ cartItemCount }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    navigate(`/login`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span className="brand-name">Govimithuru</span>
        </div>

        {/* Mobile menu icon */}
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Nav links container */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/home" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              <FaHome className="nav-icon" /> 
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              <FaShoppingCart className="nav-icon" /> 
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active-link cart-link' : 'cart-link')}>
              <FaShoppingCart className="nav-icon cart-icon" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="cart-badge">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              <FaInfoCircle className="nav-icon" /> 
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              <FaEnvelope className="nav-icon" /> 
              <span>Contact</span>
            </NavLink>
          </li>
          {username && (
            <li>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active-link profile-link' : 'profile-link')}>
                <FaUser className="nav-icon" /> 
                <span>{username}</span>
              </NavLink>
            </li>
          )}
          
          <li className="auth-buttons">
            {localStorage.getItem("email") != null && 
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            }
            {localStorage.getItem("email") == null && 
              <button onClick={handleLogin} className="login-btn">
                Login
              </button>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
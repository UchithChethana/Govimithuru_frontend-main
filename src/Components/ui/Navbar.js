import React from 'react';
import './css/Navbar.css';
import logo from './img/logo.png';

function Navbar({ username }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/cart">Cart</a></li>
        {username ? (
          <>
            <li><span>Welcome, {username}!</span></li>
            {localStorage.getItem("email")!= null && <li><a href="/logout">Logout</a></li>}
          </>
        ) : (
          <li><a href="/login">Login</a></li>
        )}
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/other">Other</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

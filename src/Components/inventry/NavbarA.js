import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './css/NavbarA.css';
import img2 from "../ui/img/WhatsApp Image 2024-09-21 at 01.51.31_83da0e81.jpg";

function NavbarA() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    // For example: localStorage.removeItem('token');
    
    // Redirect to login page
    navigate('/login'); // Adjust the path as necessary
    alert("Logged out successfully!");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">Admin Panel</NavLink>
      </div>
      <ul className="navbar-menu">
        <li>
          <NavLink to="/admin/inventory" className={({ isActive }) => (isActive ? 'active-link' : '')}>Inventory</NavLink>
        </li>
        <li>
          <NavLink to="/admin/cart" className={({ isActive }) => (isActive ? 'active-link' : '')}>Shopping Cart</NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? 'active-link' : '')}>Orders</NavLink>
        </li>
        <li>
          <NavLink to="/admin/delivery" className={({ isActive }) => (isActive ? 'active-link' : '')}>Delivery</NavLink>
        </li>
        <li>
          <NavLink to="/admin/employee" className={({ isActive }) => (isActive ? 'active-link' : '')}>Employee</NavLink>
        </li>
        <li>
          <NavLink to="/admin/customers" className={({ isActive }) => (isActive ? 'active-link' : '')}>Customer</NavLink>
        </li>
        <li>
          <NavLink to="/admin/sells" className={({ isActive }) => (isActive ? 'active-link' : '')}>Finance</NavLink>
        </li>
        <li>
          <NavLink to="/admin/payment" className={({ isActive }) => (isActive ? 'active-link' : '')}>Payment</NavLink>
        </li>
      </ul>
      <div className="navbar-user">
        <img src={img2} alt="User Avatar" className="user-avatar" />
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default NavbarA;

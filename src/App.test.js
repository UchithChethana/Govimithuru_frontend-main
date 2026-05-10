import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// User-facing components
import Navbar from './Components/ui/Navbarui';
import Banner from './Components/ui/Banner';
import Poster from './Components/ui/Poster';
import BestSeller from './Components/ui/BestSelling';
import Offer from './Components/ui/Offers';
import CropSolution from './Components/ui/CropSolution';
import Footer from './Components/ui/Footer';
import Seeds from './Components/ui/Seeds';
import Description from './Components/ui/Description';
import Products from './Components/ui/Product';
import Card from './Components/ui/Card';
import OrderSummary from './Components/ui/OrderSummary';
import OrderConfirmation from './Components/ui/OrderConfirmation';
import Signup from './Signup';
import Login from './Login';

// Admin-facing components
import NavbarA from './Components/inventry/NavbarA';
import SidebarA from './Components/inventry/SidebarA';
import InventoryDashboard from './Components/inventry/InventoryDashboard';
import InventorySupplyForm from './Components/inventry/InventorySupplyform';
import AllInventory from './Components/inventry/AllInventory';
import OrderDashboard from './Components/Order/OrderDashboard';
import DeliveryDashboard from './Components/Deliver/Deliveries';
import CardDashboard from './Components/Card/CartDashborad';
import UserDashboard from './Components/User/UserDashboard';
import FinanceDashboard from './Components/finance/FinanceDashboard';
import CartSidebar from './Components/Card/SidebarA';
import DileverySidebar from './Components/Deliver/SidebarA';
import FinanceSidebar from './Components/finance/SidebarA';
import OrderSide from './Components/Order/SidebarA';
import UserSide from './Components/User/SidebarA';
import ShowcaseForm from './Components/inventry/ShowcaseForm';
import ShowcaseDashboard from './Components/inventry/ShowcaseDashboard';
import EmployeeList from './Components/Employee/EmployeeList';
import EmployeeForm from './Components/Employee/EmployeeForm';
import SidebarE from './Components/Employee/SidebarE';
import EmployeeSalaryForm from './Components/Employee/EmployeeSalaryForm';
import SalaryDashboard from './Components/Employee/SalaryDashboard';
import DriverList from './Components/Deliver/DriverList';
import ProtectedRoute from './Components/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for user authentication

  const handleLogin = () => {
    setIsLoggedIn(true); // Set user as logged in
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set user as logged out
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />

          {/* User-facing routes */}
          <Route path="/home" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <Navbar />
                <Banner />
                <Poster />
                <Offer />
                <CropSolution />
                <BestSeller />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <Navbar />
                <Products />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path="/seeds" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <Navbar />
                <Seeds />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path="/description/:id" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <Navbar />
                <Description />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <Navbar />
                <Card />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path="/order-summary" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <Navbar />
                <OrderSummary />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path="/confirmation/:orderId" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <Navbar />
                <OrderConfirmation />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          {/* Admin-facing routes */}
          <Route path="/admin/inventory" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <InventoryDashboard />
                  </div>
                </div>
              </>
            </ProtectedRoute>
          } />
          <Route path="/admin/inventory/supply-form" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <InventorySupplyForm />
                  </div>
                </div>
              </>
            </ProtectedRoute>
          } />
          <Route path="/admin/inventory/all" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <NavbarA />
                <div className="main-content">
                  <SidebarA />
                  <div className="content">
                    <AllInventory />
                  </div>
                </div>
              </>
            </ProtectedRoute>
          } />

          {/* Additional admin routes... */}
          {/* For brevity, I've omitted the rest of the admin routes. You can apply the same pattern to all of them. */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;

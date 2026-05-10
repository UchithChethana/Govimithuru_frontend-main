import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './css/OrderConfirmation.css';
import logo from '../ui/img/logo.png';
import { jsPDF } from 'jspdf';

function OrderConfirmation() {
  const { orderId } = useParams(); // Get the order ID from the URL
  const location = useLocation(); // Get the location object
  const { orderData, totalPrice } = location.state || {}; // Retrieve order data from state

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add logo
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      doc.addImage(img, 'PNG', 10, 10, 30, 30); // Adjust position and size as needed

      doc.setFontSize(10);
      doc.text("Govimithu Pvt Limited", 14, 40);
      doc.text("Anuradhapura Kahatagasdigiliya", 14, 45);
      doc.text("Phone Number: 0789840996", 14, 50);
      doc.text("Delivery Receipt", 20, 70); // Title
      doc.text(`Order ID: ${orderId}`, 20, 80);
      doc.text(`Customer Name: ${orderData.customerName}`, 20, 90);
      doc.text(`Email: ${orderData.email}`, 20, 100);
      doc.text(`Phone Number: ${orderData.phoneNumber}`, 20, 110);
      doc.text(`Address: ${orderData.address}`, 20, 120);
      doc.text(`Postal Code: ${orderData.postalCode}`, 20, 130);
      doc.text("Items:", 20, 140);

      
      
      let yOffset = 150;
      orderData.productDetails.forEach((item) => {
        doc.text(`${item.itemName} - Quantity: ${item.quantitySold} - Total Price: Rs: ${item.totalPrice.toFixed(2)}`, 20, yOffset);
        yOffset += 10;
      });

      doc.text(`Total Price: Rs: ${totalPrice}`, 20, yOffset);
      doc.save(`receipt_${orderId}.pdf`);
    };
  };

  return (
    <div className="order-confirmation">
      <h2>Order Confirmation</h2>
      <p>Your order has been placed successfully!</p>
      <p>Order ID: {orderId}</p>
      <h3>Order Summary</h3>
      {orderData && (
        <>
          <p>Customer Name: {orderData.customerName}</p>
          <p>Email: {orderData.email}</p>
          <p>Phone Number: {orderData.phoneNumber}</p>
          <p>Address: {orderData.address}</p>
          <p>Postal Code: {orderData.postalCode}</p>
          <h4>Items:</h4>
          <ul>
            {orderData.productDetails.map((item, index) => (
              <li key={index}>
                {item.itemName} - Quantity: {item.quantitySold} - Total Price: Rs: {item.totalPrice.toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total Price: Rs: {totalPrice}</h3>
          <button onClick={generatePDF}>Download Bill</button>
        </>
      )}
    </div>
  );
}

export default OrderConfirmation;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './css/vorder.css'; // Adjust the path if necessary

function OrderView() {
    const { id } = useParams(); // Get the order ID from the URL
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Fetch the order details from the server using the order ID
        axios.get(`https://govimithuru-backend.onrender.com/orders/get/${id}`)
            .then((res) => {
                console.log(res.data); // Log the entire response to check the structure
                setOrder(res.data);  // Check if res.data contains the expected order object
            })
            .catch((err) => {
                alert("Error fetching order details: " + err.message);
            });
    }, [id]);

    if (!order) {
        return <p>Loading...</p>;
    }

    return (
        <div className="order-view">
            <h2>Order Details</h2>
            <div className="order-details">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Customer Name:</strong> {order.customerName}</p>
                <p><strong>Product:</strong> {order.product}</p>
                <p><strong>Quantity Sold:</strong> {order.quantitySold}</p>
                <p><strong>Total Price:</strong> {order.totalPrice}</p>
                <p><strong>Sale Date:</strong> {order.saleDate}</p>
                <p><strong>Status:</strong> {order.status}</p>
            </div>
            <button onClick={() => window.history.back()}>Back</button>
        </div>
    );
}

export default OrderView;

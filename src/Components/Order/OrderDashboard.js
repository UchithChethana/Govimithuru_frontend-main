import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import './css/dashboard.css';
import logo from '../ui/img/logo.png';

function OrderDashboard() {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [selectedOrders, setSelectedOrders] = useState(new Set());

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('https://govimithuru-backend.onrender.com/orders/');
                setOrders(res.data);
            } catch (err) {
                toast.error('Error fetching orders: ' + err.message);
            }
        };
        fetchOrders();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredOrders = orders.filter((order) =>
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.productDetails.some(detail => detail.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://govimithuru-backend.onrender.com/orders/delete/${id}`);
            toast.success('Order deleted successfully');
            setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
        } catch (err) {
            toast.error('Error deleting order: ' + err.message);
        }
    };

    const handleConfirm = async (id) => {
        try {
            await axios.put(`https://govimithuru-backend.onrender.com/orders/update/${id}`, { status: 'Confirmed' });
            toast.success('Order confirmed successfully');
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === id ? { ...order, status: 'Confirmed' } : order
                )
            );
        } catch (err) {
            toast.error('Error confirming order: ' + err.message);
        }
    };

    const handleUpdate = async (id, newStatus) => {
        try {
            const orderToUpdate = orders.find(order => order._id === id);
            if (orderToUpdate) {
                const updatedOrder = {
                    ...orderToUpdate,
                    status: newStatus
                };

                await axios.put(`https://govimithuru-backend.onrender.com/orders/update/${id}`, updatedOrder);
                toast.success('Order updated successfully');
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === id ? { ...order, status: newStatus } : order
                    )
                );
            }
        } catch (err) {
            toast.error('Error updating order: ' + err.message);
        }
    };

    const handleDownloadPDF = (order, index) => {
        const doc = new jsPDF();

        // Add logo
        doc.addImage(logo, 'PNG', 10, 10, 50, 20);

        // Add company details
        doc.setFontSize(10);
        doc.text("Govimithu Pvt Limited", 14, 40);
        doc.text("Anuradhapura Kahatagasdigiliya", 14, 45);
        doc.text("Phone Number: 0789840996", 14, 50);

        // Order details
        doc.setFontSize(12);
        doc.text(`Order ID: ${index + 1}`, 10, 60);
        doc.text(`Customer Name: ${order.customerName}`, 10, 70);
        doc.text(`Sale Date: ${new Date(order.saleDate).toLocaleDateString()}`, 10, 80);
        doc.text(`Status: ${order.status}`, 10, 90);
        doc.text(`Address: ${order.address}`, 10, 100);
        doc.text(`Postal Code: ${order.postalCode}`, 10, 110);
        doc.text(`Email: ${order.email}`, 10, 120);
        doc.text(`Phone Number: ${order.phoneNumber}`, 10, 130);
        doc.text(`Payment Type: ${order.paymentType}`, 10, 140);
        doc.text("Product Details:", 10, 150);

        // Product details
        order.productDetails.forEach((detail, detailIndex) => {
            doc.text(`${detailIndex + 1}. ${detail.itemName} - Qty: ${detail.quantitySold}, Price: ₹${detail.itemPrice}, Total: ₹${detail.totalPrice}`, 10, 160 + (detailIndex * 10));
        });

        doc.save(`Order_${index + 1}.pdf`);
    };

    const toggleSelectOrder = (id) => {
        const newSelectedOrders = new Set(selectedOrders);
        if (newSelectedOrders.has(id)) {
            newSelectedOrders.delete(id);
        } else {
            newSelectedOrders.add(id);
        }
        setSelectedOrders(newSelectedOrders);
    };

    return (
        <div>
            <ToastContainer />
            <h2 className="order-list-title">Order Dashboard</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Customer Name or Item"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button className="search-btn">Search</button>
            </div>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Product Details</th>
                        <th>Sale Date</th>
                        <th>Status</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Payment Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order, index) => (
                        <tr key={order._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedOrders.has(order._id)}
                                    onChange={() => toggleSelectOrder(order._id)}
                                />
                            </td>
                            <td>{index + 1}</td>
                            <td>{order.customerName}</td>
                            <td>
                                <button
                                    className="details-btn"
                                    onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
                                >
                                    {expandedOrderId === order._id ? 'Hide Details' : 'Show Details'}
                                </button>
                                {expandedOrderId === order._id && (
                                    <div className="order-details">
                                        {order.productDetails.map((detail, detailIndex) => (
                                            <div key={detailIndex} className="product-detail">
                                                {detail.itemName} - Qty: {detail.quantitySold}, Price: Rs:{detail.itemPrice}, Total: Rs:{detail.totalPrice}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </td>
                            <td>{new Date(order.saleDate).toLocaleDateString()}</td>
                            <td>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`status-${order._id}`}
                                            value="Pending"
                                            checked={order.status === "Pending"}
                                            onChange={() => handleUpdate(order._id, "Pending")}
                                        />
                                        Pending
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`status-${order._id}`}
                                            value="Confirmed"
                                            checked={order.status === "Confirmed"}
                                            onChange={() => handleUpdate(order._id, "Confirmed")}
                                        />
                                        Confirmed
                                    </label>
                                </div>
                            </td>
                            <td>{order.address}</td>
                            <td>{order.postalCode}</td>
                            <td>{order.email}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.paymentType}</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDelete(order._id)}>Delete</button>
                                <button className="download-btn" onClick={() => handleDownloadPDF(order, index)}>Download PDF</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderDashboard;

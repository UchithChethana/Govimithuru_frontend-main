import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/deliverAll.css';
import logo from '../ui/img/logo.png';
import jsPDF from 'jspdf';

function DeliveryDashboard() {
    const [deliveries, setDeliveries] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedDeliveryId, setExpandedDeliveryId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const res = await axios.get('https://govimithuru-backend.onrender.com/delivery/');
                // Create fake delivery IDs
                const deliveriesWithFakeIds = res.data.map((delivery, index) => ({
                    ...delivery,
                    fakeId: `D${index + 1}` // Assign fake IDs like D1, D2, D3, etc.
                }));
                setDeliveries(deliveriesWithFakeIds);
            } catch (err) {
                toast.error('Error fetching deliveries: ' + err.message);
            }
        };
        fetchDeliveries();
    }, []);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const res = await axios.get('https://govimithuru-backend.onrender.com/drivers/status/available');
                setDrivers(res.data);
            } catch (err) {
                toast.error('Error fetching drivers: ' + err.message);
            }
        };
        fetchDrivers();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredDeliveries = deliveries.filter((delivery) =>
        delivery.deliveryPersonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.deliveryDetails.some(detail => detail.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://govimithuru-backend.onrender.com/delivery/delete/${id}`);
            toast.success('Delivery deleted successfully');
            setDeliveries(prevDeliveries => prevDeliveries.filter(delivery => delivery._id !== id));
        } catch (err) {
            toast.error('Error deleting delivery: ' + err.message);
        }
    };

    const handleConfirm = async (id) => {
        try {
            await axios.post(`https://govimithuru-backend.onrender.com/delivery/confirm/${id}`);
            toast.success('Delivery confirmed successfully');
            setDeliveries(prevDeliveries =>
                prevDeliveries.map(delivery =>
                    delivery._id === id ? { ...delivery, status: 'Delivered' } : delivery
                )
            );
        } catch (err) {
            toast.error('Error confirming delivery: ' + err.message);
        }
    };

    const handleAssignDriver = async (deliveryId, driverId) => {
        if (driverId) {
            const driver = drivers.find(driver => driver._id === driverId);
            const driverName = driver ? `${driver.firstName} ${driver.lastName}` : "";

            try {
                await axios.put(`https://govimithuru-backend.onrender.com/delivery/update/${deliveryId}`, { driverName });
                toast.success('Driver assigned successfully');
                setDeliveries(prevDeliveries =>
                    prevDeliveries.map(delivery =>
                        delivery._id === deliveryId ? { ...delivery, driverName } : delivery
                    )
                );
            } catch (err) {
                toast.error('Error assigning driver: ' + err.message);
            }
        } else {
            toast.warn('Please select a driver');
        }
    };

    const handleDownloadPDF = (delivery) => {
        const doc = new jsPDF();

        // Add logo and company information
        doc.addImage(logo, 'PNG', 10, 10, 50, 20);
        doc.setFontSize(12);
        doc.text("Govimithu Pvt Limited", 10, 40);
        doc.text("Anuradhapura Kahatagasdigiliya", 10, 45);
        doc.text("Phone Number: 0789840996", 10, 50);

        // Add delivery information
        doc.text(`Delivery ID: ${delivery.fakeId}`, 10, 60); // Use the fake ID here
        doc.text(`Delivery Person: ${delivery.deliveryPersonName}`, 10, 65);
        doc.text(`Order Date: ${new Date(delivery.deliveryDate).toLocaleDateString()}`, 10, 70);
        doc.text(`Status: ${delivery.status}`, 10, 75);
        doc.text(`Address: ${delivery.address}`, 10, 80);
        doc.text(`Email: ${delivery.email}`, 10, 85);

        // Add item details
        let yPosition = 95;
        doc.text("Order Details:", 10, yPosition);
        yPosition += 10;
        delivery.deliveryDetails.forEach((detail, index) => {
            doc.text(`${index + 1}. ${detail.itemName} - Qty: ${detail.quantity}, Price: Rs:${detail.itemPrice}, Total: Rs:${detail.totalPrice}`, 10, yPosition);
            yPosition += 10;
        });

        doc.save(`Delivery_${delivery.fakeId}.pdf`); // Use the fake ID for the PDF filename
    };

    return (
        <div>
            <ToastContainer />
            <h2 className="delivery-list-title">Delivery Dashboard</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Customer  Name "
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button className="search-btn">Search</button>
            </div>
            <table className="delivery-table">
                <thead>
                    <tr>
                        <th>Delivery ID</th> {/* Delivery ID column */}
                        <th>Customer Name</th>
                        <th>Order Details</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Select Driver</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDeliveries.map(delivery => (
                        <tr key={delivery._id}>
                            <td>{delivery.fakeId}</td> {/* Display fake ID */}
                            <td>{delivery.deliveryPersonName}</td>
                            <td>
                                <button
                                    className="details-btn"
                                    onClick={() => setExpandedDeliveryId(expandedDeliveryId === delivery._id ? null : delivery._id)}
                                >
                                    {expandedDeliveryId === delivery._id ? 'Hide Details' : 'Show Details'}
                                </button>
                                {expandedDeliveryId === delivery._id && (
                                    <div className="delivery-details">
                                        {delivery.deliveryDetails.map((detail, index) => (
                                            <div key={index} className="product-detail">
                                                {detail.itemName} - Qty: {detail.quantity}, Price: Rs:{detail.itemPrice}, Total: Rs:{detail.totalPrice}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </td>
                            <td>{new Date(delivery.deliveryDate).toLocaleDateString()}</td>
                            <td>{delivery.status}</td>
                            <td>{delivery.address}</td>
                            <td>{delivery.email}</td>
                            <td>
                                <select
                                    onChange={(e) => handleAssignDriver(delivery._id, e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select a driver</option>
                                    {drivers.map(driver => (
                                        <option key={driver._id} value={driver._id}>
                                            {driver.firstName} {driver.lastName}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDelete(delivery._id)}>Delete</button>
                                {delivery.status !== 'Delivered' && (
                                    <button className="confirm-btn" onClick={() => handleConfirm(delivery._id)}>Confirm</button>
                                )}
                                <button className="pdf-btn" onClick={() => handleDownloadPDF(delivery)}>Download PDF</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DeliveryDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from "jspdf-autotable";
import './css/Dashboard.css';
import logo from '../ui/img/logo.png';

function Carts() {
    const [cardItems, setCardItems] = useState([]);
    const [expandedItemId, setExpandedItemId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCardItems();
    }, []);

    const fetchCardItems = async () => {
        try {
            const res = await axios.get('https://govimithuru-backend.onrender.com/card');
            setCardItems(res.data);
        } catch (err) {
            console.error('Error fetching card items:', err);
            setError('Error fetching items. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://govimithuru-backend.onrender.com/card/delete/${id}`);
            setCardItems(cardItems.filter(item => item._id !== id));
        } catch (err) {
            console.error('Error deleting card item:', err);
            setError('Error deleting item. Please try again.');
        }
    };

    const handleView = (id) => {
        setExpandedItemId(expandedItemId === id ? null : id);
    };

    const filteredItems = cardItems.filter(item =>
        item.itemNamec.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoryc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.pricec.toString().includes(searchTerm)
    );

    const generatePDF = () => {
        const doc = new jsPDF();
    
        // Add logo
        doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Adjust position and size as needed
    
        // Add company details
        doc.setFontSize(10);
        doc.text("Govimithu Pvt Limited", 14, 40);
        doc.text("Anuradhapura Kahatagasdigiliya", 14, 45);
        doc.text("Phone Number: 0789840996", 14, 50);
    
        // Title
        doc.setFontSize(20);
        doc.text('Cart Items', 14, 60);
    
        // Define columns for the table
        const columns = [
            { header: 'ID', dataKey: 'id' },
            { header: 'Name', dataKey: 'itemNamec' },
            { header: 'Category', dataKey: 'categoryc' },
            { header: 'Price', dataKey: 'pricec' },
            { header: 'Available', dataKey: 'available' },
            { header: 'Quantity', dataKey: 'quantityc' }
        ];
    
        // Prepare data for the table
        const rows = filteredItems.map((item, index) => ({
            id: index + 1,
            itemNamec: item.itemNamec,
            categoryc: item.categoryc,
            pricec: `Rs: ${item.pricec.toFixed(2)}`,
            available: item.available,
            quantityc: item.quantityc
        }));
    
        // Add the table to the PDF
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: rows.map(row => columns.map(col => row[col.dataKey])),
            startY: 70,
            styles: {
                fillColor: [240, 240, 240],
                cellPadding: 3,
                fontSize: 10,
                textColor: [0, 0, 0],
                overflow: 'linebreak',
            },
            headStyles: {
                fillColor: [0, 102, 204], // Blue color for headers
                textColor: [255, 255, 255], // White text
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255], // White for alternate rows
            },
        });
    
        // Footer
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFontSize(10);
        doc.text('Generated on: ' + new Date().toLocaleDateString(), 10, pageHeight - 20);
        doc.text('Thank you for using our service!', 10, pageHeight - 15);
    
        // Save the PDF
        doc.save('cart_items.pdf');
    };
    
    
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Cart Dashboard</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Name, Category, or Price"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn" onClick={() => {}}>Search</button>
            </div>
            <button className="pdf-btn" onClick={generatePDF}>Download PDF</button>
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <React.Fragment key={item._id}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={`data:image/jpeg;base64,${item.imagec}`}
                                            alt={item.itemNamec}
                                            className="cart-item-image"
                                        />
                                    </td>
                                    <td>{item.itemNamec}</td>
                                    <td>{item.categoryc}</td>
                                    <td>Rs{item.pricec.toFixed(2)}</td>
                                    <td>{item.available}</td>
                                    <td>{item.quantityc}</td>
                                    <td>
                                        <button onClick={() => handleView(item._id)}>View</button><p></p>
                                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                                {expandedItemId === item._id && (
                                    <tr>
                                        <td colSpan="8" className="expanded-row">
                                            <div>
                                                <h3>Item Details</h3>
                                                <p><strong>Item Name:</strong> {item.itemNamec || "No description available."}</p>
                                                <p><strong>Category:</strong> {item.categoryc || "N/A"}</p>
                                                <p><strong>Total Price:</strong> {item.quantityc * item.pricec}</p>
                                                <p><strong>Remainder Quantity:</strong> {item.available - item.quantityc}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No items in the cart.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Carts;

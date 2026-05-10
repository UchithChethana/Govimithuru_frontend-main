import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import './css/inventryAll.css';
import logo from '../ui/img/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllInventory() {
    const [items, setItems] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showExpiringItems, setShowExpiringItems] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://govimithuru-backend.onrender.com/inventoryitem/")
            .then((res) => {
                setItems(res.data);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, []);

    const handleView = (id) => {
        navigate(`/supplyupdate/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`https://govimithuru-backend.onrender.com/inventoryitem/delete/${id}`)
            .then((res) => {
                toast.success(res.data.status);
                setItems((prevItems) => prevItems.filter(item => item._id !== id));
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const handleAggregate = () => {
        axios.post("https://govimithuru-backend.onrender.com/availableitem/aggregate")
            .then((res) => {
                toast.success(res.data.message);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const handleUpdate = (item) => {
        axios.put(`https://govimithuru-backend.onrender.com/inventoryitem/update/${item._id}`, item)
            .then((res) => {
                toast.success(res.data.status);
                setItems((prevItems) => prevItems.map(i => (i._id === item._id ? item : i)));
                setEditingItemId(null);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.addImage(logo, 'PNG', 10, 10, 50, 20);
        doc.text("Govimithu Pvt Limited", 20, 35);
        doc.text("Anuradhapura Kahatagasdigiliya", 20, 40);
        doc.text("Phone Number: 0789840996", 20, 45);
        doc.text('Inventory List', 20, 60);
    
        const columns = [
            { header: "ID", dataKey: "id" },
            { header: "Name", dataKey: "name" },
            { header: "Supplier Name", dataKey: "supName" },
            { header: "Description", dataKey: "description" },
            { header: "Category", dataKey: "category" },
            { header: "Unit", dataKey: "unit" },
            { header: "Quantity Available", dataKey: "quantityAvailable" },
            { header: "Unit Price", dataKey: "unitPrice" },
            { header: "Total Price", dataKey: "totalPrice" },
            { header: "Supply Date", dataKey: "supplyDate" }
        ];
        
        const rows = items.map((item, index) => ({
            id: index + 1,
            name: item.name || '',
            supName: item.supName || '',
            description: item.description || '',
            category: item.category || '',
            unit: item.unit || '',
            quantityAvailable: item.quantityAvailable || 0,
            unitPrice: item.unitPrice ? item.unitPrice.toFixed(2) : '0.00',
            totalPrice: (item.unitPrice * item.quantityAvailable).toFixed(2),
            supplyDate: item.supplyDate || ''
        }));
    
        // Calculate total price and total quantity available
        const totalPrice = items.reduce((sum, item) => sum + ((item.unitPrice || 0) * (item.quantityAvailable || 0)), 0).toFixed(2);
        const totalQuantityAvailable = items.reduce((sum, item) => sum + (item.quantityAvailable || 0), 0);
    
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: rows.map(row => columns.map(col => row[col.dataKey])),
            startY: 70,
            theme: 'striped'
        });
    
        const finalY = doc.autoTable.previous.finalY; // Get the final Y position of the table
        doc.text('Total Quantity Available: ' + totalQuantityAvailable, 10, finalY + 10);
        doc.text('Total Price: ' + totalPrice, 10, finalY + 20);
    
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFontSize(10);
        doc.text('Generated on: ' + new Date().toLocaleDateString(), 10, pageHeight - 20);
        doc.text('Thank you for using our service!', 10, pageHeight - 15);
    
        doc.save('inventory_list.pdf');
    };
    
    

    const isExpiringSoon = (expireDate) => {
        const today = new Date();
        const expDate = new Date(expireDate);
        const timeDiff = expDate - today;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        return daysDiff <= 10 && daysDiff >= 0; // Within 10 days
    };

    const handleShowExpiringItems = () => {
        setShowExpiringItems(prev => !prev);
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.supName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.quantityAvailable.toString().includes(searchTerm) ||
            item.supplyDate.includes(searchTerm);

        const isExpiring = showExpiringItems ? isExpiringSoon(item.expireDate) : true;

        return matchesSearch && isExpiring;
    });

    const totalQuantity = filteredItems.reduce((sum, item) => sum + (item.quantityAvailable || 0), 0);
    const totalPrice = filteredItems.reduce((sum, item) => sum + ((item.unitPrice || 0) * (item.quantityAvailable || 0)), 0);

    return (
        <div>
            <ToastContainer />
            <h2 className="inventory-list-title">Inventory List</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search ID, User, and Contact"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">Search</button>
            </div>
            <button className="aggregate-btn" onClick={handleAggregate}>Aggregate Items</button>
            <p></p>
            <button className="expiring-btn" onClick={handleShowExpiringItems}>
                {showExpiringItems ? "Show All Items" : "Show Expiring Items"}
            </button>
            <p></p>
            <button className="download-btn" onClick={downloadPDF}>Download Full Inventory PDF</button>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Supplier Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Unit</th>
                        <th>Quantity Available</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        <th>Mfd Date</th>
                        <th>Exp Date</th>
                        <th>Supply Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item, index) => (
                        <React.Fragment key={item._id}>
                            <tr className={isExpiringSoon(item.expireDate) ? "expiring" : ""}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.supName}</td>
                                <td>{item.description}</td>
                                <td>{item.category}</td>
                                <td>{item.unit}</td>
                                <td>{item.quantityAvailable}</td>
                                <td>{item.unitPrice ? item.unitPrice.toFixed(2) : '0.00'}</td>
                                <td>{(item.unitPrice * item.quantityAvailable).toFixed(2)}</td>
                                <td>{item.mfdDate}</td>
                                <td>{item.expireDate}</td>
                                <td>{item.supplyDate}</td>
                                <td>
                                    <button onClick={() => handleView(item._id)}>View</button>
                                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                                    <button onClick={() => setEditingItemId(item._id)}>Edit</button>
                                </td>
                            </tr>
                            {editingItemId === item._id && (
                                <tr>
                                    <td colSpan="12">
                                        <div className="edit-row">
                                            <input type="number" value={item.quantityAvailable} onChange={(e) => handleUpdate({ ...item, quantityAvailable: Number(e.target.value) })} />
                                            <button className="save-btn" onClick={() => handleUpdate(item)}>Save</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6">Total</td>
                        <td>{totalQuantity}</td>
                        <td></td>
                        <td>{totalPrice.toFixed(2)}</td>
                        <td colSpan="4"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default AllInventory;

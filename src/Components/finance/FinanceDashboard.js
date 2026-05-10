import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './css/financeDashboard.css';

function FinanceDashboard() {
    const [finances, setFinances] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchFinances();
    }, []);

    const fetchFinances = () => {
        axios.get("https://govimithuru-backend.onrender.com/finance/")
            .then((res) => {
                setFinances(res.data);
            })
            .catch((err) => {
                console.error("Error fetching finances:", err);
                alert("Error fetching finance records. Please try again.");
            });
    };

    const handleSearch = () => {
        if (!search.trim()) {
            fetchFinances(); // Fetch all records if search query is empty
            return;
        }

        axios.get(`https://govimithuru-backend.onrender.com/finance/search?query=${encodeURIComponent(search)}`)
            .then((res) => {
                setFinances(res.data);
            })
            .catch((err) => {
                console.error("Error searching finances:", err);
                alert("Error searching finance records. Please try again.");
            });
    };

    const handleView = (id) => {
        navigate(`/finance/${id}`);
    };

    return (
        <div>
            <h2 className="finance-list-title">Finance Records</h2>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search Customer, Item, Date" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="search-btn" onClick={handleSearch}>Search</button>
            </div>
            <table className="finance-table">
                <thead>
                    <tr>
                        <th>Record ID</th>
                        <th>Customer Name</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Full Amount</th>
                        <th>Payment Option</th>
                        <th>Paid Price</th>
                        <th>Debt</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {finances.length > 0 ? (
                        finances.map((finance, index) => (
                            <tr key={finance._id}>
                                <td>{index + 1}</td> {/* Static incrementing IDs: 1, 2, 3, ... */}
                                <td>{finance.customerName}</td>
                                <td>{finance.itemName}</td>
                                <td>{finance.itemPrice}</td>
                                <td>{new Date(finance.date).toLocaleDateString()}</td>
                                <td>{finance.quantity}</td>
                                <td>{finance.fullAmount}</td>
                                <td>{finance.paymentOption}</td>
                                <td>{finance.paidPrice}</td>
                                <td>{finance.debt}</td>
                                <td>
                                    <button className="view-btn" onClick={() => handleView(finance._id)}>View</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="no-data">No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default FinanceDashboard;

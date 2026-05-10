import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/BestSellerDashboard.css'; // Make sure to create this CSS file

function BestSellerDashboard() {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBestSellers();
    }, []);

    const fetchBestSellers = async () => {
        try {
            const response = await axios.get('https://govimithuru-backend.onrender.com/bestselling/');
            setBestSellers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch best-selling items.');
            setLoading(false);
        }
    };

    const handleAddBestSeller = () => {
        window.location.href = '/admin/bestselling/add'; // Adjust the URL as needed
    };

    const handleDeleteBestSeller = async (id) => {
        try {
            await axios.delete(`https://govimithuru-backend.onrender.com/bestselling/delete/${id}`);
            setBestSellers(bestSellers.filter(item => item._id !== id));
            toast.success("Item deleted successfully.");
        } catch (err) {
            setError('Failed to delete item.');
            toast.error("Failed to delete item.");
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="best-seller-dashboard">
            <ToastContainer />
            <h2>Best Seller Dashboard</h2>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleAddBestSeller} className="add-item-btn">Add Best Seller</button>

            <table className="best-seller-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Link</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bestSellers.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.link}</td>
                            <td>
                                {item.img && (
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="best-seller-image"
                                    />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleDeleteBestSeller(item._id)} className="delete-item-btn">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BestSellerDashboard;

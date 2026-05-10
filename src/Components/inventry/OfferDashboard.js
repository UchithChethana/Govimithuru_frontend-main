import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/OfferDashboard.css'; // Make sure to create this CSS file

function OfferDashboard() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await axios.get('https://govimithuru-backend.onrender.com/offers/');
            setOffers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch offers.');
            setLoading(false);
        }
    };

    const handleAddOffer = () => {
        window.location.href = '/admin/offers/add'; // Adjust the URL as needed
    };

    const handleDeleteOffer = async (id) => {
        try {
            await axios.delete(`https://govimithuru-backend.onrender.com/offers/delete/${id}`);
            setOffers(offers.filter(offer => offer._id !== id));
            toast.success("Offer deleted successfully.");
        } catch (err) {
            setError('Failed to delete offer.');
            toast.error("Failed to delete offer.");
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="offer-dashboard">
            <ToastContainer />
            <h2>Offer Dashboard</h2>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleAddOffer} className="add-offer-btn">Add Offer</button>

            <table className="offer-table">
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
                    {offers.map((offer, index) => (
                        <tr key={offer._id}>
                            <td>{index + 1}</td>
                            <td>{offer.title}</td>
                            <td>{offer.description}</td>
                            <td>{offer.link}</td>
                            <td>
                                {offer.img && (
                                    <img
                                        src={offer.img}
                                        alt={offer.title}
                                        className="offer-image"
                                    />
                                )}
                            </td>
                            <td>
                                <button 
                                    onClick={() => handleDeleteOffer(offer._id)} 
                                    className="delete-offer-btn"
                                >
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

export default OfferDashboard;

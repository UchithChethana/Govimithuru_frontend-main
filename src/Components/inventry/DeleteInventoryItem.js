import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './css/Delete.css'; // Import your CSS file

function DeleteInventoryItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        axios.get(`https://govimithuru-backend.onrender.com/inventoryitem/get/${id}`)
            .then((res) => {
                setItem(res.data.inventoryitems);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`https://govimithuru-backend.onrender.com/inventoryitem/delete/${id}`)
            .then(() => {
                alert("Item deleted successfully");
                navigate('/supplyshow');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className="delete-container">
            <h2 className="delete-title">Confirm Deletion</h2>
            {item ? (
                <div className="delete-content">
                    <p>Are you sure you want to delete the item with ID {item._id}?</p>
                    <div className="delete-actions">
                        <button onClick={handleDelete} className="delete-confirm-btn">Yes, Delete</button>
                        <button onClick={() => navigate('/supplyshow')} className="cancel-btn">Cancel</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default DeleteInventoryItem;

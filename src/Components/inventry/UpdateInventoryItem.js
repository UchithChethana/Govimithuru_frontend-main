import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './css/Update.css'; // Import your CSS file

function UpdateInventoryItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState({
        name: '',
        supName: '',
        description: '',
        category: '',
        unit: '',
        quantityAvailable: '',
        supplyDate: ''
    });

    useEffect(() => {
        axios.get(`https://govimithuru-backend.onrender.com/inventoryitem/get/${id}`)
            .then((res) => {
                setItem(res.data.inventoryitems);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, [id]);

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`https://govimithuru-backend.onrender.com/inventoryitem/update/${id}`, item)
            .then(() => {
                alert("Item updated successfully");
                navigate('/supplyshow');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className="update-container">
            <h2 className="update-title">Update Inventory Item</h2>
            <form onSubmit={handleUpdate} className="update-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={item.name} onChange={handleChange} placeholder="Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="supName">Supplier Name</label>
                    <input type="text" id="supName" name="supName" value={item.supName} onChange={handleChange} placeholder="Supplier Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" value={item.description} onChange={handleChange} placeholder="Description" />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" name="category" value={item.category} onChange={handleChange} placeholder="Category" />
                </div>
                <div className="form-group">
                    <label htmlFor="unit">Unit</label>
                    <input type="text" id="unit" name="unit" value={item.unit} onChange={handleChange} placeholder="Unit" />
                </div>
                <div className="form-group">
                    <label htmlFor="quantityAvailable">Quantity Available</label>
                    <input type="number" id="quantityAvailable" name="quantityAvailable" value={item.quantityAvailable} onChange={handleChange} placeholder="Quantity Available" />
                </div>
                <div className="form-group">
                    <label htmlFor="supplyDate">Supply Date</label>
                    <input type="date" id="supplyDate" name="supplyDate" value={item.supplyDate.substring(0, 10)} onChange={handleChange} />
                </div>
                <div className="form-actions">
                    <button type="submit" className="update-confirm-btn">Update</button>
                    <button type="button" onClick={() => navigate('/supplyshow')} className="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateInventoryItem;

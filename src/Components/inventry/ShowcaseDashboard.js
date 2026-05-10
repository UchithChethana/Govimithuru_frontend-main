import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import './css/ShowcaseDashboard.css';
import logo from '../ui/img/logo.png';

function ShowcaseDashboard() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editId, setEditId] = useState(null);
    const [updatedImage, setUpdatedImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://govimithuru-backend.onrender.com/showcase/")
            .then((res) => {
                setItems(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch items. Please try again.');
                setLoading(false);
            });
    }, []);

    const handleView = (id) => {
        navigate(`/showcase/view/${id}`);
    };

    const handleEditToggle = (id) => {
        setEditId(editId === id ? null : id);
        setUpdatedImage(null); // Reset image on edit toggle
    };

    const handleUpdate = (id) => {
        const itemToUpdate = items.find(item => item._id === id);
        const formData = new FormData();

        formData.append('description', itemToUpdate.description);
        formData.append('unit', itemToUpdate.unit);
        formData.append('price', itemToUpdate.price);
        formData.append('discount', itemToUpdate.discount);
        if (updatedImage) {
            formData.append('image', updatedImage); // Include updated image
        }

        axios.put(`https://govimithuru-backend.onrender.com/showcase/update/${id}`, formData)
            .then(() => {
                toast.success("Item updated successfully");
                setEditId(null);
                setUpdatedImage(null);
                setItems(prevItems => 
                    prevItems.map(item => 
                        item._id === id ? { ...item, ...formData } : item
                    )
                );
            })
            .catch((err) => {
                toast.error('Failed to update item.');
            });
    };

    const handleDelete = (id) => {
        axios.delete(`https://govimithuru-backend.onrender.com/showcase/delete/${id}`)
            .then(() => {
                setItems(items.filter(item => item._id !== id));
                toast.success("Showcase Item Deleted");
            })
            .catch((err) => {
                setError('Failed to delete item. Please try again.');
                toast.error("Failed to delete item.");
            });
    };
    

    const handleAddNew = () => {
        navigate('/admin/showcase/ShowcaseForm');
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.addImage(logo, 'PNG', 10, 10, 50, 20);
        doc.text("Govimithu Pvt Limited", 20, 35);
        doc.text("Anuradhapura Kahatagasdigiliya", 20, 40);
        doc.text("Phone Number: 0789840996", 20, 45);
        doc.text('Showcase Items', 20, 60);

        const data = items.map((item) => ({
            Name: item.name,
            Category: item.category,
            Description: item.description,
            Unit: item.unit,
            Price: item.price,
            Discount: item.discount ? `${item.discount} %` : 'No Discount',
        }));

        autoTable(doc, {
            head: [['Name', 'Category', 'Description', 'Unit', 'Price', 'Discount']],
            body: data.map(item => [item.Name, item.Category, item.Description, item.Unit, item.Price, item.Discount]),
            startY: 70,
            theme: 'striped'
        });

        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFontSize(10);
        doc.text('Generated on: ' + new Date().toLocaleDateString(), 10, pageHeight - 20);
        doc.text('Thank you for using our service!', 10, pageHeight - 15);

        doc.save('showcase_items.pdf');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="showcase-dashboard-container">
            <ToastContainer /> {/* Add ToastContainer here */}
            <h2 className="showcase-dashboard-title">Showcase Dashboard</h2>
            <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <button className="add-new-btn" onClick={handleAddNew}>Add New Showcase Item</button>
            <button className="download-pdf-btn" onClick={generatePDF}>Download PDF</button>
            {error && <p className="error-message">{error}</p>}
            <table className="showcase-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Unit</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <React.Fragment key={item._id}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    {editId === item._id ? (
                                        <>
                                            <td><input type="text" defaultValue={item.description} onChange={(e) => item.description = e.target.value} /></td>
                                            <td><input type="text" defaultValue={item.unit} onChange={(e) => item.unit = e.target.value} /></td>
                                            <td><input type="number" defaultValue={item.price} onChange={(e) => item.price = e.target.value} /></td>
                                            <td><input type="number" defaultValue={item.discount} onChange={(e) => item.discount = e.target.value} /></td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{item.description}</td>
                                            <td>{item.unit}</td>
                                            <td>{item.price}</td>
                                            <td>{item.discount ? `${item.discount} %` : 'No Discount'}</td>
                                        </>
                                    )}
                                    <td>
                                        <img
                                            src={`data:image/jpeg;base64,${item.imageBase64}`}
                                            alt={item.name}
                                            className="showcase-image"
                                        />
                                    </td>
                                    <td>
                                        {editId === item._id ? (
                                            <>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setUpdatedImage(e.target.files[0])}
                                                />
                                                <button onClick={() => handleUpdate(item._id)}>Save</button>
                                                <button onClick={() => setEditId(null)}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="view-btn" onClick={() => handleView(item._id)}>View</button>
                                                <button className="update-btn" onClick={() => handleEditToggle(item._id)}>Edit</button>
                                                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No items available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ShowcaseDashboard;

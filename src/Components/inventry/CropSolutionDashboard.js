import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/CropSolutionDashboard.css'; // Make sure to create this CSS file

function CropSolutionDashboard() {
    const [cropSolutions, setCropSolutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCropSolutions();
    }, []);

    const fetchCropSolutions = async () => {
        try {
            const response = await axios.get('https://govimithuru-backend.onrender.com/cropsolutions/');
            setCropSolutions(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch crop solutions.');
            setLoading(false);
        }
    };

    const handleAddCropSolution = () => {
        window.location.href = '/admin/cropsolutions/add'; // Adjust the URL as needed
    };

    const handleDeleteCropSolution = async (id) => {
        try {
            await axios.delete(`https://govimithuru-backend.onrender.com/cropsolutions/delete/${id}`);
            setCropSolutions(cropSolutions.filter(solution => solution._id !== id));
            toast.success("Crop solution deleted successfully.");
        } catch (err) {
            setError('Failed to delete crop solution.');
            toast.error("Failed to delete crop solution.");
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="crop-solution-dashboard">
            <ToastContainer />
            <h2>Crop Solution Dashboard</h2>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleAddCropSolution} className="add-solution-btn">Add Crop Solution</button>

            <table className="crop-solution-table">
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
                    {cropSolutions.map((solution, index) => (
                        <tr key={solution._id}>
                            <td>{index + 1}</td>
                            <td>{solution.title}</td>
                            <td>{solution.description}</td>
                            <td>{solution.link}</td>
                            <td>
                                {solution.img && (
                                    <img
                                        src={solution.img}
                                        alt={solution.title}
                                        className="crop-solution-image"
                                    />
                                )}
                            </td>
                            <td>
                                <button 
                                    onClick={() => handleDeleteCropSolution(solution._id)} 
                                    className="delete-solution-btn"
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

export default CropSolutionDashboard;

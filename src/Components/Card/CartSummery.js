// src/components/CartSummary.js

import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Card, Table } from 'react-bootstrap';

const CartSummary = () => {
    const [chartData, setChartData] = useState({});
    const [itemsSummary, setItemsSummary] = useState([]);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get('https://govimithuru-backend.onrender.com/card');
                prepareChartData(response.data);
                prepareItemsSummary(response.data);
            } catch (error) {
                console.error("Error fetching summary data:", error);
            }
        };

        fetchSummary();
    }, []);

    const prepareChartData = (data) => {
        const summary = data.reduce((acc, item) => {
            acc[item.categoryc] = (acc[item.categoryc] || 0) + item.quantityc;
            return acc;
        }, {});

        const labels = Object.keys(summary);
        const values = Object.values(summary);

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Quantity per Category',
                    data: values,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                },
            ],
        });
    };

    const prepareItemsSummary = (data) => {
        const summary = data.reduce((acc, item) => {
            if (acc[item.itemNamec]) {
                acc[item.itemNamec].quantity += item.quantityc;
            } else {
                acc[item.itemNamec] = { ...item, quantity: item.quantityc };
            }
            return acc;
        }, {});

        setItemsSummary(Object.values(summary));
    };

    const chartContainerStyle = {
        width: '100%',
        maxWidth: '600px', // Set a max width for the charts
        margin: '0 auto',  // Center the charts
        height: '400px',   // Set a fixed height
    };

    const tableStyle = {
        fontSize: '1rem',   // Adjust font size
    };

    return (
        <div>
            <Card className="my-4">
                <Card.Body>
                    <Card.Title>Cart Summary - Pie Chart</Card.Title>
                    {chartData.labels && chartData.labels.length > 0 ? (
                        <div style={chartContainerStyle}>
                            <Pie data={chartData} />
                        </div>
                    ) : (
                        <p>No data available for Pie Chart.</p>
                    )}
                </Card.Body>
            </Card>

            <Card className="my-4">
                <Card.Body>
                    <Card.Title>Cart Summary - Bar Chart</Card.Title>
                    {chartData.labels && chartData.labels.length > 0 ? (
                        <div style={chartContainerStyle}>
                            <Bar data={chartData} />
                        </div>
                    ) : (
                        <p>No data available for Bar Chart.</p>
                    )}
                </Card.Body>
            </Card>

            <Card className="my-4">
                <Card.Body>
                    <Card.Title>Items Summary Table</Card.Title>
                    <Table striped bordered hover responsive style={tableStyle}>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsSummary.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.itemNamec}</td>
                                    <td>{item.categoryc}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.pricec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CartSummary;

// src/components/InventorySummary.js

import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import { Card, Row, Col, Table } from 'react-bootstrap';

// Register components
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const InventorySummary = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [summarizedData, setSummarizedData] = useState([]);

    useEffect(() => {
        const fetchInventoryItems = async () => {
            try {
                const response = await axios.get('https://govimithuru-backend.onrender.com/inventoryitem'); // Adjust API URL as needed
                setInventoryData(response.data);
                prepareChartData(response.data);
                summarizeData(response.data);
            } catch (error) {
                console.error("Error fetching inventory data:", error);
            }
        };

        fetchInventoryItems();
    }, []);

    const prepareChartData = (data) => {
        const summary = data.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + item.quantityAvailable;
            return acc;
        }, {});

        const labels = Object.keys(summary);
        const values = Object.values(summary);

        setChartData({
            pie: {
                labels: labels,
                datasets: [
                    {
                        label: 'Inventory Status Summary (Pie)',
                        data: values,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
                    },
                ],
            },
            bar: {
                labels: labels,
                datasets: [
                    {
                        label: 'Inventory Status Summary (Bar)',
                        data: values,
                        backgroundColor: '#36A2EB',
                    },
                ],
            },
        });
    };

    const summarizeData = (data) => {
        const summary = data.reduce((acc, item) => {
            const key = `${item.supName}-${item.name}`; // Unique key for each supplier-item combination
            if (!acc[key]) {
                acc[key] = { supName: item.supName, itemName: item.name, totalQuantity: 0 };
            }
            acc[key].totalQuantity += item.quantityAvailable; // Sum the quantities
            return acc;
        }, {});

        setSummarizedData(Object.values(summary)); // Convert back to array
    };

    return (
        <Card className="my-4">
            <Card.Body>
                <Card.Title>Inventory Summary</Card.Title>
                <Row>
                    <Col md={6}>
                        <h5>Pie Chart</h5>
                        <div style={{ width: '100%', height: '300px' }}>
                            {chartData.pie && chartData.pie.labels && chartData.pie.labels.length > 0 ? (
                                <Pie data={chartData.pie} />
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </Col>
                    <Col md={6}>
                        <h5>Bar Chart</h5>
                        <div style={{ width: '100%', height: '300px' }}>
                            {chartData.bar && chartData.bar.labels && chartData.bar.labels.length > 0 ? (
                                <Bar data={chartData.bar} />
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </Col>
                </Row>
                <h5>Supplier and Item Summary</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Supplier Name</th>
                            <th>Item Name</th>
                            <th>Total Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summarizedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.supName}</td>
                                <td>{item.itemName}</td>
                                <td>{item.totalQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default InventorySummary;

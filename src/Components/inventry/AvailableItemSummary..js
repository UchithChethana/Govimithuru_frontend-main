// src/components/AvailableItemSummary.js

import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

// Register components
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const AvailableItemSummary = () => {
    const [chartData, setChartData] = useState({ pie: {}, bar: {} });

    useEffect(() => {
        const fetchSummaryData = async () => {
            try {
                const response = await axios.get('https://govimithuru-backend.onrender.com/availableitem'); // Adjust API URL as needed
                prepareChartData(response.data);
            } catch (error) {
                console.error("Error fetching available item summary:", error);
            }
        };

        fetchSummaryData();
    }, []);

    const prepareChartData = (data) => {
        const labels = Object.keys(data);
        const values = Object.values(data);

        setChartData({
            pie: {
                labels: labels,
                datasets: [
                    {
                        label: 'Available Items by Category',
                        data: values,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
                    },
                ],
            },
            bar: {
                labels: labels,
                datasets: [
                    {
                        label: 'Available Items by Category',
                        data: values,
                        backgroundColor: '#36A2EB',
                    },
                ],
            },
        });
    };

    return (
        <Card className="my-4">
            <Card.Body>
                <Card.Title>Available Item Summary</Card.Title>
                <Row>
                    <Col md={6}>
                        <h5>Available Items Pie Chart</h5>
                        <div style={{ width: '100%', height: '300px' }}>
                            {chartData.pie.labels && chartData.pie.labels.length > 0 ? (
                                <Pie data={chartData.pie} />
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </Col>
                    <Col md={6}>
                        <h5>Available Items Bar Chart</h5>
                        <div style={{ width: '100%', height: '300px' }}>
                            {chartData.bar.labels && chartData.bar.labels.length > 0 ? (
                                <Bar data={chartData.bar} />
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AvailableItemSummary;

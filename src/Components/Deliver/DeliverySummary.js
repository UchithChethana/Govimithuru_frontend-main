// src/components/DeliverySummary.js

import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import { Card, Row, Col, Table } from 'react-bootstrap';

// Register components
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DeliverySummary = () => {
    const [deliveryData, setDeliveryData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await axios.get('https://govimithuru-backend.onrender.com/delivery'); // Adjust API URL as needed
                setDeliveryData(response.data);
                prepareChartData(response.data);
                prepareTableData(response.data);
            } catch (error) {
                console.error("Error fetching delivery data:", error);
            }
        };

        fetchDeliveries();
    }, []);

    const prepareChartData = (data) => {
        const summary = data.reduce((acc, delivery) => {
            acc[delivery.status] = (acc[delivery.status] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(summary);
        const values = Object.values(summary);

        setChartData({
            pie: {
                labels: labels,
                datasets: [
                    {
                        label: 'Delivery Status Summary (Pie)',
                        data: values,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    },
                ],
            },
            bar: {
                labels: labels,
                datasets: [
                    {
                        label: 'Delivery Status Summary (Bar)',
                        data: values,
                        backgroundColor: '#36A2EB',
                    },
                ],
            },
        });
    };

    const prepareTableData = (data) => {
        const summary = data.reduce((acc, delivery) => {
            const key = `${delivery.deliveryPersonName} - ${delivery.status}`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});

        const formattedTableData = Object.entries(summary).map(([key, value]) => {
            const [deliveryPersonName, status] = key.split(" - ");
            return { deliveryPersonName, status, count: value };
        });

        setTableData(formattedTableData);
    };

    return (
        <Card className="my-4">
            <Card.Body>
                <Card.Title>Delivery Summary</Card.Title>
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
                <h5 className="mt-4">Delivery Summary Table</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Delivery Person</th>
                            <th>Status</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length > 0 ? (
                            tableData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.deliveryPersonName}</td>
                                    <td>{row.status}</td>
                                    <td>{row.count}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default DeliverySummary;

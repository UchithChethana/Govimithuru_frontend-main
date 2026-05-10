// src/components/OrderSummaryChart.js

import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import { Card, Row, Col, Table } from 'react-bootstrap';

// Register components
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const OrderSummaryChart = () => {
    const [orderData, setOrderData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [summaryTableData, setSummaryTableData] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://govimithuru-backend.onrender.com/orders'); // Adjust API URL as needed
                setOrderData(response.data);
                prepareChartData(response.data);
                prepareSummaryTableData(response.data);
            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        };

        fetchOrders();
    }, []);

    const prepareChartData = (data) => {
        const summary = data.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(summary);
        const values = Object.values(summary);

        setChartData({
            pie: {
                labels: labels,
                datasets: [
                    {
                        label: 'Order Status Summary (Pie)',
                        data: values,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    },
                ],
            },
            bar: {
                labels: labels,
                datasets: [
                    {
                        label: 'Order Status Summary (Bar)',
                       // data: values,
                        backgroundColor: '#36A2EB',
                    },
                ],
            },
        });
    };

    const prepareSummaryTableData = (data) => {
        const summary = data.reduce((acc, order) => {
            const dateKey = new Date(order.date).toLocaleDateString(); // Format date
            const customerKey = order.customerName;

            if (!acc[dateKey]) {
                acc[dateKey] = {};
            }
            acc[dateKey][customerKey] = (acc[dateKey][customerKey] || 0) + 1; // Count orders
            return acc;
        }, {});

        const formattedSummary = Object.entries(summary).flatMap(([date, customers]) => {
            return Object.entries(customers).map(([customerName, count]) => ({
                date,
                customerName,
                orderCount: count,
            }));
        });

        setSummaryTableData(formattedSummary);
    };

    return (
        <Card className="my-4">
            <Card.Body>
                <Card.Title>Order Summary</Card.Title>
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
                <h5>Order Count by Customer and Date</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                           
                            <th>Customer Name</th>
                            <th>Order Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summaryTableData.map((item, index) => (
                            <tr key={index}>
                                
                                <td>{item.customerName}</td>
                                <td>{item.orderCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default OrderSummaryChart;

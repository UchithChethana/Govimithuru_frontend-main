// src/components/PaymentSummary.js

import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import { Card, Row, Col, Table } from 'react-bootstrap';

// Register chart components
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const PaymentSummary = () => {
    const [paymentData, setPaymentData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const response = await axios.get('https://govimithuru-backend.onrender.com/payments'); // Adjust API URL as needed
                setPaymentData(response.data);
                prepareChartData(response.data);
                prepareTableData(response.data);
            } catch (error) {
                console.error("Error fetching payment data:", error);
                setError("Failed to fetch payment data.");
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentData();
    }, []);

    const prepareChartData = (data) => {
        const summary = data.reduce((acc, payment) => {
            acc[payment.customerName] = (acc[payment.customerName] || 0) + payment.totalPrice; // Sum totalPrice by customerName
            return acc;
        }, {});

        const labels = Object.keys(summary);
        const values = Object.values(summary);

        setChartData({
            pie: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Payment Distribution by Customer',
                        data: values,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
                    },
                ],
            },
            bar: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Payments by Customer',
                        data: values,
                        backgroundColor: '#36A2EB',
                    },
                ],
            },
        });
    };

    const prepareTableData = (data) => {
        const formattedTableData = data.map((payment) => ({
            id: payment._id,
            customerName: payment.customerName,
            totalPrice: payment.totalPrice,
        }));

        setTableData(formattedTableData);
    };

    return (
        <Card className="my-4">
            <Card.Body>
                <Card.Title>Payment Summary</Card.Title>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <>
                        <Row>
                            <Col md={6}>
                                <h5>Customer Payment Distribution (Pie Chart)</h5>
                                <div style={{ width: '100%', height: '300px' }}>
                                    {chartData.pie && chartData.pie.labels.length > 0 ? (
                                        <Pie data={chartData.pie} />
                                    ) : (
                                        <p>No data available.</p>
                                    )}
                                </div>
                            </Col>
                            <Col md={6}>
                                <h5>Total Payments by Customer (Bar Chart)</h5>
                                <div style={{ width: '100%', height: '300px' }}>
                                    {chartData.bar && chartData.bar.labels.length > 0 ? (
                                        <Bar data={chartData.bar} />
                                    ) : (
                                        <p>No data available.</p>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <h5 className="mt-4">Payment Summary Table</h5>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Payment ID</th>
                                    <th>Customer Name</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.length > 0 ? (
                                    tableData.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.id}</td>
                                            <td>{row.customerName}</td>
                                            <td>${row.totalPrice.toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default PaymentSummary;

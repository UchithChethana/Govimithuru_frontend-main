// src/components/UserSummary.js

import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import { Card, Row, Col, Table } from 'react-bootstrap';

// Register components
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const UserSummary = () => {
    const [userData, setUserData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://govimithuru-backend.onrender.com/user'); // Adjust API URL as needed
                setUserData(response.data);
                prepareChartData(response.data);
                prepareTableData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const prepareChartData = (data) => {
        const roleSummary = data.reduce((acc, user) => {
            acc[user.role] = (acc[user.role] || 0) + 1; // Assuming each user has a role property
            return acc;
        }, {});

        const labels = Object.keys(roleSummary);
        const values = Object.values(roleSummary);

        setChartData({
            pie: {
                labels: labels,
                datasets: [
                    {
                        label: 'User Distribution by Role',
                        data: values,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
                    },
                ],
            },
            bar: {
                labels: labels,
                datasets: [
                    {
                        label: 'User Count by Role',
                        data: values,
                        backgroundColor: '#36A2EB',
                    },
                ],
            },
        });
    };

    const prepareTableData = (data) => {
        const formattedTableData = data.map((user) => ({
            id: user._id,
            name: `${user.firstname} ${user.lastname}`,
            username: user.username,
            email: user.email,
        }));

        setTableData(formattedTableData);
    };

    return (
        <Card className="my-4">
            <Card.Body>
                <Card.Title>User Summary</Card.Title>
                <Row>
                    <Col md={6}>
                        <h5>Role Distribution (Pie Chart)</h5>
                        <div style={{ width: '100%', height: '300px' }}>
                            {chartData.pie && chartData.pie.labels && chartData.pie.labels.length > 0 ? (
                                <Pie data={chartData.pie} />
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </Col>
                    <Col md={6}>
                        <h5>User Count by Role (Bar Chart)</h5>
                        <div style={{ width: '100%', height: '300px' }}>
                            {chartData.bar && chartData.bar.labels && chartData.bar.labels.length > 0 ? (
                                <Bar data={chartData.bar} />
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </Col>
                </Row>
                <h5 className="mt-4">User Summary Table</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length > 0 ? (
                            tableData.map((row) => (
                                <tr key={row.id}>
                                    
                                    <td>{row.name}</td>
                                    <td>{row.username}</td>
                                    <td>{row.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default UserSummary;

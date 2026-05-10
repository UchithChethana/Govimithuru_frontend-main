import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import { Card, Row, Col, Table } from 'react-bootstrap';

// Register components
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const EmployeeSummary = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [positionChartData, setPositionChartData] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('https://govimithuru-backend.onrender.com/employee/');
                setEmployees(response.data);
                setLoading(false);
                preparePositionChartData(response.data);
                prepareTableData(response.data);
            } catch (err) {
                setError('Failed to fetch employees. Please try again.');
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const preparePositionChartData = (data) => {
        const positionSummary = data.reduce((acc, employee) => {
            acc[employee.position] = (acc[employee.position] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(positionSummary);
        const values = Object.values(positionSummary);

        setPositionChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Employee Distribution by Position',
                    data: values,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
                },
            ],
        });
    };

    const prepareTableData = (data) => {
        const formattedTableData = data.map(employee => ({
            id: employee._id,
            name: `${employee.firstName} ${employee.lastName}`,
            email: employee.email,
            position: employee.position,
            department: employee.department,
            phone: employee.phoneNumber,
            nic: employee.nic,
            drivingNic: employee.drivingNic,
            birthday: employee.birthday ? new Date(employee.birthday).toLocaleDateString() : 'No Birthday',
            profileImage: employee.profileImageBase64 ? `data:image/jpeg;base64,${employee.profileImageBase64}` : 'No Image',
        }));

        setTableData(formattedTableData);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };

    const headerStyle = {
        backgroundColor: '#f8f9fa',
        fontWeight: 'bold',
    };

    const cellStyle = {
        padding: '8px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };

    return (
        <Card className="my-4">
            <Card.Body>
                <Card.Title>Employee Summary</Card.Title>
                {error && <p className="error-message">{error}</p>}
                <Row>
                    <Col md={6}>
                        <h5>Employee Distribution by Position (Pie Chart)</h5>
                        <div style={{ width: '100%', height: '300px' }}>
                            {positionChartData.labels && positionChartData.labels.length > 0 ? (
                                <Pie data={positionChartData} />
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </Col>
                    <Col md={6}>
                        <h5>Employee Count by Position (Bar Chart)</h5>
                        <div style={{ width: '100%', height: '300px' }}>
                            {positionChartData.labels && positionChartData.labels.length > 0 ? (
                                <Bar data={positionChartData} />
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </Col>
                </Row>
                <h5 className="mt-4">Employee Details Table</h5>
                <Table style={tableStyle} striped bordered hover>
                    <thead>
                        <tr style={headerStyle}>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Designation</th>
                            <th>Department</th>
                            <th>Phone</th>
                            <th>NIC</th>
                            <th>Driving NIC</th>
                            <th>Birthday</th>
                            <th>Profile Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length > 0 ? (
                            tableData.map((row, index) => (
                                <tr key={row.id}>
                                    <td style={cellStyle}>{index + 1}</td>
                                    <td style={cellStyle}>{row.name}</td>
                                    <td style={cellStyle}>{row.email}</td>
                                    <td style={cellStyle}>{row.position}</td>
                                    <td style={cellStyle}>{row.department}</td>
                                    <td style={cellStyle}>{row.phone}</td>
                                    <td style={cellStyle}>{row.nic}</td>
                                    <td style={cellStyle}>{row.drivingNic}</td>
                                    <td style={cellStyle}>{row.birthday}</td>
                                    <td style={cellStyle}>
                                        {row.profileImage !== 'No Image' ? (
                                            <img src={row.profileImage} alt="Profile" className="employee-image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                        ) : (
                                            row.profileImage
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center">No employees available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default EmployeeSummary;

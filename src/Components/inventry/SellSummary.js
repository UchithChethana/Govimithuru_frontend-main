import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const SellSummary = () => {
    const [sellSummary, setSellSummary] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://govimithuru-backend.onrender.com/orders/');
                const orders = await response.json();

                // Aggregate sales
                const summary = {};

                orders.forEach(order => {
                    order.productDetails.forEach(product => {
                        if (summary[product.itemName]) {
                            summary[product.itemName].quantitySold += product.quantitySold;
                            summary[product.itemName].totalSales += product.totalPrice;
                        } else {
                            summary[product.itemName] = {
                                quantitySold: product.quantitySold,
                                totalSales: product.totalPrice,
                            };
                        }
                    });
                });

                setSellSummary(Object.entries(summary).map(([itemName, details]) => ({
                    itemName,
                    ...details,
                })));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Data for Pie Chart
    const pieData = {
        labels: sellSummary.map(item => item.itemName),
        datasets: [
            {
                label: 'Sales Distribution',
                data: sellSummary.map(item => item.totalSales),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 2,
            },
        ],
    };

    // Data for Bar Chart
    const barData = {
        labels: sellSummary.map(item => item.itemName),
        datasets: [
            {
                label: 'Quantity Sold',
                data: sellSummary.map(item => item.quantitySold),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h1>Sales Summary</h1>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {sellSummary.map(item => (
                        <tr key={item.itemName}>
                            <td>{item.itemName}</td>
                            <td>{item.quantitySold}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>Sales Distribution Pie Chart</h1>
            <Pie data={pieData} />

            <h1>Quantity Sold Bar Chart</h1>
            <Bar data={barData} />
        </div>
    );
};

export default SellSummary;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PayCashDashboard = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('https://govimithuru-backend.onrender.com/paycash');
                setPayments(response.data.payments);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching payment data:', err);
                setError('Failed to fetch payment data.');
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const handleDeletePayment = async (paymentId) => {
        try {
            await axios.delete(`https://govimithuru-backend.onrender.com/paycash/${paymentId}`);
            setPayments(prevPayments => prevPayments.filter(payment => payment._id !== paymentId));
            toast.success('Payment deleted successfully!');
        } catch (err) {
            console.error('Error deleting payment:', err);
            setError('Failed to delete payment.');
            toast.error('Failed to delete payment.');
        }
    };

    if (loading) {
        return <p>Loading payments...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <ToastContainer />
            <h2>Payment Dashboard</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Order ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Customer Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Customer Address</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Customer Phone</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Amount Paid</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Payment Date</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Signature</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length > 0 ? (
                        payments.map((payment, index) => {
                            const orderId = `P${index + 1}`; // Generate Order ID like P1, P2, P3

                            return (
                                <tr key={payment._id}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{orderId}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{payment.customerName}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{payment.customerAddress}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{payment.customerPhoneNumber}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>${payment.amountPaid.toFixed(2)}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                        {payment.signature ? (
                                            <img src={payment.signature} alt="Signature" style={{ width: '100px', height: 'auto' }} />
                                        ) : 'N/A'}
                                    </td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                        <button onClick={() => handleDeletePayment(payment._id)} style={{ color: 'red', cursor: 'pointer' }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="8" style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>No payments found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PayCashDashboard;

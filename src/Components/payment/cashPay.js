import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SignatureCanvas from 'react-signature-canvas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CashPay = () => {
    const [cashOrders, setCashOrders] = useState([]);
    const [signatureVisible, setSignatureVisible] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const signatureRefs = useRef({});
    const [confirmedOrders, setConfirmedOrders] = useState({});

    useEffect(() => {
        const fetchCashOrders = async () => {
            try {
                const response = await axios.get('https://govimithuru-backend.onrender.com/orders/cash-orders');
                console.log("Cash orders fetched:", response.data);
                setCashOrders(response.data);
            } catch (error) {
                console.error("Error fetching cash orders:", error);
            }
        };

        fetchCashOrders();
    }, []);

    const handleConfirmPayment = async (orderId, totalAmount, customerName, customerAddress, customerPhoneNumber) => {
        const signatureCanvas = signatureRefs.current[orderId];

        if (!signatureCanvas) {
            console.error("Signature canvas not found for order:", orderId);
            return;
        }

        // Get the signature as a data URL
        const signatureDataUrl = signatureCanvas.getTrimmedCanvas().toDataURL("image/png");

        try {
            const paymentResponse = await axios.post('https://govimithuru-backend.onrender.com/paycash/confirm', {
                orderId,
                amountPaid: totalAmount,
                signature: signatureDataUrl,
                customerName,
                customerAddress,
                customerPhoneNumber
            });

            console.log("Payment confirmation response:", paymentResponse.data);
            toast.success('Payment confirmed successfully!');

            // After successful payment, delete the order
            await handleDeleteOrder(orderId);

            setConfirmedOrders(prev => ({ ...prev, [orderId]: true }));
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Failed to confirm payment. Please try again.");
            toast.error('Failed to confirm payment.');
            console.error("Error confirming payment:", error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`https://govimithuru-backend.onrender.com/orders/delete/${orderId}`);
            setCashOrders(prev => prev.filter(order => order._id !== orderId));
            toast.success('Order deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete order.');
            console.error("Error deleting order:", error);
        }
    };

    const toggleSignatureCanvas = (orderId) => {
        setSignatureVisible(prev => ({ ...prev, [orderId]: !prev[orderId] }));
    };

    return (
        <div>
            <ToastContainer />
            <h1 style={{ textAlign: 'center' }}>Cash Orders</h1>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Customer Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sale Date</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Address</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Phone Number</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Items</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Signature</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cashOrders.map(order => {
                        const totalAmount = order.productDetails.reduce((acc, product) => acc + product.totalPrice, 0);

                        return (
                            <tr key={order._id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.customerName}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(order.saleDate).toLocaleDateString()}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.status}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.address}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.email}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.phoneNumber}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <ul style={{ padding: '0', margin: '0' }}>
                                        {order.productDetails.map((product, index) => (
                                            <li key={index}>
                                                {index + 1}. {product.itemName} - Qty: {product.quantitySold} - Price: ${product.itemPrice.toFixed(2)} - Total: ${product.totalPrice.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    {signatureVisible[order._id] && (
                                        <SignatureCanvas
                                            ref={ref => signatureRefs.current[order._id] = ref}
                                            penColor='black'
                                            canvasProps={{
                                                width: 200,
                                                height: 100,
                                                className: 'signatureCanvas'
                                            }}
                                        />
                                    )}
                                    <button onClick={() => toggleSignatureCanvas(order._id)}>
                                        {signatureVisible[order._id] ? 'Hide Signature' : 'Add Signature'}
                                    </button>
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <button
                                        onClick={() => handleConfirmPayment(order._id, totalAmount, order.customerName, order.address, order.phoneNumber)}
                                        disabled={confirmedOrders[order._id]} // Disable button if payment is confirmed
                                    >
                                        {confirmedOrders[order._id] ? 'Payment Confirmed' : 'Confirm Payment'}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CashPay;

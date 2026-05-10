import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import autoTable
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import '../User/css/UserDashboard.css';
import logo from '../ui/img/logo.png';

function PaymentDashboard() {
    const [payments, setPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get("https://govimithuru-backend.onrender.com/payments/");
                setPayments(res.data);
            } catch (err) {
                toast.error("Error fetching payments: " + err.message); // Use toast for errors
            } finally {
                setLoading(false); // Stop loading state
            }
        };

        fetchPayments();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this payment?")) { // Confirmation dialog
            try {
                await axios.delete(`https://govimithuru-backend.onrender.com/payments/${id}`);
                setPayments(payments.filter(payment => payment._id !== id));
                toast.success("Payment deleted successfully"); // Show success toast
            } catch (err) {
                toast.error("Error deleting payment: " + err.message); // Show error toast
            }
        }
    };

    // Function to generate PDF of payments
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Add logo
        doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Adjust size and position as needed

        // Company details
        doc.setFontSize(10);
        doc.text("Govimithu Pvt Limited", 14, 40);
        doc.text("Anuradhapura Kahatagasdigiliya", 14, 45);
        doc.text("Phone Number: 0789840996", 14, 50);
        
        doc.setFontSize(20);
        doc.text("Payment Records", 20, 70); // Adjust Y position after company info
        doc.setFontSize(12);

        // Prepare table headers
        const headers = [
            ["ID", "Customer Name", "Card Name", "Card Type", "Card Number", "Expiration Date", "Total Price", "Pay Date"]
        ];

        // Prepare table data with auto-generated IDs
        const data = payments.map((payment, index) => [
            index + 1, // Auto-generated ID starting from 1
            payment.customerName,
            payment.cardName,
            payment.cardType,
            payment.cardNumber,
            payment.expirationDate,
            `$${payment.totalPrice.toFixed(2)}`,
            new Date(payment.date).toLocaleString() // Format the date and time
        ]);

        // Create the table
        doc.autoTable({
            head: headers,
            body: data,
            startY: 80, // Start below the title
        });

        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFontSize(10);
        doc.text('Generated on: ' + new Date().toLocaleDateString(), 10, pageHeight - 20);
        doc.text('Thank you for using our service!', 10, pageHeight - 15);

        // Save the PDF
        doc.save("PaymentRecords.pdf");
    };

    // Filter payments based on the search term
    const filteredPayments = payments.filter(payment =>
        payment.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Loading payments...</p>; // Loading message
    }

    return (
        <div>
            <ToastContainer /> {/* Include ToastContainer to render toasts */}
            <h2 className="payment-dashboard-title">Payment Dashboard</h2>
            <input
                type="text"
                placeholder="Search by Customer Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Search payments by customer name" // Accessibility
            />
            <button onClick={generatePDF} className="download-pdf-btn">Download PDF</button> {/* Download PDF Button */}
            <table className="payment-table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Card Name</th>
                        <th>Card Type</th>
                        <th>Card Number</th>
                        <th>Expiration Date</th>
                        <th>Total Price</th>
                        <th>Pay Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPayments.length === 0 ? (
                        <tr>
                            <td colSpan="8">No payments found.</td>
                        </tr>
                    ) : (
                        filteredPayments.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment.customerName}</td>
                                <td>{payment.cardName}</td>
                                <td>{payment.cardType}</td>
                                <td>{payment.cardNumber}</td>
                                <td>{payment.expirationDate}</td>
                                <td>Rs: {payment.totalPrice.toFixed(2)}</td>
                                <td>{new Date(payment.date).toLocaleString()}</td> {/* Show both date and time */}
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(payment._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentDashboard;

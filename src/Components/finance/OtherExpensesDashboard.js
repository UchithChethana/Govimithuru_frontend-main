import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autoTable
import { ToastContainer, toast } from 'react-toastify'; // Import Toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import logo from '../ui/img/logo.png';

const OtherExpensesDashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('https://govimithuru-backend.onrender.com/api/otherexpenses/');
                setExpenses(response.data);
            } catch (err) {
                setError('Error fetching expenses: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://govimithuru-backend.onrender.com/api/otherexpenses/${id}`);
            setExpenses(expenses.filter((expense) => expense._id !== id));
            toast.success('Expense deleted successfully!');
        } catch (err) {
            setError('Error deleting expense: ' + err.message);
            toast.error('Error deleting expense: ' + err.message);
        }
    };

    // Function to generate PDF of all expenses
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Add logo
        doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Adjust size and position as needed

        // Company details
        doc.setFontSize(10);
        doc.text("Govimithu Pvt Limited", 14, 40);
        doc.text("Anuradhapura Kahatagasdigiliya", 14, 45);
        doc.text("Phone Number: 0789840996", 14, 50);

        // Title
        doc.setFontSize(20);
        doc.text("Other Expenses Report", 20, 70);
        doc.setFontSize(12);

        // Prepare table data
        const headers = [["Expense Name", "Description", "Amount", "Date", "Category", "Payment Method"]];
        const data = expenses.map(expense => [
            expense.expenseName,
            expense.expenseDescription,
            `$${expense.amount.toFixed(2)}`,
            new Date(expense.date).toLocaleDateString(),
            expense.category,
            expense.paymentMethod
        ]);

        // Create the table
        doc.autoTable({
            head: headers,
            body: data,
            startY: 80, // Start below the title
        });

        // Save the PDF
        doc.save("OtherExpensesReport.pdf");
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <ToastContainer />
            <h2>Other Expenses</h2>
            <button onClick={generatePDF} className="download-pdf-btn">Download PDF</button>
            {expenses.length === 0 ? (
                <p>No expenses available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Expense Name</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Payment Method</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense._id}>
                                <td>{expense.expenseName}</td>
                                <td>{expense.expenseDescription}</td>
                                <td>${expense.amount.toFixed(2)}</td>
                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                <td>{expense.category}</td>
                                <td>{expense.paymentMethod}</td>
                                <td>
                                    <button onClick={() => handleDelete(expense._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OtherExpensesDashboard;

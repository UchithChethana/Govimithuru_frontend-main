import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtherExpensesForm = () => {
    const [expenseName, setExpenseName] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);

    // Predefined categories for expenses
    const categories = [
        'Office Supplies',
        'Utilities',
        'Travel',
        'Food',
        'Rent',
        'Maintenance',
        'Marketing',
        'Salaries',
        'Miscellaneous',
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://govimithuru-backend.onrender.com/api/otherexpenses/create', {
                expenseName,
                expenseDescription,
                amount,
                category,
                paymentMethod,
            });
            toast.success('Expense created successfully!');
            // Clear form
            setExpenseName('');
            setExpenseDescription('');
            setAmount('');
            setCategory('');
            setPaymentMethod('');
        } catch (err) {
            toast.error('Error creating expense: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <h2>Add Other Expense</h2>

                <input
                    type="text"
                    placeholder="Expense Name"
                    value={expenseName}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Allow only letters and spaces
                        if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
                            setExpenseName(value);
                        }
                    }}
                    required
                />

                <input
                    type="text"
                    placeholder="Expense Description"
                    value={expenseDescription}
                    onChange={(e) => setExpenseDescription(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Ensure the amount is a non-negative number
                        if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                            setAmount(value);
                        }
                    }}
                    required
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Check">Check</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default OtherExpensesForm;

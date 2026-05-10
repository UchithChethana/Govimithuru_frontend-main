import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentReceiptForm = () => {
    const [formData, setFormData] = useState({
        receiptNumber: '',
        transactionId: '',
        date: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        billingAddress: '',
        shippingAddress: '',
        items: [
            { itemName: '', itemDescription: '', quantity: 1, pricePerUnit: 0, totalPrice: 0 },
        ],
        subtotal: 0,
        discount: 0,
        taxes: 0,
        shippingCost: 0,
        totalAmount: 0,
        paymentMethod: '',
        paymentStatus: 'Confirmed',
        companyName: '',
        companyAddress: '',
        companyContact: '',
    });

    const [errors, setErrors] = useState({});

    const calculateSubtotal = () => {
        return formData.items.reduce((acc, item) => {
            return acc + (item.quantity * item.pricePerUnit);
        }, 0);
    };

    const calculateTotalAmount = () => {
        const subtotal = calculateSubtotal();
        const discount = Math.min(formData.discount, subtotal);
        const total = subtotal - discount + formData.taxes + formData.shippingCost;
        return total.toFixed(2);
    };

    const validateForm = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/;

        if (!formData.receiptNumber) newErrors.receiptNumber = "Receipt Number is required.";
        if (!formData.transactionId) newErrors.transactionId = "Transaction ID is required.";
        if (!formData.date) newErrors.date = "Date is required.";
        if (!formData.customerName) newErrors.customerName = "Customer Name is required.";
        if (!formData.customerEmail || !emailPattern.test(formData.customerEmail)) {
            newErrors.customerEmail = "Valid Customer Email is required.";
        }
        if (!formData.customerPhone || !phonePattern.test(formData.customerPhone)) {
            newErrors.customerPhone = "Customer Phone must be 10 digits.";
        }
        if (!formData.billingAddress) newErrors.billingAddress = "Billing Address is required.";
        if (!formData.paymentMethod) newErrors.paymentMethod = "Payment Method is required.";
        if (!formData.companyName) newErrors.companyName = "Company Name is required.";
        if (!formData.companyAddress) newErrors.companyAddress = "Company Address is required.";
        if (!formData.companyContact) newErrors.companyContact = "Company Contact is required.";
        if (formData.items.length === 0) newErrors.items = "At least one item is required.";

        formData.items.forEach((item, index) => {
            if (!item.itemName) newErrors[`itemName${index}`] = `Item Name is required for item ${index + 1}.`;
            if (item.quantity < 1 || item.quantity > 1000) {
                newErrors[`quantity${index}`] = `Quantity must be between 1 and 1000 for item ${index + 1}.`;
            }
            if (item.pricePerUnit < 0) newErrors[`pricePerUnit${index}`] = `Price per Unit must be a non-negative number for item ${index + 1}.`;
        });

        if (formData.discount < 0) newErrors.discount = "Discount must be a non-negative number.";
        if (formData.taxes < 0) newErrors.taxes = "Taxes must be a non-negative number.";
        if (formData.shippingCost < 0 || formData.shippingCost > 100000) {
            newErrors.shippingCost = "Shipping Cost must be between 0 and 100000.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (['discount', 'taxes', 'shippingCost'].includes(name)) {
            const updatedTotalAmount = calculateTotalAmount();
            setFormData((prevData) => ({
                ...prevData,
                totalAmount: updatedTotalAmount,
            }));
        }
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...formData.items];
        updatedItems[index][name] = value;

        if (name === "quantity" || name === "pricePerUnit") {
            const quantity = Math.max(1, Math.min(1000, Number(updatedItems[index].quantity)));
            const pricePerUnit = Math.max(0, Number(updatedItems[index].pricePerUnit));
            updatedItems[index].quantity = quantity;
            updatedItems[index].totalPrice = quantity * pricePerUnit;
        }

        setFormData((prevData) => ({
            ...prevData,
            items: updatedItems,
            subtotal: calculateSubtotal(),
            totalAmount: calculateTotalAmount(),
        }));
    };

    const handleAddItem = () => {
        setFormData((prevData) => ({
            ...prevData,
            items: [...prevData.items, { itemName: '', itemDescription: '', quantity: 1, pricePerUnit: 0, totalPrice: 0 }],
        }));
    };

    const handleRemoveItem = (index) => {
        const updatedItems = formData.items.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            items: updatedItems,
            subtotal: calculateSubtotal(),
            totalAmount: calculateTotalAmount(),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('https://govimithuru-backend.onrender.com/api/givechecks/create', formData);
            toast.success(`Receipt created: ${response.data.data.receiptNumber}`);
            // Reset form or handle success
        } catch (error) {
            console.error('Error creating receipt:', error);
            toast.error('Error creating receipt: ' + (error.response?.data.message || error.message));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Create Payment Receipt</h2>

                {/* Basic Information */}
                <label>
                    Receipt Number:
                    <input type="text" name="receiptNumber" placeholder="Receipt Number" onChange={handleInputChange} required />
                    {errors.receiptNumber && <span className="error">{errors.receiptNumber}</span>}
                </label>
                <label>
                    Transaction ID:
                    <input type="number" name="transactionId" placeholder="Transaction ID" onChange={handleInputChange} required />
                    {errors.transactionId && <span className="error">{errors.transactionId}</span>}
                </label>
                <label>
                    Date:
                    <input type="date" name="date" onChange={handleInputChange} required />
                    {errors.date && <span className="error">{errors.date}</span>}
                </label>
                <label>
                    Customer Name:
                    <input
                        type="text"
                        name="customerName"
                        placeholder="Customer Name"
                        onChange={handleInputChange}
                        onKeyPress={(e) => {
                            // Allow only letters (a-z and A-Z)
                            if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        required
                    />
                    {errors.customerName && <span className="error">{errors.customerName}</span>}
                </label>
                <label>
                    Customer Email:
                    <input
                        type="email"
                        name="customerEmail"
                        placeholder="Customer Email"
                        value={formData.customerEmail}
                        onChange={(e) => {
                            const value = e.target.value;
                            handleInputChange(e);

                            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailPattern.test(value) && value !== "") {
                                setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    customerEmail: "Invalid email format",
                                }));
                            } else {
                                setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    customerEmail: "",
                                }));
                            }
                        }}
                        required
                    />
                    {errors.customerEmail && <span className="error">{errors.customerEmail}</span>}
                </label>
                <label>
                    Customer Phone:
                    <input
                        type="text"
                        name="customerPhone"
                        placeholder="Customer Phone"
                        maxLength={10}
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                                handleInputChange(e);
                            }
                        }}
                        required
                    />
                    {errors.customerPhone && <span className="error">{errors.customerPhone}</span>}
                </label>
                <label>
                    Billing Address:
                    <input type="text" name="billingAddress" placeholder="Billing Address" onChange={handleInputChange} required />
                    {errors.billingAddress && <span className="error">{errors.billingAddress}</span>}
                </label>
                <label>
                    Shipping Address:
                    <input type="text" name="shippingAddress" placeholder="Shipping Address" onChange={handleInputChange} />
                </label>

                {/* Items Section */}
                <h3>Items</h3>
                {formData.items.map((item, index) => (
                    <div key={index}>
                        <label>
                            Item Name:
                            <input type="text" name="itemName" placeholder="Item Name" value={item.itemName} onChange={(e) => handleItemChange(index, e)} required />
                            {errors[`itemName${index}`] && <span className="error">{errors[`itemName${index}`]}</span>}
                        </label>
                        <label>
                            Description:
                            <input type="text" name="itemDescription" placeholder="Description" value={item.itemDescription} onChange={(e) => handleItemChange(index, e)} />
                        </label>
                        <label>
                            Quantity:
                            <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} min="1" />
                            {errors[`quantity${index}`] && <span className="error">{errors[`quantity${index}`]}</span>}
                        </label>
                        <label>
                            Price per Unit:
                            <input type="number" name="pricePerUnit" value={item.pricePerUnit} onChange={(e) => handleItemChange(index, e)} min="0" />
                            {errors[`pricePerUnit${index}`] && <span className="error">{errors[`pricePerUnit${index}`]}</span>}
                        </label>
                        <label>
                            Total Price: {item.totalPrice.toFixed(2)}
                        </label>
                        <button type="button" onClick={() => handleRemoveItem(index)}>Remove Item</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddItem}>Add Item</button>

                {/* Totals Section */}
                <h3>Totals</h3>
                <label>
                    Subtotal: {formData.subtotal.toFixed(2)}
                </label>
                <label>
                    Discount:
                    <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} min="0" />
                    {errors.discount && <span className="error">{errors.discount}</span>}
                </label>
                
                <label>
                    Total Amount: {calculateTotalAmount()}
                </label>

                {/* Payment Method */}
                <label>
    Payment Method:
    <select name="paymentMethod" onChange={handleInputChange} required>
        <option value="">Select Payment Method</option>
        <option value="Cash">Cash</option>
        <option value="Check">Check</option>
    </select>
    {errors.paymentMethod && <span className="error">{errors.paymentMethod}</span>}
</label>


                {/* Company Information */}
                <h3>Company Information</h3>
                <label>
    Company Name:
    <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        onChange={handleInputChange}
        onKeyPress={(e) => {
            // Allow only letters and spaces
            if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                e.preventDefault();
            }
        }}
        required
    />
    {errors.companyName && <span className="error">{errors.companyName}</span>}
</label>

<label>
    Company Address:
    <input
        type="text"
        name="companyAddress"
        placeholder="Company Address"
        onChange={handleInputChange}
        required
    />
    {errors.companyAddress && <span className="error">{errors.companyAddress}</span>}
</label>

<label>
    Company Contact:
    <input
        type="text"
        name="companyContact"
        placeholder="Company Contact"
        maxLength={10} // Restrict to 10 digits
        onKeyPress={(e) => {
            // Allow only digits
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        }}
        onChange={(e) => {
            const value = e.target.value;
            // Ensure only numeric input and restrict to 10 digits
            if (/^\d{0,10}$/.test(value)) {
                handleInputChange(e);
            }
        }}
        required
    />
    {errors.companyContact && <span className="error">{errors.companyContact}</span>}
</label>


                <button type="submit">Create Receipt</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default PaymentReceiptForm;

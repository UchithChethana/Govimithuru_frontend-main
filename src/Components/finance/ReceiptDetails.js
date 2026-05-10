import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Ensure you import this for the table
import logo from '../ui/img/logo.png';

const ReceiptDetails = ({ receipt, onClose }) => {
    const downloadPDF = () => {
        const doc = new jsPDF();
    
        // Header
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Govimithu Pvt Limited", 105, 20, { align: "center" });
        doc.setFontSize(12);
        doc.text("Anuradhapura Kahatagasdigiliya", 105, 30, { align: "center" });
        doc.text("Phone Number: 0789840996", 105, 35, { align: "center" });
    
        doc.setDrawColor(0);
        doc.line(10, 40, 200, 40); // Horizontal line
    
        // Watermark
        doc.setFontSize(40);
        doc.setTextColor(150, 150, 150);
        doc.text('Govimithuru.lk', 105, 150, { angle: 45, align: "center" });
        doc.setTextColor(0, 0, 0); // Reset color for other text
    
        // Receipt details
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text('Receipt Details', 20, 60);
        doc.setFont("helvetica", "normal");
    
        const details = [
            `Receipt Number: ${receipt.receiptNumber}`,
            `Transaction ID: ${receipt.transactionId}`,
            `Date: ${new Date(receipt.date).toLocaleDateString()}`,
            `Customer Name: ${receipt.customerName}`,
            `Email: ${receipt.customerEmail}`,
            `Phone: ${receipt.customerPhone}`,
        ];
    
        details.forEach((line, index) => {
            doc.text(line, 20, 70 + (index * 10));
        });
    
        // Billing Address Section
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Billing Address:", 20, 140);
        doc.setFont("helvetica", "normal");
    
        const billingLines = receipt.billingAddress.split(',');
        billingLines.forEach((line, index) => {
            doc.text(line.trim(), 20, 150 + (index * 10));
        });
    
        const addressY = 140;
        const addressHeight = 10 * (billingLines.length + 1);
        doc.rect(15, addressY - 5, 180, addressHeight);
    
        // Shipping Address Section
        if (receipt.shippingAddress) {
            doc.setFont("helvetica", "bold");
            doc.text("Shipping Address:", 20, 150 + addressHeight + 10);
            doc.setFont("helvetica", "normal");
            doc.text(receipt.shippingAddress, 20, 160 + addressHeight + 10);
        }
    
        // Items header
        doc.setFont("helvetica", "bold");
        doc.text('Items', 20, 180 + addressHeight + (receipt.shippingAddress ? 20 : 0));
        doc.setFont("helvetica", "normal");
    
        const items = receipt.items.map(item => [
            item.itemName,
            item.itemDescription,
            item.quantity,
            `$${item.pricePerUnit.toFixed(2)}`,
            `$${item.totalPrice.toFixed(2)}`,
        ]);
    
        // Start autoTable for items
        const headers = [["Item Name", "Description", "Quantity", "Price per Unit", "Total Price"]];
        let startY = 190 + addressHeight + (receipt.shippingAddress ? 20 : 0);
    
        // Check if items fit on the current page
        if (doc.autoTable.previous.finalY && startY + items.length * 10 > doc.internal.pageSize.height - 80) {
            doc.addPage(); // Add a new page if items overflow
            startY = 20; // Reset Y position for the new page
        }
    
        doc.autoTable({
            head: headers,
            body: items,
            startY: startY,
            theme: 'grid',
            styles: { cellPadding: 2 },
        });
    
        // Summary details
        const summaryY = doc.autoTable.previous.finalY + 10;
        doc.setFont("helvetica", "bold");
        const summaries = [
            `Subtotal: $${receipt.subtotal.toFixed(2)}`,
            `Discount: $${receipt.discount.toFixed(2)}`,
            `Taxes: $${receipt.taxes.toFixed(2)}`,
            `Shipping Cost: $${receipt.shippingCost.toFixed(2)}`,
            `Total Amount: $${receipt.totalAmount.toFixed(2)}`,
            `Payment Method: ${receipt.paymentMethod}`,
            `Payment Status: ${receipt.paymentStatus}`,
            `Company Name: ${receipt.companyName}`,
            `Company Address: ${receipt.companyAddress}`,
            `Company Contact: ${receipt.companyContact}`
        ];
    
        summaries.forEach((line, index) => {
            doc.text(line, 20, summaryY + (index * 10));
        });
    
        // Signature line
        const signatureY = summaryY + 100;
        doc.setLineDash([2, 2], 0);
        doc.line(20, signatureY + 10, 190, signatureY + 10);
        doc.setLineDash([]); // Reset to solid line for text
        doc.text(`Signature: ______________________`, 20, signatureY);
    
        // Date
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, signatureY);
    
        // Footer
        const footerY = signatureY + 30;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Thank you for your business!", 105, footerY, { align: "center" });
    
        // Save PDF
        doc.save(`receipt_${receipt.receiptNumber}.pdf`);
    };
    
    
    
    
    
    

    return (
        <div className="receipt-details">
            <h3>Receipt Details</h3>
            <p><strong>Receipt Number:</strong> {receipt.receiptNumber}</p>
            <p><strong>Transaction ID:</strong> {receipt.transactionId}</p>
            <p><strong>Date:</strong> {new Date(receipt.date).toLocaleDateString()}</p>
            <p><strong>Customer Name:</strong> {receipt.customerName}</p>
            <p><strong>Email:</strong> {receipt.customerEmail}</p>
            <p><strong>Phone:</strong> {receipt.customerPhone}</p>
            <p><strong>Billing Address:</strong> {receipt.billingAddress}</p>
            {receipt.shippingAddress && (
                <p><strong>Shipping Address:</strong> {receipt.shippingAddress}</p>
            )}
            <h4>Items</h4>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price per Unit</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {receipt.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.itemName}</td>
                            <td>{item.itemDescription}</td>
                            <td>{item.quantity}</td>
                            <td>${item.pricePerUnit.toFixed(2)}</td>
                            <td>${item.totalPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p><strong>Subtotal:</strong> ${receipt.subtotal.toFixed(2)}</p>
            <p><strong>Discount:</strong> ${receipt.discount.toFixed(2)}</p>
            <p><strong>Taxes:</strong> ${receipt.taxes.toFixed(2)}</p>
            <p><strong>Shipping Cost:</strong> ${receipt.shippingCost.toFixed(2)}</p>
            <p><strong>Total Amount:</strong> ${receipt.totalAmount.toFixed(2)}</p>
            <p><strong>Payment Method:</strong> {receipt.paymentMethod}</p>
            <p><strong>Payment Status:</strong> {receipt.paymentStatus}</p>
            <p><strong>Company Name:</strong> {receipt.companyName}</p>
            <p><strong>Company Address:</strong> {receipt.companyAddress}</p>
            <p><strong>Company Contact:</strong> {receipt.companyContact}</p>
            <button onClick={onClose}>Close</button>
            <button onClick={downloadPDF}>Download PDF</button>
        </div>
    );
};

export default ReceiptDetails;

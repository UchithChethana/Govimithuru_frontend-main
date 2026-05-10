import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf"; 
import autoTable from "jspdf-autotable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SalaryDashboard.css'; 
import logo from '../ui/img/logo.png';

function SalaryDashboard() {
  const [salaries, setSalaries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch salary records
    axios.get('https://govimithuru-backend.onrender.com/salary')
      .then(response => {
        setSalaries(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch salaries');
        setLoading(false);
      });
  }, []);

  // Function to generate PDF for a specific salary record
  const generatePDF = (salary) => {
    const doc = new jsPDF();

    // Add logo
    doc.addImage(logo, 'PNG', 10, 10, 50, 20);
    
    // Company details
    doc.setFontSize(10);
    doc.text("Govimithu Pvt Limited", 14, 40);
    doc.text("Anuradhapura Kahatagasdigiliya", 14, 45);
    doc.text("Phone Number: 0789840996", 14, 50);
    
    // Title
    doc.setFontSize(20);
    doc.text("Salary Paysheet", 20, 70);
    doc.setFontSize(12);
    
    // Employee details
    doc.text(`Name: ${salary.name}`, 20, 90);
    doc.text(`Position: ${salary.position}`, 20, 100);
    doc.text(`Payday: ${new Date(salary.payday).toLocaleDateString()}`, 20, 110);
    
    // Create table for salary details
    const columns = [
        { header: 'Description', dataKey: 'description' },
        { header: 'Amount (Rs)', dataKey: 'amount' },
    ];

    const rows = [
        { description: 'Basic Salary', amount: salary.basicSalary.toFixed(2) },
        { description: 'Bonus', amount: salary.bonus.toFixed(2) },
        { description: 'ETF', amount: salary.ETF.toFixed(2) },
        { description: 'Total Salary', amount: salary.totalSalary.toFixed(2) },
    ];

    // Add the table to the PDF
    autoTable(doc, {
        head: [columns.map(col => col.header)],
        body: rows.map(row => columns.map(col => row[col.dataKey])),
        startY: 130,
        styles: {
            fillColor: [240, 240, 240],
            cellPadding: 3,
            fontSize: 10,
            textColor: [0, 0, 0],
            overflow: 'linebreak',
        },
        headStyles: {
            fillColor: [0, 102, 204],
            textColor: [255, 255, 255],
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255],
        },
    });

    // Signature section
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(12);
    doc.text('Signature: ____________________', 20, pageHeight - 40);
    doc.text('Date: _______________________', 150, pageHeight - 40);

    // Footer
    doc.setFontSize(10);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 10, pageHeight - 20);
    doc.text('Thank you for your service!', 10, pageHeight - 15);

    // Save the PDF
    doc.save(`Paysheet_${salary._id}.pdf`);
  };

  const handleDelete = (id) => {
    // Ask for confirmation using toast
    toast.info("Are you sure you want to delete this salary record?", {
      autoClose: false,
      closeOnClick: true,
      onClose: () => {
        // Handle deletion on confirmation
        axios.delete(`https://govimithuru-backend.onrender.com/salary/delete/${id}`)
          .then(() => {
            toast.success('Salary record deleted successfully');
            setSalaries(salaries.filter(salary => salary._id !== id)); // Update local state
          })
          .catch(err => {
            setError('Failed to delete salary record');
            toast.error('Failed to delete salary record');
          });
      }
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="salary-dashboard">
      <ToastContainer />
      <h2>Salary Dashboard</h2>
      {error && <p className="error-message">{error}</p>}
      {salaries.length === 0 ? (
        <p>No salary records found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Basic Salary</th>
              <th>Bonus</th>
              <th>ETF</th>
              <th>Total Salary</th>
              <th>Payday</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map(salary => (
              <tr key={salary._id}>
                <td>{salary.name}</td>
                <td>{salary.position}</td>
                <td>Rs: {salary.basicSalary.toFixed(2)}</td>
                <td>Rs: {salary.bonus.toFixed(2)}</td>
                <td>Rs: {salary.ETF.toFixed(2)}</td>
                <td>Rs: {salary.totalSalary.toFixed(2)}</td>
                <td>{new Date(salary.payday).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => generatePDF(salary)}>Download PDF</button>
                  <button onClick={() => handleDelete(salary._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SalaryDashboard;

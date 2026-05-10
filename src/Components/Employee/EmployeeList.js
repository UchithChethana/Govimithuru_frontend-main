import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Employeecss/emplist.css';
import logo from '../ui/img/logo.png';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        department: '',
        phoneNumber: '',
        nic: '',
        drivingNic: '',
        birthday: '',
        profileImageBase64: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://govimithuru-backend.onrender.com/employee/')
            .then((res) => {
                setEmployees(res.data);
                setFilteredEmployees(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch employees. Please try again.');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = employees.filter(emp => {
            return (emp.firstName && emp.firstName.toLowerCase().includes(lowercasedQuery)) ||
                   (emp.lastName && emp.lastName.toLowerCase().includes(lowercasedQuery)) ||
                   (emp.email && emp.email.toLowerCase().includes(lowercasedQuery)) ||
                   (emp.position && emp.position.toLowerCase().includes(lowercasedQuery)) ||
                   (emp.department && emp.department.toLowerCase().includes(lowercasedQuery)) ||
                   (emp.phoneNumber && emp.phoneNumber.toLowerCase().includes(lowercasedQuery)) ||
                   (emp.nic && emp.nic.toLowerCase().includes(lowercasedQuery)) ||
                   (emp.drivingNic && emp.drivingNic.toLowerCase().includes(lowercasedQuery));
        });
        setFilteredEmployees(filtered);
    }, [searchQuery, employees]);

    const handleView = (id) => {
        navigate(`/employee/view/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            axios.delete(`https://govimithuru-backend.onrender.com/employee/delete/${id}`)
                .then(() => {
                    setEmployees(employees.filter(emp => emp._id !== id));
                    setFilteredEmployees(filteredEmployees.filter(emp => emp._id !== id));
                    toast.success('Employee Deleted');
                })
                .catch((err) => {
                    setError('Failed to delete employee. Please try again.');
                    toast.error('Failed to delete employee. Please try again.');
                });
        }
    };

    const handleAddNew = () => {
        navigate('/admin/employee/EmployeeForm');
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setFormData({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            position: employee.position,
            department: employee.department,
            phoneNumber: employee.phoneNumber,
            nic: employee.nic,
            drivingNic: employee.drivingNic,
            birthday: employee.birthday || '',
            profileImageBase64: employee.profileImageBase64 || ''
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://govimithuru-backend.onrender.com/employee/update/${selectedEmployee._id}`, formData);
            setEmployees(employees.map(emp => (emp._id === selectedEmployee._id ? { ...emp, ...formData } : emp)));
            setFilteredEmployees(filteredEmployees.map(emp => (emp._id === selectedEmployee._id ? { ...emp, ...formData } : emp)));
            setSelectedEmployee(null);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                position: '',
                department: '',
                phoneNumber: '',
                nic: '',
                drivingNic: '',
                birthday: '',
                profileImageBase64: ''
            });
            toast.success("Employee updated successfully");
        } catch (err) {
            toast.error("Failed to update employee: " + err.message);
        }
    };

    const generatePDF = (employee) => {
        const doc = new jsPDF();
        doc.addImage(logo, 'PNG', 10, 10, 50, 20); 
        doc.setFontSize(12);
        doc.text("Govimithu Pvt Limited", 10, 40);
        doc.text("Anuradhapura Kahatagasdigiliya", 10, 45);
        doc.text("Phone Number: 0789840996", 10, 50);
        doc.setFontSize(20);
        doc.text("Employee Details", 10, 70);
        doc.setFontSize(12);
        doc.text(`Employee ID: ${employee._id}`, 10, 90);
        doc.text(`First Name: ${employee.firstName}`, 10, 100);
        doc.text(`Last Name: ${employee.lastName}`, 10, 110);
        doc.text(`Email: ${employee.email}`, 10, 120);
        doc.text(`Position: ${employee.position}`, 10, 130);
        doc.text(`Department: ${employee.department}`, 10, 140);
        doc.text(`Phone Number: ${employee.phoneNumber}`, 10, 150);
        doc.text(`NIC: ${employee.nic}`, 10, 160);
        doc.text(`Driving NIC: ${employee.drivingNic}`, 10, 170);
        doc.text(`Birthday: ${employee.birthday ? new Date(employee.birthday).toLocaleDateString() : 'No Birthday'}`, 10, 180);
        if (employee.profileImageBase64) {
            const imgData = `data:image/jpeg;base64,${employee.profileImageBase64}`;
            doc.addImage(imgData, 'JPEG', 10, 190, 50, 50);
        }

        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFontSize(10);
        doc.text('Generated on: ' + new Date().toLocaleDateString(), 10, pageHeight - 20);
        doc.text('Thank you for using our service!', 10, pageHeight - 15);

        doc.save(`Employee_${employee._id}.pdf`);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="employee-list-container">
            <ToastContainer />
            <h2 className="employee-list-title">Employee List</h2>
            {error && <p className="error-message">{error}</p>}

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th>Department</th>
                        <th>Phone Number</th>
                        <th>NIC</th>
                        <th>Driving NIC</th>
                        <th>Birthday</th>
                        <th>Profile Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee, index) => (
                            <tr key={employee._id}>
                                <td>{index + 1}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.position}</td>
                                <td>{employee.department}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.nic}</td>
                                <td>{employee.drivingNic}</td>
                                <td>{employee.birthday ? new Date(employee.birthday).toLocaleDateString() : 'No Birthday'}</td>
                                <td>{employee.profileImageBase64 ? <img src={`data:image/jpeg;base64,${employee.profileImageBase64}`} alt={`${employee.firstName} ${employee.lastName}`} className="employee-image" /> : 'No Image'}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(employee._id)}>Delete</button>
                                    <button className="pdf-btn" onClick={() => generatePDF(employee)}>PDF</button>
                                    <button className="edit-btn" onClick={() => handleEdit(employee)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12">No employees available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedEmployee && (
                <form onSubmit={handleUpdate} className="edit-employee-form">
                    <h3>Edit Employee</h3>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Position"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="NIC"
                        value={formData.nic}
                        onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Driving NIC"
                        value={formData.drivingNic}
                        onChange={(e) => setFormData({ ...formData, drivingNic: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Birthday"
                        value={formData.birthday}
                        onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onload = () => {
                                setFormData({ ...formData, profileImageBase64: reader.result.split(',')[1] });
                            };
                            reader.readAsDataURL(file);
                        }}
                    />
                    <button type="submit">Update Employee</button>
                </form>
            )}
        </div>
    );
}

export default EmployeeList;

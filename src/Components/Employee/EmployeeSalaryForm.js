import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Employeecss/EmployeeSalaryForm.css';

function EmployeeSalaryForm() {
  const [employeeId, setEmployeeId] = useState('');
  const [bonus, setBonus] = useState('');
  const [ETF, setETF] = useState(0); // Initialize ETF as a number
  const [payday, setPayday] = useState('');
  const [perDayPay, setPerDayPay] = useState('');
  const [workingDays, setWorkingDays] = useState('');
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch employee list to choose from
    axios.get('https://govimithuru-backend.onrender.com/employee')
      .then(response => setEmployees(response.data))
      .catch(err => setError('Failed to fetch employees'));
  }, []);

  // Calculate basic salary based on per day pay and working days
  const calculateBasicSalary = () => {
    return parseFloat(perDayPay) * parseFloat(workingDays);
  };

  // Calculate total salary including basic salary, bonus, and ETF
  const calculateTotalSalary = () => {
    const basicSalary = calculateBasicSalary();
    const totalBonus = parseFloat(bonus);
    const totalETF = parseFloat(ETF);
    return basicSalary + totalBonus + totalETF;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalSalary = calculateTotalSalary();
    const basicSalary = calculateBasicSalary();

    axios.post('https://govimithuru-backend.onrender.com/salary/add', {
      employeeId,
      basicSalary,
      bonus: parseFloat(bonus),
      ETF: parseFloat(ETF),
      payday,
      totalSalary // Send total salary to the backend
    })
      .then(() => {
        toast.success('Salary added successfully!');
        // Clear form
        setEmployeeId('');
        setBonus('');
        setETF(0);
        setPayday('');
        setPerDayPay('');
        setWorkingDays('');
      })
      .catch(err => {
        setError('Failed to add salary');
        toast.error('Failed to add salary');
      });
  };

  return (
    <div>
      <ToastContainer />
      <h2>Add Employee Salary</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee</label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.firstName} {emp.lastName} - {emp.position}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Bonus</label>
          <input
            type="number"
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
          />
        </div>
        <div>
          <label>ETF (%)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={ETF}
            onChange={(e) => setETF(e.target.value)}
          />
          <span>{ETF}%</span> {/* Display current ETF percentage */}
        </div>
        <div>
          <label>Working Days</label>
          <input
            type="number"
            value={workingDays}
            onChange={(e) => setWorkingDays(e.target.value)}
          />
        </div>
        <div>
          <label>Per Day Pay</label>
          <input
            type="number"
            value={perDayPay}
            onChange={(e) => setPerDayPay(e.target.value)}
          />
        </div>
        <div>
          <label>Payday</label>
          <input
            type="date"
            value={payday}
            onChange={(e) => setPayday(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Salary</button>
      </form>
    </div>
  );
}

export default EmployeeSalaryForm;

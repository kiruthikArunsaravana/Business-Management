import React, { useState, useEffect } from 'react';
import axios from '../../api/api';
import "./CoconutSellingPage.css";

const CoconutSellingPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [kg, setKg] = useState('');
  const [rate, setRate] = useState('');
  const [wages, setWages] = useState('');
  const [records, setRecords] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers();
    fetchRecords();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get('/customers');
    setCustomers(res.data);
  };

  const fetchRecords = async () => {
    const res = await axios.get('/coconut/selling');
    setRecords(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !date || !kg || !rate) {
      setError("Fill all required fields");
      return;
    }

    await axios.post('/coconut/selling', {
      customerName,
      date,
      kg: parseFloat(kg),
      ratePerKg: parseFloat(rate),
      wages: parseFloat(wages || 0)
    });

    clearFields();
    fetchRecords();
  };

  const clearFields = () => {
    setCustomerName('');
    setDate('');
    setKg('');
    setRate('');
    setWages('');
    setError('');
  };

  return (
    <div className="selling-container">
      <h2>Coconut Selling</h2>
      {error && <div className="selling-error">{error}</div>}

      <form onSubmit={handleSubmit} className="selling-form">
        <select value={customerName} onChange={(e) => setCustomerName(e.target.value)}>
          <option value="">Select Customer</option>
          {customers.map((c, idx) => (
            <option key={idx} value={c.name}>{c.name}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="number" placeholder="KG" value={kg} onChange={(e) => setKg(e.target.value)} />
        <input type="number" step="0.01" placeholder="Rate per KG" value={rate} onChange={(e) => setRate(e.target.value)} />
        <input type="number" step="0.01" placeholder="Wages" value={wages} onChange={(e) => setWages(e.target.value)} />
        <button type="submit">Save</button>
      </form>

      <table className="selling-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>KG</th>
            <th>Rate</th>
            <th>Wages</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <tr key={idx}>
              <td>{r.customerName}</td>
              <td>{r.date}</td>
              <td>{r.kg}</td>
              <td>{r.ratePerKg}</td>
              <td>{r.wages}</td>
              <td>{r.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoconutSellingPage;

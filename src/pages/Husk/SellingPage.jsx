import React, { useState, useEffect } from 'react';
import axios from '../../api/api';
import "./HuskSellingPage.css";

const HuskSellingPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [loadCount, setLoadCount] = useState('');
  const [ratePerLoad, setRatePerLoad] = useState('');
  const [wages, setWages] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [customers, setCustomers] = useState([]);
  const [records, setRecords] = useState([]);
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
    const res = await axios.get('/husk/selling');
    setRecords(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !date || !loadCount || !ratePerLoad) {
      setError("Please fill all fields");
      return;
    }

    const payload = {
      customerName,
      date,
      loadCount: parseInt(loadCount),
      ratePerLoad: parseFloat(ratePerLoad),
      wages: parseFloat(wages) || 0
    };

    const total = (payload.loadCount * payload.ratePerLoad) - payload.wages;
    setTotalAmount(total);

    await axios.post('/husk/selling', payload);

    clearForm();
    fetchRecords();
  };

  const clearForm = () => {
    setCustomerName('');
    setDate('');
    setLoadCount('');
    setRatePerLoad('');
    setWages('');
    setTotalAmount('');
    setError('');
  };

  return (
    <div className="husk-container">
      <h2>Husk Selling</h2>
      {error && <div className="husk-error">{error}</div>}

      <form className="husk-form" onSubmit={handleSubmit}>
        <select value={customerName} onChange={(e) => setCustomerName(e.target.value)}>
          <option value="">Select Customer</option>
          {customers.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="number" placeholder="Load Count" value={loadCount} onChange={(e) => setLoadCount(e.target.value)} />
        <input type="number" step="0.01" placeholder="Rate Per Load" value={ratePerLoad} onChange={(e) => setRatePerLoad(e.target.value)} />
        <input type="number" step="0.01" placeholder="Wages" value={wages} onChange={(e) => setWages(e.target.value)} />
        <button type="submit">Save</button>
      </form>

      {totalAmount !== '' && (
        <div className="husk-total">
          Total Amount: ₹{totalAmount.toFixed(2)}
        </div>
      )}

      <table className="husk-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Loads</th>
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
              <td>{r.loadCount}</td>
              <td>{r.ratePerLoad}</td>
              <td>{r.wages}</td>
              <td>{r.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HuskSellingPage;

import React, { useState, useEffect } from 'react';
import axios from '../../api/api';
import "./BuyingPage.css";

const BuyingPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [count, setCount] = useState('');
  const [rate, setRate] = useState('');
  const [wages, setWages] = useState('');
  const [loadingWages, setLoadingWages] = useState('');
  const [total, setTotal] = useState('');
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
    const res = await axios.get('/coconut/buying');
    setRecords(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !date || !count || !rate) {
      setError("Fill all required fields");
      return;
    }

    const c = parseInt(count) || 0;
    const r = parseFloat(rate) || 0;
    const w = parseFloat(wages) || 0;
    const lw = parseFloat(loadingWages) || 0;
    const totalAmount = (c * r) - (w + lw);
    setTotal(totalAmount);

    await axios.post('/coconut/buying', {
      customerName,
      date,
      coconutCount: c,
      ratePerCoconut: r,
      wages: w,
      loadingWages: lw
    });

    clearFields();
    fetchRecords();
  };

  const clearFields = () => {
    setCustomerName('');
    setDate('');
    setCount('');
    setRate('');
    setWages('');
    setLoadingWages('');
    setTotal('');
    setError('');
  };

  return (
    <div className="buying-container">
      <h2>Coconut Buying</h2>
      {error && <div className="buying-error">{error}</div>}

      <form onSubmit={handleSubmit} className="buying-form">
        <select
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((c, idx) => (
            <option key={idx} value={c.name}>{c.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Count of Coconut"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="Rate per Coconut"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="Wages"
          value={wages}
          onChange={(e) => setWages(e.target.value)}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Loading Wages"
          value={loadingWages}
          onChange={(e) => setLoadingWages(e.target.value)}
        />

        <button type="submit">
          Save
        </button>
      </form>

      {total !== '' && (
        <div className="buying-total">
          Total Amount: ₹{total.toFixed(2)}
        </div>
      )}

      <table className="buying-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Count</th>
            <th>Rate</th>
            <th>Wages</th>
            <th>Loading Wages</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <tr key={idx}>
              <td>{r.customerName}</td>
              <td>{r.date}</td>
              <td>{r.coconutCount}</td>
              <td>{r.ratePerCoconut}</td>
              <td>{r.wages}</td>
              <td>{r.loadingWages}</td>
              <td>{r.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuyingPage;

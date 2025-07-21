import React, { useState, useEffect } from 'react';
import axios from '../../api/api';
import "./ShellSellingPage.css";

const ShellSellingPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [kg, setKg] = useState('');
  const [rate, setRate] = useState('');
  const [records, setRecords] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState('');

  useEffect(() => {
    fetchCustomers();
    fetchRecords();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get('/customers');
    setCustomers(res.data);
  };

  const fetchRecords = async () => {
    const res = await axios.get('/shell/selling');
    setRecords(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const t = (parseFloat(kg) || 0) * (parseFloat(rate) || 0);
    setTotal(t);

    await axios.post('/shell/selling', {
      customerName,
      date,
      kg: parseFloat(kg),
      ratePerKg: parseFloat(rate),
      totalAmount: t
    });

    setCustomerName('');
    setDate('');
    setKg('');
    setRate('');
    setTotal('');
    fetchRecords();
  };

  return (
    <div className="shell-container">
      <h2>Shell Selling</h2>
      <form className="shell-form" onSubmit={handleSubmit}>
        <select value={customerName} onChange={(e) => setCustomerName(e.target.value)}>
          <option value="">Select Customer</option>
          {customers.map((c, idx) => (
            <option key={idx} value={c.name}>{c.name}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="number" placeholder="Kg" value={kg} onChange={(e) => setKg(e.target.value)} />
        <input type="number" placeholder="Rate" value={rate} onChange={(e) => setRate(e.target.value)} />
        <button type="submit">Save</button>
      </form>

      {total !== '' && (
        <div className="shell-total">
          Total Amount: ₹{total.toFixed(2)}
        </div>
      )}

      <table className="shell-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Kg</th>
            <th>Rate</th>
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
              <td>{r.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShellSellingPage;

import React, { useState } from 'react';
import axios from '../api/api';
import './CustomerRegistration.css';

const CustomerRegistration = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      setError("Name & Phone are required");
      setSuccess('');
      return;
    }

    await axios.post('/customers', { name, phone, address });
    setSuccess("Customer registered successfully!");
    setName('');
    setPhone('');
    setAddress('');
    setError('');
  };

  return (
    <div className="customer-container">
      <h2>Register Customer</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CustomerRegistration;

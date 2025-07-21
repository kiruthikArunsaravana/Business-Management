import React, { useState, useEffect } from 'react';
import axios from '../../api/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HuskReportPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [records, setRecords] = useState([]);
  const [totalLoads, setTotalLoads] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalWages, setTotalWages] = useState(0);

  const fetchData = async () => {
    const res = await axios.get('/husk/selling', {
      params: { startDate, endDate }
    });
    setRecords(res.data);

    // Calculate totals
    let loads = 0, amount = 0, wages = 0;
    res.data.forEach(r => {
      loads += r.loadCount;
      amount += r.totalAmount;
      wages += r.wages;
    });

    setTotalLoads(loads);
    setTotalAmount(amount);
    setTotalWages(wages);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Husk Selling Report</h2>
      <div style={{ marginBottom: '15px' }}>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ margin: '5px', padding: '5px' }} />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ margin: '5px', padding: '5px' }} />
        <button onClick={fetchData} style={{ margin: '5px', padding: '8px' }}>Filter</button>
      </div>

      <Bar
        data={{
          labels: records.map(r => r.date),
          datasets: [{
            label: 'Total Amount',
            data: records.map(r => r.totalAmount),
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
          }]
        }}
        options={{
          responsive: true,
          plugins: { legend: { position: 'top' }, title: { display: true, text: 'Husk Selling Amount Over Time' } }
        }}
      />

      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        <p>Total Loads: {totalLoads}</p>
        <p>Total Wages: ₹{totalWages.toFixed(2)}</p>
        <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
      </div>

      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#ddd' }}>
            <th style={{ padding: '8px' }}>Customer</th>
            <th style={{ padding: '8px' }}>Date</th>
            <th style={{ padding: '8px' }}>Loads</th>
            <th style={{ padding: '8px' }}>Rate</th>
            <th style={{ padding: '8px' }}>Wages</th>
            <th style={{ padding: '8px' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <tr key={idx}>
              <td style={{ padding: '8px' }}>{r.customerName}</td>
              <td style={{ padding: '8px' }}>{r.date}</td>
              <td style={{ padding: '8px' }}>{r.loadCount}</td>
              <td style={{ padding: '8px' }}>{r.ratePerLoad}</td>
              <td style={{ padding: '8px' }}>{r.wages}</td>
              <td style={{ padding: '8px' }}>{r.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HuskReportPage;

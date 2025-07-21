import React, { useState, useEffect } from 'react';
import axios from '../../api/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ShellReportPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const [totalKg, setTotalKg] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchData = async () => {
    if (!startDate || !endDate) return;
    const res = await axios.get(`/shell/selling/report?start=${startDate}&end=${endDate}`);
    setData(res.data);
    calculateTotals(res.data);
  };

  const calculateTotals = (records) => {
    const totalKg = records.reduce((sum, r) => sum + (r.kg || 0), 0);
    const totalAmount = records.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
    setTotalKg(totalKg);
    setTotalAmount(totalAmount);
  };

  const style = { margin: '5px', padding: '8px', fontSize: '15px' };

  const chartData = {
    labels: data.map((r) => r.customerName || 'Unknown'),
    datasets: [
      {
        label: 'Kg',
        data: data.map((r) => r.kg),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Amount',
        data: data.map((r) => r.totalAmount),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      }
    ]
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shell Selling Report</h2>

      <div>
        <input style={style} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input style={style} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button style={style} onClick={fetchData}>Filter</button>
      </div>

      <div style={{ margin: '20px 0', fontWeight: 'bold' }}>
        Total Kg: {totalKg} | Total Amount: ₹{totalAmount.toFixed(2)}
      </div>

      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }}}}/>
      </div>

      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#ddd' }}>
            <th style={style}>Customer</th>
            <th style={style}>Date</th>
            <th style={style}>Kg</th>
            <th style={style}>Rate</th>
            <th style={style}>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, idx) => (
            <tr key={idx}>
              <td style={style}>{r.customerName}</td>
              <td style={style}>{r.date}</td>
              <td style={style}>{r.kg}</td>
              <td style={style}>{r.ratePerKg}</td>
              <td style={style}>{r.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShellReportPage;

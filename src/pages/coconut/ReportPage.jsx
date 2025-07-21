import React, { useState, useEffect } from "react";
import axios from "../../api/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [buyingData, setBuyingData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [profit, setProfit] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get("/coconut/buying/filter", {
        params: { startDate, endDate }
      });
      setBuyingData(res.data);

      const totalAmt = res.data.reduce((sum, item) => sum + item.totalAmount, 0);
      const totalCnt = res.data.reduce((sum, item) => sum + item.coconutCount, 0);
      const sellingAmt = totalAmt * 1.2; // dummy profit estimate
      const prof = sellingAmt - totalAmt;

      setTotalAmount(totalAmt);
      setTotalCount(totalCnt);
      setProfit(prof);
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = {
    labels: buyingData.map(item => item.customerName + " " + item.date),
    datasets: [
      {
        label: "Total Amount Spent",
        data: buyingData.map(item => item.totalAmount),
        backgroundColor: "rgba(75,192,192,0.6)"
      }
    ]
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Coconut Buying Report</h2>

      <div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ margin: "5px" }}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ margin: "5px" }}
        />
        <button onClick={fetchData} style={{ margin: "5px" }}>
          Filter
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <strong>Total Amount Spent:</strong> ₹{totalAmount.toFixed(2)}<br/>
        <strong>Total Coconuts Bought:</strong> {totalCount}<br/>
        <strong>Estimated Profit:</strong> ₹{profit.toFixed(2)}
      </div>

      <div style={{ marginTop: "30px" }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default ReportPage;

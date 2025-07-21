import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalConsolidatedReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [coconut, setCoconut] = useState({ profit: 0, totalCount: 0 });
  const [husk, setHusk] = useState({ profit: 0, totalLoads: 0 });
  const [shell, setShell] = useState({ profit: 0, totalLoads: 0 });

  const totalProfit = coconut.profit + husk.profit + shell.profit;

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [coconutRes, huskRes, shellRes] = await Promise.all([
        axios.get("http://localhost:8080/api/coconut-summary", { params: { startDate, endDate } }),
        axios.get("http://localhost:8080/api/husk-summary", { params: { startDate, endDate } }),
        axios.get("http://localhost:8080/api/shell-summary", { params: { startDate, endDate } }),
      ]);

      setCoconut({
        profit: coconutRes.data.totalProfit || 0,
        totalCount: coconutRes.data.totalCoconuts || 0
      });

      setHusk({
        profit: huskRes.data.totalProfit || 0,
        totalLoads: huskRes.data.totalLoads || 0
      });

      setShell({
        profit: shellRes.data.totalProfit || 0,
        totalLoads: shellRes.data.totalLoads || 0
      });

    } catch (err) {
      console.error("Error fetching consolidated data:", err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ["Coconut", "Husk", "Shell"],
    datasets: [
      {
        label: "Profit (₹)",
        data: [coconut.profit, husk.profit, shell.profit],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"]
      }
    ]
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Total Consolidated Report</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={inputStyle}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={inputStyle}
        />
        <button onClick={fetchData} style={buttonStyle}>Filter</button>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div style={summaryContainer}>
            <SummaryCard title="Coconut Profit" value={`₹ ${coconut.profit}`} color="green" />
            <SummaryCard title="Husk Profit" value={`₹ ${husk.profit}`} color="blue" />
            <SummaryCard title="Shell Profit" value={`₹ ${shell.profit}`} color="orange" />
            <SummaryCard title="Total Coconuts Bought" value={coconut.totalCount} color="purple" />
            <SummaryCard title="Total Husk Loads" value={husk.totalLoads} color="brown" />
            <SummaryCard title="Total Shell Loads" value={shell.totalLoads} color="darkred" />
            <SummaryCard title="Grand Total Profit" value={`₹ ${totalProfit}`} color="black" isDark />
          </div>

          <Bar data={chartData} options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Profit by Category" }
            }
          }} />
        </>
      )}
    </div>
  );
};

const SummaryCard = ({ title, value, color, isDark }) => (
  <div style={{
    ...cardStyle,
    background: isDark ? "#333" : "#f9f9f9",
    color: isDark ? "white" : color
  }}>
    <h3>{title}</h3>
    <p style={{ fontSize: "20px" }}>{value}</p>
  </div>
);

const summaryContainer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  marginBottom: "30px"
};

const cardStyle = {
  border: "1px solid #ccc",
  padding: "15px",
  borderRadius: "8px",
  minWidth: "200px",
  margin: "10px",
  textAlign: "center"
};

const inputStyle = {
  margin: "0 10px 10px 0",
  padding: "8px",
  fontSize: "14px"
};

const buttonStyle = {
  padding: "8px 16px",
  background: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default TotalConsolidatedReport;

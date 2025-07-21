import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


import HomePage from "./pages/HomePage";
import CustomerList from "./pages/CustomerList";
import CustomerRegister from "./pages/CustomerRegistration";

import CoconutBuying from "./pages/coconut/BuyingPage";
import CoconutSelling from "./pages/coconut/coconutSelling";
import CoconutReport from "./pages/coconut/ReportPage";

import HuskSelling from "./pages/Husk/SellingPage";
import HuskReport from "./pages/Husk/ReportPage";

import ShellSelling from "./pages/Shell/SellingPage";
import ShellReport from "./pages/Shell/ReportPage";

import TotalConsolidatedReport from "./pages/TotalConsolidatedReport.jsx";

function App() {
  return (
<Router>
  <Navbar />
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/customers" element={<CustomerList />} />
    <Route path="/customers/register" element={<CustomerRegister />} />
    <Route path="/coconut-buying" element={<CoconutBuying />} />
    <Route path="/coconut-selling" element={<CoconutSelling />} />
    <Route path="/coconut-report" element={<CoconutReport />} />
    <Route path="/husk-selling" element={<HuskSelling />} />
    <Route path="/husk-report" element={<HuskReport />} />
    <Route path="/shell-selling" element={<ShellSelling />} />
    <Route path="/shell-report" element={<ShellReport />} />

    <Route path="/total-consolidated-report" element={<TotalConsolidatedReport />} />
  </Routes>
</Router>

  );
}

export default App;

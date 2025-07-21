import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/" className="single-link">Home</NavLink>
      <NavLink to="/customers" className="single-link">Customer List</NavLink>
      <NavLink to="/customers/register" className="single-link">Register Customer</NavLink>

      <div className="dropdown">
        <button className="dropbtn">Coconut</button>
        <div className="dropdown-content">
          <NavLink to="/coconut-buying">Buying</NavLink>
          <NavLink to="/coconut-selling">Selling</NavLink>
          <NavLink to="/coconut-report">Report</NavLink>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">Husk</button>
        <div className="dropdown-content">
          <NavLink to="/husk-selling">Selling</NavLink>
          <NavLink to="/husk-report">Report</NavLink>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">Shell</button>
        <div className="dropdown-content">
          <NavLink to="/shell-selling">Selling</NavLink>
          <NavLink to="/shell-report">Report</NavLink>
        </div>
      </div>

      <NavLink to="/total-consolidated-report" className="single-link">TotalConsolidated Report</NavLink>
    </div>
  );
};

export default Navbar;

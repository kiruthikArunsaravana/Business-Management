import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Coconut Business Management System</h2>
      <div className="card-container">
        <Link to="/coconut-report" className="card coconut">
          Coconut
        </Link>
        <Link to="/husk-report" className="card husk">
          Husk
        </Link>
        <Link to="/shell-report" className="card shell">
          Shell
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully.");
    navigate("/login");
  };

  return (
    <div className="landing-container">
      <h1 className="landing-heading">🎉 Login Successful!</h1>
      <p className="landing-subtext">Welcome to the dashboard. Explore more features.</p>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Landing;

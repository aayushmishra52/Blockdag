import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⬢</span>
          <span className="logo-text">DAG<span className="logo-highlight">Board</span></span>
        </Link>
        
        <div className="navbar-right">
          <div className="network-status">
            <span className="status-dot"></span>
            <span className="status-text">Network: Active</span>
          </div>
          
          <div className="navbar-links">
            <a href="https://github.com/aayushmishra52" target="_blank" rel="noopener noreferrer" className="navbar-link">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/aayush-mishra-3a126628a/" target="_blank" rel="noopener noreferrer" className="navbar-link">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/aareyoush/" target="_blank" rel="noopener noreferrer" className="navbar-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
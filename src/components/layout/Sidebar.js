import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
      </button>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <i className="fas fa-home"></i>
          <span className="link-text">Home</span>
        </NavLink>
        
        <NavLink to="/visualizer" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <i className="fas fa-project-diagram"></i>
          <span className="link-text">DAG Visualizer</span>
        </NavLink>
        
        <NavLink to="/miner" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <i className="fas fa-microchip"></i>
          <span className="link-text">Miner Dashboard</span>
        </NavLink>
        
        <NavLink to="/insights" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <i className="fas fa-brain"></i>
          <span className="link-text">AI Insights</span>
        </NavLink>
        
        <NavLink to="/learn" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <i className="fas fa-book"></i>
          <span className="link-text">Learn DAG</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <div className="network-info">
          <div className="info-item">
            <span className="info-label">Blocks</span>
            <span className="info-value">14,382</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Miners</span>
            <span className="info-value">1,024</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">TPS</span>
            <span className="info-value">1,250</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
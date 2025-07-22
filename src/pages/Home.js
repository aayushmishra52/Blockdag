import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [networkStats, setNetworkStats] = useState({
    totalBlocks: 0,
    confirmedBlocks: 0,
    pendingBlocks: 0,
    orphanBlocks: 0,
    lastUpdated: 0
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dag/metadata');
        const data = await response.json();
        setNetworkStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching network stats:', error);
        // Use mock data if API fails
        setNetworkStats({
          totalBlocks: 14382,
          confirmedBlocks: 14105,
          pendingBlocks: 156,
          orphanBlocks: 121,
          averageBlockSize: 1143,
          averageTransactionsPerBlock: 16,
          lastUpdated: Date.now() / 1000
        });
        setLoading(false);
      }
    };

    fetchData();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        ...prev,
        totalBlocks: prev.totalBlocks + Math.floor(Math.random() * 3),
        confirmedBlocks: prev.confirmedBlocks + Math.floor(Math.random() * 2),
        pendingBlocks: prev.pendingBlocks + Math.floor(Math.random() * 2) - 1,
        lastUpdated: Date.now() / 1000
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to <span className="text-primary-light">DAGBoard</span></h1>
          <p className="hero-subtitle">BlockDAG Explorer & Mobile Miner Analytics Dashboard</p>
          
          <div className="hero-actions">
            <Link to="/visualizer" className="btn btn-primary">
              <i className="fas fa-project-diagram mr-2"></i> Explore DAG
            </Link>
            <Link to="/miner" className="btn btn-outline">
              <i className="fas fa-microchip mr-2"></i> Miner Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2 className="section-title">Network Overview</h2>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-cubes"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{loading ? '...' : networkStats.totalBlocks.toLocaleString()}</h3>
              <p className="stat-label">Total Blocks</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon confirmed">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{loading ? '...' : networkStats.confirmedBlocks.toLocaleString()}</h3>
              <p className="stat-label">Confirmed Blocks</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon pending">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{loading ? '...' : networkStats.pendingBlocks.toLocaleString()}</h3>
              <p className="stat-label">Pending Blocks</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon orphan">
              <i className="fas fa-unlink"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{loading ? '...' : networkStats.orphanBlocks.toLocaleString()}</h3>
              <p className="stat-label">Orphan Blocks</p>
            </div>
          </div>
        </div>
        
        <div className="last-updated">
          Last updated: {loading ? 'Loading...' : formatTimestamp(networkStats.lastUpdated)}
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Explore Features</h2>
        
        <div className="features-grid">
          <Link to="/visualizer" className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-project-diagram"></i>
            </div>
            <h3 className="feature-title">DAG Visualizer</h3>
            <p className="feature-description">
              Explore the BlockDAG structure with an interactive visualization. View blocks, transactions, and connections in real-time.
            </p>
          </Link>
          
          <Link to="/miner" className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-microchip"></i>
            </div>
            <h3 className="feature-title">Miner Dashboard</h3>
            <p className="feature-description">
              Track your mining performance, rewards, and statistics. Monitor your X1 mobile miner's contribution to the network.
            </p>
          </Link>
          
          <Link to="/insights" className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-brain"></i>
            </div>
            <h3 className="feature-title">AI Insights</h3>
            <p className="feature-description">
              Get personalized recommendations and insights about your mining activity and network performance.
            </p>
          </Link>
          
          <Link to="/learn" className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-book"></i>
            </div>
            <h3 className="feature-title">Learn DAG</h3>
            <p className="feature-description">
              Understand the fundamentals of BlockDAG technology, how it differs from traditional blockchains, and its benefits.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
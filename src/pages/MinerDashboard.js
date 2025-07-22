import React, { useState, useEffect } from 'react';
import './MinerDashboard.css';

const MinerDashboard = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [minerData, setMinerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [networkStats, setNetworkStats] = useState(null);

  useEffect(() => {
    // Fetch network stats on component mount
    const fetchNetworkStats = async () => {
      try {
        const response = await fetch('/api/miner/stats/network');
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        const data = await response.json();
        if (!data) {
          throw new Error('Invalid data format received from API');
        }
        setNetworkStats(data);
      } catch (error) {
        console.error('Error fetching network stats:', error);
        // Use mock data if API fails
        try {
          const mockResponse = await fetch('/mockData/minerStats.json');
          if (!mockResponse.ok) {
            throw new Error(`Mock data fetch failed with status: ${mockResponse.status}`);
          }
          const mockData = await mockResponse.json();
          if (!mockData || !mockData.networkStats) {
            throw new Error('Invalid mock data format');
          }
          console.log('Using mock network stats as fallback');
          setNetworkStats(mockData.networkStats);
        } catch (mockError) {
          console.error('Error fetching mock network stats:', mockError);
          // Hardcoded fallback if even mock data fails
          setNetworkStats({
            totalMiners: 1000,
            activeMiners: 876,
            totalHashPower: 42500,
            averageUptimePercentage: 89.5,
            averageBdagPerMiner: 750.25,
            lastUpdated: Date.now() / 1000
          });
        }
      }
    };

    fetchNetworkStats();
  }, []);

  const handleWalletChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!walletAddress) {
      setError('Please enter a wallet address');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/miner/${walletAddress}`);
      
      if (!response.ok) {
        throw new Error(`Miner not found or API error: ${response.status}`);
      }
      
      const data = await response.json();
      if (!data) {
        throw new Error('Invalid data format received from API');
      }
      
      setMinerData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching miner data:', error);
      
      try {
        // Try to fetch from mock data file
        const mockResponse = await fetch('/mockData/minerStats.json');
        if (!mockResponse.ok) {
          throw new Error(`Mock data fetch failed with status: ${mockResponse.status}`);
        }
        
        const mockData = await mockResponse.json();
        if (!mockData || !mockData.miners) {
          throw new Error('Invalid mock data format');
        }
        
        // Find a matching miner or use the first one
        let minerMockData = mockData.miners.find(miner => 
          miner.wallet.toLowerCase() === walletAddress.toLowerCase()
        );
        
        // If no exact match, but wallet is in our sample list, create a modified version
        if (!minerMockData && [
          '0xabcdef1234567890', 
          '0x1234567890abcdef',
          '0x7890abcdef123456',
          '0xdef1234567890abc',
          '0x567890abcdef1234'
        ].includes(walletAddress.toLowerCase())) {
          // Use the first miner as a template
          const templateMiner = mockData.miners[0];
          minerMockData = {
            ...templateMiner,
            wallet: walletAddress,
            nickname: `Miner-${walletAddress.substring(2, 6)}`,
            blocksMined: Math.floor(Math.random() * 200) + 50,
            uptime: Math.floor(Math.random() * 20) + 80,
            bdagEarned: Math.floor(Math.random() * 1000) + 500,
            rank: Math.floor(Math.random() * 100) + 1
          };
        }
        
        if (minerMockData) {
          console.log('Using mock miner data as fallback');
          // Transform the mock data to match the expected format
          const transformedData = {
            wallet: minerMockData.wallet,
            nickname: minerMockData.nickname || `Miner-${minerMockData.wallet.substring(2, 6)}`,
            blocksMinedTotal: minerMockData.blocksMined,
            blocksMinedLast24h: Math.floor(minerMockData.blocksMined / 10),
            uptimePercentage: minerMockData.uptime,
            bdagEarned: minerMockData.bdagEarned,
            bdagEarnedLast24h: minerMockData.bdagEarned / 30, // Estimate daily earnings
            rank: minerMockData.rank,
            totalMiners: mockData.networkStats.totalMiners,
            hashPower: minerMockData.hashPower,
            networkContribution: minerMockData.hashPower / mockData.networkStats.totalHashPower,
            lastActive: minerMockData.lastActive,
            joinDate: minerMockData.lastActive - 7776000, // 90 days ago
            deviceType: 'Mobile Miner X1',
            rewardsHistory: minerMockData.rewardsHistory.map(item => ({
              date: item.date,
              rewards: item.amount
            })),
            activityPeriods: minerMockData.activityPeriods
          };
          
          setMinerData(transformedData);
          setLoading(false);
        } else {
          throw new Error('Miner not found in mock data');
        }
      } catch (mockError) {
        console.error('Error with mock data fallback:', mockError);
        setError('Miner not found. Try one of these addresses: 0xabcdef1234567890, 0x1234567890abcdef');
        setLoading(false);
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const formatTimeAgo = (timestamp) => {
    const seconds = Math.floor(Date.now() / 1000 - timestamp);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="miner-dashboard-container">
      <h1 className="page-title">Miner Dashboard</h1>
      
      <div className="search-section">
        <form onSubmit={handleSubmit} className="wallet-form">
          <div className="form-group">
            <label htmlFor="wallet-address" className="form-label">Enter Wallet Address</label>
            <div className="input-group">
              <input
                type="text"
                id="wallet-address"
                className="form-input"
                placeholder="0x..."
                value={walletAddress}
                onChange={handleWalletChange}
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <span className="spinner-small"></span> : <i className="fas fa-search"></i>}
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </form>
        
        <div className="network-overview">
          <h3 className="section-subtitle">Network Overview</h3>
          {networkStats ? (
            <div className="network-stats">
              <div className="stat-item">
                <span className="stat-value">{networkStats.totalMiners.toLocaleString()}</span>
                <span className="stat-label">Total Miners</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{networkStats.activeMiners.toLocaleString()}</span>
                <span className="stat-label">Active Miners</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{networkStats.averageUptimePercentage ? networkStats.averageUptimePercentage.toFixed(1) : '0'}%</span>
                <span className="stat-label">Avg. Uptime</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{networkStats.averageBdagPerMiner ? networkStats.averageBdagPerMiner.toFixed(2) : '0'}</span>
                <span className="stat-label">Avg. BDAG</span>
              </div>
            </div>
          ) : (
            <div className="loading-indicator-small">
              <div className="spinner-small"></div>
              <p>Loading network stats...</p>
            </div>
          )}
        </div>
      </div>
      
      {minerData ? (
        <div className="miner-data-section">
          <div className="miner-header">
            <div className="miner-identity">
              <h2 className="miner-nickname">{minerData.nickname}</h2>
              <p className="miner-wallet">{minerData.wallet}</p>
            </div>
            <div className="miner-rank">
              <span className="rank-number">#{minerData.rank}</span>
              <span className="rank-label">of {minerData.totalMiners} miners</span>
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-cubes"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{minerData.blocksMinedTotal.toLocaleString()}</h3>
                <p className="stat-label">Blocks Mined</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-signal"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{minerData.uptimePercentage ? minerData.uptimePercentage.toFixed(1) : '0'}%</h3>
                <p className="stat-label">Uptime</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-coins"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{minerData.bdagEarned.toLocaleString()} BDAG</h3>
                <p className="stat-label">Total Earned</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{formatTimeAgo(minerData.lastActive)}</h3>
                <p className="stat-label">Last Active</p>
              </div>
            </div>
          </div>
          
          <div className="details-grid">
            <div className="detail-card">
              <h3 className="detail-title">Recent Activity</h3>
              <div className="activity-timeline">
                {minerData.activityPeriods.map((period, index) => (
                  <div className="activity-item" key={index}>
                    <div className="activity-indicator"></div>
                    <div className="activity-content">
                      <p className="activity-time">
                        {formatTimestamp(period.start)} - {formatTimestamp(period.end)}
                      </p>
                      <p className="activity-duration">
                        Duration: {Math.round((period.end - period.start) / 60)} minutes
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="detail-card">
              <h3 className="detail-title">Rewards History</h3>
              <div className="rewards-chart">
                <div className="chart-bars">
                  {minerData.rewardsHistory.map((day, index) => {
                    const maxReward = Math.max(...minerData.rewardsHistory.map(d => d.rewards));
                    const height = (day.rewards / maxReward) * 100;
                    
                    return (
                      <div className="chart-bar-container" key={index}>
                        <div 
                          className="chart-bar" 
                          style={{ height: `${height}%` }}
                          data-value={day.rewards ? day.rewards.toFixed(1) : '0'}
                        ></div>
                        <span className="chart-label">{day.date.split('-')[2]}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="chart-legend">
                  <span>Daily BDAG Rewards (Last 5 Days)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="miner-info-card">
            <h3 className="detail-title">Miner Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Device Type</span>
                <span className="info-value">{minerData.deviceType}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Hash Power</span>
                <span className="info-value">{minerData.hashPower} H/s</span>
              </div>
              <div className="info-item">
                <span className="info-label">Network Contribution</span>
                <span className="info-value">{minerData.networkContribution ? (minerData.networkContribution * 100).toFixed(3) : '0'}%</span>
              </div>
              <div className="info-item">
                <span className="info-label">Join Date</span>
                <span className="info-value">{formatTimestamp(minerData.joinDate)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Blocks Last 24h</span>
                <span className="info-value">{minerData.blocksMinedLast24h}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Rewards Last 24h</span>
                <span className="info-value">{minerData.bdagEarnedLast24h ? minerData.bdagEarnedLast24h.toFixed(2) : '0'} BDAG</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-microchip"></i>
          </div>
          <h2 className="empty-title">No Miner Data</h2>
          <p className="empty-message">Enter a wallet address to view miner statistics</p>
          <p className="sample-wallets">
            Try these sample addresses:<br />
            <code>0xabcdef1234567890</code><br />
            <code>0x1234567890abcdef</code>
          </p>
        </div>
      )}
    </div>
  );
};

export default MinerDashboard;
import React, { useState, useEffect } from 'react';
import './AiInsights.css';

const AiInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  // Fetch general insights on component mount
  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async (wallet = '') => {
    setLoading(true);
    setError(null);
    
    try {
      let url = '/api/insights';
      if (wallet) {
        url = `/api/insights/miner/${wallet}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch insights: ${response.status}`);
      }
      
      const data = await response.json();
      if (!data) {
        throw new Error('Invalid data format received from API');
      }
      
      setInsights(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching insights:', error);
      
      try {
        // Try to fetch from mock data file
        const mockResponse = await fetch('/mockData/insights.json');
        if (!mockResponse.ok) {
          throw new Error(`Mock data fetch failed with status: ${mockResponse.status}`);
        }
        
        const mockData = await mockResponse.json();
        if (!mockData) {
          throw new Error('Invalid mock data format');
        }
        
        console.log('Using mock insights data as fallback');
        
        if (wallet) {
          // Try to find personalized insights for this wallet
          const personalizedInsights = mockData.personalizedInsights.filter(insight => 
            insight.walletAddress.toLowerCase() === wallet.toLowerCase()
          );
          
          if (personalizedInsights.length > 0) {
            // Transform the data to match the expected format
            const formattedInsights = personalizedInsights.map(insight => ({
              id: insight.id,
              type: insight.type,
              severity: insight.severity === 'high' ? 'danger' : 
                       insight.severity === 'medium' ? 'warning' : 
                       insight.severity === 'low' ? 'info' : 'success',
              message: insight.description,
              timestamp: insight.timestamp,
              isPersonalized: true,
              walletAddress: insight.walletAddress
            }));
            
            setInsights(formattedInsights);
          } else {
            // If no personalized insights found for this wallet, create some based on general insights
            const generalInsights = mockData.insights.slice(0, 3);
            const formattedInsights = generalInsights.map(insight => ({
              id: insight.id,
              type: insight.type,
              severity: insight.severity === 'high' ? 'danger' : 
                       insight.severity === 'medium' ? 'warning' : 
                       insight.severity === 'low' ? 'info' : 'success',
              message: insight.description.replace('miners', 'your miner')
                .replace('network', 'your performance')
                .replace('Users', 'You'),
              timestamp: insight.timestamp,
              isPersonalized: true,
              walletAddress: wallet
            }));
            
            setInsights(formattedInsights);
          }
        } else {
          // Use general insights
          const generalInsights = mockData.insights;
          const formattedInsights = generalInsights.map(insight => ({
            id: insight.id,
            type: insight.type,
            severity: insight.severity === 'high' ? 'danger' : 
                     insight.severity === 'medium' ? 'warning' : 
                     insight.severity === 'low' ? 'info' : 'success',
            message: insight.description,
            timestamp: insight.timestamp,
            isPersonalized: false
          }));
          
          setInsights(formattedInsights);
        }
        
        setLoading(false);
      } catch (mockError) {
        console.error('Error with mock data fallback:', mockError);
        setError('Failed to load insights. Please try again.');
        setLoading(false);
        
        // Last resort fallback - hardcoded insights
        const hardcodedInsights = [
          {
            id: 1,
            type: 'performance',
            severity: 'info',
            message: 'Network hash power has increased by 15% in the last 24 hours.',
            timestamp: Date.now() / 1000 - 3600,
            isPersonalized: false
          },
          {
            id: 2,
            type: 'rewards',
            severity: 'success',
            message: 'Average block rewards have increased by 5% due to lower network congestion.',
            timestamp: Date.now() / 1000 - 7200,
            isPersonalized: false
          },
          {
            id: 3,
            type: 'optimization',
            severity: 'warning',
            message: 'Miners with consistent uptime above 95% are earning 20% more rewards on average.',
            timestamp: Date.now() / 1000 - 14400,
            isPersonalized: false
          },
          {
            id: 4,
            type: 'activity',
            severity: 'danger',
            message: 'Network detected an increase in orphan blocks. Check your connection stability.',
            timestamp: Date.now() / 1000 - 28800,
            isPersonalized: false
          },
          {
            id: 5,
            type: 'performance',
            severity: 'info',
            message: 'Users with the latest miner software version are seeing 8% better performance.',
            timestamp: Date.now() / 1000 - 43200,
            isPersonalized: false
          }
        ];
        
        if (wallet) {
          const personalizedInsights = hardcodedInsights.slice(0, 3).map(insight => ({
            ...insight,
            isPersonalized: true,
            walletAddress: wallet,
            message: insight.message.replace('miners', 'your miner')
              .replace('network', 'your performance')
              .replace('Users', 'You')
          }));
          
          setInsights(personalizedInsights);
        } else {
          setInsights(hardcodedInsights);
        }
        
        setLoading(false);
      }
    }
  };

  const handleWalletSubmit = (e) => {
    e.preventDefault();
    if (walletAddress.trim()) {
      fetchInsights(walletAddress.trim());
    } else {
      fetchInsights();
    }
  };

  const handleClearWallet = () => {
    setWalletAddress('');
    fetchInsights();
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterSeverityChange = (e) => {
    setFilterSeverity(e.target.value);
  };

  const filteredInsights = insights.filter(insight => {
    const typeMatch = filterType === 'all' || insight.type === filterType;
    const severityMatch = filterSeverity === 'all' || insight.severity === filterSeverity;
    return typeMatch && severityMatch;
  });

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

  const getInsightIcon = (type) => {
    switch (type) {
      case 'performance':
        return 'fas fa-tachometer-alt';
      case 'rewards':
        return 'fas fa-coins';
      case 'optimization':
        return 'fas fa-sliders-h';
      case 'activity':
        return 'fas fa-chart-line';
      default:
        return 'fas fa-lightbulb';
    }
  };

  return (
    <div className="ai-insights-container">
      <div className="insights-header">
        <h1 className="page-title">AI Insights</h1>
        <p className="page-description">
          Smart analysis of network data and miner performance to help optimize your mining strategy.
        </p>
      </div>
      
      <div className="insights-controls">
        <form onSubmit={handleWalletSubmit} className="wallet-form">
          <div className="form-group">
            <label htmlFor="wallet-address" className="form-label">Personalize Insights</label>
            <div className="input-group">
              <input
                type="text"
                id="wallet-address"
                className="form-input"
                placeholder="Enter wallet address for personalized insights"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-search"></i>
              </button>
              {walletAddress && (
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleClearWallet}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
        </form>
        
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="filter-type" className="filter-label">Type</label>
            <select 
              id="filter-type" 
              className="filter-select"
              value={filterType}
              onChange={handleFilterTypeChange}
            >
              <option value="all">All Types</option>
              <option value="performance">Performance</option>
              <option value="rewards">Rewards</option>
              <option value="optimization">Optimization</option>
              <option value="activity">Activity</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="filter-severity" className="filter-label">Severity</label>
            <select 
              id="filter-severity" 
              className="filter-select"
              value={filterSeverity}
              onChange={handleFilterSeverityChange}
            >
              <option value="all">All Severities</option>
              <option value="info">Information</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Critical</option>
            </select>
          </div>
        </div>
      </div>
      
      {walletAddress && (
        <div className="personalized-banner">
          <i className="fas fa-user-circle"></i>
          <span>Showing personalized insights for: <strong>{walletAddress}</strong></span>
        </div>
      )}
      
      <div className="insights-content">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading insights...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <i className="fas fa-exclamation-circle"></i>
            <p>{error}</p>
            <button 
              className="btn btn-outline" 
              onClick={() => fetchInsights(walletAddress)}
            >
              Try Again
            </button>
          </div>
        ) : filteredInsights.length === 0 ? (
          <div className="empty-container">
            <i className="fas fa-search"></i>
            <p>No insights found with the current filters.</p>
            <button 
              className="btn btn-outline" 
              onClick={() => {
                setFilterType('all');
                setFilterSeverity('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="insights-grid">
            {filteredInsights.map(insight => (
              <div 
                key={insight.id} 
                className={`insight-card ${insight.isPersonalized ? 'personalized' : ''} severity-${insight.severity}`}
              >
                <div className="insight-header">
                  <div className="insight-type">
                    <i className={getInsightIcon(insight.type)}></i>
                    <span>{insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}</span>
                  </div>
                  <div className="insight-time" title={formatTimestamp(insight.timestamp)}>
                    {formatTimeAgo(insight.timestamp)}
                  </div>
                </div>
                
                <div className="insight-body">
                  <p className="insight-message">{insight.message}</p>
                </div>
                
                <div className="insight-footer">
                  <div className={`insight-severity severity-${insight.severity}`}>
                    {insight.severity === 'info' && 'Information'}
                    {insight.severity === 'success' && 'Success'}
                    {insight.severity === 'warning' && 'Warning'}
                    {insight.severity === 'danger' && 'Critical'}
                  </div>
                  
                  {insight.isPersonalized && (
                    <div className="insight-personalized">
                      <i className="fas fa-user-check"></i>
                      <span>Personalized</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="insights-footer">
        <div className="ai-disclaimer">
          <i className="fas fa-robot"></i>
          <p>
            These insights are generated using rule-based analysis of network data and miner performance.
            For a hackathon demo, all data is simulated. In a production environment, this would use real-time
            data and machine learning algorithms to provide more accurate and personalized insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiInsights;
import React, { useState } from 'react';
import './LearnDag.css';

const LearnDag = () => {
  const [activeSection, setActiveSection] = useState('what-is-dag');
  
  const sections = [
    {
      id: 'what-is-dag',
      title: 'What is a DAG?',
      icon: 'fas fa-project-diagram'
    },
    {
      id: 'blockdag-vs-blockchain',
      title: 'BlockDAG vs Blockchain',
      icon: 'fas fa-exchange-alt'
    },
    {
      id: 'mobile-mining',
      title: 'Mobile Mining with X1',
      icon: 'fas fa-mobile-alt'
    },
    {
      id: 'consensus-mechanism',
      title: 'Consensus Mechanism',
      icon: 'fas fa-handshake'
    },
    {
      id: 'future-applications',
      title: 'Future Applications',
      icon: 'fas fa-rocket'
    }
  ];
  
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };
  
  return (
    <div className="learn-dag-container">
      <div className="learn-header">
        <h1 className="page-title">Learn BlockDAG</h1>
        <p className="page-description">
          Explore the fundamentals of Directed Acyclic Graph technology and how it's revolutionizing blockchain.
        </p>
      </div>
      
      <div className="learn-content">
        <div className="learn-sidebar">
          <div className="section-list">
            {sections.map(section => (
              <button
                key={section.id}
                className={`section-button ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => handleSectionChange(section.id)}
              >
                <i className={section.icon}></i>
                <span>{section.title}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="learn-main">
          {activeSection === 'what-is-dag' && (
            <div className="learn-section">
              <h2 className="section-title">What is a DAG?</h2>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>Directed Acyclic Graph (DAG) Explained</h3>
                </div>
                <div className="card-body">
                  <div className="content-with-image">
                    <div className="content-text">
                      <p>
                        A <strong>Directed Acyclic Graph (DAG)</strong> is a data structure that consists of vertices (nodes) and edges (connections) with a specific direction, forming a graph with no directed cycles.
                      </p>
                      <p>
                        Unlike traditional blockchains that form a single chain of blocks, a DAG allows multiple chains to exist simultaneously and interconnect, creating a web-like structure where each block can have multiple parent blocks.
                      </p>
                      <p>
                        This structure enables:
                      </p>
                      <ul>
                        <li>Higher throughput (transactions per second)</li>
                        <li>Faster confirmation times</li>
                        <li>Better scalability as the network grows</li>
                        <li>Elimination of the "block size" bottleneck</li>
                      </ul>
                    </div>
                    <div className="content-image">
                      <svg className="dag-illustration" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                        {/* DAG Illustration */}
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#4f46e5" />
                          </marker>
                        </defs>
                        
                        {/* Genesis Block */}
                        <circle cx="200" cy="50" r="25" fill="#4f46e5" opacity="0.8" />
                        <text x="200" y="55" textAnchor="middle" fill="white" fontSize="12">Genesis</text>
                        
                        {/* Level 1 Blocks */}
                        <circle cx="120" cy="120" r="20" fill="#4f46e5" opacity="0.8" />
                        <text x="120" y="125" textAnchor="middle" fill="white" fontSize="12">Block 1</text>
                        
                        <circle cx="200" cy="120" r="20" fill="#4f46e5" opacity="0.8" />
                        <text x="200" y="125" textAnchor="middle" fill="white" fontSize="12">Block 2</text>
                        
                        <circle cx="280" cy="120" r="20" fill="#4f46e5" opacity="0.8" />
                        <text x="280" y="125" textAnchor="middle" fill="white" fontSize="12">Block 3</text>
                        
                        {/* Level 2 Blocks */}
                        <circle cx="80" cy="190" r="20" fill="#4f46e5" opacity="0.8" />
                        <text x="80" y="195" textAnchor="middle" fill="white" fontSize="12">Block 4</text>
                        
                        <circle cx="160" cy="190" r="20" fill="#4f46e5" opacity="0.8" />
                        <text x="160" y="195" textAnchor="middle" fill="white" fontSize="12">Block 5</text>
                        
                        <circle cx="240" cy="190" r="20" fill="#4f46e5" opacity="0.8" />
                        <text x="240" y="195" textAnchor="middle" fill="white" fontSize="12">Block 6</text>
                        
                        <circle cx="320" cy="190" r="20" fill="#4f46e5" opacity="0.8" />
                        <text x="320" y="195" textAnchor="middle" fill="white" fontSize="12">Block 7</text>
                        
                        {/* Level 3 Blocks */}
                        <circle cx="120" cy="260" r="20" fill="#4f46e5" opacity="0.8" />
                        <text x="120" y="265" textAnchor="middle" fill="white" fontSize="12">Block 8</text>
                        
                        <circle cx="200" cy="260" r="20" fill="#4f46e5" opacity="0.8" />
                        <text x="200" y="265" textAnchor="middle" fill="white" fontSize="12">Block 9</text>
                        
                        <circle cx="280" cy="260" r="20" fill="#4f46e5" opacity="0.8" />
                        <text x="280" y="265" textAnchor="middle" fill="white" fontSize="12">Block 10</text>
                        
                        {/* Connections with arrows */}
                        <line x1="185" y1="65" x2="135" y2="105" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <line x1="200" y1="75" x2="200" y2="100" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <line x1="215" y1="65" x2="265" y2="105" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        
                        <line x1="110" y1="135" x2="90" y2="170" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <line x1="130" y1="135" x2="150" y2="170" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        
                        <line x1="190" y1="135" x2="170" y2="170" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <line x1="210" y1="135" x2="230" y2="170" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        
                        <line x1="270" y1="135" x2="250" y2="170" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <line x1="290" y1="135" x2="310" y2="170" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        
                        <line x1="90" y1="210" x2="110" y2="240" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <line x1="160" y1="210" x2="130" y2="240" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        
                        <line x1="170" y1="210" x2="190" y2="240" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <line x1="240" y1="210" x2="210" y2="240" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        
                        <line x1="250" y1="210" x2="270" y2="240" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <line x1="310" y1="210" x2="290" y2="240" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>Key Properties of a DAG</h3>
                </div>
                <div className="card-body">
                  <div className="property-grid">
                    <div className="property-item">
                      <div className="property-icon">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                      <div className="property-content">
                        <h4>Directed</h4>
                        <p>All connections between blocks have a specific direction, pointing from older blocks to newer ones.</p>
                      </div>
                    </div>
                    
                    <div className="property-item">
                      <div className="property-icon">
                        <i className="fas fa-ban"></i>
                      </div>
                      <div className="property-content">
                        <h4>Acyclic</h4>
                        <p>No cycles are allowed in the graph, meaning you can't follow connections and return to a starting point.</p>
                      </div>
                    </div>
                    
                    <div className="property-item">
                      <div className="property-icon">
                        <i className="fas fa-network-wired"></i>
                      </div>
                      <div className="property-content">
                        <h4>Graph Structure</h4>
                        <p>Forms a web-like network rather than a linear chain, allowing for parallel processing.</p>
                      </div>
                    </div>
                    
                    <div className="property-item">
                      <div className="property-icon">
                        <i className="fas fa-link"></i>
                      </div>
                      <div className="property-content">
                        <h4>Multiple References</h4>
                        <p>Each block can reference multiple previous blocks, validating more of the history at once.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'blockdag-vs-blockchain' && (
            <div className="learn-section">
              <h2 className="section-title">BlockDAG vs Blockchain</h2>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>Comparing Technologies</h3>
                </div>
                <div className="card-body">
                  <div className="comparison-table">
                    <div className="comparison-header">
                      <div className="comparison-cell header-cell">Feature</div>
                      <div className="comparison-cell header-cell">Traditional Blockchain</div>
                      <div className="comparison-cell header-cell">BlockDAG</div>
                    </div>
                    
                    <div className="comparison-row">
                      <div className="comparison-cell feature-cell">Structure</div>
                      <div className="comparison-cell">
                        <i className="fas fa-link"></i>
                        <p>Linear chain of blocks</p>
                      </div>
                      <div className="comparison-cell">
                        <i className="fas fa-project-diagram"></i>
                        <p>Web-like structure with multiple connections</p>
                      </div>
                    </div>
                    
                    <div className="comparison-row">
                      <div className="comparison-cell feature-cell">Throughput</div>
                      <div className="comparison-cell">
                        <i className="fas fa-tachometer-alt"></i>
                        <p>Limited by block size and time</p>
                        <span className="metric">~7-30 TPS</span>
                      </div>
                      <div className="comparison-cell">
                        <i className="fas fa-bolt"></i>
                        <p>Significantly higher due to parallel processing</p>
                        <span className="metric">1000+ TPS</span>
                      </div>
                    </div>
                    
                    <div className="comparison-row">
                      <div className="comparison-cell feature-cell">Confirmation Time</div>
                      <div className="comparison-cell">
                        <i className="fas fa-clock"></i>
                        <p>Minutes to hours</p>
                        <span className="metric">10+ minutes</span>
                      </div>
                      <div className="comparison-cell">
                        <i className="fas fa-stopwatch"></i>
                        <p>Seconds to minutes</p>
                        <span className="metric">1-30 seconds</span>
                      </div>
                    </div>
                    
                    <div className="comparison-row">
                      <div className="comparison-cell feature-cell">Scalability</div>
                      <div className="comparison-cell">
                        <i className="fas fa-chart-line"></i>
                        <p>Performance decreases as network grows</p>
                      </div>
                      <div className="comparison-cell">
                        <i className="fas fa-expand-arrows-alt"></i>
                        <p>Performance increases as network grows</p>
                      </div>
                    </div>
                    
                    <div className="comparison-row">
                      <div className="comparison-cell feature-cell">Energy Efficiency</div>
                      <div className="comparison-cell">
                        <i className="fas fa-battery-quarter"></i>
                        <p>High energy consumption (PoW)</p>
                      </div>
                      <div className="comparison-cell">
                        <i className="fas fa-battery-full"></i>
                        <p>Lower energy consumption</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>Visual Comparison</h3>
                </div>
                <div className="card-body">
                  <div className="visual-comparison">
                    <div className="comparison-item">
                      <h4>Blockchain Structure</h4>
                      <div className="comparison-visual">
                        <svg className="blockchain-illustration" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
                          {/* Blockchain Illustration */}
                          <rect x="20" y="40" width="60" height="40" rx="5" fill="#6b7280" />
                          <text x="50" y="65" textAnchor="middle" fill="white" fontSize="12">Block 1</text>
                          
                          <rect x="120" y="40" width="60" height="40" rx="5" fill="#6b7280" />
                          <text x="150" y="65" textAnchor="middle" fill="white" fontSize="12">Block 2</text>
                          
                          <rect x="220" y="40" width="60" height="40" rx="5" fill="#6b7280" />
                          <text x="250" y="65" textAnchor="middle" fill="white" fontSize="12">Block 3</text>
                          
                          <rect x="320" y="40" width="60" height="40" rx="5" fill="#6b7280" />
                          <text x="350" y="65" textAnchor="middle" fill="white" fontSize="12">Block 4</text>
                          
                          <line x1="80" y1="60" x2="120" y2="60" stroke="#6b7280" strokeWidth="2" />
                          <line x1="180" y1="60" x2="220" y2="60" stroke="#6b7280" strokeWidth="2" />
                          <line x1="280" y1="60" x2="320" y2="60" stroke="#6b7280" strokeWidth="2" />
                          
                          <polygon points="115,55 115,65 125,60" fill="#6b7280" />
                          <polygon points="215,55 215,65 225,60" fill="#6b7280" />
                          <polygon points="315,55 315,65 325,60" fill="#6b7280" />
                        </svg>
                        <p className="comparison-description">
                          In a traditional blockchain, blocks form a single linear chain where each block has exactly one parent block.
                        </p>
                      </div>
                    </div>
                    
                    <div className="comparison-item">
                      <h4>BlockDAG Structure</h4>
                      <div className="comparison-visual">
                        <svg className="blockdag-illustration" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
                          {/* BlockDAG Illustration */}
                          <rect x="170" y="20" width="60" height="30" rx="5" fill="#4f46e5" />
                          <text x="200" y="40" textAnchor="middle" fill="white" fontSize="12">Block 1</text>
                          
                          <rect x="70" y="70" width="60" height="30" rx="5" fill="#4f46e5" />
                          <text x="100" y="90" textAnchor="middle" fill="white" fontSize="12">Block 2</text>
                          
                          <rect x="170" y="70" width="60" height="30" rx="5" fill="#4f46e5" />
                          <text x="200" y="90" textAnchor="middle" fill="white" fontSize="12">Block 3</text>
                          
                          <rect x="270" y="70" width="60" height="30" rx="5" fill="#4f46e5" />
                          <text x="300" y="90" textAnchor="middle" fill="white" fontSize="12">Block 4</text>
                          
                          <rect x="20" y="120" width="60" height="30" rx="5" fill="#4f46e5" />
                          <text x="50" y="140" textAnchor="middle" fill="white" fontSize="12">Block 5</text>
                          
                          <rect x="120" y="120" width="60" height="30" rx="5" fill="#4f46e5" />
                          <text x="150" y="140" textAnchor="middle" fill="white" fontSize="12">Block 6</text>
                          
                          <rect x="220" y="120" width="60" height="30" rx="5" fill="#4f46e5" />
                          <text x="250" y="140" textAnchor="middle" fill="white" fontSize="12">Block 7</text>
                          
                          <rect x="320" y="120" width="60" height="30" rx="5" fill="#4f46e5" />
                          <text x="350" y="140" textAnchor="middle" fill="white" fontSize="12">Block 8</text>
                          
                          <line x1="190" y1="50" x2="110" y2="70" stroke="#4f46e5" strokeWidth="2" />
                          <line x1="200" y1="50" x2="200" y2="70" stroke="#4f46e5" strokeWidth="2" />
                          <line x1="210" y1="50" x2="290" y2="70" stroke="#4f46e5" strokeWidth="2" />
                          
                          <line x1="90" y1="100" x2="50" y2="120" stroke="#4f46e5" strokeWidth="2" />
                          <line x1="110" y1="100" x2="140" y2="120" stroke="#4f46e5" strokeWidth="2" />
                          
                          <line x1="190" y1="100" x2="150" y2="120" stroke="#4f46e5" strokeWidth="2" />
                          <line x1="210" y1="100" x2="240" y2="120" stroke="#4f46e5" strokeWidth="2" />
                          
                          <line x1="290" y1="100" x2="260" y2="120" stroke="#4f46e5" strokeWidth="2" />
                          <line x1="310" y1="100" x2="340" y2="120" stroke="#4f46e5" strokeWidth="2" />
                          
                          <polygon points="107,67 113,73 113,67" fill="#4f46e5" />
                          <polygon points="197,67 203,73 203,67" fill="#4f46e5" />
                          <polygon points="287,67 293,73 293,67" fill="#4f46e5" />
                          
                          <polygon points="47,117 53,123 53,117" fill="#4f46e5" />
                          <polygon points="137,117 143,123 143,117" fill="#4f46e5" />
                          <polygon points="147,117 153,123 153,117" fill="#4f46e5" />
                          <polygon points="237,117 243,123 243,117" fill="#4f46e5" />
                          <polygon points="257,117 263,123 263,117" fill="#4f46e5" />
                          <polygon points="337,117 343,123 343,117" fill="#4f46e5" />
                        </svg>
                        <p className="comparison-description">
                          In a BlockDAG, blocks can reference multiple parent blocks, creating a web-like structure that enables parallel processing and higher throughput.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'mobile-mining' && (
            <div className="learn-section">
              <h2 className="section-title">Mobile Mining with X1</h2>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>Mobile Mining Revolution</h3>
                </div>
                <div className="card-body">
                  <div className="content-with-image">
                    <div className="content-text">
                      <p>
                        The X1 mobile miner represents a paradigm shift in cryptocurrency mining, making it accessible to everyday users through their smartphones.
                      </p>
                      <p>
                        Traditional mining requires expensive, specialized hardware and consumes large amounts of electricity. The X1 mobile miner leverages BlockDAG technology to enable efficient mining on standard mobile devices.
                      </p>
                      <p>
                        Key advantages of mobile mining with X1:
                      </p>
                      <ul>
                        <li>Accessibility: Anyone with a smartphone can participate</li>
                        <li>Energy Efficiency: Uses minimal battery power</li>
                        <li>Decentralization: Distributes mining power across millions of devices</li>
                        <li>Simplicity: No technical expertise required</li>
                      </ul>
                    </div>
                    <div className="content-image mobile-mining-image">
                      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                        {/* Mobile Phone */}
                        <rect x="100" y="50" width="100" height="200" rx="10" fill="#1f2937" />
                        <rect x="105" y="60" width="90" height="180" rx="5" fill="#111827" />
                        
                        {/* Screen Content */}
                        <rect x="110" y="70" width="80" height="160" rx="2" fill="#374151" />
                        
                        {/* Mining App Interface */}
                        <rect x="115" y="80" width="70" height="20" rx="2" fill="#4f46e5" />
                        <text x="150" y="94" textAnchor="middle" fill="white" fontSize="10">X1 Miner</text>
                        
                        {/* Mining Stats */}
                        <rect x="115" y="105" width="70" height="50" rx="2" fill="#1f2937" />
                        <text x="120" y="120" fill="white" fontSize="8">Hash Rate:</text>
                        <text x="175" y="120" textAnchor="end" fill="#4f46e5" fontSize="8">42 H/s</text>
                        
                        <text x="120" y="135" fill="white" fontSize="8">Blocks Mined:</text>
                        <text x="175" y="135" textAnchor="end" fill="#4f46e5" fontSize="8">7</text>
                        
                        <text x="120" y="150" fill="white" fontSize="8">Rewards:</text>
                        <text x="175" y="150" textAnchor="end" fill="#4f46e5" fontSize="8">12.5 BDAG</text>
                        
                        {/* Mining Button */}
                        <rect x="125" y="165" width="50" height="20" rx="10" fill="#4f46e5" />
                        <text x="150" y="179" textAnchor="middle" fill="white" fontSize="10">MINING</text>
                        
                        {/* Mining Animation */}
                        <circle cx="150" cy="200" r="15" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="30 10" />
                        
                        {/* Blocks being mined */}
                        <rect x="140" y="195" width="20" height="10" rx="2" fill="#4f46e5" opacity="0.8" />
                        
                        {/* Mining Waves */}
                        <circle cx="150" cy="200" r="25" fill="none" stroke="#4f46e5" strokeWidth="1" opacity="0.6" />
                        <circle cx="150" cy="200" r="35" fill="none" stroke="#4f46e5" strokeWidth="1" opacity="0.4" />
                        <circle cx="150" cy="200" r="45" fill="none" stroke="#4f46e5" strokeWidth="1" opacity="0.2" />
                        
                        {/* Phone Button */}
                        <circle cx="150" cy="250" r="8" fill="#374151" stroke="#1f2937" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>How Mobile Mining Contributes to the Network</h3>
                </div>
                <div className="card-body">
                  <div className="process-flow">
                    <div className="process-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Transaction Collection</h4>
                        <p>The X1 miner app collects pending transactions from the network mempool.</p>
                      </div>
                    </div>
                    
                    <div className="process-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Block Creation</h4>
                        <p>The app bundles transactions into a candidate block and references multiple previous blocks.</p>
                      </div>
                    </div>
                    
                    <div className="process-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Proof-of-Work</h4>
                        <p>A lightweight mining algorithm runs to find a valid hash that meets the network difficulty.</p>
                      </div>
                    </div>
                    
                    <div className="process-step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>Block Propagation</h4>
                        <p>Once a valid block is found, it's broadcast to the network for validation and inclusion in the DAG.</p>
                      </div>
                    </div>
                    
                    <div className="process-step">
                      <div className="step-number">5</div>
                      <div className="step-content">
                        <h4>Reward Distribution</h4>
                        <p>Miners receive BDAG tokens as rewards for successfully mining blocks that contribute to the network.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'consensus-mechanism' && (
            <div className="learn-section">
              <h2 className="section-title">Consensus Mechanism</h2>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>BlockDAG Consensus Overview</h3>
                </div>
                <div className="card-body">
                  <p>
                    The BlockDAG consensus mechanism combines elements of Proof-of-Work with a novel approach to block ordering and confirmation. Unlike traditional blockchains that require a single chain of blocks, BlockDAG allows multiple valid blocks to exist at the same "height" or time.
                  </p>
                  <p>
                    This parallel approach significantly increases throughput while maintaining security through a system of block weights and confirmations based on the DAG structure.
                  </p>
                </div>
              </div>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>Key Components of BlockDAG Consensus</h3>
                </div>
                <div className="card-body">
                  <div className="component-grid">
                    <div className="component-item">
                      <div className="component-icon">
                        <i className="fas fa-hammer"></i>
                      </div>
                      <div className="component-content">
                        <h4>Lightweight Proof-of-Work</h4>
                        <p>A modified PoW algorithm that can run efficiently on mobile devices while still providing security against attacks.</p>
                      </div>
                    </div>
                    
                    <div className="component-item">
                      <div className="component-icon">
                        <i className="fas fa-weight"></i>
                      </div>
                      <div className="component-content">
                        <h4>GHOSTDAG Protocol</h4>
                        <p>An algorithm that assigns weights to blocks based on their position in the DAG and the number of blocks that reference them.</p>
                      </div>
                    </div>
                    
                    <div className="component-item">
                      <div className="component-icon">
                        <i className="fas fa-sort-amount-down"></i>
                      </div>
                      <div className="component-content">
                        <h4>Topological Ordering</h4>
                        <p>A method to determine a consistent global order of blocks across all nodes in the network.</p>
                      </div>
                    </div>
                    
                    <div className="component-item">
                      <div className="component-icon">
                        <i className="fas fa-shield-alt"></i>
                      </div>
                      <div className="component-content">
                        <h4>Blue Score</h4>
                        <p>A metric that determines how many blocks in the DAG confirm a given block, providing a measure of security.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>Confirmation Process</h3>
                </div>
                <div className="card-body">
                  <div className="confirmation-flow">
                    <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" className="confirmation-svg">
                      {/* DAG Structure */}
                      <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#4f46e5" />
                        </marker>
                      </defs>
                      
                      {/* Blocks */}
                      <rect x="50" y="80" width="80" height="40" rx="5" fill="#4f46e5" opacity="0.8" />
                      <text x="90" y="105" textAnchor="middle" fill="white" fontSize="14">Block A</text>
                      
                      <rect x="200" y="40" width="80" height="40" rx="5" fill="#4f46e5" opacity="0.8" />
                      <text x="240" y="65" textAnchor="middle" fill="white" fontSize="14">Block B</text>
                      
                      <rect x="200" y="120" width="80" height="40" rx="5" fill="#4f46e5" opacity="0.8" />
                      <text x="240" y="145" textAnchor="middle" fill="white" fontSize="14">Block C</text>
                      
                      <rect x="350" y="40" width="80" height="40" rx="5" fill="#4f46e5" opacity="0.8" />
                      <text x="390" y="65" textAnchor="middle" fill="white" fontSize="14">Block D</text>
                      
                      <rect x="350" y="120" width="80" height="40" rx="5" fill="#4f46e5" opacity="0.8" />
                      <text x="390" y="145" textAnchor="middle" fill="white" fontSize="14">Block E</text>
                      
                      <rect x="500" y="80" width="80" height="40" rx="5" fill="#4f46e5" opacity="0.8" />
                      <text x="540" y="105" textAnchor="middle" fill="white" fontSize="14">Block F</text>
                      
                      <rect x="650" y="80" width="80" height="40" rx="5" fill="#22c55e" opacity="0.8" />
                      <text x="690" y="105" textAnchor="middle" fill="white" fontSize="14">Block G</text>
                      
                      {/* Connections */}
                      <line x1="130" y1="100" x2="200" y2="60" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrow)" />
                      <line x1="130" y1="100" x2="200" y2="140" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrow)" />
                      
                      <line x1="280" y1="60" x2="350" y2="60" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrow)" />
                      <line x1="280" y1="140" x2="350" y2="140" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrow)" />
                      
                      <line x1="430" y1="60" x2="500" y2="100" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrow)" />
                      <line x1="430" y1="140" x2="500" y2="100" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrow)" />
                      
                      <line x1="580" y1="100" x2="650" y2="100" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrow)" />
                      
                      {/* Confirmation Levels */}
                      <text x="90" y="30" textAnchor="middle" fill="#4f46e5" fontSize="12">Depth 0</text>
                      <text x="240" y="30" textAnchor="middle" fill="#4f46e5" fontSize="12">Depth 1</text>
                      <text x="390" y="30" textAnchor="middle" fill="#4f46e5" fontSize="12">Depth 2</text>
                      <text x="540" y="30" textAnchor="middle" fill="#4f46e5" fontSize="12">Depth 3</text>
                      <text x="690" y="30" textAnchor="middle" fill="#22c55e" fontSize="12">Confirmed</text>
                      
                      {/* Confirmation Arrows */}
                      <line x1="90" y1="35" x2="90" y2="75" stroke="#4f46e5" strokeWidth="1" strokeDasharray="4 2" />
                      <line x1="240" y1="35" x2="240" y2="35" stroke="#4f46e5" strokeWidth="1" strokeDasharray="4 2" />
                      <line x1="390" y1="35" x2="390" y2="35" stroke="#4f46e5" strokeWidth="1" strokeDasharray="4 2" />
                      <line x1="540" y1="35" x2="540" y2="75" stroke="#4f46e5" strokeWidth="1" strokeDasharray="4 2" />
                      <line x1="690" y1="35" x2="690" y2="75" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 2" />
                    </svg>
                    
                    <div className="confirmation-legend">
                      <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#4f46e5' }}></div>
                        <span>Pending Block</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#22c55e' }}></div>
                        <span>Confirmed Block</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-arrow"></div>
                        <span>Reference</span>
                      </div>
                    </div>
                    
                    <p className="confirmation-description">
                      As new blocks are added to the DAG, they reference and confirm previous blocks. A block is considered confirmed when it reaches a certain "depth" in the DAG, meaning enough subsequent blocks have referenced it directly or indirectly. In this example, Block G confirms all previous blocks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'future-applications' && (
            <div className="learn-section">
              <h2 className="section-title">Future Applications</h2>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>Beyond Cryptocurrency</h3>
                </div>
                <div className="card-body">
                  <p>
                    BlockDAG technology has the potential to revolutionize numerous industries beyond cryptocurrency. Its high throughput, scalability, and energy efficiency make it suitable for a wide range of applications.
                  </p>
                  
                  <div className="applications-grid">
                    <div className="application-item">
                      <div className="application-icon">
                        <i className="fas fa-exchange-alt"></i>
                      </div>
                      <div className="application-content">
                        <h4>Micropayments</h4>
                        <p>Enable instant, fee-less transactions for content creators, IoT devices, and digital services.</p>
                      </div>
                    </div>
                    
                    <div className="application-item">
                      <div className="application-icon">
                        <i className="fas fa-cubes"></i>
                      </div>
                      <div className="application-content">
                        <h4>Supply Chain</h4>
                        <p>Track products from manufacture to delivery with immutable, real-time updates across complex networks.</p>
                      </div>
                    </div>
                    
                    <div className="application-item">
                      <div className="application-icon">
                        <i className="fas fa-file-contract"></i>
                      </div>
                      <div className="application-content">
                        <h4>Smart Contracts</h4>
                        <p>Execute complex agreements with higher throughput and lower fees than traditional blockchain platforms.</p>
                      </div>
                    </div>
                    
                    <div className="application-item">
                      <div className="application-icon">
                        <i className="fas fa-laptop-code"></i>
                      </div>
                      <div className="application-content">
                        <h4>Decentralized Apps</h4>
                        <p>Build responsive dApps that can handle millions of users without congestion or high fees.</p>
                      </div>
                    </div>
                    
                    <div className="application-item">
                      <div className="application-icon">
                        <i className="fas fa-vote-yea"></i>
                      </div>
                      <div className="application-content">
                        <h4>Voting Systems</h4>
                        <p>Create secure, transparent voting platforms that can handle national-scale elections.</p>
                      </div>
                    </div>
                    
                    <div className="application-item">
                      <div className="application-icon">
                        <i className="fas fa-robot"></i>
                      </div>
                      <div className="application-content">
                        <h4>IoT Networks</h4>
                        <p>Connect billions of devices with secure, verifiable communication and micropayment capabilities.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>Roadmap for BlockDAG Technology</h3>
                </div>
                <div className="card-body">
                  <div className="roadmap">
                    <div className="roadmap-item">
                      <div className="roadmap-marker current"></div>
                      <div className="roadmap-content">
                        <h4>Phase 1: Mobile Mining Network</h4>
                        <p>Establish a global network of mobile miners using the X1 app, creating the foundation for a truly decentralized BlockDAG.</p>
                        <span className="roadmap-date">Current Phase</span>
                      </div>
                    </div>
                    
                    <div className="roadmap-item">
                      <div className="roadmap-marker"></div>
                      <div className="roadmap-content">
                        <h4>Phase 2: Smart Contract Platform</h4>
                        <p>Implement a secure, efficient smart contract layer that leverages the high throughput of the BlockDAG structure.</p>
                        <span className="roadmap-date">Q3 2023</span>
                      </div>
                    </div>
                    
                    <div className="roadmap-item">
                      <div className="roadmap-marker"></div>
                      <div className="roadmap-content">
                        <h4>Phase 3: Cross-Chain Integration</h4>
                        <p>Develop bridges to other blockchain networks, enabling seamless asset transfers and interoperability.</p>
                        <span className="roadmap-date">Q1 2024</span>
                      </div>
                    </div>
                    
                    <div className="roadmap-item">
                      <div className="roadmap-marker"></div>
                      <div className="roadmap-content">
                        <h4>Phase 4: Enterprise Solutions</h4>
                        <p>Create specialized BlockDAG implementations for industries like supply chain, healthcare, and finance.</p>
                        <span className="roadmap-date">Q3 2024</span>
                      </div>
                    </div>
                    
                    <div className="roadmap-item">
                      <div className="roadmap-marker"></div>
                      <div className="roadmap-content">
                        <h4>Phase 5: Global Adoption</h4>
                        <p>Achieve mainstream adoption with millions of active nodes and integration with everyday applications and services.</p>
                        <span className="roadmap-date">2025 and beyond</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnDag;
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './DagVisualizer.css';

const DagVisualizer = () => {
  const svgRef = useRef(null);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dag');
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        const data = await response.json();
        if (!data || !data.blocks) {
          throw new Error('Invalid data format received from API');
        }
        setBlocks(data.blocks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching DAG data:', error);
        // Use mock data if API fails
        try {
          const mockResponse = await fetch('/mockData/dagBlocks.json');
          if (!mockResponse.ok) {
            throw new Error(`Mock data fetch failed with status: ${mockResponse.status}`);
          }
          const mockData = await mockResponse.json();
          if (!mockData || !mockData.blocks) {
            throw new Error('Invalid mock data format');
          }
          console.log('Using mock data as fallback');
          setBlocks(mockData.blocks);
        } catch (mockError) {
          console.error('Error fetching mock data:', mockError);
          // Provide hardcoded fallback data if even mock data fails
          setBlocks([
            {
              id: "block1",
              hash: "0x1a2b3c4d5e6f7g8h9i0j",
              timestamp: 1623456789,
              miner: "0xabcdef1234567890",
              size: 1024,
              transactions: 15,
              parents: [],
              children: ["block2"],
              status: "confirmed",
              depth: 0,
              position: {x: 100, y: 100}
            },
            {
              id: "block2",
              hash: "0x2b3c4d5e6f7g8h9i0j1",
              timestamp: 1623456890,
              miner: "0x1234567890abcdef",
              size: 1536,
              transactions: 22,
              parents: ["block1"],
              children: [],
              status: "confirmed",
              depth: 1,
              position: {x: 200, y: 100}
            }
          ]);
        }
        setLoading(false);
      }
    };

    fetchData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      setBlocks(prevBlocks => {
        // Randomly update a block's status or add a new block
        const updatedBlocks = [...prevBlocks];
        const randomIndex = Math.floor(Math.random() * updatedBlocks.length);
        
        // 20% chance to add a new block
        if (Math.random() < 0.2) {
          const lastBlock = updatedBlocks[updatedBlocks.length - 1];
          const newBlockId = `block${parseInt(lastBlock.id.replace('block', '')) + 1}`;
          const parentBlock = updatedBlocks[Math.floor(Math.random() * updatedBlocks.length)];
          
          const newBlock = {
            id: newBlockId,
            hash: `0x${Math.random().toString(16).substr(2, 20)}`,
            timestamp: Math.floor(Date.now() / 1000),
            miner: parentBlock.miner,
            size: Math.floor(Math.random() * 1000) + 500,
            transactions: Math.floor(Math.random() * 20) + 5,
            parents: [parentBlock.id],
            children: [],
            status: 'pending',
            depth: parentBlock.depth + 1,
            position: {
              x: parentBlock.position.x + 100,
              y: parentBlock.position.y + (Math.random() * 100 - 50)
            }
          };
          
          // Update parent's children
          const parentIndex = updatedBlocks.findIndex(block => block.id === parentBlock.id);
          if (parentIndex !== -1) {
            updatedBlocks[parentIndex].children.push(newBlockId);
          }
          
          return [...updatedBlocks, newBlock];
        } else {
          // Update a random block's status
          if (updatedBlocks[randomIndex].status === 'pending') {
            updatedBlocks[randomIndex].status = 'confirmed';
          }
          return updatedBlocks;
        }
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loading || blocks.length === 0) return;

    const filteredBlocks = filterStatus === 'all' 
      ? blocks 
      : blocks.filter(block => block.status === filterStatus);

    const width = 1000;
    const height = 600;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%");

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);

    // Create a group for all elements
    const g = svg.append("g");

    // Draw edges (connections between blocks)
    filteredBlocks.forEach(block => {
      block.parents.forEach(parentId => {
        const parent = filteredBlocks.find(b => b.id === parentId);
        if (parent) {
          const line = g.append("line")
            .attr("x1", parent.position.x)
            .attr("y1", parent.position.y)
            .attr("x2", block.position.x)
            .attr("y2", block.position.y)
            .attr("stroke", getEdgeColor(block.status, parent.status))
            .attr("stroke-width", 2)
            .attr("marker-end", "url(#arrowhead)")
            .attr("class", "edge");
        }
      });
    });

    // Add arrowhead marker
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 8)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#6d6d6d");

    // Draw nodes (blocks)
    const nodes = g.selectAll(".node")
      .data(filteredBlocks)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.position.x}, ${d.position.y})`);

    // Add block circles
    nodes.append("circle")
      .attr("r", d => getNodeRadius(d))
      .attr("fill", d => getNodeColor(d.status))
      .attr("stroke", d => getNodeStrokeColor(d.status))
      .attr("stroke-width", 2)
      .attr("class", d => `block-node ${d.status}`)
      .on("click", (event, d) => {
        setSelectedBlock(d);
        event.stopPropagation();
      });

    // Add block labels
    nodes.append("text")
      .text(d => d.id.replace('block', ''))
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("font-size", "10px")
      .attr("fill", "white");

    // Clear selection when clicking on the background
    svg.on("click", () => {
      setSelectedBlock(null);
    });

    // Initial zoom to fit all nodes
    const initialTransform = d3.zoomIdentity.scale(0.8).translate(width / 4, height / 4);
    svg.call(zoom.transform, initialTransform);

  }, [blocks, loading, filterStatus]);

  const getNodeRadius = (block) => {
    // Base size on number of transactions
    const baseSize = 15;
    const txFactor = Math.min(block.transactions / 10, 1.5);
    return baseSize * (1 + txFactor * 0.5);
  };

  const getNodeColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10b981'; // Green
      case 'pending': return '#f59e0b';   // Amber
      case 'orphan': return '#ef4444';    // Red
      default: return '#6d28d9';          // Purple
    }
  };

  const getNodeStrokeColor = (status) => {
    switch (status) {
      case 'confirmed': return '#059669'; // Darker green
      case 'pending': return '#d97706';   // Darker amber
      case 'orphan': return '#b91c1c';    // Darker red
      default: return '#5b21b6';          // Darker purple
    }
  };

  const getEdgeColor = (blockStatus, parentStatus) => {
    if (blockStatus === 'orphan' || parentStatus === 'orphan') {
      return '#ef4444'; // Red for orphan connections
    }
    if (blockStatus === 'pending' || parentStatus === 'pending') {
      return '#f59e0b'; // Amber for pending connections
    }
    return '#6d28d9'; // Purple for confirmed connections
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleZoomIn = () => {
    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom().scaleExtent([0.1, 3]);
    svg.transition().call(zoom.scaleBy, 1.2);
  };

  const handleZoomOut = () => {
    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom().scaleExtent([0.1, 3]);
    svg.transition().call(zoom.scaleBy, 0.8);
  };

  const handleReset = () => {
    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom().scaleExtent([0.1, 3]);
    const width = 1000;
    const height = 600;
    const initialTransform = d3.zoomIdentity.scale(0.8).translate(width / 4, height / 4);
    svg.transition().call(zoom.transform, initialTransform);
  };

  return (
    <div className="dag-visualizer-container">
      <div className="visualizer-header">
        <h1 className="page-title">DAG Visualizer</h1>
        
        <div className="controls">
          <div className="filter-control">
            <label htmlFor="status-filter">Filter by Status:</label>
            <select 
              id="status-filter" 
              value={filterStatus} 
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="all">All Blocks</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="orphan">Orphan</option>
            </select>
          </div>
          
          <div className="zoom-controls">
            <button onClick={handleZoomIn} className="zoom-btn">
              <i className="fas fa-search-plus"></i>
            </button>
            <button onClick={handleReset} className="zoom-btn">
              <i className="fas fa-compress-arrows-alt"></i>
            </button>
            <button onClick={handleZoomOut} className="zoom-btn">
              <i className="fas fa-search-minus"></i>
            </button>
            <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
          </div>
        </div>
      </div>

      <div className="visualizer-content">
        <div className="dag-canvas">
          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Loading DAG data...</p>
            </div>
          ) : (
            <svg ref={svgRef} className="dag-svg"></svg>
          )}
        </div>

        <div className={`block-details ${selectedBlock ? 'active' : ''}`}>
          {selectedBlock ? (
            <>
              <h3 className="details-title">Block Details</h3>
              <div className="details-content">
                <div className="detail-item">
                  <span className="detail-label">ID:</span>
                  <span className="detail-value">{selectedBlock.id}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Hash:</span>
                  <span className="detail-value hash">{selectedBlock.hash}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status ${selectedBlock.status}`}>
                    {selectedBlock.status.charAt(0).toUpperCase() + selectedBlock.status.slice(1)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Timestamp:</span>
                  <span className="detail-value">{formatTimestamp(selectedBlock.timestamp)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Miner:</span>
                  <span className="detail-value">{selectedBlock.miner}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Size:</span>
                  <span className="detail-value">{selectedBlock.size} bytes</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Transactions:</span>
                  <span className="detail-value">{selectedBlock.transactions}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Depth:</span>
                  <span className="detail-value">{selectedBlock.depth}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Parents:</span>
                  <span className="detail-value">
                    {selectedBlock.parents.length > 0 
                      ? selectedBlock.parents.join(', ') 
                      : 'Genesis Block'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Children:</span>
                  <span className="detail-value">
                    {selectedBlock.children.length > 0 
                      ? selectedBlock.children.join(', ') 
                      : 'None'}
                  </span>
                </div>
              </div>
              <button className="close-details" onClick={() => setSelectedBlock(null)}>
                <i className="fas fa-times"></i>
              </button>
            </>
          ) : (
            <div className="no-selection">
              <i className="fas fa-info-circle"></i>
              <p>Select a block to view details</p>
            </div>
          )}
        </div>
      </div>

      <div className="legend">
        <h3 className="legend-title">Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color confirmed"></span>
            <span className="legend-label">Confirmed</span>
          </div>
          <div className="legend-item">
            <span className="legend-color pending"></span>
            <span className="legend-label">Pending</span>
          </div>
          <div className="legend-item">
            <span className="legend-color orphan"></span>
            <span className="legend-label">Orphan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DagVisualizer;
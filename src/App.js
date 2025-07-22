import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import SplashScreen from './components/SplashScreen';

// Pages
import Home from './pages/Home';
import DagVisualizer from './pages/DagVisualizer';
import MinerDashboard from './pages/MinerDashboard';
import AiInsights from './pages/AiInsights';
import LearnDag from './pages/LearnDag';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  const handleSplashFinished = () => {
    setShowSplash(false);
  };

  return (
    <div className="app">
      {showSplash ? (
        <SplashScreen onFinished={handleSplashFinished} />
      ) : (
        <>
          <Navbar />
          <div className="main-container">
            <Sidebar />
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/visualizer" element={<DagVisualizer />} />
                <Route path="/miner" element={<MinerDashboard />} />
                <Route path="/insights" element={<AiInsights />} />
                <Route path="/learn" element={<LearnDag />} />
              </Routes>
            </main>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
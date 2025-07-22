const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Get all general insights
router.get('/', (req, res) => {
  try {
    const insightsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/insights.json'), 'utf8'));
    res.json(insightsData.general);
  } catch (error) {
    console.error('Error reading insights data:', error);
    res.status(500).json({ message: 'Error fetching insights data' });
  }
});

// Get personalized insights for a specific miner
router.get('/:wallet', (req, res) => {
  try {
    const insightsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/insights.json'), 'utf8'));
    const wallet = req.params.wallet.toLowerCase();
    
    // Find the exact wallet match or return empty insights if not found
    const personalInsights = insightsData.personalized[wallet] || [];
    
    // Combine general and personalized insights
    const combinedInsights = [
      ...insightsData.general,
      ...personalInsights
    ].sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp, newest first
    
    res.json(combinedInsights);
  } catch (error) {
    console.error('Error reading personalized insights data:', error);
    res.status(500).json({ message: 'Error fetching personalized insights data' });
  }
});

// Get insights by type (network, performance, activity, etc.)
router.get('/type/:type', (req, res) => {
  try {
    const insightsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/insights.json'), 'utf8'));
    const type = req.params.type.toLowerCase();
    
    // Filter general insights by type
    const filteredInsights = insightsData.general.filter(insight => 
      insight.type.toLowerCase() === type
    );
    
    res.json(filteredInsights);
  } catch (error) {
    console.error('Error reading insights by type:', error);
    res.status(500).json({ message: 'Error fetching insights by type' });
  }
});

// Get insights by severity (info, warning, success, etc.)
router.get('/severity/:severity', (req, res) => {
  try {
    const insightsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/insights.json'), 'utf8'));
    const severity = req.params.severity.toLowerCase();
    
    // Filter general insights by severity
    const filteredInsights = insightsData.general.filter(insight => 
      insight.severity.toLowerCase() === severity
    );
    
    res.json(filteredInsights);
  } catch (error) {
    console.error('Error reading insights by severity:', error);
    res.status(500).json({ message: 'Error fetching insights by severity' });
  }
});

// Get personalized insights by type for a specific miner
router.get('/:wallet/type/:type', (req, res) => {
  try {
    const insightsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/insights.json'), 'utf8'));
    const wallet = req.params.wallet.toLowerCase();
    const type = req.params.type.toLowerCase();
    
    // Find the wallet's personalized insights
    const personalInsights = insightsData.personalized[wallet] || [];
    
    // Filter by type
    const filteredInsights = personalInsights.filter(insight => 
      insight.type.toLowerCase() === type
    );
    
    res.json(filteredInsights);
  } catch (error) {
    console.error('Error reading personalized insights by type:', error);
    res.status(500).json({ message: 'Error fetching personalized insights by type' });
  }
});

module.exports = router;
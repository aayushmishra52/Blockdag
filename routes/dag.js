const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Get all DAG blocks
router.get('/', (req, res) => {
  try {
    const dagData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/dagBlocks.json'), 'utf8'));
    res.json(dagData);
  } catch (error) {
    console.error('Error reading DAG data:', error);
    res.status(500).json({ message: 'Error fetching DAG data' });
  }
});

// Get a specific block by ID
router.get('/block/:id', (req, res) => {
  try {
    const dagData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/dagBlocks.json'), 'utf8'));
    const block = dagData.blocks.find(block => block.id === req.params.id);
    
    if (!block) {
      return res.status(404).json({ message: 'Block not found' });
    }
    
    res.json(block);
  } catch (error) {
    console.error('Error reading DAG data:', error);
    res.status(500).json({ message: 'Error fetching block data' });
  }
});

// Get DAG metadata
router.get('/metadata', (req, res) => {
  try {
    const dagData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/dagBlocks.json'), 'utf8'));
    res.json(dagData.metadata);
  } catch (error) {
    console.error('Error reading DAG metadata:', error);
    res.status(500).json({ message: 'Error fetching DAG metadata' });
  }
});

// Get blocks by status (confirmed, pending, orphan)
router.get('/status/:status', (req, res) => {
  try {
    const dagData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/dagBlocks.json'), 'utf8'));
    const filteredBlocks = dagData.blocks.filter(block => block.status === req.params.status);
    
    res.json({
      status: req.params.status,
      count: filteredBlocks.length,
      blocks: filteredBlocks
    });
  } catch (error) {
    console.error('Error reading DAG data:', error);
    res.status(500).json({ message: 'Error fetching blocks by status' });
  }
});

module.exports = router;
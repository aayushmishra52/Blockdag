const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Get all miners
router.get('/', (req, res) => {
  try {
    const minerData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/minerStats.json'), 'utf8'));
    res.json(minerData);
  } catch (error) {
    console.error('Error reading miner data:', error);
    res.status(500).json({ message: 'Error fetching miner data' });
  }
});

// Get a specific miner by wallet address
router.get('/:wallet', (req, res) => {
  try {
    const minerData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/minerStats.json'), 'utf8'));
    const miner = minerData.miners.find(miner => miner.wallet.toLowerCase() === req.params.wallet.toLowerCase());
    
    if (!miner) {
      return res.status(404).json({ message: 'Miner not found' });
    }
    
    res.json(miner);
  } catch (error) {
    console.error('Error reading miner data:', error);
    res.status(500).json({ message: 'Error fetching miner data' });
  }
});

// Get miner network stats
router.get('/stats/network', (req, res) => {
  try {
    const minerData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/minerStats.json'), 'utf8'));
    res.json(minerData.networkStats);
  } catch (error) {
    console.error('Error reading miner network stats:', error);
    res.status(500).json({ message: 'Error fetching miner network stats' });
  }
});

// Get miner rewards history
router.get('/:wallet/rewards', (req, res) => {
  try {
    const minerData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/minerStats.json'), 'utf8'));
    const miner = minerData.miners.find(miner => miner.wallet.toLowerCase() === req.params.wallet.toLowerCase());
    
    if (!miner) {
      return res.status(404).json({ message: 'Miner not found' });
    }
    
    res.json({
      wallet: miner.wallet,
      nickname: miner.nickname,
      totalEarned: miner.bdagEarned,
      rewardsHistory: miner.rewardsHistory
    });
  } catch (error) {
    console.error('Error reading miner rewards data:', error);
    res.status(500).json({ message: 'Error fetching miner rewards data' });
  }
});

// Get miner activity periods
router.get('/:wallet/activity', (req, res) => {
  try {
    const minerData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/minerStats.json'), 'utf8'));
    const miner = minerData.miners.find(miner => miner.wallet.toLowerCase() === req.params.wallet.toLowerCase());
    
    if (!miner) {
      return res.status(404).json({ message: 'Miner not found' });
    }
    
    res.json({
      wallet: miner.wallet,
      nickname: miner.nickname,
      uptimePercentage: miner.uptimePercentage,
      lastActive: miner.lastActive,
      activityPeriods: miner.activityPeriods
    });
  } catch (error) {
    console.error('Error reading miner activity data:', error);
    res.status(500).json({ message: 'Error fetching miner activity data' });
  }
});

module.exports = router;
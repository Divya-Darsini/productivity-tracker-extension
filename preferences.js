const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get blocklist
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ blocklist: user.blocklist || [] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update blocklist
router.post('/', auth, async (req, res) => {
  try {
    const { blocklist } = req.body;
    const user = await User.findById(req.userId);
    user.blocklist = blocklist || [];
    await user.save();
    res.json({ message: 'Blocklist updated', blocklist: user.blocklist });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

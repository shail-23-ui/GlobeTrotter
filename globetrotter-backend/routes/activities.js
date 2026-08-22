const express = require('express');
const Activity = require('../models/Activity');

const router = express.Router();

// SEARCH ACTIVITIES
router.get('/', async (req, res) => {
  try {
    const { cityId, category, maxCost } = req.query;
    const filter = {};

    if (cityId) filter.cityId = cityId;
    if (category) filter.category = category;
    if (maxCost) filter.cost = { $lte: Number(maxCost) };

    const activities = await Activity.find(filter);
    res.json(activities);
  } catch (err) {
    console.error('Activity search error:', err);
    res.status(500).json({ error: 'Something went wrong searching activities' });
  }
});

module.exports = router;

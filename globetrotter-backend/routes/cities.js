const express = require('express');
const City = require('../models/City');

const router = express.Router();

// SEARCH CITIES
router.get('/', async (req, res) => {
  try {
    const { search, country, region } = req.query;
    const filter = {};

    if (search) filter.name = { $regex: search, $options: 'i' };
    if (country) filter.country = country;
    if (region) filter.region = region;

    const cities = await City.find(filter).sort({ popularity: -1 });
    res.json(cities);
  } catch (err) {
    console.error('City search error:', err);
    res.status(500).json({ error: 'Something went wrong searching cities' });
  }
});

module.exports = router;

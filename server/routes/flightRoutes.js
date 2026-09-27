const express = require('express');
const router = express.Router();
const seedData = require('../seed/data');

// Get all destinations (Popular destinations list)
router.get('/destinations', (req, res) => {
  const { filter } = req.query;
  let list = seedData.destinations;
  if (filter && filter !== 'All') {
    list = list.filter(d => d.tag.toLowerCase() === filter.toLowerCase());
  }
  res.json({ success: true, count: list.length, data: list });
});

// Search flights
router.get('/flights/search', (req, res) => {
  const { from, to, date, cabinClass } = req.query;
  let results = [...seedData.flights];

  if (from) {
    const fromLower = from.toLowerCase();
    results = results.filter(f => 
      f.from.city.toLowerCase().includes(fromLower) || 
      f.from.code.toLowerCase().includes(fromLower)
    );
  }

  if (to) {
    const toLower = to.toLowerCase();
    results = results.filter(f => 
      f.to.city.toLowerCase().includes(toLower) || 
      f.to.code.toLowerCase().includes(toLower)
    );
  }

  if (cabinClass && cabinClass !== 'Any') {
    results = results.filter(f => f.cabinClass.toLowerCase() === cabinClass.toLowerCase());
  }

  // If no exact match found due to mock parameters, return all flights for demo convenience
  if (results.length === 0) {
    results = seedData.flights;
  }

  res.json({ success: true, count: results.length, data: results });
});

// Get flight by ID
router.get('/flights/:id', (req, res) => {
  const flight = seedData.flights.find(f => f.id === req.params.id);
  if (!flight) {
    return res.status(404).json({ success: false, message: 'Flight not found' });
  }
  res.json({ success: true, data: flight });
});

module.exports = router;

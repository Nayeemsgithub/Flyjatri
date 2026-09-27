const express = require('express');
const router = express.Router();
const seedData = require('../seed/data');

// Get all hotels or search
router.get('/', (req, res) => {
  const { city } = req.query;
  let hotels = [...seedData.hotels];

  if (city) {
    hotels = hotels.filter(h => 
      h.city.toLowerCase().includes(city.toLowerCase()) ||
      h.country.toLowerCase().includes(city.toLowerCase())
    );
  }

  res.json({ success: true, count: hotels.length, data: hotels });
});

// Get hotel by ID
router.get('/:id', (req, res) => {
  const hotel = seedData.hotels.find(h => h.id === req.params.id);
  if (!hotel) {
    return res.status(404).json({ success: false, message: 'Hotel not found' });
  }
  res.json({ success: true, data: hotel });
});

module.exports = router;

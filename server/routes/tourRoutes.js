const express = require('express');
const router = express.Router();
const seedData = require('../seed/data');

// Get all tour packages
router.get('/', (req, res) => {
  const { destination, featured } = req.query;
  let tours = [...seedData.tourPackages];

  if (destination) {
    const destLower = destination.toLowerCase();
    tours = tours.filter(t => 
      t.destination.toLowerCase().includes(destLower) || 
      t.title.toLowerCase().includes(destLower)
    );
  }

  if (featured === 'true') {
    tours = tours.filter(t => t.specialOffer);
  }

  res.json({ success: true, count: tours.length, data: tours });
});

// Get tour by ID
router.get('/:id', (req, res) => {
  const tour = seedData.tourPackages.find(t => t.id === req.params.id);
  if (!tour) {
    return res.status(404).json({ success: false, message: 'Tour package not found' });
  }
  res.json({ success: true, data: tour });
});

module.exports = router;

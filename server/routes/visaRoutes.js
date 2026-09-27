const express = require('express');
const router = express.Router();
const seedData = require('../seed/data');

// Get all visa services
router.get('/', (req, res) => {
  const { country } = req.query;
  let list = [...seedData.visaServices];

  if (country) {
    const q = country.toLowerCase();
    list = list.filter(v => 
      v.country.toLowerCase().includes(q) || 
      v.code.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: list.length, data: list });
});

// Get visa service by ID or Code
router.get('/:id', (req, res) => {
  const visa = seedData.visaServices.find(
    v => v.id === req.params.id || v.code.toLowerCase() === req.params.id.toLowerCase()
  );
  if (!visa) {
    return res.status(404).json({ success: false, message: 'Visa service information not found' });
  }
  res.json({ success: true, data: visa });
});

module.exports = router;

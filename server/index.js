const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database (MongoDB or In-Memory fallback)
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flightRoutes');
const tourRoutes = require('./routes/tourRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const visaRoutes = require('./routes/visaRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const seedData = require('./seed/data');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', flightRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/visa', visaRoutes);
app.use('/api/bookings', bookingRoutes);

// Offers & General endpoints
app.get('/api/offers', (req, res) => {
  res.json({ success: true, count: seedData.offers.length, data: seedData.offers });
});

// Root Health & API Explorer
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'FlyJatri MERN Travel API',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/api/destinations',
      '/api/flights/search',
      '/api/tours',
      '/api/hotels',
      '/api/visa',
      '/api/offers',
      '/api/bookings',
      '/api/auth/login'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`✈️ FlyJatri Travel API Server running on port ${PORT}`);
});

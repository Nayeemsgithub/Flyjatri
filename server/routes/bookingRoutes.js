const express = require('express');
const router = express.Router();

// Mock store for bookings
const bookings = [
  {
    bookingId: 'BK-2026-9812',
    type: 'flight',
    itemTitle: 'Flight BG-147 (Dhaka to Dubai)',
    primaryPassenger: {
      name: 'Traveler Demo',
      email: 'demo@flyjatri.com',
      phone: '+880 1712 345678'
    },
    travelDate: '25 Sep 2026',
    returnDate: '26 Sep 2026',
    seats: 1,
    totalAmount: 482,
    currency: 'USD',
    paymentMethod: 'bKash Online',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    createdAt: new Date().toISOString()
  }
];

// Create new booking
router.post('/', (req, res) => {
  const { type, item, passenger, travelDate, returnDate, guests, totalAmount, currency, paymentMethod } = req.body;

  if (!passenger || !passenger.name || !passenger.email) {
    return res.status(400).json({ success: false, message: 'Primary passenger details are required.' });
  }

  const bookingId = `FJ-${Date.now().toString().slice(-6)}`;
  const newBooking = {
    bookingId,
    type: type || 'flight',
    itemTitle: item?.title || item?.airline ? `${item?.airline} (${item?.from?.city} -> ${item?.to?.city})` : 'Travel Booking',
    itemDetails: item,
    primaryPassenger: passenger,
    travelDate: travelDate || new Date().toISOString().split('T')[0],
    returnDate: returnDate || '',
    seats: guests || 1,
    totalAmount: totalAmount || (item?.price ? item.price : 0),
    currency: currency || 'USD',
    paymentMethod: paymentMethod || 'Online Payment',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);

  res.status(201).json({
    success: true,
    message: 'Booking successfully confirmed!',
    data: newBooking
  });
});

// Get user bookings
router.get('/my-bookings', (req, res) => {
  const email = req.query.email;
  let list = bookings;
  if (email) {
    list = bookings.filter(b => b.primaryPassenger.email.toLowerCase() === email.toLowerCase());
  }
  res.json({ success: true, count: list.length, data: list });
});

// Get single booking by ID
router.get('/:id', (req, res) => {
  const booking = bookings.find(b => b.bookingId === req.params.id);
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking reference not found' });
  }
  res.json({ success: true, data: booking });
});

module.exports = router;

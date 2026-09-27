import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Fallback seed data in case API server is unreachable on static deployments (e.g. Vercel)
const fallbackData = {
  destinations: [
    {
      id: 'dest-1',
      name: 'Dubai',
      country: 'United Arab Emirates',
      code: 'DXB',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      price: '$ 482',
      tag: 'International'
    },
    {
      id: 'dest-2',
      name: 'Singapore',
      country: 'Singapore',
      code: 'SIN',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
      price: '$ 620',
      tag: 'International'
    },
    {
      id: 'dest-3',
      name: 'Bangkok',
      country: 'Thailand',
      code: 'BKK',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
      price: '$ 398',
      tag: 'International'
    },
    {
      id: 'dest-4',
      name: "Cox's Bazar",
      country: 'Bangladesh',
      code: 'CXB',
      image: 'https://images.unsplash.com/photo-1628178822394-43cb4d122244?auto=format&fit=crop&w=800&q=80',
      price: '৳ 12,500',
      tag: 'Domestic'
    }
  ],
  flights: [
    {
      id: 'FL-001',
      airline: 'Biman Bangladesh Airlines',
      flightNumber: 'BG-147',
      from: { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' },
      to: { city: 'Dubai', code: 'DXB', airport: 'Dubai International' },
      departureTime: '08:30 AM',
      arrivalTime: '12:15 PM',
      duration: '5h 45m',
      stops: 'Non-stop',
      stopCount: 0,
      price: 482,
      refundable: true,
      baggage: '30 kg Check-in + 7 kg Cabin',
      aircraft: 'Boeing 787-8 Dreamliner',
      availableSeats: 18,
      cabinClass: 'Economy'
    },
    {
      id: 'FL-002',
      airline: 'Emirates',
      flightNumber: 'EK-583',
      from: { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' },
      to: { city: 'Dubai', code: 'DXB', airport: 'Dubai International' },
      departureTime: '10:15 AM',
      arrivalTime: '01:45 PM',
      duration: '5h 30m',
      stops: 'Non-stop',
      stopCount: 0,
      price: 520,
      refundable: true,
      baggage: '35 kg Check-in + 7 kg Cabin',
      aircraft: 'Boeing 777-300ER',
      availableSeats: 24,
      cabinClass: 'Economy'
    },
    {
      id: 'FL-003',
      airline: 'Singapore Airlines',
      flightNumber: 'SQ-447',
      from: { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' },
      to: { city: 'Singapore', code: 'SIN', airport: 'Changi Airport' },
      departureTime: '11:55 PM',
      arrivalTime: '06:05 AM',
      duration: '4h 10m',
      stops: 'Non-stop',
      stopCount: 0,
      price: 620,
      refundable: true,
      baggage: '30 kg Check-in + 7 kg Cabin',
      aircraft: 'Airbus A350-900',
      availableSeats: 12,
      cabinClass: 'Economy'
    },
    {
      id: 'FL-004',
      airline: 'US-Bangla Airlines',
      flightNumber: 'BS-217',
      from: { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' },
      to: { city: 'Bangkok', code: 'BKK', airport: 'Suvarnabhumi Airport' },
      departureTime: '09:20 AM',
      arrivalTime: '12:50 PM',
      duration: '2h 30m',
      stops: 'Non-stop',
      stopCount: 0,
      price: 398,
      refundable: true,
      baggage: '25 kg Check-in + 7 kg Cabin',
      aircraft: 'Boeing 737-800',
      availableSeats: 30,
      cabinClass: 'Economy'
    },
    {
      id: 'FL-005',
      airline: 'US-Bangla Airlines',
      flightNumber: 'BS-141',
      from: { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' },
      to: { city: "Cox's Bazar", code: 'CXB', airport: "Cox's Bazar Domestic" },
      departureTime: '11:00 AM',
      arrivalTime: '12:05 PM',
      duration: '1h 05m',
      stops: 'Non-stop',
      stopCount: 0,
      price: 58,
      priceBDT: 6500,
      refundable: true,
      baggage: '20 kg Check-in + 7 kg Cabin',
      aircraft: 'ATR 72-600',
      availableSeats: 15,
      cabinClass: 'Economy'
    }
  ],
  tours: [
    {
      id: 'tour-1',
      title: 'Maldives Escape - Luxury Overwater Villa',
      destination: 'Maldives',
      duration: '6 Days / 5 Nights',
      price: 1250,
      originalPrice: 1599,
      discount: '22% Off',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
      rating: 4.9,
      reviewsCount: 142,
      features: ['Flight Included', '5-Star Resort Hotel', 'Speedboat Transfers', 'All Breakfasts & Dinners']
    },
    {
      id: 'tour-2',
      title: "Cox's Bazar 5-Star Beach Haven & Marine Drive",
      destination: "Cox's Bazar",
      duration: '4 Days / 3 Nights',
      price: 180,
      priceBDT: 21500,
      discount: '25% Off',
      image: 'https://images.unsplash.com/photo-1628178822394-43cb4d122244?auto=format&fit=crop&w=1200&q=80',
      rating: 4.8,
      reviewsCount: 98,
      features: ['Flight Included', 'Sea View Room at Sayeman Resort', 'Private AC Vehicle']
    },
    {
      id: 'tour-3',
      title: 'Dubai Wonders, Burj Khalifa & Desert Safari',
      destination: 'Dubai',
      duration: '5 Days / 4 Nights',
      price: 780,
      discount: '18% Off',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      rating: 4.9,
      reviewsCount: 165,
      features: ['Burj Khalifa 124th Floor', 'Desert Safari with BBQ', 'Marina Dhow Cruise']
    }
  ],
  hotels: [
    {
      id: 'htl-1',
      name: 'Burj Al Arab Jumeirah',
      city: 'Dubai',
      country: 'United Arab Emirates',
      rating: 5,
      pricePerNight: 950,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      amenities: ['Private Beach', 'Infinity Pool', 'Helipad', 'Butler Service', 'Spa']
    },
    {
      id: 'htl-2',
      name: "Sayeman Beach Resort",
      city: "Cox's Bazar",
      country: 'Bangladesh',
      rating: 5,
      pricePerNight: 95,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      amenities: ['Infinity Sea-view Pool', 'Private Beach Access', 'Seafood Restaurant', 'Gym']
    }
  ],
  visas: [
    {
      id: 'visa-1',
      country: 'United Arab Emirates (Dubai)',
      flag: '🇦🇪',
      processingTime: '2 - 3 Working Days',
      price: 95,
      types: ['Tourist Visa (30 Days)', 'Tourist Visa (60 Days)', 'Express Visa (24 Hours)'],
      requirements: ['Valid Passport', 'Scanned Color Copy', 'White Background Photo', 'Return Air Ticket']
    },
    {
      id: 'visa-2',
      country: 'Thailand',
      flag: '🇹🇭',
      processingTime: '4 - 5 Working Days',
      price: 65,
      types: ['Single Entry Tourist Visa', 'Multiple Entry'],
      requirements: ['Original Passport', 'Bank Statement (6 Months)', 'Bank Solvency', 'Recent Photos']
    },
    {
      id: 'visa-3',
      country: 'Singapore',
      flag: '🇸🇬',
      processingTime: '3 - 4 Working Days',
      price: 75,
      types: ['E-Visa Tourist', 'Business Visa'],
      requirements: ['Passport Copy', 'Bank Statement', 'Form 14A', 'Hotel Reservation']
    }
  ]
};

export const flightService = {
  getDestinations: async (filter) => {
    try {
      return await api.get('/destinations', { params: { filter } });
    } catch {
      return { data: { data: fallbackData.destinations } };
    }
  },
  searchFlights: async (params) => {
    try {
      return await api.get('/flights/search', { params });
    } catch {
      return { data: { data: fallbackData.flights } };
    }
  },
  getFlightById: (id) => api.get(`/flights/${id}`)
};

export const tourService = {
  getTours: async (params) => {
    try {
      return await api.get('/tours', { params });
    } catch {
      return { data: { data: fallbackData.tours } };
    }
  },
  getTourById: (id) => api.get(`/tours/${id}`)
};

export const hotelService = {
  getHotels: async (params) => {
    try {
      return await api.get('/hotels', { params });
    } catch {
      return { data: { data: fallbackData.hotels } };
    }
  },
  getHotelById: (id) => api.get(`/hotels/${id}`)
};

export const visaService = {
  getVisaServices: async (params) => {
    try {
      return await api.get('/visa', { params });
    } catch {
      return { data: { data: fallbackData.visas } };
    }
  },
  getVisaById: (id) => api.get(`/visa/${id}`)
};

export const bookingService = {
  createBooking: async (bookingData) => {
    try {
      return await api.post('/bookings', bookingData);
    } catch {
      const fallbackBooking = {
        bookingId: `FJ-${Date.now().toString().slice(-6)}`,
        itemTitle: bookingData.item?.title || bookingData.item?.airline ? `${bookingData.item?.airline} (${bookingData.item?.from?.city} ➔ ${bookingData.item?.to?.city})` : 'Travel Booking',
        primaryPassenger: bookingData.passenger,
        travelDate: bookingData.travelDate || '2026-09-25',
        totalAmount: bookingData.totalAmount || 482,
        currency: 'USD',
        paymentMethod: bookingData.paymentMethod || 'bKash Online',
        bookingStatus: 'Confirmed',
        createdAt: new Date().toISOString()
      };
      return { data: { success: true, data: fallbackBooking } };
    }
  },
  getMyBookings: async (email) => {
    try {
      return await api.get('/bookings/my-bookings', { params: { email } });
    } catch {
      return { data: { data: [] } };
    }
  },
  getBookingById: (id) => api.get(`/bookings/${id}`)
};

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me')
};

export default api;

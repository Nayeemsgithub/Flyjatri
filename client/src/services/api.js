import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept request to add token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('flyjatri_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const flightService = {
  getDestinations: (filter) => api.get('/destinations', { params: { filter } }),
  searchFlights: (params) => api.get('/flights/search', { params }),
  getFlightById: (id) => api.get(`/flights/${id}`)
};

export const tourService = {
  getTours: (params) => api.get('/tours', { params }),
  getTourById: (id) => api.get(`/tours/${id}`)
};

export const hotelService = {
  getHotels: (params) => api.get('/hotels', { params }),
  getHotelById: (id) => api.get(`/hotels/${id}`)
};

export const visaService = {
  getVisaServices: (params) => api.get('/visa', { params }),
  getVisaById: (id) => api.get(`/visa/${id}`)
};

export const bookingService = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getMyBookings: (email) => api.get('/bookings/my-bookings', { params: { email } }),
  getBookingById: (id) => api.get(`/bookings/${id}`)
};

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me')
};

export default api;

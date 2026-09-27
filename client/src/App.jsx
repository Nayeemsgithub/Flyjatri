import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

// Pages
import HomePage from './pages/HomePage';
import FlightSearchPage from './pages/FlightSearchPage';
import TourPackagesPage from './pages/TourPackagesPage';
import HotelSearchPage from './pages/HotelSearchPage';
import VisaAssistancePage from './pages/VisaAssistancePage';
import BookingCheckoutPage from './pages/BookingCheckoutPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import MyBookingsPage from './pages/MyBookingsPage';
import GenericServicePage from './pages/GenericServicePage';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BookingProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
              {/* Top Navigation */}
              <Navbar />

              {/* Main View Router */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/flights" element={<FlightSearchPage />} />
                  <Route path="/hotels" element={<HotelSearchPage />} />
                  <Route path="/tours" element={<TourPackagesPage />} />
                  <Route path="/visa" element={<VisaAssistancePage />} />
                  <Route path="/bus" element={<GenericServicePage type="bus" />} />
                  <Route path="/train" element={<GenericServicePage type="train" />} />
                  <Route path="/rent-a-car" element={<GenericServicePage type="rent-a-car" />} />
                  <Route path="/about" element={<GenericServicePage type="about" />} />
                  <Route path="/contact" element={<GenericServicePage type="contact" />} />
                  <Route path="/checkout" element={<BookingCheckoutPage />} />
                  <Route path="/booking-success" element={<BookingSuccessPage />} />
                  <Route path="/my-bookings" element={<MyBookingsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* Global Auth Modal */}
              <AuthModal />

              {/* Global Footer */}
              <Footer />
            </div>
          </Router>
        </BookingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

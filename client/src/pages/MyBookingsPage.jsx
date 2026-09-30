import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Ticket, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Plane, 
  User, 
  Phone, 
  Mail, 
  Shield, 
  Search, 
  Clock, 
  Lock, 
  Save, 
  FileText, 
  Compass, 
  MapPin, 
  Building, 
  Globe, 
  AlertCircle, 
  Printer, 
  MessageCircle, 
  ChevronRight,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';

export default function MyBookingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'bookings';
  const [activeTab, setActiveTab] = useState(initialTab);

  const { user, updateProfile, changePassword } = useAuth();
  const { formatPrice } = useCurrency();

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingFilter, setBookingFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // Tracker state
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedBooking, setTrackedBooking] = useState(null);
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackError, setTrackError] = useState('');

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    passportNumber: user?.passportNumber || '',
    nationality: user?.nationality || 'Bangladeshi',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || 'Male',
    address: user?.address || '',
    city: user?.city || 'Dhaka',
    postalCode: user?.postalCode || '',
    emergencyContactName: user?.emergencyContact?.name || '',
    emergencyContactPhone: user?.emergencyContact?.phone || ''
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });

  // Password Form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  // Sync tab with URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['bookings', 'track', 'profile', 'security'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Sync profileForm when user loads/changes
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        passportNumber: user.passportNumber || '',
        nationality: user.nationality || 'Bangladeshi',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || 'Male',
        address: user.address || '',
        city: user.city || 'Dhaka',
        postalCode: user.postalCode || '',
        emergencyContactName: user.emergencyContact?.name || '',
        emergencyContactPhone: user.emergencyContact?.phone || ''
      });
    }
  }, [user]);

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      setLoadingBookings(true);
      try {
        const res = await bookingService.getMyBookings(user?.email);
        const data = res?.data?.data || [];
        setBookings(data);
        if (data.length > 0 && !trackedBooking) {
          setTrackedBooking(data[0]);
          setTrackQuery(data[0].bookingId);
        }
      } catch (err) {
        console.error('Fetch bookings error:', err);
      } finally {
        setLoadingBookings(false);
      }
    };
    fetchBookings();
  }, [user]);

  // Handle Track Search
  const handleTrackSearch = async (e) => {
    if (e) e.preventDefault();
    if (!trackQuery.trim()) return;

    setTrackLoading(true);
    setTrackError('');
    try {
      const res = await bookingService.trackBooking(trackQuery.trim());
      if (res?.data?.success && res.data.data) {
        setTrackedBooking(res.data.data);
      } else {
        setTrackError('No booking found with this reference number or details.');
      }
    } catch (err) {
      setTrackError(err.response?.data?.message || 'Could not find booking. Please check reference ID.');
    } finally {
      setTrackLoading(false);
    }
  };

  // Handle Profile Save
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMessage({ type: '', text: '' });

    const payload = {
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
      passportNumber: profileForm.passportNumber,
      nationality: profileForm.nationality,
      dateOfBirth: profileForm.dateOfBirth,
      gender: profileForm.gender,
      address: profileForm.address,
      city: profileForm.city,
      postalCode: profileForm.postalCode,
      emergencyContact: {
        name: profileForm.emergencyContactName,
        phone: profileForm.emergencyContactPhone
      }
    };

    const res = await updateProfile(payload);
    setSavingProfile(false);
    if (res.success) {
      setProfileMessage({ type: 'success', text: 'Profile & personal information updated successfully!' });
      setTimeout(() => setProfileMessage({ type: '', text: '' }), 5000);
    } else {
      setProfileMessage({ type: 'error', text: res.message });
    }
  };

  // Handle Password Change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }

    setSavingPassword(true);
    const res = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
    setSavingPassword(false);
    if (res.success) {
      setPasswordMessage({ type: 'success', text: 'Your password has been changed securely!' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordMessage({ type: '', text: '' }), 5000);
    } else {
      setPasswordMessage({ type: 'error', text: res.message });
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === 'active') return b.bookingStatus === 'Confirmed' || b.bookingStatus === 'In Progress';
    if (bookingFilter === 'completed') return b.bookingStatus === 'Completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Greeting & Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#E11D48] to-rose-600 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-rose-500/20 flex-shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {user?.name || 'FlyJatri Traveler'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200/60">
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  Verified Member
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {user?.email || 'guest@flyjatri.com'}</span>
                {user?.phone && (
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {user.phone}</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/flights"
              className="flex-1 md:flex-none text-center px-5 py-2.5 bg-[#E11D48] hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-rose-500/20 transition active:scale-95"
            >
              + Book New Journey
            </Link>
            <a
              href="https://wa.me/8801321060476"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs sm:text-sm font-bold border border-emerald-200 transition flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 text-white" />
              <span>24/7 Helpline</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <button
            onClick={() => switchTab('bookings')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>My Bookings & History</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'bookings' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {bookings.length}
            </span>
          </button>

          <button
            onClick={() => switchTab('track')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'track'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Compass className="w-4 h-4 text-[#E11D48]" />
            <span>Track Booking & PNR</span>
          </button>

          <button
            onClick={() => switchTab('profile')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Edit Profile & Personal Info</span>
          </button>

          <button
            onClick={() => switchTab('security')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'security'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Account Security</span>
          </button>
        </div>

        {/* TAB 1: MY BOOKINGS & HISTORY */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">Filter:</span>
                {['all', 'active', 'completed'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setBookingFilter(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                      bookingFilter === f
                        ? 'bg-rose-50 text-[#E11D48] border border-rose-200'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {f === 'all' ? 'All Bookings' : f === 'active' ? 'Upcoming / Active' : 'Past Travel'}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => switchTab('track')}
                className="text-xs font-bold text-[#E11D48] hover:underline flex items-center gap-1"
              >
                <span>Track with PNR</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {loadingBookings ? (
              <div className="bg-white rounded-3xl p-14 text-center text-slate-400 border border-slate-200">
                <div className="w-8 h-8 border-3 border-[#E11D48] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-sm font-semibold">Loading your travel bookings...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft">
                <Ticket className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800">No Reservations Found</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  {bookingFilter === 'all'
                    ? "You haven't made any bookings yet. Search flights, hotels, or holiday packages to begin your journey."
                    : `No ${bookingFilter} bookings found in your travel record.`}
                </p>
                <Link
                  to="/"
                  className="inline-block mt-5 px-6 py-2.5 bg-[#E11D48] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:bg-rose-700 transition"
                >
                  Explore Destinations
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.bookingId}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#E11D48] flex items-center justify-center font-black flex-shrink-0 shadow-xs">
                        <Plane className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                            PNR: {booking.bookingId}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200/60 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            {booking.bookingStatus || 'Confirmed'}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Booked on {new Date(booking.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                          {booking.itemTitle}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            Travel Date: <strong>{booking.travelDate}</strong>
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            Passenger: <strong>{booking.primaryPassenger?.name || user?.name}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <div className="text-left md:text-right">
                        <div className="text-[11px] text-slate-400 font-medium">Total Paid</div>
                        <div className="text-lg font-black text-[#E11D48]">
                          {formatPrice(booking.totalAmount)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/booking-success?id=${booking.bookingId}`}
                          state={{ booking }}
                          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>E-Ticket</span>
                        </Link>
                        <button
                          onClick={() => {
                            setTrackQuery(booking.bookingId);
                            setTrackedBooking(booking);
                            switchTab('track');
                          }}
                          className="px-3.5 py-2.5 border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-700 hover:text-[#E11D48] rounded-xl text-xs font-bold transition flex items-center gap-1"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Track</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TRACK BOOKING & PNR STATUS */}
        {activeTab === 'track' && (
          <div className="space-y-6">
            
            {/* Search Tracker Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <div className="max-w-2xl">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Live Booking & PNR Tracker
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Enter your Booking Reference ID (e.g. <span className="font-mono font-bold text-slate-700">BK-2026-9812</span>), passenger phone, or email to check real-time confirmation status.
                </p>

                <form onSubmit={handleTrackSearch} className="mt-5 flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={trackQuery}
                      onChange={(e) => setTrackQuery(e.target.value)}
                      placeholder="Enter Booking Reference / PNR / Phone"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={trackLoading}
                    className="w-full sm:w-auto px-6 py-3 bg-[#E11D48] hover:bg-rose-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-rose-500/20 transition flex items-center justify-center gap-2 flex-shrink-0"
                  >
                    {trackLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Compass className="w-4 h-4" />
                        <span>Track Status</span>
                      </>
                    )}
                  </button>
                </form>

                {trackError && (
                  <div className="mt-4 p-3 bg-rose-50 text-red-600 rounded-xl text-xs font-semibold flex items-center gap-2 border border-rose-200">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{trackError}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tracking Result View */}
            {trackedBooking && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6 animate-in fade-in duration-200">
                
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                        PNR: {trackedBooking.bookingId}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-extrabold border border-emerald-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {trackedBooking.bookingStatus || 'Confirmed'}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                      {trackedBooking.itemTitle}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/booking-success?id=${trackedBooking.bookingId}`}
                      state={{ booking: trackedBooking }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print E-Ticket</span>
                    </Link>
                    <a
                      href={`https://wa.me/8801321060476?text=Hello%20FlyJatri%2C%20I%20need%20assistance%20with%20booking%20${trackedBooking.bookingId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200 transition flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                      <span>WhatsApp Support</span>
                    </a>
                  </div>
                </div>

                {/* Tracking Progress Timeline */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                    Live Booking Journey Timeline
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                    {[
                      { step: '1. Order Paid & Confirmed', desc: 'Payment received via ' + (trackedBooking.paymentMethod || 'Online Gateway'), status: 'done', icon: CheckCircle2 },
                      { step: '2. E-Ticket & PNR Issued', desc: 'Seats and voucher locked with airline/partner', status: 'done', icon: FileText },
                      { step: '3. Check-In & Departure Ready', desc: 'Travel date: ' + trackedBooking.travelDate, status: 'active', icon: Clock },
                      { step: '4. Journey Completed', desc: 'FlyJatri seamless traveler assistance', status: 'pending', icon: Compass }
                    ].map((st, i) => (
                      <div
                        key={i}
                        className={`p-5 rounded-2xl border transition-all ${
                          st.status === 'done'
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : st.status === 'active'
                            ? 'bg-rose-50/50 border-[#E11D48] ring-2 ring-rose-100'
                            : 'bg-slate-50 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <st.icon className={`w-4 h-4 ${
                            st.status === 'done' ? 'text-emerald-600' : st.status === 'active' ? 'text-[#E11D48] animate-pulse' : 'text-slate-400'
                          }`} />
                          <span className={`text-xs font-bold ${
                            st.status === 'done' ? 'text-emerald-900' : st.status === 'active' ? 'text-[#E11D48]' : 'text-slate-500'
                          }`}>
                            {st.step}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {st.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Passenger & Details Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block mb-1 font-semibold">Primary Passenger</span>
                    <strong className="text-slate-900 text-sm">{trackedBooking.primaryPassenger?.name || user?.name}</strong>
                    <div className="text-slate-500 mt-1">{trackedBooking.primaryPassenger?.phone || user?.phone}</div>
                    <div className="text-slate-500">{trackedBooking.primaryPassenger?.email || user?.email}</div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block mb-1 font-semibold">Schedule & Route</span>
                    <strong className="text-slate-900 text-sm">{trackedBooking.itemTitle}</strong>
                    <div className="text-slate-500 mt-1">Travel Date: <strong>{trackedBooking.travelDate}</strong></div>
                    <div className="text-slate-500">Seats / Travelers: <strong>{trackedBooking.seats || 1} Person</strong></div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block mb-1 font-semibold">Payment Summary</span>
                    <div className="text-slate-500">Method: <strong>{trackedBooking.paymentMethod || 'bKash'}</strong></div>
                    <div className="text-slate-500">Status: <strong className="text-emerald-600">Paid in Full</strong></div>
                    <div className="mt-1 text-base font-black text-[#E11D48]">
                      Total: {formatPrice(trackedBooking.totalAmount)}
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 3: PROFILE & PERSONAL SETTINGS */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
            <div className="max-w-3xl">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Profile & Personal Information
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Update your personal details, contact number, passport information, and travel preferences.
                </p>
              </div>

              {profileMessage.text && (
                <div className={`p-4 rounded-2xl text-xs font-bold mb-6 flex items-center gap-2 border ${
                  profileMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-rose-50 text-red-600 border-rose-200'
                }`}>
                  {profileMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <span>{profileMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                
                {/* 1. Basic Account Info */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#E11D48]" />
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Full Name (as on Passport) *
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+880 1712 345678"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Gender
                      </label>
                      <select
                        value={profileForm.gender}
                        onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. Travel Document & Passport Details */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#E11D48]" />
                    Travel & Passport Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Passport Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. A01234567"
                        value={profileForm.passportNumber}
                        onChange={(e) => setProfileForm({ ...profileForm, passportNumber: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Nationality
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bangladeshi"
                        value={profileForm.nationality}
                        onChange={(e) => setProfileForm({ ...profileForm, nationality: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={profileForm.dateOfBirth}
                        onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Address & Emergency Contact */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
                    Address & Emergency Contact
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Residential Address
                      </label>
                      <input
                        type="text"
                        placeholder="House / Road / Area"
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        City / District
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dhaka"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +880 1800 000000"
                        value={profileForm.emergencyContactPhone}
                        onChange={(e) => setProfileForm({ ...profileForm, emergencyContactPhone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="px-6 py-3 bg-[#E11D48] hover:bg-rose-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-rose-500/20 transition flex items-center gap-2 active:scale-95"
                  >
                    {savingProfile ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Profile Changes</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* TAB 4: ACCOUNT SECURITY & PASSWORD */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
            <div className="max-w-xl">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Account Security & Password
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Manage your FlyJatri account password and security credentials.
                </p>
              </div>

              {passwordMessage.text && (
                <div className={`p-4 rounded-2xl text-xs font-bold mb-6 flex items-center gap-2 border ${
                  passwordMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-rose-50 text-red-600 border-rose-200'
                }`}>
                  {passwordMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <span>{passwordMessage.text}</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    New Password * (minimum 6 characters)
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new strong password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:bg-white transition"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={savingPassword}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    {savingPassword ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" />
                        <span>Update Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  Enterprise Account Protection
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Your FlyJatri session is protected by end-to-end encrypted tokens with salted bcrypt security and automatic rate limiting.
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

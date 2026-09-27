import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Calendar, DollarSign, CheckCircle2, ArrowRight, Plane } from 'lucide-react';
import { bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingService.getMyBookings(user?.email);
        setBookings(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Bookings & E-Tickets
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your confirmed flight vouchers, hotel reservations, and tour itineraries.
            </p>
          </div>

          <Link
            to="/flights"
            className="px-4 py-2 bg-[#E11D48] hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md transition"
          >
            + Book New Trip
          </Link>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
            <div className="w-8 h-8 border-3 border-[#E11D48] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm font-semibold">Loading your reservations...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft">
            <Ticket className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No Bookings Yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You have not made any bookings yet. Search flights, hotels, or holiday tour packages to get started!
            </p>
            <Link
              to="/"
              className="inline-block mt-5 px-6 py-2.5 bg-[#E11D48] text-white rounded-xl text-xs font-bold shadow-md hover:bg-rose-700 transition"
            >
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-lg transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#E11D48] flex items-center justify-center font-black flex-shrink-0">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400">REF: {booking.bookingId}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                        {booking.bookingStatus}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{booking.itemTitle}</h3>
                    <div className="text-xs text-slate-400 mt-1">
                      Travel Date: {booking.travelDate} • Passenger: {booking.primaryPassenger?.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400">Total Paid</div>
                    <div className="text-base font-black text-[#E11D48]">${booking.totalAmount}</div>
                  </div>

                  <Link
                    to={`/booking-success?id=${booking.bookingId}`}
                    state={{ booking }}
                    className="px-4 py-2 border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-700 hover:text-[#E11D48] rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>View Voucher</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

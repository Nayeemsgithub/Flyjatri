import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Download, Printer, ArrowRight, Plane, Calendar, User, Ticket, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking || {
    bookingId: 'FJ-892174',
    itemTitle: 'Biman Bangladesh Airlines (DAC ➔ DXB)',
    primaryPassenger: {
      name: 'Tanvir Ahmed',
      email: 'tanvir.traveler@flyjatri.com',
      phone: '+880 1712 345678'
    },
    travelDate: '2026-09-25',
    totalAmount: 482,
    currency: 'USD',
    paymentMethod: 'bKash Online',
    bookingStatus: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  useEffect(() => {
    // Launch celebratory confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Celebration Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Booking Confirmed!</h1>
          <p className="text-sm text-slate-500 mt-1">
            Your travel voucher & e-ticket have been generated and sent to <strong>{booking.primaryPassenger?.email}</strong>.
          </p>
        </div>

        {/* Printable E-Ticket Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8" id="e-ticket">
          
          {/* Ticket Header */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-center justify-between">
            <div>
              <span className="text-2xl font-extrabold italic text-[#E11D48] tracking-tighter">
                <span className="inline-block transform -skew-x-12">FLY</span>
                <span className="text-white ml-0.5">JATRI</span>
              </span>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Official E-Ticket Voucher</div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400">Booking Reference</span>
              <div className="text-lg font-mono font-black text-rose-400">{booking.bookingId}</div>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            <div>
              <h3 className="text-lg font-black text-slate-900">{booking.itemTitle}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mt-1">
                <Calendar className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Travel Date: <strong>{booking.travelDate}</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Passenger</span>
                <strong className="text-slate-800">{booking.primaryPassenger?.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Contact Phone</span>
                <strong className="text-slate-800">{booking.primaryPassenger?.phone}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Payment Status</span>
                <strong className="text-emerald-600 font-bold">PAID ({booking.paymentMethod})</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Total Paid</span>
                <strong className="text-[#E11D48] font-black">${booking.totalAmount} {booking.currency}</strong>
              </div>
            </div>

            {/* Simulated Barcode & Security stamp */}
            <div className="pt-4 border-t border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                  <Ticket className="w-8 h-8 text-slate-400" />
                </div>
                <div className="text-xs text-slate-500">
                  <div>Status: <span className="font-bold text-emerald-600">CONFIRMED & ISSUED</span></div>
                  <div className="text-[10px] text-slate-400 font-mono">HASH: 9812-FL78-DAC-DXB-OK</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print Ticket</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/my-bookings"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition"
          >
            <span>View All My Bookings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition"
          >
            Back to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, 
  Building, 
  Palmtree, 
  Globe2, 
  CreditCard, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  Check, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/api';

export default function BookingCheckoutPage() {
  const navigate = useNavigate();
  const { activeBooking, searchCriteria } = useBooking();
  const { user } = useAuth();

  const [passenger, setPassenger] = useState({
    title: 'Mr',
    name: user?.name || 'Tanvir Ahmed',
    email: user?.email || 'tanvir.traveler@flyjatri.com',
    phone: user?.phone || '+880 1712 345678',
    passportNumber: 'A01928374',
    nationality: 'Bangladeshi'
  });

  const [paymentMethod, setPaymentMethod] = useState('bkash'); // 'bkash' | 'nagad' | 'card'
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Default fallback item if user arrived directly
  const item = activeBooking?.item || {
    airline: 'Biman Bangladesh Airlines',
    flightNumber: 'BG-147',
    from: { city: 'Dhaka', code: 'DAC' },
    to: { city: 'Dubai', code: 'DXB' },
    departureTime: '08:30 AM',
    price: 482,
    type: 'flight'
  };

  const bookingType = activeBooking?.type || 'flight';
  const basePrice = item.price || item.pricePerNight || 482;
  const taxesAndFees = Math.round(basePrice * 0.12);
  const totalAmount = basePrice + taxesAndFees - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'FLY40' || promoCode.toUpperCase() === 'FLYJATRI') {
      const discount = Math.round(basePrice * 0.15);
      setDiscountAmount(discount);
      setPromoApplied(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid promo code. Try "FLY40" or "FLYJATRI".');
    }
  };

  const handleConfirmBooking = async () => {
    if (!passenger.name || !passenger.email || !passenger.phone) {
      setErrorMsg('Please complete all passenger information fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await bookingService.createBooking({
        type: bookingType,
        item,
        passenger,
        travelDate: searchCriteria.departureDate,
        returnDate: searchCriteria.returnDate,
        guests: 1,
        totalAmount,
        currency: 'USD',
        paymentMethod: paymentMethod === 'bkash' ? 'bKash Online' : paymentMethod === 'nagad' ? 'Nagad' : 'Credit / Debit Card'
      });

      if (res.data.success) {
        navigate(`/booking-success?id=${res.data.data.bookingId}`, {
          state: { booking: res.data.data }
        });
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Review & Finalize Booking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fill in traveler details and select your preferred payment channel.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-700 text-xs font-semibold">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form (Traveler Details & Payment) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Passenger Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#E11D48] flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Lead Passenger Details</h3>
                  <p className="text-xs text-slate-400">Ensure names match passport / National ID exactly</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                  <select
                    value={passenger.title}
                    onChange={(e) => setPassenger(p => ({ ...p, title: e.target.value }))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="Mr">Mr.</option>
                    <option value="Mrs">Mrs.</option>
                    <option value="Ms">Ms.</option>
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={passenger.name}
                    onChange={(e) => setPassenger(p => ({ ...p, name: e.target.value }))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={passenger.email}
                    onChange={(e) => setPassenger(p => ({ ...p, email: e.target.value }))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={passenger.phone}
                    onChange={(e) => setPassenger(p => ({ ...p, phone: e.target.value }))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Passport / NID Number</label>
                  <input
                    type="text"
                    value={passenger.passportNumber}
                    onChange={(e) => setPassenger(p => ({ ...p, passportNumber: e.target.value }))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    value={passenger.nationality}
                    onChange={(e) => setPassenger(p => ({ ...p, nationality: e.target.value }))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Selection Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Payment Gateway</h3>
                  <p className="text-xs text-slate-400">Select your preferred payment channel</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* bKash */}
                <div
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    paymentMethod === 'bkash'
                      ? 'border-[#E11D48] bg-rose-50/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-pink-600 text-sm">bKash</span>
                    {paymentMethod === 'bkash' && <Check className="w-4 h-4 text-[#E11D48]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">Instant Mobile Banking Payment</p>
                </div>

                {/* Nagad */}
                <div
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    paymentMethod === 'nagad'
                      ? 'border-[#E11D48] bg-rose-50/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-orange-600 text-sm">Nagad</span>
                    {paymentMethod === 'nagad' && <Check className="w-4 h-4 text-[#E11D48]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">Instant Post Office Digital Payment</p>
                </div>

                {/* Credit Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'border-[#E11D48] bg-rose-50/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-600 text-sm">Card / Visa / MC</span>
                    {paymentMethod === 'card' && <Check className="w-4 h-4 text-[#E11D48]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">International Credit & Debit Cards</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Booking Item Summary */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Booking Summary</h3>
              
              <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                <div className="font-black text-slate-900 text-sm">
                  {item.title || item.name || `${item.airline} (${item.from?.code} ➔ ${item.to?.code})`}
                </div>
                <div className="text-xs text-slate-500">
                  {searchCriteria.departureDate} • {bookingType.toUpperCase()}
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo: FLY40"
                  className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold uppercase text-slate-800 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                >
                  Apply
                </button>
              </form>

              {promoApplied && (
                <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Promo code applied! Saved ${discountAmount}</span>
                </div>
              )}

              {/* Price calculation */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Base Rate</span>
                  <span className="font-bold text-slate-800">${basePrice}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes & Service Surcharges</span>
                  <span className="font-bold text-slate-800">${taxesAndFees}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount Voucher</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-[#E11D48]">${totalAmount}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={loading}
                className="w-full py-3.5 bg-[#E11D48] hover:bg-rose-700 active:scale-98 text-white rounded-2xl font-bold text-sm shadow-lg shadow-rose-600/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Processing Transaction...' : 'Pay & Confirm Booking'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>256-Bit SSL Encrypted & Protected</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

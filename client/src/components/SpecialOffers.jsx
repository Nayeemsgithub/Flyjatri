import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Building, Car, ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Tag, Headphones, Users } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function SpecialOffers() {
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredPackages = [
    {
      id: 'tour-1',
      title: 'Maldives Escape',
      subtitle: '5 Nights | 6 Days',
      inclusions: 'Flight + Hotel + Transfers',
      price: '$ 1,250',
      priceValue: 1250,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
      tag: 'Special Offer'
    },
    {
      id: 'tour-3',
      title: 'Dubai Desert & Skyline',
      subtitle: '4 Nights | 5 Days',
      inclusions: 'Flight + 4-Star Hotel + Safari Tour',
      price: '$ 780',
      priceValue: 780,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
      tag: 'Limited Deal'
    }
  ];

  const currentPkg = featuredPackages[currentSlide];

  const handleBookNow = () => {
    startBooking(currentPkg, 'tour');
    navigate('/checkout');
  };

  const travelOffers = [
    {
      title: 'Hotel Deals',
      subtitle: 'Save up to 30%',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
      link: '/hotels'
    },
    {
      title: 'Tour Packages',
      subtitle: 'Exclusive Combos',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      link: '/tours'
    },
    {
      title: 'Flight Deals',
      badge: 'Up to 40% Off',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80',
      link: '/flights'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Maldives Escape Featured Offer Banner */}
      <div className="lg:col-span-7 relative h-72 sm:h-80 rounded-3xl overflow-hidden shadow-soft group">
        <img
          src={currentPkg.image}
          alt={currentPkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent"></div>

        {/* Floating Content */}
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#E11D48] text-white text-[11px] font-bold uppercase tracking-wider mb-2">
              {currentPkg.tag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {currentPkg.title}
            </h3>
            <p className="text-xs text-slate-300 font-semibold mt-1">
              {currentPkg.subtitle}
            </p>

            {/* Inclusions */}
            <div className="flex items-center gap-3 text-xs text-slate-200 mt-3">
              <span className="flex items-center gap-1">
                <Plane className="w-3.5 h-3.5 text-rose-400" /> Flight
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-rose-400" /> Hotel
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-rose-400" /> Transfers
              </span>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs text-slate-300">From</span>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {currentPkg.price}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Slide controls */}
              <div className="flex items-center gap-1.5 mr-2">
                <button
                  onClick={() => setCurrentSlide(prev => (prev === 0 ? featuredPackages.length - 1 : prev - 1))}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentSlide(prev => (prev === featuredPackages.length - 1 ? 0 : prev + 1))}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Red Book Now Button */}
              <button
                onClick={handleBookNow}
                className="px-6 py-2.5 bg-[#E11D48] hover:bg-rose-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-600/30 transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Box */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-soft flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Safe & Secure Booking</h4>
              <p className="text-xs text-slate-500">Your data and payments are 100% protected</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#E11D48] flex items-center justify-center flex-shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Best Price Guarantee</h4>
              <p className="text-xs text-slate-500">Get the lowest fares with transparent pricing</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">24/7 Customer Support</h4>
              <p className="text-xs text-slate-500">Always here to help you across your journey</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Trusted by Thousands</h4>
              <p className="text-xs text-slate-500">Over 50,000+ satisfied travelers worldwide</p>
            </div>
          </div>
        </div>

        {/* Travel Made Easy badge with handwriting styling */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="font-handwriting text-3xl font-bold text-slate-800 tracking-tight">
            Travel Made Easy
          </div>
          <div className="w-16 h-1 bg-[#E11D48] rounded-full"></div>
        </div>
      </div>

    </div>
  );
}

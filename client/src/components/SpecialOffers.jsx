import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Building, Car, ChevronLeft, ChevronRight, ShieldCheck, Tag, Headphones, Users } from 'lucide-react';
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
      inclusions: 'Flight • Hotel • Transfers',
      price: '$ 1,250',
      priceValue: 1250,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
      tag: 'Special Offer'
    },
    {
      id: 'tour-3',
      title: 'Dubai Desert & City',
      subtitle: '4 Nights | 5 Days',
      inclusions: 'Flight • 4-Star Hotel • Safari',
      price: '$ 780',
      priceValue: 780,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
      tag: 'Special Offer'
    }
  ];

  const currentPkg = featuredPackages[currentSlide];

  const handleBookNow = () => {
    startBooking(currentPkg, 'tour');
    navigate('/checkout');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
      
      {/* Maldives Escape Featured Offer Banner */}
      <div className="lg:col-span-7 relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-sm">
        <img
          src={currentPkg.image}
          alt={currentPkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent"></div>

        {/* Floating Content */}
        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between text-white">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E11D48] text-white text-[10px] font-bold uppercase tracking-wider mb-2">
              {currentPkg.tag}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {currentPkg.title}
            </h3>
            <p className="text-[11px] text-slate-200 font-semibold mt-0.5">
              {currentPkg.subtitle}
            </p>

            {/* Inclusions */}
            <div className="flex items-center gap-2.5 text-[11px] text-slate-200 mt-2">
              <span className="flex items-center gap-1">
                <Plane className="w-3 h-3 text-white" /> Flight
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building className="w-3 h-3 text-white" /> Hotel
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Car className="w-3 h-3 text-white" /> Transfers
              </span>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] text-slate-300">From</span>
              <div className="text-xl sm:text-2xl font-black text-white leading-none">
                {currentPkg.price}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Carousel Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentSlide(prev => (prev === 0 ? featuredPackages.length - 1 : prev - 1))}
                  className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <div className="flex gap-1 px-1">
                  {featuredPackages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        currentSlide === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                      }`}
                    ></div>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentSlide(prev => (prev === featuredPackages.length - 1 ? 0 : prev + 1))}
                  className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Red Book Now Button */}
              <button
                onClick={handleBookNow}
                className="px-5 py-2 bg-[#E11D48] hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Box */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-slate-700 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">Safe & Secure Booking</h4>
              <p className="text-[10px] text-slate-500">Your data is protected</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-slate-700 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">Best Price Guarantee</h4>
              <p className="text-[10px] text-slate-500">Get the lowest prices</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Headphones className="w-5 h-5 text-slate-700 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">24/7 Customer Support</h4>
              <p className="text-[10px] text-slate-500">We're here to help</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-slate-700 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">Trusted by Thousands</h4>
              <p className="text-[10px] text-slate-500">Happy travelers worldwide</p>
            </div>
          </div>
        </div>

        {/* Travel Made Easy badge in red cursive script with plane icon */}
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-end">
          <div className="flex items-center gap-1">
            <span className="font-handwriting text-2xl text-[#E11D48] font-bold">
              Travel Made Easy
            </span>
            <Plane className="w-3.5 h-3.5 text-[#E11D48] transform rotate-45" />
          </div>
        </div>
      </div>

    </div>
  );
}

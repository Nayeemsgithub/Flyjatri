import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palmtree, MapPin, Clock, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { tourService, fallbackData } from '../services/api';
import { useBooking } from '../context/BookingContext';

export default function TourPackagesPage() {
  const [tours, setTours] = useState(fallbackData.tours);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  useEffect(() => {
    let isMounted = true;
    const fetchTours = async () => {
      try {
        const res = await tourService.getTours();
        if (isMounted && res?.data?.data && Array.isArray(res.data.data)) {
          setTours(res.data.data);
        }
      } catch (err) {
        if (isMounted) setTours(fallbackData.tours);
      }
    };
    fetchTours();
    return () => { isMounted = false; };
  }, []);

  const safeTours = Array.isArray(tours) && tours.length > 0 ? tours : fallbackData.tours;

  const filteredTours = safeTours.filter(t => {
    if (filter === 'All') return true;
    if (filter === 'International') return t.destination === 'Maldives' || t.destination === 'Dubai';
    if (filter === 'Domestic') return t.destination === "Cox's Bazar" || t.destination === 'Sajek Valley';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
              Curated Holiday Packages
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
              Explore Unforgettable Tour Packages
            </h1>
            <p className="mt-3 text-emerald-100 text-sm sm:text-base">
              All-inclusive vacation plans with return flights, luxury accommodations, sightseeing tours & dedicated guides.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-8">
            <Palmtree className="w-80 h-80 text-white" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            {['All', 'International', 'Domestic'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                  filter === tab
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab} Packages
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-500">
            Showing {filteredTours.length} tour packages
          </span>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Photo */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {pkg.discount && (
                    <div className="absolute top-4 left-4 bg-[#E11D48] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                      {pkg.discount}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-xl flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
                    <span className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
                      {pkg.destination}
                    </span>
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {pkg.rating || 4.9} ({pkg.reviewsCount || 100})
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#E11D48] transition leading-snug">
                    {pkg.title}
                  </h3>

                  {/* Feature Pills */}
                  <div className="mt-4 space-y-1.5">
                    {pkg.features?.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer / Price */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold">Starting from</div>
                  <div className="text-xl font-black text-[#E11D48]">
                    ${pkg.price}
                    {pkg.priceBDT && <span className="text-xs text-slate-500 font-normal ml-1">(৳{pkg.priceBDT.toLocaleString()})</span>}
                  </div>
                </div>

                <button
                  onClick={() => {
                    startBooking(pkg, 'tour');
                    navigate('/checkout');
                  }}
                  className="px-5 py-2.5 bg-[#E11D48] hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/25 transition"
                >
                  Book Package
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

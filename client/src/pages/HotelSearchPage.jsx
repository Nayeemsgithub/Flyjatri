import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Star, Wifi, Coffee, Check, ArrowRight } from 'lucide-react';
import { hotelService } from '../services/api';
import { useBooking } from '../context/BookingContext';

export default function HotelSearchPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await hotelService.getHotels();
        setHotels(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-10">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            Premium Stays & Resorts
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
            Find the Best Hotel Deals
          </h1>
          <p className="mt-3 text-blue-200 text-sm sm:text-base max-w-xl">
            From 5-star beachfront resorts in Maldives and Cox's Bazar to luxury skyscrapers in Dubai and Singapore.
          </p>
        </div>

        {/* Hotels List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-56">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{hotel.rating} Star Luxury</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>{hotel.city}, {hotel.country}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{hotel.name}</h3>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {hotel.amenities?.map((amenity, idx) => (
                      <span key={idx} className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Nightly Rate</span>
                  <div className="text-xl font-black text-[#E11D48]">${hotel.pricePerNight}</div>
                </div>

                <button
                  onClick={() => {
                    startBooking(hotel, 'hotel');
                    navigate('/checkout');
                  }}
                  className="px-5 py-2.5 bg-[#E11D48] hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md transition"
                >
                  Reserve Room
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { flightService, fallbackData } from '../services/api';

export default function PopularDestinations() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState(fallbackData.destinations);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    let isMounted = true;
    const fetchDestinations = async () => {
      try {
        const res = await flightService.getDestinations(activeFilter);
        if (isMounted && res?.data?.data && Array.isArray(res.data.data)) {
          setDestinations(res.data.data);
        }
      } catch (err) {
        if (isMounted) {
          setDestinations(fallbackData.destinations);
        }
      }
    };
    fetchDestinations();
    return () => { isMounted = false; };
  }, [activeFilter]);

  const safeDestinations = Array.isArray(destinations) && destinations.length > 0 ? destinations : fallbackData.destinations;

  const handleDestinationClick = (dest) => {
    navigate(`/flights?to=${dest.code || dest.name}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Discover amazing places around the world
          </p>
        </div>

        <div className="mt-3 sm:mt-0 flex items-center gap-4">
          <div className="flex gap-2">
            {['All', 'Domestic', 'International'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#E11D48] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate('/flights')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#E11D48] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Cards Grid matching exact reference mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {safeDestinations.slice(0, 4).map((dest) => (
          <div
            key={dest.id || dest.name}
            onClick={() => handleDestinationClick(dest)}
            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-soft hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Background Destination Photo */}
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
              
              <div className="flex items-center justify-between">
                <div>
                  {/* City Name with Pin */}
                  <div className="flex items-center gap-1.5 text-white font-bold text-lg drop-shadow-md">
                    <MapPin className="w-4 h-4 text-[#E11D48] fill-[#E11D48]" />
                    <span>{dest.name}</span>
                  </div>

                  {/* Price Tag */}
                  <div className="text-xs text-slate-200 mt-0.5">
                    From <span className="font-extrabold text-white text-sm">{dest.price}</span>
                  </div>
                </div>

                {/* Circular Action Button */}
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-[#E11D48] flex items-center justify-center text-white transition-colors duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

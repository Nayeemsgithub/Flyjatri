import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

export default function PopularDestinations() {
  const navigate = useNavigate();

  const destinations = [
    {
      id: 'dest-1',
      name: 'Dubai',
      code: 'DXB',
      price: '$ 482',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'dest-2',
      name: 'Singapore',
      code: 'SIN',
      price: '$ 620',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'dest-3',
      name: 'Bangkok',
      code: 'BKK',
      price: '$ 398',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'dest-4',
      name: "Cox's Bazar",
      code: 'CXB',
      price: '৳ 12,500',
      image: 'https://images.unsplash.com/photo-1628178822394-43cb4d122244?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleDestinationClick = (dest) => {
    navigate(`/flights?to=${dest.code}`);
  };

  return (
    <section className="w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover amazing places around the world
          </p>
        </div>

        <button
          onClick={() => navigate('/flights')}
          className="text-xs font-bold text-slate-700 hover:text-[#E11D48] flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Cards Grid matching exact reference mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            onClick={() => handleDestinationClick(dest)}
            className="group relative h-48 sm:h-52 rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-200"
          >
            {/* Background Destination Photo */}
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-3.5 flex flex-col justify-end text-white">
              
              <div className="flex items-end justify-between">
                <div>
                  {/* City Name with Pin */}
                  <div className="flex items-center gap-1 text-white font-bold text-sm">
                    <MapPin className="w-3.5 h-3.5 text-white fill-white" />
                    <span>{dest.name}</span>
                  </div>

                  {/* Price Tag */}
                  <div className="text-[11px] text-slate-200 mt-0.5">
                    From <span className="font-bold text-white text-xs">{dest.price}</span>
                  </div>
                </div>

                {/* Circular Action Button */}
                <div className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm group-hover:bg-white flex items-center justify-center text-white group-hover:text-slate-900 transition-colors duration-200">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

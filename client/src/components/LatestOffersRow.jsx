import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function LatestOffersRow() {
  const navigate = useNavigate();

  const offers = [
    {
      id: 'offer-1',
      title: 'Hotel Deals',
      badge: 'Hotel Deals',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
      link: '/hotels'
    },
    {
      id: 'offer-2',
      title: 'Tour Packages',
      badge: 'Tour Packages',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      link: '/tours'
    },
    {
      id: 'offer-3',
      title: 'Flight Deals',
      badge: 'Flight Deals',
      discount: 'Up to 40% Off',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80',
      link: '/flights'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
          Latest Travel Offers
        </h3>
        <button
          onClick={() => navigate('/flights')}
          className="text-xs font-bold text-slate-700 hover:text-[#E11D48] flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            onClick={() => navigate(offer.link)}
            className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden shadow-soft cursor-pointer transform hover:-translate-y-1 transition duration-300"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent"></div>

            <div className="absolute inset-0 p-2.5 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold text-white leading-tight">
                {offer.title}
              </span>
              {offer.discount && (
                <span className="text-[9px] font-black text-rose-300">
                  {offer.discount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

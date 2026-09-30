import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function LatestOffersRow() {
  const navigate = useNavigate();

  const offers = [
    {
      id: 'offer-1',
      title: 'Hotel Deals',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
      link: '/hotels'
    },
    {
      id: 'offer-2',
      title: 'Tour Packages',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      link: '/tours'
    },
    {
      id: 'offer-3',
      title: 'Flight Deals',
      tag: 'Up to 40% Off',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80',
      link: '/flights'
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
          Latest Travel Offers
        </h3>
        <button
          onClick={() => navigate('/flights')}
          className="text-xs font-bold text-slate-700 hover:text-[#E11D48] flex items-center gap-1 transition"
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
            className="group relative h-24 sm:h-28 rounded-xl overflow-hidden shadow-sm cursor-pointer"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

            <div className="absolute inset-0 p-2 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold text-white leading-tight">
                {offer.title}
              </span>
              {offer.tag && (
                <span className="text-[8px] font-bold text-rose-300">
                  {offer.tag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

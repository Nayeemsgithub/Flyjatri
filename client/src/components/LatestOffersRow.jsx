import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function LatestOffersRow() {
  const navigate = useNavigate();

  const offers = [
    {
      id: 'offer-1',
      title: 'Hotel Deals',
      badge: 'Best Rates',
      discount: 'Up to 30% Off',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      link: '/hotels'
    },
    {
      id: 'offer-2',
      title: 'Tour Packages',
      badge: 'Curated Combos',
      discount: 'Special Discounts',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      link: '/tours'
    },
    {
      id: 'offer-3',
      title: 'Flight Deals',
      badge: 'Special Promo',
      discount: 'Up to 40% Off',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
      link: '/flights'
    }
  ];

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            onClick={() => navigate(offer.link)}
            className="group relative h-40 rounded-2xl overflow-hidden shadow-soft cursor-pointer transform hover:-translate-y-1 transition duration-300"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent"></div>

            <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
              <span className="self-start px-2 py-0.5 rounded-md bg-[#E11D48] text-[10px] font-bold uppercase tracking-wider">
                {offer.badge}
              </span>

              <div>
                <h4 className="text-base font-bold text-white">{offer.title}</h4>
                <div className="text-xs font-semibold text-rose-300 mt-0.5">{offer.discount}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

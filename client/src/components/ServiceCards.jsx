import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, 
  Building2, 
  Palmtree, 
  Globe2, 
  Bus, 
  Train, 
  Car, 
  ChevronRight 
} from 'lucide-react';

export default function ServiceCards() {
  const navigate = useNavigate();

  const services = [
    {
      id: 'flights',
      title: 'Flights',
      description: 'Best fares, top airlines, worldwide destinations.',
      icon: Plane,
      iconBg: 'bg-[#E11D48]',
      iconColor: 'text-white',
      link: '/flights'
    },
    {
      id: 'hotels',
      title: 'Hotels',
      description: 'Stay at the best hotels with great deals.',
      icon: Building2,
      iconBg: 'bg-[#0284C7]',
      iconColor: 'text-white',
      link: '/hotels'
    },
    {
      id: 'tours',
      title: 'Tour Packages',
      description: 'Explore amazing destinations with curated packages.',
      icon: Palmtree,
      iconBg: 'bg-[#059669]',
      iconColor: 'text-white',
      link: '/tours'
    },
    {
      id: 'visa',
      title: 'Visa',
      description: 'Hassle-free visa assistance for your journey.',
      icon: Globe2,
      iconBg: 'bg-[#7C3AED]',
      iconColor: 'text-white',
      link: '/visa'
    },
    {
      id: 'bus',
      title: 'Bus',
      description: 'Comfortable & reliable bus booking.',
      icon: Bus,
      iconBg: 'bg-[#D97706]',
      iconColor: 'text-white',
      link: '/bus'
    },
    {
      id: 'train',
      title: 'Train',
      description: 'Book train tickets across the country.',
      icon: Train,
      iconBg: 'bg-[#0D9488]',
      iconColor: 'text-white',
      link: '/train'
    },
    {
      id: 'rent-a-car',
      title: 'Rent a Car',
      description: 'Drive your freedom with our rental cars.',
      icon: Car,
      iconBg: 'bg-[#1E40AF]',
      iconColor: 'text-white',
      link: '/rent-a-car'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => navigate(item.link)}
              className="group bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Square Rounded Icon Badge */}
                <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-base font-bold text-slate-800 group-hover:text-[#E11D48] transition-colors">
                  {item.title}
                </h3>

                {/* Subtitle */}
                <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Arrow link */}
              <div className="mt-4 flex justify-end">
                <div className="w-6 h-6 rounded-full bg-slate-50 group-hover:bg-rose-50 flex items-center justify-center text-slate-400 group-hover:text-[#E11D48] transition-colors">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

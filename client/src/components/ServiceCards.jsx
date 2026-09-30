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
      iconBg: 'bg-[#EF4444]',
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
      iconBg: 'bg-[#10B981]',
      iconColor: 'text-white',
      link: '/tours'
    },
    {
      id: 'visa',
      title: 'Visa',
      description: 'Hassle-free visa assistance for your journey.',
      icon: Globe2,
      iconBg: 'bg-[#8B5CF6]',
      iconColor: 'text-white',
      link: '/visa'
    },
    {
      id: 'bus',
      title: 'Bus',
      description: 'Comfortable & reliable bus booking.',
      icon: Bus,
      iconBg: 'bg-[#F97316]',
      iconColor: 'text-white',
      link: '/bus'
    },
    {
      id: 'train',
      title: 'Train',
      description: 'Book train tickets across the country.',
      icon: Train,
      iconBg: 'bg-[#06B6D4]',
      iconColor: 'text-white',
      link: '/train'
    },
    {
      id: 'rent-a-car',
      title: 'Rent a Car',
      description: 'Drive your freedom with our rental cars.',
      icon: Car,
      iconBg: 'bg-[#1E3A8A]',
      iconColor: 'text-white',
      link: '/rent-a-car'
    }
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => navigate(item.link)}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[160px]"
            >
              <div>
                {/* Rounded square icon badge */}
                <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center shadow-sm`}>
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="mt-3.5 text-[15px] font-bold text-slate-900 leading-tight">
                  {item.title}
                </h3>

                {/* Subtitle */}
                <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-snug">
                  {item.description}
                </p>
              </div>

              {/* Subtle chevron right arrow at bottom right */}
              <div className="mt-2 flex justify-end">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

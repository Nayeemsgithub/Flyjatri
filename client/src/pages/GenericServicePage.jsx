import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bus, Train, Car, Info, Phone, Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export default function GenericServicePage({ type }) {
  const location = useLocation();

  const serviceConfigs = {
    bus: {
      title: 'Intercity Bus Tickets',
      subtitle: 'Comfortable & reliable bus booking across Bangladesh',
      icon: Bus,
      gradient: 'from-amber-600 to-orange-700',
      description: 'Book AC, Non-AC, Sleeper & Scania bus seats across all major operators including Green Line, Shohagh, Hanif, and Shyamoli with zero convenience fees.',
      routes: [
        { from: 'Dhaka', to: "Cox's Bazar", operator: 'Green Line Scania', fare: '৳ 1,800', time: '10:00 PM' },
        { from: 'Dhaka', to: 'Sylhet', operator: 'Shohagh Elite', fare: '৳ 950', time: '08:30 AM' },
        { from: 'Dhaka', to: 'Chittagong', operator: 'Hanif Business', fare: '৳ 1,200', time: '11:15 PM' }
      ]
    },
    train: {
      title: 'Bangladesh Railway E-Ticketing',
      subtitle: 'Fast and secure railway ticket reservations',
      icon: Train,
      gradient: 'from-teal-700 to-cyan-900',
      description: 'Find real-time train schedules, seat availability, and book Suborno Express, Sonar Bangla, Parabat, and Silk City express trains easily.',
      routes: [
        { from: 'Dhaka', to: 'Chittagong', operator: 'Sonar Bangla Express (788)', fare: '৳ 1,150', time: '07:00 AM' },
        { from: 'Dhaka', to: 'Sylhet', operator: 'Parabat Express (709)', fare: '৳ 680', time: '06:20 AM' },
        { from: 'Dhaka', to: "Cox's Bazar", operator: 'Cox’s Bazar Express (814)', fare: '৳ 1,450', time: '10:30 PM' }
      ]
    },
    'rent-a-car': {
      title: 'Rent a Car Services',
      subtitle: 'Premium private sedans, SUVs, microbuses & luxury chauffeurs',
      icon: Car,
      gradient: 'from-blue-800 to-slate-900',
      description: 'Choose from well-maintained private cars, HiAce microbuses, and Noah MPVs with verified drivers for airport transfers, city tours, and district trips.',
      routes: [
        { from: 'Dhaka City', to: 'Airport Transfer', operator: 'Toyota Axio / Allion', fare: '৳ 1,800', time: 'Instant / 24/7' },
        { from: 'Dhaka', to: 'Padma Bridge Day Tour', operator: 'Toyota HiAce (11 Seats)', fare: '৳ 7,500', time: 'Full Day' },
        { from: 'Dhaka', to: 'Srimangal 2-Day Tour', operator: 'Toyota Noah (7 Seats)', fare: '৳ 14,000', time: '2 Days' }
      ]
    },
    about: {
      title: 'About FlyJatri',
      subtitle: 'Your Trusted Partner in Global Travel & Tourism',
      icon: Info,
      gradient: 'from-slate-800 to-slate-950',
      description: 'FlyJatri is Bangladesh’s premier digital travel technology company, bringing together airlines, hotels, transport operators, and visa consultants under one unified platform. We empower travelers with best-in-class fares, instant booking confirmations, and transparent 24/7 support.'
    },
    contact: {
      title: 'Contact FlyJatri Support',
      subtitle: 'We are here 24 hours a day, 7 days a week',
      icon: Phone,
      gradient: 'from-rose-900 to-slate-950',
      description: 'Have a question about your flight, tour booking, or visa application? Get in touch with our dedicated support team right away.'
    }
  };

  const config = serviceConfigs[type] || serviceConfigs.about;
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className={`bg-gradient-to-r ${config.gradient} rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-10`}>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{config.title}</h1>
          <p className="mt-2 text-slate-200 text-sm sm:text-base max-w-xl">{config.subtitle}</p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft">
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            {config.description}
          </p>

          {config.routes && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Popular Schedules & Fares</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {config.routes.map((route, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                      <span>{route.from} ➔ {route.to}</span>
                      <span className="text-[#E11D48]">{route.time}</span>
                    </div>
                    <div className="font-extrabold text-slate-800 text-sm">{route.operator}</div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-xs text-slate-500 font-semibold">Fare</span>
                      <span className="text-base font-black text-[#E11D48]">{route.fare}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <Phone className="w-8 h-8 text-[#E11D48] mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 text-sm">24/7 Hotline</h4>
                <p className="text-xs text-slate-600 mt-1">01321 060476<br />+880 9612 000000</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <Mail className="w-8 h-8 text-[#E11D48] mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 text-sm">Email Support</h4>
                <p className="text-xs text-slate-600 mt-1">support@flyjatri.com<br />booking@flyjatri.com</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <MapPin className="w-8 h-8 text-[#E11D48] mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 text-sm">Head Office</h4>
                <p className="text-xs text-slate-600 mt-1">Level 7, FlyJatri Tower<br />Gulshan-2, Dhaka 1212</p>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <Link
              to="/flights"
              className="px-6 py-2.5 bg-[#E11D48] hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5"
            >
              <span>Back to Flights & Tours</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

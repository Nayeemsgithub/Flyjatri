import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Send,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-extrabold italic text-[#E11D48] tracking-tighter">
                <span className="inline-block transform -skew-x-12">FLY</span>
                <span className="text-white ml-0.5">JATRI</span>
              </span>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase -mt-1">
                Your Trip Our Assistance
              </p>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Bangladesh’s most modern online travel agency and tour operator. Book cheap flights, luxury hotels, holiday tour packages, and seamless visa processing in minutes.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-[#E11D48]" />
                <span>24/7 Hotline: <strong>01321 060476</strong> / +880 9612 000000</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-[#E11D48]" />
                <span>support@flyjatri.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-[#E11D48]" />
                <span>Gulshan-2, Dhaka 1212, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Quick Services */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/flights" className="hover:text-white transition">Air Tickets Booking</Link></li>
              <li><Link to="/hotels" className="hover:text-white transition">Hotel Reservations</Link></li>
              <li><Link to="/tours" className="hover:text-white transition">Holiday Tour Packages</Link></li>
              <li><Link to="/visa" className="hover:text-white transition">Visa Processing Assistance</Link></li>
              <li><Link to="/bus" className="hover:text-white transition">Intercity Bus Tickets</Link></li>
              <li><Link to="/train" className="hover:text-white transition">Railway E-Ticketing</Link></li>
              <li><Link to="/rent-a-car" className="hover:text-white transition">Rent-A-Car Services</Link></li>
            </ul>
          </div>

          {/* Popular Flight Routes */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Top Routes
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/flights?from=DAC&to=DXB" className="hover:text-white transition">Dhaka to Dubai (DXB)</Link></li>
              <li><Link to="/flights?from=DAC&to=SIN" className="hover:text-white transition">Dhaka to Singapore (SIN)</Link></li>
              <li><Link to="/flights?from=DAC&to=BKK" className="hover:text-white transition">Dhaka to Bangkok (BKK)</Link></li>
              <li><Link to="/flights?from=DAC&to=CXB" className="hover:text-white transition">Dhaka to Cox's Bazar (CXB)</Link></li>
              <li><Link to="/flights?from=DAC&to=KUL" className="hover:text-white transition">Dhaka to Kuala Lumpur</Link></li>
              <li><Link to="/flights?from=DAC&to=LHR" className="hover:text-white transition">Dhaka to London Heathrow</Link></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Get Travel Deals
            </h4>
            <p className="text-xs text-slate-400">
              Subscribe to get secret promo codes and up to 40% discount on flights & tours.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to FlyJatri newsletter!'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full pl-3 pr-10 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E11D48]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#E11D48] text-white rounded-lg flex items-center justify-center hover:bg-rose-700"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#facebook" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#E11D48] hover:text-white flex items-center justify-center transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#instagram" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#E11D48] hover:text-white flex items-center justify-center transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#E11D48] hover:text-white flex items-center justify-center transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#E11D48] hover:text-white flex items-center justify-center transition">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar with payment methods & copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>FlyJatri</strong>. All rights reserved. Built with MERN Stack.
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Payment Partners:</span>
            <div className="flex items-center gap-2 font-bold text-slate-300">
              <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-pink-400 border border-slate-700">bKash</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-orange-400 border border-slate-700">Nagad</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-blue-400 border border-slate-700">VISA</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-red-400 border border-slate-700">MasterCard</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Headphones, 
  Search, 
  User, 
  Menu, 
  X, 
  LogOut, 
  Ticket,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, openLoginModal } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Flights', path: '/flights' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Tour Packages', path: '/tours' },
    { name: 'Visa', path: '/visa' },
    { name: 'Bus', path: '/bus' },
    { name: 'Train', path: '/train' },
    { name: 'Rent a Car', path: '/rent-a-car' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Brand Logo matching image */}
          <Link to="/" className="flex items-center gap-1.5 group flex-shrink-0">
            {/* Wing / Plane stylized mark */}
            <div className="flex items-center">
              <svg className="w-8 h-7 text-[#E11D48]" viewBox="0 0 36 28" fill="currentColor">
                <path d="M4 22L16 4h6l-8 18h-10zm12 0l8-12h6l-5 12h-9zm11 0l4-6h5l-3 6h-6z"/>
              </svg>
              <div className="flex flex-col -ml-1">
                <span className="text-[26px] font-black italic tracking-tighter text-[#E11D48] leading-none">
                  FLYJATRI
                </span>
                <span className="text-[8px] font-bold tracking-[0.2em] text-slate-700 uppercase -mt-0.5">
                  YOUR TRIP OUR ASSISTANCE
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-[13.5px] font-medium text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`py-1 relative transition-colors ${
                  isActive(link.path)
                    ? 'text-[#E11D48] font-semibold'
                    : 'text-slate-700 hover:text-[#E11D48]'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-[23px] left-0 right-0 h-[2.5px] bg-[#E11D48] rounded-t-sm"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center space-x-5">
            
            {/* 24/7 Support */}
            <a 
              href="tel:01321060476" 
              className="flex items-center gap-2 text-slate-800 hover:text-[#E11D48] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#0F172A]">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="text-left leading-none">
                <div className="text-[10px] text-slate-500 font-medium">24/7 Support</div>
                <div className="text-[12.5px] font-bold text-slate-900 mt-0.5">01321 060476</div>
              </div>
            </a>

            {/* Search Icon */}
            <button 
              onClick={() => navigate('/flights')}
              className="p-1.5 text-slate-700 hover:text-[#E11D48] transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Login / Register */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 py-1.5 px-3 rounded-full"
                >
                  <User className="w-3.5 h-3.5 text-slate-600" />
                  <span>{user.name?.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50">
                    <Link
                      to="/my-bookings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#E11D48]"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-[#E11D48] transition-colors"
              >
                <User className="w-4 h-4 text-slate-700" />
                <span>Login / Register</span>
              </button>
            )}

            {/* Hamburger Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-slate-800 hover:text-[#E11D48]"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={openLoginModal}
              className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-full"
            >
              {user ? user.name?.split(' ')[0] : 'Login'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-medium ${
                  isActive(link.path)
                    ? 'bg-rose-50 text-[#E11D48] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <a href="tel:01321060476" className="flex items-center gap-1.5 font-bold text-slate-800">
              <Headphones className="w-4 h-4 text-[#E11D48]" />
              <span>01321 060476</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

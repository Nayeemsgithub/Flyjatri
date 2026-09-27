import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Headphones, 
  Search, 
  User, 
  Menu, 
  X, 
  Plane, 
  LogOut, 
  Briefcase, 
  Ticket,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, openLoginModal, openRegisterModal } = useAuth();
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo matching image */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex flex-col">
              <div className="flex items-center tracking-tight">
                <span className="text-2xl sm:text-3xl font-extrabold italic text-[#E11D48] tracking-tighter flex items-center">
                  <span className="inline-block transform -skew-x-12">FLY</span>
                  <span className="text-slate-900 ml-0.5">JATRI</span>
                </span>
                <div className="ml-1 w-2.5 h-2.5 bg-[#E11D48] rounded-full animate-pulse"></div>
              </div>
              <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase -mt-1">
                Your Trip Our Assistance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-5 text-[14px] font-medium text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors py-1 relative hover:text-[#E11D48] ${
                  isActive(link.path)
                    ? 'text-[#E11D48] font-semibold'
                    : 'text-slate-600'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E11D48] rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden lg:flex items-center space-x-6">
            
            {/* 24/7 Support Hotline */}
            <a 
              href="tel:01321060476" 
              className="flex items-center gap-2.5 text-slate-700 hover:text-[#E11D48] transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-[#E11D48] group-hover:bg-rose-50 transition-colors">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-[11px] font-medium text-slate-500">24/7 Support</div>
                <div className="text-[13px] font-bold text-slate-800 tracking-tight">01321 060476</div>
              </div>
            </a>

            {/* Quick Search */}
            <button 
              onClick={() => navigate('/flights')}
              className="p-2 text-slate-600 hover:text-[#E11D48] hover:bg-slate-50 rounded-full transition-colors"
              title="Search Flights & Tours"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Login/Register or Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full py-1.5 px-3.5 text-sm font-semibold text-slate-800 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-[#E11D48] text-white flex items-center justify-center font-bold text-xs">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/my-bookings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#E11D48]"
                    >
                      <Ticket className="w-4 h-4 text-slate-400" />
                      My Bookings & E-Tickets
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#E11D48] transition px-3 py-1.5 rounded-lg hover:bg-slate-50"
              >
                <User className="w-4 h-4" />
                <span>Login / Register</span>
              </button>
            )}

            {/* Hamburger Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-[#E11D48] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={openLoginModal}
              className="text-xs font-semibold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-full"
            >
              {user ? user.name.split(' ')[0] : 'Login'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#E11D48]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in fade-in">
          <div className="grid grid-cols-2 gap-2 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-rose-50 text-[#E11D48] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a 
              href="tel:01321060476" 
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl"
            >
              <Headphones className="w-4 h-4 text-[#E11D48]" />
              <span>24/7 Helpline: <strong>01321 060476</strong></span>
            </a>
            {user ? (
              <div className="flex gap-2">
                <Link
                  to="/my-bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold"
                >
                  My Bookings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    openLoginModal();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 bg-[#E11D48] text-white rounded-xl text-sm font-bold shadow-md hover:bg-rose-700"
                >
                  Login / Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

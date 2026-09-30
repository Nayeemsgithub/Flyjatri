import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Search, 
  User, 
  Menu, 
  X, 
  LogOut, 
  Ticket,
  ChevronDown,
  Smartphone,
  MessageCircle,
  Globe,
  Compass,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import FlyJatriLogo from './FlyJatriLogo';
import FlagIcon from './FlagIcon';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const { selectedCurrency, currencies, changeCurrency } = useCurrency();
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
        <div className="flex items-center justify-between h-[72px] gap-4">
          
          {/* 1. Brand Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <FlyJatriLogo variant="red" showSubtext={true} height={30} />
          </Link>

          {/* Right Action Items in Exact Clean Sequence: Currency (with dynamic Flag) -> Helpline -> Login/Register */}
          <div className="flex items-center space-x-3 sm:space-x-5">

            {/* 2. Currency Selector (Enlarged & Prominent) */}
            <div className="relative">
              <button
                onClick={() => {
                  setCurrencyMenuOpen(!currencyMenuOpen);
                  setUserMenuOpen(false);
                }}
                className="flex items-center gap-2.5 text-sm font-extrabold text-slate-900 hover:text-[#E11D48] transition-all py-2 px-3 rounded-xl hover:bg-slate-100/80 border border-slate-200/70 shadow-2xs"
                title={`Selected Currency: ${selectedCurrency.name}`}
              >
                {/* Dynamic Vector Country Flag */}
                <FlagIcon 
                  countryCode={selectedCurrency.country || selectedCurrency.code} 
                  className="w-6 sm:w-7 h-4 sm:h-4.5 rounded-[2.5px] shadow-xs" 
                />
                <span className="font-bold tracking-wide text-slate-900 text-sm sm:text-[14.5px]">
                  {selectedCurrency.code}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {currencyMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                    <span>Select Currency</span>
                    <span className="text-[9.5px] text-slate-400 lowercase font-normal">auto-converting</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1.5 px-1 space-y-0.5">
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          changeCurrency(curr);
                          setCurrencyMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-[13px] transition-colors text-left ${
                          selectedCurrency.code === curr.code
                            ? 'bg-rose-50 text-[#E11D48] font-bold'
                            : 'text-slate-700 hover:bg-slate-50 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <FlagIcon 
                            countryCode={curr.country || curr.code} 
                            className="w-6 h-4 rounded-[2.5px] shadow-xs" 
                          />
                          <div>
                            <div className="font-bold leading-tight text-slate-900">{curr.code}</div>
                            <div className="text-[10.5px] text-slate-500 font-normal leading-tight">{curr.name}</div>
                          </div>
                        </div>
                        <span className="text-slate-600 font-mono text-xs font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                          {curr.symbol}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Helpline / Customer Support (Enlarged & Prominent) */}
            <a 
              href="https://wa.me/8801321060476" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-900 hover:text-[#E11D48] transition-colors py-1.5 px-3 rounded-xl hover:bg-slate-100/80"
              title="24/7 Customer Support Helpline"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md shadow-emerald-500/20 flex-shrink-0">
                <MessageCircle className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-white" />
              </div>
              <div className="text-left hidden sm:block leading-tight">
                <div className="text-sm sm:text-[14.5px] font-bold text-slate-900 hover:text-[#E11D48]">Customer Support</div>
                <div className="text-xs sm:text-[12px] text-slate-600 font-semibold mt-0.5">01321 060476</div>
              </div>
            </a>

            {/* 4. Login / Register Pill Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setCurrencyMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 py-2.5 px-4 sm:px-5 rounded-full transition-colors shadow-xs"
                >
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>{user.name?.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    
                    {/* User Header */}
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70 rounded-t-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E11D48] to-rose-600 text-white font-bold flex items-center justify-center text-sm shadow-xs flex-shrink-0">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs sm:text-[13px] font-extrabold text-slate-900 truncate">
                            {user.name}
                          </div>
                          <div className="text-[10.5px] text-slate-500 truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="p-1.5 space-y-0.5 text-xs">
                      <Link
                        to="/my-bookings?tab=bookings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-[#E11D48] transition-colors font-semibold"
                      >
                        <Ticket className="w-4 h-4 text-slate-500" />
                        <span>My Bookings & History</span>
                      </Link>

                      <Link
                        to="/my-bookings?tab=track"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-[#E11D48] transition-colors font-semibold"
                      >
                        <Compass className="w-4 h-4 text-[#E11D48]" />
                        <span>Track Booking & PNR</span>
                      </Link>

                      <Link
                        to="/my-bookings?tab=profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-[#E11D48] transition-colors font-semibold"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        <span>Edit Profile & Personal Info</span>
                      </Link>

                      <Link
                        to="/my-bookings?tab=security"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-[#E11D48] transition-colors font-semibold"
                      >
                        <Shield className="w-4 h-4 text-slate-500" />
                        <span>Account Security</span>
                      </Link>
                    </div>

                    {/* Divider & Sign Out */}
                    <div className="pt-1 border-t border-slate-100 p-1.5">
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 active:scale-95 py-2 px-4 rounded-full transition-all shadow-sm whitespace-nowrap"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-xs">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>Sign In/Register</span>
              </button>
            )}

            {/* Mobile / Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-800 hover:text-[#E11D48] 2xl:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="2xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg">
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
              <Phone className="w-4 h-4 text-[#E11D48]" />
              <span>01321 060476</span>
            </a>
            <span className="text-slate-500 font-medium">FlyJatri 24/7 Support</span>
          </div>
        </div>
      )}
    </header>
  );
}

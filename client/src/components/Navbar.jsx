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
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FlyJatriLogo from './FlyJatriLogo';

const currencies = [
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', flag: '🇧🇩' },
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', flag: '🇲🇾' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
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

          {/* Right Action Items in Exact Clean Sequence: Currency -> Helpline -> Login/Register */}
          <div className="flex items-center space-x-3 sm:space-x-5">

            {/* 2. Currency Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setCurrencyMenuOpen(!currencyMenuOpen);
                  setUserMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-[#E11D48] transition-colors py-1.5 px-2 rounded-lg hover:bg-slate-50"
                title="Select Currency"
              >
                <span className="text-base leading-none">{selectedCurrency.flag}</span>
                <span>{selectedCurrency.code}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {currencyMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Select Currency
                  </div>
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setSelectedCurrency(curr);
                        setCurrencyMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left ${
                        selectedCurrency.code === curr.code
                          ? 'bg-rose-50 text-[#E11D48] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base leading-none">{curr.flag}</span>
                        <span>{curr.code}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[11px]">{curr.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Helpline / Customer Support */}
            <a 
              href="https://wa.me/8801321060476" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-800 hover:text-[#E11D48] transition-colors py-1 px-1.5 rounded-lg hover:bg-slate-50"
              title="24/7 Customer Support Helpline"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <MessageCircle className="w-4 h-4 fill-white" />
              </div>
              <div className="text-left hidden sm:block leading-none">
                <div className="text-[12px] font-bold text-slate-800 hover:text-[#E11D48]">Customer Support</div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">01321 060476</div>
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
                  className="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 py-2 px-4 rounded-full transition-colors shadow-sm"
                >
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{user.name?.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-indigo-500" />
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

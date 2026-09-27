import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, 
  Building2, 
  Palmtree, 
  CreditCard, 
  Bus, 
  Train, 
  Car, 
  Search, 
  Calendar, 
  Users, 
  MapPin, 
  ArrowRightLeft,
  ChevronDown,
  Sparkles,
  Check
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function HeroSearch() {
  const navigate = useNavigate();
  const { searchCriteria, updateSearchCriteria } = useBooking();
  
  const [activeTab, setActiveTab] = useState('flights'); // 'flights' | 'hotels' | 'tours' | 'visa' | 'bus' | 'train' | 'cars'
  const [tripType, setTripType] = useState('roundTrip'); // 'roundTrip' | 'oneWay' | 'multiCity'

  // Popover toggles
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  // Flight search states
  const [fromLocation, setFromLocation] = useState({ city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' });
  const [toLocation, setToLocation] = useState({ city: 'Dubai', code: 'DXB', airport: 'Dubai International' });
  const [departureDate, setDepartureDate] = useState('2026-09-25');
  const [returnDate, setReturnDate] = useState('2026-09-26');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass] = useState('Economy');

  // Hotel search states
  const [hotelCity, setHotelCity] = useState('Dubai');
  const [hotelCheckIn, setHotelCheckIn] = useState('2026-09-25');
  const [hotelCheckOut, setHotelCheckOut] = useState('2026-09-30');
  const [hotelGuests, setHotelGuests] = useState('2 Guests, 1 Room');

  // Tour search states
  const [tourDestination, setTourDestination] = useState('Maldives');
  const [tourDuration, setTourDuration] = useState('5-7 Days');

  // Visa search states
  const [visaCountry, setVisaCountry] = useState('United Arab Emirates (Dubai)');
  const [visaType, setVisaType] = useState('Tourist Visa');

  // Popular airport list for quick selection
  const airports = [
    { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl, Bangladesh' },
    { city: 'Dubai', code: 'DXB', airport: 'Dubai International, UAE' },
    { city: 'Singapore', code: 'SIN', airport: 'Changi International, Singapore' },
    { city: 'Bangkok', code: 'BKK', airport: 'Suvarnabhumi Airport, Thailand' },
    { city: "Cox's Bazar", code: 'CXB', airport: "Cox's Bazar Domestic, Bangladesh" },
    { city: 'Chittagong', code: 'CGP', airport: 'Shah Amanat Intl, Bangladesh' },
    { city: 'London', code: 'LHR', airport: 'Heathrow Airport, United Kingdom' },
    { city: 'Kuala Lumpur', code: 'KUL', airport: 'KLIA, Malaysia' }
  ];

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane, color: 'text-red-500' },
    { id: 'hotels', label: 'Hotels', icon: Building2, color: 'text-blue-500' },
    { id: 'tours', label: 'Tour Packages', icon: Palmtree, color: 'text-emerald-500' },
    { id: 'visa', label: 'Visa', icon: CreditCard, color: 'text-purple-500' },
    { id: 'bus', label: 'Bus', icon: Bus, color: 'text-amber-500' },
    { id: 'train', label: 'Train', icon: Train, color: 'text-cyan-500' },
    { id: 'cars', label: 'Rent a Car', icon: Car, color: 'text-indigo-500' }
  ];

  const handleSwapLocations = (e) => {
    e.stopPropagation();
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'flights') {
      updateSearchCriteria({
        from: fromLocation,
        to: toLocation,
        departureDate,
        returnDate,
        tripType,
        passengers,
        cabinClass
      });
      navigate(`/flights?from=${fromLocation.code}&to=${toLocation.code}&date=${departureDate}`);
    } else if (activeTab === 'hotels') {
      navigate(`/hotels?city=${hotelCity}`);
    } else if (activeTab === 'tours') {
      navigate(`/tours?destination=${tourDestination}`);
    } else if (activeTab === 'visa') {
      navigate(`/visa?country=${visaCountry}`);
    } else {
      navigate('/flights');
    }
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <div className="relative w-full bg-slate-900 overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center">
      
      {/* High-res Hero Aerial Airplane Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=2000&q=85')`
        }}
      >
        {/* Subtle overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full z-10">
        
        {/* Hero Top Title & Inspirational Callouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          <div className="lg:col-span-8 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-widest mb-4">
              <span>EXPLORE THE WORLD</span>
              <span className="text-rose-400">⟶</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Your Complete Travel <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-rose-200">
                Solution
              </span>
            </h1>

            <p className="mt-4 text-slate-200 text-sm sm:text-base max-w-2xl font-normal leading-relaxed drop-shadow-sm">
              Flights, Hotels, Tours, Visa, Transport & More – All in One Place. Plan Your Next Journey with FlyJatri.
            </p>
          </div>

          {/* Hand-drawn style floating badge matching image */}
          <div className="hidden lg:flex lg:col-span-4 justify-end items-center pr-6">
            <div className="text-right text-white/90 transform rotate-3 select-none">
              <p className="font-handwriting text-3xl sm:text-4xl text-rose-200 font-bold leading-none tracking-wide drop-shadow-md">
                More Journeys ➔ <br />
                <span className="text-white text-4xl sm:text-5xl">More Stories</span>
              </p>
              <div className="flex justify-end gap-1 text-rose-400 mt-2">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </div>

        </div>

        {/* Tabbed Booking Search Widget */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-visible border border-slate-100 p-2 sm:p-3 relative">
          
          {/* Top Tabs matching exact visual pill style */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none border-b border-slate-100/80 px-2 pt-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#E11D48] text-white shadow-md shadow-rose-500/25 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Trip Type Radios (For Flights) */}
          {activeTab === 'flights' && (
            <div className="flex items-center space-x-6 px-4 pt-3 pb-1 text-xs font-semibold text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === 'roundTrip'}
                  onChange={() => setTripType('roundTrip')}
                  className="accent-[#E11D48] w-4 h-4 cursor-pointer"
                />
                <span>Round Trip</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === 'oneWay'}
                  onChange={() => setTripType('oneWay')}
                  className="accent-[#E11D48] w-4 h-4 cursor-pointer"
                />
                <span>One Way</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === 'multiCity'}
                  onChange={() => setTripType('multiCity')}
                  className="accent-[#E11D48] w-4 h-4 cursor-pointer"
                />
                <span>Multi-City</span>
              </label>
            </div>
          )}

          {/* Search Inputs Container */}
          <form onSubmit={handleSearchSubmit} className="mt-2 p-2">
            
            {/* FLIGHTS TAB FIELDS */}
            {activeTab === 'flights' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 lg:gap-0 bg-slate-50/70 p-2 rounded-2xl border border-slate-200/70">
                
                {/* 1. Origin (From) */}
                <div className="relative lg:col-span-3 bg-white p-3 rounded-xl lg:rounded-r-none border border-slate-200/80 hover:border-[#E11D48]/50 transition-colors">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">From</div>
                  <button
                    type="button"
                    onClick={() => setShowFromDropdown(!showFromDropdown)}
                    className="w-full text-left flex items-center justify-between mt-1 focus:outline-none"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Plane className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-slate-800">
                          {fromLocation.city} <span className="text-xs text-slate-500 font-normal">({fromLocation.code})</span>
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                          {fromLocation.airport}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* From Dropdown menu */}
                  {showFromDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
                      <div className="text-xs font-bold text-slate-400 px-3 py-1.5 uppercase">Select Origin Airport</div>
                      <div className="max-h-56 overflow-y-auto space-y-1">
                        {airports.map((ap) => (
                          <button
                            key={ap.code}
                            type="button"
                            onClick={() => {
                              setFromLocation(ap);
                              setShowFromDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 flex items-center justify-between text-xs group"
                          >
                            <div>
                              <div className="font-bold text-slate-800 group-hover:text-[#E11D48]">{ap.city} ({ap.code})</div>
                              <div className="text-[10px] text-slate-400 truncate">{ap.airport}</div>
                            </div>
                            {fromLocation.code === ap.code && <Check className="w-3.5 h-3.5 text-[#E11D48]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Swap Button (Floating) */}
                  <button
                    type="button"
                    onClick={handleSwapLocations}
                    className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm items-center justify-center text-slate-600 hover:text-[#E11D48] hover:border-rose-300 z-20"
                    title="Swap Destination"
                  >
                    <ArrowRightLeft className="w-3 h-3" />
                  </button>
                </div>

                {/* 2. Destination (To) */}
                <div className="relative lg:col-span-3 bg-white p-3 rounded-xl lg:rounded-none border border-slate-200/80 hover:border-[#E11D48]/50 transition-colors">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">To</div>
                  <button
                    type="button"
                    onClick={() => setShowToDropdown(!showToDropdown)}
                    className="w-full text-left flex items-center justify-between mt-1 focus:outline-none"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-slate-800">
                          {toLocation.city} <span className="text-xs text-slate-500 font-normal">({toLocation.code})</span>
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                          {toLocation.airport}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* To Dropdown menu */}
                  {showToDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
                      <div className="text-xs font-bold text-slate-400 px-3 py-1.5 uppercase">Select Destination</div>
                      <div className="max-h-56 overflow-y-auto space-y-1">
                        {airports.map((ap) => (
                          <button
                            key={ap.code}
                            type="button"
                            onClick={() => {
                              setToLocation(ap);
                              setShowToDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 flex items-center justify-between text-xs group"
                          >
                            <div>
                              <div className="font-bold text-slate-800 group-hover:text-[#E11D48]">{ap.city} ({ap.code})</div>
                              <div className="text-[10px] text-slate-400 truncate">{ap.airport}</div>
                            </div>
                            {toLocation.code === ap.code && <Check className="w-3.5 h-3.5 text-[#E11D48]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Departure Date */}
                <div className="lg:col-span-2 bg-white p-3 rounded-xl lg:rounded-none border border-slate-200/80 hover:border-[#E11D48]/50 transition-colors">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Departure Date</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full text-xs sm:text-sm font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* 4. Return Date */}
                <div className={`lg:col-span-2 bg-white p-3 rounded-xl lg:rounded-none border border-slate-200/80 hover:border-[#E11D48]/50 transition-colors ${tripType === 'oneWay' ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Return Date</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <input
                      type="date"
                      value={returnDate}
                      disabled={tripType === 'oneWay'}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full text-xs sm:text-sm font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* 5. Passengers & Class */}
                <div className="relative lg:col-span-2 bg-white p-3 rounded-xl lg:rounded-l-none border border-slate-200/80 hover:border-[#E11D48]/50 transition-colors">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Passengers & Class</div>
                  <button
                    type="button"
                    onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                    className="w-full text-left flex items-center justify-between mt-1 focus:outline-none"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {totalPassengers} {totalPassengers > 1 ? 'Passengers' : 'Adult'} · {cabinClass}
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  </button>

                  {/* Passenger Popover */}
                  {showPassengerDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 space-y-4">
                      <div className="space-y-3">
                        {/* Adults */}
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-slate-800">Adults</div>
                            <div className="text-slate-400 text-[10px]">12+ years</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setPassengers(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                              className="w-6 h-6 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center font-bold hover:bg-slate-100"
                            >-</button>
                            <span className="w-4 text-center font-bold text-slate-800">{passengers.adults}</span>
                            <button
                              type="button"
                              onClick={() => setPassengers(p => ({ ...p, adults: p.adults + 1 }))}
                              className="w-6 h-6 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center font-bold hover:bg-slate-100"
                            >+</button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-slate-800">Children</div>
                            <div className="text-slate-400 text-[10px]">2-11 years</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setPassengers(p => ({ ...p, children: Math.max(0, p.children - 1) }))}
                              className="w-6 h-6 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center font-bold hover:bg-slate-100"
                            >-</button>
                            <span className="w-4 text-center font-bold text-slate-800">{passengers.children}</span>
                            <button
                              type="button"
                              onClick={() => setPassengers(p => ({ ...p, children: p.children + 1 }))}
                              className="w-6 h-6 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center font-bold hover:bg-slate-100"
                            >+</button>
                          </div>
                        </div>

                        {/* Cabin Class */}
                        <div className="pt-2 border-t border-slate-100">
                          <label className="text-[11px] font-semibold text-slate-400 uppercase">Cabin Class</label>
                          <select
                            value={cabinClass}
                            onChange={(e) => setCabinClass(e.target.value)}
                            className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none"
                          >
                            <option value="Economy">Economy</option>
                            <option value="Premium Economy">Premium Economy</option>
                            <option value="Business">Business Class</option>
                            <option value="First">First Class</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowPassengerDropdown(false)}
                        className="w-full py-1.5 bg-[#E11D48] text-white rounded-lg text-xs font-bold hover:bg-rose-700"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* HOTELS TAB FIELDS */}
            {activeTab === 'hotels' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-50/70 p-2 rounded-2xl border border-slate-200/70">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold uppercase text-slate-400">Destination City / Hotel</div>
                  <input
                    type="text"
                    value={hotelCity}
                    onChange={(e) => setHotelCity(e.target.value)}
                    placeholder="e.g. Dubai, Singapore, Cox's Bazar"
                    className="w-full mt-1 font-bold text-slate-800 text-sm bg-transparent focus:outline-none"
                  />
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold uppercase text-slate-400">Check-in / Check-out</div>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="date"
                      value={hotelCheckIn}
                      onChange={(e) => setHotelCheckIn(e.target.value)}
                      className="text-xs font-bold text-slate-800 focus:outline-none"
                    />
                    <span className="text-slate-400">➔</span>
                    <input
                      type="date"
                      value={hotelCheckOut}
                      onChange={(e) => setHotelCheckOut(e.target.value)}
                      className="text-xs font-bold text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold uppercase text-slate-400">Rooms & Guests</div>
                  <input
                    type="text"
                    value={hotelGuests}
                    onChange={(e) => setHotelGuests(e.target.value)}
                    className="w-full mt-1 font-bold text-slate-800 text-sm bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* TOUR PACKAGES TAB FIELDS */}
            {activeTab === 'tours' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-50/70 p-2 rounded-2xl border border-slate-200/70">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold uppercase text-slate-400">Tour Destination</div>
                  <select
                    value={tourDestination}
                    onChange={(e) => setTourDestination(e.target.value)}
                    className="w-full mt-1 font-bold text-slate-800 text-sm bg-transparent focus:outline-none"
                  >
                    <option value="Maldives">Maldives Luxury Island Tour</option>
                    <option value="Cox's Bazar">Cox's Bazar 5-Star Beach Haven</option>
                    <option value="Dubai">Dubai Desert & City Wonders</option>
                    <option value="Sajek Valley">Sajek Valley Cloud Tour</option>
                  </select>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold uppercase text-slate-400">Duration / Theme</div>
                  <select
                    value={tourDuration}
                    onChange={(e) => setTourDuration(e.target.value)}
                    className="w-full mt-1 font-bold text-slate-800 text-sm bg-transparent focus:outline-none"
                  >
                    <option value="3-5 Days">3-5 Days Short Trip</option>
                    <option value="5-7 Days">5-7 Days Standard Holiday</option>
                    <option value="Honeymoon">Honeymoon & Romantic Special</option>
                  </select>
                </div>
              </div>
            )}

            {/* VISA TAB FIELDS */}
            {activeTab === 'visa' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-50/70 p-2 rounded-2xl border border-slate-200/70">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold uppercase text-slate-400">Visa Country</div>
                  <select
                    value={visaCountry}
                    onChange={(e) => setVisaCountry(e.target.value)}
                    className="w-full mt-1 font-bold text-slate-800 text-sm bg-transparent focus:outline-none"
                  >
                    <option value="United Arab Emirates (Dubai)">United Arab Emirates (Dubai)</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Singapore">Singapore</option>
                    <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                    <option value="United States (USA)">United States (USA)</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                  </select>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold uppercase text-slate-400">Visa Category</div>
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    className="w-full mt-1 font-bold text-slate-800 text-sm bg-transparent focus:outline-none"
                  >
                    <option value="Tourist Visa">Tourist Visa</option>
                    <option value="Business Visa">Business Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Work Permit Visa">Work Permit Assistance</option>
                  </select>
                </div>
              </div>
            )}

            {/* BUS, TRAIN, CAR SIMPLE INPUTS */}
            {(activeTab === 'bus' || activeTab === 'train' || activeTab === 'cars') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-50/70 p-2 rounded-2xl border border-slate-200/70">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold uppercase text-slate-400">From City / Station</div>
                  <input
                    type="text"
                    defaultValue="Dhaka"
                    className="w-full mt-1 font-bold text-slate-800 text-sm bg-transparent focus:outline-none"
                  />
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold uppercase text-slate-400">To Destination</div>
                  <input
                    type="text"
                    defaultValue="Cox's Bazar"
                    className="w-full mt-1 font-bold text-slate-800 text-sm bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Search Submit Button matching Red visual pill */}
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] active:scale-98 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-rose-600/30 transition-all duration-200"
              >
                <Search className="w-5 h-5" />
                <span>
                  {activeTab === 'flights' && 'Search Flights'}
                  {activeTab === 'hotels' && 'Find Hotels'}
                  {activeTab === 'tours' && 'Discover Tours'}
                  {activeTab === 'visa' && 'Explore Visa Guidelines'}
                  {activeTab === 'bus' && 'Search Bus Tickets'}
                  {activeTab === 'train' && 'Search Trains'}
                  {activeTab === 'cars' && 'Rent a Car Now'}
                </span>
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

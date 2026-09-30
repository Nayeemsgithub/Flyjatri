import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, 
  Building2, 
  Palmtree, 
  Globe2, 
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
  Check,
  CreditCard
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function HeroSearch() {
  const navigate = useNavigate();
  const { searchCriteria, updateSearchCriteria } = useBooking();
  
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('roundTrip');

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
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'tours', label: 'Tour Packages', icon: Palmtree },
    { id: 'visa', label: 'Visa', icon: CreditCard },
    { id: 'bus', label: 'Bus', icon: Bus },
    { id: 'train', label: 'Train', icon: Train },
    { id: 'cars', label: 'Rent a Car', icon: Car }
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
    <div className="relative w-full bg-slate-900 overflow-hidden min-h-[560px] lg:min-h-[620px] flex items-center">
      
      {/* High-res Hero Aerial Airplane Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=2000&q=85')`
        }}
      >
        {/* Subtle overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 w-full z-10">
        
        {/* Hero Top Title & Callouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
          
          <div className="lg:col-span-8 text-white">
            <div className="inline-flex items-center gap-1.5 text-rose-400 text-xs font-bold uppercase tracking-widest mb-3">
              <span>EXPLORE THE WORLD</span>
              <span className="text-rose-400">⟶</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.1]">
              Your Complete Travel <br />
              <span>Solution</span>
            </h1>

            <p className="mt-3 text-slate-200 text-xs sm:text-sm max-w-xl font-normal leading-relaxed drop-shadow-sm">
              Flights, Hotels, Tours, Visa, Transport & More – <br />
              All in One Place. Plan Your Next Journey with FlyJatri.
            </p>
          </div>

          {/* Hand-drawn style floating badge matching image */}
          <div className="hidden lg:flex lg:col-span-4 justify-end items-center pr-4 pt-2">
            <div className="text-right text-white transform rotate-2 select-none">
              <p className="font-handwriting text-3xl sm:text-4xl text-rose-100 font-bold leading-none tracking-wide drop-shadow-md">
                More <br />
                <span className="text-white text-3xl sm:text-4xl">Journeys ➔</span> <br />
                <span className="text-white text-4xl sm:text-5xl">More Stories</span>
              </p>
            </div>
          </div>

        </div>

        {/* Tabbed Booking Search Widget */}
        <div className="w-full">
          
          {/* Top Tabs Pill Container */}
          <div className="inline-flex items-center bg-white/95 backdrop-blur-md rounded-t-2xl shadow-md border-t border-l border-r border-slate-100 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#E11D48] text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar Row Container */}
          <div className="bg-white rounded-b-3xl rounded-tr-3xl shadow-2xl border border-slate-100 p-3 sm:p-4">
            
            <form onSubmit={handleSearchSubmit}>
              
              {/* FLIGHTS TAB FIELDS */}
              {activeTab === 'flights' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 lg:gap-0 items-center bg-white rounded-2xl border border-slate-200">
                  
                  {/* 1. Origin (From) */}
                  <div className="relative lg:col-span-2 p-3 lg:border-r border-slate-200 hover:bg-slate-50/50 transition">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">From</div>
                    <button
                      type="button"
                      onClick={() => setShowFromDropdown(!showFromDropdown)}
                      className="w-full text-left flex items-center justify-between mt-0.5 focus:outline-none"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Plane className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <div className="truncate">
                          <div className="text-xs sm:text-sm font-bold text-slate-900">
                            {fromLocation.city} ({fromLocation.code})
                          </div>
                        </div>
                      </div>
                    </button>

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
                  </div>

                  {/* 2. Destination (To) */}
                  <div className="relative lg:col-span-3 p-3 lg:border-r border-slate-200 hover:bg-slate-50/50 transition">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">To</div>
                    <button
                      type="button"
                      onClick={() => setShowToDropdown(!showToDropdown)}
                      className="w-full text-left flex items-center justify-between mt-0.5 focus:outline-none"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Plane className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <div className="truncate">
                          <div className="text-xs sm:text-sm font-bold text-slate-900">
                            {toLocation.city ? `${toLocation.city} (${toLocation.code})` : 'Select Destination'}
                          </div>
                        </div>
                      </div>
                    </button>

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
                  <div className="lg:col-span-2 p-3 lg:border-r border-slate-200 hover:bg-slate-50/50 transition">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Departure Date</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full text-xs sm:text-sm font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* 4. Return Date */}
                  <div className="lg:col-span-2 p-3 lg:border-r border-slate-200 hover:bg-slate-50/50 transition">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Return Date</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full text-xs sm:text-sm font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* 5. Passengers & Class */}
                  <div className="relative lg:col-span-3 p-3 hover:bg-slate-50/50 transition flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Passengers & Class</div>
                      <button
                        type="button"
                        onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                        className="text-left flex items-center gap-2 mt-0.5 focus:outline-none"
                      >
                        <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {totalPassengers} {totalPassengers > 1 ? 'Adults' : 'Adult'} · {cabinClass}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    </div>

                    {/* Popover */}
                    {showPassengerDropdown && (
                      <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <div>
                              <div className="font-bold text-slate-800">Adults</div>
                              <div className="text-slate-400 text-[10px]">12+ years</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setPassengers(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                                className="w-6 h-6 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center font-bold"
                              >-</button>
                              <span className="w-4 text-center font-bold text-slate-800">{passengers.adults}</span>
                              <button
                                type="button"
                                onClick={() => setPassengers(p => ({ ...p, adults: p.adults + 1 }))}
                                className="w-6 h-6 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center font-bold"
                              >+</button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <div>
                              <div className="font-bold text-slate-800">Children</div>
                              <div className="text-slate-400 text-[10px]">2-11 years</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setPassengers(p => ({ ...p, children: Math.max(0, p.children - 1) }))}
                                className="w-6 h-6 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center font-bold"
                              >-</button>
                              <span className="w-4 text-center font-bold text-slate-800">{passengers.children}</span>
                              <button
                                type="button"
                                onClick={() => setPassengers(p => ({ ...p, children: p.children + 1 }))}
                                className="w-6 h-6 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center font-bold"
                              >+</button>
                            </div>
                          </div>

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-white p-2 rounded-2xl border border-slate-200">
                  <div className="p-2 border-r border-slate-200">
                    <div className="text-[10px] font-semibold uppercase text-slate-400">Destination City / Hotel</div>
                    <input
                      type="text"
                      value={hotelCity}
                      onChange={(e) => setHotelCity(e.target.value)}
                      placeholder="e.g. Dubai, Singapore"
                      className="w-full mt-1 font-bold text-slate-900 text-xs sm:text-sm bg-transparent focus:outline-none"
                    />
                  </div>

                  <div className="p-2 border-r border-slate-200">
                    <div className="text-[10px] font-semibold uppercase text-slate-400">Check-in / Check-out</div>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="date"
                        value={hotelCheckIn}
                        onChange={(e) => setHotelCheckIn(e.target.value)}
                        className="text-xs font-bold text-slate-900 focus:outline-none"
                      />
                      <span className="text-slate-400">➔</span>
                      <input
                        type="date"
                        value={hotelCheckOut}
                        onChange={(e) => setHotelCheckOut(e.target.value)}
                        className="text-xs font-bold text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-2">
                    <div className="text-[10px] font-semibold uppercase text-slate-400">Rooms & Guests</div>
                    <input
                      type="text"
                      value={hotelGuests}
                      onChange={(e) => setHotelGuests(e.target.value)}
                      className="w-full mt-1 font-bold text-slate-900 text-xs sm:text-sm bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TOURS TAB FIELDS */}
              {activeTab === 'tours' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white p-2 rounded-2xl border border-slate-200">
                  <div className="p-2 border-r border-slate-200">
                    <div className="text-[10px] font-semibold uppercase text-slate-400">Tour Destination</div>
                    <select
                      value={tourDestination}
                      onChange={(e) => setTourDestination(e.target.value)}
                      className="w-full mt-1 font-bold text-slate-900 text-xs sm:text-sm bg-transparent focus:outline-none"
                    >
                      <option value="Maldives">Maldives Luxury Island Tour</option>
                      <option value="Cox's Bazar">Cox's Bazar 5-Star Beach Haven</option>
                      <option value="Dubai">Dubai Desert & City Wonders</option>
                      <option value="Sajek Valley">Sajek Valley Cloud Tour</option>
                    </select>
                  </div>

                  <div className="p-2">
                    <div className="text-[10px] font-semibold uppercase text-slate-400">Duration / Theme</div>
                    <select
                      value={tourDuration}
                      onChange={(e) => setTourDuration(e.target.value)}
                      className="w-full mt-1 font-bold text-slate-900 text-xs sm:text-sm bg-transparent focus:outline-none"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white p-2 rounded-2xl border border-slate-200">
                  <div className="p-2 border-r border-slate-200">
                    <div className="text-[10px] font-semibold uppercase text-slate-400">Visa Country</div>
                    <select
                      value={visaCountry}
                      onChange={(e) => setVisaCountry(e.target.value)}
                      className="w-full mt-1 font-bold text-slate-900 text-xs sm:text-sm bg-transparent focus:outline-none"
                    >
                      <option value="United Arab Emirates (Dubai)">United Arab Emirates (Dubai)</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Singapore">Singapore</option>
                      <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                      <option value="United States (USA)">United States (USA)</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                    </select>
                  </div>

                  <div className="p-2">
                    <div className="text-[10px] font-semibold uppercase text-slate-400">Visa Category</div>
                    <select
                      value={visaType}
                      onChange={(e) => setVisaType(e.target.value)}
                      className="w-full mt-1 font-bold text-slate-900 text-xs sm:text-sm bg-transparent focus:outline-none"
                    >
                      <option value="Tourist Visa">Tourist Visa</option>
                      <option value="Business Visa">Business Visa</option>
                      <option value="Student Visa">Student Visa</option>
                      <option value="Work Permit Visa">Work Permit Assistance</option>
                    </select>
                  </div>
                </div>
              )}

              {/* BUS / TRAIN / CAR FIELDS */}
              {(activeTab === 'bus' || activeTab === 'train' || activeTab === 'cars') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white p-2 rounded-2xl border border-slate-200">
                  <div className="p-2 border-r border-slate-200">
                    <div className="text-[10px] font-semibold uppercase text-slate-400">From City / Station</div>
                    <input
                      type="text"
                      defaultValue="Dhaka"
                      className="w-full mt-1 font-bold text-slate-900 text-xs sm:text-sm bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="p-2">
                    <div className="text-[10px] font-semibold uppercase text-slate-400">To Destination</div>
                    <input
                      type="text"
                      defaultValue="Cox's Bazar"
                      className="w-full mt-1 font-bold text-slate-900 text-xs sm:text-sm bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Red Search Flights Action Button */}
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] active:scale-98 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all duration-150"
                >
                  <Search className="w-4 h-4" />
                  <span>
                    {activeTab === 'flights' && 'Search Flights'}
                    {activeTab === 'hotels' && 'Search Hotels'}
                    {activeTab === 'tours' && 'Search Tours'}
                    {activeTab === 'visa' && 'Search Visa'}
                    {activeTab === 'bus' && 'Search Bus'}
                    {activeTab === 'train' && 'Search Train'}
                    {activeTab === 'cars' && 'Search Car'}
                  </span>
                </button>
              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

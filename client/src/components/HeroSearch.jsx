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
  User, 
  ChevronDown,
  Check
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
  const [toLocation, setToLocation] = useState({ city: '', code: '', airport: '' });
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'flights') {
      updateSearchCriteria({
        from: fromLocation,
        to: toLocation.code ? toLocation : { city: 'Dubai', code: 'DXB' },
        departureDate,
        returnDate,
        tripType,
        passengers,
        cabinClass
      });
      navigate(`/flights?from=${fromLocation.code}&to=${toLocation.code || 'DXB'}&date=${departureDate}`);
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
    <div className="relative w-full bg-[#0F172A] overflow-visible min-h-[520px] lg:min-h-[580px] flex flex-col justify-between pt-10 pb-16">
      
      {/* High-res Hero Aerial Airplane Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-right lg:bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=2000&q=85')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Hero Top Title & Handwriting Watermark */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-8 pt-2">
          
          <div className="text-white max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest mb-3">
              <span className="text-white">EXPLORE THE WORLD</span>
              <span className="text-rose-500 font-black">⟶</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white leading-[1.1] tracking-tight">
              Your Complete Travel <br />
              Solution
            </h1>

            <p className="mt-3 text-slate-100 text-xs sm:text-[13px] font-normal leading-relaxed opacity-90">
              Flights, Hotels, Tours, Visa, Transport & More – <br />
              All in One Place. Plan Your Next Journey with FlyJatri.
            </p>
          </div>

          {/* Hand-drawn style floating badge matching image */}
          <div className="hidden lg:block text-right pr-6 pt-4 select-none">
            <div className="font-handwriting text-2xl sm:text-3xl text-rose-100 leading-none">
              <span className="text-white font-bold">More</span> <br />
              <span className="text-white font-bold">Journeys ➔</span> <br />
              <span className="text-white text-3xl sm:text-4xl font-bold">More Stories</span>
            </div>
          </div>

        </div>

        {/* Tabbed Booking Search Widget */}
        <div className="w-full mt-4">
          
          {/* Top Tabs Pill Container */}
          <div className="inline-flex items-center bg-white rounded-t-2xl shadow-sm overflow-hidden p-0.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#E11D48] text-white shadow-sm'
                      : 'text-slate-800 hover:text-[#E11D48]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Inputs Card */}
          <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-xl border border-slate-100 p-2.5">
            
            <form onSubmit={handleSearchSubmit}>
              
              {/* FLIGHTS TAB ROW */}
              {activeTab === 'flights' && (
                <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-0">
                  
                  {/* 1. Origin (From) */}
                  <div className="relative w-full lg:flex-1 p-2.5 lg:border-r border-slate-200">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">From</div>
                    <button
                      type="button"
                      onClick={() => setShowFromDropdown(!showFromDropdown)}
                      className="w-full text-left flex items-center justify-between mt-0.5"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Plane className="w-4 h-4 text-slate-500 flex-shrink-0 transform -rotate-45" />
                        <div className="text-[13px] font-bold text-slate-900 truncate">
                          {fromLocation.city} ({fromLocation.code})
                        </div>
                      </div>
                    </button>

                    {showFromDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
                        <div className="text-xs font-bold text-slate-400 px-3 py-1 uppercase">Select Origin Airport</div>
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
                  <div className="relative w-full lg:flex-1 p-2.5 lg:border-r border-slate-200">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">To</div>
                    <button
                      type="button"
                      onClick={() => setShowToDropdown(!showToDropdown)}
                      className="w-full text-left flex items-center justify-between mt-0.5"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Plane className="w-4 h-4 text-slate-500 flex-shrink-0 transform rotate-45" />
                        <div className="text-[13px] font-bold text-slate-500 truncate">
                          {toLocation.city ? `${toLocation.city} (${toLocation.code})` : 'Select Destination'}
                        </div>
                      </div>
                    </button>

                    {showToDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
                        <div className="text-xs font-bold text-slate-400 px-3 py-1 uppercase">Select Destination</div>
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
                  <div className="w-full lg:flex-1 p-2.5 lg:border-r border-slate-200">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Departure Date</div>
                    <div className="flex items-center justify-between mt-0.5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span className="text-[13px] font-bold text-slate-900">25 Sep 2026</span>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>

                  {/* 4. Return Date */}
                  <div className="w-full lg:flex-1 p-2.5 lg:border-r border-slate-200">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Return Date</div>
                    <div className="flex items-center justify-between mt-0.5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span className="text-[13px] font-bold text-slate-900">26 Sep 2026</span>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>

                  {/* 5. Passengers & Class */}
                  <div className="relative w-full lg:flex-1 p-2.5">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Passengers & Class</div>
                    <button
                      type="button"
                      onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                      className="w-full text-left flex items-center justify-between mt-0.5"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <User className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span className="text-[13px] font-bold text-slate-900 truncate">
                          1 Adult · Economy
                        </span>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {showPassengerDropdown && (
                      <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 space-y-3">
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

                        <button
                          type="button"
                          onClick={() => setShowPassengerDropdown(false)}
                          className="w-full py-1.5 bg-[#E11D48] text-white rounded-lg text-xs font-bold"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 6. Solid Red Search Flights Button */}
                  <div className="w-full lg:w-auto p-1">
                    <button
                      type="submit"
                      className="w-full lg:w-auto px-6 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition"
                    >
                      <Search className="w-4 h-4" />
                      <span>Search Flights</span>
                    </button>
                  </div>

                </div>
              )}

              {/* OTHER TABS SIMPLE ROW */}
              {activeTab !== 'flights' && (
                <div className="flex flex-col sm:flex-row items-center justify-between p-2 gap-3">
                  <div className="text-xs text-slate-600 font-semibold">
                    Explore our top verified {activeTab} bookings and custom options across Bangladesh and worldwide.
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#E11D48] text-white rounded-xl font-bold text-xs shadow-sm hover:bg-rose-700 transition flex items-center gap-1.5"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                  </button>
                </div>
              )}

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

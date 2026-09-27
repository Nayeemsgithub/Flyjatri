import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Plane, 
  Clock, 
  Luggage, 
  ShieldCheck, 
  ArrowRight, 
  Filter, 
  ChevronDown, 
  Check, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { flightService, fallbackData } from '../services/api';
import { useBooking } from '../context/BookingContext';

export default function FlightSearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  const fromQuery = searchParams.get('from') || 'DAC';
  const toQuery = searchParams.get('to') || 'DXB';

  const [flights, setFlights] = useState(fallbackData.flights);
  const [loading, setLoading] = useState(false);
  const [selectedStops, setSelectedStops] = useState('all');
  const [selectedAirline, setSelectedAirline] = useState('all');
  const [expandedFlightId, setExpandedFlightId] = useState(null);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    let isMounted = true;
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const res = await flightService.searchFlights({
          from: fromQuery,
          to: toQuery
        });
        if (isMounted && res?.data?.data && Array.isArray(res.data.data)) {
          setFlights(res.data.data);
        }
      } catch (err) {
        if (isMounted) setFlights(fallbackData.flights);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchFlights();
    return () => { isMounted = false; };
  }, [fromQuery, toQuery]);

  const safeFlights = Array.isArray(flights) && flights.length > 0 ? flights : fallbackData.flights;

  // Filter flights
  const filteredFlights = safeFlights.filter(f => {
    if (selectedStops !== 'all') {
      if (selectedStops === 'direct' && f.stopCount > 0) return false;
      if (selectedStops === 'stops' && f.stopCount === 0) return false;
    }
    if (selectedAirline !== 'all' && !f.airline?.toLowerCase().includes(selectedAirline.toLowerCase())) {
      return false;
    }
    if (f.price > maxPrice) return false;
    return true;
  });

  const handleBookFlight = (flight) => {
    startBooking(flight, 'flight');
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Search Summary Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#E11D48] flex items-center justify-center font-bold">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-lg font-black text-slate-900">
                <span>{fromQuery.toUpperCase()}</span>
                <span className="text-[#E11D48]">➔</span>
                <span>{toQuery.toUpperCase()}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Departure: 25 Sep 2026 • Return: 26 Sep 2026 • 1 Passenger · Economy
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-xs font-bold text-[#E11D48] bg-rose-50 hover:bg-rose-100 px-4 py-2.5 rounded-xl transition"
          >
            Modify Search
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Filters Sidebar */}
          <div className="lg:col-span-3 space-y-5">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <SlidersHorizontal className="w-4 h-4 text-[#E11D48]" />
                  <span>Filters</span>
                </div>
                <button
                  onClick={() => { setSelectedStops('all'); setSelectedAirline('all'); setMaxPrice(1000); }}
                  className="text-[11px] font-semibold text-slate-400 hover:text-[#E11D48]"
                >
                  Reset All
                </button>
              </div>

              {/* Price Filter */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Max Price:</span>
                  <span className="text-[#E11D48]">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#E11D48] cursor-pointer"
                />
              </div>

              {/* Stops Filter */}
              <div className="space-y-2.5 mb-6">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Flight Stops</h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="stops"
                      checked={selectedStops === 'all'}
                      onChange={() => setSelectedStops('all')}
                      className="accent-[#E11D48]"
                    />
                    <span>All Flights</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="stops"
                      checked={selectedStops === 'direct'}
                      onChange={() => setSelectedStops('direct')}
                      className="accent-[#E11D48]"
                    />
                    <span>Direct / Non-stop Only</span>
                  </label>
                </div>
              </div>

              {/* Airlines Filter */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Airlines</h4>
                <div className="space-y-2 text-xs text-slate-600">
                  {['all', 'Biman', 'Emirates', 'Singapore', 'US-Bangla'].map((airline) => (
                    <label key={airline} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="airline"
                        checked={selectedAirline === airline}
                        onChange={() => setSelectedAirline(airline)}
                        className="accent-[#E11D48]"
                      />
                      <span>{airline === 'all' ? 'All Airlines' : airline}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Results List */}
          <div className="lg:col-span-9 space-y-4">
            
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Showing <strong>{filteredFlights.length}</strong> available flights</span>
              <span>Prices include all taxes & fees</span>
            </div>

            {loading ? (
              <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
                <div className="w-8 h-8 border-3 border-[#E11D48] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="font-semibold text-sm">Searching live airline fares...</p>
              </div>
            ) : filteredFlights.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
                <Plane className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No flights matched your filters</h3>
                <p className="text-xs text-slate-400 mt-1">Try changing price range or selected airline.</p>
              </div>
            ) : (
              filteredFlights.map((flight) => {
                const isExpanded = expandedFlightId === flight.id;
                return (
                  <div
                    key={flight.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-rose-300 shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      
                      {/* Airline & Flight Number */}
                      <div className="md:col-span-3 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/80">
                          <Plane className="w-6 h-6 text-[#E11D48]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{flight.airline}</h4>
                          <span className="text-[11px] font-semibold text-slate-400">{flight.flightNumber}</span>
                          <div className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                            {flight.refundable ? 'Refundable' : 'Non-refundable'}
                          </div>
                        </div>
                      </div>

                      {/* Flight Timeline */}
                      <div className="md:col-span-5 flex items-center justify-between gap-4">
                        {/* Departure */}
                        <div className="text-left">
                          <div className="text-base font-black text-slate-900">{flight.departureTime}</div>
                          <div className="text-xs font-bold text-slate-600">{flight.from?.city} ({flight.from?.code})</div>
                        </div>

                        {/* Duration graphic */}
                        <div className="flex-1 flex flex-col items-center">
                          <span className="text-[11px] text-slate-400 font-medium">{flight.duration}</span>
                          <div className="w-full flex items-center my-1">
                            <div className="w-2 h-2 rounded-full bg-[#E11D48]"></div>
                            <div className="flex-1 h-[2px] bg-slate-200 relative">
                              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1 bg-white text-[9px] font-bold text-slate-400">
                                {flight.stops}
                              </span>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                          </div>
                          <span className="text-[10px] text-slate-400">{flight.aircraft}</span>
                        </div>

                        {/* Arrival */}
                        <div className="text-right">
                          <div className="text-base font-black text-slate-900">{flight.arrivalTime}</div>
                          <div className="text-xs font-bold text-slate-600">{flight.to?.city} ({flight.to?.code})</div>
                        </div>
                      </div>

                      {/* Price & Booking Button */}
                      <div className="md:col-span-4 flex md:flex-col items-center md:items-end justify-between gap-2 md:border-l md:border-slate-100 md:pl-5">
                        <div className="text-left md:text-right">
                          <div className="text-xs text-slate-400">Per Passenger</div>
                          <div className="text-2xl font-black text-[#E11D48]">
                            ${flight.price}
                          </div>
                          {flight.priceBDT && (
                            <div className="text-[11px] font-semibold text-slate-500">
                              ৳ {flight.priceBDT.toLocaleString()}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleBookFlight(flight)}
                          className="px-6 py-2.5 bg-[#E11D48] hover:bg-rose-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-rose-600/25 transition"
                        >
                          Book Flight
                        </button>
                      </div>

                    </div>

                    {/* Flight Details Toggle Bar */}
                    <div className="bg-slate-50 px-5 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Luggage className="w-3.5 h-3.5 text-slate-400" />
                          {flight.baggage}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline font-medium text-emerald-700">
                          {flight.availableSeats} Seats Left
                        </span>
                      </div>

                      <button
                        onClick={() => setExpandedFlightId(isExpanded ? null : flight.id)}
                        className="text-slate-600 hover:text-[#E11D48] font-bold flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'Flight Details'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Expanded Flight Breakdown */}
                    {isExpanded && (
                      <div className="p-5 bg-white border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
                        <div className="space-y-1.5">
                          <h5 className="font-bold text-slate-800">Flight Itinerary & Aircraft</h5>
                          <p>• Flight: <strong>{flight.airline} {flight.flightNumber}</strong></p>
                          <p>• Aircraft Type: <strong>{flight.aircraft}</strong></p>
                          <p>• Origin: {flight.from?.airport} ({flight.from?.code})</p>
                          <p>• Destination: {flight.to?.airport} ({flight.to?.code})</p>
                        </div>

                        <div className="space-y-1.5">
                          <h5 className="font-bold text-slate-800">Baggage & Cancellation Policy</h5>
                          <p>• Check-in Baggage: <strong>{flight.baggage}</strong></p>
                          <p>• Cabin Class: <strong>{flight.cabinClass}</strong></p>
                          <p>• Cancellation: Date change allowed up to 24h prior to flight departure.</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe2, Clock, CheckCircle2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { visaService, fallbackData } from '../services/api';
import { useBooking } from '../context/BookingContext';

export default function VisaAssistancePage() {
  const [visas, setVisas] = useState(fallbackData.visas);
  const [selectedCountry, setSelectedCountry] = useState(fallbackData.visas[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  useEffect(() => {
    let isMounted = true;
    const fetchVisas = async () => {
      try {
        const res = await visaService.getVisaServices();
        if (isMounted && res?.data?.data && Array.isArray(res.data.data)) {
          setVisas(res.data.data);
          if (res.data.data.length > 0) {
            setSelectedCountry(res.data.data[0]);
          }
        }
      } catch (err) {
        if (isMounted) {
          setVisas(fallbackData.visas);
          setSelectedCountry(fallbackData.visas[0]);
        }
      }
    };
    fetchVisas();
    return () => { isMounted = false; };
  }, []);

  const safeVisas = Array.isArray(visas) && visas.length > 0 ? visas : fallbackData.visas;
  const activeCountry = selectedCountry || safeVisas[0];

  const handleApplyVisa = (visa) => {
    startBooking(visa, 'visa');
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-10">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            Fast & Hassle-Free
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
            Global Visa Assistance
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl">
            Get expert guidance on visa applications, document verification, embassy appointment booking, and visa stamping.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Country Selection List */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-2">Select Country</h3>
            {safeVisas.map((visa) => (
              <button
                key={visa.id}
                onClick={() => setSelectedCountry(visa)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                  activeCountry?.id === visa.id
                    ? 'bg-white border-[#E11D48] shadow-lg scale-[1.02]'
                    : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{visa.flag}</span>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{visa.country}</div>
                    <div className="text-xs text-slate-400 font-medium">Processing: {visa.processingTime}</div>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 ${activeCountry?.id === visa.id ? 'text-[#E11D48]' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>

          {/* Active Country Detail & Checklist */}
          {activeCountry && (
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{activeCountry.flag}</span>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">{activeCountry.country}</h2>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      Processing: {activeCountry.processingTime}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-400 font-semibold">Service Fee From</div>
                  <div className="text-2xl font-black text-[#E11D48]">${activeCountry.price}</div>
                </div>
              </div>

              {/* Visa Types */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Available Visa Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {activeCountry.types?.map((type, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements Checklist */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Required Documents Checklist</h4>
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {activeCountry.requirements?.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#E11D48] flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply Action */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => handleApplyVisa(activeCountry)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#E11D48] hover:bg-rose-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-rose-600/25 transition"
                >
                  Apply for {activeCountry.country} Visa
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

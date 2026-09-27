import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe2, ArrowRight } from 'lucide-react';

export default function VisaPromo() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Left image & headline */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80"
              alt="Visa Passport"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Visa Assistance
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md">
              Get your visa with ease. We handle the paperwork, appointments, and Embassy submissions while you plan your journey.
            </p>

            <button
              onClick={() => navigate('/visa')}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-slate-200 hover:border-slate-400 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Navy Highlight Card */}
        <div className="lg:col-span-4 bg-[#0F172A] text-white p-6 sm:p-8 h-full flex items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-rose-400 flex-shrink-0">
              <Globe2 className="w-6 h-6" />
            </div>

            <div>
              <div className="text-base font-bold text-white">Multiple Countries</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">
                Tourist • Business • Student • Work
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

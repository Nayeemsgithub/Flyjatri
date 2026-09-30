import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe2, ArrowRight } from 'lucide-react';

export default function VisaPromo() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden h-full flex flex-col justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-12 items-center h-full">
        
        {/* Left image & headline */}
        <div className="sm:col-span-8 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80"
              alt="Visa Passport"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Visa Assistance
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Get your visa with ease. We handle the process, you plan the journey.
            </p>

            <button
              onClick={() => navigate('/visa')}
              className="inline-flex items-center gap-1.5 mt-3 px-3.5 py-1.5 border border-slate-200 hover:border-slate-400 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Navy Highlight Card */}
        <div className="sm:col-span-4 bg-[#0F172A] text-white p-5 sm:p-6 h-full flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-rose-400 flex-shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>

            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Multiple Countries</div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-medium leading-tight">
                Tourist | Business | Student | Work
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

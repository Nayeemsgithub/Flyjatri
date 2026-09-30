import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe2, ArrowRight } from 'lucide-react';

export default function VisaPromo() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col justify-center">
      <div className="flex flex-col sm:flex-row items-center h-full">
        
        {/* Left image & headline */}
        <div className="flex-1 p-4 sm:p-5 flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80"
              alt="Visa Passport"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Visa Assistance
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Get your visa with ease. We handle the process, you plan the journey.
            </p>

            <button
              onClick={() => navigate('/visa')}
              className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-slate-800 hover:text-[#E11D48] transition"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Navy Highlight Shape */}
        <div className="w-full sm:w-52 bg-[#0F172A] text-white p-4 sm:p-5 sm:rounded-l-3xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0">
            <Globe2 className="w-4 h-4" />
          </div>

          <div>
            <div className="text-xs font-bold text-white">Multiple Countries</div>
            <div className="text-[9px] text-slate-300 mt-0.5 leading-tight">
              Tourist | Business | Student | Work
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

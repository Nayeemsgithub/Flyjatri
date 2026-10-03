import React, { useState, useEffect } from 'react';
import { Plane, Sparkles, ChevronRight } from 'lucide-react';

export default function SplashScreen({ onComplete, duration = 2500 }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Global Travel Portal...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress < 35) {
        setStatusText('Initializing FlyJatri Travel Portal...');
      } else if (currentProgress < 75) {
        setStatusText('Connecting Airline & Hotel Networks...');
      } else {
        setStatusText('Welcome to FlyJatri — Your Trip Our Assistance');
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsFadingOut(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400); // quick fade out duration
      }
    }, 25);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07090E] overflow-hidden select-none transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Background Glow Rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#E11D48]/30 rounded-full blur-[70px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#05070B_80%)]"></div>
        
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Skip Button Top Right */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs font-semibold backdrop-blur-md border border-white/10 transition-all active:scale-95 cursor-pointer"
      >
        <span>Skip Intro</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* Center Cinematic Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        
        {/* 3D Glowing Sphere Emblem with Multi-layer Pulse */}
        <div className="relative mb-8 group">
          {/* Animated Glow Halo */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-rose-600 to-amber-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 animate-pulse transition duration-1000"></div>
          
          {/* Outer Rotating Energy Ring */}
          <div className="absolute -inset-2 rounded-full border border-rose-500/40 animate-[spin_8s_linear_infinite] border-dashed"></div>

          {/* Core 3D Sphere Emblem */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.6)] border-2 border-rose-400/50 transform transition duration-500 hover:scale-105">
            <img
              src="/flyjatri-3d-sphere.jpg"
              alt="FlyJatri 3D Emblem"
              className="w-full h-full object-cover select-none"
            />
            {/* Shimmer Light Sweep Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]"></div>
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl sm:text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-400 font-sans drop-shadow-[0_2px_12px_rgba(225,29,72,0.8)]">
              FLYJATRI
            </span>
          </div>

          <div className="text-[10px] sm:text-xs font-black tracking-[0.35em] text-rose-300 uppercase drop-shadow-sm">
            YOUR TRIP OUR ASSISTANCE
          </div>
        </div>

        {/* Status Text & Progress Bar */}
        <div className="w-full max-w-xs space-y-3">
          
          {/* Status Label */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-300 min-h-[20px]">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" />
            <span className="transition-all duration-300">{statusText}</span>
          </div>

          {/* Sleek Progress Track */}
          <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400 rounded-full transition-all duration-100 shadow-[0_0_12px_rgba(244,63,94,0.8)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Percentage Indicator */}
          <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono">
            <span>STARTING ENGINE</span>
            <span className="text-rose-400 font-bold">{progress}%</span>
          </div>

        </div>

      </div>

      {/* Subtle Aviation Silhouette in Bottom Footer */}
      <div className="absolute bottom-6 flex items-center gap-2 text-[11px] text-slate-500/80 font-medium">
        <Plane className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
        <span>Bangladesh's Next-Gen Travel & Tour Platform</span>
      </div>
    </div>
  );
}

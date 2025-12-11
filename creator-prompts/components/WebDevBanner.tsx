import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WebDevBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Initialize Timer (3 days from now if not set)
    const STORAGE_KEY = 'webdev_offer_endtime';
    let endTime = localStorage.getItem(STORAGE_KEY);

    if (!endTime || new Date().getTime() > parseInt(endTime)) {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 3); // 3 Days
      endTime = targetDate.getTime().toString();
      localStorage.setItem(STORAGE_KEY, endTime);
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = parseInt(endTime!) - now;

      if (distance < 0) {
        // Reset if expired
        const newTarget = new Date();
        newTarget.setDate(newTarget.getDate() + 3);
        const newEndTime = newTarget.getTime().toString();
        localStorage.setItem(STORAGE_KEY, newEndTime);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10 pt-0 pb-12 animate-fade-in">
      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 5px rgba(236, 72, 153, 0.5); }
          50% { opacity: 0.6; box-shadow: 0 0 15px rgba(236, 72, 153, 0.8); }
        }
        @keyframes scalePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-glow-blink {
          animation: glowPulse 1.2s ease-in-out infinite;
        }
        .animate-scale-pulse {
          animation: scalePulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="relative overflow-hidden bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl group hover:border-primary/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300">
        {/* Background Glowing Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-purple-500 to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_10px_#6366f1]"></div>

        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Left Content */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
            {/* Icon */}
            <div className="flex-shrink-0 w-24 h-24 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl shadow-inner border border-gray-200 dark:border-gray-700 group-hover:border-primary/50 group-hover:text-primary transition-all duration-300">
              <span className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">💻</span>
            </div>
            
            {/* Text & Timer */}
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 mb-3 text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg animate-glow-blink">
                Special Web Development Offer
              </span>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                Get a Professional Website Starting at <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-extrabold">₹9,000/-</span>
              </h2>
              
              {/* Countdown Timer Row */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-3 text-sm">
                 <p className="text-gray-700 dark:text-gray-300 font-medium leading-snug">
                    Business & Personal websites at just <span className="text-primary font-bold">₹9,000</span>
                 </p>
                 <div className="flex items-center gap-2 px-3 py-1 bg-black/5 dark:bg-black/40 rounded-lg border border-primary/20">
                    <span className="text-xs text-gray-500 dark:text-gray-400">⏳ Offer ends in:</span>
                    <span className="font-mono font-bold text-cyan-500 drop-shadow-[0_0_5px_rgba(6,182,212,0.6)]">
                      {String(timeLeft.days).padStart(2,'0')}d : {String(timeLeft.hours).padStart(2,'0')}h : {String(timeLeft.minutes).padStart(2,'0')}m : {String(timeLeft.seconds).padStart(2,'0')}s
                    </span>
                 </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Limited-time deal from Mohan Creator — high-quality design, fast delivery, and full support.
              </p>
            </div>
          </div>

          {/* Right CTA */}
          <div className="flex-shrink-0">
            <Link 
              to="/web-development"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 animate-scale-pulse"
            >
              View More Details
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WebDevBanner;
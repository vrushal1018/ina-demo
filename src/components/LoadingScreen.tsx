'use client';

import React, { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    // Check if splash was already shown during this browser session
    try {
      if (sessionStorage.getItem('ina_splash_seen')) {
        return;
      }
    } catch {
      // Ignore storage errors in private/incognito mode
    }

    const showTimer = setTimeout(() => {
      setIsLoading(true);
    }, 0);

    const fadeTimer = setTimeout(() => {
      setStartFade(true);
    }, 150);

    const removeTimer = setTimeout(() => {
      setIsLoading(false);
      try {
        sessionStorage.setItem('ina_splash_seen', '1');
      } catch {}
    }, 320);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-400 ease-out ${startFade ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      <div className="relative flex flex-col items-center justify-center p-6">
        <div className="relative w-44 sm:w-56 h-auto transition-transform duration-500 ease-out transform scale-100">
          <img
            src="/Ina Logo-1.jpg.png"
            alt="INA Logo"
            className="w-full h-full object-contain"
          />
        </div>
        {/* Subtle branded loading bar */}
        <div className="mt-6 w-32 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#2495D3] rounded-full animate-[loading_0.7s_ease-in-out_infinite]" />
        </div>
      </div>
      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 70%;
            margin-left: 15%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
    </div>
  );
}

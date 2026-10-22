'use client';

import React, { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    // Show clean logo briefly, then fade out smoothly
    const fadeTimer = setTimeout(() => {
      setStartFade(true);
    }, 450);

    // Remove from DOM when animation completes
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 850);

    return () => {
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

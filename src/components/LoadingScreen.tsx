'use client';

import React, { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [startZoom, setStartZoom] = useState(false);
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    // 1. Wait a moment to show the static logo
    const zoomTimer = setTimeout(() => {
      setStartZoom(true);
    }, 600);

    // 2. Start fading the background slightly after zoom begins
    const fadeTimer = setTimeout(() => {
      setStartFade(true);
    }, 1000);

    // 3. Remove from DOM entirely when animation finishes
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-700 ease-in-out ${
        startFade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div
        className={`relative w-48 sm:w-64 h-auto transition-transform duration-[1400ms] ease-in ${
          startZoom ? 'scale-[80]' : 'scale-100'
        }`}
      >
        <img
          src="/Ina Logo-1.jpg.png"
          alt="INA Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

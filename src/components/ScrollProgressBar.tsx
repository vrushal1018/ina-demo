'use client';

import React, { useEffect, useRef } from 'react';

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(Math.max(scrollY / totalHeight, 0), 1) : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      {/* Subtle track background */}
      <div className="w-full h-[3.5px] bg-black/10 backdrop-blur-xs" />

      {/* Animated progress fill (GPU accelerated transform) */}
      <div
        ref={barRef}
        className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#1C3A62] via-[#2495D3] to-[#45B1E8] origin-left shadow-[0_0_12px_rgba(36,149,211,0.85)] will-change-transform transition-transform duration-75 ease-out"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      {/* Subtle track background */}
      <div className="w-full h-[3.5px] bg-black/10 backdrop-blur-xs" />
      
      {/* Animated progress fill */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#1C3A62] via-[#2495D3] to-[#45B1E8] origin-left shadow-[0_0_12px_rgba(36,149,211,0.85)]"
        style={{ scaleX }}
      />
    </div>
  );
}

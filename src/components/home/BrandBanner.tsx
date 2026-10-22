'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ShieldCheck } from 'lucide-react';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';

// Elite Residential client logos
const RESIDENTIAL_LOGOS = [
  {
    name: 'Calcutta Riverside',
    src: '/elite residential logos/calcutta-riverside.png?v=2',
  },
  {
    name: 'K Raheja Corp',
    src: '/elite residential logos/k-raheja-corp.png?v=2',
  },
  {
    name: 'Godrej Properties',
    src: '/elite residential logos/godrej-properties.png?v=2',
  },
  {
    name: 'SD Corp',
    src: '/elite residential logos/sd-corp.png?v=2',
  },
  {
    name: 'Primarc Projects',
    src: '/elite residential logos/primarc-projects.png?v=2',
  },
  {
    name: 'ABI Apex',
    src: '/elite residential logos/abi-apex.png?v=2',
  },
  {
    name: 'Ashok Gardens',
    src: '/elite residential logos/ashok-gardens.png?v=2',
  },
  {
    name: 'L&T Realty',
    src: '/elite residential logos/lt-realty.png?v=2',
  },
  {
    name: 'Prateek Grand City',
    src: '/elite residential logos/prateek-grand-city.png?v=2',
  },
  {
    name: 'Mahagun Maple',
    src: '/elite residential logos/mahagun-maple.png?v=2',
  },
  {
    name: 'Runwal',
    src: '/elite residential logos/runwal.png?v=2',
  },
];

export default function BrandBanner() {
  return (
    <section className="relative w-full bg-[#F8F9FA] py-8 sm:py-10 overflow-hidden border-b border-slate-200/60">
      {/* Authentic Architectural Linework Drawing Stream in Whitespace */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.22} mask="fade-edges" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-30px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header Title with Lucide Icon in Sleek Pill */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-xs text-[#1C3A62] font-semibold text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-[#2495D3]" />
            <span>Brands & elite residential properties we service</span>
            <ArrowDownRight className="w-4 h-4 text-[#2495D3]" />
          </div>
        </div>

        {/* Marquee Container with Gradient Side Masks */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)]">
          <div className="flex w-max items-center gap-8 sm:gap-12 md:gap-16 animate-marquee hover:[animation-play-state:paused] py-4">
            {/* Duplicate list to achieve continuous seamless loop */}
            {[...RESIDENTIAL_LOGOS, ...RESIDENTIAL_LOGOS].map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex items-center justify-center shrink-0 w-36 sm:w-44 md:w-52 h-18 sm:h-22 md:h-24 px-2 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="w-full h-full object-contain transition-all duration-300 hover:brightness-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tailwind Animation Styling via CSS in JS/JSX */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}

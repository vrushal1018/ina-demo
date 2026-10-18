'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ShieldCheck } from 'lucide-react';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';

// Elite Residential client logos
const RESIDENTIAL_LOGOS = [
  {
    name: 'Calcutta Riverside',
    src: '/elite residential logos/Gemini_Generated_Image_39ed39ed39ed39ed-clean.png',
  },
  {
    name: 'K Raheja Corp',
    src: '/elite residential logos/Gemini_Generated_Image_6sa9o36sa9o36sa9-clean.png',
  },
  {
    name: 'Godrej Properties',
    src: '/elite residential logos/Gemini_Generated_Image_8rwu318rwu318rwu-clean.png',
  },
  {
    name: 'SD Corp',
    src: '/elite residential logos/Gemini_Generated_Image_argzyiargzyiargz-clean.png',
  },
  {
    name: 'Primarc Projects',
    src: '/elite residential logos/Gemini_Generated_Image_d34ehkd34ehkd34e-clean.png',
  },
  {
    name: 'ABI Apex',
    src: '/elite residential logos/Gemini_Generated_Image_dgixx6dgixx6dgix-clean.png',
  },
  {
    name: 'Ashok Gardens',
    src: '/elite residential logos/Gemini_Generated_Image_g2uvftg2uvftg2uv-clean.png',
  },
  {
    name: 'L&T Realty',
    src: '/elite residential logos/Gemini_Generated_Image_i7k5ami7k5ami7k5-clean.png',
  },
  {
    name: 'Prateek Grand City',
    src: '/elite residential logos/Gemini_Generated_Image_oqss1toqss1toqss-clean.png',
  },
  {
    name: 'Mahagun Maple',
    src: '/elite residential logos/Gemini_Generated_Image_ozbmdfozbmdfozbm-clean.png',
  },
  {
    name: 'Runwal',
    src: '/elite residential logos/Gemini_Generated_Image_quaafmquaafmquaa-clean.png',
  },
];

export default function BrandBanner() {
  return (
    <section className="relative w-full bg-[#F8F9FA] py-20 overflow-hidden border-b border-slate-200/60">
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
        <div className="flex items-center justify-center mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-xs text-[#1C3A62] font-semibold text-sm sm:text-base">
            <ShieldCheck className="w-4 h-4 text-[#2495D3]" />
            <span>Brands & elite residential properties we service</span>
            <ArrowDownRight className="w-4 h-4 text-[#2495D3]" />
          </div>
        </div>

        {/* Marquee Container with Gradient Side Masks */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)]">
          <div className="flex w-max items-center gap-14 sm:gap-20 animate-marquee hover:[animation-play-state:paused] py-3">
            {/* Duplicate list to achieve continuous seamless loop */}
            {[...RESIDENTIAL_LOGOS, ...RESIDENTIAL_LOGOS].map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex items-center justify-center shrink-0 px-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md hover:border-[#2495D3]/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="h-10 sm:h-14 md:h-16 w-auto max-w-[200px] object-contain"
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

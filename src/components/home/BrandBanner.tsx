'use client';

import React from 'react';
import { ArrowDownRight } from 'lucide-react';

// Brand logos data with inline SVG renderers for crisp scaling
const BRANDS = [
  {
    name: 'DoorDash',
    icon: (
      <svg className="h-5 w-auto fill-current" viewBox="0 0 120 20">
        <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8h16c.55 0 1-.45 1-1s-.45-1-1-1H12c-3.31 0-6-2.69-6-6s2.69-6 6-6h20c.55 0 1-.45 1-1s-.45-1-1-1H12z" />
        <text x="35" y="16" fontFamily="sans-serif" fontWeight="bold" fontSize="15">DOORDASH</text>
      </svg>
    ),
  },
  {
    name: 'Shopify',
    icon: (
      <div className="flex items-center gap-2">
        <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
          <path d="M20.5 7.5l-3.5-1.5-1.5-3.5L12 3 8.5 2.5 7 6 3.5 7.5 2 11l2 8 8 3 8-3 2-8z" />
        </svg>
        <span className="font-medium text-lg tracking-tight">shopify</span>
      </div>
    ),
  },
  {
    name: 'Dropbox',
    icon: (
      <div className="flex items-center gap-2">
        <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
          <path d="M6 2l6 4-6 4-6-4zm12 0l6 4-6 4-6-4zm-12 8l6 4-6 4-6-4zm12 0l6 4-6 4-6-4zm-6 4.5l6-4 6 4-6 4z" />
        </svg>
        <span className="font-medium text-lg">Dropbox</span>
      </div>
    ),
  },
  {
    name: 'Slack',
    icon: (
      <div className="flex items-center gap-2">
        <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
          <path d="M6 15a2 2 0 012 2v2a2 2 0 11-2-2zm0-8a2 2 0 012-2 2 2 0 012 2v6a2 2 0 11-4 0zm8 0a2 2 0 012 2v2a2 2 0 11-2-2zm0 8a2 2 0 01-2 2 2 2 0 01-2-2V9a2 2 0 114 0z" />
        </svg>
        <span className="font-medium text-xl tracking-tight">slack</span>
      </div>
    ),
  },
  {
    name: 'Google',
    icon: (
      <span className="font-semibold text-xl tracking-tight font-sans">Google</span>
    ),
  },
  {
    name: 'Square',
    icon: (
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 border-[3px] border-current rounded-sm flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-current rounded-xs" />
        </div>
        <span className="font-medium text-lg">Square</span>
      </div>
    ),
  },
  {
    name: 'Asana',
    icon: (
      <div className="flex items-center gap-2">
        <svg className="h-5 w-auto fill-current" viewBox="0 0 24 24">
          <circle cx="12" cy="6" r="3.5" />
          <circle cx="6" cy="16" r="3.5" />
          <circle cx="18" cy="16" r="3.5" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">asana</span>
      </div>
    ),
  },
  {
    name: 'Airtable',
    icon: (
      <div className="flex items-center gap-2">
        <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
          <path d="M11 3L2 7v10l9 4V3zm2 0v18l9-4V7l-9-4z" />
        </svg>
        <span className="font-medium text-lg">Airtable</span>
      </div>
    ),
  },
];

export default function BrandBanner() {
  return (
    <section className="w-full bg-slate-50 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Title with Lucide Icon */}
        <div className="flex items-center justify-center gap-1.5 text-slate-800 font-medium text-base mb-10">
          <span>Brands we service and repair</span>
          <ArrowDownRight className="w-4 h-4 text-slate-600" />
        </div>

        {/* Marquee Container with Gradient Side Masks */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="flex w-max items-center gap-12 sm:gap-16 animate-marquee hover:[animation-play-state:paused]">

            {/* Duplicate list to achieve continuous seamless loop */}
            {[...BRANDS, ...BRANDS].map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex items-center text-slate-900 opacity-90 transition-opacity hover:opacity-100 cursor-pointer"
              >
                {brand.icon}
              </div>
            ))}
          </div>
        </div>

      </div>

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
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

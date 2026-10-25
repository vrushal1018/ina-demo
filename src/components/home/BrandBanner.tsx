'use client';

import React, { useState } from 'react';
import {
  ArrowDownRight,
  Building2,
  Sparkles,
  HeartPulse,
  Home as HomeIcon,
  Hotel,
  ShoppingBag,
} from 'lucide-react';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';

// Malls & Retail client logos from /malls
const MALL_LOGOS = [
  {
    name: 'Phoenix Marketcity',
    src: '/malls/phoennix marketcity.png?v=3',
  },
  {
    name: 'High Street Phoenix',
    src: '/malls/highstreet.png?v=3',
  },
  {
    name: 'Jio World',
    src: '/malls/jio world.png?v=3',
  },
  {
    name: 'LuLu Mall',
    src: '/malls/lulu mall.png?v=3',
  },
  {
    name: 'Infiniti Mall',
    src: '/malls/infiniti.png?v=3',
  },
  {
    name: 'Nexus Malls',
    src: '/malls/mall.png?v=3',
  },
  {
    name: 'VR Surat',
    src: '/malls/vr-surat.png?v=3',
  },
  {
    name: 'Capital Mall',
    src: '/malls/capital mall.png?v=3',
  },
  {
    name: 'DSL Virtue Mall',
    src: '/malls/DSL.png?v=3',
  },
  {
    name: 'Kumar Pacific Mall',
    src: '/malls/kumar pacific.png?v=3',
  },
  {
    name: 'Elements Mall (MSR)',
    src: '/malls/msr elemetns.png?v=3',
  },
  {
    name: 'PVP Square',
    src: '/malls/pvp.png?v=3',
  },
  {
    name: 'Shreeji Sharan',
    src: '/malls/shreeji.png?v=3',
  },
  {
    name: 'The Pavilion Mall',
    src: '/malls/the maintenance.png?v=3',
  },
  {
    name: 'Virginia Mall',
    src: '/malls/viriginia mall.png?v=3',
  },
];

// Hospitality client logos from /hospitality
const HOSPITALITY_LOGOS = [
  {
    name: 'Taj Hotels',
    src: '/hospitality/taj.png?v=3',
  },
  {
    name: 'JW Marriott',
    src: '/hospitality/jw mariot.png?v=3',
  },
  {
    name: 'The Leela',
    src: '/hospitality/the leela.png?v=3',
  },
  {
    name: 'Grand Hyatt',
    src: '/hospitality/grand hyatt.png?v=3',
  },
  {
    name: 'Hyatt Regency',
    src: '/hospitality/hyatt regency.png?v=3',
  },
  {
    name: 'Hyatt',
    src: '/hospitality/hyatt.png?v=3',
  },
  {
    name: 'Hyatt Ahmedabad',
    src: '/hospitality/hyat ahmedabad.png?v=3',
  },
  {
    name: 'Hilton',
    src: '/hospitality/hilton.png?v=3',
  },
  {
    name: 'DoubleTree by Hilton',
    src: '/hospitality/double tree.png?v=3',
  },
  {
    name: 'Sheraton',
    src: '/hospitality/sheraton.png?v=3',
  },
  {
    name: 'Westin',
    src: '/hospitality/westin.png?v=3',
  },
  {
    name: 'Radisson',
    src: '/hospitality/raddison.png?v=3',
  },
  {
    name: 'Novotel',
    src: '/hospitality/novotel.png?v=3',
  },
  {
    name: 'Crowne Plaza',
    src: '/hospitality/crown plaza.png?v=3',
  },
  {
    name: 'Holiday Inn',
    src: '/hospitality/holiday inn.png?v=3',
  },
  {
    name: 'Courtyard by Marriott',
    src: '/hospitality/courtyard.png?v=3',
  },
  {
    name: 'Courtyard Hyderabad',
    src: '/hospitality/courtyard hyderabad.png?v=3',
  },
  {
    name: 'Marriott Hyderabad',
    src: '/hospitality/mariott hyderabad.png?v=3',
  },
  {
    name: 'Fairfield by Marriott',
    src: '/hospitality/farifield.png?v=3',
  },
  {
    name: 'Four Points by Sheraton',
    src: '/hospitality/four points.png?v=3',
  },
  {
    name: 'Vivanta',
    src: '/hospitality/vivanta.png?v=3',
  },
  {
    name: 'The Park',
    src: '/hospitality/the park.png?v=3',
  },
  {
    name: 'Ibis',
    src: '/hospitality/ibis.png?v=3',
  },
  {
    name: 'Ginger',
    src: '/hospitality/ginger.png?v=3',
  },
];

// IT & Commercial client logos from /IT,commercial
const IT_COMMERCIAL_LOGOS = [
  {
    name: 'Axis Bank',
    src: '/IT,commercial/Axis bank.png?v=3',
  },
  {
    name: 'Reliance Industries',
    src: '/IT,commercial/Reliance.png?v=3',
  },
  {
    name: 'Hikvision',
    src: '/IT,commercial/Hikvision.png?v=3',
  },
  {
    name: 'UST Global',
    src: '/IT,commercial/UST-global.png?v=3',
  },
  {
    name: 'Surat Diamond Bourse (SDB)',
    src: '/IT,commercial/SDB.png?v=3',
  },
  {
    name: 'Godrej',
    src: '/IT,commercial/godrej.png?v=3',
  },
  {
    name: '99 Group',
    src: '/IT,commercial/99.png?v=3',
  },
  {
    name: 'Art Guild House',
    src: '/IT,commercial/Art-guild-house.png?v=3',
  },
  {
    name: 'CUMI',
    src: '/IT,commercial/Cumi.png?v=3',
  },
  {
    name: 'Fortune 9',
    src: '/IT,commercial/Fortune9.png?v=3',
  },
  {
    name: 'Manjeera Trinity',
    src: '/IT,commercial/manjeera.png?v=3',
  },
  {
    name: 'Paragon Plaza',
    src: '/IT,commercial/paragon plaza.png?v=3',
  },
  {
    name: 'Prime Focus Technologies (PFT)',
    src: '/IT,commercial/PFT.png?v=3',
  },
  {
    name: 'R City',
    src: '/IT,commercial/Rcity.png?v=3',
  },
  {
    name: 'Reycon',
    src: '/IT,commercial/Reycon.png?v=3',
  },
];

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

// Hospital & Healthcare client logos from /hospital
const HOSPITAL_LOGOS = [
  {
    name: 'Manipal Hospitals',
    src: '/hospital/manipal hospitals.png?v=3',
  },
  {
    name: 'Narayana Health',
    src: '/hospital/narayan  health.png?v=3',
  },
  {
    name: 'Reliance Hospital',
    src: '/hospital/reliance hospital.png?v=3',
  },
  {
    name: 'Rajagiri Hospital',
    src: '/hospital/rajagiri hospital.png?v=3',
  },
  {
    name: 'Asian Cancer Institute',
    src: '/hospital/asian cnacer institute.png?v=3',
  },
  {
    name: 'Asian Fidelis',
    src: '/hospital/asian fidelis.png?v=3',
  },
  {
    name: 'Le Crest Hospital',
    src: '/hospital/le-crest.png?v=3',
  },
  {
    name: 'Sankara Eye Hospital',
    src: '/hospital/sankara.png?v=3',
  },
];

const ALL_LOGOS = [
  ...MALL_LOGOS,
  ...HOSPITALITY_LOGOS,
  ...IT_COMMERCIAL_LOGOS,
  ...HOSPITAL_LOGOS,
  ...RESIDENTIAL_LOGOS,
];

type CategoryId = 'all' | 'malls' | 'hospitality' | 'it-commercial' | 'hospital' | 'residential';

interface CategoryOption {
  id: CategoryId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  badgeText: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'all',
    label: 'All Clients',
    icon: Sparkles,
    count: ALL_LOGOS.length,
    badgeText: 'Leading shopping malls, hotels, IT hubs, hospitals & residential properties we service',
  },
  {
    id: 'malls',
    label: 'Shopping Malls',
    icon: ShoppingBag,
    count: MALL_LOGOS.length,
    badgeText: 'Iconic shopping malls, retail hubs & lifestyle destinations we service',
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    icon: Hotel,
    count: HOSPITALITY_LOGOS.length,
    badgeText: 'Iconic 5-star hotels, luxury resorts & premier hospitality properties we service',
  },
  {
    id: 'it-commercial',
    label: 'IT & Commercial',
    icon: Building2,
    count: IT_COMMERCIAL_LOGOS.length,
    badgeText: 'Premier IT parks, corporate headquarters & commercial hubs we service',
  },
  {
    id: 'hospital',
    label: 'Hospitals',
    icon: HeartPulse,
    count: HOSPITAL_LOGOS.length,
    badgeText: 'Leading multi-specialty hospitals, healthcare networks & institutes we service',
  },
  {
    id: 'residential',
    label: 'Elite Residential',
    icon: HomeIcon,
    count: RESIDENTIAL_LOGOS.length,
    badgeText: 'Luxury residential communities & iconic townships we service',
  },
];

export default function BrandBanner() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  const activeCategoryData =
    CATEGORIES.find((cat) => cat.id === activeCategory) || CATEGORIES[0];

  const currentLogos =
    activeCategory === 'malls'
      ? MALL_LOGOS
      : activeCategory === 'hospitality'
      ? HOSPITALITY_LOGOS
      : activeCategory === 'it-commercial'
      ? IT_COMMERCIAL_LOGOS
      : activeCategory === 'hospital'
      ? HOSPITAL_LOGOS
      : activeCategory === 'residential'
      ? RESIDENTIAL_LOGOS
      : ALL_LOGOS;

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F4FAFD] to-[#F8FBFE] py-8 sm:py-10 overflow-hidden">
      {/* Authentic Architectural Linework Drawing Stream in Whitespace */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.22} mask="fade-edges" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title with Lucide Icon in Sleek Pill */}
        <div className="flex items-center justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-[#2495D3]/25 shadow-xs text-[#1C3A62] font-semibold text-xs sm:text-sm transition-all duration-300">
            <activeCategoryData.icon className="w-4 h-4 text-[#2495D3]" />
            <span>{activeCategoryData.badgeText}</span>
            <ArrowDownRight className="w-4 h-4 text-[#2495D3]" />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#1C3A62] text-white shadow-md shadow-[#1C3A62]/20 scale-105 ring-2 ring-[#2495D3]/40'
                    : 'bg-white/80 hover:bg-white text-slate-600 hover:text-[#1C3A62] border border-slate-200/80 hover:border-slate-300 shadow-xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2495D3]' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? 'bg-[#2495D3] text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Marquee Container (Touch scrollable on mobile, continuous animated marquee on desktop) */}
        <div
          key={activeCategory}
          className="relative w-full overflow-x-auto md:overflow-hidden scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:[mask-image:_linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)]"
        >
          <div
            className="flex w-max items-center gap-8 sm:gap-12 md:gap-16 animate-marquee hover:[animation-play-state:paused] py-4"
            style={{
              animationDuration: `${Math.max(25, currentLogos.length * 1.8)}s`,
            }}
          >
            {/* Duplicate list to achieve continuous seamless loop */}
            {[...currentLogos, ...currentLogos].map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex items-center justify-center shrink-0 w-36 sm:w-44 md:w-52 h-18 sm:h-22 md:h-24 px-2 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="w-full h-full object-contain transition-all duration-300 hover:brightness-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hardware-Accelerated Marquee Styling */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          will-change: transform;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation: none !important;
            transform: none !important;
            will-change: auto !important;
          }
        }
      `}</style>
    </section>
  );
}

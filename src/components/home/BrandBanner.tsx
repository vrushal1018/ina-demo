'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  Sparkles,
  HeartPulse,
  Home as HomeIcon,
  Hotel,
  ShoppingBag,
  ChevronDown,
  Check,
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
  const [isPaused, setIsPaused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when tapping/clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [dropdownOpen]);

  const activeCategoryData =
    CATEGORIES.find((cat) => cat.id === activeCategory) || CATEGORIES[0];
  const ActiveIcon = activeCategoryData.icon;

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
    <section className="relative w-full bg-gradient-to-b from-ina-tint-8 to-ina-tint-15 py-8 sm:py-10 overflow-visible z-20">
      {/* Authentic Architectural Linework Drawing Stream in Whitespace */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ArchitecturalLineworkBackground theme="light" opacity={0.22} mask="fade-edges" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title with Lucide Icon in Sleek Pill */}
        {/* <div className="flex items-center justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-ina-blue/25 shadow-xs text-ina-navy font-semibold text-xs sm:text-sm transition-all duration-300">
            <activeCategoryData.icon className="w-4 h-4 text-ina-blue" />
            <span>{activeCategoryData.badgeText}</span>
            <ArrowDownRight className="w-4 h-4 text-ina-blue" />
          </div>
        </div> */}

        {/* ================= MOBILE PHONE VIEW: Dropdown Selector ================= */}
        <div ref={dropdownRef} className="relative sm:hidden w-full max-w-[280px] mx-auto mb-6 z-30">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-ina-blue/40 shadow-sm text-ina-navy active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-7 h-7 rounded-full bg-ina-navy text-white flex items-center justify-center shrink-0">
                <ActiveIcon className="w-3.5 h-3.5 text-ina-blue" />
              </span>
              <span className="text-sm font-semibold text-ina-navy truncate">
                {activeCategoryData.label}
              </span>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-ina-blue shrink-0 transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu Options with Scroller */}
          {dropdownOpen && (
            <div
              role="listbox"
              style={{ touchAction: 'pan-y' }}
              className="absolute left-0 right-0 top-full mt-2 max-h-[260px] overflow-y-auto overscroll-contain custom-dropdown-scrollbar bg-white/98 backdrop-blur-2xl rounded-2xl border border-ina-blue/40 shadow-2xl z-50 p-2 pb-3.5 space-y-1 animate-in fade-in zoom-in-95 duration-150"
            >
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                const CatIcon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-ina-navy text-white shadow-sm'
                        : 'text-ina-ink hover:bg-ina-tint-15/50 hover:text-ina-navy'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CatIcon
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-ina-blue' : 'text-ina-grey'
                        }`}
                      />
                      <span>{cat.label}</span>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-ina-blue shrink-0 stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= DESKTOP/TABLET VIEW: Category Filter Tabs ================= */}
        <div className="hidden sm:flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${isActive
                  ? 'bg-ina-navy text-white shadow-md shadow-ina-navy/20 scale-105 ring-2 ring-ina-blue/40'
                  : 'bg-white/80 hover:bg-white text-ina-grey hover:text-ina-navy border border-ina-line/80 hover:border-ina-line shadow-xs'
                  }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-ina-blue' : 'text-ina-grey'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Marquee Container (Continuous animated marquee on all devices with touch-pause support) */}
        <div
          key={activeCategory}
          className="relative w-full overflow-hidden py-2 [mask-image:_linear-gradient(to_right,transparent_0,_black_32px,_black_calc(100%-32px),transparent_100%)] sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)]"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className="flex w-max items-center gap-6 sm:gap-12 md:gap-16 animate-marquee hover:[animation-play-state:paused] py-2 sm:py-4"
            style={{
              animationDuration: `${Math.max(22, currentLogos.length * 1.5)}s`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {/* Duplicate list to achieve continuous seamless loop */}
            {[...currentLogos, ...currentLogos].map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex items-center justify-center shrink-0 w-28 sm:w-44 md:w-52 h-14 sm:h-22 md:h-24 px-2 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              >
                <img
                  src={encodeURI(brand.src)}
                  alt={brand.name}
                  className="w-full h-full object-contain transition-all duration-300 hover:brightness-105"
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
        .animate-marquee:hover,
        .animate-marquee:focus-within {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}

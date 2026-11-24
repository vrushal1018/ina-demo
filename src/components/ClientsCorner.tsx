"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Handshake,
  Sparkles,
  Hotel,
  Building2,
  ShoppingBag,
  HeartPulse,
  Home as HomeIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Search,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

// --- CLIENT LOGO DATA ---

// 1. Hospitality (24 brands from /hospitality)
const HOSPITALITY_LOGOS = [
  { name: "Taj Hotels", src: "/hospitality/taj.png?v=3", category: "Hospitality", tag: "5-Star Luxury" },
  { name: "JW Marriott", src: "/hospitality/jw mariot.png?v=3", category: "Hospitality", tag: "Luxury Hotel" },
  { name: "The Leela", src: "/hospitality/the leela.png?v=3", category: "Hospitality", tag: "Luxury Palaces" },
  { name: "Grand Hyatt", src: "/hospitality/grand hyatt.png?v=3", category: "Hospitality", tag: "Premium Hospitality" },
  { name: "Hyatt Regency", src: "/hospitality/hyatt regency.png?v=3", category: "Hospitality", tag: "5-Star Hotel" },
  { name: "Hyatt", src: "/hospitality/hyatt.png?v=3", category: "Hospitality", tag: "Global Hospitality" },
  { name: "Hyatt Ahmedabad", src: "/hospitality/hyat ahmedabad.png?v=3", category: "Hospitality", tag: "Luxury Destination" },
  { name: "Hilton", src: "/hospitality/hilton.png?v=3", category: "Hospitality", tag: "World Resorts" },
  { name: "DoubleTree by Hilton", src: "/hospitality/double tree.png?v=3", category: "Hospitality", tag: "Premium Hotel" },
  { name: "Sheraton", src: "/hospitality/sheraton.png?v=3", category: "Hospitality", tag: "Global Hotel" },
  { name: "Westin", src: "/hospitality/westin.png?v=3", category: "Hospitality", tag: "Wellness & Luxury" },
  { name: "Radisson", src: "/hospitality/raddison.png?v=3", category: "Hospitality", tag: "Premium Hospitality" },
  { name: "Novotel", src: "/hospitality/novotel.png?v=3", category: "Hospitality", tag: "Accor Hotels" },
  { name: "Crowne Plaza", src: "/hospitality/crown plaza.png?v=3", category: "Hospitality", tag: "IHG Hotels" },
  { name: "Holiday Inn", src: "/hospitality/holiday inn.png?v=3", category: "Hospitality", tag: "IHG Hotels" },
  { name: "Courtyard by Marriott", src: "/hospitality/courtyard.png?v=3", category: "Hospitality", tag: "Marriott Bonvoy" },
  { name: "Courtyard Hyderabad", src: "/hospitality/courtyard hyderabad.png?v=3", category: "Hospitality", tag: "Business Luxury" },
  { name: "Marriott Hyderabad", src: "/hospitality/mariott hyderabad.png?v=3", category: "Hospitality", tag: "5-Star Hotel" },
  { name: "Fairfield by Marriott", src: "/hospitality/farifield.png?v=3", category: "Hospitality", tag: "Marriott Bonvoy" },
  { name: "Four Points by Sheraton", src: "/hospitality/four points.png?v=3", category: "Hospitality", tag: "Marriott Bonvoy" },
  { name: "Vivanta", src: "/hospitality/vivanta.png?v=3", category: "Hospitality", tag: "Taj Group" },
  { name: "The Park", src: "/hospitality/the park.png?v=3", category: "Hospitality", tag: "Boutique Luxury" },
  { name: "Ibis", src: "/hospitality/ibis.png?v=3", category: "Hospitality", tag: "Accor Hotels" },
  { name: "Ginger", src: "/hospitality/ginger.png?v=3", category: "Hospitality", tag: "IHCL Group" },
];

// 2. IT & Commercial (15 brands from /IT,commercial)
const IT_COMMERCIAL_LOGOS = [
  { name: "Axis Bank", src: "/IT,commercial/Axis bank.png?v=3", category: "IT & Commercial", tag: "Banking & Finance" },
  { name: "Reliance Industries", src: "/IT,commercial/Reliance.png?v=3", category: "IT & Commercial", tag: "Enterprise Conglomerate" },
  { name: "Hikvision", src: "/IT,commercial/Hikvision.png?v=3", category: "IT & Commercial", tag: "Security Tech" },
  { name: "UST Global", src: "/IT,commercial/UST-global.png?v=3", category: "IT & Commercial", tag: "IT Services" },
  { name: "Surat Diamond Bourse (SDB)", src: "/IT,commercial/SDB.png?v=3", category: "IT & Commercial", tag: "Mega Commercial Hub" },
  { name: "Godrej", src: "/IT,commercial/godrej.png?v=3", category: "IT & Commercial", tag: "Corporate Campus" },
  { name: "99 Group", src: "/IT,commercial/99.png?v=3", category: "IT & Commercial", tag: "Corporate Real Estate" },
  { name: "Art Guild House", src: "/IT,commercial/Art-guild-house.png?v=3", category: "IT & Commercial", tag: "Commercial Complex" },
  { name: "CUMI", src: "/IT,commercial/Cumi.png?v=3", category: "IT & Commercial", tag: "Industrial Engineering" },
  { name: "Fortune 9", src: "/IT,commercial/Fortune9.png?v=3", category: "IT & Commercial", tag: "Tech Park" },
  { name: "Manjeera Trinity", src: "/IT,commercial/manjeera.png?v=3", category: "IT & Commercial", tag: "Commercial Towers" },
  { name: "Paragon Plaza", src: "/IT,commercial/paragon plaza.png?v=3", category: "IT & Commercial", tag: "Business Center" },
  { name: "Prime Focus Technologies (PFT)", src: "/IT,commercial/PFT.png?v=3", category: "IT & Commercial", tag: "Media & Cloud Tech" },
  { name: "R City", src: "/IT,commercial/Rcity.png?v=3", category: "IT & Commercial", tag: "Corporate Offices" },
  { name: "Reycon", src: "/IT,commercial/Reycon.png?v=3", category: "IT & Commercial", tag: "Commercial Infrastructure" },
];

// 3. Shopping Malls (15 brands from /malls)
const MALL_LOGOS = [
  { name: "Phoenix Marketcity", src: "/malls/phoennix marketcity.png?v=3", category: "Shopping Malls", tag: "Mega Retail Hub" },
  { name: "High Street Phoenix", src: "/malls/highstreet.png?v=3", category: "Shopping Malls", tag: "Luxury Destination" },
  { name: "Jio World", src: "/malls/jio world.png?v=3", category: "Shopping Malls", tag: "Convention & Retail" },
  { name: "LuLu Mall", src: "/malls/lulu mall.png?v=3", category: "Shopping Malls", tag: "Super Regional Mall" },
  { name: "Infiniti Mall", src: "/malls/infiniti.png?v=3", category: "Shopping Malls", tag: "Premier Shopping" },
  { name: "Nexus Malls", src: "/malls/mall.png?v=3", category: "Shopping Malls", tag: "Pan-India Retail" },
  { name: "VR Surat", src: "/malls/vr-surat.png?v=3", category: "Shopping Malls", tag: "Virtuous Retail" },
  { name: "Capital Mall", src: "/malls/capital mall.png?v=3", category: "Shopping Malls", tag: "Shopping & Dining" },
  { name: "DSL Virtue Mall", src: "/malls/DSL.png?v=3", category: "Shopping Malls", tag: "Lifestyle Mall" },
  { name: "Kumar Pacific Mall", src: "/malls/kumar pacific.png?v=3", category: "Shopping Malls", tag: "City Center Mall" },
  { name: "Elements Mall (MSR)", src: "/malls/msr elemetns.png?v=3", category: "Shopping Malls", tag: "Retail & Entertainment" },
  { name: "PVP Square", src: "/malls/pvp.png?v=3", category: "Shopping Malls", tag: "Prime Commercial Mall" },
  { name: "Shreeji Sharan", src: "/malls/shreeji.png?v=3", category: "Shopping Malls", tag: "Retail Center" },
  { name: "The Pavilion Mall", src: "/malls/the maintenance.png?v=3", category: "Shopping Malls", tag: "Premium Mall" },
  { name: "Virginia Mall", src: "/malls/viriginia mall.png?v=3", category: "Shopping Malls", tag: "Commercial Mall" },
];

// 4. Hospitals & Healthcare (8 brands from /hospital)
const HOSPITAL_LOGOS = [
  { name: "Manipal Hospitals", src: "/hospital/manipal hospitals.png?v=3", category: "Hospitals", tag: "Multi-Specialty Network" },
  { name: "Narayana Health", src: "/hospital/narayan  health.png?v=3", category: "Hospitals", tag: "Cardiac & Super-Specialty" },
  { name: "Reliance Hospital", src: "/hospital/reliance hospital.png?v=3", category: "Hospitals", tag: "Advanced Healthcare" },
  { name: "Rajagiri Hospital", src: "/hospital/rajagiri hospital.png?v=3", category: "Hospitals", tag: "Quaternary Care" },
  { name: "Asian Cancer Institute", src: "/hospital/asian cnacer institute.png?v=3", category: "Hospitals", tag: "Oncology Care" },
  { name: "Asian Fidelis", src: "/hospital/asian fidelis.png?v=3", category: "Hospitals", tag: "Super-Specialty Hospital" },
  { name: "Le Crest Hospital", src: "/hospital/le-crest.png?v=3", category: "Hospitals", tag: "Multi-Specialty" },
  { name: "Sankara Eye Hospital", src: "/hospital/sankara.png?v=3", category: "Hospitals", tag: "Ophthalmology Institute" },
];

// 5. Elite Residential (11 brands from /elite residential logos)
const RESIDENTIAL_LOGOS = [
  { name: "Calcutta Riverside", src: "/elite residential logos/calcutta-riverside.png?v=2", category: "Elite Residential", tag: "Integrated Township" },
  { name: "K Raheja Corp", src: "/elite residential logos/k-raheja-corp.png?v=2", category: "Elite Residential", tag: "Luxury Estates" },
  { name: "Godrej Properties", src: "/elite residential logos/godrej-properties.png?v=2", category: "Elite Residential", tag: "Premium Residences" },
  { name: "SD Corp", src: "/elite residential logos/sd-corp.png?v=2", category: "Elite Residential", tag: "Shapoorji Pallonji JV" },
  { name: "Primarc Projects", src: "/elite residential logos/primarc-projects.png?v=2", category: "Elite Residential", tag: "Eco Luxury Living" },
  { name: "ABI Apex", src: "/elite residential logos/abi-apex.png?v=2", category: "Elite Residential", tag: "High-Rise Living" },
  { name: "Ashok Gardens", src: "/elite residential logos/ashok-gardens.png?v=2", category: "Elite Residential", tag: "Luxury Residential" },
  { name: "L&T Realty", src: "/elite residential logos/lt-realty.png?v=2", category: "Elite Residential", tag: "Gated Communities" },
  { name: "Prateek Grand City", src: "/elite residential logos/prateek-grand-city.png?v=2", category: "Elite Residential", tag: "Modern Township" },
  { name: "Mahagun Maple", src: "/elite residential logos/mahagun-maple.png?v=2", category: "Elite Residential", tag: "Luxury Apartments" },
  { name: "Runwal", src: "/elite residential logos/runwal.png?v=2", category: "Elite Residential", tag: "Iconic Residences" },
];

// Master Collection (73 brands)
const ALL_CLIENT_LOGOS = [
  ...HOSPITALITY_LOGOS,
  ...IT_COMMERCIAL_LOGOS,
  ...MALL_LOGOS,
  ...HOSPITAL_LOGOS,
  ...RESIDENTIAL_LOGOS,
];

interface LogoItem {
  name: string;
  src: string;
  category: string;
  tag: string;
}

interface CategoryConfig {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  logos: LogoItem[];
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: "all",
    name: "All Clients",
    icon: Sparkles,
    logos: ALL_CLIENT_LOGOS,
  },
  {
    id: "hospitality",
    name: "Hospitality",
    icon: Hotel,
    logos: HOSPITALITY_LOGOS,
  },
  {
    id: "it-commercial",
    name: "IT & Commercial",
    icon: Building2,
    logos: IT_COMMERCIAL_LOGOS,
  },
  {
    id: "malls",
    name: "Shopping Malls",
    icon: ShoppingBag,
    logos: MALL_LOGOS,
  },
  {
    id: "hospital",
    name: "Hospitals",
    icon: HeartPulse,
    logos: HOSPITAL_LOGOS,
  },
  {
    id: "residential",
    name: "Elite Residential",
    icon: HomeIcon,
    logos: RESIDENTIAL_LOGOS,
  },
];

// Flat-topped hexagon path for the precise honeycomb layout
const hexClipPath = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

const HexItem = ({
  logo,
  x,
  y,
  delay,
}: {
  logo: LogoItem;
  x: number;
  y: number;
  delay: number;
}) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-500 hover:z-50 group"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="filter drop-shadow-[0_4px_14px_rgba(8,35,54,0.06)] hover:drop-shadow-[0_12px_32px_rgba(26, 149, 209,0.28)] transition-all duration-300 transform hover:-translate-y-1.5">
        <div
          className="w-[160px] h-[140px] bg-white flex flex-col items-center justify-center gap-2 cursor-pointer border border-ina-tint-8/90 px-3 py-2"
          style={{ clipPath: hexClipPath }}
          title={logo.name}
        >
          <div className="w-24 h-12 flex items-center justify-center">
            <img
              src={encodeURI(logo.src)}
              alt={logo.name}
              className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
              decoding="async"
            />
          </div>
          <span className="text-[11px] font-semibold text-ina-navy text-center px-2 leading-tight line-clamp-2 max-w-[124px]">
            {logo.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function ClientsCorner() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [honeycombPage, setHoneycombPage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [dropdownOpen]);

  const activeCategory = CATEGORIES[activeTab];
  const ActiveIcon = activeCategory.icon;
  const activeLogos = activeCategory.logos;

  // Filtered logos for search
  const filteredLogos = useMemo(() => {
    if (!searchQuery.trim()) return activeLogos;
    const q = searchQuery.toLowerCase();
    return activeLogos.filter(
      (logo) =>
        logo.name.toLowerCase().includes(q) ||
        logo.category.toLowerCase().includes(q) ||
        logo.tag.toLowerCase().includes(q)
    );
  }, [activeLogos, searchQuery]);

  // Reset honeycomb page when tab changes
  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setHoneycombPage(0);
  };

  // Honeycomb pagination (10 logos per view)
  const itemsPerPage = 10;
  const totalHoneycombPages = Math.ceil(activeLogos.length / itemsPerPage);
  const currentPageLogos = activeLogos.slice(
    honeycombPage * itemsPerPage,
    (honeycombPage + 1) * itemsPerPage
  );

  // Split current page logos evenly between left and right clusters
  const halfCount = Math.ceil(currentPageLogos.length / 2);
  const leftLogos = currentPageLogos.slice(0, halfCount);
  const rightLogos = currentPageLogos.slice(halfCount);

  // Honeycomb coordinates
  const leftPositions = [
    { x: 0, y: -74 },
    { x: 0, y: 74 },
    { x: -126, y: -148 },
    { x: -126, y: 0 },
    { x: -252, y: -74 },
  ];

  const rightPositions = [
    { x: 0, y: -74 },
    { x: 0, y: 74 },
    { x: 126, y: -148 },
    { x: 126, y: 0 },
    { x: 252, y: -74 },
  ];

  return (
    <section className="relative w-full py-10 sm:py-14 lg:py-16 overflow-visible bg-gradient-to-b from-ina-tint-15 to-ina-tint-8 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blueprint grid accent */}
        <div className="absolute inset-0 blueprint-dots opacity-40 pointer-events-none" />
        {/* Authentic Architectural Linework Drawing Stream */}
        <ArchitecturalLineworkBackground theme="light" opacity={0.28} mask="fade-edges" />
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-10 w-96 h-96 bg-ina-blue/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-ina-navy/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header Area */}
        <div className="text-center max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ina-blue/10 border border-ina-blue/20 text-ina-blue text-xs font-semibold tracking-wide mb-3">
            <Handshake className="w-3.5 h-3.5" />
            <span>Clients Corner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-ina-navy mb-3 tracking-normal">
            Technologies & Partners with Ina
          </h1>
          <p className="text-ina-grey text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Our goals are ambitious and can only be achieved in partnership with others.
            We proudly deliver comprehensive engineering, facility management, and technical solutions
            to India&apos;s most prestigious healthcare institutions, hospitality landmarks, IT hubs, malls, and elite residential townships.
          </p>
          <div className="w-16 h-1 bg-ina-blue mx-auto mt-4 rounded-full" />
        </div>

        {/* ================= MOBILE PHONE VIEW: Dropdown Selector & Search Bar ================= */}
        <div className="sm:hidden w-full max-w-md mx-auto mb-5 flex items-center gap-2.5 z-40">
          {/* Dropdown Selector */}
          <div ref={dropdownRef} className="relative flex-1 min-w-0">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
              className="w-full h-11 flex items-center justify-between gap-1.5 px-3 py-2 rounded-full bg-white/95 backdrop-blur-md border border-ina-blue/40 shadow-xs text-ina-navy active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-full bg-ina-navy text-white flex items-center justify-center shrink-0">
                  <ActiveIcon className="w-3.5 h-3.5 text-ina-blue" />
                </span>
                <span className="text-xs font-semibold text-ina-navy truncate">
                  {activeCategory.name}
                </span>
              </div>

              <ChevronDown
                className={`w-3.5 h-3.5 text-ina-blue shrink-0 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu Options with Scroller */}
            {dropdownOpen && (
              <div
                role="listbox"
                style={{ touchAction: 'pan-y' }}
                className="absolute left-0 top-full mt-2 w-[220px] max-h-[260px] overflow-y-auto overscroll-contain custom-dropdown-scrollbar bg-white/98 backdrop-blur-2xl rounded-2xl border border-ina-blue/40 shadow-2xl z-50 p-2 pb-3.5 space-y-1 animate-in fade-in zoom-in-95 duration-150"
              >
                {CATEGORIES.map((cat, idx) => {
                  const isSelected = activeTab === idx;
                  const CatIcon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        handleTabChange(idx);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-ina-navy text-white shadow-sm"
                          : "text-ina-ink hover:bg-ina-tint-15/50 hover:text-ina-navy"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CatIcon
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? "text-ina-blue" : "text-ina-grey"
                          }`}
                        />
                        <span>{cat.name}</span>
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

          {/* Quick Search Bar Beside Dropdown */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-3.5 h-3.5 text-ina-grey absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              onFocus={(e) => {
                e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
              }}
              className="w-full h-11 pl-8 pr-7 text-[16px] sm:text-xs rounded-full border border-ina-line/90 bg-white/95 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-ina-blue/40 focus:border-ina-blue transition-[border-color,box-shadow] text-ina-navy placeholder:text-ina-grey"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-ina-grey hover:text-ina-grey w-5 h-5 flex items-center justify-center rounded-full"
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* ================= DESKTOP/TABLET VIEW: Category Filter Tabs ================= */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 mb-2 sm:mb-3 bg-white/95 backdrop-blur-md p-2 rounded-2xl sm:rounded-full shadow-lg border border-ina-line/80 relative z-40">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={cat.id}
                onClick={() => handleTabChange(idx)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${isActive
                    ? "bg-ina-navy text-white shadow-md scale-105 ring-2 ring-ina-blue/40"
                    : "bg-transparent text-ina-grey hover:bg-ina-tint-8 hover:text-ina-navy"
                  }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-ina-blue" : "text-ina-grey"}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Honeycomb Showcase (hidden on small mobile screens) */}
        <div className="hidden md:flex flex-col items-center w-full max-w-6xl mb-6 sm:mb-8">
          <div className="relative w-full h-[470px] flex items-center justify-center">
            {/* Left Hexagon Cluster */}
            <div className="absolute top-1/2 left-1/2 -translate-x-[300px] lg:-translate-x-[320px] -translate-y-1/2 w-0 h-0 z-20">
              {leftLogos.map((logo, index) => (
                <HexItem
                  key={`${logo.name}-left-${index}`}
                  logo={logo}
                  x={leftPositions[index].x}
                  y={leftPositions[index].y}
                  delay={index * 80}
                />
              ))}
            </div>

            {/* Center Hero Hexagon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 drop-shadow-2xl">
              <div
                className="w-[360px] lg:w-[400px] h-[312px] lg:h-[346px] flex items-center justify-center relative overflow-hidden"
                style={{ clipPath: hexClipPath }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-ina-navy via-ina-night to-ina-night" />
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-8 text-center">
                  <Image
                    src="/Ina Logo-1.jpg.png"
                    alt="Ina Logo"
                    width={220}
                    height={120}
                    className="object-contain filter drop-shadow-2xl"
                    priority
                  />
                  <span className="text-[11px] font-semibold tracking-wide text-ina-blue mt-2">
                    Integrated facility management
                  </span>
                  <span className="text-[10px] text-ina-mist mt-1">
                    {activeCategory.name} Showcase
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hexagon Cluster */}
            <div className="absolute top-1/2 left-1/2 translate-x-[300px] lg:translate-x-[320px] -translate-y-1/2 w-0 h-0 z-20">
              {rightLogos.map((logo, index) => (
                <HexItem
                  key={`${logo.name}-right-${index}`}
                  logo={logo}
                  x={rightPositions[index].x}
                  y={rightPositions[index].y}
                  delay={(index + halfCount) * 80}
                />
              ))}
            </div>
          </div>

          {/* Honeycomb Pagination Controls (shown when category has > 10 logos) */}
          {totalHoneycombPages > 1 && (
            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-ina-line shadow-sm mt-2">
              <button
                type="button"
                onClick={() => setHoneycombPage((p) => Math.max(0, p - 1))}
                disabled={honeycombPage === 0}
                className="p-1.5 rounded-full hover:bg-ina-tint-8 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-ina-navy cursor-pointer"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-semibold text-ina-navy">
                Page {honeycombPage + 1} of {totalHoneycombPages} &bull; Showing{" "}
                {honeycombPage * itemsPerPage + 1}&ndash;
                {Math.min((honeycombPage + 1) * itemsPerPage, activeLogos.length)} of{" "}
                {activeLogos.length} {activeCategory.name} Brands
              </span>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalHoneycombPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setHoneycombPage(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${honeycombPage === i ? "w-6 bg-ina-blue" : "w-2 bg-ina-line hover:bg-ina-grey"
                      }`}
                    title={`Go to page ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setHoneycombPage((p) => Math.min(totalHoneycombPages - 1, p + 1))}
                disabled={honeycombPage === totalHoneycombPages - 1}
                className="p-1.5 rounded-full hover:bg-ina-tint-8 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-ina-navy cursor-pointer"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile View: Dedicated clean interactive cards with Center Emblem */}
        <div className="md:hidden w-full flex flex-col items-center gap-4 mb-6 sm:mb-8">
          {/* Mobile Center Emblem */}
          <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-ina-navy via-ina-night to-ina-night p-6 text-center shadow-xl border border-white/10 flex flex-col items-center justify-center">
            <Image
              src="/Ina Logo-1.jpg.png"
              alt="Ina Logo"
              width={180}
              height={100}
              className="object-contain filter drop-shadow-2xl mb-2"
            />
            <span className="text-[11px] font-semibold tracking-wide text-ina-blue">
              {searchQuery ? `Search Results (${filteredLogos.length})` : `${activeCategory.name} Partners`}
            </span>
          </div>

          {/* Grid of partners */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md">
            {filteredLogos.length === 0 ? (
              <div className="w-full py-10 px-4 text-center bg-white/90 rounded-2xl border border-dashed border-ina-line col-span-2 sm:col-span-3">
                <p className="text-ina-grey text-xs font-medium">
                  No clients found matching &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-xs text-ina-blue font-semibold hover:underline"
                >
                  Clear search filter
                </button>
              </div>
            ) : (
              filteredLogos.map((logo, idx) => (
                <div
                  key={`${logo.name}-${idx}`}
                  className="bg-white rounded-xl p-3 border border-ina-line/80 shadow-xs flex flex-col items-center justify-center gap-2 text-center hover:border-ina-blue/40 transition-all"
                >
                  <div className="w-full h-12 flex items-center justify-center">
                    <img
                      src={encodeURI(logo.src)}
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain"
                      decoding="async"
                    />
                  </div>
                  <span className="text-xs font-semibold text-ina-navy line-clamp-2">
                    {logo.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Full Directory & Interactive Catalog Grid Section (Desktop only - removed in phone view) */}
        <div className="hidden md:block w-full mt-2 pt-6 sm:pt-8 border-t border-ina-line/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-ina-navy">
                Complete {activeCategory.name} Directory
              </h2>
              <p className="text-ina-grey text-xs sm:text-sm mt-1">
                Explore all verified client facilities, operations, and networks managed by Ina
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-ina-grey absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeCategory.name.toLowerCase()} clients...`}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full border border-ina-line bg-white shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-ina-blue/40 focus:border-ina-blue transition-[border-color,box-shadow]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ina-grey hover:text-ina-grey"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Logos Grid */}
          {filteredLogos.length === 0 ? (
            <div className="w-full py-16 text-center bg-white rounded-2xl border border-dashed border-ina-line">
              <p className="text-ina-grey text-sm font-medium">
                No clients found matching &ldquo;{searchQuery}&rdquo; in {activeCategory.name}.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs text-ina-blue font-semibold hover:underline"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
              {filteredLogos.map((logo, idx) => (
                <div
                  key={`${logo.name}-${idx}`}
                  className="group bg-white rounded-xl sm:rounded-2xl p-4 border border-ina-line/80 shadow-2xs hover:shadow-md hover:border-ina-blue/50 transition-all duration-300 flex flex-col items-center justify-between min-h-[140px] text-center"
                >
                  <div className="w-full h-16 flex items-center justify-center p-1">
                    <img
                      src={encodeURI(logo.src)}
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-108"
                      decoding="async"
                    />
                  </div>
                  <div className="w-full mt-2 pt-2 border-t border-ina-tint-8 flex flex-col items-center">
                    <span className="text-xs font-semibold text-ina-navy group-hover:text-ina-blue transition-colors line-clamp-2">
                      {logo.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Partnership Call to Action Banner */}
        <div className="w-full max-w-5xl mt-14 rounded-3xl bg-gradient-to-r from-ina-navy via-ina-navy to-ina-night p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-ina-blue/20 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs text-ina-blue font-semibold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pan-India Facility Management Network</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Partner with Ina for Your Facilities
              </h3>
              <p className="text-ina-mist text-xs sm:text-sm mt-2 max-w-xl">
                Experience comprehensive hard FM, technical engineering, IoT-driven audits, and bespoke facility operations trusted by India&apos;s leading brands.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-ina-blue-deep hover:bg-ina-navy text-white text-sm font-semibold shadow-lg shadow-ina-blue/30 hover:scale-105 transition-all duration-300 w-full sm:w-auto shrink-0"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
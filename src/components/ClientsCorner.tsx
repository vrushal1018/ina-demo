"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  // Hospitality
  Coffee, Utensils, Wifi, Map, Bell, Home, Tv, Music, Car, Smile,
  // IT-Commercial
  Monitor, Server, Network, Laptop, Database, Briefcase, Cpu, Cloud, Shield, Lock,
  // Malls
  ShoppingBag, Tag, CreditCard, Store, Ticket, Gift, Package, Watch, Smartphone, Camera,
  // Elite Residential
  Key, ShieldCheck, Trees, Sun, Moon, Star, Building, Zap,
  // Hospital
  Activity, Heart, Plus, Clipboard, PlusCircle, Thermometer, Eye, Droplet, Users, Crosshair,
  Handshake,
} from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

// --- Mock Data for the 5 Categories ---
const partnerCategories = [
  {
    id: "hospitality",
    name: "Hospitality",
    logos: [
      { name: "Marriott", icon: Coffee, color: "text-amber-600" },
      { name: "Hilton", icon: Home, color: "text-blue-600" },
      { name: "Hyatt", icon: Bell, color: "text-slate-800" },
      { name: "Taj Hotels", icon: Utensils, color: "text-yellow-600" },
      { name: "Radisson", icon: Map, color: "text-blue-500" },
      { name: "Accor", icon: Smile, color: "text-indigo-500" },
      { name: "Oberoi", icon: Star, color: "text-red-700" },
      { name: "ITC Hotels", icon: Tv, color: "text-emerald-600" },
      { name: "Lemon Tree", icon: Trees, color: "text-green-500" },
      { name: "The Leela", icon: Music, color: "text-purple-600" },
    ]
  },
  {
    id: "it-commercial",
    name: "IT-Commercial",
    logos: [
      { name: "TCS", icon: Monitor, color: "text-blue-600" },
      { name: "Infosys", icon: Server, color: "text-blue-500" },
      { name: "Wipro", icon: Network, color: "text-indigo-500" },
      { name: "HCL Tech", icon: Laptop, color: "text-cyan-600" },
      { name: "Tech Mahindra", icon: Database, color: "text-red-600" },
      { name: "IBM", icon: Cloud, color: "text-blue-800" },
      { name: "Accenture", icon: Cpu, color: "text-purple-600" },
      { name: "Cognizant", icon: Shield, color: "text-emerald-600" },
      { name: "Capgemini", icon: Lock, color: "text-blue-400" },
      { name: "Oracle", icon: Briefcase, color: "text-red-500" },
    ]
  },
  {
    id: "malls",
    name: "Malls",
    logos: [
      { name: "Phoenix", icon: ShoppingBag, color: "text-orange-500" },
      { name: "DLF Mall", icon: Tag, color: "text-blue-600" },
      { name: "Inorbit", icon: Store, color: "text-pink-500" },
      { name: "Oberoi Mall", icon: CreditCard, color: "text-slate-800" },
      { name: "Viviana", icon: Gift, color: "text-purple-500" },
      { name: "Nexus", icon: Ticket, color: "text-red-500" },
      { name: "Palladium", icon: Watch, color: "text-yellow-600" },
      { name: "Forum", icon: Smartphone, color: "text-blue-500" },
      { name: "Express Ave", icon: Camera, color: "text-emerald-500" },
      { name: "Orion", icon: Car, color: "text-slate-600" },
    ]
  },
  {
    id: "elite-residential",
    name: "Elite Residential",
    logos: [
      { name: "Lodha", icon: Building, color: "text-blue-800" },
      { name: "Godrej", icon: Trees, color: "text-green-600" },
      { name: "DLF", icon: Home, color: "text-blue-600" },
      { name: "Hiranandani", icon: Map, color: "text-amber-600" },
      { name: "Prestige", icon: Star, color: "text-yellow-500" },
      { name: "Sobha", icon: ShieldCheck, color: "text-slate-800" },
      { name: "Brigade", icon: Key, color: "text-red-600" },
      { name: "Puravankara", icon: Sun, color: "text-orange-500" },
      { name: "Oberoi Realty", icon: Moon, color: "text-indigo-500" },
      { name: "Mahindra", icon: Zap, color: "text-red-500" },
    ]
  },
  {
    id: "hospital",
    name: "Hospital",
    logos: [
      { name: "Apollo", icon: Activity, color: "text-blue-500" },
      { name: "Fortis", icon: Heart, color: "text-green-500" },
      { name: "Max Health", icon: Plus, color: "text-red-600" },
      { name: "Manipal", icon: Clipboard, color: "text-blue-700" },
      { name: "Narayana", icon: PlusCircle, color: "text-cyan-500" },
      { name: "Medanta", icon: Thermometer, color: "text-orange-500" },
      { name: "Aster", icon: Eye, color: "text-indigo-500" },
      { name: "Hinduja", icon: Droplet, color: "text-red-500" },
      { name: "Kokilaben", icon: Users, color: "text-purple-500" },
      { name: "Columbia", icon: Crosshair, color: "text-blue-600" },
    ]
  }
];

// Flat-topped hexagon path for the precise honeycomb layout
const hexClipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';

interface LogoItem {
  name: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  color: string;
}

const HexItem = ({ logo, x, y, delay }: { logo: LogoItem, x: number, y: number, delay: number }) => {
  const Icon = logo.icon;
  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-500 hover:z-50"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        animationDelay: `${delay}ms`
      }}
    >
      <div className="filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:drop-shadow-[0_12px_30px_rgba(36,149,211,0.25)] transition-all duration-300 transform hover:-translate-y-1.5">
        <div
          className="w-[160px] h-[140px] bg-white flex flex-col items-center justify-center gap-2 cursor-pointer border border-slate-100"
          style={{ clipPath: hexClipPath }}
        >
          <Icon className={`w-8 h-8 ${logo.color}`} strokeWidth={1.75} />
          <span className="text-xs font-semibold text-[#1C3A62] text-center px-4 leading-tight">
            {logo.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function ClientsCorner() {
  const [activeTab, setActiveTab] = useState(0);

  const activeCategory = partnerCategories[activeTab];
  const activeLogos = activeCategory.logos;
  const leftLogos = activeLogos.slice(0, 5);
  const rightLogos = activeLogos.slice(5, 10);

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
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#F0F7FD]/30 via-white to-slate-50 font-sans">
      {/* Blueprint grid accent */}
      <div className="absolute inset-0 blueprint-dots opacity-40 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.28} mask="fade-edges" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-10 w-96 h-96 bg-[#2495D3]/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#1C3A62]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header Area */}
        <div className="text-center max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 text-[#2495D3] text-xs font-semibold tracking-wider uppercase mb-4">
            <Handshake className="w-3.5 h-3.5" />
            <span>INA partner</span>
          </div>
          <h4 className="text-[#2495D3] font-bold text-sm md:text-base tracking-wide uppercase mb-3 hidden">
            INA partner
          </h4>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#1C3A62] mb-6 tracking-normal">
            Technologies & Partners with INA
          </h2>
          <p className="text-[#585858] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Our goals are ambitious and can only be achieved in partnership with others.
            We work with a number of technology partners who help us
            deliver outstanding facility management solutions globally.
          </p>
          <div className="w-16 h-1 bg-[#2495D3] mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 bg-white/90 backdrop-blur-md p-2 rounded-2xl sm:rounded-full shadow-lg border border-slate-200/80 relative z-40">
          {partnerCategories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-xl sm:rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === idx
                  ? "bg-[#1C3A62] text-white shadow-md scale-105"
                  : "bg-transparent text-[#585858] hover:bg-slate-100 hover:text-[#1C3A62]"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Desktop / Tablet Honeycomb Composition (hidden on small mobile screens to prevent overflow and tiny text) */}
        <div className="hidden md:flex relative w-full max-w-6xl h-[680px] items-center justify-center">
          {/* Left Hexagon Cluster */}
          <div className="absolute top-1/2 left-1/2 -translate-x-[300px] lg:-translate-x-[320px] -translate-y-1/2 w-0 h-0 z-20">
            {leftLogos.map((logo, index) => (
              <HexItem
                key={logo.name}
                logo={logo}
                x={leftPositions[index].x}
                y={leftPositions[index].y}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Center Hero Hexagon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 drop-shadow-2xl">
            <div
              className="w-[360px] lg:w-[400px] h-[312px] lg:h-[346px] flex items-center justify-center relative overflow-hidden"
              style={{ clipPath: hexClipPath }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C3A62] via-[#0F223D] to-[#0A1629]" />
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-8 text-center">
                <Image
                  src="/Ina Logo-1.jpg.png"
                  alt="INA Logo"
                  width={220}
                  height={120}
                  className="object-contain filter drop-shadow-2xl"
                  priority
                />
                <span className="text-[11px] font-semibold tracking-widest text-[#2495D3] uppercase mt-2">
                  Integrated Facility Management
                </span>
              </div>
            </div>
          </div>

          {/* Right Hexagon Cluster */}
          <div className="absolute top-1/2 left-1/2 translate-x-[300px] lg:translate-x-[320px] -translate-y-1/2 w-0 h-0 z-20">
            {rightLogos.map((logo, index) => (
              <HexItem
                key={logo.name}
                logo={logo}
                x={rightPositions[index].x}
                y={rightPositions[index].y}
                delay={(index + 5) * 100}
              />
            ))}
          </div>
        </div>

        {/* Mobile View: Dedicated clean interactive grid with Center Emblem */}
        <div className="md:hidden w-full flex flex-col items-center gap-6">
          {/* Mobile Center Emblem */}
          <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-[#1C3A62] via-[#0F223D] to-[#0A1629] p-6 text-center shadow-xl border border-white/10 flex flex-col items-center justify-center">
            <Image
              src="/Ina Logo-1.jpg.png"
              alt="INA Logo"
              width={180}
              height={100}
              className="object-contain filter drop-shadow-2xl mb-2"
            />
            <span className="text-[11px] font-semibold tracking-wider text-[#2495D3] uppercase">
              {activeCategory.name} Partners
            </span>
          </div>

          {/* Grid of 10 partners */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md">
            {activeLogos.map((logo) => {
              const Icon = logo.icon;
              return (
                <div
                  key={logo.name}
                  className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center gap-2 text-center"
                >
                  <Icon className={`w-7 h-7 ${logo.color}`} strokeWidth={1.75} />
                  <span className="text-xs font-semibold text-[#1C3A62] line-clamp-1">
                    {logo.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
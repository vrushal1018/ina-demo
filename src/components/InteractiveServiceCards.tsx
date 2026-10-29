'use client';

import React, { useRef, useState } from 'react';
import {
  Smartphone,
  MousePointerClick,
  Target,
  Search,
  Cloud,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';

const defaultServices = [
  {
    title: "Custom Software & App Development",
    icon: Smartphone,
    description: "Unlock your potential with a clear digital roadmap. Our expert consultants dive deep into your business to craft strategies that elevate your brand and drive results. Let's turn your vision into a powerful reality."
  },
  {
    title: "Web Design & Development",
    icon: MousePointerClick,
    description: "Unlock your potential with a clear digital roadmap. Our expert consultants dive deep into your business to craft strategies that elevate your brand and drive results. Let's turn your vision into a powerful reality."
  },
  {
    title: "Digital Strategy & Consulting",
    icon: Target,
    description: "Unlock your potential with a clear digital roadmap. Our expert consultants dive deep into your business to craft strategies that elevate your brand and drive results. Let's turn your vision into a powerful reality."
  },
  {
    title: "Digital Marketing & SEO",
    icon: Search,
    description: "Unlock your potential with a clear digital roadmap. Our expert consultants dive deep into your business to craft strategies that elevate your brand and drive results. Let's turn your vision into a powerful reality."
  },
  {
    title: "Cloud Solutions & Cybersecurity",
    icon: Cloud,
    description: "Unlock your potential with a clear digital roadmap. Our expert consultants dive deep into your business to craft strategies that elevate your brand and drive results. Let's turn your vision into a powerful reality."
  }
];

export interface ServiceItem {
  title: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  description: string;
}

interface Props {
  services?: ServiceItem[];
}

export default function InteractiveServiceCards({ services = defaultServices }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -380 : 380;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA] flex flex-col items-center font-sans overflow-hidden border-t border-[#2495D3]/20">
      {/* Blueprint grid accent */}
      <div className="absolute inset-0 blueprint-dots opacity-30 pointer-events-none" />
      {/* Architectural linework stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.24} mask="fade-edges" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 text-[#2495D3] text-xs font-semibold tracking-wide mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our services</span>
          </div>
          <div className="mb-4 hidden rounded-full bg-[#2495D3]/10 px-4 py-1.5 text-xs font-medium text-[#2495D3]">
            Our Services
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C3A62] tracking-normal">
            What We Offer
          </h2>
          <div className="w-16 h-1 bg-[#2495D3] mt-2.5 rounded-full" />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-[#1C3A62] hover:border-[#2495D3] hover:bg-[#2495D3] hover:text-white transition-all duration-300 shadow-sm bg-white active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-[#1C3A62] hover:border-[#2495D3] hover:bg-[#2495D3] hover:text-white transition-all duration-300 shadow-sm bg-white active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-[#D9EDF8] to-transparent z-10 pointer-events-none" />

        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-[#D9EDF8] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          className="flex items-start gap-6 overflow-x-auto pb-12 pt-4 px-4 sm:px-6 md:px-12 lg:px-16 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  icon: Icon,
  description,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  description: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }}
      className={`group relative w-[320px] sm:w-[360px] md:w-[390px] bg-transparent rounded-2xl flex-shrink-0 snap-center transition-all duration-300 p-6 sm:p-7 flex flex-col border cursor-pointer select-none overflow-hidden ${
        isOpen
          ? 'border-[#2495D3] shadow-lg shadow-[#1C3A62]/6'
          : 'border-slate-200/80 hover:border-[#2495D3]/60 shadow-xs hover:shadow-xl hover:shadow-[#1C3A62]/6 hover:-translate-y-1'
      }`}
    >
      {/* Top Brand Accent Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2495D3] to-transparent transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />

      {/* Heading Section: Icon + Dropdown Arrow */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div
          className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-xs shrink-0 ${
            isOpen
              ? 'bg-[#2495D3] border-[#2495D3] text-white'
              : 'bg-white border-slate-200/80 text-[#1C3A62] group-hover:bg-[#2495D3] group-hover:border-[#2495D3] group-hover:text-white'
          }`}
        >
          <Icon size={24} strokeWidth={1.75} />
        </div>

        {/* Small arrow for dropdown */}
        <div
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
            isOpen
              ? 'rotate-180 bg-[#2495D3] text-white border-[#2495D3] shadow-xs'
              : 'text-slate-400 border-slate-200/80 bg-white group-hover:border-[#2495D3] group-hover:text-[#2495D3]'
          }`}
          aria-label={isOpen ? "Collapse details" : "Expand details"}
        >
          <ChevronDown size={18} strokeWidth={2} />
        </div>
      </div>

      {/* Service Title */}
      <h3
        className={`font-normal text-xl sm:text-2xl leading-snug transition-colors ${
          isOpen ? 'text-[#2495D3]' : 'text-[#1C3A62] group-hover:text-[#2495D3]'
        }`}
      >
        {title}
      </h3>

      {/* Dropdown Data Section */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4 mt-4 border-t border-slate-200/70">
            <p className="text-[#585858] text-[14px] sm:text-[15px] leading-relaxed mb-4 font-normal">
              {description}
            </p>

            <div className="flex items-center gap-2 text-[#2495D3] font-semibold text-xs tracking-wide group-hover:text-[#1C3A62] transition-colors w-fit">
              <span>Learn more</span>
              <ArrowRight size={15} className="transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useRef } from 'react';
import {
  Smartphone,
  MousePointerClick,
  Target,
  Search,
  Cloud,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

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
  icon: any;
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
    <div className="relative py-20 lg:py-28 bg-[#F0F7FD]/30 flex flex-col items-center font-sans overflow-hidden border-t border-slate-100">
      {/* Blueprint grid accent */}
      <div className="absolute inset-0 blueprint-dots opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 text-[#2495D3] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Services</span>
          </div>
          <div className="mb-4 hidden rounded-full bg-[#2495D3]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#2495D3]">
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C3A62] tracking-tight">
            What We Offer
          </h2>
          <div className="w-16 h-1 bg-[#2495D3] mt-3 rounded-full" />
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
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-[#F0F7FD]/80 to-transparent z-10 pointer-events-none" />

        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-[#F0F7FD]/80 to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-12 pt-4 px-4 sm:px-6 md:px-12 lg:px-16 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ title, icon: Icon, description }: { title: string; icon: any; description: string }) {
  return (
    <div className="relative w-[320px] sm:w-[360px] md:w-[390px] min-h-[420px] bg-white rounded-2xl flex-shrink-0 snap-center shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-7 sm:p-9 flex flex-col border border-slate-200/90 group overflow-hidden">
      {/* Top Brand Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2495D3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-[#F0F7FD] text-[#1C3A62] flex items-center justify-center mb-6 group-hover:bg-[#2495D3] group-hover:text-white transition-colors duration-300 shadow-sm">
        <Icon size={28} strokeWidth={1.75} />
      </div>

      {/* Title */}
      <h3 className="font-bold text-xl sm:text-2xl text-[#1C3A62] mb-3 leading-snug group-hover:text-[#2495D3] transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#585858] text-[14px] sm:text-[15px] leading-relaxed mb-6 flex-grow font-normal">
        {description}
      </p>

      {/* Action */}
      <div className="flex items-center gap-2 text-[#2495D3] font-semibold text-xs tracking-wider uppercase group-hover:text-[#1C3A62] transition-colors mt-auto w-fit">
        <span>Learn More</span>
        <ArrowRight size={16} className="transform group-hover:translate-x-1.5 transition-transform" />
      </div>
    </div>
  );
}
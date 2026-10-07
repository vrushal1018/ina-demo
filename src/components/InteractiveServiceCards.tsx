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
  ArrowRight
} from 'lucide-react';

// Service data extracted from the video
const services = [
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

export default function InteractiveServiceCards() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -380 : 380;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-24 bg-[#f8f9fa] flex flex-col items-center font-sans overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="mb-4 inline-block rounded-full bg-[#2495D3]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#2495D3]">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1C3A62] tracking-tight">
            What We Offer
          </h2>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-[#1C3A62] hover:border-[#1C3A62] hover:bg-[#1C3A62] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:ring-offset-2 bg-white"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-[#1C3A62] hover:border-[#1C3A62] hover:bg-[#1C3A62] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:ring-offset-2 bg-white"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="w-full relative">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none" />

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-12 pt-4 px-6 md:px-24 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ title, icon: Icon, description }: { title: string, icon: any, description: string }) {
  return (
    <div className="relative w-[340px] md:w-[380px] min-h-[420px] bg-white rounded-3xl flex-shrink-0 snap-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 p-8 md:p-10 flex flex-col border border-gray-100 group">
      <div className="w-16 h-16 rounded-2xl bg-[#f0f4f8] text-[#1C3A62] flex items-center justify-center mb-8 group-hover:bg-[#2495D3] group-hover:text-white transition-colors duration-500">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <h3 className="font-bold text-2xl text-[#1C3A62] mb-4 leading-snug">
        {title}
      </h3>
      
      <p className="text-[#585858] text-[15px] leading-relaxed mb-8 flex-grow">
        {description}
      </p>

      <button className="flex items-center gap-2 text-[#2495D3] font-bold text-sm tracking-wide uppercase hover:text-[#1C3A62] transition-colors mt-auto w-fit group/btn">
        Learn More 
        <ArrowRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
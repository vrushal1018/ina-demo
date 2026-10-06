'use client';

import React, { useState } from 'react';
import {
  Smartphone,
  MousePointerClick,
  Target,
  Search,
  Cloud,
  Plus,
  ArrowUpRight
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
  return (
    <div className="py-20 bg-white flex items-center p-8 overflow-hidden font-sans">
      <div className="flex gap-4 overflow-x-auto pb-8 w-full max-w-7xl mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ title, icon: Icon, description }: { title: string, icon: any, description: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative w-[320px] h-[360px] bg-[#F0F0F0] rounded-2xl flex-shrink-0 cursor-pointer overflow-hidden group shadow-lg"
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* 
        Base State (Light Gray with Primary Blue Icons & Text) 
      */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between text-[#1C3A62] z-0">
        <div>
          <Icon size={40} strokeWidth={1.5} className="text-[#1C3A62]" />
        </div>
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-semibold text-xl leading-tight pr-4">
            {title}
          </h3>
          <button
            className="flex-shrink-0 w-8 h-8 rounded-full border border-[#1C3A62] text-[#1C3A62] flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-[#1C3A62] group-hover:text-white"
            aria-label="Expand card"
          >
            <Plus size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* 
        Expanded State (Brand Dark Blue Overlay)
      */}
      <div
        className="absolute inset-0 bg-[#1C3A62] p-8 flex flex-col justify-between text-white z-10 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          clipPath: isOpen
            ? 'circle(150% at calc(100% - 2.5rem) calc(100% - 2.5rem))'
            : 'circle(0% at calc(100% - 2.5rem) calc(100% - 2.5rem))'
        }}
      >
        <p className="text-sm leading-relaxed font-medium text-gray-200">
          {description}
        </p>

        <div>
          <h3 className="font-extrabold text-xl leading-tight mb-6 pr-4 text-white">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <button className="border border-[#C7F000] text-[#C7F000] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#C7F000] hover:text-[#1C3A62] transition-colors">
              Learn
            </button>
            <button
              className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C7F000] text-[#1C3A62] flex items-center justify-center hover:scale-110 hover:bg-[#d5ff1a] transition-all duration-300 shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Close card"
            >
              <ArrowUpRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
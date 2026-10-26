'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Activity,
  ShieldCheck,
  LineChart,
  Wrench,
  Target,
  Settings,
  Users,
  CalendarDays,
  FileText,
  TrendingDown,
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';

const services = [
  {
    title: 'Asset Lifecycle Enhancement',
    description: 'Enhancing the life cycle of critical engineering assets.',
    icon: Activity,
  },
  {
    title: 'Asset outage minimization',
    description: 'Minimizing asset outages and breakdowns to avoid business disruptions.',
    icon: ShieldCheck,
  },
  {
    title: 'Predictive maintenance',
    description: 'Systematic monitoring and maintenance based on asset performance and condition.',
    icon: LineChart,
  },
  {
    title: 'Preventive maintenance',
    description: 'Planned maintenance aimed at preventing failures and maintaining asset reliability.',
    icon: Wrench,
  },
  {
    title: '360° asset performance',
    description: 'Using technology to provide a 360-degree view of overall asset operating performance.',
    icon: Target,
  },
  {
    title: 'Engineering O&M',
    description: 'Engineering Operations & Maintenance through a self-delivery approach.',
    icon: Settings,
  },
  {
    title: 'Man, machine & technology',
    description: 'Combining skilled manpower, equipment and technology for effective asset management.',
    icon: Users,
  },
  {
    title: 'Digitalized schedules',
    description: 'Using digitalization to improve maintenance scheduling and operational planning.',
    icon: CalendarDays,
  },
  {
    title: 'Controlled documentation',
    description: 'Maintaining controlled documentation for better operational management.',
    icon: FileText,
  },
  {
    title: 'Cost optimization',
    description: 'Exploring opportunities to reduce operating expenditure while optimizing asset performance.',
    icon: TrendingDown,
  },
  {
    title: 'Safety & employee well-being',
    description: 'Maintaining a safe workplace while prioritizing employee well-being.',
    icon: Heart,
  },
];

export default function ComprehensiveBuildingSolutions() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isDragging && !isHovered) {
      interval = setInterval(() => {
        if (scrollContainerRef.current) {
          const { current } = scrollContainerRef;
          const isAtEnd =
            current.scrollLeft + current.clientWidth >= current.scrollWidth - 10;

          if (isAtEnd) {
            current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            current.scrollBy({ left: 380, behavior: 'smooth' });
          }
        }
      }, 3500);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isDragging, isHovered]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -380 : 380;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="relative bg-gradient-to-b from-[#E2F1FA] to-[#D9EDF8] py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden border-t border-[#2495D3]/20">
      {/* Background blueprint dots */}
      <div className="absolute inset-0 blueprint-dots opacity-30 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream in Whitespace */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.28} mask="fade-edges" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 sm:mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 text-[#2495D3] font-semibold tracking-wide mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>See all services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1C3A62] leading-[1.1] tracking-normal">
              Comprehensive facility <br className="hidden md:block" />
              management solutions
            </h2>
            <div className="w-16 h-1 bg-[#2495D3] mt-3 rounded-full" />
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6">
            <p className="text-[#585858] max-w-md text-sm sm:text-base leading-relaxed lg:text-right">
              We provide specialized engineering and facility management services, ensuring your physical assets and critical systems operate at peak efficiency, reliability, and safety.
            </p>
            {/* Navigation Buttons */}
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
        </div>

        {/* Horizontal Slider Section */}
        <div
          className="w-full relative mt-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsDragging(false);
          }}
        >
          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-6 overflow-x-auto pb-12 pt-4 px-4 md:px-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] select-none ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'
              }`}
          >
            {services.map((service, index) => {
              const Icon = service.icon;

              const isEven = index % 2 === 0;
              const clipPath = isEven
                ? 'polygon(2.5rem 0, 100% 0, 100% calc(100% - 2.5rem), calc(100% - 2.5rem) 100%, 0 100%, 0 2.5rem)'
                : 'polygon(0 0, calc(100% - 2.5rem) 0, 100% 2.5rem, 100% 100%, 2.5rem 100%, 0 calc(100% - 2.5rem))';

              return (
                <div
                  key={index}
                  className="relative w-[320px] md:w-[350px] h-[380px] group snap-center shrink-0 pointer-events-none"
                >
                  {/* Border Wrapper */}
                  <div
                    className="h-full w-full bg-slate-200 group-hover:bg-[#2495D3] p-[1.5px] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(36,149,211,0.2)] group-hover:-translate-y-2 pointer-events-auto"
                    style={{ clipPath }}
                  >
                    {/* Inner Card */}
                    <div
                      className="flex flex-col h-full w-full bg-white p-7 md:p-8"
                      style={{ clipPath }}
                    >
                      {/* Icon Container */}
                      <div className="w-14 h-14 bg-[#F0F7FD] rounded-xl flex items-center justify-center text-[#1C3A62] mb-6 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2495D3] group-hover:text-white shadow-sm">
                        <Icon size={26} strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-normal text-[#1C3A62] mb-3 pr-2 leading-snug group-hover:text-[#2495D3] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-[#585858] text-[14px] mb-6 flex-grow leading-relaxed">
                        {service.description}
                      </p>

                      {/* Action Link */}
                      <div className="inline-flex items-center text-[#1C3A62] font-semibold text-xs tracking-wide group-hover:text-[#2495D3] transition-colors w-max mt-auto pointer-events-auto gap-1.5">
                        <span>Read more</span>
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
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
  ChevronRight
} from 'lucide-react';

const services = [
  {
    title: 'Asset Lifecycle Enhancement',
    description: 'Enhancing the life cycle of critical engineering assets.',
    icon: Activity,
  },
  {
    title: 'Asset Outage Minimization',
    description: 'Minimizing asset outages and breakdowns to avoid business disruptions.',
    icon: ShieldCheck,
  },
  {
    title: 'Predictive Maintenance',
    description: 'Systematic monitoring and maintenance based on asset performance and condition.',
    icon: LineChart,
  },
  {
    title: 'Preventive Maintenance',
    description: 'Planned maintenance aimed at preventing failures and maintaining asset reliability.',
    icon: Wrench,
  },
  {
    title: '360° Asset Performance',
    description: 'Using technology to provide a 360-degree view of overall asset operating performance.',
    icon: Target,
  },
  {
    title: 'Engineering O&M',
    description: 'Engineering Operations & Maintenance through a self-delivery approach.',
    icon: Settings,
  },
  {
    title: 'Man, Machine & Technology',
    description: 'Combining skilled manpower, equipment and technology for effective asset management.',
    icon: Users,
  },
  {
    title: 'Digitalized Schedules',
    description: 'Using digitalization to improve maintenance scheduling and operational planning.',
    icon: CalendarDays,
  },
  {
    title: 'Controlled Documentation',
    description: 'Maintaining controlled documentation for better operational management.',
    icon: FileText,
  },
  {
    title: 'Cost Optimization',
    description: 'Exploring opportunities to reduce operating expenditure while optimizing asset performance.',
    icon: TrendingDown,
  },
  {
    title: 'Safety & Employee Well-being',
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
          // Check if we're near the end of the scroll container
          const isAtEnd = current.scrollLeft + current.clientWidth >= current.scrollWidth - 10;
          
          if (isAtEnd) {
            current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            current.scrollBy({ left: 380, behavior: 'smooth' });
          }
        }
      }, 3000); // Scrolls every 3 seconds
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
    const walk = (x - startX) * 2; // scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="bg-white min-h-screen py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 bg-[#C7F000] rounded-sm shadow-sm"></div>
              <span className="text-sm text-[#1C3A62] font-medium tracking-wide uppercase">See all Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1C3A62] leading-[1.1] tracking-tight">
              Comprehensive Hard FM <br className="hidden md:block" />
              Solutions
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-6">
            <p className="text-[#585858] max-w-md text-sm leading-relaxed lg:text-right">
              We provide specialized engineering and facility management services, ensuring your physical assets and critical systems operate at peak efficiency, reliability, and safety.
            </p>
            {/* Navigation Buttons */}
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
        </div>

        {/* Horizontal Slider Section */}
        <div 
          className="w-full relative mt-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsDragging(false);
          }}
        >
          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          
          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-6 overflow-x-auto pb-12 pt-4 px-4 md:px-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] select-none ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'}`}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              
              // Alternating cut-corner shapes based on index
              const isEven = index % 2 === 0;
              const clipPath = isEven
                ? 'polygon(3.5rem 0, 100% 0, 100% calc(100% - 3.5rem), calc(100% - 3.5rem) 100%, 0 100%, 0 3.5rem)'
                : 'polygon(0 0, calc(100% - 3.5rem) 0, 100% 3.5rem, 100% 100%, 3.5rem 100%, 0 calc(100% - 3.5rem))';

              return (
                <div key={index} className="relative w-[320px] md:w-[350px] h-[380px] group snap-center shrink-0 pointer-events-none">
                  {/* Border Wrapper */}
                  <div
                    className="h-full w-full bg-gray-200 group-hover:bg-[#1C3A62] p-[1px] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] group-hover:-translate-y-2 pointer-events-auto"
                    style={{ clipPath }}
                  >
                    {/* Inner Card */}
                    <div
                      className="flex flex-col h-full w-full bg-white p-8 md:p-10 min-h-[360px]"
                      style={{ clipPath }}
                    >
                      {/* Icon Container */}
                      <div className="w-14 h-14 bg-[#f0f4f8] rounded-full flex items-center justify-center text-[#1C3A62] mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2495D3] group-hover:text-white">
                        <Icon size={26} strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold text-[#1C3A62] mb-3 pr-4 leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-[#585858] text-[14px] mb-6 flex-grow leading-relaxed">
                        {service.description}
                      </p>

                      {/* Action Link */}
                      <a
                        href="#"
                        className="inline-flex items-center text-[#1C3A62] font-medium text-sm hover:text-[#2495D3] transition-colors w-max mt-auto pointer-events-auto"
                        onClick={(e) => {
                          if (isDragging) e.preventDefault();
                        }}
                      >
                        Read More
                        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </a>
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
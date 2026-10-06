'use client';

import React from 'react';
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
  ArrowRight
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
  return (
    <section className="bg-gray-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 bg-[#C7F000] rounded-sm shadow-sm"></div>
              <span className="text-sm text-[#1C3A62] font-bold tracking-wide uppercase">See all Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1C3A62] leading-[1.1] tracking-tight">
              Comprehensive Hard FM <br className="hidden md:block" />
              Solutions
            </h2>
          </div>
          <p className="text-[#585858] max-w-md text-sm leading-relaxed lg:pb-2">
            We provide specialized engineering and facility management services, ensuring your physical assets and critical systems operate at peak efficiency, reliability, and safety.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            // Alternating cut-corner shapes to create the diamond gaps
            const isEven = index % 2 === 0;
            const clipPath = isEven
              ? 'polygon(3.5rem 0, 100% 0, 100% calc(100% - 3.5rem), calc(100% - 3.5rem) 100%, 0 100%, 0 3.5rem)'
              : 'polygon(0 0, calc(100% - 3.5rem) 0, 100% 3.5rem, 100% 100%, 3.5rem 100%, 0 calc(100% - 3.5rem))';

            return (
              <div
                key={index}
                className="group relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* 
                  Border Wrapper:
                  Using a black background with 1px padding to act as a solid border 
                  that perfectly follows the clip-path coordinates.
                */}
                <div
                  className="h-full w-full bg-black p-[1px]"
                  style={{ clipPath }}
                >
                  {/* Inner White Card */}
                  <div
                    className="flex flex-col h-full w-full bg-white p-10 md:p-12 min-h-[320px]"
                    style={{ clipPath }}
                  >
                    {/* Icon Container - Light blue background with Primary Deep Blue logo */}
                    <div className="w-12 h-12 bg-[#2495D3]/10 rounded-full flex items-center justify-center text-[#1C3A62] mb-8 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={24} strokeWidth={2.5} />
                    </div>

                    {/* Content - Title and Description in Deep Blue */}
                    <h3 className="text-xl font-extrabold text-[#1C3A62] mb-4 pr-4 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-[#1C3A62]/75 text-sm mb-8 flex-grow leading-relaxed font-medium">
                      {service.description}
                    </p>

                    {/* Action Link - Deep Blue, turning Tertiary Blue on hover */}
                    <a
                      href="#"
                      className="inline-flex items-center text-[#1C3A62] font-bold text-sm hover:text-[#2495D3] transition-colors w-max"
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
    </section>
  );
}
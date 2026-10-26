'use client';

import React from 'react';
import {
  LucideIcon,
  Eye,
  ShieldCheck,
  Users,
  Lightbulb,
  HeartHandshake,
  Leaf,
  CheckCircle2,
} from 'lucide-react';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';

interface ValueItem {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const VALUES: ValueItem[] = [
  {
    id: 1,
    number: '01',
    title: 'Transparency',
    description:
      'We maintain complete transparency to ensure trust and reliability.',
    icon: Eye,
  },
  {
    id: 2,
    number: '02',
    title: 'Ownership',
    description:
      'We take accountability of our actions and make things happen.',
    icon: ShieldCheck,
  },
  {
    id: 3,
    number: '03',
    title: 'People first',
    description:
      'We prioritize team and customer satisfaction.',
    icon: Users,
  },
  {
    id: 4,
    number: '04',
    title: 'Innovation',
    description:
      'Creating sustainable values with consistent innovation.',
    icon: Lightbulb,
  },
  {
    id: 5,
    number: '05',
    title: 'Customer first',
    description:
      'Customer in the centre of all our actions.',
    icon: HeartHandshake,
  },
  {
    id: 6,
    number: '06',
    title: 'Safety',
    description:
      'Welfare of team and environment is an uncompromising priority.',
    icon: Leaf,
  },
];

export default function OurValues() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA] text-[#383838] py-10 sm:py-14 lg:py-16 overflow-hidden font-sans border-t border-[#2495D3]/20">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 blueprint-dots opacity-30 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream in Whitespace */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.25} mask="fade-edges" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 text-[#2495D3] text-xs font-semibold tracking-wide">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Our values</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1C3A62] tracking-normal leading-tight">
            What we stand for
          </h2>

          <p className="text-[#585858] text-sm md:text-base leading-relaxed font-normal">
            Our values guide every decision we make, shaping how we work,
            collaborate, and create lasting value for our customers and people.
          </p>
          <div className="w-12 h-1 bg-[#2495D3] mx-auto rounded-full" />
        </div>

        {/* Values Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-slate-200/80 z-0 rounded-full">
            <div className="w-full h-full bg-gradient-to-b from-[#2495D3] via-[#1C3A62] to-[#2495D3] origin-top rounded-full shadow-[0_0_12px_rgba(36,149,211,0.5)]" />
          </div>

          {/* Values */}
          <div className="space-y-6 md:space-y-8 relative z-10">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={value.id}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-[#2495D3] shadow-lg shadow-[#2495D3]/20 flex items-center justify-center z-20 transition-transform duration-300 hover:scale-115">
                    <span className="text-[#1C3A62] font-bold text-xs tracking-wider">
                      {value.number}
                    </span>
                  </div>

                  {/* Value Card */}
                  <div
                    className={`pl-16 md:pl-0 w-full md:w-[calc(50%-40px)] ${
                      isEven ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    <div className="bg-transparent p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-100/80 hover:shadow-2xl hover:border-[#2495D3] transition-all duration-300 group relative overflow-hidden">
                      {/* Top Bar Accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2495D3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Header */}
                      <div className="flex items-center gap-3.5 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1C3A62] text-[#2495D3] flex items-center justify-center group-hover:bg-[#2495D3] group-hover:text-white transition-colors duration-300 flex-shrink-0 shadow-md">
                          <Icon className="w-5 h-5 stroke-[2]" />
                        </div>
                        <div>
                          <span className="text-[11px] font-semibold text-[#2495D3] tracking-wide">
                            Pillar {value.number}
                          </span>
                          <h3 className="text-xl md:text-2xl font-normal text-[#1C3A62] group-hover:text-[#2495D3] transition-colors duration-300">
                            {value.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[#585858] text-sm md:text-base leading-relaxed font-normal">
                        {value.description}
                      </p>
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
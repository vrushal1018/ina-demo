'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Eye,
  ShieldCheck,
  Users,
  Lightbulb,
  HeartHandshake,
  Leaf,
} from 'lucide-react';

interface ValueItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const VALUES: ValueItem[] = [
  {
    id: 1,
    title: 'Transparency',
    description:
      'We maintain complete transparency to ensure trust and reliability.',
    icon: Eye,
  },
  {
    id: 2,
    title: 'Ownership',
    description:
      'We take accountability of our actions and make things happen.',
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: 'People First',
    description:
      'We prioritize team and customer satisfaction.',
    icon: Users,
  },
  {
    id: 4,
    title: 'Innovation',
    description:
      'Creating sustainable values with consistent innovation.',
    icon: Lightbulb,
  },
  {
    id: 5,
    title: 'Customer First',
    description:
      'Customer in the centre of all our actions.',
    icon: HeartHandshake,
  },
  {
    id: 6,
    title: 'Safety',
    description:
      'Welfare of team and environment is an uncompromising priority.',
    icon: Leaf,
  },
];

export default function OurValues() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 80%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="w-full bg-white text-[#383838] py-20 md:py-32 overflow-hidden font-['Poppins',sans-serif]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <span className="text-sm md:text-base font-semibold text-[#2495D3] tracking-widest uppercase block">
            Our Values
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C3A62] tracking-tight leading-tight">
            What We Stand For
          </h2>

          <p className="text-[#585858] text-base md:text-lg leading-relaxed font-normal">
            Our values guide every decision we make, shaping how we work,
            collaborate, and create lasting value for our customers and people.
          </p>
        </div>

        {/* Values Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">

          {/* Vertical Connecting Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-slate-100 z-0">
            <motion.div
              style={{ scaleY }}
              className="w-full h-full bg-gradient-to-b from-[#2495D3] to-[#1C3A62] origin-top"
            />
          </div>

          {/* Values */}
          <div className="space-y-16 md:space-y-24 relative z-10">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={value.id}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >

                  {/* Timeline Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-[#2495D3] shadow-lg flex items-center justify-center z-20 transition-transform duration-300 hover:scale-110">
                    <span className="text-[#1C3A62] font-bold text-sm">
                      {value.id}
                    </span>
                  </div>

                  {/* Value Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className={`pl-16 md:pl-0 w-full md:w-[calc(50%-40px)] ${isEven
                        ? 'md:mr-auto md:text-right'
                        : 'md:ml-auto md:text-left'
                      }`}
                  >
                    <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/80 hover:shadow-2xl hover:border-[#2495D3]/30 transition-all duration-300 group">

                      {/* Value Header */}
                      <div
                        className={`flex items-center gap-4 mb-5 ${isEven
                            ? 'md:flex-row-reverse'
                            : 'flex-row'
                          }`}
                      >
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-2xl bg-[#1C3A62] text-[#2495D3] flex items-center justify-center group-hover:bg-[#2495D3] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                          <Icon className="w-6 h-6 stroke-[2]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-[#1C3A62] group-hover:text-[#2495D3] transition-colors duration-300">
                          {value.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-[#585858] text-sm md:text-base leading-relaxed font-normal">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
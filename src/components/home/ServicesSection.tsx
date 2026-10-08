'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Briefcase,
  BarChart3,
  Code2,
  Cloud,
  ShieldCheck,
  Users2,
  Plus
} from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ElementType | string;
  title: string;
  description: string;
  href: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'Hard FM',
    icon: '/facility-management.png',
    title: 'Hard FM',
    description: 'Strategic guidance to align your technology stack with long-term business objectives, ensuring agility and growth.',
    href: '#',
  },
  {
    id: 'Transition Services',
    icon: '/transition services.png',
    title: 'Transition Services',
    description: 'Transform raw data into actionable insights that drive smarter decisions, improved forecasting, and business innovation.',
    href: '#',
  },
  {
    id: 'Sustainability Services',
    icon: '/Sustainability Services.png',
    title: 'Sustainability Services',
    description: 'Responsive, user-centric websites built with modern frameworks to deliver performance, accessibility, and brand impact.',
    href: '#',
  },
  {
    id: 'Technical Services',
    icon: '/technical services.png',
    title: 'Technical Services',
    description: 'We help you design, deploy, and manage secure, scalable, and high-performance cloud infrastructure that supports modern business.',
    href: '#',
  },
  {
    id: 'Audit & Offerings',
    icon: '/audit offerings.png',
    title: 'Audit & Offerings',
    description: 'We identify system vulnerabilities, assess potential threats, and implement advanced security protocols to safeguard your data and digital assets.',
    href: '#',
  },
  {
    id: 'Allied Services',
    icon: '/allied services.png',
    title: 'Allied Services',
    description: 'Our team builds secure, scalable SaaS products from the ground up—ensuring seamless performance, intuitive user experiences.',
    href: '#',
  },
];

// Duplicate items array to guarantee a seamless continuous loop
const SLIDER_ITEMS = [...SERVICES, ...SERVICES];

export default function ServicesSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="w-full bg-slate-50 py-16 md:py-24 font-['Poppins',sans-serif] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-16">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-['Integral_CF',sans-serif] text-sm md:text-base font-semibold text-[#2495D3] tracking-wider uppercase block mb-3">
              Our Service
            </span>
            <h2 className="font-['Integral_CF',sans-serif] text-3xl sm:text-4xl md:text-[52px] font-semibold text-[#1C3A62] leading-[1.15] tracking-tight">
              Comprehensive Facility Management Solutions
            </h2>
          </div>

          <p className="text-[#585858] text-sm md:text-base max-w-md leading-relaxed font-normal">
            From engineering and technical facility management to sustainability, transition, and allied services, we deliver integrated solutions designed to improve efficiency, reliability, safety, and long-term asset performance..
          </p>
        </div>

      </div>

      {/* Continuous Marquee Slider Container */}
      <div
        className="w-full relative overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Animated Track */}
        <motion.div
          className="flex gap-8 w-max px-4"
          animate={{
            x: isPaused ? undefined : ['0%', '-50%'],
          }}
          transition={{
            ease: 'linear',
            duration: 25,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          {SLIDER_ITEMS.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={`${service.id}-${index}`}
                className="w-[320px] sm:w-[380px] md:w-[420px] flex-shrink-0"
              >
                <div className="group relative bg-white hover:bg-white rounded-3xl p-8 sm:p-10 transition-all duration-300 border border-slate-100 hover:border-[#2495D3]/30 hover:shadow-xl hover:shadow-[#2495D3]/10 flex flex-col justify-between h-full min-h-[380px]">
                  <div>
                    {/* Icon */}
                    <div className="text-[#2495D3] flex items-center mb-6 transition-colors duration-300">
                      {typeof Icon === 'string' ? (
                        <img src={Icon} alt={service.title} className="w-12 h-12 object-contain" />
                      ) : (
                        <Icon className="w-12 h-12 stroke-[1.5]" />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-['Integral_CF',sans-serif] text-2xl md:text-[26px] font-semibold text-[#1C3A62] mb-4 leading-tight group-hover:text-[#2495D3] transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#878787] text-sm md:text-[15px] leading-relaxed font-normal mb-8">
                      {service.description}
                    </p>
                  </div>

                  {/* Read More Action */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-3 text-[#1C3A62] font-semibold text-sm group-hover:text-[#2495D3] transition-colors duration-200 mt-auto"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#1C3A62] text-white flex items-center justify-center group-hover:bg-[#2495D3] transition-colors duration-200">
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </span>
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
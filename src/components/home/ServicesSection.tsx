'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';

interface ServiceItem {
  id: string;
  icon: string;
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
    href: '/services/hard-fm',
  },
  {
    id: 'Transition Services',
    icon: '/transition services.png',
    title: 'Transition Services',
    description: 'Transform raw data into actionable insights that drive smarter decisions, improved forecasting, and business innovation.',
    href: '/services/transition-services',
  },
  {
    id: 'Sustainability Services',
    icon: '/Sustainability Services.png',
    title: 'Sustainability Services',
    description: 'Responsive, user-centric websites built with modern frameworks to deliver performance, accessibility, and brand impact.',
    href: '/services/sustainability-services',
  },
  {
    id: 'Technical Services',
    icon: '/technical services.png',
    title: 'Technical Services',
    description: 'We help you design, deploy, and manage secure, scalable, and high-performance cloud infrastructure that supports modern business.',
    href: '/services/technical-services',
  },
  {
    id: 'Audit & Offerings',
    icon: '/audit offerings.png',
    title: 'Audit & Offerings',
    description: 'We identify system vulnerabilities, assess potential threats, and implement advanced security protocols to safeguard your data and digital assets.',
    href: '/services/audit-and-offerings',
  },
  {
    id: 'Allied Services',
    icon: '/allied services.png',
    title: 'Allied Services',
    description: 'Our team builds secure, scalable SaaS products from the ground up—ensuring seamless performance, intuitive user experiences.',
    href: '/services/allied-services',
  },
];

// Duplicate items array to guarantee a seamless continuous loop
const SLIDER_ITEMS = [...SERVICES, ...SERVICES];

export default function ServicesSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="relative w-full bg-slate-50 py-20 md:py-28 font-sans overflow-hidden border-y border-slate-200/60">
      {/* Background blueprint elements */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream in Whitespace */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.26} flipY={true} mask="fade-edges" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-30px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="inline-block rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#2495D3] mb-4">
              Our Service
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[50px] font-normal text-[#1C3A62] leading-[1.15] tracking-normal">
              Comprehensive Facility Management Solutions
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-[#585858] text-sm md:text-base leading-relaxed font-normal">
              From engineering and technical facility management to sustainability, transition, and allied services, we deliver integrated solutions designed to improve efficiency, reliability, safety, and long-term asset performance..
            </p>
          </div>
        </motion.div>
      </div>

      {/* Continuous Marquee Slider Container */}
      <div
        className="w-full relative overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        {/* Animated Track */}
        <motion.div
          className="flex gap-7 w-max px-4"
          animate={{
            x: isPaused ? undefined : ['0%', '-50%'],
          }}
          transition={{
            ease: 'linear',
            duration: 32,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          {SLIDER_ITEMS.map((service, index) => {
            return (
              <div
                key={`${service.id}-${index}`}
                className="w-[320px] sm:w-[380px] md:w-[400px] flex-shrink-0"
              >
                <div className="group relative bg-transparent hover:bg-white/15 rounded-3xl p-8 sm:p-9 transition-all duration-300 border border-slate-300/80 hover:border-[#2495D3]/50 hover:shadow-2xl hover:shadow-[#1C3A62]/8 flex flex-col justify-between h-full min-h-[400px] hover:-translate-y-1.5 overflow-hidden">

                  {/* Subtle architectural card watermark */}
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                    <img src={service.icon} alt="" className="w-full h-full object-contain" />
                  </div>

                  <div>
                    {/* Icon Container with glowing aura on hover */}
                    <div className="w-16 h-16 rounded-2xl bg-white/60 group-hover:bg-[#2495D3] border border-slate-200/70 group-hover:border-[#2495D3] p-3 flex items-center justify-center mb-7 transition-all duration-300 shadow-xs">
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="w-10 h-10 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-normal text-[#1C3A62] mb-3 leading-snug group-hover:text-[#2495D3] transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#585858] text-sm leading-relaxed font-normal mb-8">
                      {service.description}
                    </p>
                  </div>

                  {/* Read More Action Button */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-200/80 text-[#1C3A62] font-semibold text-sm group-hover:text-[#2495D3] transition-colors duration-200 mt-auto"
                  >
                    <span>Read More</span>
                    <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#2495D3] text-[#1C3A62] group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </span>
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
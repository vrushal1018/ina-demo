'use client';

import React from 'react';
import Link from 'next/link';
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
    title: 'Transition services',
    description: 'Transform raw data into actionable insights that drive smarter decisions, improved forecasting, and business innovation.',
    href: '/services/transition-services',
  },
  {
    id: 'Sustainability Services',
    icon: '/Sustainability Services.png',
    title: 'Sustainability services',
    description: 'Responsive, user-centric websites built with modern frameworks to deliver performance, accessibility, and brand impact.',
    href: '/services/sustainability-services',
  },
  {
    id: 'Technical Services',
    icon: '/technical services.png',
    title: 'Technical services',
    description: 'We help you design, deploy, and manage secure, scalable, and high-performance cloud infrastructure that supports modern business.',
    href: '/services/technical-services',
  },
  {
    id: 'Audit & Offerings',
    icon: '/audit offerings.png',
    title: 'Audit & offerings',
    description: 'We identify system vulnerabilities, assess potential threats, and implement advanced security protocols to safeguard your data and digital assets.',
    href: '/services/audit-and-offerings',
  },
  {
    id: 'Allied Services',
    icon: '/allied services.png',
    title: 'Allied services',
    description: 'Our team builds secure, scalable SaaS products from the ground up—ensuring seamless performance, intuitive user experiences.',
    href: '/services/allied-services',
  },
];

// Duplicate items array to guarantee a seamless continuous loop
const SLIDER_ITEMS = [...SERVICES, ...SERVICES];

export default function ServicesSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#E2F1FA] to-[#EDF6FC] py-10 sm:py-14 lg:py-16 font-sans overflow-hidden">
      {/* Background blueprint elements */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream in Whitespace */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.35} flipY={true} mask="fade-edges" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-8 sm:mb-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            {/* <div className="inline-block rounded-full bg-[#2495D3]/15 border border-[#2495D3]/30 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#1C3A62] mb-3">
              Our services
            </div> */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1C3A62] leading-[1.15] tracking-normal">
              Comprehensive facility management solutions
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-[#585858] text-xs sm:text-sm leading-relaxed font-normal">
              From engineering and technical facility management to sustainability, transition, and allied services, we deliver integrated solutions designed to improve efficiency, reliability, safety, and long-term asset performance..
            </p>
          </div>
        </div>
      </div>

      {/* Continuous Marquee Slider Container */}
      <div className="w-full relative overflow-hidden py-2 group/slider">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#E7F3FA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#E7F3FA] to-transparent z-10 pointer-events-none" />

        {/* Animated Track with Pure CSS Hardware Acceleration */}
        <div className="flex gap-5 sm:gap-6 w-max px-4 animate-services-track group-hover/slider:[animation-play-state:paused]">
          {SLIDER_ITEMS.map((service, index) => {
            return (
              <div
                key={`${service.id}-${index}`}
                className="w-[280px] sm:w-[320px] md:w-[350px] flex-shrink-0"
              >
                <div className="group relative bg-transparent hover:bg-white/15 rounded-2xl p-6 sm:p-7 transition-all duration-300 border border-[#2495D3]/25 hover:border-[#2495D3]/50 hover:shadow-2xl hover:shadow-[#1C3A62]/8 flex flex-col justify-between h-full min-h-[300px] sm:min-h-[320px] hover:-translate-y-1.5 overflow-hidden">

                  {/* Subtle architectural card watermark */}
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                    <img src={service.icon} alt="" className="w-full h-full object-contain" />
                  </div>

                  <div>
                    {/* Icon Container with glowing aura on hover */}
                    <div className="w-13 h-13 rounded-xl bg-transparent group-hover:bg-[#2495D3] border border-[#2495D3]/25 group-hover:border-[#2495D3] p-2.5 flex items-center justify-center mb-5 transition-all duration-300 shadow-xs">
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="w-8 h-8 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
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
        </div>
      </div>

      <style jsx>{`
        @keyframes servicesMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-services-track {
          animation: servicesMarquee 32s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
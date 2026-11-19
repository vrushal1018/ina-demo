'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [isPaused, setIsPaused] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const prevMobileCard = () => {
    setMobileIndex((prev) => (prev === 0 ? SERVICES.length - 1 : prev - 1));
  };

  const nextMobileCard = () => {
    setMobileIndex((prev) => (prev === SERVICES.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;
    if (isLeftSwipe) {
      nextMobileCard();
    } else if (isRightSwipe) {
      prevMobileCard();
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-ina-tint-8 to-ina-tint-15 py-10 sm:py-14 lg:py-16 font-sans overflow-hidden">
      {/* Background blueprint elements */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream in Whitespace */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.35} flipY={true} mask="fade-edges" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-8 sm:mb-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-block rounded-full bg-ina-blue/15 border border-ina-blue/30 px-3.5 py-1 text-xs font-semibold tracking-wide text-ina-navy mb-3">
              Pan-India Facility Management
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-ina-navy leading-[1.15] tracking-normal">
              Integrated Facility Management Services in India
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-ina-grey text-xs sm:text-sm leading-relaxed font-normal">
              As a trusted facility management company in India, Ina TechFM delivers world-class facility management services—integrating technical operations, MEP maintenance, energy optimization, and workplace engineering across 55+ cities.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          PHONE VIEW (sm:hidden): Single Card Carousel with 2 Navigation Arrows
          Fits exactly 1 card at a time with smooth sliding and touch swipe
      ========================================================== */}
      <div className="block sm:hidden w-full px-5">
        {/* Card Viewport */}
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
          >
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="w-full flex-shrink-0"
              >
                <div className="relative bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-ina-blue/30 shadow-lg shadow-ina-navy/6 flex flex-col justify-between min-h-[320px] overflow-hidden">
                  {/* Subtle architectural card watermark */}
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-[0.05] pointer-events-none">
                    <img
                      src={encodeURI(service.icon)}
                      alt=""
                      className="w-full h-full object-contain"
                      decoding="async"
                    />
                  </div>

                  <div>
                    {/* Icon Container */}
                    <div className="w-13 h-13 rounded-xl bg-white border border-ina-blue/30 p-2.5 flex items-center justify-center mb-4.5 shadow-sm">
                      <img
                        src={encodeURI(service.icon)}
                        alt={service.title}
                        decoding="async"
                        className="w-8 h-8 object-contain"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-medium text-ina-navy mb-2.5 leading-snug">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-ina-grey text-sm leading-relaxed font-normal mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Read More Action Button */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-ina-line/90 text-ina-navy font-semibold text-sm active:text-ina-blue transition-colors mt-auto"
                  >
                    <span>Read More</span>
                    <span className="w-8 h-8 rounded-full bg-ina-blue-deep text-white flex items-center justify-center shadow-sm shadow-ina-blue-deep/30">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Navigation Arrows + Slide Indicators */}
        <div className="flex items-center justify-between mt-5 px-1">
          {/* Previous Arrow Button */}
          <button
            onClick={prevMobileCard}
            aria-label="Previous Service"
            className="w-11 h-11 rounded-full bg-white hover:bg-ina-blue hover:text-white text-ina-navy border border-ina-blue/30 shadow-md shadow-ina-navy/6 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.25]" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {SERVICES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMobileIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  mobileIndex === idx
                    ? "w-6 bg-ina-blue"
                    : "w-2 bg-ina-navy/20 hover:bg-ina-navy/40"
                }`}
              />
            ))}
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={nextMobileCard}
            aria-label="Next Service"
            className="w-11 h-11 rounded-full bg-ina-blue-deep hover:bg-ina-navy text-white shadow-md shadow-ina-blue-deep/30 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.25]" />
          </button>
        </div>
      </div>

      {/* =========================================================
          DESKTOP/TABLET VIEW (hidden sm:block): Continuous Marquee Slider
      ========================================================== */}
      <div 
        className="hidden sm:block w-full relative overflow-hidden py-2 [mask-image:_linear-gradient(to_right,transparent_0,_black_40px,_black_calc(100%-40px),transparent_100%)] sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_80px,_black_calc(100%-80px),transparent_100%)]"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Track with Hardware Acceleration on Desktop & Mobile */}
        <div 
          className="flex gap-4 sm:gap-6 w-max px-4 animate-services-track"
          style={isPaused ? { animationPlayState: 'paused' } : undefined}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {SLIDER_ITEMS.map((service, index) => {
            return (
              <div
                key={`${service.id}-${index}`}
                className="w-[260px] sm:w-[320px] md:w-[350px] flex-shrink-0"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="group relative bg-transparent hover:bg-white/15 rounded-2xl p-5 sm:p-7 transition-all duration-300 border border-ina-blue/25 hover:border-ina-blue/50 hover:shadow-2xl hover:shadow-ina-navy/8 flex flex-col justify-between h-full min-h-[290px] sm:min-h-[320px] hover:-translate-y-1.5 overflow-hidden">

                  {/* Subtle architectural card watermark */}
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                    <img src={encodeURI(service.icon)} alt="" className="w-full h-full object-contain" decoding="async" />
                  </div>

                  <div>
                    {/* Icon Container with glowing aura on hover */}
                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-transparent group-hover:bg-ina-blue border border-ina-blue/25 group-hover:border-ina-blue p-2.5 flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300 shadow-xs">
                      <img
                        src={encodeURI(service.icon)}
                        alt={service.title}
                        decoding="async"
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-2xl font-normal text-ina-navy mb-2 sm:mb-3 leading-snug group-hover:text-ina-blue transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-ina-grey text-xs sm:text-sm leading-relaxed font-normal mb-6 sm:mb-8 line-clamp-3 sm:line-clamp-none">
                      {service.description}
                    </p>
                  </div>

                  {/* Read More Action Button */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-ina-line/80 text-ina-navy font-semibold text-xs sm:text-sm group-hover:text-ina-blue transition-colors duration-200 mt-auto"
                  >
                    <span>Read More</span>
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-ina-tint-8 group-hover:bg-ina-blue-deep text-ina-navy group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
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
        .animate-services-track:hover,
        .animate-services-track:focus-within {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}
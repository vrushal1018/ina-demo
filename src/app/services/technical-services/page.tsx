'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Wrench, Wind, TrendingUp, ClipboardCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import AnimateIn from '@/components/AnimateIn';
import ComprehensiveBuildingSolutions from '@/components/ComprehensiveBuildingSolutions';
import InteractiveServiceCards from '@/components/InteractiveServiceCards';

const technicalServices = [
  {
    title: "Retrofit and Mini projects, Spares & Consumables",
    icon: Wrench,
    description: "Retrofit & Mini Project team support our customers by execution of the small retrofit's jobs and mini projects jobs with best quality & cost effectively. Our supply chain will provide the spares & consumables depends on your specified requirements. We also do installation, commissioning, testing and endurance trials of all type of engineering equipment's and its ancillaries."
  },
  {
    title: "Air Balancing",
    icon: Wind,
    description: "Air balancing is a method of testing your heating and cooling system for proactively spotting any problems, that are causing uneven airflow or negative air pressure. Once identified, these problems can be corrected so every area of the location gets the amount of air it needs. The clients stand benefitted by way of better indoor quality, economical energy bills and greater occupant's comfort."
  },
  {
    title: "Process Improvement",
    icon: TrendingUp,
    description: "The Process Improvement Methodology serves as a common framework for understanding the cyclical ongoing nature of a process. It provides a set of phased activities for analysis of an existing process for the specific purpose of identifying & exploring improvement opportunities. Finally, it provides direction as to appropriate refined process management and periodic process review and evaluations geared toward ongoing improvement."
  },
  {
    title: "Annual Maintenance Contracts",
    icon: ClipboardCheck,
    description: "In today's competitive world, maximum quality with minimum cost returns is a key factor. An equipment's performance is dependent on the enhanced efficiency by periodic maintenance. We undertake annual maintenance contracts for all engineering related low side equipment, outlining routine upkeep and scheduled maintenance to optimize the performance, optimize energy and output. Our AMC's & CAMC's cover the listed assets: Complete Electrical Low Side like Breakers Servicing, Thermography, HVAC Low side comprising of CT's, HVAC Pumps, AHU's - FCU's, Diesel Generator Sets , FAPA & Fire Fighting System, Solar Systems, Water Treatment Plant (WTP), CCTV"
  }
];

import { useVideoFocus } from '@/hooks/useVideoFocus';

export default function TechnicalServicesPage() {
  const videoRef = useVideoFocus();

  return (
    <>
      <SiteHeader />

      <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA] font-sans">
        {/* =========================================================
            HERO SECTION WITH BACKGROUND VIDEO
        ========================================================== */}
        <section className="relative min-h-[500px] lg:min-h-[560px] flex items-center py-10 lg:py-16 overflow-hidden bg-[#0A1629]">
          {/* Background Video with continuous loop */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105"
            >
              <source src="/technical%20services.mp4" type="video/mp4" />
            </video>
            {/* Cinematic Gradient Overlay: darker on left for crisp readability, subtly transparent on right to showcase video */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1629]/95 via-[#0A1629]/80 to-[#0A1629]/45" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A1629]/70 via-transparent to-[#0A1629]/90" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            {/* Breadcrumbs */}
            <div className="mb-8 inline-flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
              <Link href="/" className="hover:text-[#2495D3] transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span>Services</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-semibold text-[#2495D3]">Technical Services</span>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-12">
              {/* LEFT CONTENT */}
              <div className="relative z-30">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2495D3]/20 border border-[#2495D3]/40 text-[#45B1E8] text-xs font-semibold tracking-wide mb-4 shadow-sm backdrop-blur-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Engineering maintenance & support</span>
                </div>

                <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-normal text-white">
                  Technical <br />
                  services
                </h1>
                <div className="w-20 h-1 bg-[#2495D3] mt-4 mb-6 rounded-full" />

                <p className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-200">
                  Specialized technical expertise to maintain critical systems and ensure reliable facility performance.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#2495D3] hover:bg-white hover:text-[#1C3A62] px-8 py-3.5 font-semibold text-white transition-all duration-300 shadow-lg shadow-[#2495D3]/30 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Book an appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-xl border-2 border-white/80 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#1C3A62] hover:-translate-y-0.5 active:scale-95 backdrop-blur-sm"
                  >
                    Contact us
                  </Link>
                </div>
              </div>

              {/* TEMPORARILY REMOVED: HERO IMAGE CARDS */}
              {/*
              <div className="relative flex w-full items-center justify-center h-[380px] sm:h-[460px] lg:h-[520px]">
                <div className="absolute left-[8%] top-[-40px] h-[580px] w-px bg-slate-200/80 hidden sm:block" />
                <div className="absolute right-[8%] top-[-40px] h-[580px] w-px bg-slate-200/80 hidden sm:block" />

                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="absolute left-[2%] sm:left-[5%] z-0 h-[68%] w-[42%] overflow-hidden rounded-2xl shadow-xl border-2 border-white group">
                    <img
                      src="/technical2.avif"
                      alt="Technical Services 2"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="absolute right-[2%] sm:right-[5%] z-0 h-[68%] w-[42%] overflow-hidden rounded-2xl shadow-xl border-2 border-white group">
                    <img
                      src="/technical3.webp"
                      alt="Technical Services 3"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="relative z-10 h-[88%] w-[48%] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white border border-slate-200/60 group">
                    <img
                      src="/technicalmain.avif"
                      alt="Main Technical Services"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-[#1C3A62]/90 backdrop-blur-md text-white text-xs font-semibold flex items-center justify-between">
                      <span>Certified Engineering</span>
                      <span className="w-2 h-2 rounded-full bg-[#2495D3] animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
              */}
            </div>
          </div>
        </section>

        {/* =========================================================
            OVERVIEW SECTION
        ========================================================== */}
        <AnimateIn delay={0.1} minHeight="400px">
          <section className="bg-transparent py-8 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xl">
                <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  {/* OVERVIEW IMAGE */}
                  <div className="lg:col-span-5 relative flex h-[280px] sm:h-[320px] lg:h-[360px] items-center justify-center">
                    <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-[#1C3A62] to-[#0F223D] p-6 flex items-center justify-center">
                      <img
                        src="/Technical%20Services.svg"
                        alt="Technical Services Overview"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain object-center scale-[1.05]"
                      />
                    </div>
                  </div>

                  {/* OVERVIEW CONTENT */}
                  <div className="lg:col-span-7">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#2495D3]/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#2495D3]">
                      Overview
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-normal tracking-normal text-[#1C3A62]">
                      What are technical services?
                    </h2>
                    <div className="w-16 h-1 bg-[#2495D3] mt-3 mb-6 rounded-full" />

                    <p className="leading-relaxed text-[#585858] text-base sm:text-lg">
                      Technical Services provide specialized support and deep engineering expertise for your facility&apos;s most critical systems. We focus on preventive maintenance and rapid problem resolution to ensure consistent, reliable performance.
                    </p>

                    <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Technical support',
                        'System maintenance',
                        'Engineering expertise',
                        'Critical systems management',
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-sm"
                        >
                          <span className="h-2 w-2 rounded-full flex-shrink-0 bg-[#2495D3]" />
                          <span className="font-semibold text-sm text-[#1C3A62]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="500px">
          <ComprehensiveBuildingSolutions />
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="500px">
          <InteractiveServiceCards services={technicalServices} />
        </AnimateIn>
      </div>
    </>
  );
}
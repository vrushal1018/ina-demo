'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Zap, Thermometer, Lightbulb, Activity, ArrowRight, FileCheck2 } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import AnimateIn from '@/components/AnimateIn';
import ComprehensiveBuildingSolutions from '@/components/ComprehensiveBuildingSolutions';
import InteractiveServiceCards from '@/components/InteractiveServiceCards';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';

const auditServices = [
  {
    title: "Power Quality & Harmonics",
    icon: Zap,
    description: "Harmonics are a cause & reason for a number of undesired issues and malfunctions in electrical system, causing measurement errors in analogue instruments, nuisance tripping of micro-processor based protective relays & earth leakage circuit breakers. It also causes overheating, due to overloading of capacitors, motors, transformers, cables, risk of short circuits at power factor correction capacitors due to parallel resonance."
  },
  {
    title: "Infrared Thermography",
    icon: Thermometer,
    description: "Any unexpected breakdown in the electrical cause's downtime, costs time and money. Be it manufacturing unit, IT industry, Hospital, Hotel or any establishment, intelligent IR Thermography is the solution for predicting condition grading of the electrical equipment. Thermography determines the hot spots (excessive heat) in the system, identify the overload or uneven load in the system and fault classification. Our Thermography offering conforms to the highest standard of ANSI with the detailed report & subsequent action plan"
  },
  {
    title: "Energy Audit",
    icon: Lightbulb,
    description: "'Energy Audit' as the name synonyms the monitoring, verification and analysis for improving energy efficiency with cost benefit analysis and an action plan to implement the energy conservation. Energy Audit aims at exploring the opportunities for minimizing energy cost, operational cost, minimize repair costs and increase environment quality, that contributes to increased work productivity and enhancement in the life of HVAC engineering assets. Our highly experienced team will carry out a detailed audit of the related system and submit a detailed Audit report with the observation & action plan"
  },
  {
    title: "Vibration Analysis",
    icon: Activity,
    description: "Vibration monitoring and analysis can be used to discover and diagnose a wide variety of problems related to all rotating equipment's. Will able to understand abnormal equipment conditions/faults where this predictive maintenance technology can be use in defining existing conditions which may lead to break down."
  }
];

export default function AuditAndOfferingsPage() {
  return (
    <>
      <SiteHeader />

      <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA] font-sans">
        {/* =========================================================
            HERO SECTION
        ========================================================== */}
        <section className="relative bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA] py-8 lg:py-14 overflow-hidden">
          {/* Blueprint grid accent */}
          <div className="absolute inset-0 blueprint-dots opacity-30 pointer-events-none" />
          {/* Architectural linework stream */}
          <ArchitecturalLineworkBackground theme="light" opacity={0.22} mask="fade-edges" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <div className="mb-8 inline-flex items-center gap-2 text-xs sm:text-sm text-[#585858] bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/80 shadow-sm">
              <Link href="/" className="hover:text-[#2495D3] transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span>Services</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-semibold text-[#2495D3]">Audit & Offerings</span>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-12">
              {/* LEFT CONTENT */}
              <div className="relative z-30">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 text-[#2495D3] text-xs font-semibold tracking-wide mb-4">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Engineering audits & analysis</span>
                </div>

                <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-normal text-[#1C3A62]">
                  Audit &
                  <br />
                  offerings
                </h1>
                <div className="w-20 h-1 bg-[#2495D3] mt-4 mb-6 rounded-full" />

                <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#585858]">
                  Comprehensive diagnostic audits and bespoke engineering solutions to maximize facility efficiency and performance.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#2495D3] hover:bg-[#1C3A62] px-8 py-3.5 font-semibold text-white transition-all duration-300 shadow-lg shadow-[#2495D3]/25 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Book an appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-xl border-2 border-[#1C3A62] px-8 py-3.5 font-semibold text-[#1C3A62] transition-all duration-300 hover:bg-[#1C3A62] hover:text-white hover:-translate-y-0.5 active:scale-95"
                  >
                    Contact us
                  </Link>
                </div>
              </div>

              {/* RIGHT IMAGE - OVERLAPPING ARCHITECTURAL PANELS */}
              <div className="relative flex w-full items-center justify-center h-[380px] sm:h-[460px] lg:h-[520px]">
                <div className="absolute left-[8%] top-[-40px] h-[580px] w-px bg-slate-200/80 hidden sm:block" />
                <div className="absolute right-[8%] top-[-40px] h-[580px] w-px bg-slate-200/80 hidden sm:block" />

                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="absolute left-[2%] sm:left-[5%] z-0 h-[68%] w-[42%] overflow-hidden rounded-2xl shadow-xl border-2 border-white group">
                    <img
                      src="/audit2.avif"
                      alt="Audit & Offerings 2"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="absolute right-[2%] sm:right-[5%] z-0 h-[68%] w-[42%] overflow-hidden rounded-2xl shadow-xl border-2 border-white group">
                    <img
                      src="/audit3.avif"
                      alt="Audit & Offerings 3"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="relative z-10 h-[88%] w-[48%] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white border border-slate-200/60 group">
                    <img
                      src="/auditmain.jpg"
                      alt="Main Audit & Offerings"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-[#1C3A62]/90 backdrop-blur-md text-white text-xs font-semibold flex items-center justify-between">
                      <span>ANSI Conformance</span>
                      <span className="w-2 h-2 rounded-full bg-[#2495D3] animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
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
                        src="/Audit%26Offerings.svg"
                        alt="Audit & Offerings Overview"
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
                      What are audits & offerings?
                    </h2>
                    <div className="w-16 h-1 bg-[#2495D3] mt-3 mb-6 rounded-full" />

                    <p className="leading-relaxed text-[#585858] text-base sm:text-lg">
                      Our audit services deliver professional, in-depth assessments of your facility&apos;s operations and performance. By providing tailored solutions and identifying key improvement opportunities, we help optimize your facility&apos;s overall effectiveness.
                    </p>

                    <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Facility audits',
                        'Performance assessment',
                        'Bespoke solutions',
                        'Risk management',
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
          <InteractiveServiceCards services={auditServices} />
        </AnimateIn>
      </div>
    </>
  );
}
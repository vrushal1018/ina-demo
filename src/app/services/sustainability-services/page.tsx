'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import ComprehensiveBuildingSolutions from '@/components/ComprehensiveBuildingSolutions';
import InteractiveServiceCards from '@/components/InteractiveServiceCards';

export default function SustainabilityServicesPage() {
  return (
    <>
      <SiteHeader />

      <div className="min-h-screen overflow-hidden bg-white font-sans">

        {/* =========================================================
            HERO SECTION
        ========================================================== */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-6 pt-8 pb-16 lg:pt-10 lg:pb-24">

            {/* Breadcrumbs */}
            <div className="mb-10 flex items-center gap-1.5 text-sm text-[#585858]">
              <span>Home</span>
              <ChevronRight className="h-4 w-4" />
              <span>Services</span>
              <ChevronRight className="h-4 w-4" />
              <span className="font-semibold text-[#2495D3]">
                Sustainability Services
              </span>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">

              {/* =====================================================
                  LEFT CONTENT
              ====================================================== */}
              <div className="relative z-30">
                <h1 className="max-w-2xl text-5xl font-semibold leading-[0.95] tracking-tight text-[#1C3A62] sm:text-6xl lg:text-[64px]">
                  SUSTAINABILITY
                  <br />
                  SERVICES
                </h1>

                <p className="mt-7 max-w-md text-base leading-relaxed text-[#585858] sm:text-lg">
                  Energy-focused solutions that help optimize consumption, improve efficiency, and support sustainable operations.
                </p>

                {/* Buttons */}
                <div className="mt-9 flex flex-wrap gap-4">
                  <button
                    className="
                      rounded-full
                      border
                      border-[#1C3A62]
                      px-8
                      py-3.5
                      font-semibold
                      text-[#1C3A62]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-[#1C3A62]
                      hover:text-white
                    "
                  >
                    Book an Appointment
                  </button>

                  <button
                    className="
                      rounded-full
                      border
                      border-[#1C3A62]
                      px-8
                      py-3.5
                      font-semibold
                      text-[#1C3A62]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-[#1C3A62]
                      hover:text-white
                    "
                  >
                    Contact Us
                  </button>
                </div>
              </div>

              {/* =====================================================
                  RIGHT IMAGE - OVERLAPPING PANELS MATCHING DESIGN
              ====================================================== */}
              <div className="relative flex w-full items-center justify-center h-[400px] lg:h-[550px]">
                {/* Decorative vertical lines */}
                <div className="absolute left-[8%] top-[-100px] h-[650px] w-px bg-gray-200" />
                <div className="absolute right-[8%] top-[-100px] h-[650px] w-px bg-gray-200" />

                {/* Overlapping Panels Container */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">

                  {/* Panel 1: Left Doctor (Shorter, Behind) */}
                  <div className="absolute left-[5%] z-0 h-[70%] w-[42%] overflow-hidden rounded-3xl shadow-xl">
                    <img
                      src="/sustainablitiy2.jpg"
                      alt="Sustainability Services 2"
                      className="h-full w-full object-cover object-center bg-white"
                    />
                  </div>

                  {/* Panel 3: Right Doctor (Shorter, Behind) */}
                  <div className="absolute right-[5%] z-0 h-[70%] w-[42%] overflow-hidden rounded-3xl shadow-xl">
                    <img
                      src="/sustainability3.webp"
                      alt="Sustainability Services 3"
                      className="h-full w-full object-cover object-center bg-white"
                    />
                  </div>

                  {/* Panel 2: Center Doctor (Taller, Front) */}
                  <div className="relative z-10 h-[90%] w-[45%] overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white">
                    <img
                      src="/sustainabilitymain.jpg"
                      alt="Main Sustainability Services"
                      className="h-full w-full object-cover object-center bg-white"
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            OVERVIEW SECTION
        ========================================================== */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:pt-14">
            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                bg-white
                p-6
                shadow-xl
                md:p-10
                lg:p-12
              "
              style={{
                backgroundImage:
                  'linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            >
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

                {/* =================================================
                    OVERVIEW IMAGE (Design Fixed)
                ================================================== */}
                <div className="relative flex h-[330px] items-center justify-center md:h-[400px]">
                  {/* Background shape for depth */}
                  <div className="absolute -left-4 -top-4 h-[95%] w-[95%] rounded-[2rem] bg-[#2495D3]/10" />

                  {/* Clean rounded image container */}
                  <div className="relative z-10 h-full w-full overflow-hidden rounded-[2rem] shadow-lg bg-gradient-to-br from-[#1C3A62] to-[#0F223D]">
                    <img
                      src="/Sustaunability%20Services.svg"
                      alt="Sustainability Services Overview"
                      className="h-full w-full object-contain object-center scale-[1.05]"
                    />
                  </div>
                </div>

                {/* =================================================
                    OVERVIEW CONTENT
                ================================================== */}
                <div className="relative z-10">
                  <div className="mb-5 inline-block rounded-full bg-[#2495D3]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#2495D3]">
                    Overview
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight text-[#1C3A62] md:text-4xl">
                    What are Sustainability Services?
                  </h2>

                  <p className="mt-5 leading-relaxed text-[#585858]">
                    Sustainability Services aim to reduce your environmental footprint while enhancing operational efficiency. Through comprehensive energy audits and HVAC assessments, we identify targeted optimizations that support your long-term sustainability goals.
                  </p>

                  <ul className="mt-7 space-y-4">
                    {[
                      'Energy Audits',
                      'HVAC Assessment',
                      'Energy Optimization',
                      'Green Building Operations',
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3"
                      >
                        <span className="h-1.5 w-1.5 flex-shrink-0 bg-[#2495D3]" />
                        <span className="font-medium text-[#383838]">
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

        <ComprehensiveBuildingSolutions />
        <InteractiveServiceCards />
      </div>
    </>
  );
}
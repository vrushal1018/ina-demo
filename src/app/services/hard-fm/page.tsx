'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';

export default function GeneralConsultation() {
  return (
    <>
      <SiteHeader />

      <div className="min-h-screen overflow-hidden bg-[#1C3A62] font-sans">

        {/* =========================================================
            HERO SECTION
        ========================================================== */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-6 pt-8 pb-16 lg:pt-10 lg:pb-24">

            {/* Breadcrumbs */}
            <div className="mb-10 flex items-center gap-1.5 text-sm text-white/70">
              <span>Home</span>
              <ChevronRight className="h-4 w-4" />
              <span>Services</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-[#C7F000]">
                Hard FM
              </span>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">

              {/* =====================================================
                  LEFT CONTENT
              ====================================================== */}
              <div className="relative z-20">
                <h1 className="max-w-2xl text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[64px]">
                  HARD
                  <br />
                  FM
                </h1>

                <p className="mt-7 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                  Comprehensive health assessment and medical advice from
                  experienced GPs.
                </p>

                {/* Buttons */}
                <div className="mt-9 flex flex-wrap gap-4">
                  <button
                    className="
                      rounded-full
                      bg-[#C7F000]
                      px-8
                      py-3.5
                      font-semibold
                      text-black
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-[#d5ff1a]
                      hover:shadow-lg
                    "
                  >
                    Book an Appointment
                  </button>

                  <button
                    className="
                      rounded-full
                      border
                      border-white
                      px-8
                      py-3.5
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-white
                      hover:text-[#1C3A62]
                    "
                  >
                    Contact Us
                  </button>
                </div>
              </div>

              {/* =====================================================
                  RIGHT IMAGE - STEPPED MASK DESIGN
              ====================================================== */}
              <div className="relative flex min-h-[430px] w-full items-center justify-center lg:min-h-[500px]">

                {/* Decorative vertical lines */}
                <div className="absolute left-[8%] top-[-100px] h-[650px] w-px bg-white/10" />
                <div className="absolute right-[8%] top-[-100px] h-[650px] w-px bg-white/10" />

                {/* SVG Mask Definition */}
                <svg width="0" height="0" className="absolute pointer-events-none">
                  <defs>
                    <mask id="hero-mask">
                      {/* Base rectangle for left and right shoulders (lowered) */}
                      <rect x="0" y="15%" width="100%" height="85%" rx="32" fill="white" />
                      {/* Center taller rectangle for the pop-out effect */}
                      <rect x="28%" y="0%" width="44%" height="100%" rx="32" fill="white" />
                    </mask>
                  </defs>
                </svg>

                {/* Image Container with Drop Shadow */}
                <div className="relative z-10 w-full h-[430px] sm:h-[470px] lg:h-[500px] drop-shadow-2xl">
                  <div
                    className="h-full w-full bg-white"
                    style={{
                      WebkitMaskImage: 'url(#hero-mask)',
                      maskImage: 'url(#hero-mask)',
                    }}
                  >
                    <img
                      src="/HardFm.jpg"
                      alt="Hard FM Team"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* =======================================================
              WHITE GRID TRANSITION
          ======================================================== */}
          <div
            className="
              relative
              mx-auto
              h-8
              max-w-[calc(100%-32px)]
              overflow-hidden
              rounded-t-[3rem]
              bg-white
              sm:h-10
            "
            style={{
              backgroundImage:
                'linear-gradient(to right, #eeeeee 1px, transparent 1px), linear-gradient(to bottom, #eeeeee 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
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
                    OVERVIEW IMAGE
                ================================================== */}
                <div className="relative flex h-[330px] items-end justify-center md:h-[400px]">
                  {/* Background shape */}
                  <div
                    className="
                      absolute
                      bottom-0
                      h-[82%]
                      w-full
                      rounded-[2rem]
                      bg-gray-50
                    "
                  />
                  {/* Image */}
                  <div
                    className="
                      relative
                      z-10
                      h-[105%]
                      w-[95%]
                      overflow-hidden
                      rounded-[2rem]
                    "
                    style={{
                      clipPath:
                        'polygon(7% 0%, 94% 0%, 100% 8%, 100% 87%, 93% 94%, 60% 94%, 54% 100%, 8% 100%, 0% 91%, 0% 12%)',
                    }}
                  >
                    <img
                      src="/HardFm.jpg"
                      alt="Hard FM"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* =================================================
                    OVERVIEW CONTENT
                ================================================== */}
                <div className="relative z-10">
                  <div className="mb-5 inline-block rounded-full bg-[#2495D3]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#2495D3]">
                    Overview
                  </div>

                  <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
                    What is Hard FM?
                  </h2>

                  <p className="mt-5 leading-relaxed text-[#585858]">
                    Hard Facilities Management (Hard FM) deals with the physical infrastructure of your building. Our experts assess your systems, review maintenance logs, and provide reliable engineering operations, preventive maintenance, and asset management — ensuring your facility operates safely and efficiently.
                  </p>

                  <ul className="mt-7 space-y-4">
                    {[
                      'Comprehensive engineering operations',
                      'Asset lifecycle management',
                      'Preventive & reactive maintenance',
                      '24/7 technical support and reporting',
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

      </div>
    </>
  );
}
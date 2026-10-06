'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import ComprehensiveBuildingSolutions from '@/components/ComprehensiveBuildingSolutions';

export default function AuditAndOfferingsPage() {
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
                Audit & Offerings
              </span>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">

              {/* =====================================================
                  LEFT CONTENT
              ====================================================== */}
              <div className="relative z-30">
                <h1 className="max-w-2xl text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[64px]">
                  AUDIT &
                  <br />
                  OFFERINGS
                </h1>

                <p className="mt-7 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                  Professional audits and tailored solutions to identify opportunities and improve facility performance.
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
                  RIGHT IMAGE - OVERLAPPING PANELS MATCHING DESIGN
              ====================================================== */}
              <div className="relative flex w-full items-center justify-center h-[400px] lg:h-[550px]">
                {/* Decorative vertical lines */}
                <div className="absolute left-[8%] top-[-100px] h-[650px] w-px bg-white/10" />
                <div className="absolute right-[8%] top-[-100px] h-[650px] w-px bg-white/10" />

                {/* Overlapping Panels Container */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">

                  {/* Panel 1: Left Doctor (Shorter, Behind) */}
                  <div className="absolute left-[5%] z-0 h-[70%] w-[42%] overflow-hidden rounded-3xl shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80"
                      alt="Male Doctor"
                      className="h-full w-full object-cover object-top bg-white"
                    />
                  </div>

                  {/* Panel 3: Right Doctor (Shorter, Behind) */}
                  <div className="absolute right-[5%] z-0 h-[70%] w-[42%] overflow-hidden rounded-3xl shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1582750433449-648ed127d0fc?auto=format&fit=crop&w=600&q=80"
                      alt="Doctor with tablet"
                      className="h-full w-full object-cover object-top bg-white"
                    />
                  </div>

                  {/* Panel 2: Center Doctor (Taller, Front) */}
                  <div className="relative z-10 h-[90%] w-[45%] overflow-hidden rounded-3xl shadow-2xl ring-4 ring-[#1C3A62]">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
                      alt="Main Doctor"
                      className="h-full w-full object-cover object-top bg-white"
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
                    What are Audit & Offerings?
                  </h2>

                  <p className="mt-5 leading-relaxed text-[#585858]">
                    Our audit services deliver professional, in-depth assessments of your facility's operations and performance. By providing tailored solutions and identifying key improvement opportunities, we help optimize your facility's overall effectiveness.
                  </p>

                  <ul className="mt-7 space-y-4">
                    {[
                      'Facility Audits',
                      'Performance Assessment',
                      'Bespoke Solutions',
                      'Risk Management',
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
      </div>
    </>
  );
}
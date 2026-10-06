'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import ComprehensiveBuildingSolutions from '@/components/ComprehensiveBuildingSolutions';
import InteractiveServiceCards from '@/components/InteractiveServiceCards';

export default function HardFMPage() {
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
                Hard FM
              </span>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">

              {/* =====================================================
                  LEFT CONTENT
              ====================================================== */}
              <div className="relative z-30">
                <h1 className="max-w-2xl text-5xl font-extrabold leading-[0.95] tracking-tight text-[#1C3A62] sm:text-6xl lg:text-[64px]">
                  HARD
                  <br />
                  FM
                </h1>

                <p className="mt-7 max-w-md text-base leading-relaxed text-[#585858] sm:text-lg">
                  Comprehensive engineering and facility management solutions focused on reliable and efficient operations.
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
                  <div className="relative z-10 h-[90%] w-[45%] overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white">
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
                  <div className="relative z-10 h-full w-full overflow-hidden rounded-[2rem] shadow-lg">
                    <img
                      src="/HardFm.jpg"
                      alt="Hard FM Overview"
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

                  <h2 className="text-3xl font-extrabold tracking-tight text-[#1C3A62] md:text-4xl">
                    What is Hard FM?
                  </h2>

                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#585858]">
                    <p>
                      At Ina Tech FM, we collaborate with our clients to extend our expertise in enhancing the life cycle of critical engineering assets, with an objective of minimizing asset outage causing no business operations disruptions. Our state-of-the-art technology innovation offers a 360-degree view of overall asset operating performance as well as monitor systematic regime of predictive & preventive maintenance. Our methods are built on a solid foundation of man, machine & technology, with the engineering asset indicating its overall health and performance status. Our moto of ‘self-delivery’ in Engineering O&M & Technical Services give us a cutting edge from our league competitors, giving an extra mile advantage.
                    </p>
                    <p>
                      We practise and implement safe workplace environment & employee well-being while delivering asset management services. Our digitalization of schedules & controlled documentation aim at optimizing asset performance & also explore opportunities for saving on operating spends. 
                    </p>
                    <p>
                      Our Hard FM services deliver leading edge services for premium hospitality corporate, multi-specialty healthcare, pharmaceutical manufacturing, IT & ITES, sprawling residentials across the regions. With nationwide coverage and a flexible work force, our operations bandwidth stretches across almost all parts of the country.
                    </p>
                  </div>
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
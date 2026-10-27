'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Droplet, Hammer, Zap, Flame, Shield, ArrowRight } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import AnimateIn from '@/components/AnimateIn';
import ComprehensiveBuildingSolutions from '@/components/ComprehensiveBuildingSolutions';
import InteractiveServiceCards from '@/components/InteractiveServiceCards';

const hardFmServices = [
  {
    title: "Plumbing & Sanitation",
    icon: Droplet,
    description: "Water is the most precious commodity on the earth. Our Water & Waste Water SME Services contribute in conserving the most important element of life. Our core team manages and maintains the versatile water requirements like STP, ETP, WTP’s, Pharma based RO Water and overall plumbing and sanitation requirement’s. We also provide the Advisory for the Water Conservation Programmes like Rain harvesting, Systems Modifications etc."
  },
  {
    title: "Civil & Building Fabric Maintenance",
    icon: Hammer,
    description: "Our Civil & Building Fabric Services basket offer a comprehensive solution for the civil as well as Building Fabric requirement, which is considered as one of the most complex maintainable things in the facility. Be it a hospitality, corporate or elite shopping arena, the guest experience starts with the first look-n-feel and décor of the property. Our expertise service solutions are customized to suit the client needs in terms of common area maintenance, Guest Room PPM Services. Our expert Ken Fixit team deliver end-to end services to the utmost satisfaction of the client."
  },
  {
    title: "Electro-Mechanical",
    icon: Zap,
    description: "For undisrupted services in any establishment, Electrical & Mechanical Installations are the most vital utilities and are at the nuclear, for creating a safe working environment. Our 24×7 operations coupled with robust Predictive Maintenance Regime for the Electrical HT & LT Infrastructure comprising of HT/LT Transformers, LT Distributions & Associated Panels, Diesel Generators, UPS & Invertors become the pulse of facility installations. Our innovation-based approach with a blend of implement technology enabled solutions."
  },
  {
    title: "Fire Alarm & Fighting Systems",
    icon: Flame,
    description: "Our Subject Matter Expertise FLS team offers the Comprehensive as well as non-comprehensive AMC’s, Repairs & Restoration with the industry-proven best practices to maintain the critical FAPA Systems in ready manner 24x7. Our fire experts not only ensure that the fire equipment is always in excellent condition, but also offer advisory for overall fire safe environment. Our Wireless Automation implementation ensures even the minutest detection of any and entire fire-fighting equipment are governed under strict regime of the preventive maintenance."
  }
];

import { useVideoFocus } from '@/hooks/useVideoFocus';

export default function HardFMPage() {
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
              <source src="/service2.mp4" type="video/mp4" />
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
              <span className="font-semibold text-[#2495D3]">Hard FM</span>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-12">
              {/* LEFT CONTENT */}
              <div className="relative z-30">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2495D3]/20 border border-[#2495D3]/40 text-[#45B1E8] text-xs font-semibold tracking-wide mb-4 shadow-sm backdrop-blur-sm">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Engineering operations & maintenance</span>
                </div>

                <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-normal text-white">
                  Hard <br />
                  FM
                </h1>
                <div className="w-20 h-1 bg-[#2495D3] mt-4 mb-6 rounded-full" />

                <p className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-200">
                  Comprehensive engineering and facility management solutions focused on reliable and efficient operations.
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
                Decorative architectural grid lines
                <div className="absolute left-[8%] top-[-40px] h-[580px] w-px bg-slate-200/80 hidden sm:block" />
                <div className="absolute right-[8%] top-[-40px] h-[580px] w-px bg-slate-200/80 hidden sm:block" />

                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  Panel 1: Left
                  <div className="absolute left-[2%] sm:left-[5%] z-0 h-[68%] w-[42%] overflow-hidden rounded-2xl shadow-xl border-2 border-white group">
                    <img
                      src="/hardfm2.jpg"
                      alt="Hard FM 2"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  Panel 3: Right
                  <div className="absolute right-[2%] sm:right-[5%] z-0 h-[68%] w-[42%] overflow-hidden rounded-2xl shadow-xl border-2 border-white group">
                    <img
                      src="/hardfm3.avif"
                      alt="Hard FM 3"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  Panel 2: Center (Front)
                  <div className="relative z-10 h-[88%] w-[48%] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white border border-slate-200/60 group">
                    <img
                      src="/hardfmmain.jpeg"
                      alt="Main Hard FM"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-[#1C3A62]/90 backdrop-blur-md text-white text-xs font-semibold flex items-center justify-between">
                      <span>24/7 Operations</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
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
                {/* Blueprint grid accent */}
                <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  {/* OVERVIEW IMAGE */}
                  <div className="lg:col-span-5 relative flex h-[280px] sm:h-[320px] lg:h-[360px] items-center justify-center">
                    <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl shadow-xl bg-white border border-slate-200/80 p-4 flex items-center justify-center">
                      <img
                        src="/Hard%20FM.svg"
                        alt="Hard FM Overview"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain object-center"
                      />
                    </div>
                  </div>

                  {/* OVERVIEW CONTENT */}
                  <div className="lg:col-span-7">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#2495D3]/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#2495D3]">
                      Overview
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-normal tracking-normal text-[#1C3A62]">
                      What is hard FM?
                    </h2>
                    <div className="w-16 h-1 bg-[#2495D3] mt-3 mb-6 rounded-full" />

                    <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#585858]">
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
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="500px">
          <ComprehensiveBuildingSolutions />
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="500px">
          <InteractiveServiceCards services={hardFmServices} />
        </AnimateIn>
      </div>
    </>
  );
}
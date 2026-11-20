'use client';

import React from 'react';
import { Leaf, Lightbulb, Wind, Sun } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import AnimateIn from '@/components/AnimateIn';
import ComprehensiveBuildingSolutions from '@/components/ComprehensiveBuildingSolutions';
import InteractiveServiceCards from '@/components/InteractiveServiceCards';
import { useVideoFocus } from '@/hooks/useVideoFocus';

const sustainabilityServices = [
  {
    title: "Energy Audits & Assessments",
    icon: Lightbulb,
    description: "Detailed diagnostic surveys of electrical distribution, lighting, and heavy utility loads to uncover energy wastage, optimize tariffs, and lower utility overheads.",
    shortDescription: "Targeted energy studies and power quality analysis to reduce utility overheads.",
  },
  {
    title: "HVAC Thermal Optimization",
    icon: Wind,
    description: "Comprehensive air balancing, chiller plant audits, and thermodynamic adjustments that maximize cooling efficiency and lower power consumption.",
    shortDescription: "Chiller and AHU diagnostic tuning for peak cooling and reduced energy loads.",
  },
  {
    title: "Green Building Operations",
    icon: Leaf,
    description: "Aligning day-to-day facility management with LEED and IGBC standards, prioritizing eco-certified chemicals, waste diversion, and water conservation.",
    shortDescription: "Operations tailored to international green building benchmarks and eco-standards.",
  },
  {
    title: "Renewable Energy Integration",
    icon: Sun,
    description: "Turnkey advisory and operational upkeep for on-site rooftop solar arrays, inverter stations, and carbon footprint reduction programs.",
    shortDescription: "Solar asset maintenance and customized roadmaps for carbon footprint reduction.",
  },
];

export default function SustainabilityServicesPage() {
  const videoRef = useVideoFocus();
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  return (
    <>
      <SiteHeader />

      <div className="min-h-screen overflow-hidden bg-gradient-to-b from-ina-tint-15 to-ina-tint-8 font-sans">
        {/* =========================================================
            HERO SECTION WITH BACKGROUND VIDEO
        ========================================================== */}
        <section className="relative min-h-[80vh] min-h-[80dvh] sm:min-h-[520px] lg:min-h-[580px] flex items-center pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 overflow-hidden bg-ina-night">
          {/* Background Video with continuous loop and responsive preview */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Responsive Preview Poster (Tailored for mobile vs desktop with zero awkward zoom) */}
            <picture
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                isVideoPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <source media="(max-width: 768px)" srcSet="/sustainability-mobile-preview.webp" />
              <source media="(min-width: 769px)" srcSet="/sustainabilitymain.jpg" />
              <img src="/sustainabilitymain.jpg" alt="" className="w-full h-full object-cover object-center" />
            </picture>
            <video
              ref={videoRef}
              src="/sustainability%20services.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              onPlaying={() => setIsVideoPlaying(true)}
              className="absolute inset-0 w-full h-full object-cover object-center scale-100 sm:scale-105"
            >
              <source src="/sustainability%20services.mp4" type="video/mp4" />
            </video>
            {/* Cinematic Gradient Overlay: darker on left for crisp readability, subtly transparent on right to showcase video */}
            <div className="absolute inset-0 bg-gradient-to-r from-ina-night/95 via-ina-night/80 to-ina-night/45" />
            <div className="absolute inset-0 bg-gradient-to-b from-ina-night/70 via-transparent to-ina-night/90" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-12">
              {/* LEFT CONTENT */}
              <div className="relative z-30">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ina-blue/20 border border-ina-blue/40 text-ina-sky text-xs font-semibold tracking-wide mb-4 shadow-sm backdrop-blur-sm">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Energy Management Services & Optimization</span>
                </div>

                <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-normal text-white">
                  Energy Management <br />
                  <span className="text-ina-blue">&amp; Sustainability</span> Services
                </h1>
                <div className="w-20 h-1 bg-ina-blue mt-4 mb-6 rounded-full" />

                <p className="max-w-xl text-base sm:text-lg leading-relaxed text-ina-line">
                  Data-driven energy management services and sustainable facility engineering solutions that optimize consumption, eliminate waste, and advance long-term ESG performance.
                </p>
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
              <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md p-6 sm:p-8 lg:p-10 border border-ina-line shadow-xl">
                <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  {/* OVERVIEW IMAGE */}
                  <div className="lg:col-span-5 relative flex h-[280px] sm:h-[320px] lg:h-[360px] items-center justify-center">
                    <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-ina-navy to-ina-night p-6 flex items-center justify-center">
                      <img
                        src="/Sustainability%20Services.png"
                        alt="Sustainability Services Overview"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain object-center scale-[1.05]"
                      />
                    </div>
                  </div>

                  {/* OVERVIEW CONTENT */}
                  <div className="lg:col-span-7">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-ina-blue/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-ina-blue">
                      Overview
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-normal tracking-normal text-ina-navy">
                      What Are Sustainability Services?
                    </h2>
                    <div className="w-16 h-1 bg-ina-blue mt-3 mb-6 rounded-full" />

                    <p className="leading-relaxed text-ina-grey text-base sm:text-lg">
                      Sustainability Services aim to reduce your environmental footprint while enhancing operational efficiency. Through comprehensive energy audits and HVAC assessments, we identify targeted optimizations that support your long-term sustainability goals.
                    </p>

                    <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Energy audits',
                        'HVAC assessment',
                        'Energy optimization',
                        'Green building operations',
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-ina-line/80 shadow-sm"
                        >
                          <span className="h-2 w-2 rounded-full flex-shrink-0 bg-ina-blue" />
                          <span className="font-semibold text-sm text-ina-navy">
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
          <InteractiveServiceCards services={sustainabilityServices} />
        </AnimateIn>
      </div>
    </>
  );
}
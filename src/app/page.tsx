"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import AnimateIn from "@/components/AnimateIn";

import FeatureGrid from "@/components/home/FeatureGrid";
import ServicesSection from "@/components/home/ServicesSection";
import GarageDoorTypes from "@/components/home/GarageDoorTypes";
import BrandBanner from "@/components/home/BrandBanner";
import RepairsAndServicing from "@/components/home/RepairsAndServicing";
import GarageDoorSteps from "@/components/home/GarageDoorSteps";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Feature bullets for Tech fm
  const features = [
    "Hard FM and Technical services",
    "Engineering services",
    "Sustainability services",
    "Audits and assessments",
  ];

  return (
    <div className="relative min-h-screen bg-white font-sans text-[#383838] selection:bg-[#2495D3] selection:text-white">
      {/* Header */}

      <SiteHeader />

      {/* Hero Section - Loads immediately (above the fold) */}
      <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0A1629]">
        {/* Background Video with continuous loop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105"
          >
            <source src="/ITFheromain (3).mp4" type="video/mp4" />
            <source src="/ITFheromain%20(3).mp4" type="video/mp4" />
          </video>
          {/* Cinematic Gradient Overlay: darker on left for crisp readability, subtly transparent on right to showcase video */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1629]/95 via-[#0A1629]/80 to-[#0A1629]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1629]/70 via-transparent to-[#0A1629]/90" />
        </div>

        {/* Top-Left: Logo & Tagline */}
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 pt-6 sm:pt-8 lg:pt-10 flex items-start">
          {/* Brand Logo & Lockup in Hero at Left */}
          <div className="flex flex-col items-start">
            <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95" title="INA TechFM">
              <img
                src="/Ina TechFM Logo white.png"
                alt="INA TechFM Logo"
                className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain drop-shadow-xl"
              />
            </Link>
            {/* Main Tagline under logo */}
            <h1 className="mt-2 sm:mt-2.5 pl-3.5 sm:pl-4 md:pl-5 lg:pl-6 text-[11px] sm:text-xs md:text-[13px] lg:text-[14px] font-normal tracking-normal leading-tight drop-shadow-md">
              <span className="block text-white">Empowering people</span>
              <span className="block text-[#2495D3] mt-0.5 ml-2.5 sm:ml-3 md:ml-3.5">Enriching assets</span>
            </h1>
          </div>
        </div>

        {/* Feature Points in Down Corner (Bottom-Right) */}
        <div className="absolute bottom-36 sm:bottom-36 md:bottom-10 lg:bottom-12 right-5 sm:right-8 lg:right-12 z-20 flex flex-col items-start space-y-2.5 sm:space-y-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-2.5 drop-shadow-md"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2495D3] flex-shrink-0" />
              <span className="text-xs sm:text-sm text-slate-200 font-medium tracking-wide">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Verified Metrics Strip */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 pt-6 mt-auto">
          <div className="w-full max-w-3xl mx-auto border-t border-white/10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left sm:text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-normal font-heading text-white tracking-normal">78 Mn+</div>
              <div className="text-xs text-slate-400 mt-1">Sq ft area managed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-normal font-heading text-white tracking-normal">290+</div>
              <div className="text-xs text-slate-400 mt-1">Clients</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-normal font-heading text-white tracking-normal">3,000+</div>
              <div className="text-xs text-slate-400 mt-1">Employees</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-normal font-heading text-white tracking-normal">8</div>
              <div className="text-xs text-slate-400 mt-1">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Below Hero - Loads on scroll */}
      <AnimateIn delay={0.1} minHeight="380px" id="feature-grid">
        <FeatureGrid />
      </AnimateIn>

      {/* Services Section - Loads on scroll */}
      <AnimateIn delay={0.1} minHeight="520px" id="services">
        <ServicesSection />
      </AnimateIn>

      {/* Sectors We Operate Grid - Loads on scroll */}
      <AnimateIn delay={0.1} minHeight="450px" id="sectors">
        <GarageDoorTypes />
      </AnimateIn>

      {/* Brand Banner Section - Loads on scroll */}
      <AnimateIn delay={0.1} minHeight="140px" id="brands">
        <BrandBanner />
      </AnimateIn>

      {/* Repairs & Servicing Section - Loads on scroll */}
      <AnimateIn delay={0.1} minHeight="500px" id="repairs">
        <RepairsAndServicing />
      </AnimateIn>

      {/* Steps / How it works Section - Loads on scroll */}
      <AnimateIn delay={0.1} minHeight="450px" id="how-it-works">
        <GarageDoorSteps />
      </AnimateIn>
    </div>
  );
}
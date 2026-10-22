"use client";

import React, { useState } from "react";
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
      <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-[#0A1629]">
        {/* Background Video with continuous loop in full high resolution */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000"
          >
            <source src="/ITFheromain%20(3).mp4" type="video/mp4" />
            <source src="/ITFheromain (3).mp4" type="video/mp4" />
          </video>
          {/* Architectural Gradient & Blueprint Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1629]/85 via-[#0A1629]/65 to-[#0A1629]/90" />
          <div className="absolute inset-0 blueprint-grid opacity-15" />
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14">
          <AnimateIn delay={0.1} direction="up" lazy={false}>
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-6">

              {/* Top Badge */}
              <div className="inline-flex items-center justify-center space-x-2.5 bg-[#2495D3]/15 border border-[#2495D3]/35 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white shadow-lg backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2495D3] animate-pulse" />
                <span>Expertise repair and maintenance services</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-normal leading-[1.15] max-w-4xl">
                <span className="block">Empowering people.</span>
                <span className="block text-[#2495D3] mt-1 sm:mt-2">
                  Enriching assets
                </span>
              </h1>

              {/* Feature Bullet Points */}
              <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 pt-1 max-w-3xl">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2495D3] flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-200 font-medium tracking-wide">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full sm:w-auto">
                {/* Primary CTA */}
                <a
                  href="#repairs"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#2495D3] hover:bg-[#488FCD] text-white font-semibold text-xs sm:text-sm tracking-wide text-center transition-all duration-300 shadow-xl shadow-[#2495D3]/30 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Let&apos;s connect
                </a>

                {/* Secondary CTA */}
                <a
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide text-center border border-white/25 backdrop-blur-md shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Get a quote
                </a>
              </div>

              {/* Verified Metrics Strip */}
              <div className="pt-6 sm:pt-8 w-full max-w-3xl border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left sm:text-center">
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
          </AnimateIn>
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
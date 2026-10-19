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
            <source src="/ITFheromain (3).mp4" type="video/mp4" />
          </video>
          {/* Architectural Gradient & Blueprint Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1629]/85 via-[#0A1629]/65 to-[#0A1629]/90" />
          <div className="absolute inset-0 blueprint-grid opacity-15" />
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <AnimateIn delay={0.1} direction="up" lazy={false}>
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
              
              {/* Top Badge */}
              <div className="inline-flex items-center justify-center space-x-2.5 bg-[#2495D3]/15 border border-[#2495D3]/35 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white shadow-lg backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2495D3] animate-pulse" />
                <span>Expertise Repair and Maintenance Services</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.1] max-w-3xl">
                Empowering People.{" "}
                <span className="text-[#2495D3] block sm:inline">
                  Enriching Assets
                </span>
              </h1>

              {/* Feature Bullet Points */}
              <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 pt-2 max-w-3xl">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition-all duration-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2495D3] flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-200 font-medium tracking-wide">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
                {/* Primary CTA */}
                <a
                  href="#repairs"
                  className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#2495D3] hover:bg-[#488FCD] text-white font-semibold text-sm tracking-wide text-center transition-all duration-300 shadow-xl shadow-[#2495D3]/30 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Lets connect
                </a>

                {/* Secondary CTA */}
                <a
                  href="/contact"
                  className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm tracking-wide text-center border border-white/25 backdrop-blur-md shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Get a Quote
                </a>
              </div>

              {/* Verified Metrics Strip */}
              <div className="pt-10 w-full max-w-3xl border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left sm:text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">78 Mn+</div>
                  <div className="text-xs text-slate-400 mt-1">Sq Ft Area Managed</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">290+</div>
                  <div className="text-xs text-slate-400 mt-1">Clients</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">3,000+</div>
                  <div className="text-xs text-slate-400 mt-1">Employees</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">8</div>
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
      <AnimateIn delay={0.1} minHeight="180px" id="brands">
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
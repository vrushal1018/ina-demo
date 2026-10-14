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
  // const features = [
  //   "Hard FM and Technical services",
  //   "Engineering services",
  //   "Sustainability services",
  //   "Audits and assessments",
  // ];

  return (
    <div className="relative min-h-screen bg-white font-sans text-[#383838] selection:bg-[#2495D3] selection:text-white">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section - Loads immediately (above the fold) */}
      <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        {/* Background Video with continuous loop and crisp overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/demovideo.mp4" type="video/mp4" />
            <source src="/demovideo.webm" type="video/webm" />
            <source src="/demovideo" type="video/mp4" />
            <source src="/InaTechFM-Website-Banner-5s.mp4" type="video/mp4" />
          </video>
          {/* Soft frosted gradient overlay for vibrant video visibility & crisp text contrast */}
          <div className="absolute inset-0 bg-white/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white" />
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <AnimateIn delay={0.2} direction="up" lazy={false}>
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center text-[#1C3A62] space-y-8">
              {/* Top Badge */}
              {/* <div className="inline-flex items-center justify-center space-x-2 bg-[#2495D3]/10 border border-[#2495D3]/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-[#2495D3] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#2495D3] animate-pulse" />
                <span>Expertise Repair and Maintenance Services</span>
              </div> */}

              {/* Main Headline */}
              {/* <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1C3A62] tracking-tight leading-[1.15]">
                Empowering People.{" "}
                <span className="text-[#2495D3] block sm:inline">
                  Enriching Assets
                </span>
              </h1> */}

              {/* Feature Bullet Points */}
              {/* <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 pt-2">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-[#2495D3] flex-shrink-0" />
                    <span className="text-sm sm:text-base text-[#585858] font-semibold">
                      {feature}
                    </span>
                  </div>
                ))}
              </div> */}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 w-full">
                {/* Primary CTA */}
                {/* <a
                  href="#repairs"
                  className="px-8 py-4 rounded-md bg-[#2495D3] hover:bg-[#488FCD] text-white font-medium text-center transition-all duration-300 shadow-xl hover:shadow-[#2495D3]/40 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Lets connect
                </a> */}

                {/* Secondary CTA */}
                {/* <a
                  href="/contact"
                  className="px-8 py-4 rounded-md bg-white hover:bg-gray-50 text-[#1C3A62] font-semibold text-center border border-gray-200 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Get a Quote
                </a> */}
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
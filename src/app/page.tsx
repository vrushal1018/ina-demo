"use client";

import React, { useState } from "react";
import {
  Phone,
  CheckCircle2,
  Menu,
  X,
  Star,
  ShieldCheck,
  Wrench,
  Clock,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import FeatureGrid from "@/components/home/FeatureGrid";
import GarageDoorTypes from "@/components/home/GarageDoorTypes";
import RepairsAndServicing from "@/components/home/RepairsAndServicing";
import GarageDoorSteps from "@/components/home/GarageDoorSteps";
import BrandBanner from "@/components/home/BrandBanner";
import ServicesSection from "@/components/home/ServicesSection";
import AnimateIn from "@/components/AnimateIn";
import SiteHeader from "@/components/SiteHeader";

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
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        {/* Background Image Container with Overlays */}
        <div className="absolute inset-0 z-0">
          <video
            src="/InaTechFM-Website-Banner-5s.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-1000"
          />
          {/* Gradient Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C3A62]/90 via-[#1C3A62]/75 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <AnimateIn delay={0.2} direction="up">
            <div className="max-w-2xl text-white space-y-8">
              {/* Top Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#2495D3] animate-pulse" />
                <span>Expertise Repair and Maintenance Services</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
                Empowering People.{" "}
                <span className="text-[#2495D3] block sm:inline">
                  Enriching Assets
                </span>
              </h1>

              {/* Feature Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2495D3] flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-100 font-semibold">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                {/* Primary CTA - Book a Repair */}
                <a
                  href="#book"
                  className="px-8 py-4 rounded-md bg-[#2495D3] hover:bg-[#488FCD] text-white font-bold text-center transition-all duration-300 shadow-xl hover:shadow-[#2495D3]/40 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Lets connect
                </a>

                {/* Secondary CTA - Get a Quote */}
                <a
                  href="#quote"
                  className="px-8 py-4 rounded-md bg-[#383838]/60 hover:bg-[#383838]/90 text-white font-semibold text-center border border-white/30 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Get a Quote
                </a>
              </div>


            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Feature Grid Below Hero */}
      <AnimateIn delay={0.1}>
        <FeatureGrid />
      </AnimateIn>


      {/* Services Section */}
      <AnimateIn delay={0.1}>
        <ServicesSection />
      </AnimateIn>

      {/* Sectors We Operate Grid (formerly Garage Door Types) */}
      <AnimateIn delay={0.1}>
        <GarageDoorTypes />
      </AnimateIn>

      {/* Brand Banner Section */}
      <AnimateIn delay={0.1}>
        <BrandBanner />
      </AnimateIn>

      {/* Repairs & Servicing Section */}
      <AnimateIn delay={0.1}>
        <RepairsAndServicing />
      </AnimateIn>

      {/* Steps / How it works Section */}
      <AnimateIn delay={0.1}>
        <GarageDoorSteps />
      </AnimateIn>
    </div>
  );
}
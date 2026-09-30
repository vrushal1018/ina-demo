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

import FeatureGrid from "@/components/FeatureGrid";
import GarageDoorTypes from "@/components/GarageDoorTypes";
import RepairsAndServicing from "@/components/RepairsAndServicing";
import GarageDoorSteps from "@/components/GarageDoorSteps";
import BrandBanner from "@/components/BrandBanner";
import ServicesSection from "@/components/ServicesSection";
import AnimateIn from "@/components/AnimateIn";

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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* INA Brand Logo */}
          <div className="flex items-center space-x-2.5 cursor-pointer group">
            <img src="/Ina Logo-1.jpg.png" alt="INA Logo" className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>

          {/* Floating Rounded Capsule Desktop Navigation Links (White Background) */}
          <nav className="hidden lg:flex items-center bg-white text-[#383838] px-6 py-2.5 rounded-full border border-gray-200 shadow-md space-x-8 text-sm font-medium">
            <a
              href="#new-doors"
              className="hover:text-[#2495D3] transition-colors"
            >
              About us
            </a>
            <a
              href="#repairs"
              className="hover:text-[#2495D3] transition-colors"
            >
              Services
            </a>
            <a
              href="#service-area"
              className="hover:text-[#2495D3] transition-colors"
            >
              Clients Corner
            </a>
            <a
              href="#about"
              className="hover:text-[#2495D3] transition-colors"
            >
              Careers
            </a>
            <a
              href="#gallery"
              className="hover:text-[#2495D3] transition-colors"
            >
              Blogs
            </a>
            <a
              href="#gallery"
              className="hover:text-[#2495D3] transition-colors"
            >
              Contact Us
            </a>
          </nav>

          {/* Desktop Right Phone Widget & Contact Button */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Call Maverick Widget */}
            <div className="flex items-center space-x-3 text-right">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#2495D3] bg-[#1C3A62] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                <Phone className="w-4 h-4 text-[#2495D3]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] text-[#878787] font-semibold tracking-wide uppercase">
                  Call Ina Tech Fm
                </span>
                <a
                  href="+91-9326906715"
                  className="text-sm font-bold text-[#1C3A62] hover:text-[#2495D3] transition-colors"
                >
                  +91-9326906715
                </a>
              </div>
            </div>

            {/* Contact Us Button */}
            <a
              href="#contact"
              className="px-6 py-3 rounded-md bg-[#1C3A62] text-white text-sm font-semibold hover:bg-[#2495D3] transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Navigation Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#383838] hover:text-[#1C3A62] hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-6 pt-3 pb-6 space-y-3 shadow-xl">
            <a
              href="#new-doors"
              className="block py-2 text-base font-semibold text-[#383838] hover:text-[#2495D3]"
            >
              New Garage Doors
            </a>
            <a
              href="#repairs"
              className="block py-2 text-base font-semibold text-[#383838] hover:text-[#2495D3]"
            >
              Repairs
            </a>
            <a
              href="#service-area"
              className="block py-2 text-base font-semibold text-[#383838] hover:text-[#2495D3]"
            >
              Service Area
            </a>
            <a
              href="#about"
              className="block py-2 text-base font-semibold text-[#383838] hover:text-[#2495D3]"
            >
              About Us
            </a>
            <a
              href="#gallery"
              className="block py-2 text-base font-semibold text-[#383838] hover:text-[#2495D3]"
            >
              Gallery
            </a>
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
              <a
                href="tel:+1300111222"
                className="flex items-center space-x-2 text-[#1C3A62] font-bold"
              >
                <Phone className="w-4 h-4 text-[#2495D3]" />
                <span>Call Maverick first: +1300 111 222</span>
              </a>
              <a
                href="#contact"
                className="w-full text-center py-3 rounded-md bg-[#1C3A62] text-white font-semibold"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        {/* Background Image Container with Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="Modern Melbourne residence with automated garage door"
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
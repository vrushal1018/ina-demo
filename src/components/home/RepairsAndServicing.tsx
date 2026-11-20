"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  PhoneCall,
  Activity,
  Zap,
  Settings,
  Gauge,
  TrendingUp,
  Leaf,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useVideoFocus } from "@/hooks/useVideoFocus";

export default function RepairsAndServicing() {
  const mobileVideoRef = useVideoFocus();
  const desktopVideoRef = useVideoFocus();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const expertiseList = [
    {
      num: "01",
      title: "Preventive and predictive maintenance",
      description: "Implementing proactive, condition-based monitoring and scheduled servicing to prevent equipment failures and minimize downtime.",
      icon: Activity,
    },
    {
      num: "02",
      title: "Electrical and HVAC maintenance",
      description: "Ensuring reliable performance of transformers, chillers, AHUs and power distribution systems through precision maintenance.",
      icon: Zap,
    },
    {
      num: "03",
      title: "Engineering asset management",
      description: "Tracking asset lifecycles and optimizing the performance of critical building infrastructure.",
      icon: Settings,
    },
    {
      num: "04",
      title: "MEP equipment testing and commissioning",
      description: "Conducting comprehensive mechanical, electrical and plumbing inspections to ensure equipment reliability and operational readiness.",
      icon: Gauge,
    },
    {
      num: "05",
      title: "Asset performance and lifecycle enhancement",
      description: " Extending asset life and improving performance through targeted maintenance and refurbishment programs.",
      icon: TrendingUp,
    },
    {
      num: "06",
      title: "Energy audits and sustainability solutions",
      description: "Driving energy efficiency through data-led audits, efficiency upgrades and carbon reduction initiatives.",
      icon: Leaf,
    },
    {
      num: "07",
      title: "Safety and compliance audits",
      description: "Ensuring adherence to statutory safety standards, fire safety regulations and risk management requirements.",
      icon: ShieldCheck,
    },
    {
      num: "08",
      title: "Repair, refurbishment and technical support",
      description: " Providing on-ground engineering support, equipment repairs and turnkey restoration of critical systems.",
      icon: Wrench,
    },
  ];

  return (
    <section className="relative py-10 sm:py-14 lg:py-16 bg-ina-night text-white overflow-hidden">
      {/* Background Video with continuous loop and responsive preview */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Responsive Preview Poster (Tailored for mobile vs desktop with zero awkward zoom) */}
        <picture
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${isVideoPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        >
          <source media="(max-width: 768px)" srcSet="/repairs-mobile-preview.webp" />
          <source media="(min-width: 769px)" srcSet="/commercial.jpg" />
          <img src="/commercial.jpg" alt="" className="w-full h-full object-cover object-center" />
        </picture>
        {/* Mobile Phone Video - ALWAYS technician_service_vertical.mp4 */}
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          src="/technician_service_vertical.mp4"
          onPlaying={() => setIsVideoPlaying(true)}
          className="md:hidden absolute inset-0 w-full h-full object-cover object-center scale-100"
        />

        {/* Desktop/Tablet Video - ALWAYS technician-service-optimized.mp4 */}
        <video
          ref={desktopVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          src="/technician-service-optimized.mp4"
          onPlaying={() => setIsVideoPlaying(true)}
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center scale-100"
        />
        {/* Architectural Gradient & Blueprint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ina-night/85 via-ina-night/65 to-ina-night/90" />
        <div className="absolute inset-0 blueprint-grid opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 sm:mb-10">
          {/* Left Title & Badge */}
          <div className="max-w-2xl space-y-3">
            {/* <div className="inline-flex items-center gap-2 rounded-full bg-ina-blue/20 border border-ina-blue/40 px-3.5 py-1 text-xs font-semibold tracking-wide text-ina-sky backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-ina-blue animate-pulse" />
              <span>Engineering & maintenance</span>
            </div> */}

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-normal leading-[1.15]">
              Expert Engineering & Facility Management Services
            </h2>
          </div>

          {/* Right Lead Paragraph & Action Buttons */}
          <div className="max-w-xl space-y-4">
            <p className="text-sm sm:text-base text-ina-mist leading-relaxed font-normal">
              From critical engineering assets to day-to-day facility
              operations, every environment requires reliable, efficient,
              and proactive management. At Ina TechFM, we combine engineering
              expertise, technology, and responsive service to enhance asset
              performance, minimize downtime, improve safety, and deliver
              sustainable operational outcomes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="/contact"
                className="px-6 py-2.5 rounded-full bg-white hover:bg-ina-tint-8 text-ina-navy font-semibold text-xs sm:text-sm tracking-wide text-center transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
              >
                Talk to our experts
              </a>

              <a
                href="#services"
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-semibold text-xs sm:text-sm tracking-wide text-center transition-all duration-300 flex items-center justify-center space-x-2 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
              >
                <PhoneCall className="w-3.5 h-3.5 text-ina-sky" />
                <span>Explore our services</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section Divider / Capabilities Subheading */}
        <div className="flex items-center justify-between mb-5 pb-3 border-t border-white/10 pt-5">
          <p className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ina-blue" />
            <span>Our Engineering And Facility Management Expertise Includes:</span>
          </p>

          <span className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-ina-mist">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active operations across India</span>
          </span>
        </div>

        {/* 8-Card Capabilities Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {expertiseList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-transparent hover:bg-white/[0.08] border border-white/15 hover:border-ina-blue/60 transition-all duration-300 hover:shadow-2xl hover:shadow-ina-blue/15 hover:-translate-y-1.5 overflow-hidden"
              >
                <div>
                  {/* Top Row: Icon Container and Index Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-ina-blue/15 border border-ina-blue/30 text-ina-sky flex items-center justify-center group-hover:bg-ina-blue group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="font-mono text-xs font-bold text-ina-mist group-hover:text-ina-sky transition-colors">
                      {item.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-normal text-white group-hover:text-ina-sky transition-colors duration-300 leading-snug mb-2.5">
                    {item.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-xs sm:text-sm text-ina-mist font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-ina-mist group-hover:text-ina-line transition-colors tracking-wide">
                    Verified protocol
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-ina-sky opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Assurance Bar */}
        <div className="mt-10 sm:mt-16 p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-transparent border border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-normal font-heading text-white tracking-normal">24x7</div>
            <div className="text-xs text-ina-mist mt-1">Live engineering support</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-normal font-heading text-white tracking-normal">100% SLA</div>
            <div className="text-xs text-ina-mist mt-1">Uptime commitment</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-normal font-heading text-white tracking-normal">Zero-Harm</div>
            <div className="text-xs text-ina-mist mt-1">Safety-first protocols</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-normal font-heading text-white tracking-normal">Pan-India</div>
            <div className="text-xs text-ina-mist mt-1">Technical deployment</div>
          </div>
        </div>

      </div>
    </section>
  );
}

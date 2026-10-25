"use client";

import React, { useEffect, useRef } from "react";
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

export default function RepairsAndServicing() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    let startTime = Date.now();

    const onLoadedMetadata = () => {
      startTime = Date.now() - (video.currentTime || 0) * 1000;
      video.play().catch(() => {});
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);

    const ensurePlay = () => {
      if (!video) return;

      if (video.paused) {
        video.play().catch(() => {});
      }

      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        const elapsed = (Date.now() - startTime) / 1000;
        const targetTime = elapsed % video.duration;
        if (Math.abs(video.currentTime - targetTime) > 1.2) {
          try {
            video.currentTime = targetTime;
          } catch (e) {}
        }
      }
    };

    ensurePlay();

    const handlePauseOrSuspend = () => {
      ensurePlay();
    };

    const handleEnded = () => {
      video.currentTime = 0;
      ensurePlay();
    };

    video.addEventListener("pause", handlePauseOrSuspend);
    video.addEventListener("suspend", handlePauseOrSuspend);
    video.addEventListener("ended", handleEnded);
    document.addEventListener("visibilitychange", ensurePlay);
    window.addEventListener("focus", ensurePlay);
    window.addEventListener("scroll", ensurePlay, { passive: true });

    const interval = setInterval(ensurePlay, 500);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("pause", handlePauseOrSuspend);
      video.removeEventListener("suspend", handlePauseOrSuspend);
      video.removeEventListener("ended", handleEnded);
      document.removeEventListener("visibilitychange", ensurePlay);
      window.removeEventListener("focus", ensurePlay);
      window.removeEventListener("scroll", ensurePlay);
      clearInterval(interval);
    };
  }, []);
  const expertiseList = [
    {
      num: "01",
      title: "Preventive and predictive maintenance",
      description: "Proactive condition-based monitoring and scheduled servicing to eliminate unexpected equipment downtime.",
      icon: Activity,
    },
    {
      num: "02",
      title: "Electrical and HVAC maintenance",
      description: "Precision upkeep of transformers, chillers, AHUs, and high-load power distribution systems.",
      icon: Zap,
    },
    {
      num: "03",
      title: "Engineering asset management",
      description: "Systematic lifecycle tracking and performance optimization of critical building infrastructure.",
      icon: Settings,
    },
    {
      num: "04",
      title: "MEP equipment testing and commissioning",
      description: "Comprehensive mechanical, electrical, and plumbing validation to guarantee peak reliability.",
      icon: Gauge,
    },
    {
      num: "05",
      title: "Asset performance and lifecycle enhancement",
      description: "Targeted maintenance and refurbishment programs that extend operating life and maximize asset ROI.",
      icon: TrendingUp,
    },
    {
      num: "06",
      title: "Energy audits and sustainability solutions",
      description: "Data-driven energy conservation studies, efficiency retrofits, and carbon reduction measures.",
      icon: Leaf,
    },
    {
      num: "07",
      title: "Safety and compliance audits",
      description: "Strict adherence to statutory safety norms, fire life safety guidelines, and risk assessments.",
      icon: ShieldCheck,
    },
    {
      num: "08",
      title: "Repair, refurbishment and technical support",
      description: "Rapid on-ground engineering support and turnkey restoration across mission-critical systems.",
      icon: Wrench,
    },
  ];

  return (
    <section className="relative py-10 sm:py-14 lg:py-16 bg-[#0A1629] text-white overflow-hidden">
      {/* Background Video with continuous loop in full high resolution */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-65"
        >
          <source
            src="/technician-service-optimized.mp4"
            type="video/mp4"
          />
          <source
            src="/Technician_using_tablet_in_service.mp4"
            type="video/mp4"
          />
        </video>
        {/* Architectural Gradient & Blueprint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1629]/85 via-[#0A1629]/65 to-[#0A1629]/90" />
        <div className="absolute inset-0 blueprint-grid opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          {/* Left Title & Badge */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#2495D3]/20 border border-[#2495D3]/40 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#2495D3] backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#2495D3] animate-pulse" />
              <span>Engineering & maintenance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-normal leading-[1.15]">
              Expert engineering & facility management services
            </h2>
          </div>

          {/* Right Lead Paragraph & Action Buttons */}
          <div className="max-w-xl space-y-4">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              From critical engineering assets to day-to-day facility
              operations, every environment requires reliable, efficient,
              and proactive management. At Ina Tech FM, we combine engineering
              expertise, technology, and responsive service to enhance asset
              performance, minimize downtime, improve safety, and deliver
              sustainable operational outcomes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="/contact"
                className="px-6 py-2.5 rounded-full bg-[#2495D3] hover:bg-[#488FCD] text-white font-semibold text-xs sm:text-sm tracking-wide text-center transition-all duration-300 shadow-xl shadow-[#2495D3]/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                Talk to our experts
              </a>

              <a
                href="#services"
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-semibold text-xs sm:text-sm tracking-wide text-center transition-all duration-300 flex items-center justify-center space-x-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#2495D3]" />
                <span>Explore our services</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section Divider / Capabilities Subheading */}
        <div className="flex items-center justify-between mb-5 pb-3 border-t border-white/10 pt-5">
          <p className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2495D3]" />
            <span>Our engineering and facility management expertise includes:</span>
          </p>

          <span className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
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
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-transparent hover:bg-white/[0.08] border border-white/15 hover:border-[#2495D3]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#2495D3]/15 hover:-translate-y-1.5 overflow-hidden"
              >
                <div>
                  {/* Top Row: Icon Container and Index Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#2495D3]/15 border border-[#2495D3]/30 text-[#2495D3] flex items-center justify-center group-hover:bg-[#2495D3] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-[#2495D3] transition-colors">
                      {item.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-normal text-white group-hover:text-[#2495D3] transition-colors duration-300 leading-snug mb-2.5">
                    {item.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors tracking-wide">
                    Verified protocol
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#2495D3] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Assurance Bar */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-7 rounded-3xl bg-transparent border border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-normal font-heading text-white tracking-normal">24/7/365</div>
            <div className="text-xs text-slate-400 mt-1">Live engineering support</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-normal font-heading text-white tracking-normal">100% SLA</div>
            <div className="text-xs text-slate-400 mt-1">Uptime commitment</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-normal font-heading text-white tracking-normal">Zero-Harm</div>
            <div className="text-xs text-slate-400 mt-1">Safety-first protocols</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-normal font-heading text-white tracking-normal">Pan-India</div>
            <div className="text-xs text-slate-400 mt-1">Technical deployment</div>
          </div>
        </div>

      </div>
    </section>
  );
}

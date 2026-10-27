"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { useVideoFocus } from "@/hooks/useVideoFocus";

export default function AboutUsHeroSection() {
  const videoRef = useVideoFocus();

  return (
    <section className="relative min-h-[540px] lg:min-h-[620px] flex items-center py-12 lg:py-16 overflow-hidden bg-[#0A1629] text-white font-sans">
      {/* Background Video with continuous loop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-65 scale-105"
        >
          <source src="/demovideo.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Gradient Overlay: darker on left for crisp readability, clear on right to showcase video motion */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1629]/90 via-[#0A1629]/70 to-[#0A1629]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1629]/60 via-transparent to-[#0A1629]/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumbs */}
        <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
          <Link href="/" className="hover:text-[#2495D3] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-semibold text-[#2495D3]">About us</span>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-12">
          {/* LEFT CONTENT */}
          <div className="relative z-30">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2495D3]/20 border border-[#2495D3]/40 text-[#45B1E8] text-xs font-semibold tracking-wide mb-4 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#2495D3]" />
              <span>About INA Tech FM</span>
            </div>

            <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-normal text-white">
              Empowering people.
              <br />
              <span className="text-[#2495D3]">Enriching assets.</span>
            </h1>

            <div className="w-20 h-1 bg-[#2495D3] mt-4 mb-6 rounded-full" />

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-200">
              We are a premier tech-enabled technical facility management company delivering engineering precision, proactive maintenance, and certified operations across India.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services/technical-services"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2495D3] hover:bg-white hover:text-[#1C3A62] px-8 py-3.5 font-semibold text-white transition-all duration-300 shadow-lg shadow-[#2495D3]/30 hover:-translate-y-0.5 active:scale-95"
              >
                <span>Explore our services</span>
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
        </div>

        {/* Content Footer / "What we do" Statement */}
        <div className="w-full text-left p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl relative overflow-hidden mt-10 sm:mt-14">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#2495D3]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#45B1E8] block mb-2 sm:mb-3">
            What we do
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-normal text-white leading-snug">
            We enrich your assets through expert repairs and proactive maintenance, extending their lifespan and keeping your facility safe, efficient and reliable.
          </h2>
        </div>
      </div>
    </section>
  );
}

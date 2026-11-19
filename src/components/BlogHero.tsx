"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export default function BlogHero() {
  return (
    <section className="relative w-full pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#0A1629] via-[#1C3A62] to-[#0A1629] text-white font-sans">
      {/* Blueprint grid accent */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
      {/* Architectural Linework Background Stream */}
      <ArchitecturalLineworkBackground theme="dark" opacity={0.35} showBeacons={true} mask="fade-edges" />

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2495D3]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2495D3]/20 border border-[#2495D3]/40 text-[#2495D3] text-xs font-semibold tracking-wide mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Knowledge & thought leadership</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.08] tracking-normal mb-3 text-white">
          Insights,
          <br />
          ideas & innovation
        </h1>
        <div className="w-16 h-1 bg-[#2495D3] mx-auto mb-4 rounded-full" />

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
          Explore expert articles, tech trends, and practical tips to keep your
          business ahead of the curve.
        </p>
      </div>
    </section>
  );
}
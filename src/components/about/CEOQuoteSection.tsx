"use client";

import React from "react";
import Image from "next/image";
import { Users2, Award } from "lucide-react";
import aboutUsImg from "../../../public/about us.png";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export default function CEOQuoteSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-white via-[#F0F7FD]/40 to-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 font-sans overflow-hidden">
      {/* Subtle blueprint grid background */}
      <div className="absolute inset-0 blueprint-dots opacity-40 pointer-events-none" />
      {/* Architectural linework stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.24} mask="fade-edges" flipX={true} />

      <div className="relative max-w-7xl mx-auto">
        <div className="relative bg-white rounded-3xl border border-slate-200/80 shadow-2xl shadow-[#1C3A62]/5 p-6 sm:p-10 lg:p-14 overflow-hidden">
          {/* Subtle architectural top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2495D3] via-[#1C3A62] to-[#2495D3]" />

          {/* Large decorative quotation mark background */}
          <div
            aria-hidden="true"
            className="absolute -top-6 right-8 text-[180px] lg:text-[240px] font-serif text-[#2495D3]/5 select-none pointer-events-none leading-none font-bold"
          >
            “
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Column: Image with architectural framing */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[490px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 group">
                <Image
                  src={aboutUsImg}
                  alt="About Us"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1629]/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating pill badge */}
                <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1C3A62] text-[#2495D3] flex items-center justify-center flex-shrink-0">
                      <Users2 className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#1C3A62]">
                        Pan-India Workforce
                      </div>
                      <div className="text-[11px] text-[#585858]">
                        Operational excellence across sites
                      </div>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Right Column: Statement & Details */}
            <div className="lg:col-span-7 flex flex-col justify-center relative z-10">
              {/* Category pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 text-[#2495D3] text-xs font-semibold tracking-wider uppercase mb-6 w-fit">
                <Award className="w-3.5 h-3.5" />
                <span>Culture & People</span>
              </div>

              {/* Main Statement with Dual-Tone Emphasis */}
              <blockquote className="text-xl sm:text-2xl lg:text-[28px] font-medium leading-relaxed tracking-tight mb-8">
                <span className="text-[#1C3A62] font-semibold">
                  We build a strong work environment by actively encouraging our team members
                  to bring out new ideas and innovative thoughts.
                </span>{" "}
                <span className="text-[#585858]">
                  We ensure the wellbeing and safety of our people across sites and back
                  offices, while creating a culture where every team member feels valued
                  and part of the family.
                </span>
              </blockquote>

              {/* Author & Workforce Profile */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-2xl font-normal text-[#1C3A62] tracking-normal">
                    Our People
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2495D3] bg-[#2495D3]/10 px-3 py-1 rounded-full w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2495D3] animate-pulse" />
                    3000+ Employees Across India
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#585858] font-medium mb-3">
                  3000+ Employees Across India
                </p>

                {/* Supporting Statement */}
                <div className="relative max-w-2xl bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-100">
                  <p className="text-sm sm:text-base text-[#585858] leading-relaxed">
                    With 3000+ employees working across India, we echo our corporate
                    values and deliver our commitments while building, nurturing, and
                    maintaining vibrant relationships with our clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

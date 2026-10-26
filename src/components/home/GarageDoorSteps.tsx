"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Understand your requirements",
    description:
      "We begin by understanding your facility, operational requirements, engineering assets, challenges, and business objectives to identify the right approach for your site.",
  },
  {
    number: "02",
    title: "Assess and advise",
    description:
      "Our technical experts assess your engineering systems and assets, identify potential risks and improvement opportunities, and recommend practical solutions tailored to your facility.",
  },
  {
    number: "03",
    title: "Implement the right solution",
    description:
      "From Hard FM and technical services to transition, audits and sustainability solutions, our teams implement the required services with a focus on safety, reliability and operational continuity.",
  },
  {
    number: "04",
    title: "Optimise for the long term",
    description:
      "We continuously monitor asset performance, preventive maintenance and operational efficiency to extend asset life, reduce downtime, optimise costs and create sustainable value.",
  },
];

export default function FacilityManagementSteps() {
  return (
    <section className="relative w-full py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA] overflow-hidden font-sans border-t border-[#1C3A62]/20">
      {/* Background blueprint subtle accents */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream in Whitespace */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.38} mask="fade-edges" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Sticky Editorial Header */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-24">
            <div className="inline-block rounded-full bg-[#2495D3]/15 border border-[#2495D3]/30 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#1C3A62] mb-3">
              Our methodology
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1C3A62] leading-[1.15] tracking-normal mb-4">
              Engineering solutions built around your needs
            </h2>

            <p className="text-[#585858] text-sm sm:text-base leading-relaxed font-normal mb-6">
              We work closely with our clients to understand their facilities,
              optimise engineering assets and deliver reliable, sustainable
              solutions that support long-term operational performance.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1C3A62] text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg shadow-[#1C3A62]/20 hover:bg-[#2495D3] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Talk to our experts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Column: Connected Steps Timeline */}
          <div className="lg:col-span-7 relative">
            <div className="flex flex-col gap-4 relative">

              {STEPS.map((step) => {
                return (
                  <div
                    key={step.number}
                    className="group relative flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-transparent hover:bg-white/15 border border-[#2495D3]/25 hover:border-[#2495D3]/50 shadow-xs hover:shadow-xl hover:shadow-[#1C3A62]/6 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Step Number Badge with Gradient */}
                    <div className="w-11 h-11 rounded-xl bg-[#1C3A62] group-hover:bg-[#2495D3] text-white flex items-center justify-center text-base font-normal shrink-0 shadow-md transition-colors duration-300 font-heading">
                      {step.number}
                    </div>

                    {/* Step Details */}
                    <div className="pt-0.5 flex-grow">
                      <h3 className="text-base sm:text-lg font-normal text-[#1C3A62] group-hover:text-[#2495D3] mb-1.5 leading-snug transition-colors duration-300">
                        {step.title}
                      </h3>

                      <p className="text-[#585858] text-xs sm:text-sm leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
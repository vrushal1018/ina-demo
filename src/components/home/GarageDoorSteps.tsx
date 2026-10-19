"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
    <section className="relative w-full py-20 md:py-28 bg-[#F8F9FA] overflow-hidden font-sans border-t border-slate-200/60">
      {/* Background blueprint subtle accents */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream in Whitespace */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.3} mask="fade-edges" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">

          {/* Left Column: Sticky Editorial Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28"
          >
            <div className="inline-block rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#2495D3] mb-4">
              Our Methodology
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-semibold text-[#1C3A62] leading-[1.15] tracking-tight mb-6">
              Engineering solutions built around your needs
            </h2>

            <p className="text-[#585858] text-base md:text-lg leading-relaxed font-normal mb-8">
              We work closely with our clients to understand their facilities,
              optimise engineering assets and deliver reliable, sustainable
              solutions that support long-term operational performance.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1C3A62] text-white font-semibold text-sm rounded-full shadow-lg shadow-[#1C3A62]/20 hover:bg-[#2495D3] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Talk to Our Experts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right Column: Connected Steps Timeline */}
          <div className="lg:col-span-7 relative">
            <div className="flex flex-col gap-6 relative">

              {STEPS.map((step, index) => {
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="group relative flex items-start gap-6 p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-[#2495D3]/40 shadow-xs hover:shadow-xl hover:shadow-[#1C3A62]/6 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Step Number Badge with Gradient */}
                    <div className="w-14 h-14 rounded-2xl bg-[#1C3A62] group-hover:bg-[#2495D3] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-md transition-colors duration-300 font-heading">
                      {step.number}
                    </div>

                    {/* Step Details */}
                    <div className="pt-1 flex-grow">
                      <h3 className="text-xl sm:text-2xl font-semibold text-[#1C3A62] group-hover:text-[#2495D3] mb-3 leading-snug transition-colors duration-300">
                        {step.title}
                      </h3>

                      <p className="text-[#585858] text-sm sm:text-[15px] leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
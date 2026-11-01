"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Wrench, Leaf, Zap, ShieldCheck, Sparkles } from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export interface ServiceItem {
  title: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  description: string;
  shortDescription?: string;
}

export interface WhatWeOfferProps {
  services?: ServiceItem[];
  badge?: string;
  title?: string;
}

const defaultServices: ServiceItem[] = [
  {
    title: "Predictive & Preventive Maintenance",
    icon: Wrench,
    description: "Proactive condition-based monitoring and scheduled servicing regimes designed to eliminate unexpected equipment downtime and extend lifecycle ROI.",
    shortDescription: "Proactive condition monitoring and scheduled servicing to eliminate downtime.",
  },
  {
    title: "Energy Audits & Sustainability",
    icon: Leaf,
    description: "Data-driven energy assessments, power quality diagnostics, and carbon reduction measures that lower utility costs and boost operational efficiency.",
    shortDescription: "Data-driven energy studies, efficiency retrofits, and carbon reduction measures.",
  },
  {
    title: "MEP & Critical Infrastructure",
    icon: Zap,
    description: "24/7 precision upkeep and lifecycle tracking for transformers, chillers, AHUs, and high-load power distribution systems across facilities.",
    shortDescription: "Precision upkeep of transformers, chillers, AHUs, and high-load power systems.",
  },
  {
    title: "Transition & Site Mobilization",
    icon: ShieldCheck,
    description: "Structured site assessments, asset tagging, and seamless operational handovers to ensure zero business disruption during facility takeovers.",
    shortDescription: "Smooth operational site takeovers, asset indexing, and compliance baseline audits.",
  },
];

export default function WhatWeOffer({
  services = defaultServices,
  badge = "Capabilities",
  title = "What We Offer",
}: WhatWeOfferProps) {
  const [activeService, setActiveService] = useState(0);

  const list = services && services.length > 0 ? services : defaultServices;
  const safeIndex = activeService >= list.length ? 0 : activeService;
  const currentService = list[safeIndex];
  const CurrentIcon = currentService?.icon || Sparkles;

  return (
    <section className="relative bg-transparent py-12 lg:py-16 overflow-hidden">
      {/* Background blueprint accents */}
      <div className="absolute inset-0 blueprint-dots opacity-25 pointer-events-none" />
      <ArchitecturalLineworkBackground theme="light" opacity={0.2} mask="fade-edges" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#2495D3]/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#2495D3]">
            {badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-normal text-[#1C3A62]">
            {title}
          </h2>
          <div className="w-16 h-1 bg-[#2495D3] mt-3 mb-6 rounded-full mx-auto sm:mx-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* LEFT PANEL: Large Active Service Detail */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1C3A62] to-[#0A1629] rounded-[2rem] p-8 sm:p-10 text-white shadow-2xl flex flex-col min-h-[480px] relative overflow-hidden group">
            {/* Subtle background decoration */}
            <div className="absolute -bottom-12 -right-12 opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
              <CurrentIcon className="w-72 h-72" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8 p-4 bg-white/10 rounded-2xl w-fit backdrop-blur-md border border-white/10 shadow-inner">
                <CurrentIcon className="w-8 h-8 text-[#45B1E8]" />
              </div>

              <h3 className="text-3xl font-semibold mb-6 leading-tight">
                {currentService.title}
              </h3>

              <div className="w-12 h-1 bg-[#45B1E8] mb-6 rounded-full" />

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base flex-grow">
                {currentService.description}
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 text-[#45B1E8] font-medium hover:text-white transition-colors w-fit group/btn cursor-pointer"
              >
                <span>Discuss this service</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT PANEL: 2x2 Grid of Service Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {list.map((service, index) => {
              const isActive = safeIndex === index;
              const shortText =
                service.shortDescription ||
                (service.description.length > 130
                  ? service.description.slice(0, 125).trim() + "..."
                  : service.description);

              return (
                <div
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`cursor-pointer bg-white/90 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 flex flex-col transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] ${
                    isActive
                      ? "ring-2 ring-[#2495D3] shadow-lg shadow-[#2495D3]/10 scale-[1.02] -translate-y-1 bg-white"
                      : "hover:shadow-xl hover:-translate-y-1 border border-white hover:border-[#2495D3]/30"
                  }`}
                >
                  <div className="mb-4">
                    <span
                      className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-3 block ${
                        isActive ? "text-[#2495D3]" : "text-slate-400"
                      }`}
                    >
                      Service 0{index + 1}
                    </span>
                    <h4 className="text-xl font-semibold text-[#1C3A62] leading-tight pr-4">
                      {service.title}
                    </h4>
                  </div>

                  <p className="text-sm text-slate-500 mb-8 flex-grow leading-relaxed">
                    {shortText}
                  </p>

                  <div
                    className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors mt-auto w-fit ${
                      isActive ? "text-[#2495D3]" : "text-slate-400 group-hover:text-[#2495D3]"
                    }`}
                  >
                    <span>{isActive ? "Currently Viewing" : "View More"}</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? "translate-x-1 opacity-100"
                          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


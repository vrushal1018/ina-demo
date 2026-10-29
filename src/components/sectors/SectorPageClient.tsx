"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowRight,
  Building2,
  ShieldCheck,
  Phone,
  Sparkles,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";
import { SectorData, SectorServiceBlockData, AccordionItemData, getAllSectors } from "@/data/sectorsData";

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ title, content, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b border-gray-200 last:border-0 py-4">
      <button
        onClick={onClick}
        type="button"
        className="w-full flex justify-between items-center text-left text-black hover:text-[#2495d3] transition-colors focus:outline-none cursor-pointer"
      >
        <span className="text-lg font-medium pr-4">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#2495d3] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

const ImageCollage = ({ images }: { images: [string, string, string] }) => {
  // Uses the secondary color #1c3a62 as the frame/padding for the images
  return (
    <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] bg-[#1c3a62] p-2 rounded-2xl flex gap-2 shadow-lg">
      <div className="w-1/2 h-full flex flex-col gap-2">
        <img
          src={images[0]}
          alt="Service preview 1"
          className="w-full h-2/3 object-cover rounded-xl bg-gray-100"
          loading="lazy"
        />
        <img
          src={images[1]}
          alt="Service preview 2"
          className="w-full h-1/3 object-cover rounded-xl bg-gray-100"
          loading="lazy"
        />
      </div>
      <div className="w-1/2 h-full">
        <img
          src={images[2]}
          alt="Service preview 3"
          className="w-full h-full object-cover rounded-xl bg-gray-100"
          loading="lazy"
        />
      </div>
    </div>
  );
};

const ServiceBlock = ({ service }: { service: SectorServiceBlockData }) => {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div
      className={`flex flex-col lg:flex-row items-start gap-12 lg:gap-20 ${
        service.reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Text & Accordion Content */}
      <div className="flex-1 w-full">
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-4">
          {service.title}
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
          {service.description}
        </p>

        <div className="flex flex-col border-t border-gray-200">
          {service.accordions.map((acc: AccordionItemData) => (
            <AccordionItem
              key={acc.id}
              title={acc.title}
              content={acc.content}
              isOpen={openId === acc.id}
              onClick={() => setOpenId(openId === acc.id ? null : acc.id)}
            />
          ))}
        </div>
      </div>

      {/* Visual / Collage Content */}
      <div className="flex-1 w-full">
        <ImageCollage images={service.images} />
      </div>
    </div>
  );
};

export default function SectorPageClient({ sector }: { sector: SectorData }) {
  const allSectors = getAllSectors();

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-white font-sans selection:bg-[#2495d3] selection:text-white">
        {/* =========================================================
            HERO & BREADCRUMB HEADER
        ========================================================== */}
        <section className="relative bg-gradient-to-b from-[#D9EDF8] via-[#E2F1FA] to-white pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden border-b border-slate-200/60">
          {/* Blueprint dots & Architectural linework */}
          <div className="absolute inset-0 blueprint-dots opacity-25 pointer-events-none" />
          <ArchitecturalLineworkBackground theme="light" opacity={0.22} mask="fade-edges" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2495D3]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1C3A62]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
            {/* Breadcrumb pill */}
            <div className="mb-6 inline-flex items-center gap-2 text-xs sm:text-sm text-[#585858] bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/80 shadow-sm">
              <Link href="/" className="hover:text-[#2495D3] transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <Link href="/#sectors" className="hover:text-[#2495D3] transition-colors">
                Sectors
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-semibold text-[#2495D3]">{sector.title}</span>
            </div>

            {/* Header Content */}
            <div className="max-w-4xl text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C3A62]/10 border border-[#1C3A62]/20 text-[#1C3A62] text-xs font-semibold tracking-wide mb-4">
                <Building2 className="w-3.5 h-3.5 text-[#2495D3]" />
                <span>{sector.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-normal mb-4 leading-tight">
                {sector.title}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-[#2495D3] mb-4">
                {sector.subtitle}
              </p>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl">
                {sector.description}
              </p>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2495D3] hover:bg-[#1C3A62] px-7 py-3.5 font-semibold text-white transition-all duration-300 shadow-lg shadow-[#2495D3]/25 hover:-translate-y-0.5 active:scale-95 text-sm"
                >
                  <span>Book Sector Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:+919326906715"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#1C3A62] px-6 py-3.5 font-semibold text-[#1C3A62] transition-all duration-300 hover:bg-[#1C3A62] hover:text-white hover:-translate-y-0.5 active:scale-95 text-sm"
                >
                  <Phone className="w-4 h-4 text-[#2495D3]" />
                  <span>Call +91-9326906715</span>
                </a>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-slate-300/80 pt-8">
              {sector.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/80 shadow-xs"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#1C3A62]">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTOR QUICK SWITCHER NAV
        ========================================================== */}
        <section className="bg-slate-50 border-b border-slate-200 py-3.5 sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap mr-2">
                All Sectors:
              </span>
              {allSectors.map((s) => {
                const isActive = s.slug === sector.slug;
                return (
                  <Link
                    key={s.slug}
                    href={`/sectors/${s.slug}`}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "bg-[#2495D3] text-white shadow-sm"
                        : "bg-white text-gray-700 hover:text-[#2495D3] hover:bg-white/90 border border-slate-200"
                    }`}
                  >
                    {s.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SERVICES SECTION (EXACT REQUESTED STRUCTURE)
        ========================================================== */}
        <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2495D3]/10 text-[#2495D3] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
              Our {sector.title} Services
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Services List */}
          <div className="max-w-6xl mx-auto flex flex-col gap-24">
            {sector.services.map((service, index) => (
              <ServiceBlock key={index} service={service} />
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTOR CLIENT LOGOS (IF APPLICABLE)
        ========================================================== */}
        {sector.clientLogos && sector.clientLogos.length > 0 && (
          <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C3A62]/5 border border-[#1C3A62]/15 text-[#1C3A62] text-xs font-semibold tracking-wide mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2495D3]" />
                <span>Sector Track Record</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-3">
                Trusted by Leading {sector.title} Brands
              </h3>
              <p className="text-gray-600 text-sm max-w-xl mx-auto mb-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
                {sector.clientLogos.map((logo, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-[#2495D3]/50 transition-all duration-300"
                  >
                    <div className="relative h-12 w-28 flex items-center justify-center mb-2">
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center truncate w-full">
                      {logo.name}
                    </span>
                    {logo.tag && (
                      <span className="text-[10px] text-[#2495D3] mt-0.5">
                        {logo.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            BOTTOM CALL TO ACTION
        ========================================================== */}
        <section className="relative bg-[#1C3A62] text-white py-16 px-6 lg:px-12 overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2495D3]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Need specialized facility engineering for your {sector.title} assets?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2495D3] hover:bg-[#45B1E8] px-8 py-3.5 font-semibold text-white transition-all duration-300 shadow-lg shadow-[#2495D3]/30 hover:-translate-y-0.5 active:scale-95 text-sm"
              >
                <span>Request a Site Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#sectors"
                className="inline-flex items-center rounded-xl border border-white/30 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 active:scale-95 text-sm"
              >
                Explore Other Sectors
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

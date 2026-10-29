import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Building2, ChevronRight, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";
import { getAllSectors } from "@/data/sectorsData";

export const metadata: Metadata = {
  title: "Sectors We Operate | INA Tech FM",
  description:
    "Explore specialized engineering and facility management solutions across hospitality, malls, healthcare, IT, residential, manufacturing, and commercial sectors.",
};

export default function SectorsIndexPage() {
  const sectors = getAllSectors();

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA] font-sans selection:bg-[#2495d3] selection:text-white pb-20">
        {/* Header Hero */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 blueprint-dots opacity-25 pointer-events-none" />
          <ArchitecturalLineworkBackground theme="light" opacity={0.22} mask="fade-edges" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            {/* Breadcrumb */}
            <div className="mb-6 inline-flex items-center gap-2 text-xs sm:text-sm text-[#585858] bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/80 shadow-xs">
              <Link href="/" className="hover:text-[#2495D3] transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-semibold text-[#2495D3]">Sectors We Operate</span>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C3A62]/10 border border-[#1C3A62]/20 text-[#1C3A62] text-xs font-semibold tracking-wide mb-3">
                <Building2 className="w-3.5 h-3.5 text-[#2495D3]" />
                <span>Multi-Sector Coverage</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C3A62] tracking-tight mb-4">
                Sectors we operate
              </h1>
              <p className="text-[#585858] text-base sm:text-lg leading-relaxed">
                From luxury hospitality to mission-critical healthcare, hyper-connected IT parks,
                and industrial production plants, Ina Tech FM delivers tailored engineering and
                facility management solutions that keep assets efficient, environments safe, and
                operations running seamlessly.
              </p>
            </div>
          </div>
        </section>

        {/* Sectors Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector, idx) => (
              <Link
                key={sector.slug}
                href={`/sectors/${sector.slug}`}
                className="group relative flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-[#1C3A62] border border-[#1C3A62]/70 hover:border-[#2495D3] hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2495D3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                {/* Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={sector.coverImage}
                    alt={sector.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A62] via-transparent to-black/30" />

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wide">
                    Sector #{idx + 1}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 bg-[#1C3A62] text-white flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white group-hover:text-[#45B1E8] transition-colors mb-1.5">
                      {sector.title}
                    </h2>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {sector.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#2495D3] bg-[#2495D3]/15 px-2 py-0.5 rounded-sm">
                      {sector.stats[0]?.value || "Tailored MEP"}
                    </span>
                    <span className="inline-flex items-center text-xs font-semibold text-[#2495D3] group-hover:text-[#45B1E8] transition-colors">
                      <span className="border-b border-[#2495D3]/60 pb-0.5">Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

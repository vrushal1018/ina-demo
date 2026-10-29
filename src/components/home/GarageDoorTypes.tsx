"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export default function SectorsWeOperate() {
  const doors = [
    {
      title: "Hospitality",
      slug: "hospitality",
      image: "/hospitality.jpg",
      alt: "Hospitality facility entrance",
    },
    {
      title: "Malls",
      slug: "malls",
      image: "/mall.jpg",
      alt: "Modern commercial retail entrance",
    },
    {
      title: "Healthcare",
      slug: "healthcare",
      image: "/healthcare.jpg",
      alt: "Healthcare facility door system",
    },
    {
      title: "IT/ITES",
      slug: "it-ites",
      image: "/IT.jpg",
      alt: "Corporate IT office entrance",
    },
    {
      title: "Residential",
      slug: "residential",
      image: "/residential.jpg",
      alt: "Residential garage door solution",
    },
    {
      title: "Manufacturing",
      slug: "manufacturing",
      image: "/manufacturing.jpg",
      alt: "Industrial manufacturing rolling shutter",
    },
    {
      title: "Commercial & corporate",
      slug: "commercial-corporate",
      image: "/commercial.jpg",
      alt: "Commercial building glass door system",
    },
    {
      title: "Institution",
      slug: "institution",
      image: "/institution.jpg",
      alt: "Institutional entry doors",
    },
  ];

  return (
    <section
      id="sectors-section"
      className="w-full py-8 sm:py-10 lg:py-12 lg:min-h-screen lg:flex lg:flex-col lg:justify-center bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA] text-[#383838] relative overflow-hidden"
    >
      {/* Background blueprint elements */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.32} flipY={true} mask="fade-edges" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(36,149,211,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(28,58,98,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 w-full">
        {/* Section Header */}
        <div className="w-full mb-5 sm:mb-6 lg:mb-8 text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-normal text-[#1C3A62] tracking-normal mb-2 leading-tight">
            Sectors we operate
          </h2>
          <p className="text-sm sm:text-base text-[#585858] leading-relaxed font-normal max-w-4xl">
            From corporate workplaces to healthcare, hospitality, residential, and industrial
            spaces, Ina Tech FM delivers tailored engineering and facility management
            solutions that keep assets efficient, environments safe, and operations running
            seamlessly.
          </p>
        </div>

        {/* 8-Card High-End Architectural Sector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-4 xl:gap-5">
          {doors.map((door, idx) => (
            <Link
              key={idx}
              href={`/sectors/${door.slug}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-[#1C3A62] border border-[#1C3A62]/70 hover:border-[#2495D3] hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Top accent light on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2495D3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

              {/* Image Box with Zoom Effect & Gradient Vignette */}
              <div className="relative h-44 sm:h-48 md:h-52 lg:h-40 xl:h-48 2xl:h-52 w-full overflow-hidden bg-slate-900">
                <Image
                  src={door.image}
                  alt={door.alt}
                  fill
                  loading="lazy"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100 transform-gpu will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A62] via-transparent to-black/30 pointer-events-none" />

                {/* Sector Tag Indicator */}
                {/* <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0A1629]/80 border border-white/20 text-white text-[11px] font-semibold tracking-wide shadow-sm">
                  Sector #{idx + 1}
                </div> */}
              </div>

              {/* Card Footer */}
              <div className="px-4 py-3 sm:py-3.5 bg-[#1C3A62] text-white flex items-center justify-between border-t border-white/10">
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-normal truncate group-hover:text-[#45B1E8] transition-colors">
                  {door.title}
                </h3>

                <span
                  className="inline-flex items-center text-xs font-semibold text-[#2495D3] group-hover:text-[#45B1E8] transition-colors duration-200 shrink-0 ml-2"
                >
                  <span className="border-b border-[#2495D3]/60 group-hover:border-[#45B1E8] pb-0.5">
                    Explore
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
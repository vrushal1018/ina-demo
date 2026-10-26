"use client";

import React from "react";
import Image from "next/image";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export default function AboutUsHeroSection() {
  const galleryImages = [
    {
      id: 1,
      src: "/about 1.jpg",
      alt: "INA facility management operations and engineering",
      heightClass: "h-[220px] sm:h-[260px] lg:h-[300px]",
    },
    {
      id: 2,
      src: "/about 2.avif",
      alt: "Technical infrastructure and facility maintenance",
      heightClass: "h-[180px] sm:h-[210px] lg:h-[240px]",
    },
    {
      id: 3,
      src: "/about 3.jpg",
      alt: "INA team on site managing client assets",
      heightClass: "h-[240px] sm:h-[290px] lg:h-[340px]",
    },
    {
      id: 4,
      src: "/about 4.webp",
      alt: "Commercial building and corporate engineering services",
      heightClass: "h-[180px] sm:h-[210px] lg:h-[240px]",
    },
    {
      id: 5,
      src: "/about 5.webp",
      alt: "Sustainable facility management solutions",
      heightClass: "h-[220px] sm:h-[260px] lg:h-[300px]",
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA] py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-12 font-sans overflow-hidden">
      {/* Background blueprint subtle accents */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      {/* Architectural linework stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.25} mask="fade-edges" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* <div className="inline-block rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#2495D3] mb-3">
            About us
          </div> */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C3A62] tracking-normal">
            About us
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#585858] font-medium max-w-xl mx-auto">
            Helping you find the perfect place to call business.
          </p>
        </div>

        {/* Staggered Gallery Grid with Architectural Framing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 items-center mb-8 sm:mb-12">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className={`relative w-full ${img.heightClass} rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100 group`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                priority={img.id === 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A62]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Content Footer / "What we do" Statement */}
        <div className="w-full text-left p-6 sm:p-8 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#2495D3]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#2495D3] block mb-4">
            What we do
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-[#1C3A62] leading-tight sm:leading-snug lg:leading-tight">
            We enrich your assets through expert repairs and proactive maintenance, extending their lifespan and keeping your facility safe, efficient and reliable.
          </h2>
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export default function SectorsWeOperate() {
  const doors = [
    {
      title: "Hospitality",
      image: "/hospitality.jpg",
      alt: "Hospitality facility entrance",
    },
    {
      title: "Malls",
      image: "/mall.jpg",
      alt: "Modern commercial retail entrance",
    },
    {
      title: "Healthcare",
      image: "/healthcare.jpg",
      alt: "Healthcare facility door system",
    },
    {
      title: "IT/ITES",
      image: "/IT.jpg",
      alt: "Corporate IT office entrance",
    },
    {
      title: "Residential",
      image: "/residential.jpg",
      alt: "Residential garage door solution",
    },
    {
      title: "Manufacturing",
      image: "/manufacturing.jpg",
      alt: "Industrial manufacturing rolling shutter",
    },
    {
      title: "Commercial & Corporate",
      image: "/commercial.jpg",
      alt: "Commercial building glass door system",
    },
    {
      title: "Institution",
      image: "/institution.jpg",
      alt: "Institutional entry doors",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white text-[#383838] relative overflow-hidden">
      {/* Background blueprint elements */}
      <div className="absolute inset-0 blueprint-dots opacity-40 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.28} flipY={true} mask="fade-edges" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-[2.5rem] border border-[#2495D3]/20 bg-gradient-to-br from-[#f0f7fd] via-[#f7fbfe] to-[#eaf4fc] py-14 sm:py-20 px-6 sm:px-12 lg:px-16 shadow-lg overflow-hidden">

          {/* Decorative Corner Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2495D3]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1C3A62]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12 sm:mb-16"
          >
            <div className="mb-4 inline-block rounded-full bg-[#2495D3]/15 border border-[#2495D3]/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#2495D3]">
              Sectors We Operate
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C3A62] tracking-normal mb-5 leading-tight">
              Sectors We Operate
            </h2>
            <p className="text-base sm:text-lg text-[#585858] leading-relaxed font-normal">
              Whether it&apos;s a corporate workplace, healthcare facility, hotel, mall,
              residential property, or manufacturing environment, every space demands
              reliable operations and consistent care. At Ina Tech FM, we understand the
              unique requirements of each sector and deliver the right engineering and
              facility management solutions to keep assets efficient, environments safe,
              and operations running seamlessly for the long term.
            </p>
          </motion.div>

          {/* 8-Card High-End Architectural Sector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {doors.map((door, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative flex flex-col rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-[#1C3A62] border border-[#1C3A62]/50 hover:-translate-y-2"
              >
                {/* Image Box with Zoom Effect & Gradient Vignette */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={door.image}
                    alt={door.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A62] via-transparent to-black/20" />

                  {/* Sector Tag Indicator */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wide">
                    Sector #{idx + 1}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 bg-[#1C3A62] text-white flex flex-col justify-between flex-grow border-t border-white/10">
                  <h3 className="text-xl font-normal text-white mb-4 tracking-normal truncate">
                    {door.title}
                  </h3>

                  <a
                    href="#quote"
                    className="inline-flex items-center text-sm font-semibold text-[#2495D3] hover:text-[#488FCD] group/link transition-colors duration-200"
                  >
                    <span className="border-b border-[#2495D3]/60 group-hover/link:border-[#488FCD] pb-0.5">
                      View All
                    </span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1.5 transition-transform duration-200" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
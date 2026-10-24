"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
      title: "Commercial & corporate",
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
    <section className="py-6 sm:py-8 lg:py-10 lg:min-h-screen lg:flex lg:flex-col lg:justify-center bg-gradient-to-b from-[#EDF6FC] to-[#F4FAFD] text-[#383838] relative overflow-hidden">
      {/* Background blueprint elements */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.32} flipY={true} mask="fade-edges" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#2495D3]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1C3A62]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20px" }}
          transition={{ duration: 0.5 }}
          className="w-full mb-4 sm:mb-6"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-normal text-[#1C3A62] tracking-normal mb-1.5 leading-tight">
            Sectors we operate
          </h2>
          <p className="text-xs sm:text-sm text-[#585858] leading-relaxed font-normal w-full max-w-none">
            From corporate workplaces to healthcare, hospitality, residential, and industrial
            spaces, Ina Tech FM delivers tailored engineering and facility management
            solutions that keep assets efficient, environments safe, and operations running
            seamlessly.
          </p>
        </motion.div>

        {/* 8-Card High-End Architectural Sector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {doors.map((door, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-20px" }}
              transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group relative flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-[#1C3A62] border border-[#1C3A62]/50 hover:-translate-y-1"
            >
              {/* Image Box with Zoom Effect & Gradient Vignette */}
              <div className="relative h-28 sm:h-32 lg:h-32 xl:h-36 w-full overflow-hidden bg-slate-900">
                <Image
                  src={door.image}
                  alt={door.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A62] via-transparent to-black/20" />

                {/* Sector Tag Indicator */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[10px] font-medium tracking-wide">
                  Sector #{idx + 1}
                </div>
              </div>

              {/* Card Footer - Compact single-line row */}
              <div className="px-3.5 py-2.5 sm:py-3 bg-[#1C3A62] text-white flex items-center justify-between border-t border-white/10">
                <h3 className="text-xs sm:text-sm font-medium text-white tracking-normal truncate">
                  {door.title}
                </h3>

                <a
                  href="#quote"
                  className="inline-flex items-center text-[11px] sm:text-xs font-semibold text-[#2495D3] hover:text-[#488FCD] group/link transition-colors duration-200 shrink-0 ml-2"
                >
                  <span className="border-b border-[#2495D3]/60 group-hover/link:border-[#488FCD] pb-0.5">
                    View All
                  </span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
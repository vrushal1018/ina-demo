"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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

  // Duplicating array ensures continuous infinite loop without blank gaps
  const infiniteDoors = [...doors, ...doors];

  return (
    <section className="py-16 md:py-24 bg-white text-[#383838] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C3A62] tracking-tight mb-6 leading-tight">
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
        </div>

        {/* CSS Keyframe for Smooth Loop */}
        <style jsx>{`
          @keyframes infiniteScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-infinite-scroll {
            display: flex;
            width: max-content;
            animation: infiniteScroll 25s linear infinite;
          }
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* 4-Card Visible Window Container */}
        <div className="w-full overflow-hidden">
          <div className="animate-infinite-scroll flex gap-6">
            {infiniteDoors.map((door, idx) => (
              <div
                key={idx}
                /* Explicit width ensures exactly 4 cards fit visible 7xl grid width at once */
                className="w-[260px] sm:w-[300px] lg:w-[282px] flex-shrink-0 group flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-[#1C3A62]"
              >
                {/* Image Box */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={door.image}
                    alt={door.alt}
                    fill
                    sizes="282px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Card Footer */}
                <div className="p-6 bg-[#1C3A62] text-white flex flex-col justify-between flex-grow border-t border-[#488FCD]/20">
                  <h3 className="text-xl font-semibold text-white mb-4 tracking-wide truncate">
                    {door.title}
                  </h3>

                  <a
                    href="#quote"
                    className="inline-flex items-center text-sm font-semibold text-[#2495D3] hover:text-[#488FCD] group/link transition-colors duration-200"
                  >
                    <span className="border-b border-[#2495D3] group-hover/link:border-[#488FCD] pb-0.5">
                      View All
                    </span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Settings, MessageSquare, Star, Target, LineChart, Smile, Wrench } from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export default function FeatureGrid() {
  const features = [
    {
      num: "01",
      icon: Heart,
      title: "Client-centric approach",
      description: "We put our clients and their needs at the core of everything we do."
    },
    {
      num: "02",
      icon: Settings,
      title: "Seamless operations",
      description: "We ensure smooth and efficient utility operations and client engagement."
    },
    {
      num: "03",
      icon: MessageSquare,
      title: "“We hear you” philosophy",
      description: "We actively listen to our clients and understand their requirements."
    },
    {
      num: "04",
      icon: Star,
      title: "Exceptional customer experience",
      description: "We strive to deliver an unparalleled customer experience every time."
    },
    {
      num: "05",
      icon: Target,
      title: "Long-term focus",
      description: "We prioritize sustainable, long-term benefits over short-term gains."
    },
    {
      num: "06",
      icon: LineChart,
      title: "Sustainable results",
      description: "Our approach is focused on delivering effective and lasting results."
    },
    {
      num: "07",
      icon: Smile,
      title: "Positive work environment",
      description: "We aim to create a great, collaborative, and productive working environment."
    },
    {
      num: "08",
      icon: Wrench,
      title: "Predictive maintenance",
      description: "We proactively maintain critical systems and assets to ensure reliability, efficiency, and uninterrupted operations."
    },
  ];

  return (
    <section className="relative bg-[#F8F9FA] py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background blueprint subtle accents */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream in Whitespace */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.42} mask="fade-edges" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#2495D3]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1C3A62]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-30px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-block rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#2495D3] mb-3">
            Why INA Tech FM
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C3A62] mb-2 tracking-normal">
            Why INA Tech FM
          </h2>
          <p className="text-sm sm:text-base text-[#585858] font-medium max-w-xl mx-auto">
            Goals to create sustainable future
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-transparent hover:bg-white/15 border border-slate-300/80 hover:border-[#2495D3]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#1C3A62]/6 hover:-translate-y-1.5 overflow-hidden shadow-xs"
              >
                {/* Subtle top index number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white/50 group-hover:bg-[#2495D3] border border-slate-200/70 group-hover:border-[#2495D3] flex items-center justify-center text-[#1C3A62] group-hover:text-white shadow-xs transition-all duration-300">
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="font-heading text-xs font-normal text-slate-400 group-hover:text-[#2495D3] transition-colors">
                    {feature.num}
                  </span>
                </div>

                <div className="flex-grow">
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-normal text-[#1C3A62] mb-2 group-hover:text-[#2495D3] transition-colors duration-300 leading-snug">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#585858] leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle bottom accent line */}
                <div className="mt-4 w-8 h-0.5 bg-slate-200 group-hover:w-full group-hover:bg-[#2495D3] transition-all duration-500 rounded-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

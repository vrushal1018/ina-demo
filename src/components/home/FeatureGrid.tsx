"use client";

import React from "react";
import { Heart, Settings, MessageSquare, Star, Target, LineChart, Smile, Wrench } from "lucide-react";

export default function FeatureGrid() {
  const features = [
    {
      icon: Heart,
      title: "Client-Centric Approach",
      description: "We put our clients and their needs at the core of everything we do."
    },
    {
      icon: Settings,
      title: "Seamless Operations",
      description: "We ensure smooth and efficient utility operations and client engagement."
    },
    {
      icon: MessageSquare,
      title: "“We Hear You” Philosophy",
      description: "We actively listen to our clients and understand their requirements."
    },
    {
      icon: Star,
      title: "Exceptional Customer Experience",
      description: "We strive to deliver an unparalleled customer experience every time."
    },
    {
      icon: Target,
      title: "Long-Term Focus",
      description: "We prioritize sustainable, long-term benefits over short-term gains."
    },
    {
      icon: LineChart,
      title: "Sustainable Results",
      description: "Our approach is focused on delivering effective and lasting results."
    },
    {
      icon: Smile,
      title: "Positive Work Environment",
      description: "We aim to create a great, collaborative, and productive working environment."
    },
    {
      icon: Wrench,
      title: "Proactive Maintenance",
      description: "We proactively maintain critical systems and assets to ensure reliability, efficiency, and uninterrupted operations."
    },
  ];

  return (
    <section className="bg-[#F8F9FA] py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1C3A62] mb-4 tracking-tight">
            Why Ina Tech FM
          </h2>
          <p className="text-base sm:text-lg text-[#585858] font-medium">
            Goals to create sustainable future
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-[#1C3A62]/5 hover:-translate-y-1"
              >
                {/* Icon Container with Custom Palette Styling */}
                <div className="w-16 h-16 mb-6 rounded-2xl bg-white border-2 border-[#2495D3]/20 flex items-center justify-center text-[#2495D3] shadow-sm group-hover:bg-[#2495D3] group-hover:text-white group-hover:border-[#2495D3] transition-all duration-300">
                  <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#1C3A62] mb-3 group-hover:text-[#2495D3] transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#585858] leading-relaxed max-w-xs font-normal">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

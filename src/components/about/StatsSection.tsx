"use client";

import React from "react";

interface StatItem {
  id: number;
  value: string;
  description: string;
}

const stats: StatItem[] = [
  {
    id: 1,
    value: "78 Mn+",
    description: "Sq Ft Area Managed",
  },
  {
    id: 2,
    value: "290+",
    description: "Clients",
  },
  {
    id: 3,
    value: "3,000+",
    description: "Employees",
  },
  {
    id: 4,
    value: "8",
    description: "Years of Experience",
  },
];

export default function StatsSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[200px] sm:min-h-[220px] transition-transform duration-200 hover:-translate-y-1 hover:shadow-sm"
            >
              {/* Stat Number */}
              <h3 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1C3A62] tracking-tight">
                {stat.value}
              </h3>

              {/* Stat Description */}
              <p className="text-sm sm:text-base text-[#585858] font-medium leading-relaxed mt-8">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Users, Briefcase, Award } from "lucide-react";

interface StatItem {
  id: number;
  value: string;
  description: string;
  icon: any;
}

const stats: StatItem[] = [
  {
    id: 1,
    value: "78 Mn+",
    description: "Sq Ft Area Managed",
    icon: Building2,
  },
  {
    id: 2,
    value: "290+",
    description: "Clients",
    icon: Briefcase,
  },
  {
    id: 3,
    value: "3,000+",
    description: "Employees",
    icon: Users,
  },
  {
    id: 4,
    value: "8",
    description: "Years of Experience",
    icon: Award,
  },
];

export default function StatsSection() {
  return (
    <section className="relative w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative bg-[#F8FAFC] rounded-3xl p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-[#1C3A62]/6 border border-slate-200/80 hover:border-[#2495D3]/40 hover:-translate-y-1 overflow-hidden"
              >
                {/* Top Icon Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 group-hover:bg-[#2495D3] group-hover:border-[#2495D3] flex items-center justify-center text-[#1C3A62] group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#2495D3] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                <div>
                  {/* Stat Number */}
                  <h3 className="text-4xl sm:text-5xl font-bold text-[#1C3A62] tracking-tight group-hover:text-[#2495D3] transition-colors duration-300 font-heading">
                    {stat.value}
                  </h3>

                  {/* Stat Description */}
                  <p className="text-sm sm:text-base text-[#585858] font-medium leading-relaxed mt-3">
                    {stat.description}
                  </p>
                </div>

                {/* Bottom accent glow */}
                <div className="mt-6 w-8 h-0.5 bg-slate-200 group-hover:w-full group-hover:bg-[#2495D3] transition-all duration-500 rounded-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Building2, Users, Briefcase, Award } from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";
import Counter from "@/components/Counter";

interface StatItem {
  id: number;
  end: number;
  prefix?: string;
  suffix?: string;
  useGrouping?: boolean;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const stats: StatItem[] = [
  {
    id: 1,
    end: 78,
    suffix: " Mn+",
    description: "Sq Ft Area Managed",
    icon: Building2,
  },
  {
    id: 2,
    end: 290,
    suffix: "+",
    description: "Clients",
    icon: Briefcase,
  },
  {
    id: 3,
    end: 3000,
    suffix: "+",
    useGrouping: true,
    description: "Employees",
    icon: Users,
  },
  {
    id: 4,
    end: 8,
    suffix: "",
    description: "Years Of Experience",
    icon: Award,
  },
];

export default function StatsSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-ina-tint-8 to-ina-tint-15 py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-12 font-sans overflow-hidden">
      {/* Blueprint grid accent */}
      <div className="absolute inset-0 blueprint-dots opacity-20 pointer-events-none" />
      {/* Architectural linework stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.2} mask="fade-edges" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="group relative bg-transparent rounded-2xl p-6 flex flex-col justify-between min-h-[180px] transition-all duration-300 hover:shadow-xl hover:shadow-ina-navy/6 border border-ina-line/80 hover:border-ina-blue/40 hover:-translate-y-1 overflow-hidden"
              >
                {/* Top Icon Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-ina-line/80 group-hover:bg-ina-blue group-hover:border-ina-blue flex items-center justify-center text-ina-navy group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <span className="w-2 h-2 rounded-full bg-ina-blue opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                <div>
                  {/* Stat Number with animated counter effect */}
                  <h3 className="text-3xl sm:text-4xl font-normal text-ina-navy tracking-normal group-hover:text-ina-blue transition-colors duration-300 font-heading">
                    <Counter
                      end={stat.end}
                      start={0}
                      duration={2000}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      useGrouping={stat.useGrouping ?? false}
                    />
                  </h3>

                  {/* Stat Description */}
                  <p className="text-sm sm:text-base text-ina-grey font-medium leading-relaxed mt-3">
                    {stat.description}
                  </p>
                </div>

                {/* Bottom accent glow */}
                <div className="mt-6 w-8 h-0.5 bg-ina-line group-hover:w-full group-hover:bg-ina-blue transition-all duration-500 rounded-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import {
  Mail,
  BarChart2,
  Search,
  Filter,
  PlayCircle,
  ThumbsUp,
  CheckCircle2
} from 'lucide-react';

const services = [
  {
    title: "Email Marketing",
    description: "Lorem ipsum consectetur amet sit ome comeneer ilrems dolce issilmolil.",
    features: ["Email Newsletter Setup", "Email Sequences", "Email Monetization"],
    icon: Mail,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    checkColor: "text-red-500",
  },
  {
    title: "Paid Advertising",
    description: "Lorem ipsum consectetur amet sit ome comeneer ilrems dolce issilmolil.",
    features: ["Google Ads", "Facebook Ads", "LinkedIn & Twitter Ads"],
    icon: BarChart2,
    iconBg: "bg-blue-100",
    iconColor: "text-[#2495D3]",
    checkColor: "text-[#2495D3]",
  },
  {
    title: "SEO",
    description: "Lorem ipsum consectetur amet sit ome comeneer ilrems dolce issilmolil.",
    features: ["SEO Audits", "On-Page SEO", "Off-Page SEO"],
    icon: Search,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
    checkColor: "text-yellow-500",
  },
  {
    title: "Funnel Optimization",
    description: "Lorem ipsum consectetur amet sit ome comeneer ilrems dolce issilmolil.",
    features: ["Analytics Analisis", "A/B Testing", "Conversion Optimization"],
    icon: Filter,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    checkColor: "text-purple-500",
  },
  {
    title: "Content Marketing",
    description: "Lorem ipsum consectetur amet sit ome comeneer ilrems dolce issilmolil.",
    features: ["Articles & Written Content", "Video Content", "Infographics"],
    icon: PlayCircle,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    checkColor: "text-orange-500",
  },
  {
    title: "Social Media Marketing",
    description: "Lorem ipsum consectetur amet sit ome comeneer ilrems dolce issilmolil.",
    features: ["Content Creation", "Community Management", "Social Media Growth"],
    icon: ThumbsUp,
    iconBg: "bg-cyan-100",
    iconColor: "text-[#488FCD]",
    checkColor: "text-[#488FCD]",
  },
];

export default function ServicesSection() {
  return (
    <div className="p-8 pb-12 bg-gradient-to-br from-orange-50/50 via-white to-blue-50/50 font-sans w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-[#2495D3] font-bold text-sm uppercase tracking-wide mb-2">
            Our Services
          </h3>
          <h2 className="text-3xl font-extrabold text-[#1C3A62] tracking-tight">
            High-impact marketing services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100 group cursor-pointer"
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${service.iconBg}`}>
                  <Icon className={`w-6 h-6 ${service.iconColor}`} strokeWidth={2.5} />
                </div>

                {/* Title & Description */}
                <h4 className="text-lg font-bold text-black mb-2">
                  {service.title}
                </h4>
                <p className="text-[#878787] text-xs leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${service.checkColor}`} fill="currentColor" stroke="white" />
                      <span className="text-[#585858] text-xs font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

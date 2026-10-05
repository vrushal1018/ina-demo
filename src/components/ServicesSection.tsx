
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  ArrowRightLeft,
  Leaf,
  Wrench,
  ClipboardCheck,
  UsersRound,
  CheckCircle2,
} from 'lucide-react';

const services = [
  {
    title: 'Hard FM',
    description:
      'Comprehensive engineering and facility management solutions focused on reliable and efficient operations.',
    features: [
      'Engineering Operations',
      'Asset Management',
      'Preventive Maintenance',
    ],
    link: '/services/hard-fm',
    icon: Building2,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    checkColor: 'text-red-500',
  },
  {
    title: 'Allied Services',
    description:
      'Integrated support services designed to create safe, efficient, and well-managed workplace environments.',
    features: [
      'Soft Services',
      'Workplace Support',
      'Integrated Solutions',
    ],
    icon: UsersRound,
    iconBg: 'bg-blue-100',
    iconColor: 'text-[#2495D3]',
    checkColor: 'text-[#2495D3]',
  },
  {
    title: 'Audit & Offerings',
    description:
      'Professional audits and tailored solutions to identify opportunities and improve facility performance.',
    features: [
      'Facility Audits',
      'Performance Assessment',
      'Bespoke Solutions',
    ],
    icon: ClipboardCheck,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
    checkColor: 'text-yellow-500',
  },
  {
    title: 'Sustainability Services',
    description:
      'Energy-focused solutions that help optimize consumption, improve efficiency, and support sustainable operations.',
    features: [
      'Energy Audits',
      'HVAC Assessment',
      'Energy Optimization',
    ],
    icon: Leaf,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    checkColor: 'text-purple-500',
  },
  {
    title: 'Technical Services',
    description:
      'Specialized technical expertise to maintain critical systems and ensure reliable facility performance.',
    features: [
      'Technical Support',
      'System Maintenance',
      'Engineering Expertise',
    ],
    icon: Wrench,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    checkColor: 'text-orange-500',
  },
  {
    title: 'Transition Services',
    description:
      'Structured transition management to ensure smooth mobilization and continuity of facility operations.',
    features: [
      'Transition Planning',
      'Mobilization',
      'Operational Handover',
    ],
    icon: ArrowRightLeft,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-[#488FCD]',
    checkColor: 'text-[#488FCD]',
  },
];

export default function ServicesSection() {
  return (
    <div className="w-full bg-gradient-to-br from-orange-50/50 via-white to-blue-50/50 p-6 pb-8 font-sans">
      <div className="mx-auto w-full max-w-7xl">

        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[#2495D3]">
            Our Services
          </h3>

          <h2 className="text-2xl font-extrabold tracking-tight text-[#1C3A62]">
            Comprehensive Facility Management Solutions
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Link
                href={service.link || "#"}
                key={index}
                className="group flex h-full cursor-pointer flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Icon */}
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${service.iconBg}`}
                >
                  <Icon
                    className={`h-5 w-5 ${service.iconColor}`}
                    strokeWidth={2.5}
                  />
                </div>

                {/* Title */}
                <h4 className="mb-1.5 text-base font-bold text-black">
                  {service.title}
                </h4>

                {/* Description */}
                <p className="mb-3 text-[11px] leading-relaxed text-[#878787]">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2
                        className={`h-[14px] w-[14px] flex-shrink-0 ${service.checkColor}`}
                        fill="currentColor"
                        stroke="white"
                      />

                      <span className="text-[11px] font-medium text-[#585858]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}


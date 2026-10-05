'use client';

import React from 'react';
import {
  Home,
  Wrench,
  FileText,
  Building2,
  Layout,
  Truck,
  PencilRuler,
  CheckCircle,
  Factory,
  ArrowRight
} from 'lucide-react';

const services = [
  {
    title: 'Residential Building and Renovation',
    description: 'We specialize in constructing new homes and upgrading existing spaces with modern finishes.',
    icon: Home,
  },
  {
    title: 'Renovation & Remodeling Services',
    description: 'Upgrade and transform existing spaces with structural or aesthetic improvements tailored to you.',
    icon: Wrench,
  },
  {
    title: 'Pre-Construction Planning Solutions',
    description: 'We provide detailed planning, budgeting, scheduling, and risk assessment.',
    icon: FileText,
  },
  {
    title: 'Commercial Property Development Services',
    description: 'From office spaces to retail centers, we build commercial spaces that support your business.',
    icon: Building2,
  },
  {
    title: 'Interior Fit-Out Solutions',
    description: 'Our interior fit-out services combine style and function to complete any space, move-in ready.',
    icon: Layout,
  },
  {
    title: 'Infrastructure and Road Construction',
    description: 'Delivering reliable, large-scale infrastructure projects including roads, utilities, and drainage systems.',
    icon: Truck,
  },
  {
    title: 'Design and Build Services',
    description: 'An integrated approach combining architecture, engineering, and construction.',
    icon: PencilRuler,
  },
  {
    title: 'Project Management and Delivery',
    description: 'We manage timelines, budgets, and quality so your project runs smoothly from start to finish.',
    icon: CheckCircle,
  },
  {
    title: 'Steel Structure Fabrication Works',
    description: 'We design and erect durable steel frameworks for warehouses, factories, and large-scale infrastructure.',
    icon: Factory,
  },
];

export default function ComprehensiveBuildingSolutions() {
  return (
    <section className="bg-white min-h-screen py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 bg-[#C7F000] rounded-sm shadow-sm"></div>
              <span className="text-sm text-[#1C3A62] font-bold tracking-wide uppercase">See all Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1C3A62] leading-[1.1] tracking-tight">
              Comprehensive Building <br className="hidden md:block" />
              Solutions
            </h2>
          </div>
          <p className="text-[#585858] max-w-md text-sm leading-relaxed lg:pb-2">
            At Mason, we offer end-to-end building services that cover every phase of your project — from initial planning and design to final construction and handover.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            // Alternating cut-corner shapes to create the diamond gaps
            const isEven = index % 2 === 0;
            const clipPath = isEven
              ? 'polygon(3.5rem 0, 100% 0, 100% calc(100% - 3.5rem), calc(100% - 3.5rem) 100%, 0 100%, 0 3.5rem)'
              : 'polygon(0 0, calc(100% - 3.5rem) 0, 100% 3.5rem, 100% 100%, 3.5rem 100%, 0 calc(100% - 3.5rem))';

            return (
              <div
                key={index}
                className="
                  group flex flex-col p-10 md:p-12 min-h-[320px] transition-all duration-300
                  bg-[#1C3A62]
                  hover:shadow-2xl hover:-translate-y-1 hover:bg-[#152e4d]
                "
                style={{ clipPath }}
              >
                {/* Icon Container - White background with Primary Deep Blue logo */}
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1C3A62] mb-8 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={24} strokeWidth={2.5} />
                </div>

                {/* Content - Title and Description in White */}
                <h3 className="text-xl font-extrabold text-white mb-4 pr-4 leading-snug">
                  {service.title}
                </h3>
                <p className="text-white/85 text-sm mb-8 flex-grow leading-relaxed font-medium">
                  {service.description}
                </p>

                {/* Action Link - White, turning Lime Green on hover */}
                <a
                  href="#"
                  className="inline-flex items-center text-white font-bold text-sm hover:text-[#C7F000] transition-colors w-max"
                >
                  Read More
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  UsersRound,
  ClipboardCheck,
  Leaf,
  Wrench,
  ArrowRightLeft,
  ArrowRight
} from 'lucide-react';

export default function ServicesSection() {
  const services = [
    { name: 'Hard FM', icon: Building2, link: '/services/hard-fm' },
    { name: 'Allied services', icon: UsersRound, link: '/services/allied-services' },
    { name: 'Audit & offerings', icon: ClipboardCheck, link: '/services/audit-and-offerings' },
    { name: 'Sustainability services', icon: Leaf, link: '/services/sustainability-services' },
    { name: 'Technical services', icon: Wrench, link: '/services/technical-services' },
    { name: 'Transition services', icon: ArrowRightLeft, link: '/services/transition-services' },
  ];

  return (
    <section className="max-w-6xl mx-auto p-6 md:p-8">
      <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10">

        {/* Left Side: Editorial Image Card */}
        <div className="w-full lg:w-5/12 relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1C3A62] via-[#0F223D] to-[#0A1629] p-6 flex flex-col justify-between min-h-[300px] border border-white/10 shadow-lg">
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#2495D3]/20 border border-[#2495D3]/30 text-[#2495D3] text-xs font-semibold tracking-wide mb-3">
              Core Capabilities
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight leading-snug">
              Best Practice Services For Best Customer Outcomes
            </h2>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              We&apos;re on a mission to make your people and places the best they can be.
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#2495D3] hover:bg-[#488FCD] px-5 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span>Explore all capabilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Decorative image accent */}
          <div className="absolute right-0 bottom-0 w-44 h-48 opacity-25 pointer-events-none overflow-hidden">
            <Image
              src="/services.avif"
              alt="Service Professional"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Right Side: Services Grid */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link
                  href={service.link}
                  key={index}
                  className="group flex items-center p-3.5 rounded-xl border border-slate-100 hover:border-[#2495D3]/40 bg-slate-50/60 hover:bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="w-11 h-11 rounded-lg bg-white group-hover:bg-[#2495D3] border border-slate-200/80 group-hover:border-[#2495D3] text-[#1C3A62] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-xs mr-3.5">
                    <IconComponent strokeWidth={1.75} size={22} />
                  </div>
                  <div className="flex-grow">
                    <span className="text-[#1C3A62] font-semibold text-sm group-hover:text-[#2495D3] transition-colors block leading-snug">
                      {service.name}
                    </span>
                    <span className="text-[11px] text-[#878787] flex items-center gap-1 group-hover:text-[#2495D3] transition-colors mt-0.5 font-medium">
                      <span>View details</span>
                      <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
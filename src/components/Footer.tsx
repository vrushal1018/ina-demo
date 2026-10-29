import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, Clock, Building2 } from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Hard FM", href: "/services/hard-fm" },
    { name: "Transition services", href: "/services/transition-services" },
    { name: "Sustainability services", href: "/services/sustainability-services" },
    { name: "Technical services", href: "/services/technical-services" },
    { name: "Audit & offerings", href: "/services/audit-and-offerings" },
    { name: "Allied services", href: "/services/allied-services" },
  ];

  const quickLinks = [
    { name: "About us", href: "/about" },
    { name: "Sectors we operate", href: "/sectors" },
    { name: "Clients corner", href: "/clients-corner" },
    { name: "Careers", href: "/careers" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <footer className="relative bg-[#0A1629] text-white pt-20 pb-12 overflow-hidden border-t border-[#1C3A62]">
      {/* Subtle Architectural Grid Background */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      {/* Authentic Architectural Linework Background in Dark Theme */}
      <ArchitecturalLineworkBackground theme="dark" opacity={0.25} mask="fade-top" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2495D3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1C3A62]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Highlight Banner */}
        <div className="pb-14 mb-16 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2495D3]/15 border border-[#2495D3]/30 text-xs font-semibold text-[#2495D3] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#2495D3] animate-pulse" />
              <span>Pan-India facility engineering excellence</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-normal leading-snug">
              Empowering people. Enriching assets.
            </h3>
            <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
              Comprehensive engineering and facility management solutions focused on reliable, sustainable and efficient operations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2495D3] hover:bg-[#488FCD] text-white text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg shadow-[#2495D3]/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Talk to our experts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919326906715"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:border-white/50 text-white text-sm font-semibold transition-all duration-300 hover:bg-white/5"
            >
              <Phone className="w-4 h-4 text-[#2495D3]" />
              <span>+91-9326906715</span>
            </a>
          </div>
        </div>

        {/* 4-Column Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block p-2 rounded-xl bg-white shadow-md">
              <img
                src="/Ina Logo-1.jpg.png"
                alt="Ina Tech FM Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Ina Tech FM delivers integrated facility management and engineering services to improve efficiency, reliability, safety, and long-term asset performance.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Building2 className="w-4 h-4 text-[#2495D3]" />
                <span>78 Mn+ Sq Ft</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#2495D3]" />
                <span>290+ Clients</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold tracking-wide text-[#2495D3]">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 hover:text-[#2495D3] transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#2495D3] transition-colors mr-2.5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold tracking-wide text-[#2495D3]">
              Company
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 hover:text-[#2495D3] transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#2495D3] transition-colors mr-2.5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & HQ */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold tracking-wide text-[#2495D3]">
              Headquarters
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2495D3] shrink-0 mt-1" />
                <span className="leading-relaxed text-slate-400">
                  1st Floor, C-Wing, MBC Tech Park, Sainath Nagar, Kasarvadavli, Ghodbunder Road, Thane West, Maharashtra – 400615
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#2495D3] shrink-0" />
                <a href="tel:+919326906715" className="hover:text-[#2495D3] text-slate-300 transition-colors">
                  +91-9326906715
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#2495D3] shrink-0" />
                <a href="mailto:connect@inatechfmglobal.com" className="hover:text-[#2495D3] text-slate-300 transition-colors">
                  connect@inatechfmglobal.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} Ina Tech FM. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Pan-India Presence</span>
            <span>•</span>
            <span>Predictive & Preventive Maintenance</span>
            <span>•</span>
            <span>ISO Compliant Operations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Building2,
  Wrench,
  Leaf,
  Layers,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const pathname = usePathname();

  // Close drawer on route navigation
  useEffect(() => {
    setIsOpen(false);
    setServicesExpanded(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when vertical navbar drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Clients corner", href: "/clients-corner" },
    { name: "Careers", href: "/careers" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact us", href: "/contact" },
  ];

  const servicesList = [
    {
      name: "Hard FM",
      href: "/services/hard-fm",
      desc: "Core technical & engineering infrastructure",
      icon: Building2,
    },
    {
      name: "Transition services",
      href: "/services/transition-services",
      desc: "Smooth operational site takeovers",
      icon: Layers,
    },
    {
      name: "Sustainability services",
      href: "/services/sustainability-services",
      desc: "Energy & carbon footprint reduction",
      icon: Leaf,
    },
    {
      name: "Technical services",
      href: "/services/technical-services",
      desc: "MEP, HVAC & critical systems upkeep",
      icon: Wrench,
    },
    {
      name: "Audit & offerings",
      href: "/services/audit-and-offerings",
      desc: "Statutory, safety & energy compliance",
      icon: ShieldCheck,
    },
    {
      name: "Allied services",
      href: "/services/allied-services",
      desc: "Integrated soft & specialized facility support",
      icon: Sparkles,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isServicesActive = pathname.startsWith("/services");

  return (
    <>
      {/* ================= TRANSPARENT LEFT EDGE INDICATOR ================= */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5 py-4 sm:py-5 px-2 sm:px-2.5 rounded-r-2xl bg-slate-900/45 hover:bg-slate-900/70 backdrop-blur-md border-y border-r border-white/20 hover:border-[#2495D3]/60 text-white/80 hover:text-white transition-all duration-300 shadow-2xl group hover:px-3 cursor-pointer active:scale-95"
        aria-label="Open navigation menu"
        title="Open Navigation Menu"
      >
        <span className="w-2 h-2 rounded-full bg-[#2495D3] animate-pulse shadow-sm shadow-[#2495D3]" />
        <span className="[writing-mode:vertical-lr] text-[11px] font-semibold tracking-widest uppercase text-white/90 group-hover:text-[#2495D3] transition-colors">
          Menu
        </span>
        <ChevronRight className="w-4 h-4 text-[#2495D3] group-hover:translate-x-1 transition-transform" />
      </button>

      {/* ================= VERTICAL NAVBAR (OFF-CANVAS DRAWER) ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 cursor-pointer"
              aria-hidden="true"
            />

            {/* Vertical Drawer Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 w-full sm:w-[380px] md:w-[420px] bg-[#0A1629]/95 text-white backdrop-blur-2xl z-50 border-r border-[#2495D3]/30 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Architectural Blueprint & Linework Background */}
              <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
              <ArchitecturalLineworkBackground
                theme="dark"
                opacity={0.28}
                mask="fade-edges"
              />
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2495D3]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1C3A62]/30 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full justify-between p-6 sm:p-7">
                {/* Top Section: Brand Logo & Close Button */}
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-white/10">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center bg-white/95 px-3 py-1.5 rounded-xl shadow-md transition-transform hover:scale-105"
                    >
                      <img
                        src="/Ina Logo-1.jpg.png"
                        alt="INA Logo"
                        className="h-10 sm:h-11 w-auto object-contain"
                      />
                    </Link>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#2495D3] text-white flex items-center justify-center transition-all duration-300 border border-white/15 shadow-sm active:scale-95 cursor-pointer"
                      aria-label="Close navigation menu"
                    >
                      <X className="w-5 h-5 transition-transform hover:rotate-90 duration-300" />
                    </button>
                  </div>

                  {/* Brand Tagline Badge */}
                  <div className="mt-4 mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2495D3]/15 border border-[#2495D3]/30 text-xs font-semibold text-[#2495D3]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2495D3] animate-pulse" />
                      <span>Empowering people. Enriching assets.</span>
                    </div>
                  </div>

                  {/* Vertical Navigation Links */}
                  <nav className="space-y-1.5">
                    {/* Home Link */}
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${
                        isActive("/") && pathname === "/"
                          ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>Home</span>
                      <ArrowRight className="w-4 h-4 text-[#2495D3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>

                    {/* About Us Link */}
                    <Link
                      href="/about"
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${
                        isActive("/about")
                          ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>About us</span>
                      <ArrowRight className="w-4 h-4 text-[#2495D3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>

                    {/* Services Accordion Menu */}
                    <div className="rounded-xl overflow-hidden transition-colors">
                      <button
                        onClick={() => setServicesExpanded(!servicesExpanded)}
                        className={`w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 cursor-pointer ${
                          isServicesActive
                            ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                            : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <span>Services</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#2495D3] transition-transform duration-300 ${
                            servicesExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Expandable Submenu */}
                      <AnimatePresence>
                        {servicesExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-4 pr-1 py-1 space-y-1 border-l-2 border-[#2495D3]/30 ml-3 mt-1"
                          >
                            {servicesList.map((service) => {
                              const ServiceIcon = service.icon;
                              const isSubActive = pathname === service.href;
                              return (
                                <Link
                                  key={service.href}
                                  href={service.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`flex items-start gap-2.5 p-2 rounded-lg transition-all ${
                                    isSubActive
                                      ? "bg-[#2495D3]/20 text-[#2495D3]"
                                      : "text-slate-300 hover:text-white hover:bg-white/10"
                                  }`}
                                >
                                  <ServiceIcon className="w-4 h-4 text-[#2495D3] shrink-0 mt-0.5" />
                                  <div className="flex-1">
                                    <div className="text-xs sm:text-sm font-semibold">
                                      {service.name}
                                    </div>
                                    <div className="text-[11px] text-slate-400 line-clamp-1">
                                      {service.desc}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Clients Corner Link */}
                    <Link
                      href="/clients-corner"
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${
                        isActive("/clients-corner")
                          ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>Clients corner</span>
                      <ArrowRight className="w-4 h-4 text-[#2495D3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>

                    {/* Careers Link */}
                    <Link
                      href="/careers"
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${
                        isActive("/careers")
                          ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>Careers</span>
                      <ArrowRight className="w-4 h-4 text-[#2495D3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>

                    {/* Blogs Link */}
                    <Link
                      href="/blogs"
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${
                        isActive("/blogs")
                          ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>Blogs</span>
                      <ArrowRight className="w-4 h-4 text-[#2495D3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>

                    {/* Contact Us Link */}
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${
                        isActive("/contact")
                          ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>Contact us</span>
                      <ArrowRight className="w-4 h-4 text-[#2495D3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </nav>
                </div>

                {/* Bottom Section: Contact Widget & Primary CTA */}
                <div className="pt-6 border-t border-white/10 mt-6 space-y-3.5">
                  {/* Phone Call Strip */}
                  <a
                    href="tel:+919326906715"
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2495D3] text-white flex items-center justify-center shrink-0 shadow-md">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-slate-400 font-semibold tracking-wide">
                        Direct Support Line
                      </span>
                      <span className="text-sm font-semibold text-white tracking-wide">
                        +91-9326906715
                      </span>
                    </div>
                  </a>

                  {/* Contact Button */}
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2495D3] hover:bg-[#488FCD] text-white text-sm font-semibold tracking-wide shadow-lg shadow-[#2495D3]/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Talk to our experts</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Verification Footer Text */}
                  <div className="text-center text-[11px] text-slate-400 pt-1">
                    <span>3,000+ Employees • Pan-India Facility Engineering</span>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

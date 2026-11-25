"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  CheckCircle2,
  ArrowRight,
  Building2,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export interface SectorDetail {
  title: string;
  slug: string;
  image: string;
  alt: string;
  subtitle: string;
  description: string;
  whatWeDo: { title: string; description: string }[];
  metrics?: { label: string; value: string }[];
  clients: string[];
}

export default function SectorsWeOperate() {
  const [selectedSector, setSelectedSector] = useState<SectorDetail | null>(null);

  // Close modal on Escape key and manage body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedSector(null);
      }
    };

    if (selectedSector) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSector]);

  const doors: SectorDetail[] = [
    {
      title: "Hospitality",
      slug: "hospitality",
      image: "/hospitality.jpg",
      alt: "Hospitality facility entrance",
      subtitle: "Luxury Hotels, Palaces and 5-Star Resorts",
      description:
        "Providing seamless, silent, and reliable facility engineering that protects guest comfort and upholds the highest standards of luxury hospitality across Pan-India.",
      whatWeDo: [
        {
          title: "Whisper-Quiet HVAC and Climate Engineering",
          description:
            "Acoustically dampened chiller and fan coil unit (FCU) balancing ensuring vibration-free, silent guest room cooling.",
        },
        {
          title: "Indoor Air Quality (IAQ) and Odor Elimination",
          description:
            "Multi-stage filtration and active aroma and odor neutralization across banquet halls, grand lobbies, and fine-dining restaurants.",
        },
        {
          title: "24/7 Rapid-Response Guest Engineering",
          description:
            "Dedicated on-site guest engineering teams operating on strict sub-10-minute SLAs for guest room maintenance escalations.",
        },
        {
          title: "Commercial Kitchen and Cold Chain MEP",
          description:
            "Comprehensive servicing for industrial dishwashers, walk-in deep freezers, kitchen exhaust scrubbers, and grease traps.",
        },
        {
          title: "Continuous Hot Water and Hydro-Pneumatics",
          description:
            "Heat pump upkeep, solar water loop optimization, and balanced shower water pressure across all guest floors.",
        },
        {
          title: "Pool, Spa and Façade Maintenance",
          description:
            "Water chemistry pH balancing for swimming pools and upkeep of decorative ballroom and architectural exterior lighting systems.",
        },
      ],
      metrics: [
        { label: "System Uptime", value: "99.99% Benchmark" },
        { label: "Guest SLA", value: "< 10 Min Resolution" },
        { label: "Kitchen Compliance", value: "100% FSSAI Adherence" },
      ],
      clients: [
        "Taj Hotels",
        "JW Marriott",
        "The Leela",
        "Grand Hyatt",
        "Hilton",
        "Sheraton",
        "Radisson",
        "Novotel",
      ],
    },
    {
      title: "Malls",
      slug: "malls",
      image: "/mall.jpg",
      alt: "Modern commercial retail entrance",
      subtitle: "High-Footfall Shopping Centers and Entertainment Hubs",
      description:
        "Managing heavy footfall, vertical transit reliability, and energy-intensive central chiller plants to ensure unhindered shopping experiences and maximum retail revenues.",
      whatWeDo: [
        {
          title: "Escalator and High-Capacity Elevator Uptime",
          description:
            "Round-the-clock monitoring, step-chain inspections, and rapid technician dispatch for vertical mobility systems.",
        },
        {
          title: "Dynamic Footfall-Responsive Cooling",
          description:
            "Modulating central chiller capacity in real time to handle weekend footfall surges, peak afternoon heat, and large atrium volumes.",
        },
        {
          title: "Food Court Exhaust and Smoke Extraction",
          description:
            "High-volume grease scrubbers, electrostatic precipitators, and kitchen exhaust duct degreasing to prevent fire hazards.",
        },
        {
          title: "Tenant Fit-Out and Sub-Metering Support",
          description:
            "Technical reviews of tenant electrical loads, plumbing tie-ins, and accurate digital sub-meter billing management.",
        },
        {
          title: "Common Area Electrical and Architectural Lighting",
          description:
            "Upkeep of multi-story atrium illumination, façade LED displays, and parking lot motion-sensor lighting.",
        },
        {
          title: "Stormwater Drainage and Basement Dewatering",
          description:
            "Deep basement dewatering pump stations, grease interceptors, and sewage treatment plant (STP) operation.",
        },
      ],
      metrics: [
        { label: "Mobility Availability", value: "99.95%+ Uptime" },
        { label: "Chiller Optimization", value: "18–25% Energy Savings" },
        { label: "Mall Operations", value: "Zero Business Disruption" },
      ],
      clients: [
        "Nexus Malls",
        "Phoenix Marketcity",
        "Oberoi Mall",
        "Inorbit Malls",
        "DLF Malls",
      ],
    },
    {
      title: "Healthcare",
      slug: "healthcare",
      image: "/healthcare.jpg",
      alt: "Healthcare facility door system",
      subtitle: "Multi-Specialty Hospitals, Clinics and Diagnostic Labs",
      description:
        "Clinical-grade engineering and life-safety support where uninterrupted power, sterile air, and absolute hygiene are directly linked to patient well-being.",
      whatWeDo: [
        {
          title: "Operation Theatre (OT) Laminar Flow and Sterile HVAC",
          description:
            "0.3-micron HEPA filtration, positive pressure cascading, and precision humidity control to prevent surgical infections.",
        },
        {
          title: "Medical Gas Pipeline Systems (MGPS)",
          description:
            "24/7 manifold pressure monitoring, line leak audits, and alarm calibration for Oxygen, Nitrous Oxide, and Medical Air.",
        },
        {
          title: "Sub-Second Emergency Power Synchronization",
          description:
            "Redundant UPS and diesel generator systems with sub-second automatic transfer switches (ATS) for ICUs and ventilators.",
        },
        {
          title: "Bio-Medical Waste (BMW) and Hazardous Exhaust",
          description:
            "Specialized negative pressure isolation room exhaust, hazardous waste storage room management, and ETP disinfection.",
        },
        {
          title: "Dialysis and RO Water Hygiene Management",
          description:
            "High-purity water treatment plant management with routine bio-burden and endotoxin testing.",
        },
        {
          title: "NABH and Statutory Hospital Compliance",
          description:
            "Complete audit readiness for fire safety, radiation shielding (AERB), and environmental pollution control guidelines.",
        },
      ],
      metrics: [
        { label: "Sterile Air Standards", value: "100% OT Cascade Compliance" },
        { label: "Power Interruption", value: "0.00 Sec for ICUs" },
        { label: "Audit Readiness", value: "100% NABH Standards" },
      ],
      clients: [
        "Fortis Healthcare",
        "Apollo Hospitals",
        "Manipal Hospitals",
        "Max Healthcare",
      ],
    },
    {
      title: "IT/ITES",
      slug: "it-ites",
      image: "/IT.jpg",
      alt: "Corporate IT office entrance",
      subtitle: "Technology Parks, Data Centers and Enterprise Hubs",
      description:
        "Empowering global technology enterprises and computing centers with high-density precision cooling, clean power distribution, and smart workplace automation.",
      whatWeDo: [
        {
          title: "Data Center Precision Air Conditioning (PAC)",
          description:
            "In-row cooling, hot and cold aisle containment, and ultrasonic humidification for high-density server racks.",
        },
        {
          title: "Harmonics Mitigation and Clean Power Delivery",
          description:
            "Active harmonic filters, isolation transformers, and real-time transient surge suppression to protect sensitive servers.",
        },
        {
          title: "Clean Agent Fire Suppression (FM-200 / Novec 1230)",
          description:
            "Gas flooding fire suppression maintenance, cylinder weight testing, and VESDA early smoke detection.",
        },
        {
          title: "BMS and IoT-Driven Occupancy Optimization",
          description:
            "Smart occupancy sensors, automatic daylight harvesting, and demand-controlled fresh air ventilation based on CO2 levels.",
        },
        {
          title: "Campus EV Charging and Microgrid Management",
          description:
            "Managing multi-point EV chargers, rooftop solar arrays, and synchronized HT substations.",
        },
        {
          title: "Zero Liquid Discharge (ZLD) Water Plants",
          description:
            "Operating high-efficiency membrane bioreactor (MBR) STPs for 100% water recycling in cooling towers and gardens.",
        },
      ],
      metrics: [
        { label: "Server Room Standards", value: "Tier-III / Tier-IV Compliance" },
        { label: "Power Factor", value: "0.99+ High-Efficiency" },
        { label: "PUE Improvement", value: "15%+ Efficiency Gain" },
      ],
      clients: [
        "Mindspace IT Parks",
        "Tata Consultancy Services",
        "Infosys Campuses",
        "Embassy TechVillages",
      ],
    },
    {
      title: "Residential",
      slug: "residential",
      image: "/residential.jpg",
      alt: "Residential garage door solution",
      subtitle: "Gated Communities, Luxury High-Rises and Townships",
      description:
        "Providing end-to-end estate engineering, utility continuity, and community infrastructure maintenance that elevate living standards and preserve real estate value.",
      whatWeDo: [
        {
          title: "Hydro-Pneumatic Pumping and Water Supply",
          description:
            "Multi-stage booster pump maintenance ensuring balanced water pressure across all vertical floors.",
        },
        {
          title: "Residential DG Backup and Load Limiting",
          description:
            "Automatic generator changeovers for common lighting, residential essential circuits, and emergency fire pumps.",
        },
        {
          title: "Elevator Safety and Intercom Connectivity",
          description:
            "Comprehensive lift maintenance, annual safety load tests, and emergency rescue device (ARD) verifications.",
        },
        {
          title: "Clubhouse, Pool and Gymnasium Upkeep",
          description:
            "Complete maintenance of clubhouse HVAC, swimming pool chlorination and filtration, and gym fitness equipment.",
        },
        {
          title: "Automated Landscape Irrigation and STP Reuse",
          description:
            "Operating domestic sewage treatment plants to supply recycled water for flushing and automated garden drip lines.",
        },
        {
          title: "Resident Helpdesk and Mobile Ticketing",
          description:
            "Fast ticket dispatch for civil, plumbing, electrical, and carpenter support with digital tracking and resident sign-offs.",
        },
      ],
      metrics: [
        { label: "Utility Availability", value: "24/7 Guaranteed" },
        { label: "Water Recycling", value: "100% via In-House STP" },
        { label: "Helpdesk Response", value: "< 20 Min Average" },
      ],
      clients: [
        "Lodha Group",
        "Godrej Properties",
        "DLF Communities",
        "Prestige Estates",
      ],
    },
    {
      title: "Manufacturing",
      slug: "manufacturing",
      image: "/manufacturing.jpg",
      alt: "Industrial manufacturing rolling shutter",
      subtitle: "Industrial Plants, Factories and Warehousing Hubs",
      description:
        "Maximizing industrial uptime and plant safety through heavy electrical substation maintenance, process utilities, and strict environmental pollution compliance.",
      whatWeDo: [
        {
          title: "HT/LT Substation and Transformer Upkeep",
          description:
            "Testing vacuum circuit breakers (VCB), air circuit breakers (ACB), transformer oil filtration, and bus duct thermal imaging.",
        },
        {
          title: "Compressed Air System Optimization",
          description:
            "Screw compressor maintenance, refrigerated air dryer servicing, pneumatic line leak audits, and pressure stabilization.",
        },
        {
          title: "Process Cooling Towers and Industrial Chillers",
          description:
            "Industrial water chillers, tube descaling, and cooling tower fan drive upkeep for continuous production cooling.",
        },
        {
          title: "Effluent Treatment Plant (ETP) Operations",
          description:
            "Neutralization, biological treatment, and zero-discharge monitoring to ensure State Pollution Control Board compliance.",
        },
        {
          title: "Motor and Rotating Equipment Vibration Analysis",
          description:
            "Dynamic balancing, thermography, and laser alignment on continuous process motors, gearboxes, and blowers.",
        },
        {
          title: "Industrial Fire Suppression and Deluge Systems",
          description:
            "High-pressure fire hydrant rings, foam deluge systems, and flammable storage area safety.",
        },
      ],
      metrics: [
        { label: "Production Power", value: "99.9% Reliability" },
        { label: "Regulatory Adherence", value: "Zero Pollution Violations" },
        { label: "Pneumatic Efficiency", value: "Measurable Air Leak Savings" },
      ],
      clients: [
        "Automotive Assembly Plants",
        "Pharmaceutical Manufacturing",
        "FMCG Factories",
        "Engineering Workshops",
      ],
    },
    {
      title: "Commercial & Corporate",
      slug: "commercial-corporate",
      image: "/commercial.jpg",
      alt: "Commercial building glass door system",
      subtitle: "Grade-A Office Towers, Headquarters and Business Parks",
      description:
        "World-class facility management for premier corporate towers and multinational headquarters, supporting corporate prestige, employee wellness, and ESG goals.",
      whatWeDo: [
        {
          title: "Smart BMS and Centralized Energy Monitoring",
          description:
            "Real-time tracking of thermal loads, tenant sub-metering, and algorithmic chiller plant optimization.",
        },
        {
          title: "Destination-Dispatch Elevator Uptime",
          description:
            "High-speed vertical transit management with peak morning and evening traffic algorithm programming.",
        },
        {
          title: "Indoor Air Quality (IAQ) and MERV-13 Filtration",
          description:
            "Fresh air ventilation modulation (ASHRAE standards) and UVGI coil disinfection for healthier offices.",
        },
        {
          title: "Façade Maintenance and Cradle Safety Systems",
          description:
            "Routine testing and safe operation of building maintenance units (BMU) for glass façade cleaning and structural inspections.",
        },
        {
          title: "Statutory Fire Life Safety (FLS) Compliance",
          description:
            "Complete adherence to NBC (National Building Code), annual fire license renewals, and evacuation drill execution.",
        },
        {
          title: "ESG and Green Building Decarbonization",
          description:
            "Assisting building owners in achieving and maintaining IGBC, LEED, and GRIHA Green Building certifications.",
        },
      ],
      metrics: [
        { label: "Green Standards", value: "LEED / IGBC Platinum" },
        { label: "Energy Reduction", value: "15–22% Lower Intensity" },
        { label: "Statutory Safety", value: "100% Certified Compliance" },
      ],
      clients: [
        "DLF Cybercity",
        "One Horizon Center",
        "Maker Maxity",
        "Nesco IT Park",
        "Brookfield Properties",
      ],
    },
    {
      title: "Institution",
      slug: "institution",
      image: "/institution.jpg",
      alt: "Institutional entry doors",
      subtitle: "Universities, Academic Campuses and Research Institutes",
      description:
        "Delivering multi-facility campus governance across sprawling estates, specialized science laboratories, lecture halls, and student accommodations.",
      whatWeDo: [
        {
          title: "Specialized Laboratory Utilities and Fume Hoods",
          description:
            "Dedicated chemical exhaust ventilation, toxic vapor scrubbers, and gas line maintenance for academic research labs.",
        },
        {
          title: "Auditorium and Lecture Hall HVAC Operations",
          description:
            "Low-decibel acoustic climate control, stage lighting power feeds, and high-occupancy ventilation.",
        },
        {
          title: "Campus Ring Main Units (RMU) and Power Distribution",
          description:
            "Multi-building high-voltage underground cable maintenance, RMUs, and emergency generator sets.",
        },
        {
          title: "Hostel Utilities and Water Hygiene",
          description:
            "Centralized solar water heating, high-capacity RO drinking water stations, and dining hall kitchen ventilation.",
        },
        {
          title: "Central Library Micro-Climate Control",
          description:
            "Specialized temperature and humidity stabilization to preserve rare books, archives, and electronic workstations.",
        },
        {
          title: "Campus Green Initiatives and Rainwater Harvesting",
          description:
            "Managing extensive rainwater recharge pits, automated sports turf irrigation, and zero-waste composting.",
        },
      ],
      metrics: [
        { label: "Exam Power Uptime", value: "100% Uninterrupted" },
        { label: "Lab Exhaust Safety", value: "Zero-Leak Compliance" },
        { label: "Campus Sustainability", value: "Integrated Rainwater Harvesting" },
      ],
      clients: [
        "Premier National Universities",
        "Academic Campuses",
        "Research Institutes",
        "Executive Training Centers",
      ],
    },
  ];

  return (
    <section
      id="sectors-section"
      className="w-full py-8 sm:py-10 lg:py-12 lg:min-h-screen lg:flex lg:flex-col lg:justify-center bg-gradient-to-b from-ina-tint-15 to-ina-tint-8 text-ina-ink relative overflow-hidden"
    >
      {/* Background blueprint elements */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.32} flipY={true} mask="fade-edges" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(26,149,209,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(15,59,87,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 w-full">
        {/* Section Header */}
        <div className="w-full mb-5 sm:mb-6 lg:mb-8 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs rounded-full bg-ina-blue/10 border border-ina-blue/20 text-ina-blue font-semibold tracking-wide mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Pan-India Sector Operations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-normal text-ina-navy tracking-normal mb-2 leading-tight">
            Sectors We Operate
          </h2>
          <p className="text-sm sm:text-base text-ina-grey leading-relaxed font-normal max-w-4xl">
            From corporate workplaces to healthcare, hospitality, residential, and industrial
            spaces, Ina TechFM delivers tailored engineering and facility management
            solutions that keep assets efficient, environments safe, and operations running
            seamlessly. Tap any sector below to explore our detailed scope of work.
          </p>
        </div>

        {/* 8-Card High-End Architectural Sector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-4 xl:gap-5">
          {doors.map((door, idx) => (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedSector(door)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedSector(door);
                }
              }}
              className="group relative flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-ina-navy border border-ina-navy/70 hover:border-ina-blue hover:-translate-y-1 cursor-pointer active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ina-blue"
              aria-label={`View detailed facility management services for ${door.title}`}
            >
              {/* Top accent light on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ina-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

              {/* Image Box with Zoom Effect & Gradient Vignette */}
              <div className="relative h-44 sm:h-48 md:h-52 lg:h-40 xl:h-48 2xl:h-52 w-full overflow-hidden bg-ina-night">
                <Image
                  src={door.image}
                  alt={door.alt}
                  fill
                  loading="lazy"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100 transform-gpu will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ina-navy via-transparent to-ina-night/30 pointer-events-none" />

                {/* Subtle Hover Pill */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-ina-navy/80 border border-white/20 text-white text-[10px] font-semibold tracking-wide shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 backdrop-blur-xs">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 text-ina-sky" />
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 py-3 sm:py-3.5 bg-ina-navy text-white flex items-center justify-between border-t border-white/10">
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-normal truncate group-hover:text-ina-sky transition-colors">
                  {door.title}
                </h3>
                <span className="text-[11px] font-medium text-ina-sky/90 group-hover:text-white flex items-center gap-1 transition-colors">
                  <span className="hidden xs:inline">Tap to View</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sector Capabilities Detail Modal */}
      {selectedSector && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-ina-navy/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedSector(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-sector-title"
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl border border-ina-line shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Image Banner with Sector Overlay */}
            <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-ina-navy shrink-0">
              <Image
                src={selectedSector.image}
                alt={selectedSector.title}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ina-navy via-ina-navy/80 to-transparent" />
              <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-ina-blue/30 via-transparent to-transparent pointer-events-none" />

              {/* Close Button Top-Right */}
              <button
                type="button"
                onClick={() => setSelectedSector(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Title inside Banner */}
              <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-7 sm:right-7 z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ina-blue/90 text-white text-[11px] font-bold tracking-wide uppercase mb-2 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  <span>Sector Operations</span>
                </div>
                <h3
                  id="modal-sector-title"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
                >
                  {selectedSector.title}
                </h3>
                <p className="text-xs sm:text-sm text-ina-mist font-medium mt-1 line-clamp-1">
                  {selectedSector.subtitle}
                </p>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
              {/* Sector Overview */}
              <div>
                <h4 className="text-xs font-bold text-ina-grey uppercase tracking-wider mb-2">
                  Sector Overview and Operational Focus
                </h4>
                <p className="text-sm sm:text-base text-ina-navy/85 leading-relaxed bg-ina-tint-4/60 p-4 rounded-2xl border border-ina-line/70">
                  {selectedSector.description}
                </p>
              </div>

              {/* What Ina TechFM Does */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-ina-navy uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-ina-blue" />
                    <span>What Ina TechFM Does in {selectedSector.title}</span>
                  </h4>
                  <span className="text-[11px] font-semibold text-ina-blue bg-ina-blue/10 px-2.5 py-0.5 rounded-full">
                    {selectedSector.whatWeDo.length} Key Capabilities
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedSector.whatWeDo.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-ina-line/80 hover:border-ina-blue/40 hover:shadow-xs transition-all flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-ina-blue/10 flex items-center justify-center text-ina-blue shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-ina-blue" />
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-ina-navy leading-snug">
                          {item.title}
                        </h5>
                        <p className="text-[11px] sm:text-xs text-ina-grey mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trusted Industry Leaders & Clients */}
              {selectedSector.clients && selectedSector.clients.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-ina-grey uppercase tracking-wider mb-2.5">
                    Trusted Industry Leaders in {selectedSector.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSector.clients.map((client, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-ina-line text-xs font-semibold text-ina-navy shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-ina-blue" />
                        <span>{client}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-ina-line bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-ina-grey text-center sm:text-left">
                Need engineering or facility management for your {selectedSector.title} property?
              </span>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedSector(null)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-ina-line bg-white hover:bg-ina-tint-8 text-xs font-semibold text-ina-navy transition-colors cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  onClick={() => setSelectedSector(null)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-ina-blue-deep hover:bg-ina-navy text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Inquire for {selectedSector.title}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

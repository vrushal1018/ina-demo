'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Activity,
  ShieldCheck,
  LineChart,
  Wrench,
  Target,
  Settings,
  Users,
  CalendarDays,
  FileText,
  TrendingDown,
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  X,
  CheckCircle2,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';

interface ServiceDetail {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  tagline: string;
  overview: string;
  whatIsDone: string[];
  keyDeliverables: { label: string; value: string }[];
}

const services: ServiceDetail[] = [
  {
    title: 'Asset Lifecycle Enhancement',
    description: 'Enhancing the life cycle of critical engineering assets.',
    icon: Activity,
    tagline: 'Strategic Lifecycle Management and Capex Optimization',
    overview:
      'Comprehensive lifecycle engineering strategies designed to maximize the operating lifespan, performance, and commercial value of critical facility assets while deferring premature capital replacements.',
    whatIsDone: [
      'Comprehensive baseline condition assessments and remaining useful life (RUL) evaluations for plant machinery',
      'Structured multi-year operational maintenance regimes tailored to equipment duty cycles and aging curves',
      'Performance benchmarking and efficiency testing against original equipment manufacturer (OEM) specifications',
      'Lifecycle cost analysis (LCCA) to make data-backed repair, overhaul, or replacement decisions',
      'Targeted retrofits and modernization upgrades to keep legacy systems operating at modern energy standards',
    ],
    keyDeliverables: [
      { label: 'Asset Lifespan', value: '25–40% Extension' },
      { label: 'Capex Planning', value: 'Multi-Year Forecasting' },
      { label: 'Depreciation', value: 'Maximum Asset Retention' },
    ],
  },
  {
    title: 'Asset Outage Minimization',
    description: 'Minimizing asset outages and breakdowns to avoid business disruptions.',
    icon: ShieldCheck,
    tagline: 'Continuous Uptime and Uncompromised Business Continuity',
    overview:
      'Proactive failure mitigation and rapid triage protocols engineered to eliminate unexpected equipment breakdowns, protecting workplace productivity, tenant comfort, and mission-critical uptime.',
    whatIsDone: [
      'Root Cause Failure Analysis (RCFA) for every technical incident to systematically eliminate failure triggers',
      'Regular automated failover testing and live load transfer drills for UPS, DG sets, and central chillers',
      'Continuous 24/7 telemetry monitoring with instant technician dispatch for critical parameter deviations',
      'Critical spares inventory mapping with defined on-site buffer thresholds for rapid replacement',
      'Redundancy bypass architecture planning across vital electrical circuits and primary plumbing loops',
    ],
    keyDeliverables: [
      { label: 'System Uptime', value: '99.98%+ Benchmark' },
      { label: 'Mean Time to Repair', value: 'Rapid Restoration' },
      { label: 'Business Risk', value: 'Near-Zero Downtime' },
    ],
  },
  {
    title: 'Predictive Maintenance',
    description: 'Systematic monitoring and maintenance based on asset performance and condition.',
    icon: LineChart,
    tagline: 'Condition-Based Diagnostics and Early Anomaly Detection',
    overview:
      'Advanced non-destructive diagnostic techniques and continuous telemetry monitoring that detect micro-anomalies and physical wear weeks before catastrophic mechanical or electrical failures occur.',
    whatIsDone: [
      'Infrared thermographic inspections of high-voltage switchgear, main distribution boards, and busbars',
      'Vibration frequency analysis and dynamic laser alignment for rotating assets including pumps and cooling towers',
      'Dielectric breakdown voltage (BDV) and dissolved gas analysis (DGA) for transformer oil and backup generators',
      'Motor circuit analysis (MCA) and power quality harmonics testing to detect electrical insulation degradation',
      'Acoustic ultrasound scanning to identify high-pressure compressed air, refrigerant, and steam line leaks',
    ],
    keyDeliverables: [
      { label: 'Early Detection', value: '4–12 Weeks Ahead' },
      { label: 'Maintenance Cost', value: 'Up to 30% Savings' },
      { label: 'Testing Method', value: '100% Non-Invasive' },
    ],
  },
  {
    title: 'Preventive Maintenance',
    description: 'Planned maintenance aimed at preventing failures and maintaining asset reliability.',
    icon: Wrench,
    tagline: 'Rigorous Scheduled Upkeep and Mechanical Integrity',
    overview:
      'Disciplined, calendar- and run-hour-based scheduled maintenance across all mechanical, electrical, and plumbing (MEP) systems to maintain peak operating efficiency and prevent component breakdowns.',
    whatIsDone: [
      'Execution of comprehensive Daily, Weekly, Monthly, Quarterly, and Annual (DWMQA) maintenance routines',
      'Chemical descaling, tube brushing, and precision refrigerant charge checks for water-cooled central chillers',
      'Air Handling Unit (AHU) filter cleaning, damper calibration, fan belt tensioning, and coil sanitation',
      'Electrical panel de-dusting, terminal torque testing, and protective relay trip test verifications',
      'Routine operational cycling and pressure testing for plumbing booster sets, sump pumps, and fire hydrant lines',
    ],
    keyDeliverables: [
      { label: 'OEM Compliance', value: '100% Warranty Maintained' },
      { label: 'Breakdown Frequency', value: 'Substantial Reduction' },
      { label: 'Air and Water Quality', value: 'Optimized Comfort' },
    ],
  },
  {
    title: '360° Asset Performance',
    description: 'Using technology to provide a 360-degree view of overall asset operating performance.',
    icon: Target,
    tagline: 'Full-Spectrum Telemetry and Centralized Operational Visibility',
    overview:
      'Integrated digital monitoring systems and interactive dashboards that give facility owners and enterprise leadership real-time visibility into equipment health, energy draw, and service level adherence.',
    whatIsDone: [
      'Direct integration with Building Management Systems (BMS) for real-time equipment operating telemetry',
      'Granular sub-metering of electrical power, chilled water consumption, and fuel usage mapped to building zones',
      'Automated asset health scoring combining runtime hours, operating temperatures, and historic maintenance records',
      'Live SLA verification dashboards with automated performance tracking for engineering service teams',
      'Centralized digital asset registries maintaining complete maintenance and modification histories for every unit',
    ],
    keyDeliverables: [
      { label: 'Operational Visibility', value: '360° Real-Time View' },
      { label: 'Energy Management', value: 'Identifies High-Draw Units' },
      { label: 'Management Reporting', value: '100% Data-Driven' },
    ],
  },
  {
    title: 'Engineering O&M',
    description: 'Engineering Operations & Maintenance through a self-delivery approach.',
    icon: Settings,
    tagline: 'Direct Self-Delivered Operations and Maintenance',
    overview:
      'End-to-end Operations and Maintenance delivered through a direct, self-delivery model by certified in-house engineers, ensuring complete accountability, rapid turnaround, and strict quality control.',
    whatIsDone: [
      'Dedicated on-site deployment of certified electrical engineers, HVAC specialists, and multi-skilled technicians',
      'Round-the-clock 24/7 shift operations for high-voltage substations, central chiller plants, and STP/WTP units',
      'Immediate in-house breakdown triage and corrective repairs without reliance on third-party sub-contractors',
      'Strict implementation of site-specific Standard Operating Procedures (SOPs) and Emergency Operating Procedures (EOPs)',
      'Direct OEM warranty coordination and technical administration for proprietary specialized machinery',
    ],
    keyDeliverables: [
      { label: 'Delivery Model', value: '100% Direct Self-Delivery' },
      { label: 'Response Velocity', value: 'Immediate On-Site Triage' },
      { label: 'Accountability', value: 'Single Responsible Partner' },
    ],
  },
  {
    title: 'Man, Machine & Technology',
    description: 'Combining skilled manpower, equipment and technology for effective asset management.',
    icon: Users,
    tagline: 'Harmonizing Human Talent, Precision Tools and Digital Workflows',
    overview:
      'A synchronized combination of highly trained technical engineers, precision diagnostic instrumentation, and modern digital asset governance software delivering superior facility performance.',
    whatIsDone: [
      'Continuous skill upgrading and technical safety certification for all deployed engineering crew members',
      'Outfitting field teams with calibrated diagnostic tools including thermal cameras, clamp meters, and anemometers',
      'Mobile Computerized Maintenance Management System (CMMS) apps for digital task allocation and logging',
      'Mandatory QR-code checkpoint scanning at each plant asset to ensure genuine on-site physical inspections',
      'Standardized operational handbooks and quick-reference digital guides accessible on field mobile devices',
    ],
    keyDeliverables: [
      { label: 'Workforce Readiness', value: 'Certified and Audited' },
      { label: 'Inspection Proof', value: '100% QR-Verified Rounds' },
      { label: 'Tool Standards', value: 'Calibrated Diagnostics' },
    ],
  },
  {
    title: 'Digitalized Schedules',
    description: 'Using digitalization to improve maintenance scheduling and operational planning.',
    icon: CalendarDays,
    tagline: 'Cloud-Based Planning and Automated Task Allocation',
    overview:
      'Transitioning facility maintenance from manual paper logbooks to automated digital scheduling, intelligent technician dispatch, live tracking, and verifiable compliance records.',
    whatIsDone: [
      'Automated generation and dispatch of preventive maintenance work orders based on runtime hours and calendar triggers',
      'Dynamic technician workload allocation and routing based on technical competency and shift availability',
      'Mobile digital checklists with mandatory photo proof of before-and-after conditions and time stamps',
      'Configurable supervisor escalation notifications whenever critical maintenance exceeds scheduled windows',
      'Secure cloud storage of historical maintenance logs accessible for internal and regulatory inspections',
    ],
    keyDeliverables: [
      { label: 'Schedule Adherence', value: 'Zero Missed PM Deadlines' },
      { label: 'Audit Readiness', value: 'Instant Digital Records' },
      { label: 'Field Velocity', value: '30%+ Faster Completion' },
    ],
  },
  {
    title: 'Controlled Documentation',
    description: 'Maintaining controlled documentation for better operational management.',
    icon: FileText,
    tagline: 'Systematic Compliance and Centralized Technical Records',
    overview:
      'Maintaining systematic, up-to-date, and organized engineering documentation to guarantee full statutory compliance, audit readiness, and rapid troubleshooting during emergencies.',
    whatIsDone: [
      'Digital management of Single Line Diagrams (SLDs), piping schematics (P&IDs), and architectural layouts',
      'Centralized tracking and timely renewal management for statutory licenses, lift fitness certificates, and fire NOCs',
      'Standardized operational log sheets for power intake, diesel consumption, chiller loads, and water flow',
      'Comprehensive vendor contracts, warranty documents, and third-party calibration record management',
      'Periodic compliance auditing and pre-inspection readiness drills to prevent regulatory penalties',
    ],
    keyDeliverables: [
      { label: 'Statutory Compliance', value: '100% Up-to-Date' },
      { label: 'Emergency Readiness', value: 'Instant Schematic Access' },
      { label: 'Audit Trail', value: 'Legally Defensible Records' },
    ],
  },
  {
    title: 'Cost Optimization',
    description: 'Exploring opportunities to reduce operating expenditure while optimizing asset performance.',
    icon: TrendingDown,
    tagline: 'Sustainable OPEX Reduction and Energy Conservation',
    overview:
      'Identifying and executing measurable operational expenditure reductions through energy efficiency, resource optimization, and smart procurement without compromising asset integrity or tenant comfort.',
    whatIsDone: [
      'Detailed Energy Conservation Measures (ECMs) targeting chiller plant sequencing, VFD modulation, and LED retrofits',
      'Active power factor correction to maintain near-unity levels and maximize utility rebates while avoiding penalties',
      'In-house technical refurbishment of salvageable components instead of high-cost complete assembly replacements',
      'Bulk procurement economies for filters, lubricants, belts, and common consumables across portfolio facilities',
      'Water consumption audits, rainwater harvesting optimization, and cooling tower blow-down water recovery',
    ],
    keyDeliverables: [
      { label: 'OPEX Reduction', value: '10–20% Measurable Savings' },
      { label: 'Power Factor', value: '0.99+ Maintained' },
      { label: 'Carbon Footprint', value: 'Measurable Environmental ROI' },
    ],
  },
  {
    title: 'Safety & Employee Well-Being',
    description: 'Maintaining a safe workplace while prioritizing employee well-being.',
    icon: Heart,
    tagline: 'Zero-Harm Environment and Health Standards',
    overview:
      'Cultivating an uncompromising safety culture that protects technicians, facility occupants, and visitors through strict protocols, high standards of occupational health, and continuous hazard mitigation.',
    whatIsDone: [
      'Enforcing strict Lockout/Tagout (LOTO) procedures for all electrical, pneumatic, and hydraulic interventions',
      'Conducting daily safety toolbox talks, hazard identification drills, and risk assessments (HIRA) before critical tasks',
      'Mandatory provision and inspection of certified Personal Protective Equipment (PPE) for all field crews',
      'Continuous monitoring of Indoor Air Quality (IAQ), illumination levels, and ergonomic parameters for occupant health',
      'Regular fire safety drills, certified first aid training, and emergency evacuation simulations with building occupants',
    ],
    keyDeliverables: [
      { label: 'Safety Record', value: 'Zero Lost Time Incidents (LTI)' },
      { label: 'PPE Compliance', value: '100% Mandatory Enforcement' },
      { label: 'Workplace Well-Being', value: 'Healthy and Safe Environment' },
    ],
  },
];

export default function ComprehensiveBuildingSolutions() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const dragDistanceRef = useRef(0);
  const touchStartRef = useRef(0);
  const touchDistRef = useRef(0);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
      }
    };

    if (selectedService) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedService]);

  const getScrollStep = () => {
    if (!scrollContainerRef.current) return 320;
    const container = scrollContainerRef.current;
    const firstCard = container.querySelector<HTMLElement>(':scope > div');
    if (firstCard) {
      return firstCard.offsetWidth + 24; // card width + gap-6
    }
    return Math.min(container.clientWidth * 0.85, 380);
  };

  // Auto-play functionality with touch & hover detection
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isDragging && !isHovered && !isInteracting && !selectedService) {
      interval = setInterval(() => {
        if (scrollContainerRef.current) {
          const { current } = scrollContainerRef;
          const isAtEnd =
            current.scrollLeft + current.clientWidth >= current.scrollWidth - 15;

          if (isAtEnd) {
            current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            current.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
          }
        }
      }, 4000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isDragging, isHovered, isInteracting, selectedService]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const step = getScrollStep();
      const scrollAmount = direction === 'left' ? -step : step;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    dragDistanceRef.current = 0;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    dragDistanceRef.current = Math.abs(x - startX);
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsInteracting(true);
    touchStartRef.current = e.touches[0].clientX;
    touchDistRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDistRef.current = Math.abs(e.touches[0].clientX - touchStartRef.current);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsInteracting(false), 3500);
  };

  const handleCardClick = (service: ServiceDetail) => {
    if (dragDistanceRef.current < 8 && touchDistRef.current < 8) {
      setSelectedService(service);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-ina-tint-8 to-ina-tint-15 py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden border-t border-ina-blue/20">
      {/* Background blueprint dots */}
      <div className="absolute inset-0 blueprint-dots opacity-30 pointer-events-none" />
      {/* Authentic Architectural Linework Drawing Stream in Whitespace */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.28} mask="fade-edges" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 sm:mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs rounded-full bg-ina-blue/10 border border-ina-blue/20 text-ina-blue font-semibold tracking-wide mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>See All Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-ina-navy leading-[1.1] tracking-normal">
              Comprehensive Facility <br className="hidden md:block" />
              Management Solutions
            </h2>
            <div className="w-16 h-1 bg-ina-blue mt-3 rounded-full" />
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6">
            <p className="text-ina-grey max-w-md text-sm sm:text-base leading-relaxed lg:text-right">
              We provide specialized engineering and facility management services, ensuring your physical assets and critical systems operate at peak efficiency, reliability, and safety.
            </p>
            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-xl border border-ina-line flex items-center justify-center text-ina-navy hover:border-ina-blue hover:bg-ina-blue hover:text-white transition-all duration-300 shadow-sm bg-white active:scale-95 cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-xl border border-ina-line flex items-center justify-center text-ina-navy hover:border-ina-blue hover:bg-ina-blue hover:text-white transition-all duration-300 shadow-sm bg-white active:scale-95 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Slider Section */}
        <div
          className="w-full relative mt-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsDragging(false);
          }}
        >
          {/* Left & Right fade gradient (matching soft blue section background, desktop only) */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-ina-tint-8 to-transparent z-10 pointer-events-none" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-ina-tint-8 to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`flex gap-4 sm:gap-6 overflow-x-auto pb-10 sm:pb-12 pt-4 px-4 md:px-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] select-none ${
              isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'
            }`}
          >
            {services.map((service, index) => {
              const Icon = service.icon;

              const isEven = index % 2 === 0;
              const clipPath = isEven
                ? 'polygon(2.5rem 0, 100% 0, 100% calc(100% - 2.5rem), calc(100% - 2.5rem) 100%, 0 100%, 0 2.5rem)'
                : 'polygon(0 0, calc(100% - 2.5rem) 0, 100% 2.5rem, 100% 100%, 2.5rem 100%, 0 calc(100% - 2.5rem))';

              return (
                <div
                  key={index}
                  className="relative w-[82vw] max-w-[320px] md:w-[350px] h-[380px] group snap-center shrink-0 pointer-events-none"
                >
                  {/* Border Wrapper */}
                  <div
                    className="h-full w-full bg-ina-line group-hover:bg-ina-blue p-[1.5px] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(26,149,209,0.2)] group-hover:-translate-y-2 pointer-events-auto"
                    style={{ clipPath }}
                  >
                    {/* Inner Card */}
                    <div
                      onClick={() => handleCardClick(service)}
                      className="flex flex-col h-full w-full bg-white p-7 md:p-8 cursor-pointer select-none"
                      style={{ clipPath }}
                    >
                      {/* Icon Container */}
                      <div className="w-14 h-14 bg-ina-tint-15 rounded-xl flex items-center justify-center text-ina-navy mb-6 transition-all duration-300 group-hover:scale-105 group-hover:bg-ina-blue group-hover:text-white shadow-sm shrink-0">
                        <Icon size={26} strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-normal text-ina-navy mb-3 pr-2 leading-snug group-hover:text-ina-blue transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-ina-grey text-[14px] mb-6 flex-grow leading-relaxed line-clamp-3">
                        {service.description}
                      </p>

                      {/* Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(service);
                        }}
                        className="inline-flex items-center text-ina-navy font-semibold text-xs tracking-wide group-hover:text-ina-blue transition-colors w-max mt-auto pointer-events-auto gap-1.5 py-1.5 px-3 rounded-lg bg-ina-tint-4 group-hover:bg-ina-tint-15 border border-ina-line group-hover:border-ina-blue/30 cursor-pointer active:scale-95"
                        aria-label={`Read more about ${service.title}`}
                      >
                        <span>Read More</span>
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ina-navy/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-service-title"
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-ina-line shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative gradient bar */}
            <div className="h-2 w-full bg-gradient-to-r from-ina-blue to-ina-navy shrink-0" />

            {/* Header */}
            <div className="p-6 sm:p-7 border-b border-ina-line bg-gradient-to-b from-ina-tint-8/60 to-white flex items-start justify-between gap-4 shrink-0">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-ina-tint-15 border border-ina-blue/30 flex items-center justify-center text-ina-blue shadow-sm shrink-0">
                  {React.createElement(selectedService.icon, { size: 28, strokeWidth: 2 })}
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-ina-blue/10 text-ina-blue text-[11px] font-semibold mb-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Facility Engineering Solution</span>
                  </div>
                  <h3
                    id="modal-service-title"
                    className="text-xl sm:text-2xl font-bold text-ina-navy tracking-tight"
                  >
                    {selectedService.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ina-blue font-medium mt-0.5">
                    {selectedService.tagline}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="w-10 h-10 rounded-full border border-ina-line bg-white hover:bg-ina-tint-8 text-ina-grey hover:text-ina-navy flex items-center justify-center transition-colors cursor-pointer shadow-xs shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-6">
              {/* Overview & Purpose */}
              <div>
                <h4 className="text-xs font-bold text-ina-grey uppercase tracking-wider mb-2">
                  Overview and Purpose
                </h4>
                <p className="text-sm sm:text-base text-ina-navy/85 leading-relaxed bg-ina-tint-4/50 p-4 rounded-2xl border border-ina-line/70">
                  {selectedService.overview}
                </p>
              </div>

              {/* What Is Done / Operational Scope */}
              <div>
                <h4 className="text-xs font-bold text-ina-grey uppercase tracking-wider mb-3">
                  What Is Done and Operational Scope
                </h4>
                <ul className="space-y-2.5">
                  {selectedService.whatIsDone.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white border border-ina-line/80 hover:border-ina-blue/30 transition-colors shadow-xs"
                    >
                      <div className="w-5 h-5 rounded-full bg-ina-blue/10 flex items-center justify-center text-ina-blue shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-ina-blue" />
                      </div>
                      <span className="text-xs sm:text-sm text-ina-navy leading-normal font-medium">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Deliverables & Business Impact */}
              <div>
                <h4 className="text-xs font-bold text-ina-grey uppercase tracking-wider mb-3">
                  Key Deliverables and Business Impact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedService.keyDeliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-ina-tint-8/70 border border-ina-line/80 flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-semibold text-ina-grey uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-ina-navy mt-1.5">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-ina-line bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-ina-grey text-center sm:text-left">
                Need customized implementation for your facility?
              </span>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-ina-line bg-white hover:bg-ina-tint-8 text-xs font-semibold text-ina-navy transition-colors cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-ina-blue-deep hover:bg-ina-navy text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Inquire Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

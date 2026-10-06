'use client';

import React from 'react';
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
  ArrowRight
} from 'lucide-react';

const services = [
  {
    title: 'Asset Lifecycle Enhancement',
    description: 'Enhancing the life cycle of critical engineering assets.',
    icon: Activity,
  },
  {
    title: 'Asset Outage Minimization',
    description: 'Minimizing asset outages and breakdowns to avoid business disruptions.',
    icon: ShieldCheck,
  },
  {
    title: 'Predictive Maintenance',
    description: 'Systematic monitoring and maintenance based on asset performance and condition.',
    icon: LineChart,
  },
  {
    title: 'Preventive Maintenance',
    description: 'Planned maintenance aimed at preventing failures and maintaining asset reliability.',
    icon: Wrench,
  },
  {
    title: '360° Asset Performance',
    description: 'Using technology to provide a 360-degree view of overall asset operating performance.',
    icon: Target,
  },
  {
    title: 'Engineering O&M',
    description: 'Engineering Operations & Maintenance through a self-delivery approach.',
    icon: Settings,
  },
  {
    title: 'Man, Machine & Technology',
    description: 'Combining skilled manpower, equipment and technology for effective asset management.',
    icon: Users,
  },
  {
    title: 'Digitalized Schedules',
    description: 'Using digitalization to improve maintenance scheduling and operational planning.',
    icon: CalendarDays,
  },
  {
    title: 'Controlled Documentation',
    description: 'Maintaining controlled documentation for better operational management.',
    icon: FileText,
  },
  {
    title: 'Cost Optimization',
    description: 'Exploring opportunities to reduce operating expenditure while optimizing asset performance.',
    icon: TrendingDown,
  },
  {
    title: 'Safety & Employee Well-being',
    description: 'Maintaining a safe workplace while prioritizing employee well-being.',
    icon: Heart,
  },
];

export default function ComprehensiveBuildingSolutions() {
  return (
    <section className="bg-gray-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 bg-[#C7F000] rounded-sm shadow-sm"></div>
              <span className="text-sm text-[#1C3A62] font-bold tracking-wide uppercase">See all Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1C3A62] leading-[1.1] tracking-tight">
              Comprehensive Hard FM <br className="hidden md:block" />
              Solutions
            </h2>
          </div>
          <p className="text-[#585858] max-w-md text-sm leading-relaxed lg:pb-2">
            We provide specialized engineering and facility management services, ensuring your physical assets and critical systems operate at peak efficiency, reliability, and safety.
          </p>
        </div>

        {/* 3D Roller Carousel Section */}
        <div className="mt-20 w-full overflow-hidden flex justify-center items-center h-[850px] carousel-scene">

          <style>{`
            .carousel-scene {
              perspective: 1500px;
            }
            .carousel-wrapper {
              transform: scale(0.5);
              transform-origin: center center;
              transform-style: preserve-3d;
            }
            @media (min-width: 768px) {
              .carousel-wrapper {
                transform: scale(0.9);
              }
            }
            @media (min-width: 1024px) {
              .carousel-wrapper {
                transform: scale(1);
              }
            }
            .carousel-roller {
              transform-style: preserve-3d;
              animation: roller-spin 40s infinite linear;
            }
            .carousel-roller:hover {
              animation-play-state: paused;
            }
            @keyframes roller-spin {
              /* Move the entire cylinder back by its radius so the front card sits exactly at Z=0 (normal size) */
              0% { transform: translateZ(-460px) rotateX(0deg); }
              100% { transform: translateZ(-460px) rotateX(-360deg); }
            }
            .roller-card {
              backface-visibility: visible;
            }
            .carousel-scene:hover .carousel-roller,
            .carousel-scene:hover .fade-card {
              animation-play-state: paused;
            }
            .fade-card {
              animation: card-focus 40s infinite linear;
              animation-fill-mode: both;
            }
            @keyframes card-focus {
              0%   { opacity: 1; filter: blur(0px); }
              10%  { opacity: 0.8; filter: blur(1px); }
              18%  { opacity: 0.1; filter: blur(4px); }
              25%  { opacity: 0; filter: blur(10px); }
              75%  { opacity: 0; filter: blur(10px); }
              82%  { opacity: 0.1; filter: blur(4px); }
              90%  { opacity: 0.8; filter: blur(1px); }
              100% { opacity: 1; filter: blur(0px); }
            }
          `}</style>

          <div className="carousel-wrapper relative w-[704px] h-[360px]">
            <div className="carousel-roller absolute w-full h-full">
              {(() => {
                const servicesWithIndex = services.map((s, i) => ({ ...s, originalIndex: i }));
                const groupedFaces = [];
                let i = 0;
                let isTwo = true;
                while (i < servicesWithIndex.length) {
                  if (isTwo) {
                    groupedFaces.push(servicesWithIndex.slice(i, i + 2));
                    i += 2;
                  } else {
                    groupedFaces.push(servicesWithIndex.slice(i, i + 1));
                    i += 1;
                  }
                  isTwo = !isTwo;
                }

                return groupedFaces.map((faceGroup, index) => {
                  const totalFaces = groupedFaces.length; // 7 faces
                  const angle = (360 / totalFaces) * index;
                  const radius = 460;

                  return (
                    <div
                      key={index}
                      className="roller-card fade-card absolute top-0 left-0 w-full h-full flex justify-center gap-6"
                      style={{
                        transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                        animationDelay: `${(angle / 360) * 40 - 40}s`
                      }}
                    >
                      {faceGroup.map((service, cardIndex) => {
                        const Icon = service.icon;

                        // Alternating cut-corner shapes based on true original index
                        const isEven = service.originalIndex % 2 === 0;
                        const clipPath = isEven
                          ? 'polygon(3.5rem 0, 100% 0, 100% calc(100% - 3.5rem), calc(100% - 3.5rem) 100%, 0 100%, 0 3.5rem)'
                          : 'polygon(0 0, calc(100% - 3.5rem) 0, 100% 3.5rem, 100% 100%, 3.5rem 100%, 0 calc(100% - 3.5rem))';

                        return (
                          <div key={cardIndex} className="relative w-[340px] h-[360px] group">
                            {/* Border Wrapper */}
                            <div
                              className="h-full w-full bg-black p-[1px] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-2"
                              style={{ clipPath }}
                            >
                              {/* Inner White Card */}
                              <div
                                className="flex flex-col h-full w-full bg-white p-10 min-h-[360px]"
                                style={{ clipPath }}
                              >
                                {/* Icon Container */}
                                <div className="w-12 h-12 bg-[#2495D3]/10 rounded-full flex items-center justify-center text-[#1C3A62] mb-6 transition-transform duration-300 group-hover:scale-110">
                                  <Icon size={24} strokeWidth={2.5} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-extrabold text-[#1C3A62] mb-3 pr-4 leading-snug">
                                  {service.title}
                                </h3>
                                <p className="text-[#1C3A62]/75 text-[15px] mb-6 flex-grow leading-relaxed font-medium">
                                  {service.description}
                                </p>

                                {/* Action Link */}
                                <a
                                  href="#"
                                  className="inline-flex items-center text-[#1C3A62] font-bold text-sm hover:text-[#2495D3] transition-colors w-max mt-auto"
                                >
                                  Read More
                                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                });
              })()}
            </div></div>
        </div>

      </div>
    </section>
  );
}
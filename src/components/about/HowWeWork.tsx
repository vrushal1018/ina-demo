'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, Compass, Code, Rocket } from 'lucide-react';

interface StepItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  deliverables: string[];
}

const STEPS: StepItem[] = [
  {
    id: 1,
    title: 'Discovery & Strategy',
    subtitle: 'Phase 01',
    description:
      'We dive deep into your business objectives, target audience, and market trends to establish a rock-solid project foundation and roadmap.',
    icon: Search,
    deliverables: ['Stakeholder Interviews', 'Technical Requirements', 'Project Scope'],
  },
  {
    id: 2,
    title: 'Design & Architecture',
    subtitle: 'Phase 02',
    description:
      'Our team crafts wireframes, high-fidelity UI designs, and system architectures tailored for scalable performance and user delight.',
    icon: Compass,
    deliverables: ['UX Wireframes', 'Interactive Prototypes', 'System Design'],
  },
  {
    id: 3,
    title: 'Agile Development',
    subtitle: 'Phase 03',
    description:
      'We transform designs into clean, high-performance code through iterative sprints, continuous integration, and rigorous testing.',
    icon: Code,
    deliverables: ['Sprint Iterations', 'Quality Assurance', 'Code Reviews'],
  },
  {
    id: 4,
    title: 'Deployment & Growth',
    subtitle: 'Phase 04',
    description:
      'We handle seamless product deployment, monitor initial metrics, and provide ongoing optimization to ensure continuous long-term success.',
    icon: Rocket,
    deliverables: ['CI/CD Pipeline', 'Performance Monitoring', 'Post-Launch Support'],
  },
];

export default function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the container element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 80%'],
  });

  // Smooth out the scroll animation for the line progress indicator
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="w-full bg-white text-[#383838] py-20 md:py-32 overflow-hidden font-['Poppins',sans-serif]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <span className="text-sm md:text-base font-semibold text-[#2495D3] tracking-widest uppercase block">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C3A62] tracking-tight leading-tight">
            How We Turn Ideas Into Impact
          </h2>
          <p className="text-[#585858] text-base md:text-lg leading-relaxed font-normal">
            A structured, 4-step collaborative journey designed to deliver high-quality digital solutions with clarity and precision.
          </p>
        </div>

        {/* Steps Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Vertical Connecting Line (Desktop: Center | Mobile: Left) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-slate-100 z-0">
            <motion.div
              style={{ scaleY }}
              className="w-full h-full bg-gradient-to-b from-[#2495D3] to-[#1C3A62] origin-top"
            />
          </div>

          {/* Step Cards */}
          <div className="space-y-16 md:space-y-24 relative z-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Timeline Node Badge */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-[#2495D3] shadow-lg flex items-center justify-center z-20 transition-transform duration-300 hover:scale-110">
                    <span className="text-[#1C3A62] font-bold text-sm">{step.id}</span>
                  </div>

                  {/* Card Content Wrapper */}
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className={`pl-16 md:pl-0 w-full md:w-[calc(50%-40px)] ${
                      isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                    }`}
                  >
                    <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/80 hover:shadow-2xl hover:border-[#2495D3]/30 transition-all duration-300 group">
                      {/* Step Header */}
                      <div
                        className={`flex items-center gap-4 mb-6 ${
                          isEven ? 'md:flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-2xl bg-[#1C3A62] text-[#2495D3] flex items-center justify-center group-hover:bg-[#2495D3] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                          <Icon className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-[#2495D3] uppercase tracking-wider block">
                            {step.subtitle}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold text-[#1C3A62] group-hover:text-[#2495D3] transition-colors duration-300">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[#585858] text-sm md:text-base leading-relaxed mb-6 font-normal">
                        {step.description}
                      </p>

                      {/* Key Deliverables Chips */}
                      <div
                        className={`flex flex-wrap gap-2 ${
                          isEven ? 'md:justify-end' : 'justify-start'
                        }`}
                      >
                        {step.deliverables.map((item, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-[#1C3A62] text-xs font-medium px-3 py-1 rounded-full border border-slate-200/60"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

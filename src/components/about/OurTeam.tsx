'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mail, ArrowUpRight, Award } from 'lucide-react';

const departments = ['Admin', 'HR', 'Technical'];

const teamMembers = [
  // ================= ADMIN DEPARTMENT (8 Members) =================
  {
    id: 1,
    department: 'Admin',
    name: 'George J. Talbot',
    role: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    bio: '15+ years leading strategic growth and digital transformation initiatives.',
    skills: ['Strategy', 'Leadership'],
  },
  {
    id: 2,
    department: 'Admin',
    name: 'Teresa D. Akins',
    role: 'Operations Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    bio: 'Ensuring seamless operations, swift communications, and client success.',
    skills: ['Logistics', 'Operations'],
  },
  {
    id: 3,
    department: 'Admin',
    name: 'Robert H. Vance',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    bio: 'Steering company vision, global expansion, and executive partnerships.',
    skills: ['Governance', 'Vision'],
  },
  {
    id: 4,
    department: 'Admin',
    name: 'Eleanor Sterling',
    role: 'Chief Financial Officer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    bio: 'Managing corporate finances, investments, and long-term fiscal planning.',
    skills: ['Finance', 'Investment'],
  },
  {
    id: 5,
    department: 'Admin',
    name: 'Michael B. Scott',
    role: 'Regional Manager',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    bio: 'Building vibrant office dynamics and driving team engagement across regions.',
    skills: ['Management', 'Client Relations'],
  },
  {
    id: 6,
    department: 'Admin',
    name: 'Patricia L. Hayes',
    role: 'Executive Assistant',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
    bio: 'Coordinating executive schedules, communications, and board meetings.',
    skills: ['Scheduling', 'Organization'],
  },
  {
    id: 7,
    department: 'Admin',
    name: 'Arthur Pendelton',
    role: 'Office Manager',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    bio: 'Overseeing daily facility operations, administrative staff, and procurement.',
    skills: ['Procurement', 'Facilities'],
  },
  {
    id: 8,
    department: 'Admin',
    name: 'Diana Prince',
    role: 'Legal Counsel',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    bio: 'Directing corporate compliance, contracts, and legal risk management.',
    skills: ['Corporate Law', 'Compliance'],
  },

  // ================= HR DEPARTMENT (8 Members) =================
  {
    id: 9,
    department: 'HR',
    name: 'Sophia Loren',
    role: 'Head of Talent',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    bio: 'Fostering inclusive culture, recruitment strategies, and employee growth.',
    skills: ['Recruitment', 'People Ops'],
  },
  {
    id: 10,
    department: 'HR',
    name: 'Clara Oswald',
    role: 'HR Business Partner',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
    bio: 'Connecting company culture with talent acquisition and team development.',
    skills: ['Employee Relations', 'Policy'],
  },
  {
    id: 11,
    department: 'HR',
    name: 'David R. Miller',
    role: 'Talent Acquisition Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    bio: 'Sourcing top-tier industry engineering talent and managing global hiring.',
    skills: ['Headhunting', 'Interviewing'],
  },
  {
    id: 12,
    department: 'HR',
    name: 'Hannah Abbott',
    role: 'People Operations Manager',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    bio: 'Streamlining onboarding processes, workplace policies, and team benefits.',
    skills: ['Onboarding', 'Payroll'],
  },
  {
    id: 13,
    department: 'HR',
    name: 'Lucas Graham',
    role: 'Compensation Specialist',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    bio: 'Structuring competitive salary benchmarks, bonuses, and equity packages.',
    skills: ['Analytics', 'Compensation'],
  },
  {
    id: 14,
    department: 'HR',
    name: 'Rachel Green',
    role: 'Culture Lead',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    bio: 'Organizing company retreats, wellness workshops, and team initiatives.',
    skills: ['Culture', 'Event Planning'],
  },
  {
    id: 15,
    department: 'HR',
    name: 'Victor Vance',
    role: 'Diversity & Inclusion Director',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    bio: 'Advancing workplace equity, diversity programs, and employee resource groups.',
    skills: ['DEI Strategy', 'Advocacy'],
  },
  {
    id: 16,
    department: 'HR',
    name: 'Emma Watson',
    role: 'Learning & Development',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    bio: 'Designing employee mentorship programs, career tracks, and training modules.',
    skills: ['Mentorship', 'Training'],
  },

  // ================= TECHNICAL DEPARTMENT (8 Members) =================
  {
    id: 17,
    department: 'Technical',
    name: 'Al C. Anderson',
    role: 'AI Expert',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    bio: 'Architecting cutting-edge machine learning solutions and automation systems.',
    skills: ['Machine Learning', 'Python'],
  },
  {
    id: 18,
    department: 'Technical',
    name: 'Teresa D. Akins',
    role: 'Lead Designer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    bio: 'Crafting intuitive user experiences and elegant visual interface designs.',
    skills: ['UI/UX', 'Figma'],
  },
  {
    id: 19,
    department: 'Technical',
    name: 'Marcus Vance',
    role: 'Tech Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    bio: 'Passionate full-stack architect specializing in cloud infrastructure and React.',
    skills: ['Next.js', 'Cloud Architecture'],
  },
  {
    id: 20,
    department: 'Technical',
    name: 'David Kim',
    role: 'DevOps Engineer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    bio: 'Automating deployment pipelines and maintaining high availability infrastructure.',
    skills: ['Kubernetes', 'AWS'],
  },
  {
    id: 21,
    department: 'Technical',
    name: 'Sarah Connor',
    role: 'Cybersecurity Lead',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    bio: 'Securing enterprise data, managing pen tests, and threat mitigation.',
    skills: ['Security', 'Pen Testing'],
  },
  {
    id: 22,
    department: 'Technical',
    name: 'James Wright',
    role: 'Backend Architect',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    bio: 'Building scalable microservices, database schemas, and high-speed APIs.',
    skills: ['Node.js', 'PostgreSQL'],
  },
  {
    id: 23,
    department: 'Technical',
    name: 'Elena Rostova',
    role: 'Frontend Engineer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    bio: 'Specializing in reactive UI micro-interactions and performance optimization.',
    skills: ['React', 'Tailwind CSS'],
  },
  {
    id: 24,
    department: 'Technical',
    name: 'Brian Chen',
    role: 'Data Scientist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    bio: 'Extracting actionable insights from complex datasets and predictive models.',
    skills: ['Data Mining', 'TensorFlow'],
  },
];

export default function OurTeam() {
  const [selectedDepartment, setSelectedDepartment] = useState('Admin');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const filteredMembers = teamMembers.filter(
    (member) => member.department === selectedDepartment
  );

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, filteredMembers.length - itemsPerPage);

  const handleDepartmentChange = (dept: string) => {
    setSelectedDepartment(dept);
    setCurrentIndex(0);
  };

  const prevSlide = () => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPaused, maxIndex, selectedDepartment]);

  return (
    <section className="bg-white text-[#383838] py-20 lg:py-28 px-4 sm:px-6 lg:px-12 flex flex-col justify-center overflow-hidden font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C3A62]/5 border border-[#1C3A62]/15 text-[#1C3A62] text-xs font-semibold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-[#2495D3]" />
            <span>Operational Executives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1C3A62]">
            Meet Our Leadership Team
          </h2>
          <p className="text-[#585858] max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed">
            Our Experienced Professionals Are Dedicated To Delivering Excellence, Innovation, And Outstanding Results For Our Clients.
          </p>
        </div>

        {/* Department Filter Toggle Switcher */}
        <div className="flex justify-center items-center gap-2.5 mb-12 flex-wrap">
          {departments.map((dept) => {
            const isSelected = selectedDepartment === dept;
            const count = teamMembers.filter((m) => m.department === dept).length;

            return (
              <button
                key={dept}
                onClick={() => handleDepartmentChange(dept)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#1C3A62] text-white border-[#1C3A62] shadow-lg shadow-[#1C3A62]/20 scale-105'
                    : 'bg-slate-50 text-[#585858] border-slate-200 hover:border-[#2495D3] hover:text-[#1C3A62]'
                }`}
              >
                <span>{dept}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected ? 'bg-[#2495D3] text-white' : 'bg-slate-200 text-[#585858]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Carousel Viewport Container */}
        <div
          className="relative overflow-hidden py-4 px-1"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0"
              >
                {/* Modern Architectural Card */}
                <div className="group relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#2495D3] transition-all duration-300 flex flex-col justify-between h-[460px] overflow-hidden">
                  {/* Top Bar Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2495D3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Image Container */}
                  <div className="relative w-full h-[220px] rounded-xl overflow-hidden bg-slate-100 border border-slate-100 mb-4 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1C3A62]/90 backdrop-blur-sm text-[11px] font-semibold text-white tracking-wider uppercase">
                      {member.department}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#1C3A62] group-hover:text-[#2495D3] transition-colors line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#2495D3] mt-0.5 mb-2 line-clamp-1">
                        {member.role}
                      </p>
                      <p className="text-xs text-[#585858] leading-relaxed line-clamp-2">
                        {member.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-2">
                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {member.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-[#2495D3]/10 text-[#2495D3] text-[10px] font-semibold px-2 py-0.5 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5">
                          <a
                            href="#"
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-[#2495D3] hover:text-white text-[#585858] flex items-center justify-center transition-colors"
                            aria-label="LinkedIn"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" r="2"></circle>
                            </svg>
                          </a>
                          <a
                            href="#"
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-[#2495D3] hover:text-white text-[#585858] flex items-center justify-center transition-colors"
                            aria-label="Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <span className="text-[11px] font-semibold text-[#1C3A62] group-hover:text-[#2495D3] inline-flex items-center gap-0.5 transition-colors">
                          Profile <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls & Page Indicator */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            disabled={maxIndex === 0}
            className="p-3 rounded-xl bg-slate-100 hover:bg-[#2495D3] hover:text-white text-[#1C3A62] transition-colors shadow-sm active:scale-95 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="bg-[#1C3A62] text-white px-5 py-2 rounded-xl text-xs font-semibold tracking-wider shadow-sm">
            {currentIndex + 1} / {maxIndex + 1}
          </span>

          <button
            onClick={nextSlide}
            disabled={maxIndex === 0}
            className="p-3 rounded-xl bg-slate-100 hover:bg-[#2495D3] hover:text-white text-[#1C3A62] transition-colors shadow-sm active:scale-95 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
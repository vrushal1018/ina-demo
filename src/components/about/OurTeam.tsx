'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mail, ArrowUpRight } from 'lucide-react';

// Color Palette:
// Primary: #2495D3 (Blue), #585858 (Grey), #000000 (Black), #FFFFFF (White)
// Secondary: #1C3A62 (Navy Blue), #383838 (Onyx Green), #488FCD (Dark Blue), #878787 (Taupe Green)

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
  const [activeMemberId, setActiveMemberId] = useState<number | null>(null); // Supports tap to toggle on mobile/touch screens
  const [isPaused, setIsPaused] = useState(false); // Hover pause state

  // Filter team members based on the active department selection
  const filteredMembers = teamMembers.filter(
    (member) => member.department === selectedDepartment
  );

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, filteredMembers.length - itemsPerPage);

  // Switch department and reset slide indices
  const handleDepartmentChange = (dept: string) => {
    setSelectedDepartment(dept);
    setCurrentIndex(0);
    setActiveMemberId(null);
  };

  const prevSlide = () => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Auto-play interval that pauses when mouse hovers over the slider
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3500); // Transitions every 3.5 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPaused, maxIndex, selectedDepartment]);

  const handleCardClick = (id: number) => {
    // Toggle active state for mobile/touch users
    setActiveMemberId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-white text-[#383838] py-16 px-4 md:px-8 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">

        {/* Section Header */}
        <div className="text-center mb-8 space-y-3">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1C3A62]">
            Meet Our Leadership Team
          </h2>
          <p className="text-[#585858] max-w-2xl mx-auto text-base md:text-lg font-medium">
            Our Experienced Professionals Are Dedicated To Delivering Excellence, Innovation, And Outstanding Results For Our Clients.
          </p>
        </div>

        {/* Department Filter Toggle Switcher */}
        <div className="flex justify-center items-center gap-2 mb-10 flex-wrap">
          {departments.map((dept) => {
            const isSelected = selectedDepartment === dept;
            const count = teamMembers.filter((m) => m.department === dept).length;

            return (
              <button
                key={dept}
                onClick={() => handleDepartmentChange(dept)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${isSelected
                    ? 'bg-[#2495D3] text-white border-[#2495D3] shadow-md scale-105'
                    : 'bg-[#1C3A62]/5 text-[#1C3A62] border-[#1C3A62]/20 hover:bg-[#1C3A62] hover:text-white'
                  }`}
              >
                {dept} <span className="text-xs opacity-75 ml-1">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Carousel Viewport Container with Hover Pause Listeners */}
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
            {filteredMembers.map((member) => {
              const isActive = activeMemberId === member.id;

              return (
                <div
                  key={member.id}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0"
                >
                  {/* Outer Capsule Card - Secondary Navy Blue (#1C3A62) */}
                  <div
                    onClick={() => handleCardClick(member.id)}
                    className="group relative bg-[#1C3A62] rounded-[100px] p-6 text-center transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col items-center justify-between h-[490px] overflow-hidden cursor-pointer select-none border border-white/10"
                  >

                    {/* Top Hidden Text / Bio Area (Reveals on hover OR tap) */}
                    <div
                      className={`w-full text-center transition-all duration-500 transform flex flex-col items-center justify-start h-[130px] pt-2 z-10 ${isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
                        }`}
                    >
                      <p className="text-xs text-white/80 font-medium leading-relaxed px-2 line-clamp-3 mb-2">
                        {member.bio}
                      </p>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {member.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-[#2495D3]/20 text-[#2495D3] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#2495D3]/40"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Circular Image Container (Drops Down on Hover OR Tap) */}
                    <div
                      className={`relative w-40 h-40 my-auto transition-transform duration-500 ease-in-out transform z-20 flex-shrink-0 ${isActive
                          ? 'translate-y-[110px] scale-95'
                          : 'group-hover:translate-y-[110px] group-hover:scale-95'
                        }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-full object-cover rounded-full border-4 shadow-lg transition-colors duration-300 ${isActive
                            ? 'border-white'
                            : 'border-[#2495D3] group-hover:border-white'
                          }`}
                      />
                      <div
                        className={`absolute inset-0 rounded-full bg-black/20 transition-opacity duration-300 flex items-center justify-center ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                      >
                        <ArrowUpRight className="w-8 h-8 text-white stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Member Name, Role & Social Links */}
                    <div
                      className={`w-full transition-all duration-500 transform z-10 flex flex-col items-center justify-center ${isActive
                          ? '-translate-y-[170px]'
                          : 'group-hover:-translate-y-[170px]'
                        }`}
                    >
                      <h3
                        className={`text-xl font-medium tracking-wide transition-colors ${isActive
                            ? 'text-[#2495D3]'
                            : 'text-white group-hover:text-[#2495D3]'
                          }`}
                      >
                        {member.name}
                      </h3>
                      <p
                        className={`text-xs font-medium transition-colors mt-1 ${isActive
                            ? 'text-white'
                            : 'text-white/90 group-hover:text-white'
                          }`}
                      >
                        {member.role}
                      </p>

                      {/* Social Media Links */}
                      <div
                        className={`flex justify-center gap-2.5 mt-3 transition-opacity duration-300 ${isActive
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                          }`}
                      >
                        <a
                          href="#"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-full bg-[#585858] hover:bg-[#2495D3] text-white transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-full bg-[#585858] hover:bg-[#2495D3] text-white transition-colors"
                          aria-label="Twitter"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-full bg-[#585858] hover:bg-[#2495D3] text-white transition-colors"
                          aria-label="Email"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slider Controls & Page Indicator */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            disabled={maxIndex === 0}
            className="p-3 rounded-full bg-[#1C3A62] hover:bg-[#2495D3] text-white transition-colors shadow-md active:scale-95 border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="bg-[#1C3A62] text-white px-5 py-2 rounded-full text-xs font-medium tracking-widest border border-[#2495D3]/30 shadow-sm">
            {currentIndex + 1} / {maxIndex + 1}
          </span>

          <button
            onClick={nextSlide}
            disabled={maxIndex === 0}
            className="p-3 rounded-full bg-[#1C3A62] hover:bg-[#2495D3] text-white transition-colors shadow-md active:scale-95 border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
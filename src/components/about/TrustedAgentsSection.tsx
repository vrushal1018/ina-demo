"use client";

import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import imgRanjit from "../../../public/Ranjit Patil.jpeg";
import imgJose from "../../../public/Jose sir.jpeg";
import imgLipson from "../../../public/Lipson paul.jpeg";

interface Agent {
  id: number;
  name: string;
  role: string;
  image: string | import("next/image").StaticImageData;
  socials: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    profile?: string;
  };
}

const agents: Agent[] = [
  {
    id: 1,
    name: "Ranjit Patil",
    role: "Co-Founder",
    image: imgRanjit,
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      profile: "#",
    },
  },
  {
    id: 2,
    name: "Jose Sir",
    role: "Co-Founder",
    image: imgJose,
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      profile: "#",
    },
  },
  {
    id: 3,
    name: "Lipson Paul",
    role: "Co-Founder",
    image: imgLipson,
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      profile: "#",
    },
  },
];

export default function TrustedAgentsSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 font-sans relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[#1C3A62] font-semibold tracking-wider uppercase text-sm mb-3 block">
            Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C3A62] tracking-tight">
            Meet Our Board
          </h2>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {agents.map((agent) => (
            <div key={agent.id} className="flex flex-col group p-4 sm:p-5 rounded-[2rem] hover:bg-slate-50 transition-colors duration-300">

              {/* Agent Image Card */}
              <div className="relative w-full h-[320px] sm:h-[360px] lg:h-[400px] rounded-[1.5rem] overflow-hidden mb-6 bg-gradient-to-b from-[#F0F6FA] to-[#E2ECF4] border border-[#2495D3]/10">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Agent Info */}
              <div className="flex flex-col text-left px-2 pb-2">
                <h3 className="text-xl sm:text-2xl font-medium text-[#1C3A62] group-hover:text-[#2495D3] transition-colors duration-300">
                  {agent.name}
                </h3>
                <p className="text-sm text-[#585858] font-medium mt-1 mb-5">
                  {agent.role}
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  <a
                    href={agent.socials.facebook}
                    aria-label={`${agent.name}'s Facebook`}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#585858] hover:border-[#2495D3] hover:bg-[#2495D3] hover:text-white transition-all duration-300"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a
                    href={agent.socials.twitter}
                    aria-label={`${agent.name}'s Twitter`}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#585858] hover:border-[#2495D3] hover:bg-[#2495D3] hover:text-white transition-all duration-300"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a
                    href={agent.socials.instagram}
                    aria-label={`${agent.name}'s Instagram`}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#585858] hover:border-[#2495D3] hover:bg-[#2495D3] hover:text-white transition-all duration-300"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a
                    href={agent.socials.profile}
                    aria-label={`${agent.name}'s Profile`}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#585858] hover:border-[#2495D3] hover:bg-[#2495D3] hover:text-white transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

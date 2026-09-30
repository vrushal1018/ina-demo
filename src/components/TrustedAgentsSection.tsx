"use client";

import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import imgRanjit from "../../public/Ranjit Patil.jpeg";
import imgJose from "../../public/Jose sir.jpeg";
import imgLipson from "../../public/Lipson paul.jpeg";

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
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C3A62] tracking-tight">
            Trusted Real Estate Agent
          </h2>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {agents.map((agent) => (
            <div key={agent.id} className="flex flex-col group">

              {/* Agent Image Card with Subtle Gradient Background */}
              <div className="relative w-full h-[340px] sm:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#F0F6FA] to-[#E2ECF4] mb-5">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Agent Info */}
              <div className="flex flex-col text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1C3A62]">
                  {agent.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#585858] font-medium mt-1 mb-3">
                  {agent.role}
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-2">
                  <a
                    href={agent.socials.facebook}
                    aria-label={`${agent.name}'s Facebook`}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-[#585858] hover:border-[#2495D3] hover:bg-[#2495D3] hover:text-white transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a
                    href={agent.socials.twitter}
                    aria-label={`${agent.name}'s Twitter`}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-[#585858] hover:border-[#2495D3] hover:bg-[#2495D3] hover:text-white transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a
                    href={agent.socials.instagram}
                    aria-label={`${agent.name}'s Instagram`}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-[#585858] hover:border-[#2495D3] hover:bg-[#2495D3] hover:text-white transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a
                    href={agent.socials.profile}
                    aria-label={`${agent.name}'s Profile`}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-[#585858] hover:border-[#2495D3] hover:bg-[#2495D3] hover:text-white transition-all duration-200"
                  >
                    <User className="w-3.5 h-3.5" />
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

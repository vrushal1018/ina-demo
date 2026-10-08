import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  UsersRound,
  ClipboardCheck,
  Leaf,
  Wrench,
  ArrowRightLeft
} from 'lucide-react';

export default function ServicesSection() {
  const services = [
    { name: 'Hard FM', icon: Building2, link: '/services/hard-fm' },
    { name: 'Allied Services', icon: UsersRound, link: '/services/allied-services' },
    { name: 'Audit & Offerings', icon: ClipboardCheck, link: '/services/audit-and-offerings' },
    { name: 'Sustainability Services', icon: Leaf, link: '/services/sustainability-services' },
    { name: 'Technical Services', icon: Wrench, link: '/services/technical-services' },
    { name: 'Transition Services', icon: ArrowRightLeft, link: '/services/transition-services' },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* Left Side: Image Container */}
        <div className="w-full md:w-1/3 relative flex justify-center">
          <div className="relative w-64 h-80 rounded-t-[2rem] overflow-hidden bg-gray-200">
            <Image
              src="/services.avif"
              alt="Service Professional"
              layout="fill"
              objectFit="cover"
              className="rounded-t-[2rem]"
            />
            {/* Bottom white curved overlay mimicking the design cutout */}
            <div className="absolute -bottom-1 left-0 right-0 h-8 bg-white rounded-t-[2rem]"></div>
          </div>
        </div>

        {/* Right Side: Content & Grid */}
        <div className="w-full md:w-2/3">
          {/* Made the heading section smaller by adjusting text sizes and bottom margin */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
              Best practice services for best customer outcomes
            </h2>
            <p className="text-gray-600 text-base">
              We're on a mission to make your people and places the best they can be.
            </p>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-gray-200 mb-10"></div> {/* Increased margin below divider */}

          {/* Services Grid: Increased gap sizes for more breathing room */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link href={service.link} key={index} className="flex items-center space-x-4 group cursor-pointer hover:text-[#2495D3]">
                  <div className="text-gray-600 flex-shrink-0 group-hover:text-[#2495D3] transition-colors">
                    {/* Slightly larger icon size (32) to fill the new space nicely */}
                    <IconComponent strokeWidth={1.5} size={32} />
                  </div>
                  {/* Slightly larger text to make services stand out more */}
                  <span className="text-gray-800 font-medium text-[16px] group-hover:text-[#2495D3] transition-colors">
                    {service.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
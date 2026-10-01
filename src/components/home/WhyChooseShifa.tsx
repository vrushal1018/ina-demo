import React from 'react';
import Image from 'next/image';
import { CheckCheck } from 'lucide-react';

interface FeatureItem {
  id: number;
  text: string;
}

const features: FeatureItem[] = [
  { id: 1, text: 'Experienced & Certified Doctors' },
  { id: 2, text: '24/7 Medical Support' },
  { id: 3, text: 'Advanced Technology' },
  { id: 4, text: 'Patient-Centric Approach' },
  { id: 5, text: 'Seamless Online Appointments' },
];

export default function WhyChooseShifa() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C3A62] tracking-tight">
            Why Choose Shifa?
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg text-[#585858] font-medium">
            Your health, our commitment – here’s what sets us apart.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Image */}
          <div className="lg:col-span-7 relative w-full h-[280px] sm:h-[400px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
              alt="Doctor talking to patient"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Right: Key Features */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#383838] mb-5 sm:mb-6">
              Key Features
            </h3>

            <div className="flex flex-col gap-3">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-[#F8FAFC] border border-[#2495D3]/10 hover:border-[#2495D3]/30 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 text-[#2495D3]">
                    <CheckCheck className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#383838]">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

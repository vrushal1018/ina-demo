'use client';

import React from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  User, 
  Building2, 
  BookOpen 
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <div className="min-h-screen bg-white font-sans">
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Contact Information */}
            <div>
              <div className="mb-4 inline-block rounded-full bg-[#2495D3]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#2495D3]">
                Get in Touch
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1C3A62] mb-6 tracking-tight">
                Contact information
              </h2>
              <p className="text-[#585858] mb-10 leading-relaxed max-w-md font-medium text-lg">
                We help you find direction, remove friction, and keep your business moving
                forward—strategically and confidently.
              </p>

              <div className="space-y-6 mb-10">
                {/* Phone */}
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full bg-[#f0f4f8] group-hover:bg-[#2495D3] group-hover:text-white flex items-center justify-center text-[#1C3A62] transition-colors duration-300">
                    <Phone className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[#1C3A62] font-medium text-lg">+1 561 301 4406</span>
                </div>
                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full bg-[#f0f4f8] group-hover:bg-[#2495D3] group-hover:text-white flex items-center justify-center text-[#1C3A62] transition-colors duration-300">
                    <Mail className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[#1C3A62] font-medium text-lg">info@Advizo.com</span>
                </div>
                {/* Address */}
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full bg-[#f0f4f8] group-hover:bg-[#2495D3] group-hover:text-white flex items-center justify-center text-[#1C3A62] transition-colors duration-300">
                    <MapPin className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[#1C3A62] font-medium text-lg">Newtown, CT 06482</span>
                </div>
                {/* Hours */}
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full bg-[#f0f4f8] group-hover:bg-[#2495D3] group-hover:text-white flex items-center justify-center text-[#1C3A62] transition-colors duration-300">
                    <Clock className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[#1C3A62] font-medium text-lg">Mon - Fri, 9:00 AM - 6:00 PM</span>
                </div>
              </div>

              {/* Map Embed */}
              <div className="w-full h-72 rounded-[2rem] overflow-hidden shadow-lg border border-gray-100">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11974.776610022207!2d-73.3101037!3d41.4131481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7e0e7a2b0e7a1%3A0x6b107e335b31f79!2sNewtown%2C%20CT%2006482!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-[#F8F9FA] p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 h-fit">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1C3A62] mb-4 tracking-tight">
                Send Us a Message
              </h2>
              <p className="text-[#585858] mb-8 leading-relaxed font-medium">
                Fill up the form and our team will get back to you within 24 hours.
              </p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* First Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#1C3A62]">First name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400 stroke-[2]" />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter first name"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 bg-white shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#1C3A62]">Last name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400 stroke-[2]" />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter last name"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 bg-white shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#1C3A62]">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400 stroke-[2]" />
                      </div>
                      <input
                        type="email"
                        placeholder="Enter email"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 bg-white shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#1C3A62]">Phone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-gray-400 stroke-[2]" />
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter phone"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 bg-white shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#1C3A62]">Company Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building2 className="h-4 w-4 text-gray-400 stroke-[2]" />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter company name"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 bg-white shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#1C3A62]">Subject</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <BookOpen className="h-4 w-4 text-gray-400 stroke-[2]" />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Subject"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 bg-white shadow-sm transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-2 mt-4">
                  <label className="text-sm font-medium text-[#1C3A62]">Message</label>
                  <textarea
                    placeholder="Type here..."
                    rows={5}
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 resize-none bg-white shadow-sm transition-all"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#1C3A62] hover:bg-[#2495D3] text-white px-8 py-4 rounded-full font-medium uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </section>
      </div>
    </>
  );
}

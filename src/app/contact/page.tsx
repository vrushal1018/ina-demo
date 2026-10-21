'use client';

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Building2,
  BookOpen,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import AnimateIn from "@/components/AnimateIn";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!firstName.trim()) {
      setErrorMessage("Please enter your first name.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!message.trim()) {
      setErrorMessage("Please enter your message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("Contact submission error:", err);
      const message = err instanceof Error ? err.message : "Failed to send your message. Please check your network or try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setSubject("");
    setMessage("");
    setErrorMessage(null);
    setIsSubmitted(false);
  };

  return (
    <>
      <SiteHeader />
      <div className="relative min-h-screen bg-gradient-to-b from-[#F0F7FD]/40 via-white to-slate-50 font-sans overflow-hidden">
        {/* Background blueprint dots */}
        <div className="absolute inset-0 blueprint-dots opacity-40 pointer-events-none" />
        {/* Architectural linework stream */}
        <ArchitecturalLineworkBackground theme="light" opacity={0.25} mask="fade-edges" />

        <section className="relative z-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 text-[#2495D3] text-xs font-semibold uppercase tracking-wider mb-4">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </div>
              <div className="hidden rounded-full bg-[#2495D3]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#2495D3]">
                Get in Touch
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C3A62] mb-4 tracking-normal">
                Contact information
              </h2>
              <div className="w-16 h-1 bg-[#2495D3] mb-6 rounded-full" />
              <p className="text-[#585858] mb-10 leading-relaxed font-normal text-base sm:text-lg">
                We help you find direction, remove friction, and keep your business moving
                forward—strategically and confidently.
              </p>

              {/* Contact detail cards */}
              <div className="space-y-4 mb-10">
                {/* Phone */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#2495D3] hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F7FD] group-hover:bg-[#2495D3] group-hover:text-white flex items-center justify-center text-[#1C3A62] transition-colors duration-300 flex-shrink-0">
                    <Phone className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</div>
                    <a href="tel:+919326906715" className="text-[#1C3A62] font-semibold text-base sm:text-lg hover:text-[#2495D3] transition-colors">
                      +91-9326906715
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#2495D3] hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F7FD] group-hover:bg-[#2495D3] group-hover:text-white flex items-center justify-center text-[#1C3A62] transition-colors duration-300 flex-shrink-0">
                    <Mail className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</div>
                    <a href="mailto:connect@inatechfmglobal.com" className="text-[#1C3A62] font-semibold text-sm sm:text-base hover:text-[#2495D3] transition-colors truncate block">
                      connect@inatechfmglobal.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#2495D3] hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F7FD] group-hover:bg-[#2495D3] group-hover:text-white flex items-center justify-center text-[#1C3A62] transition-colors duration-300 flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Headquarters</div>
                    <span className="text-[#1C3A62] font-medium text-sm sm:text-base leading-relaxed block">
                      1st Floor, MBC Park, Kasarvadavli,Near Big Mall, Thane (W) – 400615, Maharashtra


                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#2495D3] hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F7FD] group-hover:bg-[#2495D3] group-hover:text-white flex items-center justify-center text-[#1C3A62] transition-colors duration-300 flex-shrink-0">
                    <Clock className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Business Hours</div>
                    <span className="text-[#1C3A62] font-medium text-sm sm:text-base">
                      Mon - Fri, 9:00 AM - 6:00 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <AnimateIn delay={0.2} minHeight="280px" className="w-full">
                <div className="w-full h-72 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80">
                  <iframe
                    title="Location Map"
                    src="https://www.google.com/maps?q=1st+Floor%2C+MBC+Park%2C+Kasarvadavli%2C+Sainath+Nagar%2C+Thane+West%2C+Maharashtra+400615&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </AnimateIn>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <AnimateIn delay={0.15} minHeight="550px">
                <div className="relative bg-white p-8 sm:p-10 lg:p-12 rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
                  {/* Top Accent Strip */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2495D3] to-[#1C3A62]" />

                  <h2 className="text-2xl sm:text-3xl font-normal text-[#1C3A62] mb-2 tracking-normal">
                    Send Us a Message
                  </h2>
                  <p className="text-[#585858] mb-8 leading-relaxed font-normal text-sm sm:text-base">
                    Fill up the form and our team will get back to you within 24 hours.
                  </p>

                  {isSubmitted ? (
                    <div className="py-12 text-center space-y-5 animate-in fade-in duration-500">
                      <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-normal text-[#1C3A62]">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-sm sm:text-base text-[#585858] max-w-md mx-auto leading-relaxed">
                          Thank you, <strong className="text-[#1C3A62]">{firstName}</strong>. Your inquiry has been forwarded directly to our team at{" "}
                          <strong className="text-[#2495D3]">connect@inatechfmglobal.com</strong>.
                        </p>
                        <p className="text-xs text-slate-400 pt-1">
                          We have received your message and will get back to you within 24 hours.
                        </p>
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="bg-[#1C3A62] hover:bg-[#2495D3] text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer active:scale-95"
                        >
                          Send Another Message
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      {/* Error Banner */}
                      {errorMessage && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm animate-in fade-in">
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                          <div className="leading-relaxed font-medium">{errorMessage}</div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* First Name */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#1C3A62]">
                            First name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <User className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                              type="text"
                              required
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="Enter first name"
                              disabled={isSubmitting}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-slate-400 bg-slate-50/70 focus:bg-white shadow-sm transition-all disabled:opacity-60 text-[#1C3A62]"
                            />
                          </div>
                        </div>

                        {/* Last Name */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#1C3A62]">Last name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <User className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Enter last name"
                              disabled={isSubmitting}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-slate-400 bg-slate-50/70 focus:bg-white shadow-sm transition-all disabled:opacity-60 text-[#1C3A62]"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#1C3A62]">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <Mail className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter email"
                              disabled={isSubmitting}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-slate-400 bg-slate-50/70 focus:bg-white shadow-sm transition-all disabled:opacity-60 text-[#1C3A62]"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#1C3A62]">Phone</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <Phone className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Enter phone"
                              disabled={isSubmitting}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-slate-400 bg-slate-50/70 focus:bg-white shadow-sm transition-all disabled:opacity-60 text-[#1C3A62]"
                            />
                          </div>
                        </div>

                        {/* Company Name */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#1C3A62]">Company Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <Building2 className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                              type="text"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              placeholder="Enter company name"
                              disabled={isSubmitting}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-slate-400 bg-slate-50/70 focus:bg-white shadow-sm transition-all disabled:opacity-60 text-[#1C3A62]"
                            />
                          </div>
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#1C3A62]">Subject</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <BookOpen className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                              type="text"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              placeholder="Enter subject"
                              disabled={isSubmitting}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-slate-400 bg-slate-50/70 focus:bg-white shadow-sm transition-all disabled:opacity-60 text-[#1C3A62]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Message Textarea */}
                      <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#1C3A62]">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your message here..."
                          rows={5}
                          disabled={isSubmitting}
                          className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-slate-400 resize-none bg-slate-50/70 focus:bg-white shadow-sm transition-all disabled:opacity-60 text-[#1C3A62]"
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#2495D3] hover:bg-[#1C3A62] disabled:opacity-75 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold uppercase tracking-wider text-sm transition-all duration-300 shadow-lg shadow-[#2495D3]/20 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Sending Message...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Send Message</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

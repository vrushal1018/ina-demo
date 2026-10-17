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
  AlertCircle
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import AnimateIn from "@/components/AnimateIn";

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
    } catch (err: any) {
      console.error("Contact submission error:", err);
      setErrorMessage(
        err.message || "Failed to send your message. Please check your network or try again."
      );
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
                  <a href="tel:+919326906715" className="text-[#1C3A62] font-medium text-lg hover:text-[#2495D3] transition-colors">
                    +91-9326906715
                  </a>
                </div>
                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full bg-[#f0f4f8] group-hover:bg-[#2495D3] group-hover:text-white flex items-center justify-center text-[#1C3A62] transition-colors duration-300">
                    <Mail className="w-6 h-6 stroke-[2]" />
                  </div>
                  <a href="mailto:connect@inatechfmglobal.com" className="text-[#1C3A62] font-medium text-lg hover:text-[#2495D3] transition-colors">
                    connect@inatechfmglobal.com
                  </a>
                </div>
                {/* Address */}
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full bg-[#f0f4f8] group-hover:bg-[#2495D3] group-hover:text-white flex items-center justify-center text-[#1C3A62] transition-colors duration-300">
                    <MapPin className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[#1C3A62] font-medium text-lg">1st Floor, MBC Park, Kasarvadavli, Sainath Nagar, Near Big Mall, Thane (W) – 400615, Maharashtra</span>
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
              <AnimateIn delay={0.2} minHeight="288px" className="w-full">
                <div className="w-full h-72 rounded-[2rem] overflow-hidden shadow-lg border border-gray-100">
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
            <AnimateIn delay={0.15} minHeight="550px">
              <div className="bg-[#F8F9FA] p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 h-fit">
                <h2 className="text-3xl md:text-4xl font-semibold text-[#1C3A62] mb-4 tracking-tight">
                  Send Us a Message
                </h2>
                <p className="text-[#585858] mb-8 leading-relaxed font-medium">
                  Fill up the form and our team will get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <div className="py-10 text-center space-y-5 animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-[#1C3A62]">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-sm sm:text-base text-[#585858] max-w-md mx-auto leading-relaxed">
                        Thank you, <strong className="text-[#1C3A62]">{firstName}</strong>. Your inquiry has been forwarded directly to our team at{" "}
                        <strong className="text-[#2495D3]">connect@inatechfmglobal.com</strong>.
                      </p>
                      <p className="text-xs text-gray-500 pt-1">
                        We have received your message and will get back to you within 24 hours.
                      </p>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="bg-[#1C3A62] hover:bg-[#2495D3] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm animate-in fade-in">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                        <div className="leading-relaxed font-medium">{errorMessage}</div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                      {/* First Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#1C3A62]">
                          First name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-gray-400 stroke-[2]" />
                          </div>
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter first name"
                            disabled={isSubmitting}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 bg-white shadow-sm transition-all disabled:opacity-60"
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
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter last name"
                            disabled={isSubmitting}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 bg-white shadow-sm transition-all disabled:opacity-60"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#1C3A62]">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-4 w-4 text-gray-400 stroke-[2]" />
                          </div>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            disabled={isSubmitting}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 bg-white shadow-sm transition-all disabled:opacity-60"
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone"
                            disabled={isSubmitting}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 bg-white shadow-sm transition-all disabled:opacity-60"
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
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Enter company name"
                            disabled={isSubmitting}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 bg-white shadow-sm transition-all disabled:opacity-60"
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
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter subject"
                            disabled={isSubmitting}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 bg-white shadow-sm transition-all disabled:opacity-60"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col gap-2 mt-4">
                      <label className="text-sm font-medium text-[#1C3A62]">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        rows={5}
                        disabled={isSubmitting}
                        className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm placeholder:text-gray-400 resize-none bg-white shadow-sm transition-all disabled:opacity-60"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#1C3A62] hover:bg-[#2495D3] disabled:opacity-75 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-medium uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
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
        </section>
      </div>
    </>
  );
}

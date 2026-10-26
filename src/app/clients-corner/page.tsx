"use client";

import React from "react";
import SiteHeader from "@/components/SiteHeader";
import ClientsCorner from "@/components/ClientsCorner";

export default function ClientsCornerPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA]">
      <SiteHeader />
      <main>
        <ClientsCorner />
      </main>
    </div>
  );
}

"use client";

import React from "react";
import SiteHeader from "@/components/SiteHeader";
import ClientsCorner from "@/components/ClientsCorner";

export default function ClientsCornerPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-ina-tint-15 to-ina-tint-8">
      <SiteHeader />
      <main className="pt-14 sm:pt-16">
        <ClientsCorner />
      </main>
    </div>
  );
}

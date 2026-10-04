"use client";

import React from "react";
import SiteHeader from "@/components/SiteHeader";
import dynamic from "next/dynamic";

const ClientsCorner = dynamic(() => import("@/components/ClientsCorner"), {
  ssr: false,
});

export default function ClientsCornerPage() {
  return (
    <div className="relative min-h-screen bg-transparent">
      <SiteHeader />
      <main>
        <ClientsCorner />
      </main>
    </div>
  );
}

import React from "react";
import SiteHeader from "@/components/SiteHeader";
import ClientsCorner from "@/components/ClientsCorner";

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

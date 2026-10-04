"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the 3D scene with SSR disabled to prevent hydration
// and Next.js soft-navigation issues with WebGL/Canvas.
const ClientsCorner = dynamic(() => import("./ClientsCorner"), {
  ssr: false,
});

export default function ClientsCornerWrapper() {
  return <ClientsCorner />;
}

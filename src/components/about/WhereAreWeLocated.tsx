"use client";

import React, {
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import * as ReactDOMClient from "react-dom/client";

import { Canvas, useFrame } from "@react-three/fiber";

import {
  Html,
  Line,
  OrbitControls,
  useTexture,
} from "@react-three/drei";

import * as THREE from "three";

import {
  MapPin,
  Navigation,
  Building2,
  ExternalLink,
  Globe2,
} from "lucide-react";

import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

/* =========================================================
   REACT 19 COMPATIBILITY PATCH FOR @react-three/drei <Html>
   In React 19, drei's <Html> calls root.unmount() synchronously
   inside useLayoutEffect cleanup, triggering:
   "Attempted to synchronously unmount a root while React was already rendering".
   Deferring root.unmount via setTimeout(..., 0) runs it after the current
   render/commit phase finishes, preventing race conditions and console errors.
========================================================= */

if (typeof window !== "undefined") {
  // 1. Defer createRoot().unmount() to avoid synchronous unmounting during layout phase
  const origCreateRoot = (ReactDOMClient as any).createRoot;
  if (origCreateRoot && !(origCreateRoot as any).__react19DeferredUnmount) {
    const wrappedCreateRoot = function (
      container: Element | DocumentFragment,
      options?: any
    ) {
      const root = origCreateRoot.call(ReactDOMClient, container, options);
      const origUnmount = root.unmount.bind(root);
      root.unmount = function () {
        setTimeout(() => {
          try {
            origUnmount();
          } catch {
            // Root may already have been unmounted
          }
        }, 0);
      };
      return root;
    };
    wrappedCreateRoot.__react19DeferredUnmount = true;
    try {
      (ReactDOMClient as any).createRoot = wrappedCreateRoot;
    } catch {
      // Ignore if property is read-only
    }
  }

  // 2. Intercept and silence this specific React 19 internal warning in console
  const origConsoleError = console.error;
  if (origConsoleError && !(origConsoleError as any).__react19UnmountSilenced) {
    const patchedConsoleError = function (...args: any[]) {
      if (
        typeof args[0] === "string" &&
        args[0].includes("Attempted to synchronously unmount a root while React was already rendering")
      ) {
        return;
      }
      origConsoleError.apply(console, args);
    };
    patchedConsoleError.__react19UnmountSilenced = true;
    console.error = patchedConsoleError;
  }
}

/* =========================================================
   TYPES
========================================================= */

interface Location {
  id: number;
  city: string;
  country: string;
  address: string;
  lat: number;
  lng: number;

  // Offsets in the globe's local tangent plane.
  // Larger values provide more space between labels.
  labelOffset: [number, number];
}

/* =========================================================
   OFFICE LOCATIONS

   Each offset is tuned individually to spread the labels
   around the India region while keeping their real locations.
========================================================= */

const locations: Location[] = [
  {
    id: 1,
    city: "Mumbai · HQ",
    country: "Maharashtra",
    address:
      "1st Floor, MBC Park, Kasarvadavli, Sainath Nagar, Near Big Mall, Thane (W) – 400607",
    lat: 19.2684,
    lng: 72.9669,
    labelOffset: [-0.92, 0.40],
  },
  {
    id: 2,
    city: "Kochi",
    country: "Kerala",
    address:
      "32/15778, Springs Cascade, Opp. EMC Hospital, Peringatt Road, Palarivattom, Ernakulam – 682025",
    lat: 9.9982,
    lng: 76.3078,
    labelOffset: [-0.85, -0.72],
  },
  {
    id: 3,
    city: "Hyderabad",
    country: "Telangana",
    address:
      "4th Floor, House Bearing No: 8-4-369/1/1/2, Hemavathi Nagar, Meter Factory Road, Erragadda, Hyderabad – 500018",
    lat: 17.4583,
    lng: 78.4419,
    labelOffset: [0.88, 0.38],
  },
  {
    id: 4,
    city: "Indore",
    country: "Madhya Pradesh",
    address:
      "101, A, Trade Centre, 18th, South Tukoganj, Near Crown Plaza Hotel, Indore – 452001",
    lat: 22.7161,
    lng: 75.8823,
    labelOffset: [-0.60, 0.96],
  },
  {
    id: 5,
    city: "Kolkata",
    country: "West Bengal",
    address:
      "2nd Floor, Unit No ASO 228, Bharti Astra Tower, Rajarhat, Newtown, Kolkata – 700156",
    lat: 22.5833,
    lng: 88.4667,
    labelOffset: [1.02, 0.82],
  },
  {
    id: 6,
    city: "Bengaluru",
    country: "Karnataka",
    address:
      "101, Flat No. 003, NGR Patel Paradise, Ground Floor, Wasa Layout, Doddanekkundi, Bangalore – 560037",
    lat: 12.9719,
    lng: 77.6974,
    labelOffset: [0.72, -0.80],
  },
  {
    id: 7,
    city: "Chennai",
    country: "Tamil Nadu",
    address:
      "No. 1/181 A, Bajanai Kovil Street, Injambakkam, Chennai – 600115",
    lat: 12.9224,
    lng: 80.2505,
    labelOffset: [1.12, -0.35],
  },
  {
    id: 8,
    city: "Noida",
    country: "Uttar Pradesh",
    address:
      "Office No. 201, Block -A Plot No. 82, Sector -63, Noida – 201307",
    lat: 28.628,
    lng: 77.3789,
    labelOffset: [0.42, 1.05],
  },
  {
    id: 9,
    city: "Ahmedabad",
    country: "Gujarat",
    address:
      "Office No 39 S.F, J B Tower, Opp Doordarshan Kendra, Drive In Road, Thaltej, Ahmedabad – 380054",
    lat: 23.0487,
    lng: 72.5273,
    labelOffset: [-1.10, 0.90],
  },
  {
    id: 10,
    city: "Pune",
    country: "Maharashtra",
    address:
      "G-411, 3rd Floor, Mega Centre, Hadapsar, Pune – 411028",
    lat: 18.5039,
    lng: 73.9288,
    labelOffset: [-1.15, -0.12],
  },
  {
    id: 11,
    city: "Goa",
    country: "Goa",
    address:
      "House No M-53/11, Flat No: S-Iv, Soares Apts., Mollar Corlim, Panjim – 403110",
    lat: 15.4989,
    lng: 73.8278,
    labelOffset: [-0.42, -1.02],
  },
];

/* =========================================================
   GOOGLE MAPS
========================================================= */

function openGoogleMaps(loc: Location) {
  const query = `${loc.address}, ${loc.city}, ${loc.country}, India`;

  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

/* =========================================================
   LATITUDE / LONGITUDE → GLOBE POSITION
========================================================= */

function latLngToGlobePosition(
  lat: number,
  lng: number,
  radius: number
): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* =========================================================
   SPREAD LABELS ALONG THE LOCAL GLOBE SURFACE

   Unlike global X/Y offsets, these offsets follow the local
   geographic directions at each office.

   eastOffset: moves a label east or west.
   northOffset: moves a label north or south.

   The connector still begins at the true coordinates.
========================================================= */

function getSpreadLabelPosition(
  lat: number,
  lng: number,
  offset: [number, number],
  radius: number
): THREE.Vector3 {
  const latitude = THREE.MathUtils.degToRad(lat);
  const longitude = THREE.MathUtils.degToRad(lng);

  const actualPosition = latLngToGlobePosition(lat, lng, 1).normalize();

  // Local east direction on the globe.
  const east = new THREE.Vector3(
    Math.sin(longitude),
    0,
    -Math.cos(longitude)
  ).normalize();

  // Local north direction on the globe.
  const north = new THREE.Vector3(
    Math.sin(latitude) * Math.cos(longitude),
    Math.cos(latitude),
    Math.sin(latitude) * Math.sin(longitude)
  ).normalize();

  // Move along the local tangent plane, then project back
  // onto the sphere so labels remain arranged around the globe.
  return actualPosition
    .clone()
    .addScaledVector(east, offset[0])
    .addScaledVector(north, offset[1])
    .normalize()
    .multiplyScalar(radius);
}

/* =========================================================
   CLICKABLE GLOBE LABEL
========================================================= */

function GlobeLocationLabel({
  loc,
  isSelected,
  onSelectLocation,
  portalRef,
}: {
  loc: Location;
  isSelected: boolean;
  onSelectLocation: (loc: Location) => void;
  portalRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const actualPosition = useMemo(
    () => latLngToGlobePosition(loc.lat, loc.lng, 2.012),
    [loc.lat, loc.lng]
  );

  const labelPosition = useMemo(
    () =>
      getSpreadLabelPosition(
        loc.lat,
        loc.lng,
        loc.labelOffset,
        2.045
      ),
    [loc.lat, loc.lng, loc.labelOffset]
  );

  const positionArray = useMemo(
    () => labelPosition.toArray(),
    [labelPosition]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onSelectLocation(loc);
      openGoogleMaps(loc);
    },
    [loc, onSelectLocation]
  );

  return (
    <group>
      {/* Subtle connector to the actual office coordinates */}
      <Line
        points={[actualPosition, labelPosition]}
        color={isSelected ? "#FFFFFF" : "#70C9FF"}
        transparent
        opacity={isSelected ? 0.95 : 0.65}
        lineWidth={1}
        depthTest
      />

      {/* Compact office label */}
      <Html
        position={positionArray}
        center
        distanceFactor={7.5}
        occlude
        portal={portalRef as any}
        zIndexRange={[30, 0]}
        style={{
          pointerEvents: "auto",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        <button
          type="button"
          aria-label={`Open ${loc.city} office in Google Maps`}
          title={`Open ${loc.city} in Google Maps`}
          onClick={handleClick}
          className={`
            flex items-center gap-1
            whitespace-nowrap rounded-md border
            px-1.5 py-1
            text-[9px] font-semibold leading-tight
            shadow-md backdrop-blur-md
            transition-colors duration-200
            sm:px-2 sm:py-1
            sm:text-[10px]
            ${isSelected
              ? "border-white/80 bg-[#2495D3] text-white shadow-[0_0_12px_rgba(36,149,211,0.45)]"
              : "border-white/25 bg-[#102744]/90 text-white hover:border-[#70C9FF] hover:bg-[#2495D3]"
            }
          `}
        >
          <MapPin
            className="h-2.5 w-2.5 shrink-0 text-[#70C9FF]"
          />

          <span>{loc.city}</span>

          <ExternalLink
            className="h-2 w-2 shrink-0 opacity-70"
          />
        </button>
      </Html>
    </group>
  );
}

/* =========================================================
   EARTH GLOBE
========================================================= */

function EarthGlobe({
  activeLocation,
  onSelectLocation,
  portalRef,
}: {
  activeLocation: Location | null;
  onSelectLocation: (loc: Location) => void;
  portalRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const globeRef = useRef<THREE.Group>(null);

  const earthTexture = useTexture(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
    (texture) => {
      if (texture instanceof THREE.Texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
      }
    }
  );

  useFrame((_, delta) => {
    if (!globeRef.current) return;
    // Skip continuous auto-rotation animation on mobile to eliminate GPU lag and scrolling stutter
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    globeRef.current.rotation.y += delta * 0.10;
  });

  return (
    <group ref={globeRef} rotation={[0, -2.2, 0]}>
      {/* EARTH SURFACE */}
      <mesh>
        <sphereGeometry args={[2, 96, 96]} />

        <meshStandardMaterial
          map={earthTexture}
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>

      {/* ATMOSPHERE */}
      <mesh>
        <sphereGeometry args={[2.055, 64, 64]} />

        <meshBasicMaterial
          color="#2495D3"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* OFFICE LABELS */}
      {locations.map((loc) => (
        <GlobeLocationLabel
          key={loc.id}
          loc={loc}
          isSelected={activeLocation?.id === loc.id}
          onSelectLocation={onSelectLocation}
          portalRef={portalRef}
        />
      ))}
    </group>
  );
}

/* =========================================================
   GLOBE SCENE
========================================================= */

function GlobeScene({
  activeLocation,
  onSelectLocation,
  portalRef,
}: {
  activeLocation: Location | null;
  onSelectLocation: (loc: Location) => void;
  portalRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 4, 6]}
        intensity={2.2}
      />

      <pointLight
        position={[-4, 2, -3]}
        intensity={25}
        color="#2495D3"
      />

      <Suspense fallback={null}>
        <EarthGlobe
          activeLocation={activeLocation}
          onSelectLocation={onSelectLocation}
          portalRef={portalRef}
        />
      </Suspense>

      <OrbitControls
        enableZoom
        enablePan={false}
        enableRotate
        minDistance={4.5}
        maxDistance={9}
        rotateSpeed={0.5}
        zoomSpeed={0.7}
        enableDamping
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={(Math.PI * 4) / 5}
      />
    </>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WhereAreWeLocated() {
  const [activeLocation, setActiveLocation] =
    useState<Location | null>(locations[0]);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const handleSelectLocation = useCallback(
    (loc: Location) => {
      setActiveLocation(loc);
    },
    []
  );

  return (
    <section
      className="
        relative w-full overflow-hidden
        border-t border-[#2495D3]/20
        bg-gradient-to-b from-[#E2F1FA] to-[#D9EDF8] px-4 py-10
        font-sans sm:px-6 sm:py-14
        lg:px-12 lg:py-16
      "
    >
      <div className="blueprint-dots pointer-events-none absolute inset-0 opacity-30" />

      <ArchitecturalLineworkBackground
        theme="light"
        opacity={0.2}
        mask="fade-edges"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* SECTION HEADING */}
        <div className="mx-auto mb-6 max-w-3xl space-y-2.5 text-center sm:mb-8">
          <div
            className="
              inline-flex items-center gap-2
              rounded-full border border-[#2495D3]/20
              bg-[#2495D3]/10 px-3.5 py-1.5
              text-xs font-semibold tracking-wide
              text-[#2495D3]
            "
          >
            <Globe2 className="h-3.5 w-3.5" />
            <span>Our presence</span>
          </div>

          <h2 className="text-2xl font-normal tracking-normal text-[#1C3A62] sm:text-3xl lg:text-4xl">
            Where are we located?
          </h2>

          <p className="text-sm text-[#585858] sm:text-base">
            Explore Ina TechFM&apos;s network of offices across India.
          </p>

          <div className="mx-auto h-1 w-12 rounded-full bg-[#2495D3]" />
        </div>

        {/* MAIN CONTENT */}
        <div
          className="
            grid grid-cols-1 items-center gap-6
            rounded-3xl border border-slate-200/80
            bg-[#F8FAFC] p-4 shadow-lg
            sm:gap-8 sm:p-6
            lg:grid-cols-12 lg:p-8
          "
        >
          {/* ROTATING EARTH */}
          <div
            ref={canvasContainerRef}
            className="
              relative h-[340px] w-full overflow-hidden
              rounded-2xl
              bg-gradient-to-b from-[#102744] via-[#07182D] to-[#030B16]
              sm:h-[400px]
              lg:col-span-8 lg:h-[480px]
            "
          >
            <div
              className="
                pointer-events-none absolute left-1/2 top-1/2
                h-[300px] w-[300px]
                -translate-x-1/2 -translate-y-1/2
                rounded-full bg-[#2495D3]/10 blur-[90px]
                sm:h-[400px] sm:w-[400px]
              "
            />

            <Canvas
              camera={{
                position: [0, 0, 6.6],
                fov: 42,
              }}
              dpr={[1, 1.75]}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
            >
              <GlobeScene
                activeLocation={activeLocation}
                onSelectLocation={handleSelectLocation}
                portalRef={canvasContainerRef}
              />
            </Canvas>

            {/* TOP LABEL */}
            <div
              className="
                pointer-events-none absolute left-4 top-4
                flex items-center gap-2
                rounded-lg border border-white/10
                bg-[#102744]/75 px-3 py-2
                text-xs text-white/80 backdrop-blur-md
              "
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#2495D3]" />
              <span>INA TECHFM • GLOBAL NETWORK</span>
            </div>

            {/* INTERACTION HINT */}
            <div
              className="
                pointer-events-none absolute bottom-4 left-4
                flex items-center gap-2
                rounded-lg border border-white/10
                bg-[#102744]/80 px-3 py-2
                text-[10px] text-white/80 backdrop-blur-md
                sm:text-xs
              "
            >
              <Navigation className="h-3.5 w-3.5 shrink-0 text-[#2495D3]" />

              <span>
                Drag to explore • Scroll to zoom • Click an office
              </span>
            </div>

            {/* LOCATION COUNT */}
            <div
              className="
                pointer-events-none absolute bottom-4 right-4
                rounded-lg border border-white/10
                bg-[#102744]/80 px-3 py-2
                text-xs text-white/80 backdrop-blur-md
              "
            >
              <span className="font-semibold text-[#2495D3]">
                {locations.length}
              </span>{" "}
              office locations
            </div>
          </div>

          {/* OFFICE DIRECTORY */}
          <div className="flex min-w-0 flex-col gap-3 lg:col-span-4">
            <div className="mb-1 flex items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-base font-semibold text-[#1C3A62] sm:text-lg">
                <Building2 className="h-5 w-5 shrink-0 text-[#2495D3]" />
                Our Offices
              </h3>

              <span className="rounded-full bg-[#2495D3]/10 px-2.5 py-1 text-xs font-medium text-[#2495D3]">
                {locations.length} Locations
              </span>
            </div>

            <p className="mb-1 text-sm leading-relaxed text-[#585858]">
              Select an office to open its address in Google Maps.
            </p>

            <div
              className="
                flex max-h-[460px] flex-col gap-2.5
                overflow-y-auto pr-1
              "
            >
              {locations.map((loc) => {
                const isActive = activeLocation?.id === loc.id;

                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      handleSelectLocation(loc);
                      openGoogleMaps(loc);
                    }}
                    className={`
                      group flex w-full flex-col justify-between
                      rounded-xl border p-3.5 text-left
                      transition-all duration-200
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#2495D3]
                      sm:p-4
                      ${isActive
                        ? "border-[#2495D3] bg-[#1C3A62] text-white shadow-md"
                        : "border-gray-200 bg-white text-[#383838] hover:-translate-y-0.5 hover:border-[#2495D3]/50 hover:bg-slate-50"
                      }
                    `}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span
                        className={`
                          text-sm font-semibold sm:text-base
                          ${isActive ? "text-white" : "text-[#1C3A62]"}
                        `}
                      >
                        {loc.city}
                      </span>

                      <span
                        className={`
                          whitespace-nowrap rounded-full px-2 py-0.5
                          text-[10px] font-medium sm:text-xs
                          ${isActive
                            ? "bg-[#2495D3] text-white"
                            : "bg-gray-100 text-[#585858]"
                          }
                        `}
                      >
                        {loc.country}
                      </span>
                    </div>

                    <p
                      className={`
                        mt-2 text-xs leading-relaxed
                        ${isActive ? "text-gray-300" : "text-[#585858]"}
                      `}
                    >
                      {loc.address}
                    </p>

                    <div
                      className={`
                        mt-3 flex items-center gap-1.5 text-xs font-medium
                        ${isActive
                          ? "text-[#70C9FF]"
                          : "text-[#2495D3] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                        }
                      `}
                    >
                      <MapPin className="h-3.5 w-3.5" />

                      View on Google Maps

                      <ExternalLink className="ml-auto h-3.5 w-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* DIRECTORY FOOTER */}
            <p className="mt-1 flex items-start gap-2 text-xs leading-relaxed text-[#585858]">
              <Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2495D3]" />

              <span>
                Our offices support coordinated facility management
                operations across multiple regions of India.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
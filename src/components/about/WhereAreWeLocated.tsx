"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useTransition,
  useCallback,
  Suspense,
} from "react";

import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";

import {
  OrbitControls,
  Html,
  Line,
  Grid,
  useTexture, // Added useTexture so it's ready for your map image
} from "@react-three/drei";

import * as THREE from "three";

import { MapPin, Navigation, Building2 } from "lucide-react";

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
}

/* =========================================================
   LOCATIONS
========================================================= */

const locations: Location[] = [
  {
    id: 1,
    city: "Mumbai [Head Office]",
    country: "Maharashtra",
    address:
      "1st Floor, MBC Park, Kasarvadavli, Sainath Nagar, Near Big Mall, Thane (W) – 400607",
    lat: 19.2684,
    lng: 72.9669,
  },
  {
    id: 2,
    city: "Kochi",
    country: "Kerala",
    address:
      "32/15778, Springs Cascade, Opp. EMC Hospital, Peringatt Road, Palarivattom, Ernakulam – 682025",
    lat: 9.9982,
    lng: 76.3078,
  },
  {
    id: 3,
    city: "Hyderabad",
    country: "Telangana",
    address:
      "4th Floor, House Bearing No: 8-4-369/1/1/2, Hemavathi Nagar, Meter Factory Road, Erragadda, Hyderabad – 500018",
    lat: 17.4583,
    lng: 78.4419,
  },
  {
    id: 4,
    city: "Indore",
    country: "Madhya Pradesh",
    address:
      "101, A, Trade Centre, 18th, South Tukoganj, Near Crown Plaza Hotel, Indore – 452001",
    lat: 22.7161,
    lng: 75.8823,
  },
  {
    id: 5,
    city: "Kolkata",
    country: "West Bengal",
    address:
      "2nd Floor, Unit No ASO 228, Bharti Astra Tower, Rajarhat, Newtown, Kolkata – 700156",
    lat: 22.5833,
    lng: 88.4667,
  },
  {
    id: 6,
    city: "Bengaluru",
    country: "Karnataka",
    address:
      "101, Flat No. 003, NGR Patel Paradise, Ground Floor, Wasa Layout, Doddanekkundi, Bangalore – 560037",
    lat: 12.9719,
    lng: 77.6974,
  },
  {
    id: 7,
    city: "Chennai",
    country: "Tamil Nadu",
    address:
      "No. 1/181 A, Bajanai Kovil Street, Injambakkam, Chennai – 600115",
    lat: 12.9224,
    lng: 80.2505,
  },
  {
    id: 8,
    city: "Noida",
    country: "Uttar Pradesh",
    address:
      "Office No. 201, Block -A Plot No. 82, Sector -63, Noida – 201307",
    lat: 28.628,
    lng: 77.3789,
  },
  {
    id: 9,
    city: "Ahmedabad",
    country: "Gujarat",
    address:
      "Office No 39 S.F, J B Tower, Opp Doordarshan Kendra, Drive In Road, Thaltej, Ahmedabad – 380054",
    lat: 23.0487,
    lng: 72.5273,
  },
  {
    id: 10,
    city: "Pune",
    country: "Maharashtra",
    address:
      "G-411, 3rd Floor, Mega Centre, Hadapsar, Pune – 411028",
    lat: 18.5039,
    lng: 73.9288,
  },
  {
    id: 11,
    city: "Goa",
    country: "Goa",
    address:
      "House No M-53/11, Flat No: S-Iv, Soares Apts., Mollar Corlim, Panjim – 403110",
    lat: 15.4989,
    lng: 73.8278,
  },
];

/* =========================================================
   FLAT PROJECTION (GEO → 2D Plane)
========================================================= */

function latLngToVector3(lat: number, lng: number): THREE.Vector3 {
  const scale = 0.35;
  // Center of India bounding box is roughly Lng: 83, Lat: 22.8
  const x = (lng - 83) * scale;
  const z = -(lat - 22.8) * scale;

  return new THREE.Vector3(x, 0, z);
}

/* =========================================================
   INDIA MAP OVERLAY (The Map on the Black Surface)
========================================================= */

function IndiaMapPlane() {
  const mapTexture = useTexture("/original-6a1bb1cdbd94bf7543f3ccf4957a28df.webp");

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
      {/* 
        This is perfectly scaled to match India's Latitude/Longitude 
        bounding box spread at our 0.35 scale factor. 
      */}
      <planeGeometry args={[10.0, 10.36]} />
      <meshBasicMaterial
        color="#4cb3eb"
        transparent
        opacity={0.5} 
        map={mapTexture} 
        depthWrite={false}
      />
    </mesh>
  );
}

/* =========================================================
   LOCATION MARKER (3D PIN)
========================================================= */

function LocationMarker({
  loc,
  activeLocation,
  onSelectLocation,
}: {
  loc: Location;
  activeLocation: Location | null;
  onSelectLocation: (loc: Location) => void;
}) {
  const isSelected = activeLocation?.id === loc.id;
  const position = latLngToVector3(loc.lat, loc.lng);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelectLocation(loc);
  };

  return (
    <group position={position}>
      {/* Ground Glow Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry
          args={[
            isSelected ? 0.15 : 0.08,
            isSelected ? 0.22 : 0.12,
            32,
          ]}
        />
        <meshBasicMaterial
          color={isSelected ? "#FFFFFF" : "#2495D3"}
          transparent
          opacity={isSelected ? 0.8 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Center dot on ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <circleGeometry args={[0.04, 16]} />
        <meshBasicMaterial color={isSelected ? "#FFFFFF" : "#2495D3"} />
      </mesh>

      {/* Vertical Pin Line */}
      <Line
        points={[
          [0, 0, 0],
          [0, isSelected ? 0.8 : 0.4, 0],
        ]}
        color={isSelected ? "#FFFFFF" : "#2495D3"}
        lineWidth={isSelected ? 2 : 1}
        transparent
        opacity={isSelected ? 0.9 : 0.4}
      />

      {/* Top Node */}
      <mesh
        position={[0, isSelected ? 0.8 : 0.4, 0]}
        onClick={handleClick}
        className="cursor-pointer"
      >
        <sphereGeometry args={[isSelected ? 0.06 : 0.04, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? "#FFFFFF" : "#2495D3"}
          emissive={isSelected ? "#FFFFFF" : "#000000"}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* HTML Label */}
      <Html
        position={[0, isSelected ? 0.95 : 0.55, 0]}
        center
        zIndexRange={[100, 0]}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelectLocation(loc);
          }}
          className="pointer-events-auto cursor-pointer"
        >
          <div
            className={`
              flex items-center gap-1.5 whitespace-nowrap rounded-lg border backdrop-blur-md shadow-lg transition-all duration-300
              ${isSelected
                ? "px-3 py-1.5 bg-[#1C3A62] text-white border-[#2495D3] scale-105"
                : "px-2 py-1 bg-white/90 text-[#1C3A62] border-white/50 opacity-80 hover:opacity-100 hover:scale-105"
              }
            `}
          >
            <MapPin
              className={
                isSelected
                  ? "w-3.5 h-3.5 text-[#2495D3]"
                  : "w-3 h-3 text-[#1C3A62]"
              }
            />
            <span
              className={
                isSelected
                  ? "text-xs font-semibold"
                  : "text-[10px] font-medium"
              }
            >
              {loc.city}
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}

/* =========================================================
   FLAT MAP GROUP (Slides to center active pin)
========================================================= */

function MapGroup({
  activeLocation,
  onSelectLocation,
}: {
  activeLocation: Location | null;
  onSelectLocation: (loc: Location) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const targetPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!activeLocation) return;
    const locPos = latLngToVector3(activeLocation.lat, activeLocation.lng);
    targetPosition.current.set(-locPos.x, 0, -locPos.z);
  }, [activeLocation]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.lerp(targetPosition.current, 0.05);
  });

  return (
    <group ref={groupRef}>

      {/* Sleek Black Base Plate */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[8.5, 8.5, 0.2, 64]} />
        <meshStandardMaterial
          color="#0F223D"
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Tech Grid Overlay */}
      <Grid
        position={[0, 0.005, 0]}
        args={[14, 14]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#2495D3"
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor="#2495D3"
        fadeDistance={10}
        fadeStrength={1}
      />

      {/* THE INDIA MAP LAYER */}
      <IndiaMapPlane />

      {/* Render all Locations */}
      {locations.map((loc) => (
        <LocationMarker
          key={loc.id}
          loc={loc}
          activeLocation={activeLocation}
          onSelectLocation={onSelectLocation}
        />
      ))}
    </group>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WhereAreWeLocated() {
  const [activeLocation, setActiveLocation] = useState<Location | null>(
    locations[0]
  );
  const [, startTransition] = useTransition();

  const handleSelectLocation = useCallback((loc: Location) => {
    startTransition(() => {
      setActiveLocation(loc);
    });
  }, []);

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#878787] uppercase block mb-3">
            Our Presence
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C3A62] tracking-tight">
            Where Are We Located?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#585858]">
            Explore our office hubs across India.
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#2495D3]/10">

          {/* 3D CANVAS */}
          <div className="lg:col-span-8 relative w-full h-[400px] sm:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1C3A62] to-[#0a1629]">
            <Canvas
              // Isometric-style angled camera setup
              camera={{ position: [0, 6, 7], fov: 45 }}
              dpr={[1, 2]}
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.5} />
              <pointLight position={[-5, 5, 2]} intensity={1} color="#2495D3" />

              <Suspense fallback={null}>
                <MapGroup
                  activeLocation={activeLocation}
                  onSelectLocation={handleSelectLocation}
                />
              </Suspense>

              <OrbitControls
                enableZoom={true}
                minDistance={3}
                maxDistance={14}
                enablePan={false}
                rotateSpeed={0.5}
                dampingFactor={0.05}
                enableDamping
                maxPolarAngle={Math.PI / 2.5}
                minPolarAngle={Math.PI / 6}
              />
            </Canvas>

            <div className="absolute bottom-4 left-4 bg-[#1C3A62]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white/80 flex items-center gap-2 pointer-events-none">
              <Navigation className="w-3.5 h-3.5 text-[#2495D3]" />
              Drag to rotate • Scroll to zoom
            </div>
          </div>

          {/* OFFICE LIST */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h3 className="text-lg font-medium text-[#1C3A62] mb-1 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#2495D3]" />
              Our Headquarters & Offices
            </h3>

            <div className="flex flex-col gap-2.5 max-h-[460px] overflow-y-auto pr-1">
              {locations.map((loc) => {
                const isActive = activeLocation?.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectLocation(loc)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 border flex flex-col justify-between 
                      ${isActive
                        ? "bg-[#1C3A62] text-white border-[#2495D3] shadow-md transform -translate-y-0.5"
                        : "bg-white text-[#383838] border-gray-200 hover:border-[#2495D3]/40 hover:bg-gray-50"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between w-full gap-2">
                      <span className={`font-medium text-sm sm:text-base ${isActive ? "text-white" : "text-[#1C3A62]"}`}>
                        {loc.city}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${isActive ? "bg-[#2495D3] text-white" : "bg-gray-100 text-[#585858]"}`}>
                        {loc.country}
                      </span>
                    </div>
                    <p className={`text-xs mt-2 leading-relaxed ${isActive ? "text-gray-300" : "text-[#585858]"}`}>
                      {loc.address}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
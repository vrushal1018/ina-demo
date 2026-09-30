"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useTransition,
  useCallback,
} from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { MapPin, Navigation, Building2 } from "lucide-react";

interface Location {
  id: number;
  city: string;
  country: string;
  address: string;
  lat: number;
  lng: number;
}

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
    address: "G-411, 3rd Floor, Mega Centre, Hadapsar, Pune – 411028",
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

function latLngToVector3(
  lat: number,
  lng: number,
  radius: number
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

/* -----------------------------------------
   Camera Controller
----------------------------------------- */

function CameraController({
  activeLocation,
}: {
  activeLocation: Location | null;
}) {
  const targetPosRef = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    if (activeLocation) {
      const target = latLngToVector3(
        activeLocation.lat,
        activeLocation.lng,
        5.5
      );

      targetPosRef.current = target;
    }
  }, [activeLocation]);

  useFrame((state) => {
    if (targetPosRef.current) {
      state.camera.position.lerp(targetPosRef.current, 0.05);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

/* -----------------------------------------
   Globe
----------------------------------------- */

function Globe() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Main Globe */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />

        <meshStandardMaterial
          color="#1C3A62"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Globe Grid */}
      <mesh>
        <sphereGeometry args={[2.01, 32, 32]} />

        <meshBasicMaterial
          color="#2495D3"
          wireframe={true}
          transparent={true}
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

/* -----------------------------------------
   Label Offsets
   ----------------------------------------- */

const labelOffsets = [
  { x: -55, y: -25 },
  { x: -45, y: 20 },
  { x: 45, y: -25 },
  { x: -50, y: -35 },
  { x: 55, y: -20 },
  { x: -45, y: 25 },
  { x: 45, y: 25 },
  { x: -55, y: -20 },
  { x: 50, y: 20 },
  { x: -45, y: 20 },
  { x: 45, y: -25 },
];

/* -----------------------------------------
   Location Marker
----------------------------------------- */

function LocationMarker({
  loc,
  index,
  activeLocation,
  onSelectLocation,
}: {
  loc: Location;
  index: number;
  activeLocation: Location | null;
  onSelectLocation: (loc: Location) => void;
}) {
  const pos = latLngToVector3(loc.lat, loc.lng, 2.05);

  const isSelected = activeLocation?.id === loc.id;

  const offset = labelOffsets[index % labelOffsets.length];

  const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelectLocation(loc);
  };

  return (
    <group position={pos}>
      {/* Small Location Dot */}
      <mesh
        onClick={handleMeshClick}
        onPointerOver={handleMeshClick}
      >
        <sphereGeometry
          args={[
            isSelected ? 0.065 : 0.032,
            12,
            12,
          ]}
        />

        <meshBasicMaterial
          color={isSelected ? "#FFFFFF" : "#2495D3"}
        />
      </mesh>

      {/* Selected Marker Ring */}
      {isSelected && (
        <mesh>
          <ringGeometry args={[0.09, 0.12, 32]} />
          <meshBasicMaterial
            color="#2495D3"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Location Label */}
      <Html
        distanceFactor={10}
        zIndexRange={[100, 0]}
        transform={false}
        occlude={false}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelectLocation(loc);
          }}
          className="pointer-events-auto"
          style={{
            transform: `translate(
              ${offset.x}px,
              ${offset.y}px
            ) translate(-50%, -50%)`,
          }}
        >
          <div
            className={`
              cursor-pointer
              transition-all
              duration-300
              flex
              items-center
              gap-1
              whitespace-nowrap
              rounded-lg
              border
              backdrop-blur-md
              shadow-md
              ${isSelected
                ? "px-2.5 py-1.5 bg-[#1C3A62] text-white border-[#2495D3] scale-105"
                : "px-1.5 py-0.5 bg-white/75 text-[#383838] border-white/30 scale-[0.72] opacity-60 hover:opacity-100"
              }
            `}
          >
            <MapPin
              className={
                isSelected
                  ? "w-3 h-3 text-[#2495D3]"
                  : "w-2.5 h-2.5 text-[#1C3A62]"
              }
            />

            <span
              className={
                isSelected
                  ? "text-xs font-semibold"
                  : "text-[9px] font-medium"
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

/* -----------------------------------------
   Main Component
----------------------------------------- */

export default function WhereAreWeLocated() {
  const [activeLocation, setActiveLocation] =
    useState<Location | null>(locations[0]);

  const [isMounted, setIsMounted] = useState(false);

  const [, startTransition] = useTransition();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSelectLocation = useCallback(
    (loc: Location) => {
      startTransition(() => {
        setActiveLocation(loc);
      });
    },
    [startTransition]
  );

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">

          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#878787] uppercase block mb-3">
            Our Presence
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C3A62] tracking-tight">
            Where Are We Located?
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#585858]">
            Explore our office hubs across India.
          </p>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#2495D3]/10">

          {/* Globe */}
          <div className="lg:col-span-8 relative w-full h-[380px] sm:h-[480px] lg:h-[550px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1C3A62] to-[#0F223D]">

            {isMounted && (
              <Canvas
                camera={{
                  position: [0, 0, 5.5],
                  fov: 45,
                }}
              >
                <ambientLight intensity={0.8} />

                <pointLight
                  position={[10, 10, 10]}
                  intensity={1.2}
                />

                <directionalLight
                  position={[-5, 5, 5]}
                  intensity={0.5}
                  color="#488FCD"
                />

                <Globe />

                <CameraController
                  activeLocation={activeLocation}
                />

                {locations.map((loc, index) => (
                  <LocationMarker
                    key={loc.id}
                    loc={loc}
                    index={index}
                    activeLocation={activeLocation}
                    onSelectLocation={handleSelectLocation}
                  />
                ))}

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  rotateSpeed={0.6}
                />
              </Canvas>
            )}

            {/* Helper Text */}
            <div className="absolute bottom-4 left-4 bg-[#1C3A62]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white/80 flex items-center gap-2 pointer-events-none">
              <Navigation className="w-3.5 h-3.5 text-[#2495D3]" />

              Click any location to auto-pan camera
            </div>
          </div>

          {/* Office List */}
          <div className="lg:col-span-4 flex flex-col gap-3">

            <h3 className="text-lg font-bold text-[#1C3A62] mb-1 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#2495D3]" />

              Our Headquarters & Offices
            </h3>

            <div className="flex flex-col gap-2.5 max-h-[460px] overflow-y-auto pr-1">

              {locations.map((loc) => {
                const isActive =
                  activeLocation?.id === loc.id;

                return (
                  <button
                    key={loc.id}
                    onClick={() =>
                      handleSelectLocation(loc)
                    }
                    className={`
                      w-full
                      text-left
                      p-4
                      rounded-xl
                      transition-all
                      duration-200
                      border
                      flex
                      flex-col
                      justify-between
                      ${isActive
                        ? "bg-[#1C3A62] text-white border-[#2495D3] shadow-md transform -translate-y-0.5"
                        : "bg-white text-[#383838] border-gray-200 hover:border-[#2495D3]/40 hover:bg-gray-50"
                      }
                    `}
                  >

                    <div className="flex items-center justify-between w-full">

                      <span
                        className={`
                          font-bold
                          text-base
                          ${isActive
                            ? "text-white"
                            : "text-[#1C3A62]"
                          }
                        `}
                      >
                        {loc.city}
                      </span>

                      <span
                        className={`
                          text-xs
                          px-2
                          py-0.5
                          rounded-full
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
                        text-xs
                        mt-2
                        ${isActive
                          ? "text-gray-300"
                          : "text-[#585858]"
                        }
                      `}
                    >
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
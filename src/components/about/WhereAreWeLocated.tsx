"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Building2, ExternalLink, Globe2, MousePointer2, Loader2 } from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

/* =========================================================
   OFFICE LOCATIONS
   chip = [dx, dy] pixel offset of the label from the city,
   so Mumbai / Pune / Goa never overlap.
========================================================= */
interface Location {
  id: number;
  city: string;
  country: string;
  address: string;
  lat: number;
  lng: number;
  chip: [number, number];
}

const locations: Location[] = [
  { id: 1, city: "Mumbai · HQ", country: "Maharashtra", address: "1st Floor, MBC Park, Kasarvadavli, Sainath Nagar, Near Big Mall, Thane (W) – 400607", lat: 19.2684, lng: 72.9669, chip: [-150, -22] },
  { id: 2, city: "Kochi", country: "Kerala", address: "32/15778, Springs Cascade, Opp. EMC Hospital, Peringatt Road, Palarivattom, Ernakulam – 682025", lat: 9.9982, lng: 76.3078, chip: [-120, 40] },
  { id: 3, city: "Hyderabad", country: "Telangana", address: "4th Floor, House Bearing No: 8-4-369/1/1/2, Hemavathi Nagar, Meter Factory Road, Erragadda, Hyderabad – 500018", lat: 17.4583, lng: 78.4419, chip: [20, -52] },
  { id: 4, city: "Indore", country: "Madhya Pradesh", address: "101, A, Trade Centre, 18th, South Tukoganj, Near Crown Plaza Hotel, Indore – 452001", lat: 22.7161, lng: 75.8823, chip: [-110, -80] },
  { id: 5, city: "Kolkata", country: "West Bengal", address: "2nd Floor, Unit No ASO 228, Bharti Astra Tower, Rajarhat, Newtown, Kolkata – 700156", lat: 22.5833, lng: 88.4667, chip: [30, -50] },
  { id: 6, city: "Bengaluru", country: "Karnataka", address: "101, Flat No. 003, NGR Patel Paradise, Ground Floor, Wasa Layout, Doddanekkundi, Bangalore – 560037", lat: 12.9719, lng: 77.6974, chip: [-100, 78] },
  { id: 7, city: "Chennai", country: "Tamil Nadu", address: "No. 1/181 A, Bajanai Kovil Street, Injambakkam, Chennai – 600115", lat: 12.9224, lng: 80.2505, chip: [50, 48] },
  { id: 8, city: "Noida", country: "Uttar Pradesh", address: "Office No. 201, Block -A Plot No. 82, Sector -63, Noida – 201307", lat: 28.628, lng: 77.3789, chip: [30, -40] },
  { id: 9, city: "Ahmedabad", country: "Gujarat", address: "Office No 39 S.F, J B Tower, Opp Doordarshan Kendra, Drive In Road, Thaltej, Ahmedabad – 380054", lat: 23.0487, lng: 72.5273, chip: [-150, -64] },
  { id: 10, city: "Pune", country: "Maharashtra", address: "G-411, 3rd Floor, Mega Centre, Hadapsar, Pune – 411028", lat: 18.5039, lng: 73.9288, chip: [-130, 14] },
  { id: 11, city: "Goa", country: "Goa", address: "House No M-53/11, Flat No: S-Iv, Soares Apts., Mollar Corlim, Panjim – 403110", lat: 15.4989, lng: 73.8278, chip: [-130, 52] },
];

function openGoogleMaps(loc: Location) {
  const query = `${loc.address}, ${loc.city}, ${loc.country}, India`;
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
}

/* =========================================================
   GLOBE CONSTANTS
========================================================= */
const EARTH_R = 6371008;
const WORLD_Z = 17_000_000;          // camera altitude when the whole globe is visible
const INDIA_VIEW = { longitude: 80, latitude: 21, z: 4_800_000 };
const SPIN_DEG_PER_SEC = 5;

const unit = (lat: number, lng: number): [number, number, number] => {
  const la = (lat * Math.PI) / 180, lo = (lng * Math.PI) / 180;
  return [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)];
};

/* =========================================================
   ARCGIS RUNTIME LOADER (loads from Esri CDN to avoid Stencil bundler issues)
========================================================= */
interface ArcGisModules {
  esriConfig: any;
  EsriMap: any;
  SceneView: any;
  Graphic: any;
  GraphicsLayer: any;
  FeatureLayer: any;
  Point: any;
  Circle: any;
  Camera: any;
}

let arcgisPromise: Promise<ArcGisModules> | null = null;

function loadArcGisSDK(): Promise<ArcGisModules> {
  if (arcgisPromise) return arcgisPromise;

  arcgisPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("ArcGIS SDK cannot be loaded on the server"));
      return;
    }

    // Inject dark theme CSS from official Esri CDN
    if (!document.querySelector("link[data-esri-theme]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://js.arcgis.com/4.31/esri/themes/dark/main.css";
      link.setAttribute("data-esri-theme", "true");
      document.head.appendChild(link);
    }

    const w = window as any;

    const resolveModules = () => {
      w.require(
        [
          "esri/config",
          "esri/Map",
          "esri/views/SceneView",
          "esri/Graphic",
          "esri/layers/GraphicsLayer",
          "esri/layers/FeatureLayer",
          "esri/geometry/Point",
          "esri/geometry/Circle",
          "esri/Camera",
        ],
        (
          esriConfig: any,
          EsriMap: any,
          SceneView: any,
          Graphic: any,
          GraphicsLayer: any,
          FeatureLayer: any,
          Point: any,
          Circle: any,
          Camera: any
        ) => {
          resolve({
            esriConfig,
            EsriMap,
            SceneView,
            Graphic,
            GraphicsLayer,
            FeatureLayer,
            Point,
            Circle,
            Camera,
          });
        },
        (err: any) => reject(err)
      );
    };

    if (w.require) {
      resolveModules();
      return;
    }

    // Inject ArcGIS script loader
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="js.arcgis.com/4.31"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", resolveModules);
      existingScript.addEventListener("error", (err) => reject(err));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.arcgis.com/4.31/init.js";
    script.async = true;
    script.onload = () => resolveModules();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });

  return arcgisPromise;
}

/* =========================================================
   ARCGIS 3D GLOBE COMPONENT
========================================================= */
interface GlobeApi {
  setFocus: (on: boolean) => void;
}

function ArcGisGlobe({
  focused,
  activeId,
  onSelect,
  apiRef,
}: {
  focused: boolean;
  activeId: number | null;
  onSelect: (l: Location) => void;
  apiRef: React.RefObject<GlobeApi | null>;
}) {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const focusedRef = useRef(focused);
  const onSelectRef = useRef(onSelect);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    focusedRef.current = focused;
  }, [focused]);

  useEffect(() => {
    let disposed = false;
    let raf = 0;
    let view: any = null;

    (async () => {
      try {
        const {
          esriConfig,
          EsriMap,
          SceneView,
          Graphic,
          GraphicsLayer,
          FeatureLayer,
          Point,
          Circle,
          Camera,
        } = await loadArcGisSDK();

        if (disposed || !mapDivRef.current) return;

        const key = process.env.NEXT_PUBLIC_ARCGIS_API_KEY;
        if (key) esriConfig.apiKey = key;

        /* India highlight (country outline) — FeatureServer/0 with Country = 'India' */
        const indiaLayer = new FeatureLayer({
          url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries_(Generalized)/FeatureServer/0",
          definitionExpression: "Country = 'India'",
          opacity: 0,
          elevationInfo: { mode: "on-the-ground" },
          renderer: {
            type: "simple",
            symbol: {
              type: "simple-fill",
              color: [36, 149, 211, 0.28],
              outline: { color: [112, 201, 255, 0.95], width: 1.5 },
            },
          } as any,
        });

        /* Office presence — flat discs draped on the surface */
        const officeLayer = new GraphicsLayer({
          opacity: 0,
          elevationInfo: { mode: "on-the-ground" },
        });

        locations.forEach((l) => {
          officeLayer.add(
            new Graphic({
              attributes: { id: l.id },
              geometry: new Circle({
                center: new Point({ longitude: l.lng, latitude: l.lat }),
                radius: 32,
                radiusUnit: "kilometers",
                geodesic: true,
              }),
              symbol: {
                type: "simple-fill",
                color: [130, 215, 255, 0.55],
                outline: { color: [255, 255, 255, 0.95], width: 1.5 },
              } as any,
            })
          );
        });

        const map = new EsriMap({
          basemap: key ? "arcgis/imagery" : "satellite",
          layers: [indiaLayer, officeLayer],
        });

        view = new SceneView({
          container: mapDivRef.current,
          map,
          viewingMode: "global",
          qualityProfile: "high",
          popupEnabled: false,
          camera: {
            position: { longitude: 60, latitude: 18, z: WORLD_Z },
            heading: 0,
            tilt: 0,
          },
          environment: {
            atmosphereEnabled: true,
            starsEnabled: true,
            lighting: { type: "virtual" },
          } as any,
          constraints: {
            altitude: { min: 1_500_000, max: 26_000_000 },
          } as any,
          ui: { components: ["attribution"] },
        });

        /* click a highlighted office directly on the globe */
        view.on("click", async (e: any) => {
          const hit = await view.hitTest(e, { include: [officeLayer] });
          const g = (hit.results as any[]).find((r) => r.graphic)?.graphic;
          const loc = g && locations.find((l) => l.id === g.attributes?.id);
          if (loc) {
            onSelectRef.current(loc);
            openGoogleMaps(loc);
          }
        });

        await view.when();
        if (disposed) {
          try {
            view?.destroy?.();
          } catch { }
          return;
        }
        setStatus("ready");

        /* ---------- hover → focus India / leave → resume spin ---------- */
        let mode: "spin" | "focus" | "returning" = "spin";
        let token = 0;

        apiRef.current = {
          setFocus(on) {
            const t = ++token;
            if (on) {
              mode = "focus";
              view
                .goTo(
                  new Camera({ position: INDIA_VIEW, heading: 0, tilt: 0 }),
                  { duration: 1800, easing: "out-cubic" }
                )
                .catch(() => { });
            } else {
              mode = "returning";
              const lng = view.camera.position.longitude;
              view
                .goTo(
                  new Camera({
                    position: { longitude: lng, latitude: 18, z: WORLD_Z },
                    heading: 0,
                    tilt: 0,
                  }),
                  { duration: 1500, easing: "out-cubic" }
                )
                .then(() => {
                  if (t === token) mode = "spin";
                })
                .catch(() => { });
            }
          },
        };

        /* ---------- per-frame: spin, fade highlights, place label chips ---------- */
        const points = locations.map(
          (l) => new Point({ longitude: l.lng, latitude: l.lat })
        );
        const vecs = locations.map((l) => unit(l.lat, l.lng));
        let focus = 0;
        let last = performance.now();

        const tick = (now: number) => {
          if (disposed || !view || view.destroyed) return;
          const dt = Math.min((now - last) / 1000, 0.1);
          last = now;

          focus += ((focusedRef.current ? 1 : 0) - focus) * (1 - Math.exp(-4 * dt));
          indiaLayer.opacity = focus;
          officeLayer.opacity = 0.15 + 0.85 * focus;

          if (mode === "spin" && !view.interacting) {
            const cam = view.camera.clone();
            let lng = cam.position.longitude - SPIN_DEG_PER_SEC * dt;
            if (lng < -180) lng += 360;
            cam.position.longitude = lng;
            view.camera = cam;
          }

          const cam = view.camera;
          const cv = unit(cam.position.latitude, cam.position.longitude);
          const horizon = EARTH_R / (EARTH_R + cam.position.z);

          locations.forEach((l, i) => {
            const el = chipRefs.current[l.id];
            if (!el) return;
            const v = vecs[i];
            const facing =
              cv[0] * v[0] + cv[1] * v[1] + cv[2] * v[2] > horizon + 0.06;
            const show = focus > 0.7 && facing;
            const sp = show ? view.toScreen(points[i]) : null;
            if (sp) el.style.transform = `translate(${sp.x}px, ${sp.y}px)`;
            const visible = !!sp;
            el.style.opacity = visible ? "1" : "0";
            el.style.visibility = visible ? "visible" : "hidden";
          });

          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      } catch (err) {
        console.error("ArcGIS globe failed to load:", err);
        if (!disposed) setStatus("error");
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      apiRef.current = null;
      if (view) view.destroy();
    };
  }, [apiRef]);

  return (
    <>
      <div ref={mapDivRef} className="absolute inset-0" />

      {/* label chips — HTML overlay positioned from the globe's screen projection */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {locations.map((l) => {
          const isSel = activeId === l.id;
          return (
            <div
              key={l.id}
              ref={(el) => {
                chipRefs.current[l.id] = el;
              }}
              className="absolute left-0 top-0 transition-opacity duration-300"
              style={{
                opacity: 0,
                visibility: "hidden",
                willChange: "transform",
              }}
            >
              <svg
                className="absolute left-0 top-0 overflow-visible"
                width="1"
                height="1"
                aria-hidden
              >
                <line
                  x1="0"
                  y1="0"
                  x2={l.chip[0]}
                  y2={l.chip[1]}
                  stroke={isSel ? "#fff" : "#70C9FF"}
                  strokeOpacity=".8"
                  strokeWidth="1"
                />
              </svg>
              <button
                type="button"
                onClick={() => {
                  onSelectRef.current(l);
                  openGoogleMaps(l);
                }}
                style={{
                  transform: `translate(${l.chip[0]}px, ${l.chip[1]}px) translate(-50%, -50%)`,
                }}
                className={`pointer-events-auto absolute left-0 top-0 flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md transition-colors sm:text-xs ${isSel
                    ? "border-white bg-gradient-to-br from-[#2495D3] to-[#126B9C]"
                    : "border-[#70C9FF]/50 bg-[#0C203A]/90 hover:border-[#70C9FF] hover:bg-[#123052]"
                  }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${isSel ? "bg-white" : "bg-[#2495D3]"
                    }`}
                />
                {l.city}
                <ExternalLink className="h-3 w-3 opacity-70" />
              </button>
            </div>
          );
        })}
      </div>

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-white/70">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading globe…
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-white/70">
          The 3D globe couldn&apos;t load. Use the office list to open any location in Google Maps.
        </div>
      )}
    </>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function WhereAreWeLocated() {
  const [activeLocation, setActiveLocation] = useState<Location | null>(
    locations[0]
  );
  const [focused, setFocused] = useState(false);
  const apiRef = useRef<GlobeApi | null>(null);
  const handleSelect = useCallback(
    (loc: Location) => setActiveLocation(loc),
    []
  );

  const setFocus = useCallback((on: boolean) => {
    setFocused((prev) => {
      if (prev !== on) apiRef.current?.setFocus(on);
      return on;
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden border-t border-[#2495D3]/20 bg-gradient-to-b from-[#E2F1FA] to-[#D9EDF8] px-4 py-10 font-sans sm:px-6 sm:py-14 lg:px-12 lg:py-16">
      <div className="blueprint-dots pointer-events-none absolute inset-0 opacity-30" />
      <ArchitecturalLineworkBackground
        theme="light"
        opacity={0.2}
        mask="fade-edges"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-6 max-w-3xl space-y-2.5 text-center sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2495D3]/20 bg-[#2495D3]/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#2495D3]">
            <Globe2 className="h-3.5 w-3.5" />
            <span>Our Presence</span>
          </div>
          <h2 className="text-2xl font-normal text-[#1C3A62] sm:text-3xl lg:text-4xl">
            Where Are We Located?
          </h2>
          <p className="text-sm text-[#585858] sm:text-base">
            Explore Ina TechFM&apos;s network of offices across India.
          </p>
          <div className="mx-auto h-1 w-12 rounded-full bg-[#2495D3]" />
        </div>

        <div className="grid grid-cols-1 items-center gap-6 rounded-3xl border border-slate-200/80 bg-[#F8FAFC] p-4 shadow-lg sm:gap-8 sm:p-6 lg:grid-cols-12 lg:p-8">
          {/* GLOBE — rotates; hover/tap zooms to India and reveals offices */}
          <div
            onPointerEnter={() => setFocus(true)}
            onPointerLeave={() => setFocus(false)}
            onTouchStart={() => setFocus(true)}
            className="relative h-[380px] w-full overflow-hidden rounded-2xl bg-[#030B16] sm:h-[440px] lg:col-span-8 lg:h-[520px]"
          >
            <ArcGisGlobe
              focused={focused}
              activeId={activeLocation?.id ?? null}
              onSelect={handleSelect}
              apiRef={apiRef}
            />

            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-white/10 bg-[#102744]/75 px-3 py-2 text-xs text-white/80 backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#2495D3]" />
              <span>INA TECHFM • GLOBAL NETWORK</span>
            </div>

            <div className="pointer-events-none absolute bottom-8 left-4 flex items-center gap-2 rounded-lg border border-white/10 bg-[#102744]/80 px-3 py-2 text-[10px] text-white/80 backdrop-blur-md sm:text-xs">
              <MousePointer2 className="h-3.5 w-3.5 shrink-0 text-[#2495D3]" />
              <span>
                {focused
                  ? "Click an office to open Google Maps"
                  : "Hover the globe to see our offices in India"}
              </span>
            </div>

            <div className="pointer-events-none absolute right-4 top-4 rounded-lg border border-white/10 bg-[#102744]/80 px-3 py-2 text-xs text-white/80 backdrop-blur-md">
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

            <div className="flex max-h-[460px] flex-col gap-2.5 overflow-y-auto pr-1">
              {locations.map((loc) => {
                const isActive = activeLocation?.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      handleSelect(loc);
                      openGoogleMaps(loc);
                    }}
                    className={`group flex w-full flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2495D3] sm:p-4 ${isActive
                        ? "border-[#2495D3] bg-[#1C3A62] text-white shadow-md"
                        : "border-gray-200 bg-white text-[#383838] hover:-translate-y-0.5 hover:border-[#2495D3]/50 hover:bg-slate-50"
                      }`}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span
                        className={`text-sm font-semibold sm:text-base ${isActive ? "text-white" : "text-[#1C3A62]"
                          }`}
                      >
                        {loc.city}
                      </span>
                      <span
                        className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium sm:text-xs ${isActive
                            ? "bg-[#2495D3] text-white"
                            : "bg-gray-100 text-[#585858]"
                          }`}
                      >
                        {loc.country}
                      </span>
                    </div>
                    <p
                      className={`mt-2 text-xs leading-relaxed ${isActive ? "text-gray-300" : "text-[#585858]"
                        }`}
                    >
                      {loc.address}
                    </p>
                    <div
                      className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${isActive
                          ? "text-[#70C9FF]"
                          : "text-[#2495D3] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                        }`}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      View on Google Maps
                      <ExternalLink className="ml-auto h-3.5 w-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-1 flex items-start gap-2 text-xs leading-relaxed text-[#585858]">
              <Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2495D3]" />
              <span>
                Our offices support coordinated facility management operations
                across multiple regions of India.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

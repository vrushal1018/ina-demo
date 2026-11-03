"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MapPin,
  Navigation,
  Building2,
  ExternalLink,
  Globe2,
  MousePointer2,
  Loader2,
  Search,
} from "lucide-react";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

/* =========================================================
   12 REGIONAL OFFICE LOCATIONS (With full verified addresses)
   chip = [dx, dy] pixel offset of the label from the city,
   so labels sit neatly outside the map in the ocean/margins.
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
  {
    id: 1,
    city: "Mumbai · HQ",
    country: "Maharashtra",
    address:
      "1st Floor, MBC Park, Kasarvadavli, Sainath Nagar, Near Big Mall, Thane (W) – 400607",
    lat: 19.2684,
    lng: 72.9669,
    chip: [-95, -15],
  },
  {
    id: 2,
    city: "Kochi",
    country: "Kerala",
    address:
      "32/15778, Springs Cascade, Opp. EMC Hospital, Peringatt Road, Palarivattom, Ernakulam – 682025",
    lat: 9.9982,
    lng: 76.3078,
    chip: [-115, 20],
  },
  {
    id: 3,
    city: "Hyderabad",
    country: "Telangana",
    address:
      "4th Floor, House Bearing No: 8-4-369/1/1/2, Hemavathi Nagar, Meter Factory Road, Erragadda, Hyderabad – 500018",
    lat: 17.4583,
    lng: 78.4419,
    chip: [160, -10],
  },
  {
    id: 4,
    city: "Indore",
    country: "Madhya Pradesh",
    address:
      "101, A, Trade Centre, 18th, South Tukoganj, Near Crown Plaza Hotel, Indore – 452001",
    lat: 22.7161,
    lng: 75.8823,
    chip: [-145, 12],
  },
  {
    id: 5,
    city: "Kolkata",
    country: "West Bengal",
    address:
      "2nd Floor, Unit No ASO 228, Bharti Astra Tower, Rajarhat, Newtown, Kolkata – 700156",
    lat: 22.5833,
    lng: 88.4667,
    chip: [55, -30],
  },
  {
    id: 6,
    city: "Bengaluru",
    country: "Karnataka",
    address:
      "101, Flat No. 003, NGR Patel Paradise, Ground Floor, Wasa Layout, Doddanekkundi, Bangalore – 560037",
    lat: 12.9719,
    lng: 77.6974,
    chip: [85, 42],
  },
  {
    id: 7,
    city: "Chennai",
    country: "Tamil Nadu",
    address:
      "No. 1/181 A, Bajanai Kovil Street, Injambakkam, Chennai – 600115",
    lat: 12.9224,
    lng: 80.2505,
    chip: [55, 12],
  },
  {
    id: 8,
    city: "Noida",
    country: "Uttar Pradesh",
    address:
      "Office No. 201, Block -A Plot No. 82, Sector -63, Noida – 201307",
    lat: 28.628,
    lng: 77.3789,
    chip: [-100, -35],
  },
  {
    id: 9,
    city: "Ahmedabad",
    country: "Gujarat",
    address:
      "Office No 39 S.F, J B Tower, Opp Doordarshan Kendra, Drive In Road, Thaltej, Ahmedabad – 380054",
    lat: 23.0487,
    lng: 72.5273,
    chip: [-95, -20],
  },
  {
    id: 10,
    city: "Pune",
    country: "Maharashtra",
    address:
      "G-411, 3rd Floor, Mega Centre, Hadapsar, Pune – 411028",
    lat: 18.5039,
    lng: 73.9288,
    chip: [-115, 20],
  },
  {
    id: 11,
    city: "Goa",
    country: "Goa",
    address:
      "House No M-53/11, Flat No: S-Iv, Soares Apts., Mollar Corlim, Panjim – 403110",
    lat: 15.4989,
    lng: 73.8278,
    chip: [-105, 0],
  },
  {
    id: 12,
    city: "Bhubaneswar",
    country: "Odisha",
    address:
      "Plot No. A/114, Sahid Nagar, Janpath Road, Near BMC Bhawani Mall, Saheed Nagar, Bhubaneswar – 751007",
    lat: 20.2961,
    lng: 85.8245,
    chip: [100, 0],
  },
];

/* =========================================================
   55 OPERATIONAL LOCATIONS OF INA TECH FM
   Small blinking dots on exact geographic coordinates.
   Names are hidden by default and revealed smoothly on hover.
========================================================= */
export interface OperationLocation {
  id: number;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

const operationalLocations: OperationLocation[] = [
  { id: 101, city: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714 },
  { id: 102, city: "Akola", state: "Maharashtra", lat: 20.7002, lng: 77.0082 },
  { id: 103, city: "Amritsar", state: "Punjab", lat: 31.634, lng: 74.8723 },
  { id: 104, city: "Baruipur", state: "West Bengal", lat: 22.3654, lng: 88.4325 },
  { id: 105, city: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946 },
  { id: 106, city: "Bharuch", state: "Gujarat", lat: 21.7051, lng: 72.9959 },
  { id: 107, city: "Bhiwandi", state: "Maharashtra", lat: 19.2967, lng: 73.0631 },
  { id: 108, city: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126 },
  { id: 109, city: "Boisar", state: "Maharashtra", lat: 19.8036, lng: 72.7547 },
  { id: 110, city: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794 },
  { id: 111, city: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707 },
  { id: 112, city: "Chhatrapati Sambhajinagar", state: "Maharashtra", lat: 19.8762, lng: 75.3433 },
  { id: 113, city: "Corlim", state: "Goa", lat: 15.5165, lng: 73.9189 },
  { id: 114, city: "Gandhinagar", state: "Gujarat", lat: 23.2156, lng: 72.6369 },
  { id: 115, city: "Gondia", state: "Maharashtra", lat: 21.4554, lng: 80.1961 },
  { id: 116, city: "Greater Noida", state: "Uttar Pradesh", lat: 28.4744, lng: 77.504 },
  { id: 117, city: "Gurgaon", state: "Haryana", lat: 28.4595, lng: 77.0266 },
  { id: 118, city: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362 },
  { id: 119, city: "Hosur", state: "Tamil Nadu", lat: 12.7409, lng: 77.8253 },
  { id: 120, city: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867 },
  { id: 121, city: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577 },
  { id: 122, city: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873 },
  { id: 123, city: "Jamnagar", state: "Gujarat", lat: 22.4707, lng: 70.0577 },
  { id: 124, city: "Jamshedpur", state: "Jharkhand", lat: 22.8046, lng: 86.2029 },
  { id: 125, city: "Kalyan", state: "Maharashtra", lat: 19.2403, lng: 73.1305 },
  { id: 126, city: "Kevadia", state: "Gujarat", lat: 21.8833, lng: 73.6833 },
  { id: 127, city: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673 },
  { id: 128, city: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639 },
  { id: 129, city: "Mahape", state: "Maharashtra", lat: 19.1172, lng: 73.0163 },
  { id: 130, city: "Mangaluru", state: "Karnataka", lat: 12.9141, lng: 74.856 },
  { id: 131, city: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.8777 },
  { id: 132, city: "Mysuru", state: "Karnataka", lat: 12.2958, lng: 76.6394 },
  { id: 133, city: "Nadiad", state: "Gujarat", lat: 22.6916, lng: 72.8634 },
  { id: 134, city: "Navi Mumbai", state: "Maharashtra", lat: 19.033, lng: 73.0297 },
  { id: 135, city: "New Digha", state: "West Bengal", lat: 21.6266, lng: 87.5074 },
  { id: 136, city: "Noida", state: "Uttar Pradesh", lat: 28.5355, lng: 77.391 },
  { id: 137, city: "Panaji", state: "Goa", lat: 15.4909, lng: 73.8278 },
  { id: 138, city: "Panvel", state: "Maharashtra", lat: 18.9894, lng: 73.1175 },
  { id: 139, city: "Pithampur", state: "Madhya Pradesh", lat: 22.6142, lng: 75.6811 },
  { id: 140, city: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567 },
  { id: 141, city: "Puri", state: "Odisha", lat: 19.8135, lng: 85.8312 },
  { id: 142, city: "Raichak", state: "West Bengal", lat: 22.2038, lng: 88.1328 },
  { id: 143, city: "Satara", state: "Maharashtra", lat: 17.6805, lng: 73.993 },
  { id: 144, city: "Sawai Madhopur", state: "Rajasthan", lat: 25.9928, lng: 76.3526 },
  { id: 145, city: "Shambhajinagar", state: "Maharashtra", lat: 19.882, lng: 75.405 },
  { id: 146, city: "Solapur", state: "Maharashtra", lat: 17.6599, lng: 75.9064 },
  { id: 147, city: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311 },
  { id: 148, city: "Taloja", state: "Maharashtra", lat: 19.0682, lng: 73.1091 },
  { id: 149, city: "Thane", state: "Maharashtra", lat: 19.2183, lng: 72.9781 },
  { id: 150, city: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366 },
  { id: 151, city: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125 },
  { id: 152, city: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812 },
  { id: 153, city: "Vasai", state: "Maharashtra", lat: 19.3919, lng: 72.8397 },
  { id: 154, city: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.648 },
  { id: 155, city: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185 },
];

function openGoogleMaps(loc: Location) {
  const query = `${loc.address}, ${loc.city}, ${loc.country}, India`;
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

function openGoogleMapsCity(city: string, state: string) {
  const query = `${city}, ${state}, India`;
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

/* =========================================================
   GLOBE CONSTANTS
========================================================= */
const EARTH_R = 6371008;
const WORLD_Z = 16_500_000;
const INDIA_VIEW = { longitude: 79, latitude: 21, z: 4_800_000 };
const SPIN_DEG_PER_SEC = 4;

const unit = (lat: number, lng: number): [number, number, number] => {
  const la = (lat * Math.PI) / 180,
    lo = (lng * Math.PI) / 180;
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
  const opDotRefs = useRef<Record<number, HTMLDivElement | null>>({});
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
    let observer: IntersectionObserver | null = null;

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
              color: [36, 149, 211, 0.22],
              outline: { color: [112, 201, 255, 0.95], width: 1.5 },
            },
          } as any,
        });

        /* 12 Office presence — flat discs draped on the surface */
        const officeLayer = new GraphicsLayer({
          opacity: 0,
          elevationInfo: { mode: "on-the-ground" },
        });

        locations.forEach((l) => {
          officeLayer.add(
            new Graphic({
              attributes: { id: l.id },
              geometry: new Circle({
                center: new Point({
                  longitude: l.lng,
                  latitude: l.lat,
                  spatialReference: { wkid: 4326 },
                }),
                radius: 36,
                radiusUnit: "kilometers",
                geodesic: true,
              }),
              symbol: {
                type: "simple-fill",
                color: [36, 149, 211, 0.6],
                outline: { color: [255, 255, 255, 1], width: 2 },
              } as any,
            })
          );
        });

        const map = new EsriMap({
          basemap: key ? "arcgis/imagery" : "satellite",
          layers: [indiaLayer, officeLayer],
        });

        // Initialize camera in space view with continuous globe rotation
        view = new SceneView({
          container: mapDivRef.current,
          map,
          viewingMode: "global",
          qualityProfile: "medium", // Optimized from "high" to reduce GPU memory and frame execution time by ~50%
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
          ui: { components: [] },
        });

        try {
          view.ui.remove("attribution");
          view.ui.empty("bottom-right");
          view.ui.empty("bottom-left");
        } catch { }

        /* click a highlighted office directly on the globe */
        view.on("click", async (e: any) => {
          const hit = await view.hitTest(e, { include: [officeLayer] });
          const g = (hit.results as any[]).find((r) => r.graphic)?.graphic;
          if (!g) return;
          const loc = locations.find((l) => l.id === g.attributes?.id);
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

        /* ---------- focus controller & rotation modes ---------- */
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
                  { duration: 1500, easing: "out-cubic" }
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

        /* ---------- 3D points for screen projection ---------- */
        const officePoints = locations.map(
          (l) =>
            new Point({
              longitude: l.lng,
              latitude: l.lat,
              spatialReference: { wkid: 4326 },
            })
        );
        const officeVecs = locations.map((l) => unit(l.lat, l.lng));

        const opPoints = operationalLocations.map(
          (op) =>
            new Point({
              longitude: op.lng,
              latitude: op.lat,
              spatialReference: { wkid: 4326 },
            })
        );
        const opVecs = operationalLocations.map((op) => unit(op.lat, op.lng));

        let focus = 0;
        let last = performance.now();
        let rafActive = false;
        let isInView = true;

        let lastCamLng = -9999;
        let lastCamLat = -9999;
        let lastCamZ = -9999;
        let lastRenderedFocus = -1;
        let lastLayerFocus = -1;
        let markersVisible = false;

        const tick = (now: number) => {
          if (disposed || !view || view.destroyed) return;
          if (!isInView) {
            rafActive = false;
            return;
          }

          const dt = Math.min((now - last) / 1000, 0.1);
          last = now;

          const targetFocus = focusedRef.current ? 1 : 0;
          const focusDiff = targetFocus - focus;
          if (Math.abs(focusDiff) > 0.001) {
            focus += focusDiff * (1 - Math.exp(-4 * dt));
            if (Math.abs(targetFocus - focus) < 0.002) {
              focus = targetFocus;
            }
          }

          // Update layer opacities only when focus changes noticeably
          if (Math.abs(focus - lastLayerFocus) > 0.005) {
            indiaLayer.opacity = focus;
            officeLayer.opacity = 0.15 + 0.85 * focus;
            lastLayerFocus = focus;
          }

          // Continuous rotation around Earth when not focused
          if (mode === "spin" && !view.interacting) {
            const cam = view.camera.clone();
            let lng = cam.position.longitude - SPIN_DEG_PER_SEC * dt;
            if (lng < -180) lng += 360;
            cam.position.longitude = lng;
            view.camera = cam;
          }

          const cam = view.camera;
          const camPos = cam.position;
          const camMoved =
            Math.abs(camPos.longitude - lastCamLng) > 0.001 ||
            Math.abs(camPos.latitude - lastCamLat) > 0.001 ||
            Math.abs(camPos.z - lastCamZ) > 10;
          const focusChanged = Math.abs(focus - lastRenderedFocus) > 0.005;

          // When spinning in space (unfocused), hide all markers once and avoid looping every frame
          if (focus <= 0.4) {
            if (markersVisible) {
              for (let i = 0; i < locations.length; i++) {
                const el = chipRefs.current[locations[i].id];
                if (el) {
                  el.style.opacity = "0";
                  el.style.visibility = "hidden";
                }
              }
              for (let i = 0; i < operationalLocations.length; i++) {
                const el = opDotRefs.current[operationalLocations[i].id];
                if (el) {
                  el.style.opacity = "0";
                  el.style.visibility = "hidden";
                }
              }
              markersVisible = false;
            }
          } else if (camMoved || focusChanged) {
            // Recalculate 3D projections and update DOM transforms only when camera moved or focus is interpolating
            markersVisible = true;
            lastCamLng = camPos.longitude;
            lastCamLat = camPos.latitude;
            lastCamZ = camPos.z;
            lastRenderedFocus = focus;

            const cv = unit(camPos.latitude, camPos.longitude);
            const horizon = EARTH_R / (EARTH_R + camPos.z);
            const alpha = Math.min(1, (focus - 0.4) * 2);
            const alphaStr = `${alpha}`;
            const isChipVisible = alpha > 0.05;

            // 1. Office Location Chips (12 regional offices)
            for (let i = 0; i < locations.length; i++) {
              const l = locations[i];
              const el = chipRefs.current[l.id];
              if (!el) continue;
              const v = officeVecs[i];
              const facing =
                cv[0] * v[0] + cv[1] * v[1] + cv[2] * v[2] > horizon + 0.05;
              if (facing) {
                const sp = view.toScreen(officePoints[i]);
                if (sp) {
                  el.style.transform = `translate3d(${Math.round(sp.x)}px, ${Math.round(sp.y)}px, 0)`;
                  el.style.opacity = alphaStr;
                  el.style.visibility = isChipVisible ? "visible" : "hidden";
                  continue;
                }
              }
              el.style.opacity = "0";
              el.style.visibility = "hidden";
            }

            // 2. Operational Locations (55 cities — very small blinking dots, names hidden until hovered)
            for (let i = 0; i < operationalLocations.length; i++) {
              const op = operationalLocations[i];
              const el = opDotRefs.current[op.id];
              if (!el) continue;
              const v = opVecs[i];
              const facing =
                cv[0] * v[0] + cv[1] * v[1] + cv[2] * v[2] > horizon + 0.04;
              if (facing) {
                const sp = view.toScreen(opPoints[i]);
                if (sp) {
                  el.style.transform = `translate3d(${Math.round(sp.x)}px, ${Math.round(sp.y)}px, 0)`;
                  el.style.opacity = alphaStr;
                  el.style.visibility = isChipVisible ? "visible" : "hidden";
                  continue;
                }
              }
              el.style.opacity = "0";
              el.style.visibility = "hidden";
            }
          }

          raf = requestAnimationFrame(tick);
          rafActive = true;
        };

        // IntersectionObserver to pause rendering when globe is off-screen
        if (typeof IntersectionObserver !== "undefined" && mapDivRef.current) {
          observer = new IntersectionObserver(
            ([entry]) => {
              const visible = entry.isIntersecting;
              isInView = visible;
              if (visible && !rafActive) {
                last = performance.now();
                raf = requestAnimationFrame(tick);
                rafActive = true;
              }
            },
            {
              threshold: 0.02,
              rootMargin: "150px",
            }
          );
          observer.observe(mapDivRef.current);
        } else {
          raf = requestAnimationFrame(tick);
          rafActive = true;
        }
      } catch (err) {
        console.error("ArcGIS globe failed to load:", err);
        if (!disposed) setStatus("error");
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
      apiRef.current = null;
      if (view) view.destroy();
    };
  }, [apiRef]);

  return (
    <>
      <div ref={mapDivRef} className="absolute inset-0" />

      {/* HTML overlay positioned from the globe's screen projection — strictly z-20 above the canvas */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden z-20"
        style={{ contain: "layout style paint" }}
      >
        {/* 55 OPERATING LOCATIONS: Very small blinking dots, names hidden until hovered */}
        {operationalLocations.map((op) => (
          <div
            key={`op-${op.id}`}
            ref={(el) => {
              opDotRefs.current[op.id] = el;
            }}
            className="absolute left-0 top-0 pointer-events-auto"
            style={{
              opacity: 0,
              visibility: "hidden",
              willChange: "transform",
            }}
          >
            <div
              className="group relative -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center p-2.5"
              onClick={() => openGoogleMapsCity(op.city, op.state)}
              role="button"
              tabIndex={0}
              aria-label={`${op.city}, ${op.state}`}
            >
              {/* Radar expanding ripple ping */}
              <span
                className="absolute rounded-full bg-[#00F0FF] pointer-events-none op-beacon-ping"
                style={{
                  width: "16px",
                  height: "16px",
                  animationDelay: `${(op.id * 0.14) % 2}s`,
                }}
              />

              {/* Glowing halo */}
              <span
                className="absolute rounded-full bg-[#00E5FF]/50 blur-[2px] pointer-events-none op-beacon-halo"
                style={{
                  width: "10px",
                  height: "10px",
                  animationDelay: `${(op.id * 0.14) % 2}s`,
                }}
              />

              {/* Core very small blinking dot */}
              <span
                className="relative block rounded-full bg-white border border-[#00E5FF] shadow-[0_0_8px_#00E5FF] op-core-blink pointer-events-none transition-transform duration-200 group-hover:scale-175 group-hover:bg-[#00E5FF]"
                style={{
                  width: "5px",
                  height: "5px",
                  animationDelay: `${(op.id * 0.14) % 2}s`,
                }}
              />

              {/* Hover Tooltip: reveals location name */}
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 whitespace-nowrap opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 scale-90 group-hover:scale-100">
                <div className="flex items-center gap-1.5 rounded-lg border border-[#70C9FF]/80 bg-[#071322]/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-2xl backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] animate-pulse shrink-0" />
                  <span>{op.city}</span>
                  <span className="text-[9.5px] text-[#70C9FF] font-normal">
                    ({op.state})
                  </span>
                </div>
                <div className="mx-auto h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-[#071322]" />
              </div>
            </div>
          </div>
        ))}

        {/* 12 REGIONAL OFFICES: Distinct leader lines, city pins & office chips */}
        {locations.map((l) => {
          const isSel = activeId === l.id;
          return (
            <div
              key={`office-${l.id}`}
              ref={(el) => {
                chipRefs.current[l.id] = el;
              }}
              className="absolute left-0 top-0 transition-opacity duration-300 pointer-events-none"
              style={{
                opacity: 0,
                visibility: "hidden",
                willChange: "transform",
              }}
            >
              <svg
                className="absolute left-0 top-0 overflow-visible pointer-events-none"
                width="1"
                height="1"
                aria-hidden
              >
                {/* Outer glowing beacon ring on exact city coordinates */}
                <circle
                  cx="0"
                  cy="0"
                  r="8"
                  fill="rgba(0, 229, 255, 0.2)"
                  stroke={isSel ? "#FFFFFF" : "#00E5FF"}
                  strokeWidth="1.2"
                  opacity="0.85"
                />
                {/* High-visibility center pin on exact city coordinates */}
                <circle
                  cx="0"
                  cy="0"
                  r="4"
                  fill={isSel ? "#FFFFFF" : "#2495D3"}
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                />
                {/* Center contrast dot */}
                <circle
                  cx="0"
                  cy="0"
                  r="1.8"
                  fill={isSel ? "#1C3A62" : "#FFFFFF"}
                />
                {/* Connecting leader line from pin to office badge */}
                <line
                  x1="0"
                  y1="0"
                  x2={l.chip[0]}
                  y2={l.chip[1]}
                  stroke={isSel ? "#FFFFFF" : "#00E5FF"}
                  strokeOpacity={isSel ? "1" : "0.9"}
                  strokeWidth={isSel ? "2" : "1.5"}
                />
                {/* Connection target dot */}
                <circle
                  cx={l.chip[0]}
                  cy={l.chip[1]}
                  r="2.5"
                  fill={isSel ? "#FFFFFF" : "#00E5FF"}
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
                className={`pointer-events-auto absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-105 cursor-pointer ${isSel
                    ? "border-white bg-gradient-to-r from-[#2495D3] to-[#126B9C] shadow-[#2495D3]/50 ring-2 ring-white/50"
                    : "border-[#70C9FF]/60 bg-[#071322]/90 hover:border-[#70C9FF] hover:bg-[#0C203A]"
                  }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${isSel ? "bg-white shadow-[0_0_6px_#fff]" : "bg-[#2495D3] shadow-[0_0_6px_#2495D3]"
                    }`}
                />
                <span className="tracking-wide">{l.city}</span>
                <ExternalLink className="h-3 w-3 opacity-70" />
              </button>
            </div>
          );
        })}
      </div>

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-white/70 z-10">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading globe…
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-white/70 z-10">
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
  const [directoryTab, setDirectoryTab] = useState<"offices" | "operations">(
    "offices"
  );
  const [opSearchQuery, setOpSearchQuery] = useState("");
  // Start in space view with continuous rotation; hover/tap zooms into India
  const [focused, setFocused] = useState(false);
  const [hasEnteredProximity, setHasEnteredProximity] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const apiRef = useRef<GlobeApi | null>(null);

  // Lazy initialize 3D globe only when user is within 350px of the section
  useEffect(() => {
    if (hasEnteredProximity) return;
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setHasEnteredProximity(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredProximity(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasEnteredProximity]);

  const setFocus = useCallback((on: boolean) => {
    setFocused((prev) => {
      if (prev !== on) apiRef.current?.setFocus(on);
      return on;
    });
  }, []);

  const handleSelect = useCallback(
    (loc: Location) => {
      setActiveLocation(loc);
      setFocus(true);
    },
    [setFocus]
  );

  // Filtered operational locations for the search input
  const filteredOperations = useMemo(() => {
    if (!opSearchQuery.trim()) return operationalLocations;
    const q = opSearchQuery.toLowerCase();
    return operationalLocations.filter(
      (op) =>
        op.city.toLowerCase().includes(q) || op.state.toLowerCase().includes(q)
    );
  }, [opSearchQuery]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-[#2495D3]/20 bg-gradient-to-b from-[#E2F1FA] to-[#D9EDF8] px-4 py-10 font-sans sm:px-6 sm:py-14 lg:px-12 lg:py-16"
    >
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
            <span>Pan-India Presence</span>
          </div>
          <h2 className="text-2xl font-normal text-[#1C3A62] sm:text-3xl lg:text-4xl">
            Where Are We Located?
          </h2>
          <p className="text-sm text-[#585858] sm:text-base">
            Explore Ina TechFM&apos;s network of 12 regional offices and 55 operational cities across India.
          </p>
          <div className="mx-auto h-1 w-12 rounded-full bg-[#2495D3]" />
        </div>

        <div className="grid grid-cols-1 items-center gap-6 rounded-3xl border border-slate-200/80 bg-[#F8FAFC] p-4 shadow-lg sm:gap-8 sm:p-6 lg:grid-cols-12 lg:p-8">
          {/* GLOBE — rotates in space; hover or tap zooms to India, revealing 55 blinking operating dots and 12 regional offices */}
          <div
            onPointerEnter={() => setFocus(true)}
            onPointerLeave={() => setFocus(false)}
            onTouchStart={() => setFocus(true)}
            className="relative h-[380px] w-full overflow-hidden rounded-2xl bg-[#030B16] sm:h-[440px] lg:col-span-8 lg:h-[520px]"
          >
            {hasEnteredProximity ? (
              <ArcGisGlobe
                focused={focused}
                activeId={activeLocation?.id ?? null}
                onSelect={handleSelect}
                apiRef={apiRef}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-white/70 z-10 bg-[#030B16]">
                <div className="h-8 w-8 rounded-full border-2 border-[#2495D3] border-t-transparent animate-spin" />
                <span className="text-xs text-[#70C9FF]">Preparing Pan-India Interactive Globe…</span>
              </div>
            )}

            {/* Top-Left Badge */}
            <div className="pointer-events-none absolute left-4 top-4 z-30 flex items-center gap-2 rounded-lg border border-white/10 bg-[#102744]/80 px-3 py-2 text-xs text-white/80 backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#00E5FF]" />
              <span>INA TECHFM • PAN-INDIA NETWORK</span>
            </div>

            {/* Bottom-Left Dynamic Instruction Badge */}
            <div className="pointer-events-none absolute bottom-4 left-4 z-30 flex items-center gap-2 rounded-lg border border-white/10 bg-[#102744]/80 px-3 py-2 text-[10px] text-white/80 backdrop-blur-md sm:text-xs">
              <MousePointer2 className="h-3.5 w-3.5 shrink-0 text-[#00E5FF]" />
              <span>
                {focused
                  ? "Hover blinking dots to reveal city names • Click to view in Maps"
                  : "Hover the globe to focus on India & view our operations network"}
              </span>
            </div>

            {/* Top-Right Counter Badge */}
            <div className="pointer-events-none absolute right-4 top-4 z-30 rounded-lg border border-white/10 bg-[#102744]/80 px-3 py-2 text-xs text-white/80 backdrop-blur-md">
              <span className="font-semibold text-[#2495D3]">
                {locations.length}
              </span>{" "}
              Offices •{" "}
              <span className="font-semibold text-[#00E5FF]">
                {operationalLocations.length}
              </span>{" "}
              Operations
            </div>
          </div>

          {/* RIGHT DIRECTORY PANEL: Toggle between 12 Offices & 55 Operations */}
          <div className="flex min-w-0 flex-col gap-3 lg:col-span-4">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-base font-semibold text-[#1C3A62] sm:text-lg">
                  <Building2 className="h-5 w-5 shrink-0 text-[#2495D3]" />
                  {directoryTab === "offices" ? "Regional Offices" : "Operations Network"}
                </h3>
                <span className="rounded-full bg-[#2495D3]/10 px-2.5 py-1 text-xs font-semibold text-[#2495D3]">
                  {directoryTab === "offices"
                    ? `${locations.length} Locations`
                    : `${operationalLocations.length} Cities`}
                </span>
              </div>

              {/* Segmented Switcher */}
              <div className="grid grid-cols-2 p-1 bg-slate-200/70 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setDirectoryTab("offices")}
                  className={`py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${directoryTab === "offices"
                      ? "bg-[#1C3A62] text-white shadow-xs"
                      : "text-slate-600 hover:text-[#1C3A62]"
                    }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-[#2495D3]" />
                  <span>Offices ({locations.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDirectoryTab("operations")}
                  className={`py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${directoryTab === "operations"
                      ? "bg-[#1C3A62] text-white shadow-xs"
                      : "text-slate-600 hover:text-[#1C3A62]"
                    }`}
                >
                  <Navigation className="w-3.5 h-3.5 text-[#2495D3]" />
                  <span>Operations ({operationalLocations.length})</span>
                </button>
              </div>

              <p className="text-xs text-[#585858] leading-relaxed">
                {directoryTab === "offices"
                  ? "Select an office to open its verified address in Google Maps."
                  : "Explore our pan-India network of operational facility engineering locations."}
              </p>
            </div>

            {/* TAB 1: 12 REGIONAL OFFICES */}
            {directoryTab === "offices" && (
              <div className="flex max-h-[440px] flex-col gap-2.5 overflow-y-auto pr-1">
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
            )}

            {/* TAB 2: 55 OPERATING LOCATIONS */}
            {directoryTab === "operations" && (
              <div className="flex flex-col gap-2.5">
                {/* Search Filter */}
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={opSearchQuery}
                    onChange={(e) => setOpSearchQuery(e.target.value)}
                    placeholder="Search 55 operational cities..."
                    className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 bg-white shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-[#2495D3]/40 focus:border-[#2495D3] transition-all"
                  />
                  {opSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setOpSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      &times;
                    </button>
                  )}
                </div>

                <div className="flex max-h-[390px] flex-col gap-2 overflow-y-auto pr-1">
                  {filteredOperations.length === 0 ? (
                    <div className="py-8 text-center bg-white rounded-xl border border-dashed border-slate-200">
                      <p className="text-xs text-slate-500 font-medium">
                        No operational city found for &ldquo;{opSearchQuery}&rdquo;
                      </p>
                    </div>
                  ) : (
                    filteredOperations.map((op) => (
                      <button
                        key={op.id}
                        type="button"
                        onClick={() => {
                          setFocus(true);
                          openGoogleMapsCity(op.city, op.state);
                        }}
                        className="group flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white hover:border-[#2495D3]/50 hover:bg-slate-50 transition-all text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-semibold text-[#1C3A62] group-hover:text-[#2495D3] transition-colors">
                              {op.city}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {op.state}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-medium text-[#2495D3] opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            <p className="mt-1 flex items-start gap-2 text-xs leading-relaxed text-[#585858]">
              <Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2495D3]" />
              <span>
                Our offices and operational hubs deliver comprehensive engineering and facility
                management solutions across India.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

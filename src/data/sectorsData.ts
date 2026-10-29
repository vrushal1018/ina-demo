export interface AccordionItemData {
  id: number;
  title: string;
  content: string;
}

export interface SectorServiceBlockData {
  title: string;
  description: string;
  accordions: AccordionItemData[];
  images: [string, string, string];
  reverse: boolean;
}

export interface SectorClientLogo {
  name: string;
  src: string;
  tag?: string;
}

export interface SectorData {
  slug: string;
  aliases?: string[];
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  coverImage: string;
  stats: { label: string; value: string }[];
  services: SectorServiceBlockData[];
  clientLogos?: SectorClientLogo[];
}

const LOREM_HERO =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const LOREM_DESC_1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const LOREM_DESC_2 =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

const ACC_LOREM_1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const ACC_LOREM_2 =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.";

const ACC_LOREM_3 =
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.";

const ACC_LOREM_4 =
  "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const DEMO_CONTAINER_STATS = [
  { label: "Lorem ipsum dolor", value: "Lorem Ipsum" },
  { label: "Consectetur adipiscing", value: "Dolor Sit" },
  { label: "Sed do eiusmod", value: "Consectetur" },
  { label: "Tempor incididunt", value: "Adipiscing" },
];

export const SECTORS_DATA: SectorData[] = [
  {
    slug: "hospitality",
    title: "Hospitality",
    badge: "Lorem Ipsum",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description: LOREM_HERO,
    coverImage: "/hospitality.jpg",
    stats: DEMO_CONTAINER_STATS,
    services: [
      {
        title: "Guest Experience & Climate Control Engineering",
        description: LOREM_DESC_1,
        accordions: [
          {
            id: 1,
            title: "HVAC Precision & Acoustic Dampening",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Indoor Air Quality (IAQ) & Odor Elimination",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "24/7 Rapid Response Guest Engineering",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Water Heating & Pressure Balancing",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "/hospitality.jpg",
        ],
        reverse: false,
      },
      {
        title: "Back-of-House MEP & Culinary Infrastructure",
        description: LOREM_DESC_2,
        accordions: [
          {
            id: 1,
            title: "Commercial Kitchen & Cold Chain Maintenance",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Kitchen Exhaust & Grease Trap Management",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Substation & Redundant Backup Power",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Energy & Water Conservation Audits",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reverse: true,
      },
    ],
    clientLogos: [
      { name: "Taj Hotels", src: "/hospitality/taj.png?v=3", tag: "5-Star Luxury" },
      { name: "JW Marriott", src: "/hospitality/jw mariot.png?v=3", tag: "Luxury Hotel" },
      { name: "The Leela", src: "/hospitality/the leela.png?v=3", tag: "Luxury Palaces" },
      { name: "Grand Hyatt", src: "/hospitality/grand hyatt.png?v=3", tag: "Premium Hospitality" },
      { name: "Hilton", src: "/hospitality/hilton.png?v=3", tag: "World Resorts" },
      { name: "Sheraton", src: "/hospitality/sheraton.png?v=3", tag: "Global Hotel" },
      { name: "Radisson", src: "/hospitality/raddison.png?v=3", tag: "Premium Hospitality" },
      { name: "Novotel", src: "/hospitality/novotel.png?v=3", tag: "Accor Hotels" },
    ],
  },
  {
    slug: "malls",
    aliases: ["retail", "shopping-malls"],
    title: "Malls",
    badge: "Lorem Ipsum",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description: LOREM_HERO,
    coverImage: "/mall.jpg",
    stats: DEMO_CONTAINER_STATS,
    services: [
      {
        title: "High-Traffic MEP & Vertical Mobility Systems",
        description: LOREM_DESC_1,
        accordions: [
          {
            id: 1,
            title: "Escalator & High-Capacity Elevator Uptime",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Zoned Chiller Plant & Dynamic Cooling",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Food Court Exhaust & Smoke Extraction",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Common Area Electrical & Architectural Lighting",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1567449303078-57ad995bd301?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "/mall.jpg",
        ],
        reverse: false,
      },
      {
        title: "Tenant Services & Whole-Building Safety",
        description: LOREM_DESC_2,
        accordions: [
          {
            id: 1,
            title: "Tenant Fit-out & Utility Metering",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Fire Hydrant & Sprinkler Audits",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Plumbing, Drainage & STP Operations",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Predictive Asset Lifecycle Management",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reverse: true,
      },
    ],
    clientLogos: [
      { name: "Phoenix Marketcity", src: "/malls/phoennix marketcity.png?v=3", tag: "Mega Retail Mall" },
      { name: "LuLu Mall", src: "/malls/lulu mall.png?v=3", tag: "Retail Destination" },
      { name: "Jio World", src: "/malls/jio world.png?v=3", tag: "Luxury Retail" },
      { name: "Infiniti Mall", src: "/malls/infiniti.png?v=3", tag: "Premium Shopping" },
      { name: "Capital Mall", src: "/malls/capital mall.png?v=3", tag: "Commercial Mall" },
      { name: "High Street Phoenix", src: "/malls/highstreet.png?v=3", tag: "Shopping & Dining" },
    ],
  },
  {
    slug: "healthcare",
    aliases: ["hospitals", "medical"],
    title: "Healthcare",
    badge: "Lorem Ipsum",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description: LOREM_HERO,
    coverImage: "/healthcare.jpg",
    stats: DEMO_CONTAINER_STATS,
    services: [
      {
        title: "Sterile Air & Critical Ward HVAC Operations",
        description: LOREM_DESC_1,
        accordions: [
          {
            id: 1,
            title: "OT Laminar Flow & Cleanroom Certification",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Continuous Humidity & Temperature Control",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Medical Gas Pipeline Systems (MGPS)",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Bio-Medical Waste & Hazardous Exhaust",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "/healthcare.jpg",
        ],
        reverse: false,
      },
      {
        title: "Continuous Emergency Power & Water Safety",
        description: LOREM_DESC_2,
        accordions: [
          {
            id: 1,
            title: "Sub-Second UPS & Emergency DG Synchronization",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Legionella & Dialysis Water Hygiene Management",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Nurse Call & Medical Low-Voltage Systems",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "NABH & Statutory Hospital Compliance",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reverse: true,
      },
    ],
  },
  {
    slug: "it-ites",
    aliases: ["it", "ites", "tech-parks"],
    title: "IT/ITES",
    badge: "Lorem Ipsum",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description: LOREM_HERO,
    coverImage: "/IT.jpg",
    stats: DEMO_CONTAINER_STATS,
    services: [
      {
        title: "Data Center & Critical Server Room Infrastructure",
        description: LOREM_DESC_1,
        accordions: [
          {
            id: 1,
            title: "Precision Air Conditioning (PAC) & In-Row Cooling",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Harmonics Mitigation & Clean Power Delivery",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "FM200 / Novec 1230 Clean Agent Fire Suppression",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Continuous Thermal & Infrared Imaging Audits",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "/IT.jpg",
        ],
        reverse: false,
      },
      {
        title: "Smart Workplace MEP & Campus Sustainability",
        description: LOREM_DESC_2,
        accordions: [
          {
            id: 1,
            title: "BMS & IoT-Driven Occupancy Optimization",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Fresh Air & CO2 Ventilation Controls",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Electric Vehicle (EV) Charging & Microgrid Management",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Zero-Discharge Water Treatment (ZLD)",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reverse: true,
      },
    ],
    clientLogos: [
      { name: "Axis Bank", src: "/IT,commercial/Axis bank.png?v=3", tag: "Banking & Tech" },
      { name: "Reliance Industries", src: "/IT,commercial/Reliance.png?v=3", tag: "Enterprise Conglomerate" },
      { name: "Hikvision", src: "/IT,commercial/Hikvision.png?v=3", tag: "Security Tech" },
      { name: "UST Global", src: "/IT,commercial/UST-global.png?v=3", tag: "IT Services" },
      { name: "Surat Diamond Bourse", src: "/IT,commercial/SDB.png?v=3", tag: "Mega Commercial Hub" },
      { name: "Godrej", src: "/IT,commercial/godrej.png?v=3", tag: "Corporate Campus" },
    ],
  },
  {
    slug: "residential",
    aliases: ["gated-communities", "townships"],
    title: "Residential",
    badge: "Lorem Ipsum",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description: LOREM_HERO,
    coverImage: "/residential.jpg",
    stats: DEMO_CONTAINER_STATS,
    services: [
      {
        title: "Essential Utilities & High-Rise Water/Power Systems",
        description: LOREM_DESC_1,
        accordions: [
          {
            id: 1,
            title: "Hydro-Pneumatic Pumping & Water Supply",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Residential DG Backup & Diesel Fuel Management",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Elevator Safety & Intercom Connectivity",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Resident Helpdesk & Mobile Maintenance App",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "/residential.jpg",
        ],
        reverse: false,
      },
      {
        title: "Clubhouse, Recreational & Landscape Infrastructure",
        description: LOREM_DESC_2,
        accordions: [
          {
            id: 1,
            title: "Swimming Pool Filtration & Chemical Balancing",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Clubhouse HVAC & Gymnasium Maintenance",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Automated Landscape Drip Irrigation & STP Reuse",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Fire Safety, Gates & Boom Barrier Automation",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reverse: true,
      },
    ],
  },
  {
    slug: "manufacturing",
    aliases: ["industrial", "factories"],
    title: "Manufacturing",
    badge: "Lorem Ipsum",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description: LOREM_HERO,
    coverImage: "/manufacturing.jpg",
    stats: DEMO_CONTAINER_STATS,
    services: [
      {
        title: "Heavy Electrical Infrastructure & Power Quality",
        description: LOREM_DESC_1,
        accordions: [
          {
            id: 1,
            title: "HT/LT Substation & Transformer Upkeep",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Power Factor & Harmonic Filtration",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Motor & Rotating Equipment Vibration Analysis",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Thermal Imaging of High-Current Bus Ducts",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "/manufacturing.jpg",
        ],
        reverse: false,
      },
      {
        title: "Industrial Utilities & Environmental Compliance",
        description: LOREM_DESC_2,
        accordions: [
          {
            id: 1,
            title: "Compressed Air System Optimization",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Process Cooling Towers & Industrial Chillers",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Effluent Treatment (ETP) & Pollution Control",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Industrial Fire Suppression & Deluge Systems",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1581092335397-9583fe92d232?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reverse: true,
      },
    ],
  },
  {
    slug: "commercial-corporate",
    aliases: ["commercial", "corporate", "commercial-and-corporate"],
    title: "Commercial & corporate",
    badge: "Lorem Ipsum",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description: LOREM_HERO,
    coverImage: "/commercial.jpg",
    stats: DEMO_CONTAINER_STATS,
    services: [
      {
        title: "Integrated Building Management & Vertical Efficiency",
        description: LOREM_DESC_1,
        accordions: [
          {
            id: 1,
            title: "Smart BMS Centralized Monitoring",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Destination-Dispatch Elevator Systems",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Indoor Air Quality (IAQ) & MERV-13 Filtration",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Acoustic Dampening in Executive Boardrooms",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "/commercial.jpg",
        ],
        reverse: false,
      },
      {
        title: "Sustainable Asset Lifecycle & Corporate Compliance",
        description: LOREM_DESC_2,
        accordions: [
          {
            id: 1,
            title: "Energy & Carbon Reduction Roadmaps",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Façade Maintenance & Cradle Safety Systems",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Statutory Electrical & Fire Life Safety (FLS)",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Predictive Asset Health Dashboards",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reverse: true,
      },
    ],
    clientLogos: [
      { name: "Axis Bank", src: "/IT,commercial/Axis bank.png?v=3", tag: "Corporate Banking" },
      { name: "Reliance Industries", src: "/IT,commercial/Reliance.png?v=3", tag: "Enterprise HQ" },
      { name: "Surat Diamond Bourse", src: "/IT,commercial/SDB.png?v=3", tag: "Commercial Tower" },
      { name: "Godrej", src: "/IT,commercial/godrej.png?v=3", tag: "Corporate Real Estate" },
      { name: "Hikvision", src: "/IT,commercial/Hikvision.png?v=3", tag: "Corporate Campus" },
    ],
  },
  {
    slug: "institution",
    title: "Institution",
    badge: "Lorem Ipsum",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description: LOREM_HERO,
    coverImage: "/institution.jpg",
    stats: DEMO_CONTAINER_STATS,
    services: [
      {
        title: "Campus-Wide Utilities & Scientific Facilities",
        description: LOREM_DESC_1,
        accordions: [
          {
            id: 1,
            title: "Specialized Laboratory Fume Hoods & Exhaust",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Auditorium & Lecture Hall HVAC Operations",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Campus Ring Main Units (RMU) & Substations",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Central Library Micro-Climate Control",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "/institution.jpg",
        ],
        reverse: false,
      },
      {
        title: "Hostel Facilities, Water Hygiene & Green Campus Initiatives",
        description: LOREM_DESC_2,
        accordions: [
          {
            id: 1,
            title: "Centralized Solar Water Heating & RO Plants",
            content: ACC_LOREM_1,
          },
          {
            id: 2,
            title: "Rainwater Harvesting & Ground Water Recharge",
            content: ACC_LOREM_2,
          },
          {
            id: 3,
            title: "Sports Complex & Aquatic Center Maintenance",
            content: ACC_LOREM_3,
          },
          {
            id: 4,
            title: "Campus Emergency Call Points & Fire Hydrant Rings",
            content: ACC_LOREM_4,
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reverse: true,
      },
    ],
  },
];

export function getSectorBySlug(rawSlug: string): SectorData | undefined {
  if (!rawSlug) return undefined;
  const normalized = decodeURIComponent(rawSlug).trim().toLowerCase();
  return SECTORS_DATA.find(
    (s) =>
      s.slug.toLowerCase() === normalized ||
      s.aliases?.some((a) => a.toLowerCase() === normalized)
  );
}

export function getAllSectors(): SectorData[] {
  return SECTORS_DATA;
}

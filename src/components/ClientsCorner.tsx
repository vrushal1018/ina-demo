'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  X,
  Sparkles,
  ChevronRight,
  Search,
  Filter,
  Award,
  Eye,
  ExternalLink
} from 'lucide-react';

interface ClientLogo {
  id: string;
  name: string;
  category: string;
  established: string;
  location: string;
  description: string;
  stats: { label: string; value: string }[];
  collabTitle: string;
  collabQuote: string;
  svg: React.ReactNode;
}

const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: 'vogue',
    name: 'VOGUE',
    category: 'Fashion & Culture',
    established: '1892',
    location: 'New York / Paris',
    description: 'The world’s premier haute couture and cultural trend arbiter, setting high-fashion standards for over a century.',
    stats: [{ label: 'Reach', value: '24M+' }, { label: 'Editions', value: '28 Global' }, { label: 'Collab Year', value: '2024' }],
    collabTitle: 'Botanical Bio-Luxe Feature',
    collabQuote: 'Organimo redefines high-potency skincare through conscious structural biology.',
    svg: <span className="font-serif italic font-bold text-2xl tracking-wider text-neutral-900">VOGUE</span>,
  },
  {
    id: 'forbes',
    name: 'Forbes',
    category: 'Business & Leadership',
    established: '1917',
    location: 'New York, USA',
    description: 'Leading global media company focusing on business, investing, technology, entrepreneurship, and luxury lifestyle.',
    stats: [{ label: 'Readership', value: '140M' }, { label: 'Innovation Rank', value: '#1 Bio-Luxe' }, { label: 'Year', value: '2023' }],
    collabTitle: 'Next-Gen Conscious Chemistry',
    collabQuote: 'Disrupting traditional beauty manufacturing through scalable cellular botanical technology.',
    svg: <span className="font-serif font-black text-2xl tracking-tight text-neutral-900">Forbes</span>,
  },
  {
    id: 'wellness',
    name: 'WELLNESS',
    category: 'Health & Lifestyle',
    established: '2015',
    location: 'Zurich, Switzerland',
    description: 'Pioneering holistic bio-harmony journal dedicated to clean living, micro-nutrition, and environmental health.',
    stats: [{ label: 'Subscribers', value: '4.8M' }, { label: 'Clean Rating', value: '100%' }, { label: 'Score', value: '98.5' }],
    collabTitle: 'Skin Barrier Bio-Synthesis',
    collabQuote: 'An unrivaled standard in cellular repair and microbiome stabilization.',
    svg: <span className="font-sans font-semibold text-sm tracking-[0.3em] uppercase text-neutral-900">WELLNESS</span>,
  },
  {
    id: 'harpers',
    name: "HARPER'S BAZAAR",
    category: 'Luxury & Style',
    established: '1867',
    location: 'Paris, France',
    description: 'A sophisticated voice in luxury, fine art, and high-fashion aesthetics for discerning worldwide readers.',
    stats: [{ label: 'Audience', value: '18M' }, { label: 'Beauty Awards', value: 'Gold 2024' }, { label: 'Features', value: '12' }],
    collabTitle: 'The Pure Lipid Elixir Review',
    collabQuote: 'Liquid gold in visual simplicity. A breathtaking triumph of tactile formulation.',
    svg: <span className="font-serif text-lg tracking-widest uppercase text-neutral-900">HARPER&apos;S</span>,
  },
  {
    id: 'aura',
    name: 'AURA',
    category: 'Modern Aesthetics',
    established: '2020',
    location: 'Copenhagen, Denmark',
    description: 'Minimalist design and high-tech bio-aesthetics journal pioneering modern Nordic ritual skincare.',
    stats: [{ label: 'Design Index', value: 'Top 5' }, { label: 'Purity Index', value: '99.8%' }, { label: 'Year', value: '2024' }],
    collabTitle: 'Nordic Light Synthesis',
    collabQuote: 'Transforming daily skincare into an ethereal architectural sensory ritual.',
    svg: <span className="font-sans font-light text-xl tracking-[0.35em] uppercase text-neutral-900">AURA</span>,
  },
  {
    id: 'elle',
    name: 'ELLE',
    category: 'Global Trends',
    established: '1945',
    location: 'Paris, France',
    description: 'Worldwide lifestyle authority focusing on fashion, beauty, wellness, and contemporary female empowerment.',
    stats: [{ label: 'Global Readers', value: '33M' }, { label: 'Countries', value: '45' }, { label: 'Award', value: 'Eco-Beauty' }],
    collabTitle: 'The Future of Sustainable Glow',
    collabQuote: 'Proof that uncompromising organic purity can outperform synthetic clinical formulas.',
    svg: <span className="font-serif font-extrabold text-xl tracking-widest text-neutral-900">ELLE</span>,
  },
  {
    id: 'goop',
    name: 'GOOP',
    category: 'Wellness & Living',
    established: '2008',
    location: 'Los Angeles, USA',
    description: 'Modern lifestyle and wellness powerhouse curating clean beauty, holistic health, and mindful living.',
    stats: [{ label: 'Community', value: '12M' }, { label: 'Clean Certified', value: 'Grade A' }, { label: 'Exclusives', value: '3' }],
    collabTitle: 'Clean Beauty Vanguard',
    collabQuote: 'Organimo sets a new benchmark for clean, bio-active luxury formulas that instantly transform.',
    svg: <span className="font-serif italic text-lg tracking-wider text-neutral-900">goop</span>,
  },
  {
    id: 'botanica',
    name: 'BOTANICA',
    category: 'Organic Research',
    established: '2012',
    location: 'Kyoto, Japan',
    description: 'International research laboratory exploring botanical cellular extractions and sustainable phyto-technology.',
    stats: [{ label: 'Patents', value: '14 Bio' }, { label: 'Extraction', value: 'Cold-Press' }, { label: 'Purity', value: '100%' }],
    collabTitle: 'Cellular Plant Matrix',
    collabQuote: 'Achieving unprecedented bio-availability through cold-fermented phyto-nutrients.',
    svg: <span className="font-sans font-medium text-sm tracking-[0.25em] uppercase text-neutral-900">BOTANICA</span>,
  },
  {
    id: 'kinfolk',
    name: 'KINFOLK',
    category: 'Design & Culture',
    established: '2011',
    location: 'Copenhagen, Denmark',
    description: 'Slow lifestyle publication celebrating deliberate living, architectural purity, and tactile craftsmanship.',
    stats: [{ label: 'Distribution', value: '100+ Countries' }, { label: 'Paper Grade', value: 'Archive' }, { label: 'Issues', value: '48' }],
    collabTitle: 'The Tactile Sanctuary',
    collabQuote: 'An exquisite study in sensory restraint, minimalist vessel design, and timeless ritual.',
    svg: <span className="font-serif text-lg tracking-widest uppercase text-neutral-900">KINFOLK</span>,
  },
  {
    id: 'lumen',
    name: 'LUMEN',
    category: 'Biotech Innovation',
    established: '2018',
    location: 'Basel, Switzerland',
    description: 'Cutting-edge biotechnology journal focusing on cellular longevity, micro-algae, and photo-receptive enzymes.',
    stats: [{ label: 'Efficacy Rate', value: '99.4%' }, { label: 'Clinical Trials', value: '12 Double' }, { label: 'Purity', value: 'Pharma' }],
    collabTitle: 'Photo-Receptive Longevity',
    collabQuote: 'Unlocking cellular renewal through natural light-harvesting plant enzymes.',
    svg: <span className="font-sans font-bold text-sm tracking-[0.4em] uppercase text-neutral-900">LUMEN</span>,
  },
];

const MARQUEE_LOGOS = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

const PRODUCT_HIGHLIGHTS = [
  {
    id: 'p1',
    name: 'Luminous Micro-Elixir N°01',
    category: 'Cellular Renewal Fluid',
    price: '$185',
    tag: 'Award Winner 2025',
    imageBg: 'from-amber-100 to-amber-200/50',
    description: 'Infused with cold-pressed botanical stem cells and micro-algae lipid extract for radiant barrier repair.',
  },
  {
    id: 'p2',
    name: 'Aura Balancing Serum N°02',
    category: 'Microbiome Restorative',
    price: '$160',
    tag: 'Bestseller',
    imageBg: 'from-stone-100 to-stone-300/50',
    description: 'Bio-fermented hyaluronic complex formulated to restore natural radiance and cellular hydration balance.',
  },
  {
    id: 'p3',
    name: 'Botanica Velvet Nectar N°03',
    category: 'Phyto-Active Night Concentrate',
    price: '$210',
    tag: 'Limited Press Run',
    imageBg: 'from-orange-100 to-amber-100/60',
    description: 'Overnight regenerative elixir blending wild Japanese botanicals and photo-protective liposomes.',
  },
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(1);
  const [selectedLogo, setSelectedLogo] = useState<ClientLogo | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  // Track overall scroll progress inside the multi-screen container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track scroll section milestones & scroll percentage
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollPercentage(Math.round(latest * 100));
      if (latest < 0.32) {
        setActiveStage(1);
      } else if (latest >= 0.32 && latest < 0.65) {
        setActiveStage(2);
      } else {
        setActiveStage(3);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Jump to specific stage
  const scrollToStage = (stageNum: number) => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.scrollHeight - window.innerHeight;
    let targetY = 0;
    if (stageNum === 1) targetY = 0;
    if (stageNum === 2) targetY = containerHeight * 0.45;
    if (stageNum === 3) targetY = containerHeight * 0.85;

    window.scrollTo({
      top: containerRef.current.offsetTop + targetY,
      behavior: 'smooth',
    });
  };

  // Atmosphere Transitions
  const baseBgOpacity = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0]);
  const warmSandBgOpacity = useTransform(scrollYProgress, [0.25, 0.38, 0.72], [0, 1, 1]);
  const emeraldBgOpacity = useTransform(scrollYProgress, [0.65, 0.82, 1], [0, 1, 1]);

  // Floating Parallax Elements
  const columnY = useTransform(scrollYProgress, [0.22, 0.5, 0.8], [220, 0, -100]);
  const shellY = useTransform(scrollYProgress, [0.25, 0.5, 0.85], [280, 0, -140]);
  const fishX = useTransform(scrollYProgress, [0.28, 0.85], [-120, 350]);
  const leafY = useTransform(scrollYProgress, [0.3, 0.8], [180, -60]);

  // Filter logos for Stage 3
  const categories = ['All', 'Fashion & Culture', 'Business & Leadership', 'Health & Lifestyle', 'Modern Aesthetics', 'Organic Research'];
  const filteredLogos = CLIENT_LOGOS.filter((logo) => {
    const matchesCategory = activeCategory === 'All' || logo.category === activeCategory;
    const matchesSearch = logo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      logo.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 font-serif antialiased selection:bg-amber-200 selection:text-neutral-900">

      {/* INTERNAL PAGE NAV (Sticky below SiteHeader's 80px) */}
      <nav className="sticky top-[80px] z-40 flex items-center justify-between px-6 sm:px-10 py-5 backdrop-blur-md bg-white/70 border-b border-neutral-200/50 transition-all">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => scrollToStage(1)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-widest uppercase transition-all ${activeStage === 1 ? 'bg-neutral-900 text-white shadow-sm' : 'bg-neutral-900/5 text-neutral-600 hover:bg-neutral-900/10'
              }`}
          >
            01 / Grid
          </button>
          <button
            onClick={() => scrollToStage(2)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-widest uppercase transition-all ${activeStage === 2 ? 'bg-neutral-900 text-white shadow-sm' : 'bg-neutral-900/5 text-neutral-600 hover:bg-neutral-900/10'
              }`}
          >
            02 / Marquee
          </button>
          <button
            onClick={() => scrollToStage(3)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-widest uppercase transition-all hidden sm:block ${activeStage === 3 ? 'bg-neutral-900 text-white shadow-sm' : 'bg-neutral-900/5 text-neutral-600 hover:bg-neutral-900/10'
              }`}
          >
            03 / Waterfall
          </button>
        </div>
      </nav>

      {/* MAIN SCROLL SCENE */}
      <div ref={containerRef} className="relative w-full h-[360vh]">

        {/* Sticky Fullscreen Scene Container - Top adjusted to clear SiteHeader (80px) + Internal Nav (~76px) = 156px */}
        <div className="sticky top-[156px] w-full h-[calc(100vh-156px)] overflow-hidden">

          {/* BACKGROUND 1: CLEAN PURE WHITE GRID */}
          <motion.div
            style={{ opacity: baseBgOpacity }}
            className="absolute inset-0 z-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px]"
          />

          {/* BACKGROUND 2: SOFT WARM CHAMPAGNE / SAND */}
          <motion.div
            style={{ opacity: warmSandBgOpacity }}
            className="absolute inset-0 z-0 bg-gradient-to-b from-[#FDFBF7] via-[#F4ECE1] to-[#EFE7DE]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.7)_0%,transparent_70%)]" />
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#E5DCB8]/30 to-transparent backdrop-blur-[1px]" />
          </motion.div>

          {/* BACKGROUND 3: EMERALD DEEP BOTANICAL RETREAT */}
          <motion.div
            style={{ opacity: emeraldBgOpacity }}
            className="absolute inset-0 z-0 bg-gradient-to-b from-[#F4F7F4] via-[#E8EFE9] to-[#DFE8E0]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.8)_0%,transparent_80%)]" />
          </motion.div>

          { }
          <AnimatePresence>
            {activeStage >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-10 pointer-events-none"
              >
                {/* Classical Organic Column (Left) */}
                <motion.div
                  style={{ y: columnY }}
                  className="absolute left-[5%] sm:left-[8%] bottom-[18%] w-24 sm:w-32 h-52 sm:h-64 bg-gradient-to-b from-white/80 via-white/40 to-amber-50/20 rounded-t-xl backdrop-blur-md border border-white/60 shadow-2xl flex flex-col items-center justify-between p-4"
                >
                  <div className="w-full h-4 border-b border-neutral-300/60 bg-white/50 rounded-sm" />
                  <div className="w-full h-full my-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,rgba(0,0,0,0.03)_6px,rgba(0,0,0,0.03)_12px)]" />
                  <div className="w-full h-6 border-t border-neutral-300/60 bg-white/70 rounded-sm" />
                </motion.div>

                {/* Shell & Glowing Pearl (Right) */}
                <motion.div
                  style={{ y: shellY }}
                  className="absolute right-[5%] sm:right-[10%] bottom-[22%] w-36 sm:w-48 h-28 sm:h-36 bg-amber-100/40 rounded-[50%_50%_45%_45%] border border-amber-200/60 backdrop-blur-md flex items-center justify-center shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/30 via-pink-100/20 to-transparent" />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 15px rgba(245,230,210,0.8)', '0 0 30px rgba(255,255,255,0.95)', '0 0 15px rgba(245,230,210,0.8)'] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-white via-amber-50 to-neutral-200 border border-white shadow-lg z-10"
                  />
                </motion.div>

                {/* Floating Bio Accent (Light Orb) */}
                <motion.div
                  style={{ x: fishX }}
                  className="absolute top-[22%] left-[12%] w-20 h-10 rounded-full bg-gradient-to-r from-amber-400/30 via-orange-300/40 to-transparent blur-md shadow-[0_0_30px_rgba(245,158,11,0.25)]"
                />

                {/* Floating Botanical Leaf Asset */}
                <motion.div
                  style={{ y: leafY }}
                  className="absolute top-[35%] right-[15%] w-16 h-16 rounded-tl-full rounded-br-full bg-emerald-800/10 border border-emerald-600/20 backdrop-blur-sm rotate-45 hidden md:block"
                />
              </motion.div>
            )}
          </AnimatePresence>

          { }
          <div className="absolute inset-0 z-30 flex items-center justify-center px-4 sm:px-8 pt-20 pb-12">

            {/* STAGE 1: LOGO GRID CARDS */}
            {activeStage === 1 && (
              <motion.div
                key="stage-1-logos"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/5 border border-neutral-200 backdrop-blur-md mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-neutral-600 font-semibold">
                      STAGE 01 — ARCHITECTURAL GRID
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-tight">
                    Global Partners & Featured Media
                  </h2>
                  <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-2 max-w-lg mx-auto">
                    Scroll down to initiate ambient atmosphere shifts and interactive network displays.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
                  {CLIENT_LOGOS.map((logo) => (
                    <motion.div
                      key={logo.id}
                      onClick={() => setSelectedLogo(logo)}
                      whileHover={{ scale: 1.04, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-5 sm:p-6 rounded-2xl bg-white/80 border border-neutral-200/80 backdrop-blur-xl flex flex-col items-center justify-center text-center h-32 sm:h-36 hover:border-neutral-400 hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-md relative overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-3.5 h-3.5 text-neutral-400" />
                      </div>
                      <div className="text-neutral-800 group-hover:text-neutral-900 transition-colors">
                        {logo.svg}
                      </div>
                      <span className="text-[9px] font-sans tracking-widest text-neutral-400 uppercase mt-3 group-hover:text-amber-700 transition-colors">
                        {logo.category}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STAGE 2: INFINITE MARQUEE BANNER */}
            {activeStage === 2 && (
              <motion.div
                key="stage-2-logos"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-neutral-300/80 mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-neutral-700 font-medium">
                    STAGE 02 — CONTINUOUS NETWORK MARQUEE
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-light text-neutral-900 mb-8 max-w-2xl mx-auto leading-snug">
                  Synergistic biological innovation recognized across international publications
                </h3>

                <div className="w-full overflow-hidden py-8 rounded-3xl bg-white/70 backdrop-blur-2xl border border-neutral-300/60 shadow-xl relative">
                  <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none" />
                  <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none" />

                  <motion.div
                    className="flex items-center gap-12 sm:gap-16 w-max"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                      repeat: Infinity,
                      ease: 'linear',
                      duration: 22,
                    }}
                  >
                    {MARQUEE_LOGOS.map((logo, idx) => (
                      <div
                        key={`${logo.id}-${idx}`}
                        onClick={() => setSelectedLogo(logo)}
                        className="text-neutral-900 hover:scale-110 transition-transform duration-200 flex-shrink-0 cursor-pointer p-3 rounded-xl hover:bg-neutral-900/5 flex flex-col items-center gap-1 group"
                      >
                        {logo.svg}
                        <span className="text-[8px] font-sans tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                          Inspect &rarr;
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* STAGE 3: WATERFALL LOGO DISPLAY & FILTER SYSTEM */}
            {activeStage === 3 && (
              <motion.div
                key="stage-3-logos"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl text-center"
              >
                <div className="flex flex-col items-center mb-6">
                  <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-neutral-600 block mb-2 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-neutral-300/60 shadow-sm">
                    STAGE 03 — INTERACTIVE WATERFALL SHOWCASE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light text-neutral-900">
                    Explore Organic Editorial Features
                  </h3>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/80 p-3 rounded-2xl border border-neutral-200 backdrop-blur-md shadow-sm">
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none w-full sm:w-auto">
                    <Filter className="w-3.5 h-3.5 text-neutral-400 ml-2 hidden sm:block" />
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1 rounded-full text-[10px] font-sans tracking-wider uppercase transition-all whitespace-nowrap ${activeCategory === cat
                            ? 'bg-neutral-900 text-white font-medium shadow-sm'
                            : 'text-neutral-600 hover:bg-neutral-100'
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-48">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search partner..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1 rounded-full bg-neutral-100 text-[11px] font-sans focus:outline-none focus:ring-1 focus:ring-neutral-400"
                    />
                  </div>
                </div>

                {/* Waterfall Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-h-[50vh] overflow-y-auto p-2 scrollbar-thin">
                  <AnimatePresence>
                    {filteredLogos.map((logo, i) => (
                      <motion.div
                        key={logo.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={() => setSelectedLogo(logo)}
                        whileHover={{ y: -6, scale: 1.02 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="p-6 rounded-2xl bg-white/80 backdrop-blur-2xl border border-neutral-200/90 flex flex-col items-center justify-between text-center h-36 hover:bg-white hover:border-neutral-400 transition-all shadow-md cursor-pointer group relative overflow-hidden"
                      >
                        <div className="text-neutral-900 group-hover:scale-105 transition-transform">{logo.svg}</div>
                        <div className="flex items-center gap-1 text-[9px] font-sans tracking-widest text-neutral-500 uppercase group-hover:text-neutral-900">
                          <span>View Story</span>
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

          </div>

          {/* Bottom Right Scroll Percentage Progress */}
          <div className="absolute bottom-6 right-6 z-50 flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-neutral-300 text-[10px] font-sans text-neutral-700 shadow-sm">
              <span className="font-mono">{scrollPercentage}%</span>
              <div className="w-12 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-neutral-900 transition-all duration-150" style={{ width: `${scrollPercentage}%` }} />
              </div>
            </div>

            <button
              onClick={() => scrollToStage(activeStage === 3 ? 1 : activeStage + 1)}
              className="p-3 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-lg flex items-center justify-center group"
              title="Next Stage"
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeStage === 3 ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
            </button>
          </div>

        </div>
      </div>

      { }
      <section className="relative z-40 bg-white border-t border-neutral-200 py-24 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">

          {/* Brand Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber-700 font-semibold block mb-3">
                CELLULAR PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-tight mb-6">
                Where clinical biology meets ethereal luxury.
              </h2>
              <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                High-potency phyto-actives extracted through low-temperature bio-fermentation. Every formulation works in direct harmony with cellular lipid matrices to restore natural skin luminosity.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100 font-sans">
                <div>
                  <span className="text-2xl font-bold text-neutral-900 block font-serif">100%</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">Cold-Pressed Botanical</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-neutral-900 block font-serif">0%</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">Synthetic Fillers</span>
                </div>
              </div>
            </div>

            <div className="relative p-8 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between h-96 shadow-inner">
              <div className="absolute top-6 right-6">
                <Award className="w-8 h-8 text-amber-600/60" />
              </div>
              <div>
                <span className="text-xs font-sans tracking-widest text-neutral-400 uppercase">Editorial Choice</span>
                <p className="text-2xl font-serif italic text-neutral-800 mt-4 leading-snug">
                  &quot;Formulating the gold standard for micro-lipid barrier restoration.&quot;
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200/80 pt-4 font-sans text-xs">
                <span className="font-semibold text-neutral-900">International Beauty Panel</span>
                <span className="text-neutral-500">2025 Edition</span>
              </div>
            </div>
          </div>

          {/* Curated Product Display */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-neutral-500 block mb-2">
                  CURATED RITUALS
                </span>
                <h3 className="text-2xl sm:text-4xl font-light text-neutral-900">
                  Featured Micro-Formulations
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRODUCT_HIGHLIGHTS.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-full h-48 rounded-2xl bg-gradient-to-br ${prod.imageBg} mb-6 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[9px] font-sans tracking-wider uppercase font-semibold text-neutral-800">
                        {prod.tag}
                      </span>
                      <div className="w-16 h-28 bg-white/40 rounded-full border border-white/60 backdrop-blur-sm shadow-md flex items-center justify-center">
                        <div className="w-10 h-20 bg-amber-900/10 rounded-full" />
                      </div>
                    </div>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-neutral-400 block mb-1">
                      {prod.category}
                    </span>
                    <h4 className="text-lg font-medium text-neutral-900 mb-2 font-serif">{prod.name}</h4>
                    <p className="text-xs font-sans text-neutral-500 leading-relaxed mb-4">
                      {prod.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100 font-sans">
                    <span className="font-semibold text-neutral-900">{prod.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      { }
      <AnimatePresence>
        {selectedLogo && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-neutral-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLogo(null)}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 w-full max-w-lg h-full bg-white shadow-2xl p-8 sm:p-10 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="px-3 py-1 rounded-full bg-neutral-100 text-[10px] font-sans tracking-widest uppercase font-semibold text-neutral-600">
                    {selectedLogo.category}
                  </span>
                  <button
                    onClick={() => setSelectedLogo(null)}
                    className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center mb-8">
                  {selectedLogo.svg}
                </div>

                <h3 className="text-2xl font-serif text-neutral-900 mb-2">{selectedLogo.name} Collaboration</h3>
                <p className="text-xs font-sans text-neutral-500 leading-relaxed mb-6">
                  {selectedLogo.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {selectedLogo.stats.map((s, i) => (
                    <div key={i} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-center font-sans">
                      <span className="text-xs text-neutral-400 block uppercase tracking-wider text-[9px]">{s.label}</span>
                      <span className="text-sm font-bold text-neutral-900">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Editorial Quote Callout */}
                <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/60 mb-6">
                  <span className="text-[10px] font-sans tracking-widest uppercase text-amber-800 font-bold block mb-1">
                    Featured Article Quote
                  </span>
                  <p className="text-sm font-serif italic text-neutral-800">
                    &quot;{selectedLogo.collabQuote}&quot;
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200 font-sans">
                <button
                  onClick={() => setSelectedLogo(null)}
                  className="w-full py-3.5 rounded-full bg-neutral-900 text-white text-xs tracking-widest uppercase font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  Close Inspection
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
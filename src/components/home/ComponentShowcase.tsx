"use client";

import { useState } from "react";
import {
  Sparkles,
  Heart,
  Share2,
  Bookmark,
  Bell,
  Check,
  Sliders,
  Copy,
  Search,
  Code2,
  Terminal,
  Activity,
  ArrowUpRight,
  Sun,
  Moon,
  Volume2,
  Shield,
  Send,
  Loader2,
  Star,
  CheckCircle,
} from "lucide-react";

const sampleIcons = [
  { name: "Sparkles", icon: Sparkles, category: "UI" },
  { name: "Activity", icon: Activity, category: "Metrics" },
  { name: "Shield", icon: Shield, category: "Security" },
  { name: "Send", icon: Send, category: "Action" },
  { name: "Bell", icon: Bell, category: "Alerts" },
  { name: "Heart", icon: Heart, category: "Social" },
  { name: "Star", icon: Star, category: "Social" },
  { name: "Bookmark", icon: Bookmark, category: "Social" },
  { name: "Share2", icon: Share2, category: "Social" },
  { name: "Sliders", icon: Sliders, category: "UI" },
  { name: "Sun", icon: Sun, category: "Theme" },
  { name: "Moon", icon: Moon, category: "Theme" },
];

export default function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notificationActive, setNotificationActive] = useState(true);

  const filteredIcons = sampleIcons.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const codeSnippet = `import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export function CustomButton() {
  return (
    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-all">
      <Sparkles className="w-4 h-4" />
      <span>Get Started</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}`;

  return (
    <section id="components" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-300">
            <Code2 className="w-3.5 h-3.5 text-pink-400" /> UI Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
            Interactive UI Components & Lucide Gallery
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Explore ready-to-use buttons, cards, notification banners, and icon components.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="glass-panel p-1.5 rounded-xl inline-flex gap-2">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === "preview"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" /> Component Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === "code"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Terminal className="w-4 h-4" /> Code Example
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "preview" ? (
          <div className="space-y-10">
            {/* Component Grid 1: Buttons & Interactive Elements */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-purple-400" />
                Button Variants & Icon Triggers
              </h3>

              <div className="flex flex-wrap items-center gap-4">
                {/* Primary Button */}
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm shadow-md shadow-purple-600/25 flex items-center gap-2 transition-all">
                  <Sparkles className="w-4 h-4" /> Primary Action
                </button>

                {/* Secondary Button */}
                <button className="px-5 py-2.5 rounded-xl glass-panel hover:bg-white/10 text-white font-semibold text-sm flex items-center gap-2 transition-all border border-white/10">
                  <Shield className="w-4 h-4 text-emerald-400" /> Security Check
                </button>

                {/* Loading State Button */}
                <button className="px-5 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-semibold text-sm flex items-center gap-2 cursor-wait border border-white/5">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" /> Processing...
                </button>

                {/* Interactive Like Toggle */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-sm font-semibold ${
                    isLiked
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      : "glass-panel text-zinc-400 border-white/10 hover:text-white"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isLiked ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                  <span>{isLiked ? "Liked (142)" : "Like"}</span>
                </button>

                {/* Interactive Bookmark */}
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-sm font-semibold ${
                    isBookmarked
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "glass-panel text-zinc-400 border-white/10 hover:text-white"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      isBookmarked ? "fill-amber-400 text-amber-400" : ""
                    }`}
                  />
                  <span>{isBookmarked ? "Saved" : "Save"}</span>
                </button>
              </div>
            </div>

            {/* Component Grid 2: Cards & Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Analytics Metric Card */}
              <div className="glass-card p-6 rounded-2xl space-y-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Total Active Users
                  </span>
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-white">48,290</div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% from last week
                  </div>
                </div>
              </div>

              {/* Interactive Notification Widget */}
              <div className="glass-card p-6 rounded-2xl space-y-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">System Alert</h4>
                      <p className="text-xs text-zinc-400">Deployment successful</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationActive(!notificationActive)}
                    className="text-xs text-purple-400 hover:underline"
                  >
                    Toggle
                  </button>
                </div>

                {notificationActive && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      All services operational
                    </span>
                    <span className="text-[10px] text-emerald-400/70">Just now</span>
                  </div>
                )}
              </div>

              {/* Icon Gallery Browser Card */}
              <div className="glass-card p-6 rounded-2xl space-y-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-white flex items-center gap-2">
                    <Search className="w-4 h-4 text-purple-400" />
                    Lucide Icon Search
                  </h4>
                  <span className="text-xs text-zinc-500">
                    {filteredIcons.length} icons
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Filter icons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900/80 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                />
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {filteredIcons.slice(0, 8).map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-white/5 hover:bg-purple-500/20 text-zinc-300 hover:text-purple-300 border border-white/5 hover:border-purple-500/30 flex flex-col items-center justify-center gap-1 transition-all group"
                        title={item.name}
                      >
                        <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] truncate max-w-full text-zinc-500 group-hover:text-zinc-300">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Code View Tab */
          <div className="max-w-4xl mx-auto glass-card p-6 rounded-2xl border border-white/10 relative">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-purple-300">
                src/components/CustomButton.tsx
              </span>
              <span className="text-xs text-zinc-500">Lucide + Tailwind v4</span>
            </div>
            <pre className="overflow-x-auto font-mono text-sm text-zinc-300 p-4 rounded-xl bg-zinc-950/80 border border-white/5">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}

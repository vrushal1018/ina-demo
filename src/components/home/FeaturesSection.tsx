import {
  Feather,
  Zap,
  Globe2,
  Palette,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Feather,
    color: "from-purple-500 to-indigo-500",
    iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    title: "1000+ Lucide React Icons",
    description:
      "Includes clean, consistent SVG icons as React components. Tree-shakeable and easily styled with Tailwind CSS.",
  },
  {
    icon: Zap,
    color: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    title: "Tailwind CSS v4 Engine",
    description:
      "Next-generation styling pipeline featuring instant compilation, high-performance container queries, and inline theme tokens.",
  },
  {
    icon: Cpu,
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    title: "Next.js 15 App Router",
    description:
      "Built with React Server Components, server actions, dynamic routing, and optimized font & asset loading.",
  },
  {
    icon: Palette,
    color: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    title: "Dark Theme & Glassmorphism",
    description:
      "Pre-configured dark palette with sleek backdrop filters, glass reflection styles, and dynamic gradient highlights.",
  },
  {
    icon: ShieldCheck,
    color: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    title: "Strict TypeScript Types",
    description:
      "Fully typed component props and icon options ensuring compile-time safety and superior autocomplete in VS Code.",
  },
  {
    icon: Globe2,
    color: "from-violet-500 to-fuchsia-500",
    iconBg: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    title: "SEO & Performance Ready",
    description:
      "Pre-configured metadata tags, responsive image components, and optimized layout bounds out of the box.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Powerful Features
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
            Everything you need for your modern web app
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Designed for high productivity and visually captivating user interfaces.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl relative group overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl border ${item.iconBg} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

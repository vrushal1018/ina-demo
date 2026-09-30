import { TrendingUp, Zap, Star, ShieldCheck, Download } from "lucide-react";

const stats = [
  {
    icon: Zap,
    value: "100%",
    label: "Lighthouse Score",
    subtext: "Fast load times & performance",
  },
  {
    icon: Star,
    value: "1,400+",
    label: "Lucide React Icons",
    subtext: "Free, open-source icon suite",
  },
  {
    icon: Download,
    value: "< 100ms",
    label: "HMR Hot Reload",
    subtext: "Instant dev feedback loop",
  },
  {
    icon: ShieldCheck,
    value: "Zero",
    label: "Config Bottleneck",
    subtext: "Ready to deploy immediately",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 border-y border-white/10 bg-zinc-950/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-2xl glass-card border border-white/5"
              >
                <div className="p-3 rounded-full bg-purple-500/10 text-purple-400 mb-4 border border-purple-500/20">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-zinc-300 mb-1">
                  {stat.label}
                </span>
                <span className="text-xs text-zinc-500">{stat.subtext}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

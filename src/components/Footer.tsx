import { Sparkles, Code2, MessageSquare, Heart, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-lg font-medium text-white tracking-tight">
              INA Demo
            </span>
            <span className="text-xs text-zinc-500">|</span>
            <span className="text-xs text-zinc-400">
              Next.js 15 • Tailwind v4 • Lucide Icons
            </span>
          </div>

          {/* Icon Links */}
          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 text-xs"
              aria-label="Repository"
            >
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Source</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 text-xs"
              aria-label="Community"
            >
              <MessageSquare className="w-4 h-4 text-pink-400" />
              <span>Community</span>
            </a>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 text-xs"
              aria-label="Next.js Documentation"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Docs</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-zinc-500 flex items-center justify-center gap-1.5">
          <span>Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>using Next.js, Tailwind CSS v4, and Lucide React.</span>
        </div>
      </div>
    </footer>
  );
}

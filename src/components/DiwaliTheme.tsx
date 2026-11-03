"use client";

import React, { useEffect, useState, type CSSProperties } from "react";

/* ------------------------------------------------------------------ *
 *  DIWALI THEME – INA TechFM
 *  ON : keep <DiwaliTheme /> in app/layout.tsx. It shows itself only
 *       between startDate and endDate.
 *  OFF: set enabled to false, or delete <DiwaliTheme /> from layout.tsx.
 * ------------------------------------------------------------------ */
const CONFIG = {
  enabled: true,
  startDate: "2026-11-01", // first day shown (IST) - set to Nov 1 so it's live immediately
  endDate: "2026-11-12", // last day shown (IST)
  greeting: "Happy Diwali from INA TechFM",
  message: "Wishing you and your teams a bright, prosperous festive season.",
  lanterns: true,
  embers: true,
  diya: true, // diya sitting on the bottom edge, flame always glowing
  greetingSeconds: 0, // 0 = greeting card stays until closed
};

function diwaliActive() {
  if (!CONFIG.enabled) return false;
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("diwali") === "true" || params.get("diwali") === "1") return true;
  }
  const now = Date.now();
  const from = new Date(`${CONFIG.startDate}T00:00:00+05:30`).getTime();
  const to = new Date(`${CONFIG.endDate}T23:59:59+05:30`).getTime();
  return now >= from && now <= to;
}

const SWAGS = 6;
const COLORS = ["#ffd37a", "#ffc14d", "#ffe3a0"];

const WIRE_PATH =
  "M0,0 " +
  Array.from({ length: SWAGS }, (_, s) => {
    const x = s * (1200 / SWAGS);
    return `Q${x + 100},36 ${x + 200},0`;
  }).join(" ");

const BULBS = Array.from({ length: SWAGS * 3 }, (_, i) => {
  const swag = Math.floor(i / 3);
  const t = [0.2, 0.5, 0.8][i % 3];
  return {
    left: ((swag + t) / SWAGS) * 100,
    top: 72 * t * (1 - t),
    color: COLORS[i % 3],
    delay: (i * 0.37) % 2.4,
  };
});

const LANTERNS = [
  { left: "5%", w: 40, c: ["#f6c453", "#d9822b"], cord: 14, dur: 7.5, delay: 0 },
  { left: "95%", w: 40, c: ["#f6c453", "#d9822b"], cord: 14, dur: 8.2, delay: -2.5 },
];

const EMBERS = Array.from({ length: 8 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 2 + (i % 3),
  duration: 11 + (i % 5) * 2.5,
  delay: -((i * 1.9) % 14),
  drift: (i % 2 ? 1 : -1) * (12 + (i % 4) * 8),
}));

export default function DiwaliTheme() {
  const [active, setActive] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    if (!diwaliActive()) return;
    let rafId = 0;
    rafId = requestAnimationFrame(() => {
      setActive(true);
      document.documentElement.setAttribute("data-festival", "diwali");
      try {
        setShowGreeting(sessionStorage.getItem("dt-closed") !== "1");
      } catch {
        setShowGreeting(true);
      }
    });

    const timer =
      CONFIG.greetingSeconds > 0
        ? setTimeout(() => setShowGreeting(false), CONFIG.greetingSeconds * 1000)
        : undefined;
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      document.documentElement.removeAttribute("data-festival");
    };
  }, []);

  if (!active) return null;

  const closeGreeting = () => {
    setShowGreeting(false);
    try {
      sessionStorage.setItem("dt-closed", "1");
    } catch { }
  };

  return (
    <div id="dt-root">
      <style>{CSS}</style>

      <svg className="dt-wire" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path d={WIRE_PATH} fill="none" stroke="#b8862b" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>

      {BULBS.map((b, i) => (
        <span
          key={i}
          className="dt-bulb"
          style={{ left: `${b.left}%`, top: b.top, animationDelay: `${b.delay}s`, "--c": b.color } as CSSProperties}
        />
      ))}

      {CONFIG.lanterns &&
        LANTERNS.map((o, n) => (
          <div
            key={n}
            className="dt-l"
            style={{ left: o.left, "--d": `${o.dur}s`, "--dl": `${o.delay}s` } as CSSProperties}
          >
            <i style={{ height: o.cord }} />
            <svg viewBox="0 0 60 100" width={o.w}>
              <defs>
                <radialGradient id={`dtg${n}`} cx="50%" cy="55%" r="60%">
                  <stop offset="0%" stopColor="#fff6c9" />
                  <stop offset="45%" stopColor={o.c[0]} />
                  <stop offset="100%" stopColor={o.c[1]} />
                </radialGradient>
              </defs>
              <path d="M24 0h12l-3 8H27z" fill="#8a5a14" />
              <polygon points="30,8 52,32 52,62 30,86 8,62 8,32" fill={`url(#dtg${n})`} stroke="#7a3f0c" strokeWidth="1.5" />
              <polygon points="30,20 42,34 42,60 30,74 18,60 18,34" fill="none" stroke="#7a3f0c" strokeOpacity=".5" />
              <path d="M30 8v78M8 32l44 30M52 32L8 62" stroke="#7a3f0c" strokeOpacity=".35" fill="none" />
              <path d="M30 86v8" stroke="#8a5a14" strokeWidth="2" />
              <circle cx="30" cy="96" r="3" fill="#ffb21f" />
            </svg>
          </div>
        ))}

      {CONFIG.embers &&
        EMBERS.map((e, i) => (
          <span
            key={i}
            className="dt-em"
            style={{
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              "--x": `${e.drift}px`,
            } as CSSProperties}
          />
        ))}

      {CONFIG.diya && (
        <div className="dt-diya" aria-hidden="true">
          <span className="dt-halo" />
          <svg viewBox="0 0 80 72">
            <g className="dt-flame">
              <path d="M40 4c8 11 11 18 11 25a11 11 0 0 1-22 0c0-7 3-14 11-25Z" fill="#ffb21f" />
              <path d="M40 17c4 6 6 10 6 14a6 6 0 0 1-12 0c0-4 2-8 6-14Z" fill="#fff3c4" />
            </g>
            <path d="M6 42h68c0 17-14 28-34 28S6 59 6 42Z" fill="#c4562a" />
            <path d="M6 42h68" stroke="#e8a33d" strokeWidth="3" strokeLinecap="round" />
            <path d="M20 54c6 6 14 8 20 8" stroke="#e8a33d" strokeOpacity=".5" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {showGreeting && (
        <div className="dt-greet" role="status">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 3c3 4 4 6.5 4 8.5a4 4 0 0 1-8 0C12 9.5 13 7 16 3Z" fill="#ffb21f" />
            <path d="M16 7c1.4 2 2 3.2 2 4.3a2 2 0 0 1-4 0C14 10.2 14.6 9 16 7Z" fill="#fff3c4" />
            <path d="M3 16h26c0 6-5 10-13 10S3 22 3 16Z" fill="#c4562a" />
            <path d="M3 16h26" stroke="#e8a33d" strokeWidth="2" />
          </svg>
          <div>
            <b>{CONFIG.greeting}</b>
            <span>{CONFIG.message}</span>
          </div>
          <button onClick={closeGreeting} aria-label="Close greeting">
            ×
          </button>
        </div>
      )}
    </div>
  );
}

const CSS = `
#dt-root{position:fixed;inset:0;pointer-events:none;z-index:2147483000;overflow:hidden;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}
#dt-root .dt-wire{position:absolute;top:0;left:0;width:100%;height:40px}
#dt-root .dt-bulb{position:absolute;width:6px;height:9px;margin-left:-3px;border-radius:50% 50% 55% 55%/40% 40% 60% 60%;
 background:var(--c);box-shadow:0 0 6px 1px var(--c);animation:dt-tw 3.6s ease-in-out infinite}
#dt-root .dt-bulb::before{content:"";position:absolute;top:-2px;left:50%;width:4px;height:3px;margin-left:-2px;background:#8a6a2a;border-radius:1px}
#dt-root .dt-l{position:absolute;top:0;display:flex;flex-direction:column;align-items:center;transform-origin:50% 0;
 animation:dt-sway var(--d) ease-in-out infinite alternate;animation-delay:var(--dl)}
#dt-root .dt-l i{display:block;width:1px;background:#c9a45a}
#dt-root .dt-l svg{display:block;height:auto;filter:drop-shadow(0 0 8px rgba(255,170,40,.5));animation:dt-fl 4s ease-in-out infinite}
#dt-root .dt-em{position:absolute;bottom:-10px;border-radius:50%;background:#ffd37a;box-shadow:0 0 4px 1px rgba(255,180,60,.6);opacity:0;animation:dt-rise linear infinite}
#dt-root .dt-greet{position:absolute;left:16px;bottom:16px;pointer-events:auto;display:flex;align-items:center;gap:12px;
 max-width:min(340px,calc(100vw - 32px));padding:12px;border-radius:10px;background:#fffaf0;color:#3b2a14;
 border:1px solid #ecd9a8;border-left:3px solid #d9a441;box-shadow:0 6px 22px rgba(0,0,0,.14);font-size:13px;line-height:1.4;
 animation:dt-in .6s ease .8s both}
#dt-root .dt-greet b{display:block;font-size:14px;color:#5c3a0a}
#dt-root .dt-greet span{display:block;color:#6b5a40}
#dt-root .dt-greet svg{width:30px;height:30px;flex:none}
#dt-root .dt-greet>button{margin-left:auto;background:none;border:0;color:#8a6a2a;font-size:20px;line-height:1;cursor:pointer;padding:2px 4px}
#dt-root .dt-greet>button:focus-visible{outline:2px solid #d9a441;outline-offset:2px}
#dt-root .dt-diya{position:absolute;right:24px;bottom:0;width:64px;height:58px}
#dt-root .dt-diya svg{position:relative;display:block;width:100%;height:100%;overflow:visible}
#dt-root .dt-halo{position:absolute;left:50%;top:-38px;width:120px;height:120px;margin-left:-60px;border-radius:50%;
 background:radial-gradient(circle,rgba(255,190,70,.5),rgba(255,160,40,.16) 45%,transparent 70%);animation:dt-halo 2.6s ease-in-out infinite}
#dt-root .dt-flame{transform-box:fill-box;transform-origin:50% 100%;animation:dt-flick 1.8s ease-in-out infinite,dt-tip 2.2s ease-in-out infinite}
@keyframes dt-halo{0%,100%{opacity:.75;transform:scale(.92)}50%{opacity:1;transform:scale(1.08)}}
@keyframes dt-flick{0%,100%{transform:scale(1,1) rotate(0)}25%{transform:scale(.96,1.05) rotate(-1.5deg)}50%{transform:scale(1.03,.97) rotate(1deg)}75%{transform:scale(.98,1.04) rotate(-.5deg)}}
@keyframes dt-tip{0%,100%{filter:drop-shadow(0 0 5px rgba(255,190,60,.8))}50%{filter:drop-shadow(0 0 13px rgba(255,215,100,1))}}
@keyframes dt-tw{0%,100%{opacity:1}50%{opacity:.7}}
@keyframes dt-fl{0%,100%{filter:drop-shadow(0 0 8px rgba(255,170,40,.5)) brightness(1)}50%{filter:drop-shadow(0 0 11px rgba(255,190,60,.7)) brightness(1.06)}}
@keyframes dt-sway{from{transform:rotate(-2.5deg)}to{transform:rotate(2.5deg)}}
@keyframes dt-rise{0%{transform:translate(0,0);opacity:0}10%{opacity:.7}90%{opacity:.4}100%{transform:translate(var(--x),-105vh);opacity:0}}
@keyframes dt-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(max-width:700px){#dt-root .dt-l{display:none}#dt-root .dt-diya{right:14px;width:52px;height:47px}#dt-root .dt-greet{bottom:70px}}
@media(prefers-reduced-motion:reduce){#dt-root .dt-em{display:none}#dt-root .dt-bulb,#dt-root .dt-l,#dt-root .dt-l svg,#dt-root .dt-greet,#dt-root .dt-halo,#dt-root .dt-flame{animation:none}}
`;

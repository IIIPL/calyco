// src/components/MiniVisualizer.jsx
import { useMemo, useState } from "react";
import { flatColors } from "../data/flatColors";
import Swatch from "./Swatch";
import { Link } from "react-router-dom";

// choose 6 popular color names
const QUICK_COLORS = ["Sage Whisper", "Silk Taupe", "Peach Glow", "Indigo Twilight", "Vintage Rose", "Teal Serenity"];

export default function MiniVisualizer() {
  const options = useMemo(() => QUICK_COLORS
    .map(n => flatColors.find(c => c.name === n))
    .filter(Boolean), []);
  const [active, setActive] = useState(options[0]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14 mb-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#493657]">Try Colors Instantly</h2>
        <Link to="/room-visualization" className="hidden md:inline-block px-4 py-2 rounded-xl bg-[#493657] text-white font-semibold">Try Full Visualizer</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* preview */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-black/5 bg-white">
          {/* image: keep it lightweight */}
          <img
            src="/assets/rooms/sample-room.jpg"
            alt="Sample room"
            width="900" height="600"
            loading="lazy"
            className="w-full h-auto"
          />
          {/* colored wall overlay — simple trapezoid mask */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-80 transition-colors duration-300"
            style={{
              background: active?.hex || "#ffffff",
              clipPath: "polygon(5% 35%, 95% 25%, 95% 95%, 5% 95%)" // fake main wall region
            }}
          />
          {/* subtle highlight to fake finish */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(120deg, transparent 60%, rgba(255,255,255,.2) 100%)", clipPath: "polygon(5% 35%, 95% 25%, 95% 95%, 5% 95%)" }}
          />
          <div className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-md bg-white/85 text-sm text-[#493657] shadow">
            {active?.name}
          </div>
        </div>

        {/* controls */}
        <div>
          <p className="text-[#493657]/80 mb-3">Pick a popular color:</p>
          <div className="flex flex-wrap gap-3">
            {options.map(c => (
              <div key={c.name} className="flex flex-col items-center">
                <Swatch hex={c.hex} title={c.name} onClick={() => setActive(c)} className={`ring-2 ${active?.name===c.name ? "ring-[#F0C85A]" : "ring-transparent"}`} />
                <span className="mt-2 text-xs text-[#493657]/70 w-20 text-center">{c.name}</span>
              </div>
            ))}
          </div>

          <Link to="/visualizer" className="mt-6 inline-block md:hidden px-4 py-2 rounded-xl bg-[#493657] text-white font-semibold">
            Try Full Visualizer
          </Link>
        </div>
      </div>
    </section>
  );
}

// src/components/HeroColorShowcase.jsx
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import useAutoRotate from "../hooks/useAutoRotate";
import HeroColorCard from "./HeroColorCard";
import { flatColors } from "../data/flatColors";
import { Link } from "react-router-dom";

const FEATURED = ["Serene Ivory", "Sage Whisper", "Vintage Rose", "Indigo Twilight", "Teal Serenity"]; // pick any 3–5 you like

export default function HeroColorShowcase() {
  const colors = useMemo(
    () => FEATURED.map(n => flatColors.find(c => c.name === n)).filter(Boolean),
    []
  );
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useAutoRotate({ activeIndex: idx, setActiveIndex: setIdx, count: colors.length, delay: 5000, paused });

  const combos = (base) => (base?.combinationcolor || [])
    .map(n => flatColors.find(c => c.name === n))
    .filter(Boolean);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#493657]">Trending Palettes</h2>
          <p className="text-[#493657]/70">Seasonal picks, curated with real color harmony. (use your brain combos, not random 😄)</p>
        </div>
        <Link to="/colors" className="hidden md:inline-block px-5 py-2 rounded-xl bg-[#493657] text-white font-semibold hover:bg-[#301A44]">Explore Colors</Link>
      </div>

      {/* slider */}
      <div
        className="overflow-hidden rounded-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: -((colors.length-1)*100), right: 0 }}
          animate={{ x: `-${idx * 100}%` }}
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
          onDragEnd={(_, info) => {
            // swipe threshold
            const threshold = 80;
            if (info.offset.x < -threshold && idx < colors.length - 1) setIdx(idx+1);
            else if (info.offset.x > threshold && idx > 0) setIdx(idx-1);
          }}
          style={{ width: `${colors.length * 100}%` }}
        >
          {colors.map((c) => (
            <div key={c.name} className="w-full shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8">
              {/* 3 cards visible on desktop; the “hero” in the center is current color */}
              <HeroColorCard color={c} comboColors={combos(c)} />
              <HeroColorCard color={combos(c)[0]} comboColors={combos(combos(c)[0])} />
              <HeroColorCard color={combos(c)[1]} comboColors={combos(combos(c)[1])} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* dots + mobile CTA */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {colors.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all ${i===idx ? "w-6 bg-[#493657]" : "w-2 bg-[#493657]/30"}`} />
          ))}
        </div>
        <Link to="/colors" className="md:hidden inline-block px-4 py-2 rounded-xl bg-[#493657] text-white font-semibold">Explore Colors</Link>
      </div>
    </section>
  );
}

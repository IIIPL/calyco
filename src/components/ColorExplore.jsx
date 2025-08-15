// components/ColorExplore.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flatColors } from "../data/flatColors";
import { groupedShades } from "../data/groupedShades";
import ColorBox from "./ColorComponents/ColorBox";

// --- helpers ---
const hexToHsl = (hex) => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hVal, s, l = (max + min) / 2;
  if (max === min) { hVal = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: hVal = (g - b) / d + (g < b ? 6 : 0); break;
      case g: hVal = (b - r) / d + 2; break;
      default: hVal = (r - g) / d + 4;
    }
    hVal /= 6;
  }
  return { h: Math.round(hVal * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const pickTextColor = (hex = "#ffffff") => {
  const h = hex.replace("#", "");
  const s = h.length === 3 ? h.split("").map(c => c + c).join("") : h.slice(0, 6);
  const r = parseInt(s.slice(0, 2), 16), g = parseInt(s.slice(2, 4), 16), b = parseInt(s.slice(4, 6), 16);
  const toLin = v => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
  const contrastBlack = (L + 0.05) / 0.05;
  const contrastWhite = 1.05 / (L + 0.05);
  return contrastBlack >= contrastWhite ? "#000" : "#fff";
};

// mid-tone fallback if familyHex missing
const representativeFromGroup = (list = []) => {
  if (!list.length) return null;
  const scored = list.map(({ hex }) => {
    const { l, s } = hexToHsl(hex);
    return { hex, score: Math.abs(l - 55) + (100 - s) * 0.1 };
  });
  scored.sort((a, b) => a.score - b.score);
  return scored[0].hex;
};

const ColorExplore = () => {
  const navigate = useNavigate();
  const [expandedFamily, setExpandedFamily] = useState(null);

  // group by family
  const colorsByFamily = flatColors.reduce((acc, color) => {
    const f = color.color_family || "Uncategorized";
    (acc[f] ||= []).push(color);
    return acc;
  }, {});
  const families = Object.keys(colorsByFamily);

  // first color per family fallback
  const familySwatch = useMemo(
    () =>
      families.reduce((acc, fam) => {
        acc[fam] = colorsByFamily[fam][0]?.hex || "#E0E0E0";
        return acc;
      }, {}),
    [families, colorsByFamily]
  );

  // explicit familyHex map (fallback to mid-tone, then to first swatch)
  const familyHexMap = useMemo(() => {
    const m = {};
    groupedShades.forEach(g => {
      m[g.family] = g.familyHex || representativeFromGroup(g.colors) || "#E0E0E0";
    });
    return m;
  }, []);

  const slugify = (t) =>
    t.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-&]+/g, "").replace(/\-\-+/g, "-");

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="w-full mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Color By Family</h1>

        <div className="space-y-5">
          {families.map((family) => {
            const colors = colorsByFamily[family];
            const base = familyHexMap[family] || familySwatch[family]; // use assigned family color
            const txt = pickTextColor(base);

            const btnOverlay = txt === '#000'
              ? 'bg-black/15 hover:bg-black/25 border-black/40'
              : 'bg-white/15 hover:bg-white/25 border-white/40';

            const chipOverlay = txt === '#000'
              ? 'bg-black/10 border border-black/40'
              : 'bg-white/10 border border-white/40';

            return (
              <div key={family} className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
                {/* solid header */}
                <div
                  className="flex justify-between items-center px-6 py-6 font-semibold text-xl cursor-pointer transition"
                  style={{ color: txt, backgroundColor: base }}
                  onClick={() => setExpandedFamily(expandedFamily === family ? null : family)}
                >
                  <span className="flex items-center gap-3 tracking-wide">
                    <span
                      className={`w-7 h-7 inline-flex items-center justify-center rounded-full ${chipOverlay}`}
                      style={{ color: txt }}
                    >
                      {expandedFamily === family ? "−" : "+"}
                    </span>
                    {family}
                  </span>


                  <button
                    className={`text-sm px-3 py-1 rounded-full transition border ${btnOverlay}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/colors/family/${slugify(family)}`);
                    }}
                  >
                    View all {colors.length}
                  </button>
                </div>

                {/* panel */}
                <div
                  className={`transition-all duration-500 ease-in-out bg-white overflow-hidden ${
                    expandedFamily === family
                      ? "max-h-[2000px] opacity-100 py-6 px-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
                    {colors.map((color, i) => (
                      <ColorBox key={i} color={color} familyName={family} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorExplore;

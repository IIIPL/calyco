import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { flatColors } from "../data/flatColors";
import ColorBox from "./ColorComponents/ColorBox";


// Contrast-aware with sensible bias toward black on mid-greys
const pickTextColor = (hex = "#ffffff") => {
  const h = hex.replace("#", "").trim();
  const s = h.length === 3 ? h.split("").map(c => c + c).join("") : h.slice(0, 6);
  const r = parseInt(s.slice(0, 2), 16);
  const g = parseInt(s.slice(2, 4), 16);
  const b = parseInt(s.slice(4, 6), 16);

  const toLin = v => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };

  const L = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);

  const contrastBlack = (L + 0.05) / 0.05;
  const contrastWhite = 1.05 / (L + 0.05);

  const passB = contrastBlack >= 4.5;
  const passW = contrastWhite >= 4.5;

  // If only one passes AA, pick it
  if (passB && !passW) return "#000";
  if (passW && !passB) return "#fff";

  // If both pass, prefer black on mid-luminance (fixes greys like #757575)
  if (passB && passW) {
    if (L >= 0.15 && L <= 0.5) return "#000";
    return contrastBlack >= contrastWhite ? "#000" : "#fff";
  }

  // If neither passes (rare with solid colors), pick the higher contrast
  return contrastBlack >= contrastWhite ? "#000" : "#fff";
};


const ColorExplore = () => {
  const navigate = useNavigate();
  const [expandedFamily, setExpandedFamily] = useState(null);

  const colorsByFamily = flatColors.reduce((acc, color) => {
    const family = color.color_family || "Uncategorized";
    if (!acc[family]) acc[family] = [];
    acc[family].push(color);
    return acc;
  }, {});

  const familyColors = {
    "REDS & ORANGES": "#FF1F1F",
    "YELLOWS & GREENS": "#FFD600",
    GREENS: "#486C6C",
    BLUES: "#1F3D7A",
    "PURPLES & PINKS": "#9C27B0",
    GREYS: "#757575",
    "WHITES & OFF WHITES": "#F5F5F5",
    BROWNS: "#6D4C41",
  };

  const getColor = (family) => familyColors[family] || "#E0E0E0";

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-&]+/g, "")
      .replace(/\-\-+/g, "-");

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="w-full mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Color By Family</h1>

        <div className="space-y-4">
          {Object.entries(colorsByFamily).map(([family, colors]) => {
            const bg = getColor(family);
            const txt = pickTextColor(bg);
            const borderClass = txt === "#000" ? "border-black" : "border-white";

            return (
              <div key={family} className="rounded overflow-hidden shadow">
                <div
                  className={`flex justify-between items-center px-6 py-4 font-semibold text-lg cursor-pointer transition-all duration-300 transform hover:brightness-105 hover:shadow-md ${
                    expandedFamily === family ? "brightness-105 shadow-lg" : ""
                  }`}
                  style={{ backgroundColor: bg, color: txt }}
                  onClick={() =>
                    setExpandedFamily(expandedFamily === family ? null : family)
                  }
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 inline-flex items-center justify-center rounded-full border ${borderClass} text-sm font-bold transition-transform duration-300`}
                      style={{ lineHeight: 1 }}
                    >
                      {expandedFamily === family ? "-" : "+"}
                    </span>
                    {family}
                  </span>
                  <span
                    className="text-sm underline cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/colors/family/${slugify(family)}`);
                    }}
                  >
                    View All {colors.length} {family.split(" ")[0]}
                  </span>
                </div>

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

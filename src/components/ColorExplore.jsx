import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { flatColors } from "../data/flatColors";
import ColorBox from "./ColorComponents/ColorBox";

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
    "GREENS": "#486C6C",
    "BLUES": "#1F3D7A",
    "PURPLES & PINKS": "#9C27B0",
    "GREYS": "#757575",
    "WHITES & OFF WHITES": "#F5F5F5",
    "BROWNS": "#6D4C41",
  };

  const getColor = (family) => familyColors[family] || "#E0E0E0";



  const slugify = (text) =>
    text.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="w-full mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Color By Family</h1>

        <div className="space-y-4">
          {Object.entries(colorsByFamily).map(([family, colors]) => (
            <div key={family} className="rounded overflow-hidden shadow">
              <div
                className={`flex justify-between items-center px-6 py-4 font-semibold text-lg cursor-pointer transition-all duration-300 transform hover:brightness-105 hover:shadow-md ${
                  expandedFamily === family ? "brightness-105 shadow-lg" : ""
                }`}
                style={{ backgroundColor: getColor(family), color: '#000' }}
                onClick={() =>
                  setExpandedFamily(expandedFamily === family ? null : family)
                }
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 inline-flex items-center justify-center rounded-full border border-black text-sm font-bold transition-transform duration-300`}
                    style={{ lineHeight: 1 }}
                  >
                    {expandedFamily === family ? '-' : '+'}
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
                  View All {colors.length} {family.split(" ")[0]}s
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
                    <ColorBox
                      key={i}
                      color={color}
                      familyName={family}
                    />
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorExplore;

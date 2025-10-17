import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllColors } from "../data/calycoColors.js";
import { reverseColorNameMapping } from "../data/colorNameMapping";

const ALL_COLORS = getAllColors();

const toSlug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildSearchHaystack = (color) => {
  const pieces = [
    color.name,
    color.calycoName,
    color.undertone,
    color.tonality,
    color.collection,
    color.colorCollection,
    color.description,
    Array.isArray(color.tags) ? color.tags.join(" ") : "",
  ];
  return pieces.join(" ").toLowerCase();
};

const isBlueGreen = (color) => {
  if (!["Greens", "Blues"].includes(color.colorFamily)) return false;
  return /(teal|turquoise|lagoon|aqua|cyan|sea|blue[\s-]?green)/i.test(buildSearchHaystack(color));
};

const isYellowGreen = (color) => {
  if (color.colorFamily !== "Greens") return false;
  return /(yellow|lime|chartreuse|olive|gold|citrus)/i.test(buildSearchHaystack(color));
};

const FAMILY_DEFINITIONS = [
  {
    key: "whites-off-whites",
    label: "WHITES & OFF-WHITES",
    matcher: (c) => c.colorFamily === "Whites",
    families: ["Whites"],
  },
  {
    key: "yellows-golds",
    label: "YELLOWS & GOLDS",
    matcher: (c) => c.colorFamily === "Yellows & Golds",
    families: ["Yellows & Golds"],
  },
  { key: "oranges", label: "ORANGES", matcher: (c) => c.colorFamily === "Oranges", families: ["Oranges"] },
  {
    key: "reds-pinks",
    label: "REDS & PINKS",
    matcher: (c) => c.colorFamily === "Reds & Pinks",
    families: ["Reds & Pinks"],
  },
  {
    key: "purples-violets",
    label: "PURPLES & VIOLETS",
    matcher: (c) => c.colorFamily === "Purples & Violets",
    families: ["Purples & Violets"],
  },
  { key: "blues", label: "BLUES", matcher: (c) => c.colorFamily === "Blues", families: ["Blues"] },
  { key: "blue-greens", label: "BLUE GREENS", matcher: (c) => isBlueGreen(c), families: ["Greens", "Blues"] },
  { key: "greens", label: "GREENS", matcher: (c) => c.colorFamily === "Greens", families: ["Greens"] },
  {
    key: "yellow-greens",
    label: "YELLOW GREENS",
    matcher: (c) => isYellowGreen(c),
    families: ["Greens"],
  },
  {
    key: "neutrals",
    label: "NEUTRALS - BROWNS, GREYS",
    matcher: (c) => ["Grays", "Earth Tones", "Beiges & Tans"].includes(c.colorFamily),
    families: ["Grays", "Earth Tones", "Beiges & Tans"],
  },
  {
    key: "metallics",
    label: "SPECIALTY METALLICS",
    matcher: (c) => c.colorFamily === "Specialty Metallics",
    families: ["Specialty Metallics"],
  },
  {
    key: "beiges-tans",
    label: "BEIGES & TANS",
    matcher: (c) => c.colorFamily === "Beiges & Tans",
    families: ["Beiges & Tans"],
  },
];

const getActualHexColor = (value) => {
  if (value && value.startsWith("#")) return value;
  return reverseColorNameMapping[value] || "#CCCCCC";
};

const buildGradient = (colors) => {
  const stops = colors.slice(0, 3).map((color, index) => {
    const hex = getActualHexColor(color.hex);
    const position = index === 0 ? "0%" : index === 1 ? "55%" : "100%";
    return `${hex} ${position}`;
  });

  if (stops.length === 0) {
    return "linear-gradient(135deg, #9ca3af, #6b7280)";
  }

  if (stops.length === 1) {
    stops.push(`${stops[0].split(" ")[0]} 100%`);
  }

  return `linear-gradient(135deg, ${stops.join(", ")})`;
};

const ColorsDropdown = ({ onSelect, isMobile = false }) => {
  const familyData = useMemo(() => {
    return FAMILY_DEFINITIONS.map((family) => {
      const colors = ALL_COLORS.filter(family.matcher);
      return {
        ...family,
        colors,
        gradient: buildGradient(colors),
      };
    }).filter((item) => item.colors.length > 0);
  }, []);

  const [hoveredFamilyKey, setHoveredFamilyKey] = useState(
    familyData.length ? familyData[0].key : null
  );
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAllClick = () => {
    navigate("/colors");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (onSelect) onSelect();
  };

  const handleFamilyClick = (family) => {
    const targetFamily = family.families?.[0] || family.colors[0].colorFamily;
    navigate(`/colors/family/${toSlug(targetFamily)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (onSelect) onSelect();
  };

  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-start">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#493657] hover:text-[#F0C85A] flex justify-between w-full"
        >
          <span>Colors</span>
          <span className={`transform transition-transform ${open ? "rotate-90" : ""}`}>☰</span>
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          } w-full`}
        >
          <div className="pl-1 py-3 flex flex-col gap-3">
            <button
              onClick={handleAllClick}
              className="text-[#493657] hover:text-[#F0C85A] uppercase font-bold text-left"
            >
              SEE ALL COLORS
            </button>
            {familyData.map((family) => (
              <button
                key={family.key}
                onClick={() => handleFamilyClick(family)}
                className="w-full text-left rounded-lg overflow-hidden shadow-sm border border-gray-200"
                style={{ backgroundImage: family.gradient }}
              >
                <div className="backdrop-brightness-90 bg-black/20 text-white font-semibold py-3 px-4 text-sm">
                  {family.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-xl z-50 font-poppins">
      <div
        className="
          max-w-screen-xl mx-auto
          px-4 sm:px-6 md:px-10 lg:px-24
          py-8 md:py-12 lg:py-14
          flex gap-8 lg:gap-12
          items-start
        "
      >
        <div className="flex flex-col min-w-[200px] pr-10 gap-3 mr-6">
          <button
            className="text-left text-base lg:text-lg font-bold uppercase py-1.5 md:py-2 pr-6 border-b-2 border-[#493657] text-[#493657] hover:text-[#F0C85A] w-full"
            onClick={handleAllClick}
          >
            SEE ALL COLORS
          </button>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
            {familyData.map((family) => (
              <button
                key={family.key}
                className={`relative h-16 md:h-20 rounded-xl flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#493657] ${
                  hoveredFamilyKey === family.key ? "ring-2 ring-offset-2 ring-[#493657]" : ""
                }`}
                style={{ backgroundImage: family.gradient }}
                onMouseEnter={() => setHoveredFamilyKey(family.key)}
                onFocus={() => setHoveredFamilyKey(family.key)}
                onClick={() => handleFamilyClick(family)}
                type="button"
              >
                <div className="absolute inset-0 bg-black/20" />
                <span className="relative z-10 text-white font-semibold text-sm md:text-base text-center px-3">
                  {family.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorsDropdown;

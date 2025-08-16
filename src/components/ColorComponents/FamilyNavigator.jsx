import React, { useMemo, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flatColors } from "../../data/flatColors";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";



const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-&]+/g, '')
      .replace(/\-\-+/g, '-');

      
export default function FamilyNavigator() {
  const { familyName } = useParams();
  const navigate = useNavigate();
  const scrollerRef = useRef(null);

  const families = useMemo(() => {
    const seen = new Set();
    return flatColors
      .map((c) => c.color_family)
      .filter((f) => f && !seen.has(f) && seen.add(f));
  }, []);

  const familyHex = useMemo(() => {
    const map = {};
    families.forEach((f) => {
      const first = flatColors.find((c) => c.color_family === f);
      map[f] = first?.hex || "#ccc";
    });
    return map;
  }, [families]);

  const activeIndex = useMemo(() => {
    const fromSlug = (familyName || "").toLowerCase();
    return families.findIndex((f) => slugify(f) === fromSlug);
  }, [families, familyName]);

  const goToFamily = (family) => {
    navigate(`/colors/family/${slugify(family)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = () => {
    if (!families.length) return;
    const i = activeIndex <= 0 ? families.length - 1 : activeIndex - 1;
    goToFamily(families[i]);
  };
  const goNext = () => {
    if (!families.length) return;
    const i = activeIndex >= families.length - 1 ? 0 : activeIndex + 1;
    goToFamily(families[i]);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || activeIndex < 0) return;
    const chip = el.querySelector(`[data-family-index="${activeIndex}"]`);
    if (!chip) return;
    const chipRect = chip.getBoundingClientRect();
    const wrapRect = el.getBoundingClientRect();
    const delta =
      chipRect.left - (wrapRect.left + wrapRect.width / 2 - chipRect.width / 2);
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, [activeIndex]);

  return (
    <div className="top-20 z-40 bg-white border-y border-[#e5e0d8] my-5">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 lg:px-24 py-3">
        <div className="flex items-center gap-2">
          {/* Prev */}
          {/* <button
            aria-label="Previous family"
            onClick={goPrev}
            className="p-2 rounded-lg border border-[#e5e0d8] hover:bg-gray-50"
          >
            <ChevronLeftIcon className="w-5 h-5 text-[#1a1a1a]" />
          </button> */}

          {/* Chips scroller */}
          <div ref={scrollerRef} className="flex-1 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 py-1 justify-center">
            {families.map((f, idx) => {
  const isActive = idx === activeIndex;
  return (
    <button
      key={f}
      data-family-index={idx}
      onClick={() => goToFamily(f)}
      className="flex flex-col items-center gap-2 px-2 focus:outline-none"
      title={f}
    >
      {/* square swatch */}
      <span
        className={`
          block rounded-sm border transition-all
          ${isActive ? "border-gray-900 border-2" : "border-gray-300"}
          w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
        `}
        style={{ backgroundColor: familyHex[f] || "#ccc" }}
        aria-label={`${f} swatch`}
      />

      {/* family name */}
      <span
        className={`font-medium text-center ${
          isActive
            ? "underline decoration-2 underline-offset-2"
            : "text-gray-700"
        }`}
      >
        <span className="text-xs sm:text-sm md:text-base lg:text-lg">
          {f.split(" ")[0]}
        </span>
      </span>
    </button>
  );
})}

            </div>
          </div>

          {/* Next */}
          {/* <button
            aria-label="Next family"
            onClick={goNext}
            className="p-2 rounded-lg border border-[#e5e0d8] hover:bg-gray-50"
          >
            <ChevronRightIcon className="w-5 h-5 text-[#1a1a1a]" />
          </button> */}
        </div>
      </div>
    </div>
  );
}

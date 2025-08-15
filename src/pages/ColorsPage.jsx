import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { colorGroups } from "../data/colorGroups";
import ColorExplorer from "../components/ColorExplore";
import { useNavigate } from "react-router-dom";
import ColorDisclaimer from "../components/ColorComponents/ColorDisclaimer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function ColorsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const filterRef = useRef(null);

  useEffect(() => {
    document.title = "Calyco Sacred Palette";
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeColor ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [activeColor]);

  const filters = colorGroups.map((group) => group.title);

  const toggleFilter = (title) => {
    setFilter((prev) => {
      const updated = prev.includes(title)
        ? prev.filter((f) => f !== title)
        : [...prev, title];

      setTimeout(() => {
        if (filterRef.current) {
          filterRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 30);

      return updated;
    });
  };

  const filteredGroups =
    filter.length === 0
      ? colorGroups
      : colorGroups.filter((group) => filter.includes(group.title));

  const totalColors = filteredGroups.reduce(
    (acc, group) => acc + group.colors.length,
    0
  );

  return (
    <div className="font-poppins bg-white min-h-screen flex flex-col items-center mt-24 sm:mt-32">
      <div className="w-full px-1 sm:px-2">
        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:gap-10 mb-10">
          <img
            src="/Assets/color-banner.png"
            className="w-full rounded-xl object-cover"
            alt="Calyco Paint Buckets"
          />
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-4">
              Calyco Sacred Palette
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              High-quality paint you can trust in our signature range of 108
              pigment-rich colours. Expertly formulated and available in
              low-VOC, water-based finishes — perfect for every surface and
              style.
            </p>
          </div>
        </div>

        {/* SEE BY COLOR */}
        {/* Removed h-96 and mb-32 from this div as ColorExplorer now renders its own height */}
        {/* Ensure ColorExplorer doesn't have a fixed height if you want it to flow naturally */}
        <div className="w-full relative z-0"> {/* Added relative and z-0 */}
          <ColorExplorer />
        </div>
        

        {/* Color Disclaimer */}
        <div className="px-6 md:px-12 mb-10">
          <ColorDisclaimer variant="full" />
        </div>

       
       
      </div>
    </div>
  );
}
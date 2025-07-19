import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { colorGroups } from "../data/colorGroups";

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
  const [filter, setFilter] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  useEffect(() => {
    document.title = "Calyco Sacred Palette";
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeColor ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [activeColor]);

  const filters = colorGroups.map((group) => group.title);

  const toggleFilter = (title) => {
    setFilter((prev) =>
      prev.includes(title) ? prev.filter((f) => f !== title) : [...prev, title]
    );
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
      <div className="w-full max-w-7xl px-4 sm:px-6">
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

        {/* Filter Bar */}
        <div className="sticky top-20 md:top-24 z-40 bg-white w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 px-4 sm:px-6 py-3 border-b border-gray-100">

          <span className="text-sm text-gray-700 font-medium shrink-0 pr-1">
            Filter by:
          </span>
          <div className="flex items-center w-full overflow-x-auto hide-scrollbar scroll-smooth gap-2 pb-1">
            {filters.map((title) => (
              <button
                key={title}
                onClick={() => toggleFilter(title)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm whitespace-nowrap font-medium transition-all shrink-0 ${
                  filter.includes(title)
                    ? "bg-[#301A44] text-white border-[#301A44]"
                    : "bg-[#f3f3f3] border border-gray-300 text-gray-700 hover:border-[#301A44]"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: colorGroups.find((g) => g.title === title)
                      ?.colors[0].hex,
                  }}
                ></span>
                {title.split(" ")[0]}
              </button>
            ))}
          </div>

          <div className="flex items-center shrink-0 sm:pl-3">
            <span className="text-sm text-gray-700 font-medium border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 pl-0 sm:pl-3 border-gray-300">
              {filter.length === 0 ? "108" : totalColors} colours
            </span>
          </div>
        </div>

        {/* Swatch Grid */}
        {filteredGroups.map((group, idx) => (
          <motion.div
            key={group.title}
            className="mb-14"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={idx}
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-6 flex items-center">
              <span>{group.title}</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {group.colors.map((color, i) => (
                <motion.div
                  key={color.name + color.hex}
                  onClick={() => setActiveColor(color)}
                  className="cursor-pointer rounded-2xl bg-[#faf9f7] border border-gray-100 shadow-sm flex flex-col items-start p-3 sm:p-4 transition hover:shadow-md"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  custom={i}
                >
                  <div
                    className="w-full aspect-square rounded-xl mb-3"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div className="flex flex-col w-full">
                    <span className="font-semibold text-gray-800 text-sm sm:text-base mb-1 flex items-center">
                      {color.name}
                      <span className="ml-2 text-gray-400 text-lg">→</span>
                    </span>
                    <span className="text-xs text-gray-500">
                      {color.code || (8000 + i + 1)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Modal */}
        {activeColor && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-2 sm:px-4">
            <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setActiveColor(null)}
                className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl z-10"
              >
                ×
              </button>
              <div className="flex flex-col md:flex-row w-full">
                {/* Color Preview */}
                <div
                  className="w-full md:w-1/2 aspect-square"
                  style={{ backgroundColor: activeColor.hex }}
                ></div>

                {/* Info Section */}
                <div className="p-4 sm:p-6 flex flex-col gap-2 md:w-1/2">
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#2d2d2d]">
                    {activeColor.name}
                  </h2>

                  {/* Optional Hex / Code Display */}
                  <p className="text-sm text-gray-500">
                    Code: {activeColor.code || "—"} <br />
                    Hex: {activeColor.hex}
                  </p>

                  {/* Placeholder for Description */}
                  <p className="text-sm text-gray-600 mt-3">
                    A beautifully formulated colour from the Calyco Sacred Palette.
                    Designed for timeless walls and inspired by nature and culture.
                  </p>

                  <button className="mt-6 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-900 w-fit">
                    Add Sample to basket
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

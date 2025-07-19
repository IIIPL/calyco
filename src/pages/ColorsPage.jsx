import React, { useState } from "react";
import { motion } from "framer-motion";
import { colorGroups } from "../data/colorGroups";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function ColorsPage() {
  const [filter, setFilter] = useState([]);

  const filters = colorGroups.map((group) => group.title);

  const toggleFilter = (title) => {
    if (filter.includes(title)) {
      setFilter(filter.filter((f) => f !== title));
    } else {
      setFilter([...filter, title]);
    }
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
    <div className="font-poppins bg-white min-h-screen flex flex-col items-center mt-32">
      <div className="w-full max-w-7xl px-2 md:px-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 mb-10">
          <img
            src="/Assets/color-banner.png"
            className="w-full rounded-xl object-cover"
            alt="Calyco Paint Buckets"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-4">
              Paint
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              High-quality paint you can trust in our signature range of 108
              pigment-rich colours. Expertly formulated and available in
              low-VOC, water-based finishes — perfect for every surface and
              style.
            </p>
          </div>
        </div>

        {/* Filter + Count Row */}
        <div className="w-full flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center w-full overflow-x-auto hide-scrollbar scroll-smooth gap-2">
            <span className="text-sm text-gray-700 font-medium shrink-0 pr-1">
              Filter by:
            </span>

            {filters.map((title) => (
              <button
                key={title}
                onClick={() => toggleFilter(title)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm whitespace-nowrap font-medium transition-all shrink-0 ${
                  filter.includes(title)
                    ? "bg-[#301A44] text-white border-[#301A44]"
                    : "bg-[#f3f3f3] border border-gray-300 text-gray-700 hover:border-[#301A44]"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: colorGroups.find((g) => g.title === title)?.colors[0].hex,
                  }}
                ></span>
                {title.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Total Count */}
          <div className="flex items-center shrink-0 pl-3">
            <span className="text-sm text-gray-700 font-medium border-l pl-3 border-gray-300">
              {filter.length === 0 ? "108" : totalColors} colours
            </span>
          </div>
        </div>

        {/* Groups */}
        {filteredGroups.map((group, idx) => (
          <motion.div
            key={group.title}
            className="mb-14"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={idx}
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-6 flex items-center">
              <span>{group.title}</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {group.colors.map((color, i) => (
                <motion.div
                  key={color.name + color.hex}
                  className="rounded-2xl bg-[#faf9f7] border border-gray-100 shadow-sm flex flex-col items-start p-4 relative group transition hover:shadow-md"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  custom={i}
                >
                  {/* Color Swatch */}
                  <div
                    className="w-full aspect-square rounded-xl mb-4"
                    style={{ backgroundColor: color.hex }}
                  ></div>

                  {/* Color Name and Code */}
                  <div className="flex flex-col w-full">
                    <span className="font-semibold text-gray-800 text-base mb-1 flex items-center">
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
      </div>
    </div>
  );
}

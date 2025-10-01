import React from "react";
import { motion } from "framer-motion";
import { flatColors } from "../../data/flatColors";
import { useNavigate } from "react-router-dom";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w\-&]+/g, '')   // Remove all non-word chars EXCEPT hyphens and '&'
    .replace(/\-\-+/g, '-');     // Collapse multiple hyphens



export const ColorTrends = () => {
    const displayedColors = [...flatColors]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5); // Show 5 random colors

  const navigate = useNavigate();

  const getTextColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? "text-black" : "text-white";
  };

  const handleClick = (color) => {
      const familySlug = slugify(color.color_family || "all");
      const colorSlug = slugify(color.name);
      navigate(`/colors/family/${familySlug}/${colorSlug}`);
  };

  return (
    
    <section className="px-6 md:px-20 py-20 bg-white overflow-hidden">
  {/* Header */}
  <motion.div
    className="text-right mb-10"
    initial={{ opacity: 0, x: 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2 className="text-4xl md:text-5xl font-bold text-[#2C194B]">Color Trends 2025</h2>
    <p className="text-lg text-[#2C194B]/70">Explore timeless elegance & modern warmth</p>
  </motion.div>

  {/* First Color Cards Block */}
  <motion.div
    className="grid grid-cols-5"
    initial={{ opacity: 0, x: -80 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    {displayedColors.map((color, index) => {
      const textColor = getTextColor(color.hex);
      return (
        <div
          key={index}
          onClick={() => handleClick(color)}
          className={`aspect-[4/5] p-4 flex flex-col justify-between shadow-md transition-all duration-300 cursor-pointer`}
          style={{ backgroundColor: color.hex }}
        >
          <div></div>
          <div className={`text-sm ${textColor}`}>
            <div className="font-semibold text-base">{color.name}</div>
            <div className="text-xs opacity-80">{color.hex}</div>
          </div>
        </div>
      );
    })}
  </motion.div>

  {/* Duplicate Color Cards Block at Bottom */}
<motion.div
  className="mt-20 grid grid-cols-5"
  initial={{ opacity: 0, x: 80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  {[...flatColors]
    .filter(color => !displayedColors.includes(color))
    .sort(() => 0.5 - Math.random())
    .slice(0, 5)
    .map((color, index) => {
      const textColor = getTextColor(color.hex);
      return (
        <div
          key={`secondary-${index}`}
          onClick={() => handleClick(color)}
          className={`aspect-[4/5] p-4 flex flex-col justify-between shadow-md transition-all duration-300 cursor-pointer`}
          style={{ backgroundColor: color.hex }}
        >
          <div></div>
          <div className={`text-sm ${textColor}`}>
            <div className="font-semibold text-base">{color.name}</div>
            <div className="text-xs opacity-80">{color.hex}</div>
          </div>
        </div>
      );
    })}
</motion.div>

  {/* Final CTA Button (Always at Bottom) */}
  <motion.div
    className="text-right mt-12"
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <button
      className="bg-[#2C194B] text-white px-6 py-3 rounded-full hover:bg-[#443060] transition"
      onClick={() => navigate('/colors')}
    >
      Explore All Colors
    </button>
  </motion.div>
</section>

  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getPopularColors } from '../data/homepageColors';

const PopularColorsGrid = () => {
  const navigate = useNavigate();

  // Get popular colors from database
  const dbColors = getPopularColors();

  // Map database colors to component format
  const popularColors = dbColors.map((color, index) => ({
    id: index + 1,
    name: color.name,
    hex: color.hex.startsWith('#') ? color.hex : `#${color.hex}`,
    code: color.code || color.ralCode,
    isBestSeller: color.popularity === "High" || color.name === "Linen",
    colorFamily: color.colorFamily,
    temperature: color.temperature || color.colorTemperature,
    description: color.mood || color.description,
    ...color // Include all other properties from database
  }));

  const handleColorClick = (color) => {
    // Convert color family to URL-friendly format
    const family = color.colorFamily
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[&]/g, '-');

    // Convert color name to URL-friendly format
    const colorName = color.name
      .toLowerCase()
      .replace(/\s+/g, '-');

    // Navigate to color detail page
    navigate(`/colors/family/${family}/${colorName}`);
  };

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
          {/* Title and Description - Above the grid */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-[1.1] tracking-wide"
            >
              Popular colours
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-[#493657]/70 leading-relaxed tracking-wide max-w-3xl mx-auto"
            >
              From favourite whites to the most popular greens, discover the shades most loved by our decorators.
            </motion.p>
          </div>

          {/* Color Grid - Single row design */}
          <div className="w-full max-w-7xl mx-auto overflow-x-auto">
            {/* Single horizontal row of color swatches */}
            <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 min-w-max">
              {popularColors.map((color, index) => (
                <motion.div
                  key={color.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer flex-shrink-0"
                  onClick={() => handleColorClick(color)}
                >
                  <div 
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-gray-200"
                    style={{ 
                      backgroundColor: color.hex
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularColorsGrid;

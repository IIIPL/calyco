import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CompatibleColors = ({ colors }) => {
  const navigate = useNavigate();

  const handleColorClick = (colorSlug) => {
    navigate(`/colors/${colorSlug}`);
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Compatible Colors
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Explore our curated palette that works perfectly with this paint
      </p>

      <div className="relative">
        {/* Left Gradient Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Color Scroller */}
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {colors.map((color, index) => (
            <motion.div
              key={color.slug}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 group cursor-pointer"
            >
              <div className="relative">
                {/* Color Block */}
                <div
                  className="w-32 h-32 rounded-2xl shadow-lg border-2 border-white hover:border-purple-300 transition-all duration-300 group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="bg-white/90 backdrop-blur-sm text-purple-600 px-4 py-2 rounded-full font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      See in room →
                    </motion.div>
                  </div>
                </div>

                {/* Color Info */}
                <div className="mt-3 text-center">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {color.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono">
                    {color.hex}
                  </p>
                </div>

                {/* Click Handler */}
                <button
                  onClick={() => handleColorClick(color.slug)}
                  className="absolute inset-0 w-full h-full opacity-0"
                  aria-label={`View ${color.name} color details`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View All Colors CTA */}
      <div className="mt-8">
        <motion.button
          onClick={() => navigate('/colors')}
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Colors
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.button>
      </div>

      {/* Color Tips */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl max-w-2xl mx-auto">
        <h4 className="font-semibold text-gray-800 mb-2">🎨 Color Coordination Tips</h4>
        <ul className="text-sm text-gray-700 space-y-1 text-left">
          <li>• Use the 60-30-10 rule: 60% dominant, 30% secondary, 10% accent</li>
          <li>• Consider the room's natural light when selecting colors</li>
          <li>• Test colors in your space with our sample service</li>
          <li>• Use our visualizer to see colors in your room before buying</li>
        </ul>
      </div>
    </div>
  );
};

export default CompatibleColors;

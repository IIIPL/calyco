import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ColorDetailSidebar from './ColorDetailSidebar';

const PopularColorsGrid = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  // Popular colors data with exact colors specified by the user
  const popularColors = [
    {
      id: 1,
      name: "GREY MIST",
      hex: "#C9CCCD",
      price: "₹699",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/LivingRoom/base.jpg",
      roomType: "Living Room"
    },
    {
      id: 2,
      name: "GREY THUNDER", 
      hex: "#9DA0A3",
      price: "₹699",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/LivingRoom/base.jpg",
      roomType: "Living Room"
    },
    {
      id: 3,
      name: "LAVENDER",
      hex: "#D4C8CD",
      price: "₹699", 
      isBestSeller: false,
      roomImage: "/Assets/Rooms/Bedroom/base.jpg",
      roomType: "Bedroom"
    },
    {
      id: 4,
      name: "LILAC",
      hex: "#C9BDC7",
      price: "₹699",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/Bedroom/base.jpg",
      roomType: "Bedroom"
    },
    {
      id: 5,
      name: "LINEN",
      hex: "#D3CABB",
      price: "₹699",
      isBestSeller: true,
      roomImage: "/Assets/Rooms/DiningRoom/base.jpg",
      roomType: "Dining Room"
    },
    {
      id: 6,
      name: "PURPLE",
      hex: "#776A8C",
      price: "₹699",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/LivingRoom/base.jpg",
      roomType: "Living Room"
    },
    {
      id: 7,
      name: "SAGE GREEN",
      hex: "#A8B99D",
      price: "₹699",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/DiningRoom/base.jpg",
      roomType: "Dining Room"
    },
    {
      id: 8,
      name: "BRICK RED",
      hex: "#8A3F3E",
      price: "₹699",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/DiningRoom/base.jpg",
      roomType: "Dining Room"
    }
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedColor(null);
  };

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
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

      {/* Color Detail Sidebar */}
      <ColorDetailSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        selectedColor={selectedColor}
        similarColors={popularColors.filter(color => color.name !== selectedColor?.name).slice(0, 3)}
        onColorChange={handleColorChange}
      />
    </>
  );
};

export default PopularColorsGrid;

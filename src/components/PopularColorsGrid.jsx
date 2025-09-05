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
      price: "₹499",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/LivingRoom/base.jpg",
      roomType: "Living Room"
    },
    {
      id: 2,
      name: "GREY THUNDER", 
      hex: "#9DA0A3",
      price: "₹599",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/LivingRoom/base.jpg",
      roomType: "Living Room"
    },
    {
      id: 3,
      name: "LAVENDER",
      hex: "#D4C8CD",
      price: "₹449", 
      isBestSeller: false,
      roomImage: "/Assets/Rooms/Bedroom/base.jpg",
      roomType: "Bedroom"
    },
    {
      id: 4,
      name: "LILAC",
      hex: "#C9BDC7",
      price: "₹549",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/Bedroom/base.jpg",
      roomType: "Bedroom"
    },
    {
      id: 5,
      name: "LINEN",
      hex: "#D3CABB",
      price: "₹399",
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
      price: "₹649",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/DiningRoom/base.jpg",
      roomType: "Dining Room"
    },
    {
      id: 8,
      name: "BRICK RED",
      hex: "#8A3F3E",
      price: "₹999",
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
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white overflow-hidden">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
          {/* Title and Description - Above the grid */}
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-[1.1] sm:leading-[1.2] tracking-wide sm:tracking-wider"
            >
              Popular<br />
              <span className="mt-1 sm:mt-2 block">colours</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-sm md:text-base text-[#493657]/70 leading-relaxed tracking-wide max-w-2xl mx-auto"
            >
              From favourite whites to the most popular greens, discover the shades most loved by our decorators.
            </motion.p>
          </div>

          {/* Color Grid - Clean palette design */}
          <div className="w-full max-w-4xl mx-auto px-4">
            {/* Grid Container */}
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {popularColors.map((color, index) => (
                <div
                  key={color.id}
                  className="flex justify-center"
                >
                  <div 
                    className="w-32 h-32 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg border-2 border-transparent hover:border-gray-300"
                    style={{ 
                      backgroundColor: color.hex
                    }}
                    onClick={() => handleColorClick(color)}
                  />
                </div>
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

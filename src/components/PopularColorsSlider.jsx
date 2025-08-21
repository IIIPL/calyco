import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const PopularColorsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Popular colors data with exact colors specified by user
  const popularColors = [
    {
      id: 1,
      name: "GREY MIST",
      hex: "#C9CCCD",
      price: "£2 Sample",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/LivingRoom/base.jpg",
      roomType: "Living Room"
    },
    {
      id: 2,
      name: "GREY THUNDER", 
      hex: "#9DA0A3",
      price: "£2 Sample",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/LivingRoom/base.jpg",
      roomType: "Living Room"
    },
    {
      id: 3,
      name: "LAVENDER",
      hex: "#D4C8CD",
      price: "£2 Sample", 
      isBestSeller: false,
      roomImage: "/Assets/Rooms/Bedroom/base.jpg",
      roomType: "Bedroom"
    },
    {
      id: 4,
      name: "LILAC",
      hex: "#C9BDC7",
      price: "£2 Sample",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/Bedroom/base.jpg",
      roomType: "Bedroom"
    },
    {
      id: 5,
      name: "LINEN",
      hex: "#D3CABB",
      price: "£2 Sample",
      isBestSeller: true,
      roomImage: "/Assets/Rooms/DiningRoom/base.jpg",
      roomType: "Dining Room"
    },
    {
      id: 6,
      name: "PURPLE",
      hex: "#776A8C",
      price: "£2 Sample",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/LivingRoom/base.jpg",
      roomType: "Living Room"
    },
    {
      id: 7,
      name: "SAGE GREEN",
      hex: "#A8B99D",
      price: "£2 Sample",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/DiningRoom/base.jpg",
      roomType: "Dining Room"
    },
    {
      id: 8,
      name: "BRICK RED",
      hex: "#8A3F3E",
      price: "£2 Sample",
      isBestSeller: false,
      roomImage: "/Assets/Rooms/DiningRoom/base.jpg",
      roomType: "Dining Room"
    }
  ];

  const cardWidth = 272; // Exact size as shown in the image (272.36 x 272.36)
  const gap = 16; // Gap between cards
  const visibleCards = 5; // Number of cards visible at once
  
  // Calculate total width needed for all 8 colors
  const totalWidth = (popularColors.length * cardWidth) + ((popularColors.length - 1) * gap);

  const nextSlide = () => {
    setCurrentIndex(prev => 
      prev >= popularColors.length - visibleCards ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev => 
      prev <= 0 ? popularColors.length - visibleCards : prev - 1
    );
  };

  const handleAddToCart = (color) => {
    console.log(`Added ${color.name} to cart`);
    // Add your cart logic here
  };

  // Handle drag end for swipe functionality
  const handleDragEnd = (event, info) => {
    const threshold = 50; // Minimum distance for swipe
    
    if (info.offset.x > threshold && currentIndex > 0) {
      prevSlide();
    } else if (info.offset.x < -threshold && currentIndex < popularColors.length - visibleCards) {
      nextSlide();
    }
    
    setIsDragging(false);
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left side - Text content */}
          <div className="lg:w-72 flex-shrink-0">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-[2.75rem] font-bold text-[#493657] mb-6 leading-[1.2] tracking-wider"
            >
              Popular<br />
              <span className="mt-2 block">colours</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-[#493657]/70 leading-relaxed tracking-wide"
            >
              From favourite whites to the most popular greens, discover the shades most loved by our decorators.
            </motion.p>
          </div>

          {/* Right side - Color slider */}
          <div className="flex-1 relative w-full min-w-0">
            {/* Slider Container - Fixed width to prevent horizontal scroll */}
            <div 
              ref={sliderRef}
              className="w-full overflow-x-auto scrollbar-hide"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                className="flex gap-4"
                style={{ 
                  width: `${totalWidth}px`,
                  minWidth: `${totalWidth}px`,
                  maxWidth: `${totalWidth}px`
                }}
              >
                {popularColors.map((color, index) => (
                  <div
                    key={color.id}
                    className="flex-shrink-0"
                    style={{ width: `${cardWidth}px` }}
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 group cursor-pointer hover:shadow-lg transform group-hover:scale-105">
                      {/* Color Swatch - Solid color instead of room image */}
                      <div className="aspect-square relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
                        {/* Solid color background */}
                        <div 
                          className="w-full h-full"
                          style={{ 
                            backgroundColor: color.hex
                          }}
                        />
                        
                        {/* Best Seller Badge */}
                        {color.isBestSeller && (
                          <div className="absolute bottom-3 left-3 bg-white text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            Best Seller
                          </div>
                        )}
                        
                        {/* Room type indicator */}
                        <div className="absolute top-3 left-3 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                          {color.roomType}
                        </div>
                      </div>
                      
                      {/* Color Info */}
                      <div className="p-4 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{color.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{color.price}</p>
                        <button 
                          onClick={() => handleAddToCart(color)}
                          className="w-full bg-[#1a1a2e] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-[#16213e] transition-colors text-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularColorsSlider;

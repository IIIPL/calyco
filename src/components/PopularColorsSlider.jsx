import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavigationArrows from './NavigationArrows';
import { getPopularColors } from '../data/homepageColors';

const PopularColorsSlider = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Get popular colors from database
  const dbColors = getPopularColors();

  // Map database colors to component format
  const popularColors = dbColors.map((color, index) => ({
    id: index + 1,
    name: color.name,
    hex: color.hex.startsWith('#') ? color.hex : `#${color.hex}`,
    code: color.code || color.ralCode,
    isBestSeller: color.popularity === "High" || color.name === "Linen",
    roomImage: "/Assets/Rooms/LivingRoom/base.webp",
    roomType: color.interiorUse?.split(',')[0] || "Living Room",
    colorFamily: color.colorFamily,
    temperature: color.temperature || color.colorTemperature,
    description: color.mood || color.description,
    ...color // Include all other properties from database
  }));

  const cardWidth = 272; // Exact size as shown in the image (272.36 x 272.36)
  const gap = 16; // Gap between cards (matches gap-4)
  const visibleCards = 4; // Number of cards visible at once (reduced to show more content)
  const slideDistance = cardWidth + gap; // Total distance to move per slide
  
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
    <>
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white overflow-hidden">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex flex-col xl:flex-row gap-4 lg:gap-6 xl:gap-8 items-center xl:items-center">
            {/* Left side - Text content - Responsive sizing */}
            <div className="w-full xl:w-72 2xl:w-80 flex-shrink-0 text-center xl:text-left">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.5rem] 2xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-[1.1] sm:leading-[1.2] tracking-wide sm:tracking-wider"
              >
                Popular<br />
                <span className="mt-1 sm:mt-2 block">colours</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base text-[#493657]/70 leading-relaxed tracking-wide max-w-sm xl:max-w-none mx-auto xl:mx-0"
              >
                From favourite whites to the most popular greens, discover the shades most loved by our decorators.
              </motion.p>
            </div>

            {/* Right side - Color slider - Responsive container */}
            <div className="flex-1 relative w-full min-w-0">
              {/* Navigation Arrows - Above the slider */}
              <div className="flex justify-end mb-4">
                <NavigationArrows
                  onPrevious={prevSlide}
                  onNext={nextSlide}
                  showPrevious={currentIndex > 0}
                  showNext={currentIndex < popularColors.length - visibleCards}
                  size="md"
                />
              </div>
              
              {/* Slider Container - Responsive width */}
              <div 
                ref={sliderRef}
                className="w-full overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div 
                  className="flex gap-4 transition-transform duration-500 ease-out"
                  style={{ 
                    width: `${totalWidth}px`,
                    minWidth: `${totalWidth}px`,
                    maxWidth: `${totalWidth}px`,
                    transform: `translateX(-${currentIndex * slideDistance}px)`
                  }}
                >
                  {popularColors.map((color, index) => (
                    <div
                      key={color.id}
                      className="flex-shrink-0"
                      style={{ width: `${cardWidth}px` }}
                    >
                      <div 
                        className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300 group hover:shadow-lg hover:border-gray-300 transform group-hover:scale-105"
                        onClick={() => handleColorClick(color)}
                      >
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
                            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white text-black text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-md border border-gray-100">
                              Best Seller
                            </div>
                          )}
                          
                          {/* Room type indicator */}
                          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
                            {color.roomType}
                          </div>
                        </div>
                        
                        {/* Color Info */}
                        <div className="p-3 sm:p-4 text-center border-t border-gray-100">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{color.name}</h3>
                          {color.code && (
                            <p className="text-sm text-gray-600 mt-1">{color.code}</p>
                          )}
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
    </>
  );
};

export default PopularColorsSlider;
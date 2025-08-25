import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CartPopup from './CartPopup';
import { useCart } from '../context/CartContext';

const PopularColorsSlider = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cartPopup, setCartPopup] = useState({ isVisible: false, item: null });

  // Map color names to their family routes
  const getColorFamilyRoute = (colorName) => {
    const colorToFamilyMap = {
      'GREY MIST': 'greys',
      'GREY THUNDER': 'greys',
      'LAVENDER': 'purples-&-pinks',
      'LILAC': 'purples-&-pinks',
      'LINEN': 'whites-&-off-whites',
      'PURPLE': 'purples-&-pinks',
      'SAGE GREEN': 'greens',
      'BRICK RED': 'reds-&-oranges'
    };
    
    const family = colorToFamilyMap[colorName];
    return family ? `/colors/family/${family}` : '/colors';
  };

  // Popular colors data with exact colors specified by user
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
    
    // Create a product object for the cart
    const productForCart = {
      id: color.id,
      name: color.name,
      display_name: color.name,
      price: parseInt(color.price.replace('₹', '')),
      image: `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="${color.hex}"/>
        </svg>
      `)}`
    };
    
    // Add to actual cart
    addToCart(productForCart, 'Sample', 'Sample', 1, parseInt(color.price.replace('₹', '')), {
      name: color.name,
      hex: color.hex
    });
    
    // Show cart popup
    setCartPopup({ isVisible: true, item: color });
    
    // Auto-hide popup after 3 seconds
    setTimeout(() => {
      setCartPopup({ isVisible: false, item: null });
    }, 3000);
  };

  const closeCartPopup = () => {
    setCartPopup({ isVisible: false, item: null });
  };

  const handleContinueShopping = () => {
    setCartPopup({ isVisible: false, item: null });
    // Optionally scroll to top or stay on current page
  };

  const handleCheckout = () => {
    setCartPopup({ isVisible: false, item: null });
    navigate('/checkout');
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
              {/* Slider Container - Responsive width */}
              <div 
                ref={sliderRef}
                className="w-full overflow-x-auto scrollbar-hide"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div 
                  className="flex gap-2 sm:gap-3 md:gap-4"
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
                      <div 
                        className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300 group hover:shadow-lg hover:border-gray-300 transform group-hover:scale-105"
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
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{color.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{color.price}</p>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(color);
                            }}
                            className="w-full bg-[#1a1a2e] text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-medium hover:bg-[#16213e] transition-colors text-sm border border-[#1a1a2e] hover:border-[#16213e]"
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

      {/* Cart Popup */}
      <CartPopup
        isVisible={cartPopup.isVisible}
        onClose={closeCartPopup}
        item={cartPopup.item}
        onContinueShopping={handleContinueShopping}
        onCheckout={handleCheckout}
      />
    </>
  );
};

export default PopularColorsSlider;

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroProducts } from "./HeroProducts";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const heroData = [
  {
    productName: "Nova",
    productImage: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754142454/NoBg_ojfrtz.png",
  },
  {
    productName: "Aluminium Paint",
    productImage: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754142297/NoBg_pnnshq.png",
  },
  {
    productName: "Alkyd Enamel",
    productImage: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754142296/NoBg_pyhvl6.png",
  },
  {
    productName: "Defense",
    productImage: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754142305/NoBg_ur9qqq.png",
  },
  {
    productName: "WoodGuard",
    productImage: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754142463/NoBg_yrymef.png",
  },
  {
    productName: "Thermacool",
    productImage: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754142461/NoBg_cb0amu.png",
  },
  {
    productName: "LustroLite",
    productImage: "/Assets/LustroLite/inhouse.png",
  },
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimerRef = useRef(null);

  // Simple navigation functions
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroData.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + heroData.length) % heroData.length);
  };

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      return;
    }

    const startAutoplay = () => {
      autoplayTimerRef.current = setTimeout(() => {
        nextSlide();
      }, 4000);
    };

    startAutoplay();

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [isPaused, current]);

  return (
    <div
      className="relative w-full min-h-[300px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md transition-all duration-300"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-[#2C194B] text-xl" />
      </button>
      <button
        className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md transition-all duration-300"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FaChevronRight className="text-[#2C194B] text-xl" />
      </button>
      
      {/* Animated Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <HeroProducts
            productName={heroData[current].productName}
            productImage={heroData[current].productImage}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 bg-black p-2 rounded-2xl -translate-x-1/2 flex gap-3 z-10">
        {heroData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current 
                ? "bg-[#2C194B] scale-125" 
                : "bg-white bg-opacity-50 hover:bg-opacity-80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
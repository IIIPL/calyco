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
  
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetSlide, setTargetSlide] = useState(null);
  const [queue, setQueue] = useState([]);
  const autoplayTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);

  // Calculate the shortest path between two slides
  const calculateDirection = (from, to) => {
    const diff = to - from;
    const absDiff = Math.abs(diff);
    const wrapDiff = heroData.length - absDiff;
    
    if (absDiff <= wrapDiff) {
      return diff > 0 ? 1 : -1;
    } else {
      return diff > 0 ? -1 : 1;
    }
  };

  // Handle slide transition with animation
  const goToSlide = (slideIndex) => {
    if (isAnimating) {
      // If already animating, add to queue
      setQueue(prev => [...prev, slideIndex]);
      return;
    }

    if (slideIndex === current) return;

    setIsAnimating(true);
    setIsPaused(true); // Pause autoplay during manual navigation
    
    const newDirection = calculateDirection(current, slideIndex);
    setDirection(newDirection);
    setTargetSlide(slideIndex);
    
    // If it's a direct neighbor, just transition once
    if (Math.abs(slideIndex - current) === 1 || 
        (current === 0 && slideIndex === heroData.length - 1) ||
        (current === heroData.length - 1 && slideIndex === 0)) {
      setCurrent(slideIndex);
    } else {
      // For non-adjacent slides, start the sequence
      const nextIndex = (current + newDirection + heroData.length) % heroData.length;
      setCurrent(nextIndex);
    }
  };

  // Process the next slide in the sequence
  const processNextInSequence = () => {
    if (targetSlide === null) return;
    
    // If we've reached the target, stop animating
    if (current === targetSlide) {
      setIsAnimating(false);
      setTargetSlide(null);
      
      // Check if there's anything in the queue
      if (queue.length > 0) {
        const nextTarget = queue[0];
        setQueue(prev => prev.slice(1));
        goToSlide(nextTarget);
      } else {
        // Resume autoplay after a delay
        setTimeout(() => setIsPaused(false), 1000);
      }
      return;
    }
    
    // Continue to the next slide in the sequence
    const nextIndex = (current + direction + heroData.length) % heroData.length;
    setCurrent(nextIndex);
  };

  // Navigation functions
  const nextSlide = () => {
    const nextIndex = (current + 1) % heroData.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (current - 1 + heroData.length) % heroData.length;
    goToSlide(prevIndex);
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

  // Handle the sequence animation timing
  useEffect(() => {
    if (isAnimating) {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      
      transitionTimerRef.current = setTimeout(() => {
        processNextInSequence();
      }, 600); // Match this with the transition duration
    }

    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [isAnimating, current]);

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
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
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
            onClick={() => goToSlide(index)}
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
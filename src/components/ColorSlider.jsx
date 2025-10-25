import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ColorSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const slides = [
    {
      type: 'image',
      src: '/Assets/home-hero/full-page.png',
      alt: 'Full Page Interior Design',
      badge: 'CALYCO PREMIUM COLLECTION',
      title: 'Calyco Paint & Stain',
      subtitle: 'Transform Your Space with Eco-Premium Excellence',
      description: 'Explore our curated collection of premium colors and find the perfect paint for your space. Low-VOC, durable, and designed for modern living.',
      features: ['Premium Finishes', 'Low-VOC Commitment', 'Expert Support']
    },
    {
      type: 'image',
      src: '/Assets/HERO/hero2.png',
      alt: 'Modern and Minimalist Living Room',
      badge: 'INTERIOR COLLECTION',
      title: 'Luxury Interiors',
      subtitle: 'Timeless Elegance Meets Superior Performance',
      description: 'Smooth, low-VOC paints engineered for discerning homeowners. Advanced formulas that deliver flawless finishes and lasting beauty.',
      features: ['Washable & Durable', 'Zero Odor', 'Premium Pigments']
    },
    {
      type: 'image',
      src: '/Assets/HERO/hero3_Modern_interior_wall_in_a_house_or_apartment_living_fc50ad6e-a99a-46d5-8608-8b3466c0eb0a.png',
      alt: 'Modern Interior Wall in a House or Apartment Living',
      badge: 'CALYCO DEFENSE SYSTEMS',
      title: 'Defense Coatings',
      subtitle: 'Industrial-Grade Protection for Every Surface',
      description: 'Built to protect and enhance wood, concrete, steel, and more. Weather-resistant technology that stands the test of time.',
      features: ['All-Surface Protection', 'Weather Resistant', 'Long-Lasting']
    },
    {
      type: 'image',
      src: '/Assets/HERO/hero5-Metallic_parapet_interrupted_by_small_columns_in_a__4ebb7ad1-fde5-4e3d-a238-3c3de0f940e7.png',
      alt: 'Metallic Parapet Interrupted by Small Columns',
      badge: 'ECO-INNOVATION SERIES',
      title: 'Eco-Friendly Innovation',
      subtitle: 'Sustainability Without Compromise',
      description: 'Advanced formulas that balance environmental responsibility with superior performance. Safe for families, kind to the planet.',
      features: ['Plant-Based Ingredients', 'Carbon Neutral', 'Safe for All']
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSlide]);

  useEffect(() => {
    if (videoRef.current) {
      if (slides[currentSlide].type === 'video') {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentSlide]);

  const handleVideoEnd = () => {
    nextSlide();
  };

  return (
    <div className="relative w-full min-h-[80vh] md:min-h-[85vh] lg:min-h-screen overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {slides[currentSlide].type === 'video' ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop={false}
              onEnded={handleVideoEnd}
              playsInline
            >
              <source src={slides[currentSlide].src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={slides[currentSlide].src}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dark Purple Gradient Overlay (matching warranty page) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0626]/95 via-[#2D0F3F]/90 to-[#1a0626]/95" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-start sm:items-center pt-16 sm:pt-0">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-white z-20 max-w-3xl"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block mb-3 sm:mb-4 md:mb-6"
            >
              <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-[#D4AF37] text-[#0F1221] rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] shadow-lg">
                {slides[currentSlide].badge}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-[1.1] text-white tracking-tight"
            >
              {slides[currentSlide].title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-3 sm:mb-4 md:mb-5 text-white/95 font-medium leading-relaxed"
            >
              {slides[currentSlide].subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-5 md:mb-7 text-white/90 leading-relaxed max-w-2xl"
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6 md:mb-8"
            >
              {slides[currentSlide].features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-xs sm:text-sm font-medium text-white hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-24 sm:mb-0"
            >
              <Link
                to="/products"
                className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 bg-white text-[#0F1221] rounded-[12px] font-semibold text-sm sm:text-base hover:bg-[#D4AF37] hover:text-[#0F1221] transition-all duration-300 shadow-[0_8px_32px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_48px_rgba(212,175,55,0.4)] transform hover:-translate-y-1 w-full sm:w-auto sm:min-w-[180px]"
              >
                Shop Now
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/colors"
                className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 border-2 border-white/80 text-white rounded-[12px] font-semibold text-sm sm:text-base hover:bg-white hover:text-[#4B007D] transition-all duration-300 shadow-[0_8px_32px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_48px_rgba(255,255,255,0.3)] transform hover:-translate-y-1 w-full sm:w-auto sm:min-w-[180px] backdrop-blur-sm"
              >
                Explore Colors
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 sm:space-x-4 md:space-x-6 z-30">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/30 hover:scale-110 transition-all duration-300 flex items-center justify-center text-white border border-white/30 hover:border-white/60 shadow-lg hover:shadow-2xl"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex space-x-2 sm:space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-8 sm:w-12 h-2.5 sm:h-3.5 bg-white shadow-lg'
                  : 'w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-white/40 hover:bg-white/70 hover:scale-125 border border-white/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/30 hover:scale-110 transition-all duration-300 flex items-center justify-center text-white border border-white/30 hover:border-white/60 shadow-lg hover:shadow-2xl"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ColorSlider;
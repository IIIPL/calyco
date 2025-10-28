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
      badge: 'TRUSTED BY THOUSANDS',
      title: 'India\'s #2 Paint Brand, Right After Asian Paints',
      subtitle: 'Premium quality you can trust. 20% more affordable. Manufactured in-house with 10-year guarantee.',
      cta1Text: 'Explore Colors',
      cta2Text: 'Get Free Consultation'
    },
    {
      type: 'image',
      src: '/Assets/HERO/hero2.png',
      alt: 'Modern and Minimalist Living Room',
      badge: 'QUALITY ASSURANCE',
      title: '10-Year Guarantee on All Products',
      subtitle: 'We stand behind our paints with industry-leading warranty and commitment to excellence.',
      cta1Text: 'Shop Now',
      cta2Text: 'Learn More'
    },
    {
      type: 'image',
      src: '/Assets/HERO/hero3_Modern_interior_wall_in_a_house_or_apartment_living_fc50ad6e-a99a-46d5-8608-8b3466c0eb0a.png',
      alt: 'Modern Interior Wall in a House or Apartment Living',
      badge: 'PROFESSIONAL SERVICE',
      title: 'Expert Painting Services Across Delhi NCR',
      subtitle: 'Certified painters, quality materials, and flawless execution for your home.',
      cta1Text: 'Book Service',
      cta2Text: 'View Portfolio'
    },
    {
      type: 'image',
      src: '/Assets/HERO/hero5-Metallic_parapet_interrupted_by_small_columns_in_a__4ebb7ad1-fde5-4e3d-a238-3c3de0f940e7.png',
      alt: 'Metallic Parapet Interrupted by Small Columns',
      badge: 'MADE IN INDIA',
      title: 'Manufactured In-House for Unbeatable Value',
      subtitle: 'Direct from our factory to your home. No middlemen. Just quality and affordability.',
      cta1Text: 'Our Story',
      cta2Text: 'Shop Products'
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

      {/* Subtle dark overlay for readability while keeping imagery vibrant */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/35 to-black/20" />

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
            {/* Badge - Smaller, more subtle with better spacing */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block mb-6 sm:mb-8"
            >
              <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-[#D4AF37] text-[#0F1221] rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider shadow-lg">
                {slides[currentSlide].badge}
              </span>
            </motion.div>

            {/* Main Title - Professional sizing with generous spacing and better tracking */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold mb-5 sm:mb-7 leading-[1.4] text-white tracking-normal max-w-4xl"
              style={{ letterSpacing: '0.01em' }}
            >
              {slides[currentSlide].title}
            </motion.h1>

            {/* Subtitle - Proper sizing with breathing room */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg mb-8 sm:mb-10 text-white/90 font-normal leading-[1.7] max-w-2xl"
            >
              {slides[currentSlide].subtitle}
            </motion.p>

            {/* Single CTA Button - Clean and focused */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-24 sm:mb-0"
            >
              <Link
                to="/colors"
                className="group inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-4 bg-white text-[#0F1221] rounded-lg font-semibold text-base hover:bg-[#D4AF37] hover:text-[#0F1221] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore Colors
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

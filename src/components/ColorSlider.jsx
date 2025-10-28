import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    type: 'image',
    src: '/Assets/home-hero/full-page.png',
    alt: 'Beautiful transformed home interior',
    badge: 'TRUSTED NATIONWIDE',
    title: 'Colors That Transform Homes Into Havens',
    subtitle: "India's most trusted paint brand. Premium quality, affordable pricing, and a finish that lasts a decade.",
    ctaText: 'Discover Your Perfect Shade',
    ctaLink: '/colors',
    colors: [
      { name: 'CREAM WHITE', code: 'RAL 9001', hex: '#F1EBD7', slug: 'cream-white' },
      { name: 'PURE WHITE', code: 'RAL 9010', hex: '#F4F4F4', slug: 'pure-white' },
      { name: 'GREY MIST', code: 'RAL 7035', hex: '#D1D4D7', slug: 'grey-mist' },
    ]
  },
  {
    type: 'image',
    src: '/Assets/HERO/hero2.png',
    alt: 'Premium quality paint finish',
    badge: 'GUARANTEED EXCELLENCE',
    title: 'A Decade of Beauty, Guaranteed',
    subtitle: "We stand behind every brush stroke with India's strongest 10-year warranty. Your walls deserve nothing less.",
    ctaText: 'See Our Promise',
    ctaLink: '/about',
    colors: [
      { name: 'LINEN', code: 'RAL 9002', hex: '#E7EBDA', slug: 'linen' },
      { name: 'GREY THUNDER', code: 'RAL 7016', hex: '#4A5568', slug: 'grey-thunder' },
      { name: 'SAGE GREEN', code: 'RAL 6019', hex: '#BDECB6', slug: 'sage-green' },
    ]
  },
  {
    type: 'image',
    src: '/Assets/HERO/hero3_Modern_interior_wall_in_a_house_or_apartment_living_fc50ad6e-a99a-46d5-8608-8b3466c0eb0a.png',
    alt: 'Wide range of color collections',
    badge: '2,000+ SHADES',
    title: 'Every Mood. Every Room. Every Dream.',
    subtitle: 'From calming neutrals to bold statements—explore our curated collections designed for the way you live.',
    ctaText: 'Explore Color Collections',
    ctaLink: '/colors',
    colors: [
      { name: 'LAVENDER', code: 'RAL 4009', hex: '#A18594', slug: 'lavender' },
      { name: 'LILAC', code: 'RAL 4003', hex: '#DE4C8A', slug: 'lilac' },
      { name: 'PURE WHITE', code: 'RAL 9010', hex: '#F4F4F4', slug: 'pure-white' },
    ]
  },
  {
    type: 'image',
    src: '/Assets/HERO/hero5-Metallic_parapet_interrupted_by_small_columns_in_a__4ebb7ad1-fde5-4e3d-a238-3c3de0f940e7.png',
    alt: 'Made in India manufacturing facility',
    badge: 'MADE IN INDIA',
    title: 'Factory-Direct Quality. Family-Friendly Prices.',
    subtitle: 'By cutting out middlemen, we deliver premium paint at 20% less than competitors—without compromising an ounce of quality.',
    ctaText: 'See How We Do It',
    ctaLink: '/about',
    colors: [
      { name: 'GREY THUNDER', code: 'RAL 7016', hex: '#4A5568', slug: 'grey-thunder' },
      { name: 'CREAM WHITE', code: 'RAL 9001', hex: '#F1EBD7', slug: 'cream-white' },
    ]
  },
];

const buildPreloadCache = (slides) => {
  const cache = new Map();
  slides.forEach((slide) => {
    if (slide.type === 'image' && slide.src) {
      const img = new Image();
      img.src = slide.src;
      cache.set(slide.src, img);
    }
  });
  return cache;
};

const ColorSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const slides = SLIDES;
  const preloadCache = useMemo(() => buildPreloadCache(slides), [slides]);

  const getNextIndex = useCallback(
    (index, direction = 1) => (index + direction + slides.length) % slides.length,
    [slides.length]
  );

  const preloadSlide = useCallback(
    (index) => {
      const slide = slides[index];
      if (!slide) return;
      if (slide.type === 'image' && slide.src) {
        const cached = preloadCache.get(slide.src);
        if (cached && !cached.complete) {
          cached.decode?.().catch(() => {});
        }
      }
    },
    [preloadCache, slides]
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const nextIdx = getNextIndex(prev, 1);
      preloadSlide(getNextIndex(nextIdx, 1));
      return nextIdx;
    });
  }, [getNextIndex, preloadSlide]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const nextIdx = getNextIndex(prev, -1);
      preloadSlide(getNextIndex(nextIdx, -1));
      return nextIdx;
    });
  }, [getNextIndex, preloadSlide]);

  const goToSlide = useCallback(
    (index) => {
      setCurrentSlide(index);
      preloadSlide(getNextIndex(index, 1));
    },
    [getNextIndex, preloadSlide]
  );

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

  useEffect(() => {
    preloadSlide(getNextIndex(currentSlide, 1));
  }, [currentSlide, getNextIndex, preloadSlide]);

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
            {/* Badge - Premium styling with sophisticated colors */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block mb-6 sm:mb-8"
            >
              <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider shadow-lg">
                {slides[currentSlide].badge}
              </span>
            </motion.div>

            {/* Main Title - Professional sizing with generous spacing and better tracking */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold mb-5 sm:mb-7 leading-[1.5] text-white tracking-normal max-w-4xl"
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
                to={slides[currentSlide].ctaLink}
                className="group inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-[#0F1221] rounded-lg font-semibold text-sm hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {slides[currentSlide].ctaText}
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Color Palette - Bottom Right */}
      {slides[currentSlide].colors && (
        <motion.div
          key={`colors-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute bottom-4 sm:bottom-8 md:bottom-12 right-4 sm:right-8 md:right-12 z-30"
        >
          <div className="flex gap-3 sm:gap-4">
            {slides[currentSlide].colors.map((color, index) => (
              <Link
                key={index}
                to={`/colors/${color.slug}`}
                className="group flex flex-col items-center"
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg border-2 border-white shadow-lg cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:border-white/80"
                  style={{ backgroundColor: color.hex }}
                  title={`${color.name} - ${color.code}`}
                />
                <div className="mt-2 text-center">
                  <p className="text-white text-[10px] sm:text-xs font-semibold tracking-wide drop-shadow-lg">
                    {color.name}
                  </p>
                  <p className="text-white/80 text-[8px] sm:text-[10px] font-medium drop-shadow-md">
                    {color.code}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

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

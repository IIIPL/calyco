import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ColorSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Start with the 1st slide
  const [isPlaying, setIsPlaying] = useState(false); // Set to false to disable autoplay
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const slides = [
    {
      type: 'image',
      src: '/Assets/home-hero/full-page.png',
      alt: 'Full Page Interior Design'
    },
    {
      type: 'image',
      src: '/Assets/HERO/hero2.png',
      alt: 'Modern and Minimalist Living Room'
    },
    {
      type: 'image',
      src: '/Assets/HERO/hero3_Modern_interior_wall_in_a_house_or_apartment_living_fc50ad6e-a99a-46d5-8608-8b3466c0eb0a.png',
      alt: 'Modern Interior Wall in a House or Apartment Living'
    },
    {
      type: 'image',
      src: '/Assets/HERO/hero5-Metallic_parapet_interrupted_by_small_columns_in_a__4ebb7ad1-fde5-4e3d-a238-3c3de0f940e7.png',
      alt: 'Metallic Parapet Interrupted by Small Columns'
    }
  ];

  // Detect responsive (mobile/tablet) viewport for slide-specific swap
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    console.log('Dot clicked! Changing to slide:', index);
    setCurrentSlide(index);
  };

  useEffect(() => {
    // DISABLED AUTOMATIC SLIDING - Only manual navigation
    // if (isPlaying) {
    //   intervalRef.current = setInterval(() => {
    //     nextSlide();
    //   }, 3000);
    // }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSlide]);

  useEffect(() => {
    // Pause video when slide changes
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
    <>
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden mt-0">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
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
            currentSlide === 0 && !isMobile ? (
              // Special layout for first image on desktop only
              <div className="absolute inset-0 flex">
                {/* Left half: dark purple background */}
                <div className="w-1/2 h-full bg-[#2D0F3F] flex items-center justify-center">
                  <div className="text-white text-center px-8">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white">
                      Calyco Paint & Stain
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-lg mx-auto">
                      Explore premium colors and find the perfect paint for your space
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/products" className="px-6 py-3 bg-white text-gray-900 rounded-lg font-normal hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base">
                        Shop
                      </Link>
                      <Link to="/colors" className="px-6 py-3 border-2 border-white text-white rounded-lg font-normal hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base group">
                        Explore Colors
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Right half: image */}
                <div className="w-1/2 h-full">
                  <img
                    src={slides[currentSlide].src}
                    alt={slides[currentSlide].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <img
                src={isMobile && currentSlide === 1 ? '/Assets/HERO/hero2.png' : slides[currentSlide].src}
                alt={slides[currentSlide].alt}
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            )
          )}
        </motion.div>
      </AnimatePresence>

      {/* Text Overlay - show on large screens only to avoid covering content on mobile */}
      {currentSlide !== 0 && (
        <div className="absolute inset-0 hidden lg:flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
            {currentSlide === 2 ? (
              // Centered layout for third image
              <div className="w-full flex justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white z-10 text-center"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white">
                    Calyco Defense Coatings
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-lg mx-auto">
                    Built to protect every surface – wood, concrete, steel, and more.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/products" className="px-6 py-3 bg-white text-gray-900 rounded-lg font-normal hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base">
                      Shop
                    </Link>
                    <Link to="/colors" className="px-6 py-3 border-2 border-white text-white rounded-lg font-normal hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base group">
                      Explore Colors
                    </Link>
                  </div>
                </motion.div>
              </div>
            ) : currentSlide === 3 ? (
              // Centered layout for fourth image
              <div className="w-full flex justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white z-10 text-center"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white">
                    Eco-Friendly Innovation
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-lg mx-auto">
                    Advanced formulas that balance sustainability with superior performance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/products" className="px-6 py-3 bg-white text-gray-900 rounded-lg font-normal hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base">
                      Shop
                    </Link>
                    <Link to="/colors" className="px-6 py-3 border-2 border-white text-white rounded-lg font-normal hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base group">
                      Explore Colors
                    </Link>
                  </div>
                </motion.div>
              </div>
            ) : currentSlide === 1 ? (
              // Centered layout for second image
              <div className="w-full flex justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white z-10 text-center"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white">
                    Eco-Friendly Innovation
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-lg mx-auto">
                    Advanced formulas that balance sustainability with superior performance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/products" className="px-6 py-3 bg-white text-gray-900 rounded-lg font-normal hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base">
                      Shop
                    </Link>
                    <Link to="/colors" className="px-6 py-3 border-2 border-white text-white rounded-lg font-normal hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base group">
                      Explore Colors
                    </Link>
                  </div>
                </motion.div>
              </div>
            ) : (
              // Original left-aligned layout for other images (not first image)
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left side - Text content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white z-10"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white">
                    Luxury Interiors
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-lg">
                    Smooth, low-VOC paints designed for timeless elegance and durability.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/products" className="px-6 py-3 bg-white text-gray-900 rounded-lg font-normal hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base">
                      Shop
                    </Link>
                    <Link to="/colors" className="px-6 py-3 border-2 border-white text-white rounded-lg font-normal hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base group">
                      Explore Colors
                    </Link>
                  </div>
                </motion.div>
                
                {/* Right side - Empty for balance */}
                <div className="hidden lg:block"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dark overlay for better text readability; hide on mobile and first slide */}
      {currentSlide !== 0 && (
        <div className="absolute inset-0 hidden lg:block bg-black/40"></div>
      )}

      {/* Slide indicators with Navigation Arrows */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-50">
        {/* Left Arrow */}
        <button
          onClick={() => {
            const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            goToSlide(newIndex);
          }}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/50 hover:scale-110 transition-all duration-300 flex items-center justify-center text-white border border-white/30 hover:border-white/60 hover:shadow-lg"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-150 cursor-pointer border-2 border-white/30 ${
                index === currentSlide
                  ? 'bg-white scale-125 border-white'
                  : 'bg-white/50 hover:bg-white/80 hover:border-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              style={{ pointerEvents: 'auto' }}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => {
            const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            goToSlide(newIndex);
          }}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/50 hover:scale-110 transition-all duration-300 flex items-center justify-center text-white border border-white/30 hover:border-white/60 hover:shadow-lg"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    {/* Mobile/Tablet: text box below the slider to prevent overlap */}
    <div className="lg:hidden w-full bg-[#2D0F3F] text-white px-6 py-8">
      <div className="max-w-7xl mx-auto text-center">
        {currentSlide === 0 && (
          <>
            <h2 className="text-3xl font-bold mb-3">Calyco Paint & Stain</h2>
            <p className="text-white/90 mb-6 text-lg">Explore premium colors and find the perfect paint for your space</p>
          </>
        )}
        {currentSlide === 1 && (
          <>
            <h2 className="text-3xl font-bold mb-3">Luxury Interiors</h2>
            <p className="text-white/90 mb-6 text-lg">Smooth, low-VOC paints designed for timeless elegance and durability.</p>
          </>
        )}
        {currentSlide === 2 && (
          <>
            <h2 className="text-3xl font-bold mb-3">Calyco Defense Coatings</h2>
            <p className="text-white/90 mb-6 text-lg">Built to protect every surface – wood, concrete, steel, and more.</p>
          </>
        )}
        {currentSlide === 3 && (
          <>
            <h2 className="text-3xl font-bold mb-3">Eco-Friendly Innovation</h2>
            <p className="text-white/90 mb-6 text-lg">Advanced formulas that balance sustainability with superior performance.</p>
          </>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/products" className="inline-flex w-[176px] justify-center px-6 py-3 bg-white text-gray-900 rounded-lg font-medium text-sm border border-gray-300">Shop</Link>
          <Link to="/colors" className="inline-flex w-[176px] justify-center px-6 py-3 border-2 border-white text-white rounded-lg font-medium text-sm">Explore Colors</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ColorSlider;

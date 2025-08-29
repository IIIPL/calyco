import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ColorSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Start with the 1st slide (video)
  const [isPlaying, setIsPlaying] = useState(false); // Set to false to disable autoplay
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const slides = [
    {
      type: 'video',
      src: '/Assets/slider/assets_task_01k30y9xbyf88skvtrfhhx5tba_task_01k30y9xbyf88skvtrfhhx5tba_genid_2039803a-4a55-4a59-abbf-bd3cf487a324_25_08_19_10_35_258371_videos_00000_212151107_md.mp4',
      alt: 'Calyco Paint Video'
    },
    {
      type: 'image',
      src: '/Assets/home-hero/full-page.png',
      alt: 'Full Page Interior Design'
    },
    {
      type: 'image',
      src: '/Assets/home-hero/myth62340277_46978_A_modern_and_minimalist_living_room_with_bei_cd304044-6f5d-43ee-a38b-519f4a16a63d (2).png',
      alt: 'Modern and Minimalist Living Room'
    },
    {
      type: 'image',
      src: '/Assets/home-hero/u3817594935_Facebook_coverLuxury_wall_art_mockup_in_a_minimalis_67136d5f-eeb0-49ba-9fa2-5532ed4aa054.png',
      alt: 'Luxury Wall Art Mockup in Minimalist Setting'
    },
    {
      type: 'image',
      src: '/Assets/home-hero/zephiros6962_An_elegant_and_minimalist_living_room_viewed_from__683549cc-c734-4791-9c5a-929b9ffa2481.png',
      alt: 'Elegant and Minimalist Living Room'
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

  const isSpecialHalfSlide = currentSlide === 1 && slides[currentSlide].type === 'image';

  return (
    <>
    <div className={`relative w-full h-[70vh] overflow-hidden mt-0 ${isSpecialHalfSlide ? 'bg-[#2D0F3F]' : ''}`}>
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
            isSpecialHalfSlide ? (
              isMobile ? (
                <img
                  src="/Assets/HERO/full-page.png"
                  alt="Calyco Hero"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex">
                  {/* Left half: solid purple background on desktop */}
                  <div className="w-1/2 h-full bg-[#2D0F3F]" />
                  {/* Right half: image fills fully */}
                  <div className="w-1/2 h-full">
                    <img
                      src={slides[currentSlide].src}
                      alt={slides[currentSlide].alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )
            ) : (
              <img
                src={isMobile && currentSlide === 1 ? '/Assets/HERO/hero2.png' : slides[currentSlide].src}
                alt={slides[currentSlide].alt}
                className="w-full h-full object-cover"
              />
            )
          )}
        </motion.div>
      </AnimatePresence>

      {/* Text Overlay - show on large screens only to avoid covering content on mobile */}
      <div className="absolute inset-0 hidden lg:flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white z-10"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white">
                Calyco Paint & Stain
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-lg">
                Explore premium colors and find the perfect paint for your space
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
        </div>
      </div>

      {/* Dark overlay for better text readability (disabled on special half slide); hide on mobile */}
      {!isSpecialHalfSlide && (
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
    <div className="lg:hidden w-full bg-[#122636] text-white px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Calyco Paint & Stain</h2>
        <p className="text-white/90 mb-4">Explore premium colors and find the perfect paint for your space</p>
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <Link to="/products" className="inline-flex w-[176px] justify-center px-5 py-3 bg-white text-gray-900 rounded-lg font-medium text-sm">Shop</Link>
          <Link to="/colors" className="inline-flex w-[176px] justify-center px-5 py-3 border-2 border-white text-white rounded-lg font-medium text-sm">Explore Colors</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ColorSlider;

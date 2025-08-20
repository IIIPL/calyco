import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ColorSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const slides = [
    {
      type: 'image',
      src: '/Assets/slider/Luxurious_Calyco_bedroom_with_a_sophisticated_ble_d9771689-ca96-422e-997b-5a987e87cc7e_0.png',
      alt: 'Luxurious Calyco Bedroom'
    },
    {
      type: 'image',
      src: '/Assets/slider/luxurious_photorealistic_interior_living_room_i_6c8b2a09-fc4d-4e6b-ac48-4fbd3417b03d_3.png',
      alt: 'Luxurious Interior Living Room'
    },
    {
      type: 'video',
      src: '/Assets/slider/assets_task_01k30y9xbyf88skvtrfhhx5tba_task_01k30y9xbyf88skvtrfhhx5tba_genid_2039803a-4a55-4a59-abbf-bd3cf487a324_25_08_19_10_35_258371_videos_00000_212151107_md.mp4',
      alt: 'Calyco Paint Video'
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
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }

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
    <div className="relative w-full h-[70vh] overflow-hidden">
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
            <img
              src={slides[currentSlide].src}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Play/Pause button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>


    </div>
  );
};

export default ColorSlider;

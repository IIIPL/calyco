import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      src: '/Assets/slider/Luxurious_Calyco_bedroom_with_a_sophisticated_ble_d9771689-ca96-422e-997b-5a987e87cc7e_0.png',
      alt: 'Luxurious Calyco Bedroom'
    },
    {
      type: 'image',
      src: '/Assets/slider/luxurious_photorealistic_interior_living_room_i_6c8b2a09-fc4d-4e6b-ac48-4fbd3417b03d_3.png',
      alt: 'Luxurious Interior Living Room'
    },
    {
      type: 'image',
      src: '/Assets/LustroLite/inhouse.png',
      alt: 'LustroLite Premium Paint'
    }
  ];

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
    <div className="relative w-full h-[70vh] overflow-hidden mt-16">
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
  );
};

export default ColorSlider;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TextureShowcase = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const textureImages = [
    '/Assets/Texture Images/tex11.webp',
    '/Assets/Texture Images/tex5.webp',
    '/Assets/Texture Images/tex7.webp'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % textureImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [textureImages.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <section className="w-full bg-[#f9f6f2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-10 sm:py-12 lg:py-16">
          {/* Left Side - Image Slider */}
          <div className="order-1 lg:order-1 relative h-[280px] sm:h-[320px] lg:h-[380px] rounded-2xl overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={textureImages[currentIndex]}
                alt="Texture Collection"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'tween', duration: 0.8, ease: 'easeInOut' },
                  opacity: { duration: 0.6 }
                }}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              />
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {textureImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="order-2 lg:order-2 space-y-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            >
              <span className="text-[#0F1221]">Discover Our </span>
              <span className="text-[#998850]">Texture Collection</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg text-[#4A4A4A] leading-relaxed max-w-lg"
            >
              Add depth and character to your walls with our premium textures.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => navigate('/textures')}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#998850] text-white rounded-full font-semibold hover:bg-[#856f34] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Textures
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextureShowcase;

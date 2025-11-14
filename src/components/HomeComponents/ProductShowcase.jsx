import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const products = [
    {
      id: 1,
      name: 'Luxury Interior Emulsion',
      tagline: 'PEARL FINISH | WASHABLE | LOW VOC | STAIN RESISTANT',
      features: [
        'Premium Pearl Finish',
        'Washable & Durable',
        'Low VOC Formula',
        'Stain Resistant Technology'
      ],
      image: '/Assets/Product Images/Luxury Interior Emulsion/luxury-interior-bucket-transparent.png',
      link: '/product/Luxury-Interior-Emulsion',
      price: '₹800/L'
    },
    {
      id: 2,
      name: 'Luxury Exterior Emulsion',
      tagline: 'HIGH SHEEN FINISH | WEATHERPROOF | UV PROTECTION',
      features: [
        'High Sheen Finish',
        'All-Weather Protection',
        'UV Resistant',
        'Mildew & Algae Guard'
      ],
      image: '/Assets/Product Images/Luxury Exterior Emulsion/luxury-exterior-bucket-transparent.png',
      link: '/product/Luxury-Exterior-Emulsion',
      price: '₹800/L'
    },
    {
      id: 3,
      name: 'Waterproof Sealer',
      tagline: 'UNIVERSAL PROTECTION | BREATHABLE | LONG-LASTING',
      features: [
        'Universal Surface Protection',
        'Breathable Technology',
        'Flexible Barrier',
        'Interior & Exterior Use'
      ],
      image: '/Assets/Product Images/Waterproof Sealer/waterproof-bucket-png.png',
      link: '/product/Waterproofing-Sealer',
      price: '₹599/L'
    }
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    })
  };

  const backgroundVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.7
    }),
    center: (position) => ({
      zIndex: 0,
      x: position === 'left' ? -100 : 100,
      opacity: 0.3,
      scale: 0.75
    }),
    exit: (direction) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.7
    })
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === products.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? products.length - 1 : prevIndex - 1;
      }
    });
  };

  const currentProduct = products[currentIndex];
  const prevIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === products.length - 1 ? 0 : currentIndex + 1;

  return (
    <section className="relative w-full overflow-hidden min-h-screen lg:h-[65vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Assets/bg-image.webp"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="/Assets/background-texture.webp"
          alt="Texture"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      {/* Purple Color Overlay - 43% opacity */}
      <div className="absolute inset-0 z-[2]" style={{ backgroundColor: 'rgba(67, 36, 82, 0.43)' }} />

      {/* Navigation Arrows - Far Left and Right */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 transition-all duration-300 shadow-2xl hover:scale-110"
        aria-label="Previous product"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 transition-all duration-300 shadow-2xl hover:scale-110"
        aria-label="Next product"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </button>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12 md:py-10 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">

          {/* Left Side - Product Images with Stacking Effect */}
          <div className="relative flex items-center justify-center min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[450px]">
            <div className="relative w-full max-w-3xl lg:max-w-5xl">

              {/* Background Products */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Previous Product (Left Background) */}
                <motion.div
                  key={`prev-${prevIndex}`}
                  custom="left"
                  variants={backgroundVariants}
                  initial="enter"
                  animate="center"
                  className="absolute left-0 w-4/5 md:w-3/4"
                >
                  <img
                    src={products[prevIndex].image}
                    alt={products[prevIndex].name}
                    className="w-full h-auto object-contain filter blur-[2px]"
                  />
                </motion.div>

                {/* Next Product (Right Background) */}
                <motion.div
                  key={`next-${nextIndex}`}
                  custom="right"
                  variants={backgroundVariants}
                  initial="enter"
                  animate="center"
                  className="absolute right-0 w-4/5 md:w-3/4"
                >
                  <img
                    src={products[nextIndex].image}
                    alt={products[nextIndex].name}
                    className="w-full h-auto object-contain filter blur-[2px]"
                  />
                </motion.div>
              </div>

              {/* Main Product (Center) */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentProduct.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side - Product Details (Simplified) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-white space-y-6 md:space-y-8 text-center lg:text-left"
            >
              {/* Product Name */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-tight">
                  {currentProduct.name}
                </h2>
              </div>

              {/* Features */}
              <div className="space-y-3 md:space-y-4 flex flex-col items-center lg:items-start">
                {currentProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#998850] flex items-center justify-center">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base md:text-lg text-white/90">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button Only */}
              <div className="pt-4 md:pt-6 flex justify-center lg:justify-start">
                <Link
                  to={currentProduct.link}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#998850] text-white rounded-lg font-semibold text-sm md:text-base hover:bg-[#887744] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Product Details
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-3 mt-12 lg:mt-16">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-12 bg-[#998850]'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;

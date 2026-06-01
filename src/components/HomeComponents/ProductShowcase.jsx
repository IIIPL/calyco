import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Premium easing curve for luxurious feel
const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };

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
      image: '/Assets/Product Images/Luxury Interior Emulsion/luxury-interior-bucket-transparent.webp',
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
      image: '/Assets/Product Images/Luxury Exterior Emulsion/luxury-exterior-bucket-transparent.webp',
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
      image: '/Assets/Product Images/Waterproof Sealer/waterproof-bucket-png.webp',
      link: '/product/Waterproofing-Sealer',
      price: '₹599/L'
    }
  ];

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = products.length - 1;
      if (nextIndex >= products.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentProduct = products[currentIndex];

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        // delayChildren: 0.2,
        ...transition
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition }
  };

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.5, ease: "easeInOut" }
    })
  };

  return (
    <section className="relative w-full overflow-hidden min-h-[85vh] lg:h-[80vh] flex items-center bg-[#0F1221]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          key={currentIndex}
          src="/Assets/bg-image.webp"
          alt="Background"
          className="w-full h-full object-cover opacity-40" // Lowered opacity directly
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }} // Subtle zoom effect
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1221] via-[#0F1221]/80 to-transparent" />
      </div>

      {/* Navigation - Absolute Center Y */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-8 z-30 pointer-events-none">
        <button
          onClick={() => paginate(-1)}
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white hover:scale-110 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white hover:scale-110 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Image Section (Left - 7 cols) */}
          <div className="lg:col-span-7 relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full max-w-md lg:max-w-xl flex justify-center"
              >
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text Section (Right - 5 cols) */}
          <div className="lg:col-span-5 relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8 text-center lg:text-left"
              >
                {/* Tagline */}
                <motion.p variants={itemVariants} className="text-[#998850] font-semibold tracking-widest text-sm uppercase">
                  {currentProduct.tagline.split('|')[0]}
                </motion.p>

                {/* Title */}
                <motion.h2
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  {currentProduct.name}
                </motion.h2>

                {/* Features */}
                <motion.div variants={itemVariants} className="space-y-4 pt-2">
                  {currentProduct.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 justify-center lg:justify-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#998850]" />
                      <span className="text-white/80 text-lg">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.div variants={itemVariants} className="pt-6">
                  <Link
                    to={currentProduct.link}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#998850] text-white rounded-full font-medium transition-all duration-300 hover:bg-[#887744] hover:shadow-[0_0_30px_rgba(153,136,80,0.3)]"
                  >
                    View Product
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx > currentIndex ? 1 : -1)}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-[#998850]' : 'w-2 bg-white/20'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;

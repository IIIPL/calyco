import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { getTypographyClasses, getButtonClasses } from '../data/admin/typography';

const StaticHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className="relative w-full min-h-screen overflow-hidden flex items-center bg-[#FAFAFA]">

      {/* Background with Parallax - Lighter Overlay */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="/Assets/Textures/Urban%20Concrete%20(The%20Grey%20Cement%20Look).webp"
          alt="Architectural concrete texture"
          className="w-full h-[120%] object-cover object-center brightness-[1.05] contrast-[0.95]"
        />
        {/* Subtle Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("/Assets/background-texture.webp")', backgroundSize: '200px' }}></div>
        {/* Much Lighter Vignette for Premium Feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.3)_100%)]" />
      </motion.div>

      {/* Content Container - More Generous Spacing */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 pt-32 pb-20">
        <div className="max-w-5xl">

          {/* Label - Refined */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 flex justify-center md:justify-start"
          >
            <span className="inline-block px-5 py-2 rounded-full border border-[#0F1221]/10 bg-white/60 backdrop-blur-md text-[#0F1221]/70 text-[11px] md:text-xs font-medium tracking-[0.2em] uppercase shadow-sm">
              Commercial Coatings — Direct From Manufacturer
            </span>
          </motion.div>

          {/* Headline - Lighter, More Elegant */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
            className="text-[#0F1221] text-5xl sm:text-6xl md:text-7xl lg:text-[92px] leading-[1.08] mb-8 tracking-[-0.02em] font-light"
          >
            You're Overpaying for Paint.<br />
            <span className="text-[#0F1221]/50">Let's Fix That.</span>
          </motion.h1>

          {/* Positioning Line - Increased Line Height */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-[#0F1221]/60 max-w-3xl leading-[1.7] font-light mb-14 mx-auto md:mx-0"
          >
            Calyco is for designers, developers, and contractors who want contemporary, specification-grade finishes across every surface — without paying brand premiums.
          </motion.p>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 border-t border-[#0F1221]/8 pt-12">

            {/* Buttons - Softer, More Premium */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
            >
              <Link
                to="/contact"
                className="group relative px-8 py-4 bg-[#0F1221] text-white rounded-xl text-sm font-medium tracking-[0.05em] whitespace-nowrap overflow-hidden hover:bg-[#1a1f35] hover:shadow-xl transition-all duration-500 flex items-center justify-center w-auto min-w-[180px] shadow-lg"
              >
                <span className="relative z-10">Talk to Our Team</span>
              </Link>
              <Link
                to="/products"
                className="px-8 py-4 bg-white border-2 border-[#0F1221]/15 text-[#0F1221] rounded-xl text-sm font-medium tracking-[0.05em] whitespace-nowrap hover:bg-[#0F1221]/5 hover:border-[#0F1221]/25 transition-all duration-500 flex items-center justify-center hover:shadow-lg w-auto min-w-[180px]"
              >
                View Product Range
              </Link>
            </motion.div>

            {/* Stats Grid - More Refined */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
              className="grid grid-cols-3 gap-8 md:gap-12"
            >
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-light text-[#0F1221] mb-1.5">15–20%</div>
                <div className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-[#0F1221]/40 font-medium">Below Market</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-light text-[#0F1221] mb-1.5">&lt; 50 g/L</div>
                <div className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-[#0F1221]/40 font-medium">VOC Content</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-light text-[#0F1221] mb-1.5">8-Year</div>
                <div className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-[#0F1221]/40 font-medium">Warranty</div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StaticHero;
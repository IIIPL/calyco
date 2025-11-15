import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PremiumTextureSplit = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative h-[85vh] sm:h-[65vh] md:h-[70vh] lg:h-[72vh]"
      >
        <img
          src="/Assets/Texture Images/tex1.webp"
          alt="Premium textured living room"
          className="absolute inset-0 h-full w-full object-cover object-[25%_center] scale-[1.18] md:object-center md:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/35 to-black/5" />

        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="text-white max-w-xl md:max-w-2xl lg:max-w-3xl md:ml-auto text-center md:text-right">
              <div className="inline-block mb-3 sm:mb-4 mx-auto md:mx-0">
                <span className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-xs sm:text-xs font-semibold uppercase tracking-wider shadow-lg">
                  Premium Texture Finishes
                </span>
              </div>

              <h3 className="text-3xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold mb-3 sm:mb-4 md:mb-5 leading-[1.25] text-white tracking-normal">
                Walls That <span className="text-white md:text-[#998850]">Stand Out!</span>
              </h3>

              <p className="text-base sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 text-white/90 font-normal leading-[1.55] sm:leading-[1.55] md:leading-[1.6] max-w-2xl mx-auto md:mx-0 md:ml-auto">
                Discover luxurious textures engineered <span className="hidden md:inline"><br /></span>to add depth, warmth, and brilliance to every surface.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center md:justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/products?category=premium-textures')}
                  className="inline-flex items-center justify-center px-6 py-3.5 sm:px-6 sm:py-3 bg-white text-[#0F1221] rounded-lg font-semibold text-base sm:text-sm hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full max-w-xs mx-auto md:w-auto md:mx-0"
                >
                  Explore Textures
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PremiumTextureSplit;

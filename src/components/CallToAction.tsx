import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-gradient-to-br from-[#F9F6FF] via-white to-[#F6F4FF] py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Subtle gradient blurs for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-16 w-48 h-48 bg-[#432452]/10 blur-[140px]" />
        <div className="absolute bottom-0 right-24 w-56 h-56 bg-[#998850]/20 blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6 md:space-y-8"
        >
          {/* Badge */}
          <div className="inline-block">
            <span className="inline-flex items-center px-5 py-2 bg-white/60 backdrop-blur-md text-[#432452] border border-[#432452]/20 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm">
              Let's Transform Your Space
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-bold leading-tight text-[#0F1221] max-w-4xl mx-auto">
            Ready to paint a better future with <span className="text-[#998850]">Calyco</span>?
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#0F1221]/75 leading-relaxed max-w-3xl mx-auto">
            From curated color palettes to expert-approved formulations, our experts help you plan, budget, and deliver designer-grade finishes without the premium markup.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#432452] text-white rounded-lg font-semibold text-base sm:text-sm hover:bg-[#5a2f6e] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explore Products
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#432452] border-2 border-[#432452] rounded-lg font-semibold text-base sm:text-sm hover:bg-[#432452] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;

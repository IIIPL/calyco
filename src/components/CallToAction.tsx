import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F5F5] py-28 md:py-36 lg:py-40 overflow-hidden font-poppins border-t border-[#0F1221]/5">
      {/* Subtle gradient blurs for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-16 w-96 h-96 bg-[#0F1221]/3 blur-[180px]" />
        <div className="absolute bottom-1/4 right-24 w-96 h-96 bg-[#0F1221]/2 blur-[200px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-10 md:space-y-12"
        >
          {/* Badge */}
          <div className="inline-block">
            <span className="inline-flex items-center px-6 py-2.5 bg-[#0F1221]/5 backdrop-blur-md text-[#0F1221]/60 border border-[#0F1221]/10 rounded-full text-xs font-medium uppercase tracking-[0.2em]">
              YOUR NEXT PROJECT
            </span>
          </div>

          {/* Heading - Lighter, More Elegant */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.12] text-[#0F1221] max-w-5xl mx-auto tracking-[-0.01em]">
            You're Overpaying for Paint. <span className="text-[#0F1221]/40">We Both Know It.</span>
          </h2>

          {/* Description - Increased Line Height */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#0F1221]/60 leading-[1.7] max-w-4xl mx-auto font-light">
            Send us your project scope — area, substrates, timeline — and we'll return a product recommendation, coverage estimate, and a delivered price that'll make you wonder why you didn't call sooner. You'll also get a direct line to the person managing your account. Not a chatbot. Not a queue. A person who already knows what you need.
          </p>

          {/* Buttons - Softer, More Premium */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center justify-center px-10 py-5 bg-[#0F1221] text-white rounded-xl font-medium text-base hover:bg-[#1a1f35] transition-all duration-500 shadow-lg hover:shadow-2xl tracking-[0.02em]"
            >
              Talk to Our Team
            </button>
            <button
              onClick={() => window.open('/Assets/Calyco-Product-Catalogue.pdf', '_blank')}
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-[#0F1221] border-2 border-[#0F1221]/15 rounded-xl font-medium text-base hover:bg-[#0F1221]/5 hover:border-[#0F1221]/25 transition-all duration-500 shadow-lg hover:shadow-2xl tracking-[0.02em]"
            >
              Download Product Catalogue
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;

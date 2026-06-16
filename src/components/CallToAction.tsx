import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden font-poppins" style={{ background: 'linear-gradient(135deg, #3D2B4E 0%, #2A1B38 50%, #1E1230 100%)' }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-16 w-[500px] h-[500px] bg-[#F0C85A]/8 blur-[180px]" />
        <div className="absolute bottom-1/4 right-24 w-[400px] h-[400px] bg-[#F0C85A]/5 blur-[160px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#F0C85A]/10 border border-[#F0C85A]/25 rounded-full text-[13px] font-medium uppercase tracking-[0.2em] text-[#F0C85A]/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0C85A] animate-pulse" />
              Calyco 5-Star Painting Services
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] text-white tracking-[-0.02em] max-w-4xl mx-auto">
            Ready for Painting{' '}
            <span className="text-white/35">Without Guesswork?</span>
          </h2>

          {/* Sub-copy */}
          <p className="text-base sm:text-lg text-white/45 leading-[1.75] max-w-2xl mx-auto font-light">
            Book a Calyco inspection and get a fixed quote, verified painters, daily updates, and final quality inspection -- before committing to anything.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => navigate('/calculators/service-cost-calculator')}
              className="inline-flex items-center justify-center px-9 py-4 bg-[#F0C85A] text-[#0F1221] rounded-full font-medium text-sm tracking-[0.03em] hover:bg-white transition-colors duration-300 shadow-[0_4px_24px_rgba(240,200,90,0.35)]"
            >
              Book Free Inspection
            </button>
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center justify-center px-9 py-4 bg-transparent text-white border border-white/20 rounded-full font-medium text-sm tracking-[0.03em] hover:bg-white/8 hover:border-white/35 transition-all duration-300"
            >
              View Service Packages →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SustainabilityCTA = ({ primaryHref = "/sustainability", secondaryHref = "/compliance" }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#493657] to-[#5E3A98] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wide">
            Our Commitment to Sustainability
          </h2>
          
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Discover how we're leading the industry in sustainable paint solutions and environmental responsibility. 
            Learn about our zero-VOC formulations, eco-friendly processes, and commitment to a greener future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={primaryHref}
                className="inline-flex items-center gap-2 bg-white text-[#493657] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Read Our Sustainability Promise
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={secondaryHref}
                className="inline-flex items-center gap-2 text-white border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                View Compliance Reports
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <div className="mt-8 text-sm text-white/60">
            <p>Trusted by professionals • Certified by leading organizations • Committed to transparency</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SustainabilityCTA;

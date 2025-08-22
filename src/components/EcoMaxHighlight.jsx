import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, Shield } from 'lucide-react';
import SwatchChip from './SwatchChip';

const EcoMaxHighlight = ({ swatches = [], showFounderQuote = true }) => {
  const defaultSwatches = [
    { name: "EcoMax Green", hex: "#68D391" },
    { name: "Pure White", hex: "#FFFFFF" },
    { name: "Natural Beige", hex: "#F5F5DC" }
  ];

  const displaySwatches = swatches.length > 0 ? swatches : defaultSwatches;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-[#efe7ff]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-[#493657] mb-6 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              EcoMax Technology
            </motion.h2>
            
            <motion.p 
              className="text-lg text-[#493657]/70 leading-relaxed tracking-wide mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our proprietary EcoMax Technology represents a breakthrough in sustainable paint formulation. 
              By developing our own eco-friendly colorants specifically designed for sustainable formulations, 
              we eliminate unnecessary chemicals while delivering exceptional color vibrancy and durability.
            </motion.p>

            {/* Feature List */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#F0C85A] rounded-full flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#493657] font-medium">Zero-VOC Formulations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#5E3A98] rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#493657] font-medium">Superior Color Performance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#493657] rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#493657] font-medium">Long-lasting Durability</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              {/* Visual Element */}
              <div className="mb-8">
                <div className="w-full h-48 bg-gradient-to-br from-[#F0C85A]/20 to-[#5E3A98]/20 rounded-2xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#F0C85A] to-[#5E3A98] rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#493657]">EcoMax Technology</h4>
                  </div>
                </div>
                
                {/* Swatch Chips */}
                <div className="flex justify-center gap-4">
                  {displaySwatches.map((swatch, index) => (
                    <SwatchChip key={index} {...swatch} />
                  ))}
                </div>
              </div>

              {/* Founder Quote */}
              {showFounderQuote && (
                <motion.div 
                  className="border-t border-gray-100 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <blockquote className="text-[#493657]/80 italic text-center mb-3">
                    "EcoMax makes our paint cleaner on the inside and truer on the outside, delivering sustainable performance that lasts for years."
                  </blockquote>
                  <p className="text-center text-sm font-medium text-[#5E3A98]">
                    — ARMAAN KOTHARY, FOUNDER
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EcoMaxHighlight;

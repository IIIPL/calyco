import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Shield, Leaf } from 'lucide-react';

const AboutIntroStrip = ({ badges = [] }) => {
  const defaultBadges = [
    { icon: Award, label: "Award Winning", color: "#F0C85A" },
    { icon: Star, label: "Premium Quality", color: "#5E3A98" },
    { icon: Shield, label: "Trusted Brand", color: "#493657" }
  ];

  const displayBadges = badges.length > 0 ? badges : defaultBadges;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-xs font-semibold text-[#F0C85A] uppercase tracking-widest bg-[#F0C85A]/10 px-4 py-2 rounded-full">
                Our Story
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#493657] leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Doing Things the Right Way
            </motion.h2>
            
            {/* Body Text */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-lg leading-relaxed text-[#493657]/70 tracking-wide">
                At Calyco Paints, we believe in doing things the right way. Our paints combine sustainability with uncompromising performance, delivering vibrant colors that last while protecting our environment.
              </p>
              <p className="text-lg leading-relaxed text-[#493657]/70 tracking-wide">
                Founded in 2023, we created EcoMax Technology—delivering vibrant, long-lasting colors in zero-VOC formulations. It's our commitment to healthier living and a cleaner planet.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Premium Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              className="bg-gradient-to-br from-gray-50 via-white to-[#efe7ff] rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all duration-500"
              whileHover={{ y: -2 }}
            >
              {/* Abstract Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F0C85A]/10 to-[#5E3A98]/10 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Badge */}
              <div className="relative z-10 mb-6">
                <span className="inline-flex items-center gap-2 bg-[#F0C85A] text-[#493657] px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                  <Leaf className="w-4 h-4" />
                  EcoMax™ Technology
                </span>
              </div>

              {/* Quote */}
              <div className="relative z-10 mb-8">
                <blockquote className="text-2xl md:text-3xl font-light text-[#493657] leading-relaxed italic">
                  "EcoMax makes our paint cleaner on the inside and truer on the outside, delivering sustainable performance that lasts for years."
                </blockquote>
              </div>

              {/* Divider */}
              <div className="relative z-10 w-16 h-px bg-gradient-to-r from-[#F0C85A] to-transparent mb-6" />

              {/* Founder Info */}
              <div className="relative z-10 mb-8">
                <p className="text-lg font-semibold text-[#493657]">Armaan Kothary</p>
                <p className="text-sm text-[#493657]/60 font-medium">Founder & Innovator</p>
              </div>

              {/* Swatch Chips */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg shadow-sm border border-gray-200" style={{ backgroundColor: '#68D391' }} />
                  <span className="text-xs font-medium text-[#493657]/70">EcoMax Green</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg shadow-sm border border-gray-200" style={{ backgroundColor: '#FFFFFF' }} />
                  <span className="text-xs font-medium text-[#493657]/70">Pure White</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg shadow-sm border border-gray-200" style={{ backgroundColor: '#F5F5DC' }} />
                  <span className="text-xs font-medium text-[#493657]/70">Natural Beige</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Strip - Optional Add */}
        <motion.div 
          className="mt-20 pt-12 border-t border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-[#493657]/60 uppercase tracking-widest">
              Trusted by Industry Leaders
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-12 opacity-60 hover:opacity-100 transition-opacity duration-300">
            {displayBadges.map((badge, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#F0C85A]/20 transition-colors duration-300">
                  <badge.icon 
                    className="w-6 h-6 text-gray-400 group-hover:text-[#5E3A98] transition-colors duration-300" 
                  />
                </div>
                <span className="text-xs font-medium text-[#493657]/60 group-hover:text-[#493657] transition-colors duration-300">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutIntroStrip;

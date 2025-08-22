import React from 'react';
import { motion } from 'framer-motion';

const WhyTrustUs = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-800 via-amber-900 to-amber-700 relative overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute w-20 h-20 bg-white/10 rounded-full top-10 right-15 animate-bounce"></div>
      <div className="absolute w-16 h-16 bg-white/10 rounded-full bottom-20 left-10 animate-bounce" style={{animationDelay: '-4s'}}></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight tracking-tight">
            Bring out the best<br />in your spaces
          </h1>
          <p className="text-xl md:text-2xl text-white/85 mb-10 font-light tracking-wide">
            Premium, eco-friendly paints that elevate<br />every room, every wall.
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <button 
              onClick={() => navigate('/colors')}
              className="px-10 py-4 bg-amber-400 text-gray-900 rounded-full font-medium text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              Explore Colors
            </button>
          </div>
        </motion.div>

        {/* Family Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden mb-10 bg-gradient-to-br from-amber-700 to-amber-600 shadow-2xl"
        >
          <div className="w-full h-full flex items-center justify-center relative">
            <img 
              src="/Assets/ChatGPT Image Aug 22, 2025, 01_32_07 PM.png" 
              alt="Professional family and contractors trust Calyco" 
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Paint Quality Card */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white/95 p-10 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20"
          >
            <h3 className="text-3xl font-normal text-[#2a2a2a] mb-4 leading-tight tracking-tight">
              Paint that lasts<br />longer
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6 font-normal">
              Advanced one-coat formulas for beauty and durability.
            </p>
            <div className="h-48 rounded-2xl mb-6 overflow-hidden">
              <img 
                src="/Assets/allguard.png" 
                alt="AllGuard premium paint showing quality and durability" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </motion.div>

          {/* Professional Testimonial Card */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white/95 p-10 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20"
          >
            <h3 className="text-3xl font-normal text-[#2a2a2a] mb-4 leading-tight tracking-tight">
              What<br />professionals say
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6 font-normal">
              Calyco paints helped us finish faster, with fewer coats, and the quality is unmatched.
            </p>
            <div className="h-48 rounded-2xl mb-6 overflow-hidden">
              <img 
                src="/Assets/trust-image.png" 
                alt="Professional contractors and builders trust Calyco" 
                className="w-full h-full object-cover object-bottom rounded-2xl"
              />
            </div>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
};

export default WhyTrustUs;

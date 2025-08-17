import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { colorGroups } from "../data/colorGroups";
import ColorExplorer from "../components/ColorExplore";
import { useNavigate } from "react-router-dom";
import ColorDisclaimer from "../components/ColorComponents/ColorDisclaimer";
import ColorExplore from "../components/ColorExplore";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function ColorsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const filterRef = useRef(null);

  useEffect(() => {
    document.title = "Calyco Sacred Palette";
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeColor ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [activeColor]);

  const filters = colorGroups.map((group) => group.title);

  const toggleFilter = (title) => {
    setFilter((prev) => {
      const updated = prev.includes(title)
        ? prev.filter((f) => f !== title)
        : [...prev, title];

      setTimeout(() => {
        if (filterRef.current) {
          filterRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 30);

      return updated;
    });
  };

  const filteredGroups =
    filter.length === 0
      ? colorGroups
      : colorGroups.filter((group) => filter.includes(group.title));

  const totalColors = filteredGroups.reduce(
    (acc, group) => acc + group.colors.length,
    0
  );

  return (
    <div className="font-poppins bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#493657] via-[#5a4067] to-[#493657] pt-24 pb-16">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent animate-pulse"></div>
        </div>
        
        {/* Floating Nature Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-[#F0C85A]/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-[#F0C85A]/15 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-[#F0C85A]/25 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/30">🌱 Eco-Friendly</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Sacred Palette
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Discover our signature collection of 108 pigment-rich colors, 
                expertly formulated with nature-inspired hues and eco-conscious materials.
              </p>
              
              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold text-[#F0C85A]">108</div>
                  <div className="text-sm text-white/80">Colors</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold text-[#F0C85A]">100%</div>
                  <div className="text-sm text-white/80">Low-VOC</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold text-[#F0C85A]">8</div>
                  <div className="text-sm text-white/80">Families</div>
                </motion.div>
              </div>
              
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => document.getElementById('color-explorer').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-[#F0C85A] text-[#493657] rounded-xl font-semibold hover:bg-[#E6B84A] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Explore Colors
                </motion.button>
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  onClick={() => navigate('/inspirations')}
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-[#493657] transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Get Inspired
                </motion.button>
              </div>
            </motion.div>
            
            {/* Enhanced Image Section */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/Assets/color-banner.png"
                  className="w-full h-auto object-cover"
                  alt="CALYCO Sacred Palette — 108 eco-friendly paint colors collection showcase"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Color Palette Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2 justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#F0C85A] border-2 border-white shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full bg-[#493657] border-2 border-white shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full bg-[#E6B84A] border-2 border-white shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full bg-[#5a4067] border-2 border-white shadow-lg"></div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F0C85A] rounded-full opacity-20 animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#493657] rounded-full opacity-20 animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-[#E6B84A] rounded-full opacity-15 animate-pulse shadow-lg" style={{ animationDelay: '2s' }}></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Eco-Friendly Features */}
      <div className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-100/20 to-blue-100/20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🌿</span>
              <span>Nature-Inspired</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Eco-Conscious Design
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our colors are formulated with sustainable practices and natural pigments, 
              ensuring both beauty and environmental responsibility for generations to come.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌱",
                title: "Low-VOC Formula",
                description: "Minimal volatile organic compounds for healthier indoor air quality and environmental protection",
                color: "from-green-50 to-emerald-50",
                border: "border-green-200"
              },
              {
                icon: "♻️",
                title: "Sustainable Sourcing",
                description: "Responsibly sourced pigments and eco-friendly packaging with minimal environmental impact",
                color: "from-blue-50 to-cyan-50",
                border: "border-blue-200"
              },
              {
                icon: "🎨",
                title: "Natural Inspiration",
                description: "Colors inspired by India's diverse landscapes and cultural heritage, celebrating nature's palette",
                color: "from-amber-50 to-yellow-50",
                border: "border-amber-200"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`text-center p-8 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Color Explorer Section */}
      <div id="color-explorer" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100/20 to-blue-100/20"></div>
        </div>
        <ColorExplore/>
        
        {/* Filter Bar */} 
       
      </div>
      <div className="px-10">
        <ColorDisclaimer variant="full"/>
      </div>
    </div>
  );
}
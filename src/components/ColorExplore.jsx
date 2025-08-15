import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { flatColors } from "../data/flatColors";
import ColorBox from "./ColorComponents/ColorBox";
import { FaLeaf, FaPalette, FaEye, FaChevronDown, FaChevronUp } from "react-icons/fa6";

const ColorExplore = () => {
  const navigate = useNavigate();
  const [expandedFamily, setExpandedFamily] = useState(null);

  const colorsByFamily = flatColors.reduce((acc, color) => {
    const family = color.color_family || "Uncategorized";
    if (!acc[family]) acc[family] = [];
    acc[family].push(color);
    return acc;
  }, {});

  const familyData = {
    "WHITES & OFF WHITES": {
      color: "#F8F9FA",
      textColor: "#2C3E50",
      accentColor: "#E9ECEF",
      icon: "🌿",
      description: "Pure and clean whites for timeless elegance"
    },
    "GREYS": {
      color: "#6C757D",
      textColor: "#FFFFFF",
      accentColor: "#495057",
      icon: "🏔️",
      description: "Sophisticated greys for modern sophistication"
    },
    "BROWNS": {
      color: "#8B4513",
      textColor: "#FFFFFF",
      accentColor: "#A0522D",
      icon: "🌳",
      description: "Warm earth tones inspired by nature"
    },
    "GREENS": {
      color: "#2E8B57",
      textColor: "#FFFFFF",
      accentColor: "#3CB371",
      icon: "🌱",
      description: "Fresh greens that bring the outdoors in"
    },
    "PURPLES & PINKS": {
      color: "#9370DB",
      textColor: "#FFFFFF",
      accentColor: "#BA55D3",
      icon: "🌸",
      description: "Vibrant purples and soft pinks for creativity"
    },
    "REDS & ORANGES": {
      color: "#DC3545",
      textColor: "#FFFFFF",
      accentColor: "#FD7E14",
      icon: "🌅",
      description: "Bold reds and warm oranges for energy"
    },
    "YELLOWS & GREENS": {
      color: "#FFD700",
      textColor: "#2C3E50",
      accentColor: "#FFA500",
      icon: "🌻",
      description: "Sunny yellows and fresh greens for vitality"
    },
    "BLUES": {
      color: "#1E90FF",
      textColor: "#FFFFFF",
      accentColor: "#4169E1",
      icon: "🌊",
      description: "Calming blues inspired by sky and sea"
    },
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-&]+/g, '')
      .replace(/\-\-+/g, '-');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="w-full mx-auto px-6 py-12">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#493657]/10 text-[#493657] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FaPalette />
            <span>Explore Our Collection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#493657] mb-6">
            Color By Family
          </h1>
          <p className="text-xl text-[#493657]/70 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated color families, each inspired by nature's beauty and designed to create harmonious spaces.
          </p>
        </motion.div>

        {/* Enhanced Color Families Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(colorsByFamily).map(([family, colors], index) => {
            const familyInfo = familyData[family] || {
              color: "#E0E0E0",
              textColor: "#2C3E50",
              accentColor: "#B0B0B0",
              icon: "🎨",
              description: "Beautiful colors for your space"
            };

            return (
              <motion.div
                key={family}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* Family Header */}
                  <div
                    className="relative p-6 cursor-pointer transition-all duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${familyInfo.color} 0%, ${familyInfo.accentColor} 100%)`,
                      color: familyInfo.textColor 
                    }}
                    onClick={() => setExpandedFamily(expandedFamily === family ? null : family)}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
                    </div>
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                          {familyInfo.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">{family}</h3>
                          <p className="text-sm opacity-90">{familyInfo.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {colors.length} colors
                        </span>
                        <motion.div
                          animate={{ rotate: expandedFamily === family ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                        >
                          <FaChevronDown className="text-sm" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {expandedFamily === family && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                          <div className="flex items-center justify-between mb-6">
                            <h4 className="text-lg font-semibold text-[#493657]">
                              Explore {family}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/colors/family/${slugify(family)}`);
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-[#493657] text-white rounded-lg hover:bg-[#5a4067] transition-colors duration-200 text-sm font-medium"
                            >
                              <FaEye />
                              View All Colors
                            </button>
                          </div>
                          
                          {/* Color Grid */}
                          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                            {colors.slice(0, 16).map((color, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.02 }}
                              >
                                <ColorBox
                                  color={color}
                                  familyName={family}
                                />
                              </motion.div>
                            ))}
                          </div>
                          
                          {colors.length > 16 && (
                            <div className="text-center mt-6">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/colors/family/${slugify(family)}`);
                                }}
                                className="text-[#493657] hover:text-[#F0C85A] transition-colors duration-200 font-medium"
                              >
                                +{colors.length - 16} more colors
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaLeaf className="text-green-600 text-2xl" />
              <h3 className="text-2xl font-bold text-[#493657]">Eco-Friendly Colors</h3>
            </div>
            <p className="text-[#493657]/70 max-w-2xl mx-auto leading-relaxed">
              All our colors are formulated with sustainable practices and natural pigments, 
              ensuring both beauty and environmental responsibility for your home.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ColorExplore;

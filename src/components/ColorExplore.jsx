// components/ColorExplore.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getAllColors } from "../data/calycoColors.js";

const flatColors = getAllColors();
import ColorBox from "./ColorComponents/ColorBox";
import { FaLeaf, FaPalette, FaEye, FaChevronDown, FaChevronUp } from "react-icons/fa6";

// --- helpers ---
// mid-tone fallback if familyHex missing
const ColorExplore = () => {
  const navigate = useNavigate();
  const [expandedFamily, setExpandedFamily] = useState(null);

  // group by family
  const colorsByFamily = flatColors.reduce((acc, color) => {
    const f = color.color_family || "Uncategorized";
    (acc[f] ||= []).push(color);
    return acc;
  }, {});

  const orderedFamilies = [
    "Whites",
    "Grays",
    "Earth Tones",
    "Blues",
    "Greens",
    "Yellows & Golds",
    "Reds & Pinks",
    "Purples & Violets",
    "Beiges & Tans",
    "Oranges",
    "Blacks & Deep Tones",
    "Specialty Metallics"
  ];

  const families = orderedFamilies.filter(name => colorsByFamily[name]);

  const familyData = {
    "Whites": {
      color: "#F7F4EF",
      textColor: "#2C3E50",
      accentColor: "#EDE8DC",
      icon: "W",
      description: "Pure whites and soft neutrals for bright, timeless spaces"
    },
    "Grays": {
      color: "#8E959C",
      textColor: "#FFFFFF",
      accentColor: "#5E6670",
      icon: "G",
      description: "Modern grays ranging from misty silvers to bold charcoals"
    },
    "Earth Tones": {
      color: "#8A5C3D",
      textColor: "#FFFFFF",
      accentColor: "#B27A4F",
      icon: "E",
      description: "Grounded clays, ochres, and natural hues drawn from the earth"
    },
    "Blues": {
      color: "#2D5C8A",
      textColor: "#FFFFFF",
      accentColor: "#4A7FB5",
      icon: "B",
      description: "Oceanic blues from airy coastal shades to deep nautical statements"
    },
    "Greens": {
      color: "#3E6D4C",
      textColor: "#FFFFFF",
      accentColor: "#5A8A65",
      icon: "N",
      description: "Botanical greens delivering serene, restorative energy"
    },
    "Yellows & Golds": {
      color: "#D9B234",
      textColor: "#2C2C2C",
      accentColor: "#F4C74E",
      icon: "Y",
      description: "Sunlit yellows and luminous golds that energize every space"
    },
    "Reds & Pinks": {
      color: "#B94249",
      textColor: "#FFFFFF",
      accentColor: "#E05B67",
      icon: "R",
      description: "Expressive reds and romantic pinks for fearless color stories"
    },
    "Purples & Violets": {
      color: "#6F4A74",
      textColor: "#FFFFFF",
      accentColor: "#8A61A0",
      icon: "P",
      description: "Lavenders and violets balancing creativity with sophistication"
    },
    "Beiges & Tans": {
      color: "#C3A985",
      textColor: "#2C2C2C",
      accentColor: "#D6BA96",
      icon: "A",
      description: "Elevated neutrals that bring tailored warmth to any palette"
    },
    "Oranges": {
      color: "#D7662E",
      textColor: "#FFFFFF",
      accentColor: "#F08545",
      icon: "O",
      description: "Sunset-inspired oranges infused with cultural vibrancy"
    },
    "Blacks & Deep Tones": {
      color: "#2B2B2B",
      textColor: "#FFFFFF",
      accentColor: "#4A4A4A",
      icon: "D",
      description: "Shadowy blacks and deep urban accents for statement contrasts"
    },
    "Specialty Metallics": {
      color: "#9A9FA6",
      textColor: "#2C2C2C",
      accentColor: "#C3C6CC",
      icon: "M",
      description: "Architectural metallics crafted for premium highlights"
    },
  }; 

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')  // Replace & with 'and' first
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
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
          {families.map((family, index) => {
            const colors = colorsByFamily[family] || [];
            const familyInfo = familyData[family] || {
              color: "#E0E0E0",
              textColor: "#2C3E50",
              accentColor: "#B0B0B0",
              icon: "*",
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
                    onClick={() => navigate(`/colors/family/${slugify(family)}`)}
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
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedFamily(expandedFamily === family ? null : family);
                          }}
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











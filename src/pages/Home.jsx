import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SEO from '../components/SEO';
import EcoStats from '../components/EcoStats';
import GridMasonry from '../components/GridMasonry';
import ColorSlider from '../components/ColorSlider';

// Calyco Sacred Palette - 8 core colors
const CALYCO_PALETTE = [
  { name: "Grey Thunder", hex: "#4A5568", family: "Neutral", mood: "Sophisticated" },
  { name: "Grey Mist", hex: "#A0AEC0", family: "Neutral", mood: "Calm" },
  { name: "Barn Red", hex: "#C53030", family: "Warm", mood: "Energetic" },
  { name: "Lavender", hex: "#B794F4", family: "Cool", mood: "Serene" },
  { name: "Lilac", hex: "#D6BCFA", family: "Cool", mood: "Playful" },
  { name: "Linen", hex: "#F7FAFC", family: "Neutral", mood: "Clean" },
  { name: "Sage Green", hex: "#68D391", family: "Nature", mood: "Fresh" },
  { name: "Purple", hex: "#805AD5", family: "Cool", mood: "Bold" }
];

// Room categories
const ROOM_CATEGORIES = [
  { name: "Bedroom", image: "/Assets/Rooms/Bedroom/base.jpg", colors: ["Grey Mist", "Lavender", "Linen"] },
  { name: "Living Room", image: "/Assets/Rooms/LivingRoom/base.jpg", colors: ["Grey Thunder", "Sage Green", "Linen"] },
  { name: "Kitchen", image: "/Assets/Rooms/DiningRoom/base.jpg", colors: ["Barn Red", "Sage Green", "Linen"] },
  { name: "Bathroom", image: "/Assets/Rooms/Bedroom/base.jpg", colors: ["Lavender", "Lilac", "Linen"] },
  { name: "All Rooms", image: "/Assets/color-banner.png", colors: CALYCO_PALETTE.map(c => c.name) }
];

// Mood categories
const MOOD_CATEGORIES = [
  { name: "Calm", gradient: "from-blue-100 to-purple-100", colors: ["Grey Mist", "Lavender", "Linen"] },
  { name: "Energetic", gradient: "from-red-100 to-orange-100", colors: ["Barn Red", "Sage Green", "Purple"] },
  { name: "Cozy", gradient: "from-amber-100 to-brown-100", colors: ["Grey Thunder", "Linen", "Sage Green"] },
  { name: "Playful", gradient: "from-pink-100 to-purple-100", colors: ["Lilac", "Sage Green", "Purple"] }
];

// Curated palettes
const CURATED_PALETTES = [
  {
    name: "Serene Simplicity",
    description: "Minimalist elegance for modern spaces",
    colors: ["Linen", "Grey Mist", "Sage Green"],
    image: "/Assets/Inspiration/bedroom.jpg"
  },
  {
    name: "Playful Brights",
    description: "Vibrant energy for creative spaces",
    colors: ["Purple", "Lilac", "Sage Green"],
    image: "/Assets/Inspiration/living.jpg"
  },
  {
    name: "Warm Earth",
    description: "Natural warmth for cozy interiors",
    colors: ["Barn Red", "Grey Thunder", "Linen"],
    image: "/Assets/Inspiration/dining.jpg"
  }
];

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

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("color");
  const [selectedColor, setSelectedColor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  const openColorModal = (color) => {
    setSelectedColor(color);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeColorModal = () => {
    setIsModalOpen(false);
    setSelectedColor(null);
    document.body.style.overflow = "auto";
  };

  const ColorModal = () => (
    <AnimatePresence>
      {isModalOpen && selectedColor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeColorModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">{selectedColor.name}</h3>
                <button
                  onClick={closeColorModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Color Preview */}
              <div className="mb-6">
                <div
                  className="w-full h-48 rounded-xl mb-4 shadow-lg"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Hex Code</p>
                    <p className="font-mono text-lg font-semibold">{selectedColor.hex}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Family</p>
                    <p className="font-semibold">{selectedColor.family}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Mood</p>
                    <p className="font-semibold">{selectedColor.mood}</p>
                  </div>
                </div>
              </div>

              {/* Lifestyle Preview */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">See it in your space</h4>
                <div className="bg-gray-100 rounded-xl h-32 flex items-center justify-center">
                  <p className="text-gray-500">Lifestyle preview coming soon</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    closeColorModal();
                    navigate('/visualizer');
                  }}
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  Try in Visualizer
                </button>
                <button
                  disabled
                  className="flex-1 bg-gray-100 text-gray-400 py-3 px-6 rounded-xl font-semibold cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const insp = [
    '/Assets/Inspiration/IMG-20250718-WA0008.jpg',
    '/Assets/Inspiration/bedroom.jpg',
    '/Assets/Inspiration/living.jpg',
    '/Assets/Inspiration/IMG-20250718-WA0041.jpg',
    '/Assets/Inspiration/dining.jpg',
    '/Assets/Inspiration/IMG-20250718-WA0044.jpg',
  ];

  return (
    <div className="font-poppins bg-white min-h-screen">
      <SEO 
        title="Calyco Paints — Eco-premium paints"
        description="Eco-premium paints with low VOC and water-based formulations."
        ogType="website"
      />

      {/* Hero Section with Original ColorSlider */}
      <section className="relative overflow-hidden">
        <ColorSlider />
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="text-center text-white max-w-4xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-14 h-14 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <span className="text-base font-semibold bg-white/25 px-4 py-2 rounded-full backdrop-blur-md border border-white/30 shadow-lg">
                  🌱 Eco-Premium
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight drop-shadow-2xl">
                Discover the Calyco Sacred Palette
              </h1>
              <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed drop-shadow-lg max-w-3xl mx-auto">
                Eco-premium, safety-first shades for every room.
              </p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => document.getElementById('color-discovery').scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white text-purple-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 mx-auto text-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Explore Colors
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards - Below the Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a 
              href="/colors" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="h-48 rounded-2xl bg-[#F0C85A] text-[#342347] font-semibold flex items-center justify-center hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Colors
            </motion.a>
            <motion.a 
              href="/room-visualization" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="h-48 rounded-2xl bg-[#493657] text-white font-semibold flex items-center justify-center hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Visualizer
            </motion.a>
            <motion.a 
              href="/product" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="h-48 rounded-2xl bg-white border border-[#e5e0d8] text-[#342347] font-semibold flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Products
            </motion.a>
          </div>
        </div>
      </section>

      {/* Color Discovery Section - Lick.com Inspired */}
      <section id="color-discovery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Find Your Perfect Color
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three clear pathways to discover our curated collection. Choose your journey.
            </p>
          </motion.div>

          {/* Enhanced Tabs with Better Visual Design */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-50 rounded-2xl p-2 flex shadow-sm border border-gray-100">
              {[
                { id: "color", label: "Shop by Color", icon: "🎨" },
                { id: "room", label: "Shop by Room", icon: "🏠" },
                { id: "mood", label: "Shop by Mood", icon: "✨" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                    activeTab === tab.id
                      ? "bg-white text-purple-600 shadow-lg border border-purple-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Tab Content with Large Tappable Cards */}
          <AnimatePresence mode="wait">
            {activeTab === "color" && (
              <motion.div
                key="color"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {CALYCO_PALETTE.map((color, index) => (
                  <motion.div
                    key={color.name}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    onClick={() => openColorModal(color)}
                    className="group cursor-pointer"
                  >
                    <div className="relative">
                      <div
                        className="w-full aspect-square rounded-3xl shadow-lg mb-6 group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border-4 border-white"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{color.name}</h3>
                    <p className="text-sm text-gray-500 font-mono">{color.hex}</p>
                    <p className="text-xs text-gray-400 mt-1">{color.family} • {color.mood}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "room" && (
              <motion.div
                key="room"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {ROOM_CATEGORIES.map((room, index) => (
                  <motion.div
                    key={room.name}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 bg-white border border-gray-100">
                      <div className="aspect-[4/3] relative">
                        <img
                          src={room.image}
                          className="w-full h-full object-cover"
                          alt={room.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        
                        {/* Room Icon Overlay */}
                        <div className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                          {room.name === "Bedroom" && <span className="text-2xl">🛏️</span>}
                          {room.name === "Living Room" && <span className="text-2xl">🛋️</span>}
                          {room.name === "Kitchen" && <span className="text-2xl">🍳</span>}
                          {room.name === "Bathroom" && <span className="text-2xl">🚿</span>}
                          {room.name === "All Rooms" && <span className="text-2xl">🏠</span>}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{room.name}</h3>
                        <p className="text-gray-600 mb-4">Perfect colors for your {room.name.toLowerCase()}</p>
                        
                        {/* Color Swatches */}
                        <div className="flex gap-3 mb-4">
                          {room.colors.slice(0, 4).map((colorName, colorIndex) => {
                            const color = CALYCO_PALETTE.find(c => c.name === colorName);
                            return color ? (
                              <div
                                key={colorIndex}
                                className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              />
                            ) : null;
                          })}
                          {room.colors.length > 4 && (
                            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white shadow-md flex items-center justify-center">
                              <span className="text-xs text-gray-500 font-bold">+{room.colors.length - 4}</span>
                            </div>
                          )}
                        </div>
                        
                        <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors flex items-center gap-2">
                          Explore {room.name}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "mood" && (
              <motion.div
                key="mood"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {MOOD_CATEGORIES.map((mood, index) => (
                  <motion.div
                    key={mood.name}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className={`bg-gradient-to-br ${mood.gradient} rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border border-white/20`}>
                      {/* Mood Icon */}
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                        {mood.name === "Calm" && <span className="text-3xl">🧘</span>}
                        {mood.name === "Energetic" && <span className="text-3xl">⚡</span>}
                        {mood.name === "Cozy" && <span className="text-3xl">🕯️</span>}
                        {mood.name === "Playful" && <span className="text-3xl">🎈</span>}
                      </div>
                      
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{mood.name}</h3>
                      <p className="text-gray-700 mb-6 text-lg">Perfect for creating a {mood.name.toLowerCase()} atmosphere</p>
                      
                      {/* Color Swatches */}
                      <div className="flex gap-4 mb-6">
                        {mood.colors.map((colorName, colorIndex) => {
                          const color = CALYCO_PALETTE.find(c => c.name === colorName);
                          return color ? (
                            <div
                              key={colorIndex}
                              className="w-16 h-16 rounded-2xl shadow-lg border-2 border-white/50"
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            />
                          ) : null;
                        })}
                      </div>
                      
                      <button className="text-gray-900 font-semibold hover:text-gray-700 transition-colors flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                        Explore {mood.name} Mood
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Popular Colors Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Popular Colors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most-loved shades, ready to transform your space.
            </p>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {CALYCO_PALETTE.map((color, index) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div
                    className="w-full h-48"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{color.name}</h3>
                    <p className="text-gray-600 mb-4 font-mono">{color.hex}</p>
                    <button
                      onClick={() => openColorModal(color)}
                      className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                    >
                      See in Room
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Palettes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Curated Palettes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expertly crafted combinations for every style and space.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CURATED_PALETTES.map((palette, index) => (
              <motion.div
                key={palette.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="relative">
                    <img
                      src={palette.image}
                      className="w-full aspect-[4/3] object-cover"
                      alt={palette.name}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {palette.colors.map((colorName, colorIndex) => {
                        const color = CALYCO_PALETTE.find(c => c.name === colorName);
                        return color ? (
                          <div
                            key={colorIndex}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                            style={{ backgroundColor: color.hex }}
                          />
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{palette.name}</h3>
                    <p className="text-gray-600 mb-4">{palette.description}</p>
                    <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                      Explore Palette →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco Strip */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Low VOC", icon: "🌱" },
              { label: "Safe for Kids", icon: "👶" },
              { label: "Water-based", icon: "💧" },
              { label: "Warranty", icon: "🛡️" }
            ].map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200"
              >
                <span className="text-lg">{badge.icon}</span>
                <span className="font-medium text-gray-700">{badge.label}</span>
              </motion.div>
            ))}
          </div>
      </div>
      </section>

      {/* Eco Stats */}
      <EcoStats />

      {/* Inspiration Gallery */}
      <GridMasonry images={insp} />

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Quick answers to common questions about Calyco products and services
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              {
                question: "Are Calyco paints safe?",
                answer: "Yes, all paints are low-VOC and eco-certified. We prioritize family safety with every formulation."
              },
              {
                question: "Do you offer contractor pricing?",
                answer: "Yes, contact our bulk team for competitive rates and volume discounts on large projects."
              },
              {
                question: "How fast is delivery?",
                answer: "Standard 48 hours; site delivery available for bulk orders. Express delivery options for urgent projects."
              },
              {
                question: "Can I preview colors?",
                answer: "Yes, use our Room Visualizer tool or request physical samples. We also offer virtual consultations."
              },
              {
                question: "What's your warranty policy?",
                answer: "All Calyco paints come with comprehensive warranty coverage. Contact us for specific terms based on your project."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <span className={`text-purple-600 text-xl font-bold transform transition-transform duration-200 ${activeFAQ === index ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {activeFAQ === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to paint a better future?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/products')}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Explore Products
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Color Modal */}
      <ColorModal />
    </div>
  );
};

export default Home;



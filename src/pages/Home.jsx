import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SEO from '../components/SEO';

import GridMasonry from '../components/GridMasonry';
import WhyTrustUs from '../components/WhyTrustUs';
import CallToAction from '../components/CallToAction';

import ColorSlider from '../components/ColorSlider';
import PopularColorsSlider from '../components/PopularColorsSlider';
import ShopByColour from '../components/ShopByColour';
import HowItWorks from '../components/HowItWorks.tsx';
import ProductCategoriesSection from '../components/ProductCategoriesSection';


import { HeroSlider } from '../components/HomeComponents/HeroSlider';

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
      <section className="relative overflow-hidden pt-[19.5]">
        <ColorSlider />
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-start z-20">
          {/* Light overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="text-left text-white max-w-2xl ml-12 md:ml-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >


              <h1 className="text-3xl md:text-[2.75rem] font-bold mb-6 tracking-tight drop-shadow-lg" style={{ fontWeight: 700 }}>
                Introducing, Calyco
              </h1>
              <p className="text-lg md:text-xl text-white mb-8 leading-relaxed drop-shadow-md max-w-2xl font-light">
                Find your perfect shade, your perfect space, your perfect vibe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => document.getElementById('color-discovery').scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-white text-gray-900 rounded-lg font-normal hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base"
                >
                  Find out more
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  onClick={() => navigate('/products')}
                  className="px-6 py-3 border-2 border-white text-white rounded-lg font-normal hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base group"
                >
                  Shop Calyco
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

            {/* Popular Colours Section */}
      <PopularColorsSlider />

      {/* Shop by Room Gallery - Below the Hero Section */}
      <section className="py-8 bg-white">
        <div className="w-full px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[20px] font-bold text-[#354147] mb-4 text-left"
          >
            Shop by room
          </motion.h2>
          
          <div className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide max-w-full">
            {[
              { name: "Bedroom", image: "/Assets/InteriorInspiratoin/adjinad_A_room_with_an_overcast_atmosphere_in_a_warm_green_styl_c7f39523-e6ce-4432-a6e6-1c6f5e67cdf6.png", route: "/inspirations/bedroom" },
              { name: "Living Room", image: "/Assets/InteriorInspiratoin/living-room.png", route: "/inspirations/livingroom" },
              { name: "Office", image: "/Assets/InteriorInspiratoin/header-inspiration-office-b-mobile.jpg", route: "/inspirations/office" },
              { name: "Kitchen", image: "/Assets/InteriorInspiratoin/kitchen.png", route: "/inspirations/kitchen" },
              { name: "Bathroom", image: "/Assets/InteriorInspiratoin/header-inspiration-bathroom-c-mobile.jpg", route: "/inspirations/bathroom" },
              { name: "All Rooms", image: "/Assets/InteriorInspiratoin/header-inspiration-bedroom-b-mobile.jpg", route: "/inspirations" }
            ].map((room, index) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex-shrink-0 w-[280px] group cursor-pointer"
                onClick={() => navigate(room.route)}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="aspect-square relative">
                    <img
                      src={room.image}
                      className="w-full h-full object-cover"
                      alt={room.name}
                      width="1201"
                      height="1201"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-[16px] font-normal text-[#354147]">{room.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ShopByColour />
      <HowItWorks />

            {/* Product Categories Section */}
      <ProductCategoriesSection />

      {/* Popular Colors Carousel */}









      {/* Inspiration Gallery */}
      <GridMasonry images={insp} />

      {/* Why Trust Us Section */}
      <WhyTrustUs />

      {/* FAQ Section */}
      <section className="py-20 bg-[#1A1C24]">
        <div className="w-full px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Calyco
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full space-y-0"
          >
            {[
              {
                question: "What is Calyco Paints?",
                answer: "Calyco Paints is an eco-premium paint and coatings company that blends modern lifestyle design with sustainability. We offer low-VOC, water-based, safe-for-family paints and industrial-grade coatings for contractors, developers, and government projects."
              },
              {
                question: "How is Calyco different from other paint brands?",
                answer: "Unlike traditional dealer-driven paint companies, Calyco is online-first, delivering paints directly to homes, projects, and government buyers. We combine luxury lifestyle appeal (like Asian Paints), minimal modern UI (like Birla Opus), and eco-premium positioning (like Lick Paint) with a special focus on contractors and government compliance."
              },
              {
                question: "Are Calyco paints safe for children and pets?",
                answer: "Yes. All our paints are low-VOC, odor-free, and non-toxic, making them safe for indoor spaces where families live, sleep, and play."
              },
              {
                question: "What does low-VOC mean?",
                answer: "VOC (Volatile Organic Compounds) are chemicals that evaporate into the air and harm indoor air quality. Our low-VOC paints reduce exposure, improving health and environmental safety."
              },
              {
                question: "What surfaces can Calyco paints be used on?",
                answer: "Our range covers interior walls, exterior walls, wood, metal, concrete, asphalt, roofing, and specialty industrial surfaces."
              },
              {
                question: "Are your paints waterproof and weather-resistant?",
                answer: "Yes. We offer waterproof coatings, anti-fungal interior paints, heat-reflective roof coatings, and long-lasting exterior emulsions designed for Indian weather conditions."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full py-6 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <span className="text-lg font-bold text-white">{faq.question}</span>
                  <span className={`text-white text-xl font-bold transform transition-transform duration-300 ${activeFAQ === index ? 'rotate-45' : ''}`}>
                    {activeFAQ === index ? '×' : '+'}
                  </span>
                </button>
                <AnimatePresence>
                {activeFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-4">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                    </motion.div>
                )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* See All FAQs Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <button
                onClick={() => window.location.href = '/faq'}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1A1C24] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                See All FAQs
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>



            {/* Call to Action */}
      <CallToAction />

      {/* Color Modal */}
      <ColorModal />
    </div>
  );
};

export default Home;



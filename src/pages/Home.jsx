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
import NavigationArrows from '../components/NavigationArrows';



import { HeroSlider } from '../components/HomeComponents/HeroSlider';

// Calyco Color Palette - 8 core colors
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
  const [showAllFAQs, setShowAllFAQs] = useState(false);
  const [roomIndex, setRoomIndex] = useState(0);
  const [visibleRooms, setVisibleRooms] = useState(4);
  const [inspirationIndex, setInspirationIndex] = useState(0);

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

  // Room data for Shop by Room section
  const roomData = [
    { name: "Living Room", image: "/Assets/u7336851251_the_design_of_a_modern_psychological_officesubdued__c333b72d-13cb-4c09-8ef5-00f2e7aff4c9.png", route: "/inspirations/livingroom" },
    { name: "Bedroom", image: "/Assets/ixacurtains_A_beautiful_bedroom_with_light_blue_walls_a_vintage_357585fa-b55a-406b-935f-805bfe23eff7.png", route: "/inspirations/bedroom" },
    { name: "Dining Room", image: "/Assets/u1147136281_imagine_realistic_photo_taken_of_an_empty_horizonta_129fd89e-9956-4324-bb58-f5814ef8737c.png", route: "/inspirations/dining" },
    { name: "Bathroom", image: "/Assets/InteriorInspiratoin/header-inspiration-bathroom-c-mobile.jpg", route: "/inspirations/bathroom" },
    { name: "Hallway", image: "/Assets/InteriorInspiratoin/living-room.png", route: "/inspirations/hallway" },
    { name: "Kitchen", image: "/Assets/yellowstone5477_editorial_style_photo_dark_blue_kitchen_cabinet_ac53ae07-8832-42d4-bc89-91de80d0c940.png", route: "/inspirations/kitchen" }
  ];

  const visibleInspirations = 6; // Number of inspiration items visible at once
  const roomCardWidth = 280; // Width of each room card
  const roomGap = 16; // Gap between room cards (gap-4 = 16px)
  const roomSlideDistance = roomCardWidth + roomGap;

  // Determine how many room cards fit per viewport
  React.useEffect(() => {
    const computeVisibleRooms = () => {
      const w = window.innerWidth;
      if (w < 640) return 1; // sm- (mobile)
      if (w < 1024) return 2; // md (tablet)
      if (w < 1280) return 3; // lg (small desktop)
      return 4; // xl+ (large desktop - show 4 out of 6 cards)
    };
    const apply = () => {
      const v = computeVisibleRooms();
      setVisibleRooms(v);
      setRoomIndex((prev) => Math.min(prev, Math.max(0, roomData.length - v)));
    };
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  const nextRoom = () => {
    setRoomIndex(prev => 
      prev >= roomData.length - visibleRooms ? 0 : prev + 1
    );
  };

  const prevRoom = () => {
    setRoomIndex(prev => 
      prev <= 0 ? roomData.length - visibleRooms : prev - 1
    );
  };

  const nextInspiration = () => {
    setInspirationIndex(prev => 
      prev >= galleryImages.length - visibleInspirations ? 0 : prev + 1
    );
  };

  const prevInspiration = () => {
    setInspirationIndex(prev => 
      prev <= 0 ? galleryImages.length - visibleInspirations : prev - 1
    );
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
    '/Assets/aekartdir_A_high-quality_ultra-wide_long_shot_photograph_taken__0d5534e1-a72e-4839-8b37-f99d91422e3c.png',
    '/Assets/bulendi_Frame_mockup_with_white_inside_hanging_on_wall_around_m_50856212-3b35-4550-8a87-7443af3cf317.png',
    '/Assets/sorbey._A_wide-shot_of_an_elegant_dining_room_featuring_a_woode_939e60b7-773c-49ed-b028-27b75f2fa5d1.png',
    '/Assets/marketinghbh_Bright_modern_bathroom_warm_minimalism_strong_domi_9a9eafd9-1ec8-4df7-866a-122067cd26b3.png',
    '/Assets/atmacro_front_view_of_a_bright_professionally_studio_photo_fron_96a27c95-879a-454e-810d-18ae1bcc4b33.png',
    '/Assets/jonestown___a_head_on_front_facing_view_of_a_computer_monitor_o_8ce9e327-7643-4fe4-8216-dfd87bf574cd.png',
    '/Assets/dudarte_A_cozy_living_room_with_fireplace_and_large_window_with_a2a959ab-0338-4553-87a0-f68ce48befa8.png',
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
      </section>

            {/* Popular Colours Section */}
      <PopularColorsSlider />

      {/* Shop by Room Gallery - Below the Hero Section */}
      <section className="py-8 bg-white">
        <div className="w-full px-4">
          <div className="flex items-center justify-between mb-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[20px] font-bold text-[#354147]"
            >
              Shop by room
            </motion.h2>
            
            {/* Navigation Arrows - Show on all screen sizes when cards don't fit */}
            {(roomData.length > visibleRooms) && (
              <NavigationArrows
                onPrevious={prevRoom}
                onNext={nextRoom}
                showPrevious={roomIndex > 0}
                showNext={roomIndex < roomData.length - visibleRooms}
                size="md"
              />
            )}
          </div>
          
          <div className="relative overflow-hidden">
            <div className={`flex gap-4 transition-transform duration-500 ease-out`}
                 style={{ transform: roomData.length > visibleRooms ? `translateX(-${roomIndex * roomSlideDistance}px)` : undefined }}>
              {roomData.map((room, index) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex-shrink-0 w-[280px] group cursor-pointer"
                onClick={() => navigate(room.route)}
              >
                <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 transform">
                  <div className="aspect-square relative rounded-t-lg overflow-hidden">
                    <img
                      src={room.image}
                      className="w-full h-full object-cover"
                      alt={room.name}
                      width="1201"
                      height="1201"
                    />
                  </div>
                  <div className="p-3 text-center rounded-b-lg">
                    <h3 className="text-[16px] font-normal text-[#354147]">{room.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <ShopByColour />
      <HowItWorks />

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
            ].slice(0, showAllFAQs ? undefined : 5).map((faq, index) => (
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
                onClick={() => setShowAllFAQs(!showAllFAQs)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1A1C24] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                {showAllFAQs ? 'Show Less FAQs' : 'See All FAQs'}
                <svg className={`w-5 h-5 transform transition-transform duration-300 ${showAllFAQs ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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



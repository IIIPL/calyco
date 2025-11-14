import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiMiniStar } from 'react-icons/hi2';
import SEO from '../components/SEO';

import GridMasonry from '../components/GridMasonry';
import CallToAction from '../components/CallToAction';

import StaticHero from '../components/StaticHero';
import ColorSlider from '../components/ColorSlider';
import PopularColorsSlider from '../components/PopularColorsSlider';
import ShopByColour from '../components/ShopByColour';
import NavigationArrows from '../components/NavigationArrows';
import TrustBar from '../components/HomeComponents/TrustBar';
import PaintingServices from '../components/HomeComponents/PaintingServices';
import PremiumTextureSplit from '../components/HomeComponents/PremiumTextureSplit';
import MarqueeStrip from '../components/HomeComponents/MarqueeStrip';
import TextureShowcase from '../components/HomeComponents/TextureShowcase';
import WhyCalycoShowcase from '../components/HomeComponents/WhyCalycoShowcase';
import BudgetCalculatorCTA from '../components/HomeComponents/BudgetCalculatorCTA';
import SiteInspectionCTA from '../components/HomeComponents/SiteInspectionCTA';
import ProductShowcase from '../components/HomeComponents/ProductShowcase';
import FeatureCards from '../components/HomeComponents/FeatureCards';


const Home = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomIndex, setRoomIndex] = useState(0);
  const [visibleRooms, setVisibleRooms] = useState(4);

  const closeColorModal = () => {
    setIsModalOpen(false);
    setSelectedColor(null);
    document.body.style.overflow = "auto";
  };

  // Room data for Shop by Room section
  const roomData = [
    { name: "Living Room", image: "/Assets/u7336851251_the_design_of_a_modern_psychological_officesubdued__c333b72d-13cb-4c09-8ef5-00f2e7aff4c9.webp", route: "/inspirations/livingroom" },
    { name: "Bedroom", image: "/Assets/ixacurtains_A_beautiful_bedroom_with_light_blue_walls_a_vintage_357585fa-b55a-406b-935f-805bfe23eff7.webp", route: "/inspirations/bedroom" },
    { name: "Dining Room", image: "/Assets/u1147136281_imagine_realistic_photo_taken_of_an_empty_horizonta_129fd89e-9956-4324-bb58-f5814ef8737c.webp", route: "/inspirations/dining" },
    { name: "Bathroom", image: "/Assets/InteriorInspiratoin/header-inspiration-bathroom-c-mobile.webp", route: "/inspirations/bathroom" },
    { name: "Hallway", image: "/Assets/InteriorInspiratoin/living-room.webp", route: "/inspirations/hallway" },
    { name: "Kitchen", image: "/Assets/yellowstone5477_editorial_style_photo_dark_blue_kitchen_cabinet_ac53ae07-8832-42d4-bc89-91de80d0c940.webp", route: "/inspirations/kitchen" }
  ];

  const testimonials = [
    {
      name: "Rajesh M.",
      location: "Dwarka, Delhi",
      initials: "RM",
      quote: "Finally, a paint service that doesn't harass you with calls. Got my 3 BHK painted for 20% less than Asian Paints quote. Quality is excellent!"
    },
    {
      name: "Priya S.",
      location: "Gurgaon",
      initials: "PS",
      quote: "WhatsApp-only communication was a relief. No pressure sales tactics. Team was professional and finished on time. Highly recommend!"
    },
    {
      name: "Amit K.",
      location: "Noida",
      initials: "AK",
      quote: "Saved ₹15,000 on my villa painting. NTPC-approved quality claim is real. Same paint used in government projects. Worth every rupee!"
    }
  ];

  const visibleInspirations = 6;
  const roomCardWidth = 280;
  const roomGap = 16;
  const roomSlideDistance = roomCardWidth + roomGap;

  // Determine how many room cards fit per viewport
  React.useEffect(() => {
    const computeVisibleRooms = () => {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 1024) return 2;
      if (w < 1280) return 3;
      return 4;
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

            <div className="p-6">
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

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">See it in your space</h4>
                <div className="bg-gray-100 rounded-xl h-32 flex items-center justify-center">
                  <p className="text-gray-500">Lifestyle preview coming soon</p>
                </div>
              </div>

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
    '/Assets/aekartdir_A_high-quality_ultra-wide_long_shot_photograph_taken__0d5534e1-a72e-4839-8b37-f99d91422e3c.webp',
    '/Assets/bulendi_Frame_mockup_with_white_inside_hanging_on_wall_around_m_50856212-3b35-4550-8a87-7443af3cf317.webp',
    '/Assets/sorbey._A_wide-shot_of_an_elegant_dining_room_featuring_a_woode_939e60b7-773c-49ed-b028-27b75f2fa5d1.webp',
    '/Assets/marketinghbh_Bright_modern_bathroom_warm_minimalism_strong_domi_9a9eafd9-1ec8-4df7-866a-122067cd26b3.webp',
    '/Assets/atmacro_front_view_of_a_bright_professionally_studio_photo_fron_96a27c95-879a-454e-810d-18ae1bcc4b33.webp',
    '/Assets/jonestown___a_head_on_front_facing_view_of_a_computer_monitor_o_8ce9e327-7643-4fe4-8216-dfd87bf574cd.webp',
    '/Assets/dudarte_A_cozy_living_room_with_fireplace_and_large_window_with_a2a959ab-0338-4553-87a0-f68ce48befa8.webp',
  ];

  return (
    <div className="font-poppins bg-white min-h-screen">
      <SEO 
        title="Calyco Paints - Eco-premium paints"
        description="Eco-premium paints with low VOC and water-based formulations."
        ogType="website"
      />

      {/* Static Hero Section */}
      <StaticHero />

      {/* Hero Section with Original ColorSlider */}
      {/* <section className="relative overflow-hidden">
        <ColorSlider />
      </section> */}

      {/* Professional Painting Services Section */}
      <PaintingServices />

      {/* Marquee Strip */}
      <MarqueeStrip />

      {/* Quality You Can Trust Section */}
      <section className="relative w-full h-[85vh] sm:h-[75vh] md:h-[80vh] lg:h-[83vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Assets/Texture Images/tex2.webp"
            alt="Living room showcasing premium textured wall finish"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 flex items-start sm:items-center pt-16 sm:pt-0">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-xl md:max-w-2xl"
            >
              <div className="backdrop-blur-md bg-white/70 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/30">
                <div className="space-y-5 text-left">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4B007D]/10 text-[#4B007D] text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>Our Promise to You</span>
                  </span>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1A16] leading-tight">
                    Quality You Can Trust, <span className="text-[#998850]">Colors You'll Love</span>
                  </h2>

                  <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed max-w-xl">
                    Quality paints without the markup. We craft in-house and deliver pro-grade finishes straight to you.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Texture Showcase Slider */}
      <TextureShowcase />

      {/* Trust Bar - Key Value Props */}
      <TrustBar />

      {/* Premium Texture Split Section */}
      <PremiumTextureSplit />

      {/* Budget Calculator CTA */}
      <BudgetCalculatorCTA />

      {/* Popular Colours Section */}
      <PopularColorsSlider />

      {/* Shop by Room Gallery */}
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

      {/* Feature Cards Section */}
      <FeatureCards />

      {/* Site Inspection CTA */}
      <SiteInspectionCTA />

      {/* Why Calyco Showcase */}
      <WhyCalycoShowcase />

      {/* Product Showcase Section */}
      <ProductShowcase />

      {/* Inspiration Gallery */}
      <GridMasonry images={insp} />

      {/* What Our Customers Say Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F9F6FF] via-white to-[#F6F4FF]" />
        <div className="absolute -top-32 left-1/3 w-[38rem] h-[38rem] -translate-y-1/2 rounded-full bg-[#432452]/12 blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[26rem] h-[26rem] translate-x-1/3 rounded-full bg-[#998850]/20 blur-[220px]" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-[30px] sm:text-[36px] md:text-[44px] font-bold tracking-tight text-[#0F1221]">
              What Our <span className="text-[#432452]">Customers Say</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-[#0F1221]/70 leading-relaxed max-w-2xl mx-auto">
              Join 100+ satisfied homeowners across NCR who trust CALYCO for designer finishes, thoughtful service, and long-lasting protection.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:gap-8 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl border border-white/70 shadow-[0_25px_60px_-32px_rgba(15,18,33,0.4)] hover:-translate-y-1 hover:shadow-[0_28px_70px_-28px_rgba(67,37,82,0.5)] transition-all duration-300"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#432452] via-[#998850] to-[#432452] opacity-70" />
                <div className="p-6 sm:p-8 flex flex-col h-full">
                  <div className="flex items-center gap-1 text-[#998850] mb-5">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <HiMiniStar key={star} className="h-4 w-4 sm:h-5 sm:w-5" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-[#0F1221]/80 leading-relaxed flex-1">
                    “{item.quote}”
                  </p>
                  <div className="mt-6 pt-6 border-t border-[#0F1221]/10 flex items-center gap-3">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#432452] text-sm sm:text-base font-semibold text-white">
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-[#0F1221]">{item.name}</p>
                      <p className="text-xs sm:text-sm text-[#0F1221]/60">{item.location}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
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

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
import TrustBar from '../components/HomeComponents/TrustBar';
import PaintingServices from '../components/HomeComponents/PaintingServices';


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
    { name: "Living Room", image: "/Assets/u7336851251_the_design_of_a_modern_psychological_officesubdued__c333b72d-13cb-4c09-8ef5-00f2e7aff4c9.png", route: "/inspirations/livingroom" },
    { name: "Bedroom", image: "/Assets/ixacurtains_A_beautiful_bedroom_with_light_blue_walls_a_vintage_357585fa-b55a-406b-935f-805bfe23eff7.png", route: "/inspirations/bedroom" },
    { name: "Dining Room", image: "/Assets/u1147136281_imagine_realistic_photo_taken_of_an_empty_horizonta_129fd89e-9956-4324-bb58-f5814ef8737c.png", route: "/inspirations/dining" },
    { name: "Bathroom", image: "/Assets/InteriorInspiratoin/header-inspiration-bathroom-c-mobile.jpg", route: "/inspirations/bathroom" },
    { name: "Hallway", image: "/Assets/InteriorInspiratoin/living-room.png", route: "/inspirations/hallway" },
    { name: "Kitchen", image: "/Assets/yellowstone5477_editorial_style_photo_dark_blue_kitchen_cabinet_ac53ae07-8832-42d4-bc89-91de80d0c940.png", route: "/inspirations/kitchen" }
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
        title="Calyco Paints - Eco-premium paints"
        description="Eco-premium paints with low VOC and water-based formulations."
        ogType="website"
      />

      {/* Hero Section with Original ColorSlider */}
      <section className="relative overflow-hidden">
        <ColorSlider />
      </section>

      {/* Professional Painting Services Section */}
      <PaintingServices />

      {/* Quality You Can Trust Section */}
      <section className="relative bg-gradient-to-br from-[#F6F3EE] to-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4B007D]/5 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#4B007D]/10 text-[#4B007D] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Our Promise to You</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1221] mb-6 leading-tight">
              Quality You Can Trust, <span className="text-[#4B007D]">Colors You'll Love</span>
            </h2>

            <p className="text-lg md:text-xl text-[#0F1221]/70 leading-relaxed">
              We believe premium quality shouldn't come with a premium price tag. That's why we manufacture in-house,
              cut out middlemen, and deliver professional-grade paints directly to your doorstep.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar - Key Value Props */}
      <TrustBar />

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
      <HowItWorks />

      {/* Inspiration Gallery */}
      <GridMasonry images={insp} />

      {/* Why Trust Us Section */}
      <WhyTrustUs />

      {/* What Our Customers Say Section */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[28px] sm:text-[32px] font-bold text-[#0F1221] md:text-[40px] lg:text-[48px] leading-tight tracking-[-0.01em]">
              What Our <span className="text-[#4B007D]">Customers Say</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#0F1221]/70 leading-relaxed max-w-2xl mx-auto">
              Join 100+ satisfied homeowners in Delhi NCR who trust CALYCO for premium paint solutions.
            </p>
          </div>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-[24px] border border-[#0F1221]/10 bg-[#FBF9F6] p-6 sm:p-8 shadow-[0_8px_32px_rgba(15,18,33,0.06)] hover:shadow-[0_16px_64px_rgba(75,0,125,0.12)] transition-all duration-300"
            >
              <div className="mb-5 sm:mb-6 flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm sm:text-base text-[#0F1221]/80 leading-relaxed mb-5 sm:mb-6">
                "Finally, a paint service that doesn't harass you with calls. Got my 3 BHK painted for 20% less than Asian Paints quote. Quality is excellent!"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#4B007D] text-sm sm:text-base font-semibold text-white">
                  RM
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-[#0F1221]">Rajesh M.</p>
                  <p className="text-xs sm:text-sm text-[#0F1221]/60">Dwarka, Delhi</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-[24px] border border-[#0F1221]/10 bg-[#FBF9F6] p-6 sm:p-8 shadow-[0_8px_32px_rgba(15,18,33,0.06)] hover:shadow-[0_16px_64px_rgba(75,0,125,0.12)] transition-all duration-300"
            >
              <div className="mb-5 sm:mb-6 flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm sm:text-base text-[#0F1221]/80 leading-relaxed mb-5 sm:mb-6">
                "WhatsApp-only communication was a relief. No pressure sales tactics. Team was professional and finished on time. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#4B007D] text-sm sm:text-base font-semibold text-white">
                  PS
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-[#0F1221]">Priya S.</p>
                  <p className="text-xs sm:text-sm text-[#0F1221]/60">Gurgaon</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-[24px] border border-[#0F1221]/10 bg-[#FBF9F6] p-6 sm:p-8 shadow-[0_8px_32px_rgba(15,18,33,0.06)] hover:shadow-[0_16px_64px_rgba(75,0,125,0.12)] transition-all duration-300"
            >
              <div className="mb-5 sm:mb-6 flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm sm:text-base text-[#0F1221]/80 leading-relaxed mb-5 sm:mb-6">
                "Saved ₹15,000 on my villa painting. NTPC-approved quality claim is real. Same paint used in government projects. Worth every rupee!"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#4B007D] text-sm sm:text-base font-semibold text-white">
                  AK
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-[#0F1221]">Amit K.</p>
                  <p className="text-xs sm:text-sm text-[#0F1221]/60">Noida</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 rounded-[24px] border border-[#0F1221]/10 bg-[#F6F3EE] p-6 sm:p-8 md:p-10"
          >
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4B007D]" style={{ fontFeatureSettings: '"tnum"' }}>
                4.9/5
              </p>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-[#0F1221]/70">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4B007D]" style={{ fontFeatureSettings: '"tnum"' }}>
                100+
              </p>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-[#0F1221]/70">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4B007D]" style={{ fontFeatureSettings: '"tnum"' }}>
                ₹12L+
              </p>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-[#0F1221]/70">Total Savings</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Calyco Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-[#F6F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#4B007D]/10 text-[#4B007D] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Our Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1221] mb-6 leading-tight">
              About <span className="text-[#4B007D]">Calyco Paints</span>
            </h2>
            <p className="text-lg md:text-xl text-[#0F1221]/70 leading-relaxed max-w-3xl mx-auto">
              India's #2 paint brand with 30 years of manufacturing excellence, delivering premium quality at unbeatable value.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#0F1221] mb-6">
                Premium Eco-Friendly Paints for Modern Living
              </h3>
              <p className="text-[#0F1221]/70 leading-relaxed mb-4">
                Calyco Paints is an eco-premium paint and coatings company that blends modern lifestyle design with sustainability.
                We manufacture low-VOC, water-based, safe-for-family paints that don't compromise on quality or durability.
              </p>
              <p className="text-[#0F1221]/70 leading-relaxed">
                As India's #2 paint brand, we're trusted by thousands of homeowners, contractors, and government projects.
                Our in-house manufacturing allows us to deliver the same quality as premium brands at 20% lower cost.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-[#0F1221]/10"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4B007D] to-[#6b2da8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F1221] mb-1">Low-VOC & Eco-Friendly</h4>
                    <p className="text-sm text-[#0F1221]/70">Safe for your family and the environment</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4B007D] to-[#6b2da8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F1221] mb-1">Versatile Application</h4>
                    <p className="text-sm text-[#0F1221]/70">Interior, exterior, wood, metal, and specialty surfaces</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4B007D] to-[#6b2da8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F1221] mb-1">Weather-Resistant Formula</h4>
                    <p className="text-sm text-[#0F1221]/70">Waterproof, anti-fungal, heat-reflective coatings</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4B007D] to-[#6b2da8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F1221] mb-1">Direct-to-Customer</h4>
                    <p className="text-sm text-[#0F1221]/70">Online-first model with no middlemen markup</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#0F1221] mb-8">Why Choose Calyco?</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#0F1221]/10">
                <div className="text-4xl font-bold text-[#4B007D] mb-2">30+</div>
                <p className="text-[#0F1221]/70 font-medium">Years of Excellence</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#0F1221]/10">
                <div className="text-4xl font-bold text-[#4B007D] mb-2">#2</div>
                <p className="text-[#0F1221]/70 font-medium">Paint Brand in India</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#0F1221]/10">
                <div className="text-4xl font-bold text-[#4B007D] mb-2">10K+</div>
                <p className="text-[#0F1221]/70 font-medium">Projects Completed</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#0F1221]/10">
                <div className="text-4xl font-bold text-[#4B007D] mb-2">20%</div>
                <p className="text-[#0F1221]/70 font-medium">More Affordable</p>
              </div>
            </div>
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
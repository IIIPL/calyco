import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiMiniStar } from 'react-icons/hi2';
import SEO from '../components/SEO';

import GridMasonry from '../components/GridMasonry';
import CallToAction from '../components/CallToAction';

import StaticHero from '../components/StaticHero';
import BenefitsSection from '../components/HomeComponents/BenefitsSection';
import WhoWeWorkWith from '../components/HomeComponents/WhoWeWorkWith';
import TheSpecsThatMatter from '../components/HomeComponents/TheSpecsThatMatter';
import ColorSlider from '../components/ColorSlider';
import PopularColorsSlider from '../components/PopularColorsSlider';
import ShopByColour from '../components/ShopByColour';
import NavigationArrows from '../components/NavigationArrows';


import PremiumInquiryForm from '../components/HomeComponents/PremiumInquiryForm';
import MarqueeStrip from '../components/HomeComponents/MarqueeStrip';
import WhyCalycoShowcase from '../components/HomeComponents/WhyCalycoShowcase';
import BudgetCalculatorCTA from '../components/HomeComponents/BudgetCalculatorCTA';
import SiteInspectionCTA from '../components/HomeComponents/SiteInspectionCTA';


import ProfessionalResources from '../components/HomeComponents/ProfessionalResources';
import TestimonialsCarousel from '../components/HomeComponents/TestimonialsCarousel';


const Home = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomIndex, setRoomIndex] = useState(0);
  const [visibleRooms, setVisibleRooms] = useState(4);
  const [isRoomDragging, setIsRoomDragging] = useState(false);

  const closeColorModal = () => {
    setIsModalOpen(false);
    setSelectedColor(null);
    document.body.style.overflow = "auto";
  };

  // Application data for Browse by Application section
  const applicationData = [
    {
      name: "Multi-Unit Residential",
      desc: "Consistent interior finishes across units. Bulk supply keeps handover on schedule.",
      image: "/Assets/Rooms/LivingRoom/base.webp", // Using Living Room base image as placeholder
      route: "/inspirations/residential"
    },
    {
      name: "Commercial & Office",
      desc: "Low-odour, washable coatings for occupied environments.",
      image: "/Assets/u7336851251_the_design_of_a_modern_psychological_officesubdued__c333b72d-13cb-4c09-8ef5-00f2e7aff4c9.webp", // Office image
      route: "/inspirations/commercial"
    },
    {
      name: "Hospitality & Hotels",
      desc: "Feature-wall textures and durable corridor finishes that handle constant traffic.",
      image: "/Assets/u1147136281_imagine_realistic_photo_taken_of_an_empty_horizonta_129fd89e-9956-4324-bb58-f5814ef8737c.webp", // Dining/Hospitality image
      route: "/inspirations/hospitality"
    },
    {
      name: "Healthcare & Education",
      desc: "Anti-microbial, anti-fungal formulations that support hygiene standards.",
      image: "/Assets/InteriorInspiratoin/living-room.webp", // Hallway/Clean space image
      route: "/inspirations/healthcare"
    },
    {
      name: "Exterior & Weatherproofing",
      desc: "Weather-resistant coatings and sealant systems for facades and exposed surfaces.",
      image: "/Assets/ixacurtains_A_beautiful_bedroom_with_light_blue_walls_a_vintage_357585fa-b55a-406b-935f-805bfe23eff7.webp", // Placeholder (Bedroom has good light, acting as placeholder for now)
      route: "/inspirations/exterior"
    }
  ];



  const visibleInspirations = 6;
  const cardWidth = 320; // Increased width for better text readability
  const gap = 24;
  const slideDistance = cardWidth + gap;

  // Determine how many cards fit per viewport
  React.useEffect(() => {
    const computeVisibleCards = () => {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 1024) return 2;
      if (w < 1280) return 3;
      return 3; // Cap at 3 for better readability of descriptions
    };
    const apply = () => {
      const v = computeVisibleCards();
      setVisibleRooms(v); // Reusing state variable
      setRoomIndex((prev) => Math.min(prev, Math.max(0, applicationData.length - v)));
    };
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  const nextApp = () => {
    setRoomIndex(prev =>
      prev >= applicationData.length - visibleRooms ? 0 : prev + 1
    );
  };

  const prevApp = () => {
    setRoomIndex(prev =>
      prev <= 0 ? applicationData.length - visibleRooms : prev - 1
    );
  };

  const handleAppDragEnd = (event, info) => {
    const threshold = 50;

    if (info.offset.x > threshold && roomIndex > 0) {
      prevApp();
    } else if (info.offset.x < -threshold && roomIndex < applicationData.length - visibleRooms) {
      nextApp();
    }

    setIsRoomDragging(false);
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

  return (
    <div className="font-poppins bg-white min-h-screen">
      <SEO
        title="Calyco Paints | 15–20% Below National Brands | Commercial Coatings Direct to Your Project"
        description="Same acrylic chemistry, 15–20% less. Low-VOC interior, exterior, textured coatings for architects, developers & contractors. 10–12 m²/L coverage. 8-year warranty. Dedicated account management. Request a quote."
        keywords="calyco paints, commercial coatings, specification-grade paint, low-voc paint, interior emulsion, exterior emulsion, waterproofing coatings, direct to project, professional paint supplier, architect paint, contractor paint, developer paint, india paint manufacturer"
        ogType="website"
      />

      {/* Static Hero Section */}
      <StaticHero />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Who We Work With Section */}
      <WhoWeWorkWith />

      {/* The Specs That Matter Section */}
      <TheSpecsThatMatter />

      {/* Premium Inquiry Form */}
      <PremiumInquiryForm />

      {/* Popular Shades Section */}
      <PopularColorsSlider />

      {/* Browse by Application Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="w-full px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[#998850] font-bold tracking-[0.2em] uppercase text-sm block mb-2"
              >
                Project Types
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-[#0F1221]"
              >
                Explore by Application
              </motion.h2>
            </div>

            <div className="flex gap-4">
              <NavigationArrows
                onPrevious={prevApp}
                onNext={nextApp}
                showPrevious={roomIndex > 0}
                showNext={roomIndex < applicationData.length - visibleRooms}
                size="md"
              />
            </div>
          </div>

          <div className="relative overflow-hidden -mx-4 px-4 py-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
            <motion.div
              className="flex gap-6"
              animate={{
                x: -roomIndex * slideDistance
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              drag="x"
              dragConstraints={{
                left: -(applicationData.length - visibleRooms) * slideDistance,
                right: 0
              }}
              dragElastic={0.1}
              onDragStart={() => setIsRoomDragging(true)}
              onDragEnd={handleAppDragEnd}
            >
              {applicationData.map((app, index) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-[320px] group cursor-pointer"
                  onClick={() => !isRoomDragging && navigate(app.route)}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={app.image}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={app.name}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{app.name}</h3>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                      <p className="text-[#0F1221]/70 text-sm leading-relaxed mb-4">
                        {app.desc}
                      </p>
                      <span className="text-[#998850] text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Solutions <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Designer Palettes Section */}
      <ShopByColour />

      {/* Site Inspection CTA */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16 py-10">
        <SiteInspectionCTA />
      </div>

      {/* Why Calyco Showcase */}
      <WhyCalycoShowcase />

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Professional Resources Section */}
      <ProfessionalResources />

      {/* Call to Action */}
      <CallToAction />

      {/* Color Modal */}
      <ColorModal />
    </div>
  );
};

export default Home;

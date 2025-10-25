import React, { useMemo, useState } from 'react';
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
  const [homeSize, setHomeSize] = useState('2bhk');
  const [activeTab, setActiveTab] = useState("color");
  const [selectedColor, setSelectedColor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showAllFAQs, setShowAllFAQs] = useState(false);
  const [roomIndex, setRoomIndex] = useState(0);
  const [visibleRooms, setVisibleRooms] = useState(4);
  const [inspirationIndex, setInspirationIndex] = useState(0);
  
  const savingsMap = {
    '1bhk': {
      label: '1 BHK (500–700 sq ft)',
      asian: 21000,
      calyco: 16800,
      savings: 4200,
    },
    '2bhk': {
      label: '2 BHK (800–1000 sq ft)',
      asian: 32400,
      calyco: 25920,
      savings: 6480,
    },
    '3bhk': {
      label: '3 BHK (1100–1300 sq ft)',
      asian: 45000,
      calyco: 36000,
      savings: 9000,
    },
    '4bhk': {
      label: '4 BHK / Villa (1500+ sq ft)',
      asian: 64000,
      calyco: 51200,
      savings: 12800,
    },
  };
  
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }),
    []
  );
  
  const currentSavings = savingsMap[homeSize];

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

      {/* High-conversion Landing Hero */}
      <section className="relative bg-[#F6F3EE]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4B007D0F] to-[#4B007D05] pointer-events-none" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#FBF9F6] border border-[#0F1221]/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.25em] text-[#4B007D]">
                Launch Offer — First 100 Customers
              </span>
              <h1 className="mt-6 text-[#0F1221] text-[40px] leading-[1.05] tracking-[-0.01em] font-bold md:text-[56px]">
                Asian Paints Is #1. We're #2. So We Try Harder.{" "}
                <span className="text-[#4B007D]">And Cost 20% Less.</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-[#0F1221]/70 leading-relaxed">
                Premium paint services in Delhi NCR · 30 years manufacturing excellence · Zero sales calls, ever
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  '💰 ₹8K–20K Saved on 2–3 BHK',
                  '🚫 No Phone Spam — WhatsApp Only',
                  '🏆 NTPC-Approved Quality',
                ].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-2 rounded-full border border-[#0F1221]/10 bg-[#FBF9F6] px-4 py-2 text-sm font-medium text-[#0F1221]"
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => document.getElementById('calyco-quote-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center rounded-[12px] bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#0F1221] shadow-[0_8px_32px_rgba(15,18,33,0.08)] transition hover:bg-[#bb9831] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B007D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#D4AF37]"
                >
                  Get My Instant Quote — Save 20%
                </button>
                <a
                  href="https://wa.me/919999999999?text=Hi,%20I%20want%20a%20quote%20for%20my%20paint%20project"
                  className="inline-flex items-center justify-center rounded-[12px] border-2 border-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B007D] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <span role="img" aria-hidden="true" className="mr-2">
                    💬
                  </span>
                  Chat on WhatsApp
                </a>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-sm text-center text-[#0F1221]/80">
                {[
                  { value: '30 Years', label: 'Experience' },
                  { value: '2L+ Sq Ft', label: 'Painted' },
                  { value: 'NTPC', label: 'Approved' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1">
                    <span
                      className="text-2xl font-semibold text-[#4B007D]"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    >
                      {item.value}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#0F1221]/70">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="calyco-quote-calculator"
              className="rounded-[24px] border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-[0_8px_32px_rgba(15,18,33,0.08)]"
            >
              <h2 className="text-[28px] font-semibold text-[#0F1221]">
                Calculate Your Savings
              </h2>
              <label className="mt-6 mb-2 block text-sm font-medium text-[#0F1221]/80" htmlFor="home-size">
                Your Home Size
              </label>
              <select
                id="home-size"
                value={homeSize}
                onChange={(event) => setHomeSize(event.target.value)}
                className="w-full rounded-[12px] border border-[#0F1221]/15 bg-white px-4 py-3 text-sm text-[#0F1221] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B007D]"
              >
                <option value="1bhk">1 BHK (500–700 sq ft)</option>
                <option value="2bhk">2 BHK (800–1000 sq ft)</option>
                <option value="3bhk">3 BHK (1100–1300 sq ft)</option>
                <option value="4bhk">4 BHK / Villa (1500+ sq ft)</option>
              </select>

              <div className="mt-6 rounded-[12px] border border-[#0F1221]/10 bg-white p-5">
                <div className="flex items-center justify-between text-sm text-[#0F1221]/70">
                  <span>Asian Paints Cost</span>
                  <span
                    className="line-through"
                    style={{ fontFeatureSettings: '"tnum"' }}
                  >
                    {currencyFormatter.format(currentSavings.asian)}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-base font-semibold text-[#0F1221]">
                  <span>CALYCO Cost</span>
                  <span style={{ fontFeatureSettings: '"tnum"' }}>
                    {currencyFormatter.format(currentSavings.calyco)}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-[10px] bg-[#4B007D]/5 px-4 py-3 text-[#4B007D]">
                  <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                    Your Savings
                  </span>
                  <span
                    className="text-2xl font-semibold"
                    style={{ fontFeatureSettings: '"tnum"' }}
                  >
                    {currencyFormatter.format(currentSavings.savings)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center rounded-[12px] bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0F1221] transition hover:bg-[#bb9831] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B007D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F6]"
              >
                Lock In My 20% Discount
              </button>
              <p className="mt-4 text-center text-[13px] text-[#0F1221]/60">
                Minimum project value: ₹50,000 · Delhi NCR only
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Bar */}
      <div className="bg-[#FBF9F6] border-y border-[#0F1221]/10 py-3 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-between gap-3 text-center text-[15px] text-[#0F1221]/80 sm:flex-row">
          <div className="font-medium">
            ⚠️ First 100 Customers Only — <span className="font-semibold text-[#4B007D]">73 spots remaining</span>
          </div>
          <div className="w-full sm:w-[200px] h-2 rounded-full bg-white/60">
            <div className="h-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#4B007D]" style={{ width: '27%' }} aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="text-center text-3xl font-semibold text-[#0F1221] md:text-[48px]">
            Why We're Better Than Asian Paints
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[24px] border border-[#0F1221]/10 bg-white p-8 shadow-[0_8px_32px_rgba(15,18,33,0.05)]">
              <h3 className="text-2xl font-semibold text-[#0F1221]">Asian Paints</h3>
              <ul className="mt-6 space-y-4 text-sm text-[#0F1221]/80">
                <li><strong className="text-[#0F1221]">Price:</strong> Standard Market Rate</li>
                <li><strong className="text-[#0F1221]">Experience:</strong> Market Leader</li>
                <li><strong className="text-[#0F1221]">Marketing Approach:</strong> Aggressive phone calls, sales visits</li>
                <li><strong className="text-[#0F1221]">Focus Area:</strong> Pan-India</li>
                <li><strong className="text-[#0F1221]">Quality Guarantee:</strong> Standard warranty</li>
                <li><strong className="text-[#0F1221]">Service Model:</strong> Franchised contractors</li>
              </ul>
            </div>
            <div className="rounded-[24px] border border-[#0F1221]/10 bg-[#FBF9F6] p-8 shadow-[0_8px_32px_rgba(75,0,125,0.12)]">
              <h3 className="text-2xl font-semibold text-[#4B007D]">CALYCO (Powered by Techno India)</h3>
              <ul className="mt-6 space-y-4 text-sm text-[#0F1221]/85">
                <li><strong className="text-[#0F1221]">Price:</strong> <span className="text-[#4B007D] font-semibold">20% Lower ✓</span></li>
                <li><strong className="text-[#0F1221]">Experience:</strong> 30 Years Manufacturing</li>
                <li><strong className="text-[#0F1221]">Marketing Approach:</strong> <span className="text-[#4B007D] font-semibold">Zero Spam - Chat Only ✓</span></li>
                <li><strong className="text-[#0F1221]">Focus Area:</strong> <span className="text-[#4B007D] font-semibold">Delhi NCR Specialists ✓</span></li>
                <li><strong className="text-[#0F1221]">Quality Guarantee:</strong> NTPC-approved standards</li>
                <li><strong className="text-[#0F1221]">Service Model:</strong> Direct manufacturer team</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              { title: "✓ No Phone Spam, Ever", body: "We answer when YOU call. No follow-ups, no pressure." },
              { title: "✓ Delhi NCR Focused", body: "Local expertise, faster response, better understanding." },
              { title: "✓ Manufacturer Direct", body: "From factory to your walls, no middleman markup." },
              { title: "✓ Government Trusted", body: "Same quality approved for NTPC power plants." },
            ].map((callout) => (
              <div key={callout.title} className="rounded-[24px] border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-[0_6px_24px_rgba(15,18,33,0.06)]">
                <h4 className="text-lg font-semibold text-[#4B007D]">{callout.title}</h4>
                <p className="mt-2 text-sm text-[#0F1221]/80">{callout.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REMOVED: Trust Logos Bar - DELETED THIS SECTION */}

      {/* How It Works */}
      <section className="bg-[#F6F3EE] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#0F1221] md:text-[48px]">
              How It Works
            </h2>
            <p className="mt-4 text-base text-[#0F1221]/70 md:text-lg">
              Get premium paint services in three simple steps
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4B007D] text-2xl font-bold text-white mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-[#0F1221] mb-3">
                  Request Quote
                </h3>
                <p className="text-sm text-[#0F1221]/70 leading-relaxed">
                  Fill the form or WhatsApp us. We respond in 2 hours with a detailed estimate.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-[#4B007D]/20" aria-hidden="true" />
            </div>
            
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37] text-2xl font-bold text-[#0F1221] mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-[#0F1221] mb-3">
                  Get Assessment
                </h3>
                <p className="text-sm text-[#0F1221]/70 leading-relaxed">
                  Our team visits (only when YOU confirm). Transparent pricing breakdown provided.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-[#D4AF37]/20" aria-hidden="true" />
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4B007D] text-2xl font-bold text-white mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-[#0F1221] mb-3">
                Project Start
              </h3>
              <p className="text-sm text-[#0F1221]/70 leading-relaxed">
                Fixed timeline commitment. Direct manufacturer supervision ensures quality.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => document.getElementById('calyco-quote-calculator')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center rounded-[12px] bg-[#4B007D] px-8 py-4 text-base font-semibold text-white shadow-[0_8px_32px_rgba(75,0,125,0.15)] transition hover:bg-[#3d0066] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
            >
              Get Started — Calculate Savings
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#0F1221] md:text-[48px]">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-base text-[#0F1221]/70 md:text-lg">
              Join 100+ satisfied homeowners in Delhi NCR
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-[24px] border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-[0_8px_32px_rgba(15,18,33,0.06)]">
              <div className="mb-4 flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[#0F1221]/80 leading-relaxed mb-4">
                "Finally, a paint service that doesn't harass you with calls. Got my 3 BHK painted for 20% less than Asian Paints quote. Quality is excellent!"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B007D] text-sm font-semibold text-white">
                  RM
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F1221]">Rajesh M.</p>
                  <p className="text-xs text-[#0F1221]/60">Dwarka, Delhi</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-[24px] border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-[0_8px_32px_rgba(15,18,33,0.06)]">
              <div className="mb-4 flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[#0F1221]/80 leading-relaxed mb-4">
                "WhatsApp-only communication was a relief. No pressure sales tactics. Team was professional and finished on time. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B007D] text-sm font-semibold text-white">
                  PS
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F1221]">Priya S.</p>
                  <p className="text-xs text-[#0F1221]/60">Gurgaon</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-[24px] border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-[0_8px_32px_rgba(15,18,33,0.06)]">
              <div className="mb-4 flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[#0F1221]/80 leading-relaxed mb-4">
                "Saved ₹15,000 on my villa painting. NTPC-approved quality claim is real. Same paint used in government projects. Worth every rupee!"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B007D] text-sm font-semibold text-white">
                  AK
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F1221]">Amit K.</p>
                  <p className="text-xs text-[#0F1221]/60">Noida</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-3 gap-8 rounded-[24px] border border-[#0F1221]/10 bg-[#F6F3EE] p-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#4B007D]" style={{ fontFeatureSettings: '"tnum"' }}>
                4.9/5
              </p>
              <p className="mt-2 text-sm text-[#0F1221]/70">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#4B007D]" style={{ fontFeatureSettings: '"tnum"' }}>
                100+
              </p>
              <p className="mt-2 text-sm text-[#0F1221]/70">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#4B007D]" style={{ fontFeatureSettings: '"tnum"' }}>
                ₹12L+
              </p>
              <p className="mt-2 text-sm text-[#0F1221]/70">Total Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section with Original ColorSlider */}
      <section className="relative overflow-hidden pt-[19.5]">
        <ColorSlider />
      </section>

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

      {/* NEW: What Our Customers Say Section - Added right after WhyTrustUs */}
      <section className="bg-white py-20 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#0F1221] md:text-[40px] lg:text-[48px] leading-tight tracking-[-0.01em]">
              What Our <span className="text-[#4B007D]">Customers Say</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-[#0F1221]/70 leading-relaxed max-w-2xl mx-auto">
              Join 100+ satisfied homeowners in Delhi NCR who trust CALYCO for premium paint solutions.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-[24px] border border-[#0F1221]/10 bg-[#FBF9F6] p-8 shadow-[0_8px_32px_rgba(15,18,33,0.06)] hover:shadow-[0_16px_64px_rgba(75,0,125,0.12)] transition-all duration-300"
            >
              <div className="mb-6 flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-base text-[#0F1221]/80 leading-relaxed mb-6">
                "Finally, a paint service that doesn't harass you with calls. Got my 3 BHK painted for 20% less than Asian Paints quote. Quality is excellent!"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4B007D] text-base font-semibold text-white">
                  RM
                </div>
                <div>
                  <p className="text-base font-semibold text-[#0F1221]">Rajesh M.</p>
                  <p className="text-sm text-[#0F1221]/60">Dwarka, Delhi</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-[24px] border border-[#0F1221]/10 bg-[#FBF9F6] p-8 shadow-[0_8px_32px_rgba(15,18,33,0.06)] hover:shadow-[0_16px_64px_rgba(75,0,125,0.12)] transition-all duration-300"
            >
              <div className="mb-6 flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-base text-[#0F1221]/80 leading-relaxed mb-6">
                "WhatsApp-only communication was a relief. No pressure sales tactics. Team was professional and finished on time. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4B007D] text-base font-semibold text-white">
                  PS
                </div>
                <div>
                  <p className="text-base font-semibold text-[#0F1221]">Priya S.</p>
                  <p className="text-sm text-[#0F1221]/60">Gurgaon</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-[24px] border border-[#0F1221]/10 bg-[#FBF9F6] p-8 shadow-[0_8px_32px_rgba(15,18,33,0.06)] hover:shadow-[0_16px_64px_rgba(75,0,125,0.12)] transition-all duration-300"
            >
              <div className="mb-6 flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-base text-[#0F1221]/80 leading-relaxed mb-6">
                "Saved ₹15,000 on my villa painting. NTPC-approved quality claim is real. Same paint used in government projects. Worth every rupee!"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4B007D] text-base font-semibold text-white">
                  AK
                </div>
                <div>
                  <p className="text-base font-semibold text-[#0F1221]">Amit K.</p>
                  <p className="text-sm text-[#0F1221]/60">Noida</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-3 gap-8 rounded-[24px] border border-[#0F1221]/10 bg-[#F6F3EE] p-10"
          >
            <div className="text-center">
              <p className="text-5xl font-bold text-[#4B007D]" style={{ fontFeatureSettings: '"tnum"' }}>
                4.9/5
              </p>
              <p className="mt-3 text-base text-[#0F1221]/70">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-[#4B007D]" style={{ fontFeatureSettings: '"tnum"' }}>
                100+
              </p>
              <p className="mt-3 text-base text-[#0F1221]/70">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-[#4B007D]" style={{ fontFeatureSettings: '"tnum"' }}>
                ₹12L+
              </p>
              <p className="mt-3 text-base text-[#0F1221]/70">Total Savings</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ENHANCED: About Calyco FAQ Section */}
      <section className="py-20 md:py-24 lg:py-32 bg-[#F6F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[32px] font-bold text-[#0F1221] md:text-[40px] lg:text-[48px] leading-tight tracking-[-0.01em]">
              About <span className="text-[#4B007D]">Calyco</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-[#0F1221]/70 leading-relaxed max-w-2xl mx-auto">
              Everything you need to know about our premium eco-friendly paints.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl mx-auto space-y-0"
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
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border-b border-[#0F1221]/10 last:border-b-0"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full py-6 text-left flex justify-between items-center hover:bg-white/50 transition-colors duration-200 px-4 rounded-lg"
                >
                  <span className="text-lg font-semibold text-[#0F1221] pr-8">{faq.question}</span>
                  <span className={`text-[#4B007D] text-2xl font-bold transform transition-transform duration-300 flex-shrink-0 ${activeFAQ === index ? 'rotate-45' : ''}`}>
                    +
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
                      <div className="pb-6 px-4">
                        <p className="text-[#0F1221]/70 leading-relaxed text-base">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12 pt-8"
            >
              <button
                onClick={() => setShowAllFAQs(!showAllFAQs)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#4B007D] text-white rounded-[12px] font-semibold hover:bg-[#3d0066] transition-all duration-300 shadow-[0_8px_32px_rgba(75,0,125,0.2)] hover:shadow-[0_12px_48px_rgba(75,0,125,0.3)] hover:-translate-y-0.5"
              >
                {showAllFAQs ? 'Show Less FAQs' : 'See All FAQs'}
                <svg className={`w-5 h-5 transform transition-transform duration-300 ${showAllFAQs ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
import { motion } from "framer-motion";
import { useEffect } from "react";
// Removed all icon imports: FaShieldAlt, FaLeaf, FaAward, FaUsers, FaIndustry, FaHeart, FaPaintBrush

export const AboutUs = () => {
  useEffect(() => {
    document.title = "About Calyco";
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const sections = [
    {
      text: "Calyco is a paint manufacturing company delivering high-performance, cost-effective paints and coatings that protect and enhance residential, commercial, and industrial surfaces.",
      // icon: <FaPaintBrush className="text-4xl text-[#493657]" />, // Icon removed
      title: "Our Vision",
      highlight: "Transforming Surfaces, Enhancing Lives",
    },
    {
      text: "We don't just produce high-performance paints and coatings; we deliver trust, durability, and long-term value, ensuring performance without compromise.",
      // icon: <FaShieldAlt className="text-4xl text-[#F0C85A]" />, // Icon removed
      title: "Our Commitment",
      highlight: "Trust, Durability, Value",
    },
    {
      text: "We prioritize low-VOC formulations, eco-friendly raw materials, and efficient production practices to reduce environmental impact without sacrificing quality.",
      // icon: <FaLeaf className="text-4xl text-green-600" />, // Icon removed
      title: "Sustainability at Core",
      highlight: "Eco-Friendly, Quality-Driven",
    },
  ];

  const stats = [
    { number: "15+", label: "Years Experience" /*, icon: <FaAward /> */ }, // Icon removed
    { number: "500+", label: "Projects Completed" /*, icon: <FaIndustry /> */ }, // Icon removed
    { number: "100+", label: "Happy Clients" /*, icon: <FaUsers /> */ }, // Icon removed
    { number: "99%", label: "Customer Satisfaction" /*, icon: <FaHeart /> */ }, // Icon removed
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1e082d] via-[#493657] to-[#2a1f3d] text-white py-32 px-6">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            About <span className="text-[#F0C85A]">Calyco</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Calyco is a paint manufacturing company delivering high-performance, cost-effective paints and coatings that protect and enhance residential, commercial, and industrial surfaces.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 -mt-20 relative z-20">
        {/* Image */}
        <div className="bg-white p-1 text-center">
            <div className="w-full">  <img 
                    src="/AboutUs.png" 
                    alt="2 painters" 
                    className="w-full h-full object-cover" 
                />
            </div>
        </div>

        {/* VALUES BLOCK (AFTER HERO, BEFORE STATS OR TEAM) */}
        <div className="space-y-24 mt-16 max-w-7xl mx-auto px-6 md:px-20 lg:px-32">

          {/* OUR VISION */}
          <motion.div
            className="text-center"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-[#2C1A34] mb-6">Our Vision</h2>
            <p className="text-lg leading-relaxed text-gray-700 max-w-4xl mx-auto">
              Our vision is to transform how surfaces are protected and experienced — one lasting coat at a time. We strive to elevate living and working spaces through performance without compromise.
            </p>
          </motion.div>


          {/* OUR COMMITMENT */}
          <motion.div
            className="text-center"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-[#2C1A34] mb-6">Our Commitment</h2>
            <p className="text-lg leading-relaxed text-gray-700 max-w-4xl mx-auto">
              We don't just produce high-performance paints and coatings; we deliver trust, durability, and long-term value, ensuring performance without compromise.
            </p>
            {/* IMAGE SLOT */}
            {/* <div className="mt-10 h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
              Optional Image Area (Commitment)
            </div> */}
          </motion.div>
          
          {/* SUSTAINABILITY */}
          <motion.div
            className="text-center"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-[#2C1A34] mb-6">Sustainability at Core</h2>
            <p className="text-lg leading-relaxed text-gray-700 max-w-4xl mx-auto">
              We prioritize low-VOC formulations, eco-friendly raw materials, and efficient production practices to reduce environmental impact without sacrificing quality.
            </p>
            {/* IMAGE SLOT */}
            {/* <div className="mt-10 h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
              Optional Image Area (Sustainability)
            </div> */}
          </motion.div>

        </div>

        
        {/* Mission Statement */}
        <motion.div
          className="bg-gradient-to-r from-[#2C1A34] to-[#493657] text-white rounded-2xl px-8 py-16 mt-24 mb-24 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl font-semibold mb-8 tracking-tight">Our Core Mission</h2>
            <p className="text-lg leading-relaxed text-white/90">
              At CALYCO, our mission is to deliver high-performance, cost-effective paints and coatings that protect and enhance residential, commercial, and industrial surfaces. We are committed to trust, durability, and long-term value — ensuring performance without compromise. Our sustainable approach prioritizes low-VOC formulations, eco-friendly raw materials, and efficient production practices that reduce environmental impact without sacrificing quality.
            </p>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm font-medium text-white/80">
              <div className="flex flex-col items-center">
                <svg className="w-10 h-10 mb-2 text-[#F0C85A]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                Durability
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-10 h-10 mb-2 text-[#F0C85A]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v7c0 6.08 4.35 11.53 10 13 5.65-1.47 10-6.92 10-13V7l-10-5z"/></svg>
                Trust
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-10 h-10 mb-2 text-[#F0C85A]" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v2H4zm0 4h10v2H4zm0 4h16v2H4zm0 4h10v2H4zm0 4h16v2H4z"/></svg>
                Low-VOC
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-10 h-10 mb-2 text-[#F0C85A]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 7.58 2 12c0 5.42 4.48 10 10 10s10-4.58 10-10c0-4.42-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8 0-3.04 3.58-8 8-8s8 4.96 8 8c0 4.42-3.58 8-8 8z"/></svg>
                Sustainability
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutUs;
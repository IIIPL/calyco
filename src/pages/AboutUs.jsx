import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaShieldAlt, FaLeaf, FaAward, FaUsers, FaIndustry, FaHeart } from "react-icons/fa";

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
      text: "Calyco delivers high-performance, cost-effective paints and coatings that protect and enhance residential, commercial, and industrial surfaces.",
      icon: <FaIndustry className="text-4xl text-[#493657]" />,
      title: "High-Performance Solutions",
      highlight: "Protect & Enhance",
    },
    {
      text: "We don't just produce high-performance paints and coatings; we deliver trust, durability, and long-term value, ensuring performance without compromise.",
      icon: <FaShieldAlt className="text-4xl text-[#F0C85A]" />,
      title: "Trust & Durability",
      highlight: "Performance Without Compromise",
    },
    {
      text: "We prioritize low-VOC formulations, eco-friendly raw materials, and efficient production practices to reduce environmental impact without sacrificing quality.",
      icon: <FaLeaf className="text-4xl text-green-600" />,
      title: "Eco-Friendly Commitment",
      highlight: "Sustainable Excellence",
    },
  ];

  const stats = [
    { number: "15+", label: "Years Experience", icon: <FaAward /> },
    { number: "500+", label: "Projects Completed", icon: <FaIndustry /> },
    { number: "100+", label: "Happy Clients", icon: <FaUsers /> },
    { number: "99%", label: "Customer Satisfaction", icon: <FaHeart /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1e082d] via-[#493657] to-[#2a1f3d] text-white py-32 px-6">
        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23F0C85A" fill-opacity="0.03"%3E%3Cpath d="M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm20 0c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z"/%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div> */}
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6"
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
            Transforming surfaces with innovative paint solutions that combine quality, sustainability, and performance.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 -mt-20 relative z-20">
        {/* Stats Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-[#493657] text-3xl mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-[#493657] mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-32">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              className={`flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-16`}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              {/* Text Section */}
              <div className="md:w-1/2 space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#493657]">{section.title}</h3>
                    <p className="text-[#F0C85A] font-semibold">{section.highlight}</p>
                  </div>
                </div>
                
                <p className="text-xl text-gray-700 leading-relaxed">
                  {section.text}
                </p>
                
                {/* Additional features based on section */}
                {i === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#493657] mb-2">Residential</h4>
                      <p className="text-sm text-gray-600">Premium interior & exterior solutions</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#493657] mb-2">Commercial</h4>
                      <p className="text-sm text-gray-600">Durable coatings for business spaces</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#493657] mb-2">Industrial</h4>
                      <p className="text-sm text-gray-600">Heavy-duty protective coatings</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#493657] mb-2">Specialty</h4>
                      <p className="text-sm text-gray-600">Custom formulations available</p>
                    </div>
                  </div>
                )}
                
                {i === 1 && (
                  <div className="bg-[#F0C85A]/10 p-6 rounded-lg border-l-4 border-[#F0C85A]">
                    <h4 className="font-semibold text-[#493657] mb-2">Our Promise</h4>
                    <p className="text-gray-700">Every product undergoes rigorous testing to ensure it meets our high standards for durability, coverage, and finish quality.</p>
                  </div>
                )}
                
                {i === 2 && (
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 mb-2">Environmental Impact</h4>
                    <p className="text-gray-700">Our commitment to sustainability includes reducing waste, using renewable resources, and developing products that contribute to healthier indoor environments.</p>
                  </div>
                )}
              </div>

              {/* Image Section */}
              <div className="md:w-1/2">
                <motion.div
                  className="relative group"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.3 + 0.2, duration: 0.6 }}
                >
                  <div className="bg-gradient-to-br from-[#493657]/5 to-[#F0C85A]/5 rounded-2xl p-8 shadow-xl">
                    <div className="aspect-video bg-gradient-to-br from-[#493657]/10 to-[#F0C85A]/10 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">
                          {section.icon}
                        </div>
                        <p className="text-[#493657] font-semibold">{section.title}</p>
                        <p className="text-sm text-gray-600 mt-2">Visual representation</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#493657]/0 to-[#F0C85A]/0 group-hover:from-[#493657]/5 group-hover:to-[#F0C85A]/5 rounded-2xl transition-all duration-300"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          className="bg-[#493657] text-white rounded-3xl p-12 mt-32 mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto opacity-90">
            To be the leading provider of innovative, sustainable paint and coating solutions that protect, beautify, and enhance surfaces while minimizing environmental impact. We strive to exceed customer expectations through continuous innovation, exceptional quality, and outstanding service.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="bg-[#F0C85A] text-[#493657] px-6 py-2 rounded-full font-semibold">Innovation</span>
            <span className="bg-[#F0C85A] text-[#493657] px-6 py-2 rounded-full font-semibold">Quality</span>
            <span className="bg-[#F0C85A] text-[#493657] px-6 py-2 rounded-full font-semibold">Sustainability</span>
            <span className="bg-[#F0C85A] text-[#493657] px-6 py-2 rounded-full font-semibold">Excellence</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
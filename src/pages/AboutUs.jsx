import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaShieldAlt, FaLeaf, FaAward, FaUsers, FaIndustry, FaHeart, FaPaintBrush } from "react-icons/fa"; // Added FaPaintBrush for vision

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
      icon: <FaPaintBrush className="text-4xl text-[#493657]" />, // Using a new icon for "Our Vision"
      title: "Our Vision",
      highlight: "Transforming Surfaces, Enhancing Lives",
    },
    {
      text: "We don't just produce high-performance paints and coatings; we deliver trust, durability, and long-term value, ensuring performance without compromise.",
      icon: <FaShieldAlt className="text-4xl text-[#F0C85A]" />,
      title: "Our Commitment",
      highlight: "Trust, Durability, Value",
    },
    {
      text: "We prioritize low-VOC formulations, eco-friendly raw materials, and efficient production practices to reduce environmental impact without sacrificing quality.",
      icon: <FaLeaf className="text-4xl text-green-600" />,
      title: "Sustainability at Core",
      highlight: "Eco-Friendly, Quality-Driven",
    },
  ];

  const stats = [
    { number: "15+", label: "Years Experience", icon: <FaAward /> },
    { number: "500+", label: "Projects Completed", icon: <FaIndustry /> },
    { number: "100+", label: "Happy Clients", icon: <FaUsers /> },
    { number: "99%", label: "Customer Satisfaction", icon: <FaHeart /> },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1e082d] via-[#493657] to-[#2a1f3d] text-white py-32 px-6">
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
            Leading the way in paint and coating solutions with a focus on innovation, quality, and a sustainable future.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 -mt-20 relative z-20">
        {/* Image */}
        <div className="bg-white p-20 text-center">
          AN image will show here
        </div>

        {/* Main Content Sections */}
        <div className="space-y-32">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-16" // Changed from flex-row to flex-col
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              {/* Text Section */}
              <div className="w-full space-y-6 text-center"> {/* Adjusted width and added text-center */}
                <div className="flex flex-col items-center gap-4 mb-6"> {/* Changed to flex-col for icon and text stacking */}
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#493657]">{section.title}</h3>
                    <p className="text-[#F0C85A] font-semibold">{section.highlight}</p>
                  </div>
                </div>
                
                <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"> {/* Added max-w-3xl and mx-auto for centering */}
                  {section.text}
                </p>
                
                {/* Additional features based on section */}
                {i === 0 && ( // This block now corresponds to "Our Vision"
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-3xl mx-auto"> {/* Added max-w-3xl and mx-auto for centering */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#493657] mb-2">Residential Solutions</h4>
                      <p className="text-sm text-gray-600">Premium interior & exterior solutions for homes.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#493657] mb-2">Commercial Applications</h4>
                      <p className="text-sm text-gray-600">Durable coatings for various business environments.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#493657] mb-2">Industrial Protection</h4>
                      <p className="text-sm text-gray-600">Heavy-duty protective coatings for demanding industrial use.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#493657] mb-2">Tailored Formulations</h4>
                      <p className="text-sm text-gray-600">Custom paint and coating solutions available upon request.</p>
                    </div>
                  </div>
                )}
                
                {i === 1 && ( // This block now corresponds to "Our Commitment"
                  <div className="bg-[#F0C85A]/10 p-6 rounded-lg border-l-4 border-[#F0C85A] max-w-3xl mx-auto text-left"> {/* Added max-w-3xl, mx-auto, and text-left */}
                    <h4 className="font-semibold text-[#493657] mb-2">Our Promise of Excellence</h4>
                    <p className="text-gray-700">Every Calyco product undergoes rigorous quality assurance and testing, ensuring it meets the highest standards for performance, longevity, and finish.</p>
                  </div>
                )}
                
                {i === 2 && ( // This block now corresponds to "Sustainability"
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500 max-w-3xl mx-auto text-left"> {/* Added max-w-3xl, mx-auto, and text-left */}
                    <h4 className="font-semibold text-green-700 mb-2">Driving Sustainable Practices</h4>
                    <p className="text-gray-700">Our dedication to sustainability extends through our entire lifecycle – from responsibly sourced raw materials to energy-efficient production and products that contribute to healthier spaces.</p>
                  </div>
                )}
              </div>

              {/* Image Section */}
              <div className="w-full"> {/* Adjusted width */}
                <motion.div
                  className="relative group max-w-xl mx-auto" // Added max-w-xl and mx-auto for centering
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
                        <p className="text-sm text-gray-600 mt-2">Visual representation of our {section.title.toLowerCase()}</p>
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
          <h2 className="text-4xl font-bold mb-6">Our Core Mission</h2>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto opacity-90">
            Calyco's mission is to be the premier innovator in paint and coating solutions, consistently delivering superior products that offer unparalleled protection, aesthetic appeal, and environmental responsibility. We are driven by a commitment to quality, customer satisfaction, and a sustainable future for all surfaces.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="bg-[#F0C85A] text-[#493657] px-6 py-2 rounded-full font-semibold">Innovation</span>
            <span className="bg-[#F0C85A] text-[#493657] px-6 py-2 rounded-full font-semibold">Quality Excellence</span>
            <span className="bg-[#F0C85A] text-[#493657] px-6 py-2 rounded-full font-semibold">Environmental Stewardship</span>
            <span className="bg-[#F0C85A] text-[#493657] px-6 py-2 rounded-full font-semibold">Customer Focus</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUs;
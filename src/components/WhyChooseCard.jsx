import { FaPaintRoller, FaLeaf, FaShieldHalved, FaAward, FaRocket, FaGlobe } from "react-icons/fa6";
import { motion } from "framer-motion";

export const WhyChooseCard = ({ index = 0 }) => {
  const whyChooseData = [
    {
      heading: "High-Performance Coatings",
      description: "Calyco delivers long-lasting, waterproof, UV-resistant paints built for Indian climates and surfaces.",
      icon: FaShieldHalved,
      color: "from-blue-500 to-blue-600"
    },
    {
      heading: "Low-VOC & Eco-Friendly",
      description: "All products are water-based and low in VOCs, ensuring healthier indoor air and minimal environmental impact.",
      icon: FaLeaf,
      color: "from-green-500 to-green-600"
    },
    {
      heading: "Multi-Surface Compatibility",
      description: "From walls to metal, wood to concrete—Calyco products adhere and perform across diverse substrates.",
      icon: FaPaintRoller,
      color: "from-purple-500 to-purple-600"
    },
    {
      heading: "Professional-Grade Durability",
      description: "Trusted by contractors and developers for 10+ year lifespan under real-world wear and tear.",
      icon: FaAward,
      color: "from-amber-500 to-amber-600"
    },
    {
      heading: "Innovative & Versatile Formulas",
      description: "Smart sealers, flexible coatings, one-coat paints—Calyco blends science and simplicity in application.",
      icon: FaRocket,
      color: "from-red-500 to-red-600"
    },
    {
      heading: "Made for India. Ready for the World.",
      description: "Proudly formulated and manufactured in India, calibrated for global standards of quality and reliability.",
      icon: FaGlobe,
      color: "from-indigo-500 to-indigo-600"
    },
  ];

  const { heading, description, icon: Icon, color } = whyChooseData[index] || {};

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
      whileHover={{ y: -5 }}
    >
      <div className="p-8">
        {/* Enhanced Icon */}
        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <Icon className="text-white text-2xl" />
        </div>

        {/* Enhanced Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-[#493657] mb-4 group-hover:text-[#F0C85A] transition-colors duration-300">
            {heading}
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6">
            {description}
          </p>

          {/* Enhanced CTA */}
          <div className="flex items-center text-[#493657] font-medium group-hover:text-[#F0C85A] transition-colors duration-300">
            <span className="text-sm">Learn More</span>
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

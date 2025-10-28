import { FaPaintRoller, FaLeaf, FaShieldHalved, FaAward, FaRocket, FaGlobe } from "react-icons/fa6";
import { motion } from "framer-motion";

export const WhyChooseCard = ({ index = 0 }) => {
  const whyChooseData = [
    {
      heading: "10-Year Guarantee",
      description: "Industry-leading warranty on all products. We stand behind our quality with a decade-long commitment to your satisfaction.",
      icon: FaShieldHalved,
      color: "from-blue-500 to-blue-600"
    },
    {
      heading: "20% More Affordable",
      description: "Premium quality at unbeatable prices. Save significantly compared to Asian Paints without compromising on excellence.",
      icon: FaAward,
      color: "from-green-500 to-green-600"
    },
    {
      heading: "Manufactured In-House",
      description: "Direct from our state-of-the-art facilities to your home. No middlemen, just pure quality and value.",
      icon: FaGlobe,
      color: "from-purple-500 to-purple-600"
    },
    {
      heading: "Expert Paint Services",
      description: "Professional painters across Delhi NCR. From consultation to completion, we handle everything with care.",
      icon: FaPaintRoller,
      color: "from-amber-500 to-amber-600"
    },
    {
      heading: "Eco-Friendly Formulas",
      description: "Low-VOC, water-based paints that are safe for your family and kind to the environment. Green without compromise.",
      icon: FaLeaf,
      color: "from-teal-500 to-teal-600"
    },
    {
      heading: "#2 in India",
      description: "Ranked second only to Asian Paints. Trusted by thousands of homes and businesses across the country.",
      icon: FaRocket,
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

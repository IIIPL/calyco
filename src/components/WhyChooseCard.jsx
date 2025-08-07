import { FaPaintRoller } from "react-icons/fa6";
import { motion } from "framer-motion";

export const WhyChooseCard = ({ index = 0 }) => {
  const whyChooseData = [
    {
      heading: "High-Performance Coatings",
      description: "Calyco delivers long-lasting, waterproof, UV-resistant paints built for Indian climates and surfaces.",
    },
    {
      heading: "Low-VOC & Eco-Friendly",
      description: "All products are water-based and low in VOCs, ensuring healthier indoor air and minimal environmental impact.",
    },
    {
      heading: "Multi-Surface Compatibility",
      description: "From walls to metal, wood to concrete—Calyco products adhere and perform across diverse substrates.",
    },
    {
      heading: "Professional-Grade Durability",
      description: "Trusted by contractors and developers for 10+ year lifespan under real-world wear and tear.",
    },
    {
      heading: "Innovative & Versatile Formulas",
      description: "Smart sealers, flexible coatings, one-coat paints—Calyco blends science and simplicity in application.",
    },
    {
      heading: "Made for India. Ready for the World.",
      description: "Proudly formulated and manufactured in India, calibrated for global standards of quality and reliability.",
    },
  ];

  const { heading, description } = whyChooseData[index] || {};

  return (
    <div className="bg-[#F0C85A] m-1 rounded-xl flex flex-col hover:shadow-2xl px-2">
      <div className="mt-3 mb-6 mx-3 bg-slate-500 w-12 h-12 flex items-center justify-center rounded">
        <FaPaintRoller className="text-white text-base" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true }}
      >
        <div className="mt-6 text-base font-semibold mx-3">
          {heading}
        </div>

        <div className="mx-3 text-gray-700 text-sm mb-5">
          {description}
        </div>

        
      </motion.div>
    </div>
  );
};

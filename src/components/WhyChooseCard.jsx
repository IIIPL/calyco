import { FaPaintRoller } from "react-icons/fa6";
import { motion } from "framer-motion";

export const WhyChooseCard = ({ textHeading = "High-Performance Coatings", index = 0 }) => {
  return (
    <div className="bg-[#F0C85A] m-1 rounded-xl flex flex-col hover:shadow-2xl px-2">
      {/* Static Icon */}
      <div className="mt-3 mb-6 mx-3 bg-slate-500 w-12 h-12 flex items-center justify-center rounded">
        <FaPaintRoller className="text-white text-base" />
      </div>

      {/* Animated Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true }}
      >
        <div className="mt-6 text-base font-semibold mx-3">
          {textHeading}
        </div>

        <div className="mx-3 text-gray-700 text-sm">
          Calyco Paints offers durable, eco-friendly solutions for residential, commercial, and industrial surfaces.
        </div>

        <div className="flex flex-row justify-between mx-3 font-bold text-xs my-4">
          <div>LEARN MORE</div>
          <a href="https://calycopaints.com" target="_blank" rel="noopener noreferrer">
            <img
              src="vectorMore.png"
              className="w-4 h-4 transition-transform duration-300 hover:scale-125"
              alt="More"
            />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

const ValueCard = ({ icon, title, body }) => {
  return (
    <motion.div
      className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:ring-offset-2"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      tabIndex={0}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#F0C85A] to-[#e3b842] rounded-xl flex items-center justify-center text-white text-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
          {icon}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-[#493657] mb-2 group-hover:text-[#5E3A98] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[#493657]/70 leading-relaxed text-sm font-light">
            {body}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ValueCard;

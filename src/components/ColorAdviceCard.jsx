import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const ColorAdviceCard = ({ section, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={section.image}
          alt={section.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{section.description}</p>
                          <div className="flex items-center text-[#493657] font-medium">
                    Learn More
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </div>
      </div>
    </motion.div>
  );
};

export default ColorAdviceCard;

import React from 'react';
import { motion } from 'framer-motion';

const SwatchChip = ({ name, hex }) => {
  return (
    <motion.div
      className="text-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className="w-12 h-12 rounded-lg shadow-sm border border-gray-200 mb-2 mx-auto"
        style={{ backgroundColor: hex }}
      />
      <p className="text-xs font-medium text-[#493657] max-w-16 truncate">
        {name}
      </p>
    </motion.div>
  );
};

export default SwatchChip;

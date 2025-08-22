import React from 'react';
import { motion } from 'framer-motion';

const GridMasonry = ({ images = [] }) => {
  if (!Array.isArray(images) || images.length === 0) return null;
  
  // Function to get meaningful inspiration names
  const getInspirationName = (index) => {
    const inspirationNames = [
      "Modern Living Room",
      "Cozy Bedroom Retreat",
      "Elegant Dining Space",
      "Serene Bathroom",
      "Contemporary Kitchen",
      "Stylish Home Office",
      "Warm Family Room",
      "Luxurious Master Suite",
      "Inviting Entryway",
      "Peaceful Study Nook",
      "Chic Entertainment Area",
      "Tranquil Reading Corner"
    ];
    
    return inspirationNames[index] || `Inspiration ${index + 1}`;
  };
  
  return (
    <section className="py-20 bg-white">
      <div className="w-full px-4 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Inspiration Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover beautiful spaces transformed with Calyco paints
          </p>
        </motion.div>

        {/* Full-width horizontal scrollable slider */}
        <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div className="flex flex-nowrap gap-6">
            {images.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[300px] md:w-[350px] lg:w-[400px] group cursor-pointer"
              >
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-black/5 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                  <img 
                    src={src} 
                    alt={`Inspiration ${idx + 1}`} 
                    loading="lazy" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="mt-3 text-sm text-gray-700 font-medium">
                  {getInspirationName(idx)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GridMasonry;



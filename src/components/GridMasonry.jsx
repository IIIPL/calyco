import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationArrows from './NavigationArrows';

const GridMasonry = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 4; // Number of items visible at once
  const cardWidth = 400; // Width of each card
  const gap = 24; // Gap between cards (6 * 4 = 24px)
  const slideDistance = cardWidth + gap; // Total distance to move per slide
  
  if (!Array.isArray(images) || images.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex(prev => 
      prev >= images.length - visibleItems ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev => 
      prev <= 0 ? images.length - visibleItems : prev - 1
    );
  };
  
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
    <section className="py-20 bg-gray-50">
      <div className="w-full px-4 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Inspiration Gallery
            </h2>
            <div className="flex-1 flex justify-end">
              <NavigationArrows
                onPrevious={prevSlide}
                onNext={nextSlide}
                showPrevious={currentIndex > 0}
                showNext={currentIndex < images.length - visibleItems}
                size="md"
              />
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover beautiful spaces transformed with Calyco paints
          </p>
        </motion.div>

        {/* Full-width horizontal scrollable slider */}
        <div className="w-full overflow-hidden">
          <div className="flex flex-nowrap gap-6 transition-transform duration-500 ease-out"
               style={{ transform: `translateX(-${currentIndex * slideDistance}px)` }}>
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



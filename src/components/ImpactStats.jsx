import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Info } from 'lucide-react';

const StatCard = ({ number, label, description, tooltip }) => {
  const [count, setCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(number.replace(/[^0-9]/g, ''));
      const duration = 2000; // 2 seconds
      const increment = numericValue / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, number]);

  const displayNumber = number.includes('%') 
    ? `${count}%` 
    : number.includes('+') 
    ? `${count}+` 
    : count;

  return (
    <motion.div
      ref={ref}
      className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative group"
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="text-5xl md:text-6xl font-light text-[#493657] mb-4">
        {displayNumber}
      </div>
      <div className="flex items-center justify-center gap-2 mb-2">
        <h3 className="text-lg font-medium text-[#493657]">{label}</h3>
        {tooltip && (
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
              className="text-[#493657]/60 hover:text-[#493657] transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10 max-w-48">
                {tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-[#493657]/70 text-sm font-light">{description}</p>
    </motion.div>
  );
};

const ImpactStats = ({ items = [] }) => {
  const defaultItems = [
    {
      number: "0",
      label: "VOC Emissions",
      description: "Zero-VOC formulations",
      tooltip: "Our paints contain zero volatile organic compounds, ensuring healthier indoor air quality"
    },
    {
      number: "100%",
      label: "Water-Based",
      description: "Environmentally safe",
      tooltip: "All our formulations are water-based, making them safer for both users and the environment"
    },
    {
      number: "10+",
      label: "Years Durability",
      description: "Long-lasting protection",
      tooltip: "Our paints are engineered to maintain their color and finish for over a decade"
    },
    {
      number: "1000+",
      label: "Projects Served",
      description: "Trusted by professionals",
      tooltip: "Over a thousand successful projects completed using Calyco paints"
    }
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#493657] mb-6 tracking-wide">
            Our Impact
          </h2>
          <p className="text-lg text-[#493657]/70 max-w-2xl mx-auto leading-relaxed">
            Through Calyco, we're making sustainability a standard, not a specialty, in Indian homes and construction.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {displayItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStats;

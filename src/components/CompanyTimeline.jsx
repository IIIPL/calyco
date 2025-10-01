import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TimelineStep = ({ step, index, isActive, onClick }) => {
  return (
    <motion.div
      className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
        isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Step Circle */}
      <div className={`w-4 h-4 rounded-full mb-3 transition-all duration-300 ${
        isActive 
          ? 'bg-[#F0C85A] shadow-lg' 
          : 'bg-gray-300 border-2 border-gray-200'
      }`} />
      
      {/* Year */}
      <div className={`text-sm font-medium mb-2 transition-colors duration-300 ${
        isActive ? 'text-[#493657]' : 'text-gray-500'
      }`}>
        {step.year}
      </div>
      
      {/* Text */}
      <div className={`text-xs text-center max-w-24 transition-colors duration-300 ${
        isActive ? 'text-[#493657]' : 'text-gray-500'
      }`}>
        {step.text}
      </div>
    </motion.div>
  );
};

const CompanyTimeline = ({ steps = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const defaultSteps = [
    { year: '2023', text: 'Founded', description: 'Calyco Paints was established with a vision for sustainable paint solutions' },
    { year: '2023', text: 'EcoMax Launch', description: 'Developed and launched our proprietary EcoMax Technology' },
    { year: '2024', text: 'First Products', description: 'Released our initial range of zero-VOC interior and exterior paints' },
    { year: '2024', text: 'Market Expansion', description: 'Expanded our product line and began serving professional contractors' },
    { year: '2025', text: 'Future Growth', description: 'Continuing to innovate and expand our sustainable paint solutions' }
  ];

  const displaySteps = steps.length > 0 ? steps : defaultSteps;

  const handleKeyNavigation = (e) => {
    if (e.key === 'ArrowLeft' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (e.key === 'ArrowRight' && activeIndex < displaySteps.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#493657] mb-6 tracking-wide">
            Our Journey
          </h2>
          <p className="text-lg text-[#493657]/70 max-w-2xl mx-auto leading-relaxed">
            From humble beginnings to industry innovation, here's how we've grown and evolved.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <motion.div
            ref={containerRef}
            className="relative"
            onKeyDown={handleKeyNavigation}
            tabIndex={0}
          >
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200" />
            
            {/* Steps */}
            <div className="flex justify-between items-start relative z-10">
              {displaySteps.map((step, index) => (
                <TimelineStep
                  key={index}
                  step={step}
                  index={index}
                  isActive={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="absolute left-0 top-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-[#493657] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveIndex(Math.min(displaySteps.length - 1, activeIndex + 1))}
              disabled={activeIndex === displaySteps.length - 1}
              className="absolute right-0 top-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-[#493657] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Active Step Description */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-[#493657] mb-4">
                {displaySteps[activeIndex].year} - {displaySteps[activeIndex].text}
              </h3>
              <p className="text-[#493657]/70 leading-relaxed">
                {displaySteps[activeIndex].description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {displaySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-4 h-4 bg-[#F0C85A] rounded-full mt-2" />
              <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg font-semibold text-[#493657]">{step.year}</span>
                  <span className="text-sm font-medium text-[#F0C85A] bg-[#F0C85A]/10 px-3 py-1 rounded-full">
                    {step.text}
                  </span>
                </div>
                <p className="text-[#493657]/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;

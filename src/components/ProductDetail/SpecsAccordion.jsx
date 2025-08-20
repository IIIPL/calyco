import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SpecsAccordion = ({ specs }) => {
  const [openPanel, setOpenPanel] = useState(0);

  const togglePanel = (index) => {
    setOpenPanel(openPanel === index ? -1 : index);
  };

  const getPanelIcon = (title) => {
    const name = title.toLowerCase();
    if (name.includes('application') || name.includes('surface')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      );
    } else if (name.includes('coverage') || name.includes('drying')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    } else if (name.includes('safety')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    } else if (name.includes('storage')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  };

  const specEntries = Object.entries(specs);

  return (
    <div className="text-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Detailed Specifications
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        Comprehensive technical information for professionals and DIY enthusiasts
      </p>

      <div className="max-w-4xl mx-auto space-y-4">
        {specEntries.map(([title, items], index) => {
          const isOpen = openPanel === index;
          
          return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Panel Header */}
              <button
                onClick={() => togglePanel(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                    {getPanelIcon(title)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-600">
                      {items.length} specification{items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 text-gray-400"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              {/* Panel Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-4 space-y-3">
                        {items.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Additional Tips for each section */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <h4 className="text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wide">
                            Pro Tip
                          </h4>
                          <p className="text-xs text-blue-700">
                            {title.toLowerCase().includes('application') && "Always test on a small area first to ensure compatibility"}
                            {title.toLowerCase().includes('coverage') && "Apply in thin, even coats for best results and coverage"}
                            {title.toLowerCase().includes('safety') && "Keep the area well-ventilated and wear appropriate protective gear"}
                            {title.toLowerCase().includes('storage') && "Store in a cool, dry place and keep containers tightly sealed"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Reference */}
      <div className="mt-12 p-6 bg-gray-50 rounded-2xl max-w-2xl mx-auto">
        <h4 className="font-semibold text-gray-800 mb-3">📋 Quick Reference Guide</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 text-left">
          <div>
            <p className="font-medium">Application</p>
            <p className="text-xs">Follow surface prep guidelines for best adhesion</p>
          </div>
          <div>
            <p className="font-medium">Coverage</p>
            <p className="text-xs">Apply 2 coats for optimal durability and color</p>
          </div>
          <div>
            <p className="font-medium">Safety</p>
            <p className="text-xs">Use in well-ventilated areas with proper protection</p>
          </div>
          <div>
            <p className="font-medium">Storage</p>
            <p className="text-xs">Keep sealed and away from extreme temperatures</p>
          </div>
        </div>
      </div>

      {/* Professional Support */}
      <div className="mt-8 p-4 bg-purple-50 rounded-xl max-w-3xl mx-auto">
        <h4 className="font-semibold text-purple-800 mb-2">🛠️ Need Professional Help?</h4>
        <p className="text-sm text-purple-700 mb-3">
          Our technical support team is available to help with application questions, 
          surface preparation, and project planning.
        </p>
        <button className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
          Contact Technical Support
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SpecsAccordion;

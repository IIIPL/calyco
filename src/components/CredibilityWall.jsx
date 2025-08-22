import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Star } from 'lucide-react';

const LogoTile = ({ name, category, icon: IconComponent }) => {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#F0C85A]/20 to-[#5E3A98]/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
          {IconComponent ? (
            <IconComponent className="w-8 h-8 text-[#5E3A98]" />
          ) : (
            <Shield className="w-8 h-8 text-[#5E3A98]" />
          )}
        </div>
        <p className="text-sm font-medium text-[#493657]">{name}</p>
        <p className="text-xs text-[#493657]/60 mt-1">{category}</p>
      </div>
    </motion.div>
  );
};

const FilterChips = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          activeCategory === 'all'
            ? 'bg-[#F0C85A] text-white shadow-md'
            : 'bg-gray-100 text-[#493657] hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-[#F0C85A] text-white shadow-md'
              : 'bg-gray-100 text-[#493657] hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const CredibilityWall = ({ groups = [] }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const defaultGroups = ['Compliance', 'Sustainability', 'Partners'];

  const defaultLogos = [
    { name: "ISO 9001", category: "Compliance", icon: Shield },
    { name: "Green Seal", category: "Sustainability", icon: Award },
    { name: "EPA Certified", category: "Compliance", icon: Shield },
    { name: "Carbon Neutral", category: "Sustainability", icon: Star },
    { name: "BIS Certified", category: "Compliance", icon: Shield },
    { name: "Eco-Friendly", category: "Sustainability", icon: Award },
    { name: "Supplier Partner", category: "Partners", icon: Star },
    { name: "Quality Partner", category: "Partners", icon: Award }
  ];

  const displayGroups = groups.length > 0 ? groups : defaultGroups;
  const displayLogos = defaultLogos;

  const filteredLogos = activeCategory === 'all' 
    ? displayLogos 
    : displayLogos.filter(logo => logo.category === activeCategory);

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
            Certifications & Partners
          </h2>
          <p className="text-lg text-[#493657]/70 max-w-2xl mx-auto leading-relaxed">
            Our commitment to quality, sustainability, and excellence is recognized by leading organizations and partners.
          </p>
        </motion.div>

        {/* Filter Chips */}
        <FilterChips
          categories={displayGroups}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredLogos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <LogoTile 
                name={logo.name}
                category={logo.category}
                icon={logo.icon}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-[#493657]/60 max-w-2xl mx-auto">
            These certifications and partnerships demonstrate our commitment to maintaining the highest standards 
            in sustainable paint manufacturing and environmental responsibility.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CredibilityWall;

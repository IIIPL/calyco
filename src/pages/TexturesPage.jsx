import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import textures, { getTextureCategories } from '../data/textures';
import { getTypographyClasses } from '../data/admin/typography';

const TexturesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = getTextureCategories();

  const filteredTextures = useMemo(() => {
    let filtered = [...textures];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(texture =>
        texture.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        texture.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(texture => texture.category === selectedCategory);
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const handleTextureClick = (texture) => {
    navigate(`/textures/${texture.slug}`);
  };

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/Assets/Texture Images/GPT_Image_1_Sophisticated_living_room_corner_with_textured_acc_0.png"
            alt="Premium textured wall finishes"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`${getTypographyClasses('h1')} font-light drop-shadow-2xl`}
              style={{ textShadow: '0 4px 12px rgba(0,0,0,0.6)' }}
            >
              Premium Textures
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${getTypographyClasses('bodyLarge')} font-light opacity-95 drop-shadow-lg px-4`}
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              Transform your walls with our exclusive range of textured finishes
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search textures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 w-full md:w-auto"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 underline whitespace-nowrap"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Textures Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-8">
            <h2 className={`${getTypographyClasses('h2')} text-gray-900`}>
              Showing {filteredTextures.length} {filteredTextures.length === 1 ? 'Texture' : 'Textures'}
            </h2>
            <p className={`${getTypographyClasses('body')} text-gray-600`}>
              Discover our premium collection of wall textures
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTextures.map((texture, index) => (
              <motion.div
                key={texture.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => handleTextureClick(texture)}
              >
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden group-hover:shadow-xl transition-all duration-300">
                  {/* Texture Image */}
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={texture.image}
                      alt={texture.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.error('Failed to load image:', texture.image);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Texture Info */}
                  <div className="p-5">
                    <h3 className={`${getTypographyClasses('h4')} text-gray-900 group-hover:text-[#5E3A98] transition-colors`}>
                      {texture.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {texture.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {texture.application}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTextures.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No textures found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TexturesPage;

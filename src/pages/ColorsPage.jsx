import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ColorDisclaimer from "../components/ColorComponents/ColorDisclaimer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

// Utility functions
const addSample = (colorSlug) => {
  console.log(`Added sample for ${colorSlug}`);
  if (window.showToast) {
    window.showToast(`Sample added: ${colorSlug}`, "success");
  }
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  if (window.showToast) {
    window.showToast(`Copied: ${text}`, "success");
  }
};

const toggleFavorite = (colorSlug) => {
  const favorites = JSON.parse(localStorage.getItem('colorFavorites') || '[]');
  const newFavorites = favorites.includes(colorSlug) 
    ? favorites.filter(f => f !== colorSlug)
    : [...favorites, colorSlug];
  localStorage.setItem('colorFavorites', JSON.stringify(newFavorites));
  return newFavorites;
};

const getSimilarShades = (currentColor, count = 3) => {
  const sameFamily = CALYCO_PALETTE.filter(c => c.family === currentColor.family && c.slug !== currentColor.slug);
  return sameFamily.slice(0, count);
};

const PopularCarousel = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Colours</h2>
        <div className="flex gap-6 overflow-x-auto pb-6">
          {CALYCO_PALETTE.map((color, index) => (
            <motion.div
              key={color.slug}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-80"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="relative">
                  <div
                    className="w-full h-48"
                    style={{ backgroundColor: color.hex }}
                  />
                  {BEST_SELLERS[color.slug] && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Best Seller
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{color.name}</h3>
                  <p className="text-gray-600 mb-4 font-mono">{color.hex}</p>
                  <button
                    onClick={() => addSample(color.slug)}
                    className="w-full btn-primary py-3 px-6 rounded-xl font-semibold transition-colors"
                  >
                    {SAMPLE_PRICE} Sample
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function ColorsPage() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("color");
  const [filters, setFilters] = useState({ family: null, room: null, mood: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("a-z");
  const [favorites, setFavorites] = useState([]);
  const [showReset, setShowReset] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    document.title = "Calyco Sacred Palette - Our Colors";
    const savedFavorites = JSON.parse(localStorage.getItem('colorFavorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    const hasFilters = filters.family || filters.room || filters.mood || searchQuery;
    setShowReset(hasFilters);
  }, [filters, searchQuery]);

  const filteredColors = CALYCO_PALETTE.filter(color => {
    const matchesFamily = !filters.family || color.family === filters.family;
    const matchesRoom = !filters.room || filters.room === "all-rooms" || color.rooms.includes(filters.room);
    const matchesMood = !filters.mood || color.mood.toLowerCase().includes(filters.mood);
    const matchesSearch = !searchQuery || 
      color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      color.hex.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFamily && matchesRoom && matchesMood && matchesSearch;
  });

  const sortedColors = [...filteredColors].sort((a, b) => {
    if (sortBy === "a-z") return a.name.localeCompare(b.name);
    if (sortBy === "popular") {
      const aPopular = BEST_SELLERS[a.slug] ? 1 : 0;
      const bPopular = BEST_SELLERS[b.slug] ? 1 : 0;
      return bPopular - aPopular;
    }
    return 0;
  });

  const openColorModal = (color) => {
    setSelectedColor(color);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeColorModal = () => {
    setIsModalOpen(false);
    setSelectedColor(null);
    document.body.style.overflow = "auto";
  };

  const handleRoomSelect = (roomSlug) => {
    setFilters(prev => ({ ...prev, room: roomSlug }));
    document.getElementById('color-grid').scrollIntoView({ behavior: 'smooth' });
  };

  const handleFavoriteToggle = (colorSlug) => {
    const newFavorites = toggleFavorite(colorSlug);
    setFavorites(newFavorites);
  };

  const resetFilters = () => {
    setFilters({ family: null, room: null, mood: null });
    setSearchQuery("");
  };

  const ColorModal = () => (
    <AnimatePresence>
      {isModalOpen && selectedColor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeColorModal}
        >
            <motion.div 
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedColor.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedColor.family} • {selectedColor.mood} • {selectedColor.rooms.join(", ")}</p>
                </div>
                <button
                  onClick={closeColorModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div
                    className="w-full h-64 rounded-xl mb-4 relative"
                    style={{ backgroundColor: selectedColor.hex }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm opacity-80">Lifestyle preview</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Hex Code</p>
                        <p className="font-mono text-lg font-semibold">{selectedColor.hex}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Family</p>
                        <p className="font-semibold">{selectedColor.family}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Mood</p>
                        <p className="font-semibold">{selectedColor.mood}</p>
                      </div>
              </div>
              
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Recommended Rooms</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedColor.rooms.map((room) => (
                          <span key={room} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {room}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        closeColorModal();
                        navigate(`/visualizer?color=${selectedColor.slug}`);
                      }}
                      className="w-full btn-primary py-3 px-6 rounded-xl font-semibold transition-colors"
                    >
                      Try in Visualizer
                    </button>
                    <button
                      onClick={() => {
                        addSample(selectedColor.slug);
                        closeColorModal();
                      }}
                      className="w-full btn-gold py-3 px-6 rounded-xl font-semibold transition-colors"
                    >
                      {SAMPLE_PRICE} Sample
                    </button>
                    <button
                      onClick={() => {
                        console.log("Open size selector for", selectedColor.slug);
                      }}
                      className="w-full bg-gray-100 text-gray-400 py-3 px-6 rounded-xl font-semibold cursor-not-allowed"
                    >
                      Buy now
                    </button>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">Similar shades</h4>
                    <div className="flex gap-3">
                      {getSimilarShades(selectedColor).map((color) => (
                        <button
                          key={color.slug}
                          onClick={() => {
                            setSelectedColor(color);
                          }}
                          className="w-16 h-16 rounded-lg shadow-md border-2 border-white hover:border-calyco-purple transition-colors"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-linen-white pt-20">
      {/* Page Header */}
      <div className="bg-white border-b border-grey-mist py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-charcoal-black mb-2">Calyco Sacred Palette</h1>
              <p className="text-grey-thunder">{sortedColors.length} colours</p>
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-grey-mist rounded-lg text-sm focus:ring-2 focus:ring-calyco-purple focus:border-transparent"
              >
                <option value="a-z">A–Z</option>
                <option value="popular">Popular</option>
              </select>
              
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid" 
                      ? "bg-white text-charcoal-black shadow-sm" 
                      : "text-grey-thunder hover:text-charcoal-black"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list" 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </motion.div>
            
            {/* Enhanced Image Section */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/Assets/color-banner.png"
                  className="w-full h-auto object-cover"
                  alt="Calyco Paint Collection"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Color Palette Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2 justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#F0C85A] border-2 border-white shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full bg-[#493657] border-2 border-white shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full bg-[#E6B84A] border-2 border-white shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full bg-[#5a4067] border-2 border-white shadow-lg"></div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "room" && (
                  <motion.div
                key="room"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              >
                {ROOM_CATEGORIES.map((room) => (
                  <button
                    key={room.slug}
                    onClick={() => setFilters(prev => ({ ...prev, room: prev.room === room.slug ? null : room.slug }))}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] group transition-all duration-300 ${
                      filters.room === room.slug ? "ring-2 ring-calyco-purple" : ""
                    }`}
                  >
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-medium">{room.name}</p>
                    </div>
                  </button>
                ))}
                  </motion.div>
                )}

            {activeTab === "mood" && (
              <motion.div
                key="mood"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {MOOD_CATEGORIES.map((mood) => (
                  <button
                    key={mood.slug}
                    onClick={() => setFilters(prev => ({ ...prev, mood: prev.mood === mood.slug ? null : mood.slug }))}
                    className={`bg-gradient-to-br ${mood.gradient} rounded-xl p-6 text-center transition-all duration-300 ${
                      filters.mood === mood.slug ? "ring-2 ring-calyco-purple" : ""
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{mood.name}</h3>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {showReset && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Clear filters
            </motion.button>
          )}
        </div>
      </div>

      {/* Colors Grid */}
      <div id="color-grid" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {sortedColors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No matches. Clear filters to see all 8 colours.</p>
        </div>
          ) : (
            <div className={`grid gap-4 md:gap-8 ${
              viewMode === "grid" 
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                : "grid-cols-1"
            }`}>
              {sortedColors.map((color, index) => (
          <motion.div 
                  key={color.slug}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
            viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
                    <div className="relative">
                      <div
                        className={`w-full ${viewMode === "grid" ? "aspect-square" : "h-32"} relative ${
                          color.hex === "#EFE8DA" ? "border border-gray-200" : ""
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              openColorModal(color);
                            }}
                            className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium hover:bg-white transition-colors flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Quick view
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addSample(color.slug);
                            }}
                            className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium hover:bg-white transition-colors"
                          >
                            {SAMPLE_PRICE} Sample
                          </button>
                        </div>
                      </div>
            </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{color.name}</h3>
                      <p className="text-sm text-gray-600 font-mono mb-3">{color.hex}</p>
                      
                      <div className="space-y-2">
                        <button
                          onClick={() => navigate(`/visualizer?color=${color.slug}`)}
                          className="w-full text-left text-sm text-calyco-purple hover:text-calyco-gold transition-colors"
                        >
                          See in room →
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyToClipboard(color.hex)}
                            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            Copy HEX
                          </button>
                          <button
                            onClick={() => handleFavoriteToggle(color.slug)}
                            className={`text-sm transition-colors ${
                              favorites.includes(color.slug) 
                                ? "text-red-500 hover:text-red-600" 
                                : "text-gray-600 hover:text-red-500"
                            }`}
                          >
                            ♥ Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </div>

      {/* Popular Carousel */}
      <div className="bg-white">
        <PopularCarousel />
        </div>
        <ColorExplore/>
        
        {/* Filter Bar */}
        
       
       
      </div>
    </div>
  );
}
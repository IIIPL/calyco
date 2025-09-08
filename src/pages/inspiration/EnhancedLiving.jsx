import React, { useState } from "react";
import { motion } from "framer-motion";
import RoomCategoryNav from "../../components/RoomCategoryNav";
import { ChevronLeftIcon, HeartIcon, ShareIcon, StarIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import RoomInspiration from "../../components/RoomInspiration";
import { roomData } from "../../data/roomData";
import { filterRoomsByFamily } from "../../utils/filterRooms";
import { flatColors } from "../../data/flatColors";
import PopularColorsGrid from "../../components/PopularColorsGrid";

const findColor = (name) =>
  name ? flatColors.find(c => c.name?.toLowerCase() === name.toLowerCase()) || null : null;

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FEATURED_COLORS = [
  { name: "Warm Beige", hex: "#F5F5DC", description: "Perfect for creating a cozy atmosphere" },
  { name: "Sage Green", hex: "#9CAF88", description: "Brings nature indoors" },
  { name: "Soft Gray", hex: "#D3D3D3", description: "Timeless and sophisticated" },
  { name: "Cream", hex: "#FFFDD0", description: "Warm and inviting" },
  { name: "Navy Blue", hex: "#000080", description: "Adds depth and drama" },
  { name: "Taupe", hex: "#483C32", description: "Elegant and versatile" }
];

export default function EnhancedLivingRoomInspiration() {
  const navigate = useNavigate();
  const filteredRooms = filterRoomsByFamily("living-room", roomData);
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div className="font-poppins bg-white min-h-screen pt-20">

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src="https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/livingroomHero_vvdi6l.jpg"
          alt="Living Room Inspiration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              LIVING ROOM INSPIRATION
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Make your living room the heart of your home with inspiring color ideas.
            </motion.p>
          </div>
        </div>
      </div>

      <RoomCategoryNav currentRoom="living" />

      {/* Featured Colors Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              FEATURED COLORS FOR LIVING ROOMS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most popular and versatile colors that work beautifully in living room spaces.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_COLORS.map((color, index) => (
              <motion.div
                key={color.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedColor(color)}
              >
                <div className="h-32" style={{ backgroundColor: color.hex }}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{color.name}</h3>
                  <p className="text-gray-600 mb-4">{color.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-gray-500">{color.hex}</span>
                    <button className="text-blue-600 font-medium text-sm hover:text-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Inspiration Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              LIVING ROOM DESIGNS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated collection of living room designs and color combinations.
            </p>
          </motion.div>

          <div className="space-y-20">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((block, index) => {
                const firstShot = block.shots?.[0];
                return (
                  <motion.div
                    key={block.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                  >
                    <RoomInspiration
                      title={block.name}
                      description={block.description}
                      imageUrl={firstShot?.image || ""}
                      colors={(firstShot?.colors || []).map(findColor).filter(Boolean)}
                      to={`/room/${block.name.toLowerCase().replace(/\s+/g, "-")}`}
                    />
                  </motion.div>
                );
              })
            ) : (
              <div className="max-w-4xl mx-auto pt-24 pb-12 px-4">
                <p className="text-lg text-gray-700 text-center">
                  Beautiful living room inspiration coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Color Selection Modal */}
      {selectedColor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl p-8 max-w-md w-full"
          >
            <div className="text-center">
              <div 
                className="w-full h-32 rounded-lg mb-6"
                style={{ backgroundColor: selectedColor.hex }}
              ></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedColor.name}</h3>
              <p className="text-gray-600 mb-4">{selectedColor.description}</p>
              <p className="text-sm font-mono text-gray-500 mb-6">{selectedColor.hex}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedColor(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    navigate(`/colors/${selectedColor.name.toLowerCase().replace(/\s+/g, '-')}`);
                    setSelectedColor(null);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View Color
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Popular Colors Section */}
      <PopularColorsGrid />
    </div>
  );
}

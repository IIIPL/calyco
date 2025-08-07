
import React from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import RoomInspiration from "../../components/RoomInspiration";
import { getRoomsByCategory } from "../../data/roomData";
import { flatColors } from "../../data/flatColors";
import { motion } from "framer-motion";

// Helper to find color by name in flatColors (case-insensitive)
const findColor = (name) => {
  if (!name) return null;
  return flatColors.find(
    (c) => c.name && c.name.toLowerCase() === name.toLowerCase()
  ) || null;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BedroomInspiration() {
  // Get filtered rooms based on 'bedroom' family
  const filteredRooms = getRoomsByCategory("bedroom");

  return (
    <div className="font-poppins bg-white min-h-screen pt-20">
      {/* Top Image (full-width edge-to-edge) */}
      <div className="w-full overflow-hidden">
        <img
          src="/Assets/inspiration.png"
          alt="Bedroom Inspiration"
          className="w-full h-64 md:h-[28rem] object-cover"
        />
      </div>

      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#393939] mb-6 tracking-tight text-center">
          BEDROOM INSPIRATION
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed">
          Choosing a bedroom paint color is about creating your personal sanctuary. Our bedroom inspiration gallery helps you explore colors by mood, style, and palette to spark ideas and bring your dream retreat to life.
        </p>
      </div>

      {/* Animated Room Blocks */}
      <div className="space-y-20 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((block, i) => (
            <motion.div
              key={block.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              {/* Wrap the RoomInspiration in a Link to navigate to individual page */}
              <Link to={`/room/${block.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <RoomInspiration
                  title={block.name}
                  description={block.description}
                  imageUrl={block.image}
                  colors={block.colors.map(findColor).filter(Boolean)}  // Mapping colors dynamically
                />
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="max-w-4xl mx-auto pt-24 pb-12 px-4">
            <p className="text-lg text-gray-700 text-center">
              Beautiful bedroom inspiration coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

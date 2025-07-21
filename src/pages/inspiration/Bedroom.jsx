import React from "react";
import RoomInspiration from "../../components/RoomInspiration";
import { colorGroups } from "../../data/colorGroups";
import { motion } from "framer-motion";

export default function BedroomInspiration() {
  // Helper to find color by name in colorGroups
  const findColor = (name) => {
    for (const group of colorGroups) {
      const found = group.colors.find((c) => c.name === name);
      if (found) return found;
    }
    return null;
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

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
        {[{
          title: "Blue Calm & Collected Bedroom",
          description: "A serene blue palette creates a peaceful retreat, perfect for unwinding after a long day.",
          imageUrl: "/Assets/inspiration.png",
          colors: ["Monsoon Cloud", "Lotus Lake", "Indigo Night"]
        }, {
          title: "Modern Minimalist Bedroom",
          description: "Clean lines and soft neutrals make this bedroom a modern sanctuary.",
          imageUrl: "/Assets/InteriorInspiratoin/6f230793e6001ad681b2e5b8f447e87e.jpg",
          colors: ["Ivory Mist", "Almond Silk", "Cream Sandal"]
        }, {
          title: "Warm Earthy Bedroom",
          description: "Earth tones and natural textures create a cozy, inviting space for rest and relaxation.",
          imageUrl: "/Assets/InteriorInspiratoin/9e4b7d64c952697f8db4991ae2dea822.jpg",
          colors: ["Terracotta Tile", "Amber Soil", "Sienna Path"]
        }].map((block, i) => (
          <motion.div
            key={block.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <RoomInspiration
              title={block.title}
              description={block.description}
              imageUrl={block.imageUrl}
              colors={block.colors.map(findColor).filter(Boolean)}
            />
          </motion.div>
        ))}
      </div>

      {/* Coming Soon Placeholder */}
      <div className="max-w-4xl mx-auto pt-24 pb-12 px-4">
        <p className="text-lg text-gray-700 text-center">
          Beautiful bedroom inspiration coming soon...
        </p>
      </div>
    </div>
  );
}

import React from "react";
import RoomInspiration from "../../components/RoomInspiration";
import { colorGroups } from "../../data/colorGroups";
import { motion } from "framer-motion";

export default function BathroomInspiration() {
  // Helper to find color by name in colorGroups
  const findColor = (name) => {
    for (const group of colorGroups) {
      const found = group.colors.find((c) => c.name === name);
      if (found) return found;
    }
    return null;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="font-poppins bg-white min-h-screen pt-20">
      {/* Top Image (full-width edge-to-edge) */}
      <div className="w-screen overflow-hidden">
        <img
          src="/Assets/inspiration.png"
          alt="Bathroom Inspiration"
          className="w-full h-64 md:h-[28rem] object-cover"
        />
      </div>
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#393939] mb-6 tracking-tight text-center">
          BATHROOM INSPIRATION
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed">
          Refresh your bathroom with color inspiration from our gallery. Browse ideas by color family, mood, and style to create a spa-like retreat at home.
        </p>
      </div>
      {/* Animated Room Blocks */}
      <div className="space-y-20 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {[{
          title: "Spa Retreat Bathroom",
          description: "Soft blues and whites create a calming, spa-like atmosphere for ultimate relaxation.",
          imageUrl: "/Assets/inspiration.png",
          colors: ["Ivory Mist", "Monsoon Cloud", "Lotus Lake"]
        }, {
          title: "Modern Minimalist Bathroom",
          description: "Clean lines and neutral tones make this bathroom a modern oasis.",
          imageUrl: "/Assets/InteriorInspiratoin/246d8e61e4ce85cbe537a88c28805da0.jpg",
          colors: ["Almond Silk", "Ash Mist", "Steel"]
        }, {
          title: "Earthy Natural Bathroom",
          description: "Earth tones and natural textures bring warmth and comfort to your bathroom space.",
          imageUrl: "/Assets/InteriorInspiratoin/3b6eb3fd6ab19ad05601095e36a5883f.jpg",
          colors: ["Terracotta Tile", "Amber Soil", "Sage Leaf"]
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
          Beautiful bathroom inspiration coming soon...
        </p>
      </div>
    </div>
  );
} 
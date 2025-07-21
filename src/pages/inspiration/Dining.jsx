import React from "react";
import RoomInspiration from "../../components/RoomInspiration";
import { colorGroups } from "../../data/colorGroups";
import { motion } from "framer-motion";

export default function DiningInspiration() {
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
      <div className="w-full overflow-hidden">
        <img
          src="/Assets/inspiration.png"
          alt="Dining Room Inspiration"
          className="w-full h-64 md:h-[28rem] object-cover"
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#393939] mb-6 tracking-tight text-center">
          DINING ROOM INSPIRATION
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed">
          Set the mood for memorable meals with dining room color inspiration. Explore palettes, moods, and styles to make your dining space truly special.
        </p>
      </div>
      <div className="space-y-20 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {[{
          title: "Elegant Neutrals Dining Room",
          description: "Warm neutrals and soft lighting create a sophisticated dining experience.",
          imageUrl: "/Assets/InteriorInspiratoin/6f46f7bdbbea0ff00053bae22a141dde.jpg",
          colors: ["Ivory Mist", "Desert Beige", "Honey Silk"]
        }, {
          title: "Vibrant Family Dining",
          description: "Bright colors and playful accents make this dining room perfect for family gatherings.",
          imageUrl: "/Assets/inspiration.png",
          colors: ["Marigold", "Coral Blush", "Sunbeam"]
        }, {
          title: "Modern Minimalist Dining",
          description: "Clean lines and a monochrome palette for a modern, stylish dining space.",
          imageUrl: "/Assets/InteriorInspiratoin/5b6db6803a8ba65a869d3a5507519b18.jpg",
          colors: ["Ash Mist", "Steel", "Charcoal"]
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
      <div className="max-w-4xl mx-auto pt-24 pb-12 px-4">
        <p className="text-lg text-gray-700 text-center">
          Beautiful dining room inspiration coming soon...
        </p>
      </div>
    </div>
  );
} 
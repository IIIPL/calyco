import React from "react";
import RoomInspiration from "../../components/RoomInspiration";
import { colorGroups } from "../../data/colorGroups";
import { motion } from "framer-motion";

export default function LivingInspiration() {
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
      <div className="w-screen overflow-hidden">
        <img
          src="/Assets/inspiration.png"
          alt="Living Room Inspiration"
          className="w-full h-64 md:h-[28rem] object-cover"
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#393939] mb-6 tracking-tight text-center">
          LIVING ROOM INSPIRATION
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed">
          Selecting a living room paint color can be a difficult task. With our living room inspiration gallery, you can browse paint colors by color family, mood, and style to draw inspiration and begin to bring your vision to life.
        </p>
      </div>
      <div className="space-y-20 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {[{
          title: "Cozy Neutrals Living Room",
          description: "Warm neutrals and soft textures create a welcoming, relaxing space.",
          imageUrl: "/Assets/InteriorInspiratoin/header-inspiration-living-b-mobile.jpg",
          colors: ["Ivory Mist", "Desert Beige", "Honey Silk"]
        }, {
          title: "Modern Minimalist Living Room",
          description: "Clean lines and a monochrome palette for a modern, stylish living room.",
          imageUrl: "/Assets/inspiration.png",
          colors: ["Ash Mist", "Steel", "Charcoal"]
        }, {
          title: "Colorful Accent Living Room",
          description: "Bold accent walls and playful colors add vibrancy and personality.",
          imageUrl: "/Assets/InteriorInspiratoin/IMG_20250626_171044.jpg",
          colors: ["Marigold", "Coral Blush", "Aqua Pop"]
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
          Beautiful living room inspiration coming soon...
        </p>
      </div>
    </div>
  );
} 
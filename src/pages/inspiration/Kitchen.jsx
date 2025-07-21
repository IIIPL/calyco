import React from "react";
import RoomInspiration from "../../components/RoomInspiration";
import { colorGroups } from "../../data/colorGroups";
import { motion } from "framer-motion";

export default function KitchenInspiration() {
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
          alt="Kitchen Inspiration"
          className="w-full h-64 md:h-[28rem] object-cover"
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#393939] mb-6 tracking-tight text-center">
          KITCHEN INSPIRATION
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed">
          Discover kitchen color ideas and inspiration to create a space that's both beautiful and functional. Browse our gallery for color palettes, moods, and styles to spark your creativity.
        </p>
      </div>
      <div className="space-y-20 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {[{
          title: "Fresh & Bright Kitchen",
          description: "Crisp whites and cheerful yellows make the kitchen feel open and inviting.",
          imageUrl: "/Assets/InteriorInspiratoin/header-inspiration-kitchen-a-mobile.jpg",
          colors: ["Ivory Mist", "Marigold", "Lemon Zest"]
        }, {
          title: "Modern Minimalist Kitchen",
          description: "Sleek greys and whites for a clean, modern kitchen look.",
          imageUrl: "/Assets/inspiration.png",
          colors: ["Ash Mist", "Steel", "Silver Veil"]
        }, {
          title: "Earthy Natural Kitchen",
          description: "Warm earth tones and greens create a cozy, organic kitchen vibe.",
          imageUrl: "/Assets/InteriorInspiratoin/IMG_20250626_171034.jpg",
          colors: ["Amber Soil", "Sage Leaf", "Neem Green"]
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
          Beautiful kitchen inspiration coming soon...
        </p>
      </div>
    </div>
  );
} 
import React from "react";
import RoomInspiration from "../../components/RoomInspiration";
import { colorGroups } from "../../data/colorGroups";
import { motion } from "framer-motion";

export default function HallwayInspiration() {
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
          alt="Hallway Inspiration"
          className="w-full h-64 md:h-[28rem] object-cover"
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#393939] mb-6 tracking-tight text-center">
          HALLWAY INSPIRATION
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed">
          Make a great first impression with hallway color inspiration. Browse our gallery for ideas to brighten and personalize your home's entryways and corridors.
        </p>
      </div>
      <div className="space-y-20 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {[{
          title: "Bright & Airy Hallway",
          description: "Light colors open up the space and create a welcoming entry.",
          imageUrl: "/Assets/InteriorInspiratoin/d265f31e90793c34ee61cbb88975d709.jpg",
          colors: ["Ivory Mist", "Lotus Petal", "Rice Paper"]
        }, {
          title: "Colorful Accent Hallway",
          description: "Bold accent walls add personality and vibrancy to your hallway.",
          imageUrl: "/Assets/inspiration.png",
          colors: ["Marigold", "Coral Blush", "Aqua Pop"]
        }, {
          title: "Modern Minimalist Hallway",
          description: "Sleek greys and whites for a clean, modern look.",
          imageUrl: "/Assets/InteriorInspiratoin/d88428f84d37e90e9913c30c8a97b258.jpg",
          colors: ["Ash Mist", "Steel", "Silver Veil"]
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
          Beautiful hallway inspiration coming soon...
        </p>
      </div>
    </div>
  );
} 
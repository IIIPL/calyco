import React from "react";
import RoomInspiration from "../../components/RoomInspiration";
import { colorGroups } from "../../data/colorGroups";
import { motion } from "framer-motion";

export default function ExteriorInspiration() {
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
          alt="House Exterior Inspiration"
          className="w-full h-64 md:h-[28rem] object-cover"
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#393939] mb-6 tracking-tight text-center">
          HOUSE EXTERIOR INSPIRATION
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed">
          Enhance your home's curb appeal with exterior color inspiration. Explore our gallery for ideas to make your house stand out on the block.
        </p>
      </div>
      <div className="space-y-20 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {[{
          title: "Classic White Facade",
          description: "Timeless white and cream tones for a clean, elegant exterior look.",
          imageUrl: "/Assets/InteriorInspiratoin/73c85444a1eb9b8491a74d360aed4c63.jpg",
          colors: ["Ivory Mist", "Coconut Milk", "Pearl Drop"]
        }, {
          title: "Bold Modern Exterior",
          description: "Striking blues and greys for a contemporary, standout home.",
          imageUrl: "/Assets/inspiration.png",
          colors: ["Monsoon Cloud", "Steel", "Indigo Night"]
        }, {
          title: "Warm Earthy Exterior",
          description: "Earthy browns and ochres blend beautifully with natural surroundings.",
          imageUrl: "/Assets/InteriorInspiratoin/aa05e9ace0cc420deb71ab7dd26804ba.jpg",
          colors: ["Terracotta Tile", "Amber Soil", "Ochre Earth"]
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
          Beautiful house exterior inspiration coming soon...
        </p>
      </div>
    </div>
  );
} 
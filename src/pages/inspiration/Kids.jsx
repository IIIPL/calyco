import React from "react";
import RoomInspiration from "../../components/RoomInspiration";
import { colorGroups } from "../../data/colorGroups";
import { motion } from "framer-motion";

export default function KidsInspiration() {
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
          alt="Kids Room Inspiration"
          className="w-full h-64 md:h-[28rem] object-cover"
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#393939] mb-6 tracking-tight text-center">
          KIDS ROOM INSPIRATION
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed">
          Spark imagination and fun with kids room color inspiration. Browse ideas for playful palettes and creative styles to make their space special.
        </p>
      </div>
      <div className="space-y-20 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {[{
          title: "Playful Pastels Kids Room",
          description: "Soft pastels and whimsical accents create a fun, inviting space for kids.",
          imageUrl: "/Assets/InteriorInspiratoin/header-inspiration-kids-b-mobile.jpg",
          colors: ["Blush Petal", "Mint Pop", "Sky Splash"]
        }, {
          title: "Bright & Bold Kids Room",
          description: "Vivid brights and energetic colors inspire creativity and play.",
          imageUrl: "/Assets/inspiration.png",
          colors: ["Sunbeam", "Aqua Pop", "Coral Crush"]
        }, {
          title: "Nature-Inspired Kids Room",
          description: "Greens and earth tones bring the outdoors in for a calming, natural vibe.",
          imageUrl: "/Assets/InteriorInspiratoin/IMG_20250626_171022.jpg",
          colors: ["Sage Leaf", "Neem Green", "Amber Soil"]
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
          Beautiful kids room inspiration coming soon...
        </p>
      </div>
    </div>
  );
} 
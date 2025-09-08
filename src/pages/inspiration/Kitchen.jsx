import React from "react";
import RoomInspiration from "../../components/RoomInspiration";
import { roomData } from "../../data/roomData";
import { filterRoomsByFamily } from "../../utils/filterRooms";
import { motion } from "framer-motion";
import RoomCategoryNav from "../../components/RoomCategoryNav";
import { findColorComprehensive } from "../../utils/colorMapping";
import PopularColorsGrid from "../../components/PopularColorsGrid";

const findColor = (name) => findColorComprehensive(name, "kitchen");

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function KitchenInspiration() {
  const filteredRooms = filterRoomsByFamily("kitchen", roomData);

  return (
    <div className="font-poppins bg-white min-h-screen pt-20">
      {/* Top Banner Image */}
      <div className="w-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/KitchenHero_a8fyfn.jpg"
          alt="Kitchen Inspiration"
          className="w-full h-[500px] object-cover"
        />
      </div>

      <RoomCategoryNav currentRoom="kitchen" />

      {/* Title + Description */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#393939] mb-6 tracking-tight text-center">
          KITCHEN INSPIRATION
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed">
          Discover kitchen color ideas and inspiration to create a space that's both beautiful and functional. Browse our gallery for color palettes, moods, and styles to spark your creativity.
        </p>
      </div>


      {/* Room Blocks (like Hallway) */}
      <div className="space-y-20 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((block) => {
            const firstShot = block.shots?.[0];
            const mappedColors = (firstShot?.colors || []).map(findColor).filter(Boolean);
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
                  colors={mappedColors}
                  to={`/room/${block.name.toLowerCase().replace(/\s+/g, "-")}`}
                />
              </motion.div>
            );
          })
        ) : (
          <div className="max-w-4xl mx-auto pt-24 pb-12 px-4">
            <p className="text-lg text-gray-700 text-center">
              Beautiful kitchen inspiration coming soon...
            </p>
          </div>
        )}
      </div>

      {/* Popular Colors Section */}
      <PopularColorsGrid />
    </div>
  );
}

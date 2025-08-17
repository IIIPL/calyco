import React from "react";
import RoomInspiration from "../../components/RoomInspiration";
import { roomData } from "../../data/roomData";
import { filterRoomsByFamily } from "../../utils/filterRooms";
import { flatColors } from "../../data/flatColors";
import { motion } from "framer-motion";
import RoomCategoryNav from "../../components/RoomCategoryNav";

const findColor = (name) =>
  name ? flatColors.find(c => c.name?.toLowerCase() === name.toLowerCase()) || null : null;

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BedroomInspiration() {
  const filteredRooms = filterRoomsByFamily("bedroom", roomData);

  return (
    <div className="font-poppins bg-white min-h-screen pt-20">
      {/* Top Banner Image — DO NOT TOUCH */}
      <div className="w-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/bedroomHero_blfz2c.jpg"
          alt="CALYCO bedroom design inspiration — cozy bedroom with warm lighting and comfortable furnishings"
          className="w-full h-64 md:h-[28rem] object-cover"
        />
      </div>

      <RoomCategoryNav currentRoom="bedroom" />

      {/* Title + Description */}
      <div className="mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl px-3 sm:px-6 md:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#393939] mb-4 sm:mb-6 tracking-tight text-center">
          BEDROOM INSPIRATION
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed max-w-3xl md:max-w-4xl mx-auto">
          Create a personal sanctuary with bedroom color inspiration. Explore tones and styles that make your space calm, cozy, and uniquely yours.
        </p>
      </div>

      {/* Room Blocks */}
      <div className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-7xl px-3 sm:px-6 md:px-8 space-y-12 sm:space-y-16 md:space-y-20">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((block) => {
            const firstShot = block.shots?.[0];
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
                  colors={(firstShot?.colors || []).map(findColor).filter(Boolean)}
                  to={`/room/${block.name.toLowerCase().replace(/\s+/g, "-")}`}
                />
              </motion.div>
            );
          })
        ) : (
          <div className="max-w-4xl mx-auto pt-16 sm:pt-24 pb-10 sm:pb-12 px-4">
            <p className="text-base sm:text-lg text-gray-700 text-center">
              Beautiful bedroom inspiration coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

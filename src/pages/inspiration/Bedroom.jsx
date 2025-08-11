import React from "react";
import RoomInspiration from "../../components/RoomInspiration";
import { roomData } from "../../data/roomData";
import { filterRoomsByFamily } from "../../utils/filterRooms";
import { flatColors } from "../../data/flatColors";
import { motion } from "framer-motion";

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
      {/* Top Banner Image */}
      <div className="w-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/bedroomHero_blfz2c.jpg"
          alt="Bedroom Inspiration"
          className="w-full h-64 md:h-[28rem] object-cover"
        />
      </div>

      {/* Title + Description */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#393939] mb-6 tracking-tight text-center">
          BEDROOM INSPIRATION
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed">
          Create a personal sanctuary with bedroom color inspiration. Explore tones and styles that make your space calm, cozy, and uniquely yours.
        </p>
      </div>

      {/* Room Blocks */}
      <div className="space-y-20 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
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
          <div className="max-w-4xl mx-auto pt-24 pb-12 px-4">
            <p className="text-lg text-gray-700 text-center">
              Beautiful bedroom inspiration coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

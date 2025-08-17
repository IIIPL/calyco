import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';

const RoomGalleryCard = ({ room, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
        {/* Room Image */}
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={room.image}
            alt={`${room.title} room design inspiration`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{room.title}</h3>
            <p className="text-sm mb-4 opacity-90">{room.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{room.designs} designs</span>
              <ChevronRightIcon className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Color Palette Preview */}
        <div className="absolute top-4 right-4 flex space-x-1">
          {room.colors.map((color, colorIndex) => (
            <div
              key={colorIndex}
              className="w-6 h-6 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
              <HeartIcon className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
              <ShareIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Room Info */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{room.description}</p>
                          <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">{room.designs} designs</span>
                    <div className="flex items-center text-[#493657] font-medium text-sm">
                      Explore
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </div>
                  </div>
      </div>
    </motion.div>
  );
};

export default RoomGalleryCard;

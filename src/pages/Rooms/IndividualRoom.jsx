// src/pages/IndividualRoomPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { roomData } from "../../data/roomData";
import { flatColors } from "../../data/flatColors";

const findColor = (name) => flatColors.find((c) => c.name === name);

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-&]+/g, "")
    .replace(/\-\-+/g, "-");

export default function IndividualRoomPage() {
  const [comboOpen, setComboOpen] = useState(false);
  const { roomName } = useParams();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [room, setRoom] = useState(null);
  const [shotIndex, setShotIndex] = useState(0);
  const currentShot = room?.shots?.[shotIndex] || null;

  useEffect(() => {
    const foundRoom = roomData.find(
      (r) => r.name.toLowerCase().replace(/\s+/g, "-") === roomName
    );
    setRoom(foundRoom);
    setShotIndex(0);
    setImageLoaded(false);
  }, [roomName]);

  useEffect(() => {
    setImageLoaded(false);
  }, [shotIndex]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const zoomIn = {
    hidden: { scale: 0.98, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  if (!room) {
    return (
      <motion.div
        className="font-poppins bg-white min-h-screen flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="text-center px-4">
          <div className="text-8xl mb-4">🛋️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#393939] mb-4">
            Room Not Found
          </h1>
          <p className="text-lg md:text-xl text-[#666] mb-8">
            We couldn't find the room you're looking for. Please check the URL or return to our gallery.
          </p>
          <Link
            to="/rooms"
            className="inline-block px-8 py-3 bg-[#393939] text-white rounded-lg hover:bg-[#222] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#393939]"
          >
            Browse All Rooms
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="font-poppins bg-white min-h-screen pt-20">
      {/* Title */}
      <motion.div
        className="mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-[#393939] tracking-tight text-center">
          {room.name}
        </h1>
      </motion.div>

      {/* IMAGE with swatch overlay INSIDE the image container */}
      <motion.div
        className="w-full max-w-none mx-auto px-0 mb-0"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div
          id="room-hero"
          className="relative w-full h-screen flex justify-center items-center"
          initial="hidden"
          animate="visible"
          variants={zoomIn}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 w-full h-screen bg-gray-200 animate-pulse pointer-events-none"/>
          )}

          {currentShot ? (
            <motion.img
              src={currentShot.image}
              alt={`${room.name} - Color combination ${shotIndex + 1}`}
              className={`w-full h-screen max-w-[100vw] max-h-[100vh] object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="w-full max-h-[28rem] flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500 text-lg">No image available</p>
            </div>
          )}

          {/* Swatch overlay: sits ABOVE the image at its bottom, does not affect layout size */}
          {currentShot && (
            <div
              className="
                absolute bottom-3 left-1/2 -translate-x-1/2
                max-w-[92%] md:max-w-[80%]
                bg-white/90 backdrop-blur
                border border-gray-200 shadow-lg
                rounded-xl px-3 py-2
                flex items-center gap-2 overflow-x-auto
              "
              aria-label="Colors used in this shot"
            >
              {(currentShot.colors || []).map((color, i) => {
                const colorObj = findColor(color);
                if (!colorObj) {
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2 py-1 rounded-md bg-gray-100 border border-gray-200"
                      title={`${color} (Not available)`}
                    >
                      <span className="w-5 h-5 rounded-sm bg-gray-300 ring-1 ring-black/5" />
                      <span className="text-xs text-gray-600 whitespace-nowrap">
                        {color}
                      </span>
                    </div>
                  );
                }

                const colorFamily = slugify(
                  colorObj.color_family.toLowerCase()
                );
                const colorName = slugify(colorObj.name.toLowerCase());

                return (
                  <Link
                    key={i}
                    to={`/colors/family/${colorFamily}/${colorName}`}
                    className="flex items-center gap-2 px-2 py-1 rounded-md border border-gray-200 hover:border-gray-300 bg-white transition"
                    title={`${colorObj.name} • ${colorObj.hex}`}
                  >
                    <span
                      className="w-5 h-5 rounded-sm shadow-sm ring-1 ring-black/5"
                      style={{ backgroundColor: colorObj.hex }}
                    />
                    <span className="text-xs text-[#393939] whitespace-nowrap">
                      {colorObj.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* DESCRIPTION */}
      <p className="text-base sm:text-lg md:text-xl mt-10 text-[#393939] text-center leading-relaxed max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        {room.description}
      </p>

      {/* COLOR COMBINATIONS SELECTOR — stays at bottom */}
      {room.shots?.length > 0 && (
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-8 mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex items-center justify-end">
            <h2 className="text-lg md:text-xl font-semibold text-[#393939] mx-10">
              Color Combinations
            </h2>

            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setComboOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white shadow-sm hover:shadow transition border-gray-200"
                aria-haspopup="listbox"
                aria-expanded={comboOpen}
              >
                <div className="flex -space-x-1">
                  {(currentShot?.colors || []).slice(0, 5).map((c, idx) => {
                    const obj = findColor(c);
                    return (
                      <span
                        key={idx}
                        className="w-5 h-5 rounded-sm border border-gray-300"
                        style={{ backgroundColor: obj?.hex || "#ddd" }}
                        title={c}
                      />
                    );
                  })}
                </div>
                <svg width="16" height="16" viewBox="0 0 20 20" className="text-gray-600">
                  <path
                    fill="currentColor"
                    d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z"
                  />
                </svg>
              </button>

              {comboOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 z-20 mt-2 w-64 max-h-64 overflow-auto rounded-lg border bg-white shadow-lg p-2"
                >
                  {room.shots.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setShotIndex(i);
                        setComboOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-50 focus:bg-gray-50 transition ${
                        i === shotIndex ? "ring-2 ring-[#393939]/30" : ""
                      }`}
                      aria-selected={i === shotIndex}
                    >
                      <div className="flex gap-1">
                        {(s.colors || []).slice(0, 5).map((c, idx) => {
                          const obj = findColor(c);
                          return (
                            <span
                              key={idx}
                              className="w-5 h-5 rounded-sm border border-gray-300"
                              style={{ backgroundColor: obj?.hex || "#ddd" }}
                              title={c}
                            />
                          );
                        })}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* CTA */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mb-16"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-[#393939] mb-4 text-center">
            Try This Room Yourself
          </h2>
          <p className="text-center text-[#666] mb-6 max-w-2xl mx-auto">
            Visualize these colors in your own space with our interactive room visualizer tool.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={`/room-visualization`}
              className="px-6 py-3 bg-[#393939] text-white rounded-lg hover:bg-[#222] transition-colors duration-300 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#393939]"
            >
              Try in Room Visualizer
            </Link>
            <button
              className="px-6 py-3 bg-white text-[#393939] border border-[#393939] rounded-lg hover:bg-gray-50 transition-colors duration-300 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#393939]"
              onClick={() => {
                alert("Download/share functionality would be implemented here");
              }}
            >
              Save & Share
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ✅ Unified InspirationsDropdown with mobile & desktop logic
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const inspirationMenu = [
  { key: "kitchen", label: "KITCHEN" },
  { key: "bedroom", label: "BEDROOM" },
  { key: "living", label: "LIVING ROOM" },
  { key: "bathroom", label: "BATHROOM" },
  { key: "dining", label: "DINING ROOM" },
  { key: "hallway", label: "HALLWAY" },
  { key: "office", label: "OFFICE" },
  { key: "exterior", label: "HOUSE EXTERIOR" },
];

const roomThumbnails = {
  kitchen: "/Assets/Inspiration/IMG-20250718-WA0043.jpg",
  bedroom: "/Assets/Inspiration/bedroom.jpg",
  living: "/Assets/Inspiration/living.jpg",
  bathroom: "/Assets/Inspiration/IMG-20250718-WA0041.jpg",
  dining: "/Assets/Inspiration/dining.jpg",
  hallway: "/Assets/Inspiration/IMG-20250718-WA0042.jpg",
  office: "/Assets/Inspiration/IMG-20250718-WA0044.jpg",
  exterior: "/Assets/Inspiration/IMG-20250718-WA0045.jpg",
};

const InspirationsDropdown = ({ onSelect, isMobile = false }) => {
  const [hoveredRoom, setHoveredRoom] = useState(inspirationMenu[0].key);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAllClick = () => {
    navigate("/inspirations");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (onSelect) onSelect();
  };

  const handleRoomClick = (roomKey) => {
    navigate(`/inspirations/${roomKey}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (onSelect) onSelect();
  };

  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-start">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#493657] hover:text-[#F0C85A] flex justify-between w-full"
        >
          <span>Inspirations</span>
          <span className={`transform transition-transform ${open ? "rotate-90" : ""}`}>▶</span>
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          } w-full`}
        >
          <div className="pl-4 py-2 flex flex-col gap-2">
            <button
              onClick={handleAllClick}
              className="text-[#493657] hover:text-[#F0C85A] uppercase font-bold text-left"
            >
              VIEW ALL INSPIRATION
            </button>
            <button
              onClick={() => {
                navigate("/colors");
                if (onSelect) onSelect();
              }}
              className="text-[#493657] hover:text-[#F0C85A] uppercase font-bold text-left"
            >
              VIEW COLOR PALETTE
            </button>
            {inspirationMenu.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleRoomClick(key)}
                className="text-left text-[#493657] hover:text-[#F0C85A] text-base"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-lg z-50 font-poppins">
      <div
        className="
          max-w-screen-xl mx-auto
          px-4 sm:px-6 md:px-10 lg:px-24
          py-8 md:py-12 lg:py-14
          flex justify-between items-start
          gap-4 md:gap-6 lg:gap-8
        "
      >
        {/* LEFT MENU — keep narrow, border, and small right padding */}
        <div
          className="
            flex flex-col
            min-w-[160px] max-w-[180px]
            md:min-w-[180px] md:max-w-[200px]
            lg:min-w-[200px] lg:max-w-[220px]
            border-r border-[#e5e0d8]
            pr-4 md:pr-5 lg:pr-6
          "
        >
          <button
            className="
              text-left font-bold uppercase
              text-sm md:text-base lg:text-lg
              py-1.5 md:py-2 px-0 mb-1
              border-b-2 border-[#493657] text-[#493657] hover:text-[#F0C85A]
            "
            onClick={handleAllClick}
          >
            VIEW ALL INSPIRATION
          </button>
          <button
            className="
              text-left font-bold uppercase
              text-sm md:text-base lg:text-lg
              py-1.5 md:py-2 px-0 mb-1
              text-[#493657] hover:text-[#F0C85A]
            "
            onClick={() => {
              navigate("/colors");
              if (onSelect) onSelect();
            }}
          >
            VIEW COLOR PALETTE
          </button>
        </div>

        {/* MIDDLE LIST — keep very close to left (small left padding) */}
        <div
          className="
            flex flex-col flex-1
            pl-3 md:pl-4 lg:pl-5  /* <-- tight gap next to left rail */
            pr-2 md:pr-4 lg:pr-6
            max-h-[50vh] md:max-h-[400px] overflow-y-auto
          "
        >
          
          <ul className="space-y-2 text-[#493657]">
            {inspirationMenu.map((item) => (
              <li
                key={item.key}
                className={`text-sm md:text-base cursor-pointer transition-colors py-1 ${
                  hoveredRoom === item.key ? "font-bold" : "hover:text-[#F0C85A]"
                }`}
                onMouseEnter={() => setHoveredRoom(item.key)}
                onClick={() => handleRoomClick(item.key)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT PREVIEW — responsive width/height */}
        <div
          className="
            flex items-center justify-center
            min-w-[160px] max-w-[180px]
            md:min-w-[220px] md:max-w-[240px]
            lg:min-w-[260px] lg:max-w-[280px]
          "
        >
          <img
            src={roomThumbnails[hoveredRoom]}
            alt={`${hoveredRoom} room design inspiration preview`}
            className="
              rounded-xl shadow-md border border-gray-100 object-cover w-full
              h-40 md:h-52 lg:h-60
            "
          />
        </div>
      </div>
    </div>
  );
};

export default InspirationsDropdown;

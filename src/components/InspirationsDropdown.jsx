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
  { key: "kids", label: "KIDS ROOM" },
  { key: "exterior", label: "HOUSE EXTERIOR" },
];

const roomThumbnails = inspirationMenu.reduce((acc, item) => {
  acc[item.key] = "/Assets/inspiration.png";
  return acc;
}, {});

const InspirationsDropdown = ({ onSelect }) => {
  const [hoveredRoom, setHoveredRoom] = useState(inspirationMenu[0].key);
  const navigate = useNavigate();

  const handleAllClick = () => {
    navigate('/inspiration');
    if (onSelect) onSelect();
  };

  const handleRoomClick = (roomKey) => {
    navigate(`/inspiration/${roomKey}`);
    if (onSelect) onSelect();
  };

  return (
    <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-lg z-50 transition-opacity duration-300 font-poppins">
      <div className="max-w-screen-xl mx-auto px-24 py-14 flex gap-0 justify-between items-start">
        {/* Left: View All Inspiration */}
        <div className="flex flex-col min-w-[200px] max-w-[220px] border-r border-[#e5e0d8] pr-10">
          <button
            className="text-left text-lg font-bold uppercase py-2 px-0 mb-1 border-b-2 border-[#493657] text-[#493657] hover:text-[#F0C85A] transition-colors"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            onClick={handleAllClick}
          >
            VIEW ALL INSPIRATION
          </button>
          <button
            className="text-left text-lg font-bold uppercase py-2 px-0 mb-1 border-[#493657] text-[#493657] hover:text-[#F0C85A] transition-colors"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            onClick={() => { navigate('/colors'); if (onSelect) onSelect(); }}
          >
            VIEW COLOR PALETTE
          </button>
        </div>
        {/* Middle: Room List */}
        <div className="flex flex-col flex-1 px-12 max-h-[400px] overflow-y-auto scrollbar-hide">
          <ul className="space-y-2 text-[#493657]">
            {inspirationMenu.map(item => (
              <li
                key={item.key}
                className={`text-base cursor-pointer transition-colors py-1 px-0 border-b-0 ${hoveredRoom === item.key ? "font-bold text-[#493657]" : "font-normal hover:text-[#F0C85A]"}`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
                onMouseEnter={() => setHoveredRoom(item.key)}
                onClick={() => handleRoomClick(item.key)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        {/* Right: Room Thumbnail */}
        <div className="min-w-[260px] max-w-[280px] flex flex-col items-center justify-center">
          <img
            src={roomThumbnails[hoveredRoom]}
            alt={hoveredRoom}
            className="rounded-xl shadow-md border border-gray-100 object-cover w-full h-48"
          />
        </div>
      </div>
    </div>
  );
};

export default InspirationsDropdown; 
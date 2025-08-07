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
  kitchen: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/KitchenHero_a8fyfn.jpg",
  bedroom: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/bedroomHero_blfz2c.jpg",
  living: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/livingroomHero_vvdi6l.jpg",
  bathroom: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598789/bathroomHero_lt3vw0.jpg",
  dining: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598789/diningHero_ggdfce.jpg",
  hallway: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/hallwayhero_m6w6b5.png",
  office: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598789/officeHero_uq7rgp.png",
  exterior: "/Assets/exterior-placeholder.jpg", // use dummy or fallback image
};

const InspirationsDropdown = ({ onSelect, isMobile = false }) => {
  const [hoveredRoom, setHoveredRoom] = useState(inspirationMenu[0].key);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAllClick = () => {
    navigate('/inspirations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onSelect) onSelect();
  };

  const handleRoomClick = (roomKey) => {
    navigate(`/inspirations/${roomKey}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <span className={`transform transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} w-full`}
        >
          <div className="pl-4 py-2 flex flex-col gap-2">
            <button
              onClick={handleAllClick}
              className="text-[#493657] hover:text-[#F0C85A] uppercase font-bold text-left"
            >VIEW ALL INSPIRATION</button>
            <button
              onClick={() => { navigate('/colors'); if (onSelect) onSelect(); }}
              className="text-[#493657] hover:text-[#F0C85A] uppercase font-bold text-left"
            >VIEW COLOR PALETTE</button>
            {inspirationMenu.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleRoomClick(key)}
                className="text-left text-[#493657] hover:text-[#F0C85A] text-base"
              >{label}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-lg z-50 font-poppins">
      <div className="max-w-screen-xl mx-auto px-24 py-14 flex justify-between">
        <div className="flex flex-col min-w-[200px] max-w-[220px] border-r border-[#e5e0d8] pr-10">
          <button
            className="text-left text-lg font-bold uppercase py-2 px-0 mb-1 border-b-2 border-[#493657] text-[#493657] hover:text-[#F0C85A]"
            onClick={handleAllClick}
          >VIEW ALL INSPIRATION</button>
          <button
            className="text-left text-lg font-bold uppercase py-2 px-0 mb-1 text-[#493657] hover:text-[#F0C85A]"
            onClick={() => { navigate('/colors'); if (onSelect) onSelect(); }}
          >VIEW COLOR PALETTE</button>
        </div>
        <div className="flex flex-col flex-1 px-12 max-h-[400px] overflow-y-auto">
          <ul className="space-y-2 text-[#493657]">
            {inspirationMenu.map(item => (
              <li
                key={item.key}
                className={`text-base cursor-pointer transition-colors py-1 px-0 ${hoveredRoom === item.key ? "font-bold" : "hover:text-[#F0C85A]"}`}
                onMouseEnter={() => setHoveredRoom(item.key)}
                onClick={() => handleRoomClick(item.key)}
              >{item.label}</li>
            ))}
          </ul>
        </div>
        <div className="min-w-[260px] max-w-[280px] flex items-center justify-center">
          <img
            src={roomThumbnails[hoveredRoom]}
            alt={hoveredRoom}
            className="rounded-xl shadow-md border border-gray-100 object-cover w-full h-60"

          />
        </div>
      </div>
    </div>
  );
};

export default InspirationsDropdown;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomCategoryNav = ({ currentRoom }) => {
  const navigate = useNavigate();
  
  const roomCategories = [
    { title: "Kitchen", route: "kitchen" },
    { title: "Bedroom", route: "bedroom" },
    { title: "Living Room", route: "living" },
    { title: "Bathroom", route: "bathroom" },
    { title: "Dining Room", route: "dining" },
    { title: "Hallway", route: "hallway" }
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6 py-4 overflow-x-auto hide-scrollbar">
          {roomCategories.map((room) => (
            <button
              key={room.route}
              onClick={() => navigate(`/inspirations/${room.route}`)}
              className={`flex items-center gap-2 px-2 md:px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap group relative flex-shrink-0 ${
                room.route === currentRoom ? 'text-[#493657]' : 'text-gray-700 hover:text-[#493657]'
              }`}
            >
              <span className="font-medium text-xs md:text-sm lg:text-base">{room.title}</span>
              {/* Underline for active state */}
              {room.route === currentRoom && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F0C85A]"></div>
              )}
              {/* Underline for hover state */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F0C85A] transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomCategoryNav;

import React from "react";
import { useNavigate } from "react-router-dom";

const ROOMS = [
  { title: "Exterior", category: "Exterior", designs: 88, thumbnail: "/Assets/inspiration/exterior.jpg" },
  { title: "Living Room", category: "Interior", designs: 118, thumbnail: "/Assets/inspiration/living.jpg" },
  { title: "Bedroom", category: "Interior", designs: 111, thumbnail: "/Assets/inspiration/bedroom.jpg" },
  { title: "Dining Area", category: "Dining", designs: 40, thumbnail: "/Assets/inspiration/dining.jpg" },
  { title: "Kids room", category: "Interior", designs: 6, thumbnail: "/Assets/inspiration/kids.jpg" },
  { title: "Kitchen", category: "Kitchen", designs: 22, thumbnail: "/Assets/inspiration/kitchen.jpg" },
  { title: "Puja Room", category: "Interior", designs: 4, thumbnail: "/Assets/inspiration/puja.jpg" },
  { title: "Office Space", category: "Interior", designs: 48, thumbnail: "/Assets/inspiration/office.jpg" },
  { title: "Hallway", category: "Interior", designs: 28, thumbnail: "/Assets/inspiration/hallway.jpg" },
  { title: "Bathroom", category: "Bathroom", designs: 1, thumbnail: "/Assets/inspiration/bathroom.jpg" },
  { title: "Studio Apartment", category: "Interior", designs: 5, thumbnail: "/Assets/inspiration/studio.jpg" },
  { title: "Outdoor Seating", category: "Exterior", designs: 6, thumbnail: "/Assets/inspiration/outdoor.jpg" },
];

const SECTION_ORDER = ["Interior", "Kitchen", "Dining", "Bathroom", "Exterior"];

export default function InspirationPage() {
  const navigate = useNavigate();

  return (
    <div className="font-poppins bg-white min-h-screen py-16 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Design Inspiration</h1>
        <p className="text-lg md:text-xl text-center mb-12 text-gray-600">
          Mood boards. Spaces. Imagination.
        </p>

        {/* Loop through ordered sections */}
        {SECTION_ORDER.map((section) => {
          const sectionRooms = ROOMS.filter((room) => room.category === section);
          if (sectionRooms.length === 0) return null;

          return (
            <div key={section} className="mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 underline cursor-pointer" onClick={() => navigate(`/inspiration/${section}`)}>{section} </h2>

              <div className="overflow-x-auto">
                <div className="flex space-x-6 pb-2">
                  {sectionRooms.map((room) => {
                    const slug = room.title.split(" ")[0].toLowerCase();
                    return (
                      <div
                        key={room.title}
                        onClick={() => navigate(`/inspiration/${slug}`)}
                        className="min-w-[260px] max-w-[260px] rounded-xl overflow-hidden shadow-md border border-gray-200 transition transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                      >
                        {/* Image */}
                        <div className="h-[340px] w-full">
                          <img
                            src={room.thumbnail}
                            alt={room.title}
                            className="h-full w-full object-cover"
                            draggable="false"
                          />
                        </div>
                    
                        {/* Color Strip Section */}
                        <div className="flex w-full">
                          {/* Swatch 1 */}
                          <div className="flex-1 flex flex-col items-start px-2 py-3 bg-[#BA2B2B] text-white">
                            <span className="text-[10px] uppercase opacity-70 font-medium">Door</span>
                            <span className="text-sm font-semibold">Outrageous Red</span>
                          </div>
                    
                          {/* Swatch 2 */}
                          <div className="flex-1 flex flex-col items-start px-2 py-3 bg-[#D6CBB6] text-gray-900">
                            <span className="text-[10px] uppercase opacity-70 font-medium">Wall</span>
                            <span className="text-sm font-semibold">Time Capsule</span>
                          </div>
                    
                          {/* Swatch 3 */}
                          {/* <div className="flex-1 flex flex-col items-start px-2 py-3 bg-[#7E7266] text-white">
                            <span className="text-[10px] uppercase opacity-70 font-medium">Trim</span>
                            <span className="text-sm font-semibold">Hildegard</span>
                          </div> */}
                        </div>
                      </div>
                    );
                    
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

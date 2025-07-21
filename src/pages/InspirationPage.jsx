import React from "react";
import { useNavigate } from "react-router-dom";

const ROOMS = [
  { title: "Exterior", designs: 88 },
  { title: "Living Room", designs: 118 },
  { title: "Bedroom", designs: 111 },
  { title: "Dining Area", designs: 40 },
  { title: "Kids room", designs: 6 },
  { title: "Kitchen", designs: 22 },
  { title: "Puja Room", designs: 4 },
  { title: "Office Space", designs: 48 },
  { title: "Hallway", designs: 28 },
  { title: "Bathroom", designs: 1 },
  { title: "Studio Apartment", designs: 5 },
  { title: "Outdoor Seating", designs: 6 },
];

export default function InspirationPage() {
  const navigate = useNavigate();
  return (
    <div className="font-poppins bg-white min-h-screen py-12 px-4 flex flex-col items-center mt-20">
      <div className="max-w-7xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-2 tracking-tight">Design Inspiration</h1>
        <p className="text-lg md:text-2xl text-center mb-12 text-gray-600">Mood boards. Spaces. Imagination.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {ROOMS.map((room, idx) => {
            const slug = room.title.split(" ")[0].toLowerCase();
            return (
              <div key={room.title} className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden border border-gray-100">
                <img
                  src={"/Assets/inspiration2.png"}
                  alt={room.title}
                  className="w-full h-48 object-cover"
                  draggable="false"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-lg text-gray-900 mb-1">{room.title}</div>
                    <div className="text-sm text-gray-500 mb-4">{room.designs} designs</div>
                  </div>
                  <button
                    onClick={() => navigate(`/inspiration/${slug}`)}
                    className="mt-auto w-full border-2 border-purple-500 text-purple-700 font-medium py-2 rounded-lg transition hover:bg-purple-50 text-sm"
                  >
                    Explore More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 
// src/pages/IndividualRoomPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";  // For fetching dynamic URL params and Link
import { roomData } from "../../data/roomData";  // Importing room data
import { flatColors } from "../../data/flatColors";  // Importing color groups

// Helper to find color by name in flatColors
const findColor = (name) => {
    return flatColors.find((c) => c.name === name); // Directly search flatColors
};

export default function IndividualRoomPage() {
    const { roomName } = useParams();  // Get the room name from URL params
    const room = roomData.find((r) => r.name.toLowerCase().replace(/\s+/g, '-') === roomName);  // Find the room based on the URL parameter

    if (!room) {
        return <div>Room not found.</div>;  // Display if no room is found
    }

    return (
        <div className="font-poppins bg-white min-h-screen pt-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#393939] mb-6 tracking-tight text-center">
                    {room.name}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed">
                    {room.description}
                </p>
            </div>

            {/* Room Image and Details */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-64 md:h-[28rem] object-cover"
                />

                {/* Colors Used */}
                <div className="mt-8 space-y-6">
                    <h2 className="text-3xl font-bold text-[#393939]">Colors Used:</h2>
                    <div className="flex space-x-4">
                        {room.colors.map((color, i) => {
                            const colorObj = findColor(color); // Find color object by name
                            const colorFamily = colorObj ? colorObj.color_family.toLowerCase().replace(/\s+/g, '-') : "";
                            const colorName = colorObj ? colorObj.name.toLowerCase().replace(/\s+/g, '-') : "";

                            return colorObj ? (
                                <Link 
                                    key={i} 
                                    to={`/colors/family/${colorFamily}/${colorName}`} 
                                    className="w-16 h-16 rounded-full border-2 border-gray-200"
                                    style={{ backgroundColor: colorObj.hex }}
                                >
                                </Link>
                            ) : null;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

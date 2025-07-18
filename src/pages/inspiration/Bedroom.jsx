import React from "react";
import RoomInspiration from "../../components/RoomInspiration";
import { colorGroups } from "../../data/colorGroups";

export default function BedroomInspiration() {
  // Helper to find color by name in colorGroups
  const findColor = (name) => {
    for (const group of colorGroups) {
      const found = group.colors.find((c) => c.name === name);
      if (found) return found;
    }
    return null;
  };

  return (
    <div className="font-poppins bg-white min-h-screen mt-20">
      {/* Wide Image at Top */}
      <div className="w-full flex justify-center bg-[#f7f7f5]">
        <img src="/Assets/inspiration.png" alt="Bedroom Inspiration" className="w-full max-w-screen-2xl h-64 md:h-[28rem] object-cover rounded-none md:rounded-2xl shadow-md border-b border-gray-200" />
      </div>
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-8">
        <h1 className="text-5xl md:text-7xl font-bold text-[#393939] mb-6 tracking-tight text-center">BEDROOM INSPIRATION</h1>
        <p className="text-lg md:text-xl text-[#393939] mb-4 text-center">
          Choosing a bedroom paint color is about creating your personal sanctuary. Our bedroom inspiration gallery helps you explore colors by mood, style, and palette to spark ideas and bring your dream retreat to life.
        </p>
      </div>
      {/* Example Room Inspiration Blocks */}
      <RoomInspiration
        title="Blue Calm & Collected Bedroom"
        description="A serene blue palette creates a peaceful retreat, perfect for unwinding after a long day."
        imageUrl="/Assets/inspiration.png"
        colors={[
          findColor("Monsoon Cloud"),
          findColor("Lotus Lake"),
          findColor("Indigo Night"),
        ].filter(Boolean)}
      />
      <RoomInspiration
        title="Modern Minimalist Bedroom"
        description="Clean lines and soft neutrals make this bedroom a modern sanctuary."
        imageUrl="/Assets/InteriorInspiratoin/6f230793e6001ad681b2e5b8f447e87e.jpg"
        colors={[
          findColor("Ivory Mist"),
          findColor("Almond Silk"),
          findColor("Cream Sandal"),
        ].filter(Boolean)}
      />
      <RoomInspiration
        title="Warm Earthy Bedroom"
        description="Earth tones and natural textures create a cozy, inviting space for rest and relaxation."
        imageUrl="/Assets/InteriorInspiratoin/9e4b7d64c952697f8db4991ae2dea822.jpg"
        colors={[
          findColor("Terracotta Tile"),
          findColor("Amber Soil"),
          findColor("Sienna Path"),
        ].filter(Boolean)}
      />
      {/* Page Content Placeholder */}
      <div className="max-w-4xl w-full mx-auto py-12 px-4">
        <p className="text-lg text-gray-700 text-center">Beautiful bedroom inspiration coming soon...</p>
      </div>
    </div>
  );
} 
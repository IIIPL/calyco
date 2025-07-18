import React from "react";
import RoomInspiration from "../../components/RoomInspiration";

export default function BedroomInspiration() {
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
          { name: "Riverdale", code: "N410-3", hex: "#C3CBC3" },
          { name: "Polar Bear", code: "75", hex: "#F5F6F1" },
          { name: "Ocean Night", code: "S490-7", hex: "#2B3A42" },
        ]}
      />
      <RoomInspiration
        title="Modern Minimalist Bedroom"
        description="Clean lines and soft neutrals make this bedroom a modern sanctuary."
        imageUrl="/Assets/InteriorInspiratoin/6f230793e6001ad681b2e5b8f447e87e.jpg"
        colors={[
          { name: "Soft Taupe", code: "PPG1024-2", hex: "#E6DED7" },
          { name: "Cloud Linen", code: "PPG1024-1", hex: "#E9E7E1" },
        ]}
      />
      <RoomInspiration
        title="Warm Earthy Bedroom"
        description="Earth tones and natural textures create a cozy, inviting space for rest and relaxation."
        imageUrl="/Assets/InteriorInspiratoin/9e4b7d64c952697f8db4991ae2dea822.jpg"
        colors={[
          { name: "Terracotta", code: "PPG1197-7", hex: "#D96C3B" },
          { name: "Desert Sage", code: "PPG1121-3", hex: "#C1B398" },
          { name: "Warm Oat", code: "PPG1101-2", hex: "#E2D8C3" },
        ]}
      />
      {/* Page Content Placeholder */}
      <div className="max-w-4xl w-full mx-auto py-12 px-4">
        <p className="text-lg text-gray-700 text-center">Beautiful bedroom inspiration coming soon...</p>
      </div>
    </div>
  );
} 
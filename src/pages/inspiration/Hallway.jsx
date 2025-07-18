import React from "react";

export default function HallwayInspiration() {
  return (
    <div className="font-poppins bg-white min-h-screen">
      {/* Header Section */}
      <div className="w-full bg-[#f7f7f5] pb-8">
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[#393939] mb-4 tracking-tight">HALLWAY INSPIRATION</h1>
          <p className="text-lg md:text-xl text-[#393939] mb-6 max-w-3xl">
            Make a great first impression with hallway color inspiration. Browse our gallery for ideas to brighten and personalize your home's entryways and corridors.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <img src="/Assets/inspiration.png" alt="Hallway Inspiration" className="w-full max-w-5xl h-64 md:h-96 object-cover rounded-2xl shadow-md border border-gray-100" />
        </div>
      </div>
      {/* Page Content Placeholder */}
      <div className="max-w-4xl w-full mx-auto py-12 px-4">
        <p className="text-lg text-gray-700 text-center">Beautiful hallway inspiration coming soon...</p>
      </div>
    </div>
  );
} 
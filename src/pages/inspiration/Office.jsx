import React from "react";

export default function OfficeInspiration() {
  return (
    <div className="font-poppins bg-white min-h-screen">
      {/* Header Section */}
      <div className="w-full bg-[#f7f7f5] pb-8">
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[#393939] mb-4 tracking-tight">OFFICE INSPIRATION</h1>
          <p className="text-lg md:text-xl text-[#393939] mb-6 max-w-3xl">
            Boost productivity and creativity with office color inspiration. Explore our gallery for palettes and styles to design your ideal workspace.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <img src="/Assets/inspiration.png" alt="Office Inspiration" className="w-full max-w-5xl h-64 md:h-96 object-cover rounded-2xl shadow-md border border-gray-100" loading="lazy" />
        </div>
      </div>
      {/* Page Content Placeholder */}
      <div className="max-w-4xl w-full mx-auto py-12 px-4">
        <p className="text-lg text-gray-700 text-center">Beautiful office inspiration coming soon...</p>
      </div>
    </div>
  );
} 
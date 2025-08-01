import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { flatColors } from "../../data/flatColors";

const ColorGroup = ({ groupTitle = "Gray" }) => {
  const navigate = useNavigate();

  const allBases = [...new Set(flatColors.map((c) => c.base))];
  const allFamilies = [...new Set(flatColors.map((c) => c.color_family))];
  const allRooms = [...new Set(flatColors.flatMap((c) => c.rooms.split(",").map(r => r.trim())))];

  const [toneFilter, setToneFilter] = useState("All");
  const [baseFilter, setBaseFilter] = useState("All");
  const [familyFilter, setFamilyFilter] = useState("All");
  const [roomFilter, setRoomFilter] = useState("All");

  const popularColors = flatColors.slice(0, 6);

  const filteredColors = flatColors.filter((color) => {
    return (
      color.group.toLowerCase() === groupTitle.toLowerCase() &&
      (toneFilter === "All" || color.tone === toneFilter) &&
      (baseFilter === "All" || color.base === baseFilter) &&
      (familyFilter === "All" || color.color_family === familyFilter) &&
      (roomFilter === "All" || color.rooms.toLowerCase().includes(roomFilter.toLowerCase()))
    );
  });

  return (
    <div className="bg-white min-h-screen text-[#1a1a1a]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">{groupTitle} Paint Colors</h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Explore a range of {groupTitle.toLowerCase()} paint colors to find the perfect shade for your home.
        </p>
      </div>

      {/* Lifestyle Hero Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 mb-12">
        {["/assets/gray1.jpg", "/assets/gray2.jpg", "/assets/gray3.jpg"].map((src, i) => (
          <div key={i} className="aspect-[3/2] bg-gray-200 rounded overflow-hidden shadow">
            <img src={src} alt="Gray lifestyle" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Popular Shades */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-xl font-semibold mb-4">Most Popular Shades</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularColors.map((color, i) => (
            <div
              key={i}
              className="rounded overflow-hidden border shadow cursor-pointer"
              onClick={() => navigate(`/paint-color/${encodeURIComponent(color.name)}`)}
            >
              <div className="h-12" style={{ backgroundColor: color.hex }}></div>
              <div className="p-2 text-sm">
                <p className="font-medium">{color.name}</p>
                <p className="text-xs text-gray-500">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-10 space-y-6">
        <h2 className="text-xl font-semibold">Filter Colors</h2>
        <div className="flex flex-wrap gap-3">
          {["All", ...new Set(flatColors.map((c) => c.tone))].map((t) => (
            <button
              key={t}
              className={`px-4 py-1 rounded-full border ${
                toneFilter === t ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => setToneFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {["All", ...allBases].map((b) => (
            <button
              key={b}
              className={`px-4 py-1 rounded-full border ${
                baseFilter === b ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => setBaseFilter(b)}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {["All", ...allFamilies].map((f) => (
            <button
              key={f}
              className={`px-4 py-1 rounded-full border ${
                familyFilter === f ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => setFamilyFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {["All", ...allRooms].map((r) => (
            <button
              key={r}
              className={`px-4 py-1 rounded-full border ${
                roomFilter === r ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => setRoomFilter(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Color Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-20">
        {filteredColors.map((color, i) => (
          <div
            key={i}
            className="cursor-pointer rounded shadow overflow-hidden border"
            onClick={() => navigate(`/paint-color/${encodeURIComponent(color.name)}`)}
          >
            <div className="h-20" style={{ backgroundColor: color.hex }}></div>
            <div className="p-3">
              <p className="font-medium text-sm">{color.name}</p>
              <p className="text-xs text-gray-500">{color.hex}</p>
              <p className="text-xs text-gray-400 italic truncate">{color.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorGroup;

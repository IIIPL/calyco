import React from "react";
import { colorGroups } from "../data/colorGroups";

export default function ColorsPage() {
  return (
    <div className="font-poppins bg-white min-h-screen flex flex-col items-center mt-32">
      <div className="w-full max-w-7xl px-2 md:px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-2 tracking-tight">The Calyco Sacred Palette</h1>
        <p className="text-lg md:text-2xl text-center mb-12 text-gray-600">108 designer shades, curated across moods and materials</p>
        {colorGroups.map((group, idx) => (
          <div key={group.title} className="mb-14">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 flex items-center">
              <span>{group.title}</span>
              <span className="flex-1 border-t border-yellow-500 mx-4" aria-hidden="true"></span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {group.colors.map((color, i) => (
                <div
                  key={color.name + color.hex}
                  className="rounded-2xl bg-[#faf9f7] border border-gray-100 shadow-sm flex flex-col items-start p-4 relative group transition hover:shadow-md"
                >
                  {/* Heart Icon */}
                  <button className="absolute top-3 right-3 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#E57373" strokeWidth="2">
                      <path d="M12 21C12 21 5 13.5 5 9.5C5 7.01472 7.01472 5 9.5 5C10.8807 5 12.1174 5.68436 12.8826 6.76393C13.6478 5.68436 14.8845 5 16.2652 5C18.7505 5 20.7652 7.01472 20.7652 9.5C20.7652 13.5 13.7652 21 13.7652 21H12Z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {/* Color Swatch */}
                  <div
                    className="w-full aspect-[3/4] rounded-xl mb-4"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  {/* Color Name and Code */}
                  <div className="flex flex-col w-full">
                    <span className="font-semibold text-gray-800 text-base mb-1 flex items-center">
                      {color.name}
                      <span className="ml-2 text-gray-400 text-lg">→</span>
                    </span>
                    <span className="text-xs text-gray-500">{color.code || (8000 + i + 1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
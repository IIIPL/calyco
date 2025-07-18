import React from "react";

/**
 * RoomInspiration component
 * Props:
 * - title: string (e.g. "Green Zen Living Room")
 * - description: string
 * - imageUrl: string (image path)
 * - colors: array of { name: string, code: string, hex: string }
 */
export default function RoomInspiration({ title, description, imageUrl, colors = [] }) {
  return (
    <div className="w-full max-w-5xl mx-auto mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-[#393939] mb-2 tracking-tight uppercase">{title}</h2>
      {description && (
        <p className="text-base md:text-lg text-[#393939] mb-4">{description}</p>
      )}
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-10 items-start">
        {/* Image */}
        <div className="flex-1 w-full flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="w-full max-w-full object-contain rounded-xl shadow-md border border-gray-100"
            style={{ height: 'auto', maxHeight: '32rem' }}
          />
        </div>
        {/* Color Swatches */}
        {colors.length > 0 && (
          <div className="flex flex-row md:flex-col gap-4 md:gap-6 mt-4 md:mt-0 min-w-[180px]">
            {colors.map((color, idx) => (
              <div key={color.code + idx} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-lg border border-gray-200 mb-2 shadow"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <div className="text-xs font-semibold text-[#393939] text-center uppercase">{color.name}</div>
                <div className="text-xs text-gray-500 text-center">{color.code}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
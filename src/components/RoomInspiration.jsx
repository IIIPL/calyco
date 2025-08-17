import React from "react";
import { Link, useNavigate } from "react-router-dom";


const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w\-&]+/g, '')   // Remove all non-word chars EXCEPT hyphens and '&'
    .replace(/\-\-+/g, '-');     // Collapse multiple hyphens


export default function RoomInspiration({ title, description, imageUrl, colors = [], to }) {
  const navigate = useNavigate();
  return (
    <div className="relative w-full max-w-5xl mx-auto mb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[#393939] mb-2 tracking-tight uppercase">
        {to ? (
          <Link
            to={to}
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#393939]"
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-[#393939] mb-4">{description}</p>
      )}

      <div className="relative w-full">
        {/* Room Image */}
        <div className="w-full">
          {to ? (
            <Link to={to} aria-label={`Open ${title}`}>
              <img
                src={imageUrl}
                alt={`${title} room design inspiration`}
                className="w-full h-auto max-h-[32rem] object-contain"
                loading="lazy"
              />
            </Link>
          ) : (
            <img
              src={imageUrl}
              alt={`${title} room design inspiration`}
              className="w-full h-auto max-h-[32rem] object-contain"
              loading="lazy"
            />
          )}
        </div>
        {/* Colors Bottom Left */}
        {colors.length > 0 && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-md flex gap-4">
            {colors.map((color, idx) => (
              <Link
                key={color.code + idx}
                to={`/colors/family/${slugify(color.color_family)}/${slugify(color.name)}`}
                className="flex flex-col items-center group"
              >
                <div
                  className="w-20 h-20 border-2 border-gray-300 rounded-md shadow-md group-hover:ring-2 group-hover:ring-gray-400 transition-all"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <div className="text-xs font-semibold text-[#393939] mt-1 text-center uppercase">{color.name}</div>
                <div className="text-xs text-gray-500 text-center">{color.code}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

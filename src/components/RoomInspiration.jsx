import React from "react";
import { Link, useNavigate } from "react-router-dom";


const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')        // Replace & with 'and' first
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars except hyphens
    .replace(/\-\-+/g, '-');     // Collapse multiple hyphens


export default function RoomInspiration({ title, description, imageUrl, colors = [], to }) {
  const navigate = useNavigate();

  // Debug: Log the colors being received
  console.log(`RoomInspiration ${title} - Colors received:`, colors);

  const handleColorClick = (color, event) => {
    event.preventDefault();

    // Navigate to color detail page
    if (color.colorFamily || color.color_family) {
      const family = (color.colorFamily || color.color_family)
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[&]/g, '-');

      const colorName = color.name
        .toLowerCase()
        .replace(/\s+/g, '-');

      navigate(`/colors/family/${family}/${colorName}`);
    }
  };

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
                alt={title}
                className="w-full h-[500px] object-cover rounded-lg"
                loading="lazy"
              />
            </Link>
          ) : (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-[500px] object-cover rounded-lg"
              loading="lazy"
            />
          )}
        </div>
        {/* Colors Bottom Left */}
        {colors.length > 0 && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-md flex gap-4">
            {colors.map((color, idx) => {
              console.log(`Rendering color swatch ${idx + 1}:`, {
                name: color.name,
                code: color.code,
                hex: color.hex,
                hasHex: !!color.hex,
                fallbackColor: color.hex || '#CCCCCC'
              });
              return (
                <button
                  key={color.code + idx}
                  onClick={(e) => handleColorClick(color, e)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className="w-20 h-20 border-2 border-gray-300 rounded-md shadow-md group-hover:ring-2 group-hover:ring-[#F0C85A] transition-all"
                    style={{ 
                      backgroundColor: color.hex || '#CCCCCC',
                      minHeight: '80px',
                      minWidth: '80px'
                    }}
                  ></div>
                  <div className="text-xs font-semibold text-[#393939] mt-1 text-center uppercase">{color.name}</div>
                  <div className="text-xs text-gray-500 text-center">{color.code}</div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flatColors } from '../data/flatColors';

const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
const unslugify = (text) => text.replace(/-/g, ' ').replace(/and/g, '&').toUpperCase();

const FamilyColorPage = () => {
  const { familyName } = useParams();
  const navigate = useNavigate();
  const family = unslugify(familyName);

  const familyColors = flatColors.filter((c) => c.color_family === family);

  if (!familyColors.length) {
    return <div className="p-20 text-center text-black">No colors found.</div>;
  }

  return (
    <div className="pt-36 pb-20 bg-white text-[#1a1a1a] min-h-screen">
      {/* Heading */}
      <div className="px-10 max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold mb-2">{family} Paint Colors</h1>
        <p className="text-md text-gray-700 max-w-2xl">
          Explore a range of {family.toLowerCase()} paint colors to find the perfect shade for your space.
        </p>
      </div>

      {/* Color Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-10 max-w-7xl mx-auto">
        {familyColors.map((color, idx) => (
          <div
            key={idx}
            className="shadow rounded cursor-pointer border hover:shadow-lg transition-transform hover:scale-[1.03]"
            onClick={() =>
              navigate(`/colors/family/${familyName}/${encodeURIComponent(color.name)}`)
            }
          >
            <div
              className="h-20 flex items-center justify-center text-xs font-semibold text-white text-center rounded-t"
              style={{ backgroundColor: color.hex }}
            >
              {color.name}
            </div>
            <div className="bg-white text-sm p-2 text-center text-black">{color.hex}</div>
          </div>
        ))}
      </div>

      {/* Filters Placeholder */}
      <div className="max-w-7xl mx-auto mt-12 px-10">
        <h3 className="text-lg font-semibold mb-4">More Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {/* Placeholder filter icons */}
          {["Light Tones", "Dark Tones", "Bedrooms", "Bathrooms", "Living Rooms", "Kitchens"].map((label) => (
            <div
              key={label}
              className="border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6"
            >
              <div className="w-10 h-10 bg-gray-400 rounded mb-2" />
              <p className="text-xs font-medium text-center">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyColorPage;

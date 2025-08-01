import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { colorGroups } from '../../data/colorGroups';

const ColorGroup = ({ groupTitle = "Fresh Whites & Creams" }) => {
    const navigate = useNavigate();

    const slugify = (title) => title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "%26");

    const realGroup = colorGroups.find(
        group => slugify(group.title) === groupTitle.toLowerCase()
    );



  if (!realGroup) {
    return <div className="p-20 mt-20 text-center text-gray-600">Group not found.</div>;
  }

  return (
    <div className="bg-[#f5f4f1] min-h-screen text-[#1a1a1a]">
      {/* Breadcrumb */}
      <div className="text-sm px-6 pt-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 text-gray-600">
            <span
              className="underline cursor-pointer hover:text-black"
              onClick={() => navigate("/colors")}
            >
            Paint Colors
          </span>
          <span>›</span>
          <span className="font-medium text-[#1a1a1a]">{realGroup.title}</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-20">
        <h1 className="text-4xl md:text-6xl font-semibold mb-4">{realGroup.title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Browse our collection of {realGroup.title.toLowerCase()} to find your perfect shade for your home or project.
        </p>
      </div>

      {/* Lifestyle Preview Carousel */}
      <div className="flex overflow-x-auto gap-6 px-6 max-w-7xl mx-auto pb-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="min-w-[300px] h-[400px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500"
          >
            Lifestyle Image {i}
          </div>
        ))}
      </div>

      {/* Swatch Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Popular Shades</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {realGroup.colors.map((color, idx) => (
            <motion.div
              key={idx}
              className="rounded-lg border shadow-sm bg-white cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/paint-color/${encodeURIComponent(color.name)}`)}
            >
              <div
                className="h-28 rounded-t-lg"
                style={{ backgroundColor: color.hex }}
              />
              <div className="p-4">
                <p className="font-medium">{color.name}</p>
                <p className="text-xs text-gray-500">{color.hex}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorGroup;

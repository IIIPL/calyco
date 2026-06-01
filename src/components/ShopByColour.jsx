import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Curated list of premium colors
const FEATURED_COLORS = [
  { name: "Sage Green", code: "RAL 6011", hex: "#587246", family: "Greens", description: "Natural & Calming" },
  { name: "Amber Honey", code: "RAL 1009", hex: "#E29000", family: "Beiges & Tans", description: "Luxe & Warm" }, // "Beiges & Tans" matches family in CalycoColors
  { name: "Distant Blue", code: "RAL 5008", hex: "#26252D", family: "Blues", description: "Refined Navy" },
  { name: "Modern Charcoal", code: "RAL 7015", hex: "#434750", family: "Grays", description: "Bold & Premium" },
  { name: "Pearl White", code: "RAL 1013", hex: "#EAE3CD", family: "Whites", description: "Elegant Off-White" },
  { name: "Blue Green", code: "RAL 6004", hex: "#1F3A3D", family: "Greens", description: "Sophisticated Teal" },
  { name: "Linen", code: "RAL 1014", hex: "#DED3B6", family: "Whites", description: "Organic Beige" },
  { name: "Silk Gray", code: "RAL 7044", hex: "#C5BBAE", family: "Grays", description: "Soft Editorial" }
];

const ShopByColour = () => {
  const navigate = useNavigate();

  const handleColorClick = (color) => {
    // Convert color family to URL-friendly format
    // Note: Ensuring fallback is handled if family name has spaces or ampersands
    const familySlug = color.family
      .toLowerCase()
      .replace(/\s+&\s+/g, '-') // Replace " & " with "-"
      .replace(/\s+/g, '-');    // Replace spaces with "-"

    const colorSlug = color.name.toLowerCase().replace(/\s+/g, '-');

    navigate(`/colors/${familySlug}/${colorSlug}`);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#998850] font-bold tracking-[0.2em] uppercase text-sm"
          >
            Curated Collection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#0F1221]"
          >
            Colour Systems for Considered Spaces.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#0F1221]/60 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Curated by interior designers for projects where the palette needs to feel intentional. Warm neutrals for large-scale residential. Bold accents for hospitality feature walls. Every shade available across the full range.
          </motion.p>
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {FEATURED_COLORS.map((color, index) => (
            <motion.div
              key={color.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => handleColorClick(color)}
            >
              {/* Swatch Card */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 mb-4">
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{ backgroundColor: color.hex }}
                />

                {/* Subtle sheen reflection for realism */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/0 via-white/5 to-white/10 opacity-50" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div className="text-center group-hover:text-[#998850] transition-colors duration-300">
                <h3 className="text-lg font-bold text-[#0F1221] group-hover:text-[#998850] transition-colors">
                  {color.name}
                </h3>
                <div className="flex items-center justify-center gap-2 text-sm text-[#0F1221]/50 mt-1">
                  <span>{color.code}</span>
                  <span className="w-1 h-1 rounded-full bg-[#0F1221]/30" />
                  <span>{color.description}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Actions */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/colors')}
            className="text-[#0F1221] font-semibold border-b-2 border-[#0F1221] pb-1 hover:text-[#998850] hover:border-[#998850] transition-all"
          >
            View Full Palette
          </button>
        </div>

      </div>
    </section>
  );
};

export default ShopByColour;

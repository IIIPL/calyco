import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const productCategories = [
    {
    title: "Interior Paints",
    icon: "🎨",
    products: [
      {
        name: "Calyco Nova",
        description: "One-coat premium emulsion",
        sizes: ["1L", "10L"],
        finish: "Smooth Matte",
        src: "/Assets/novaa.png"
      },
      {
        name: "Calyco Lumen",
        description: "Mid-range interior emulsion",
        sizes: ["5L", "15L"],
        finish: "Soft Sheen",
        src: "/Assets/lumen.png"
      },
      {
        name: "Calyco Silka",
        description: "Economy matte finish",
        sizes: ["1L", "10L"],
        finish: "Simple Matte",
        src: "/Assets/silka.png"
      },
      {
        name: "Calyco Velvet Touch",
        description: "Soft luxury interior finish",
        sizes: ["1L", "5L"],
        finish: "Silky Smooth",
        src: "/Assets/velvettouch.png"
      }
    ]
  },
  {
    title: "Exterior Paints",
    icon: "☀️",
    products: [
      {
        name: "Calyco ClimaGuard",
        description: "UV + waterproof emulsion",
        sizes: ["10L", "20L"],
        finish: "WeatherShield",
        src: "/Assets/climaguard.png"
      },
      {
        name: "Calyco Surfa",
        description: "Standard exterior paint",
        sizes: ["10L", "20L"],
        finish: "Durable Matte",
        src: "/Assets/surfa.png"
      },
      {
        name: "Calyco Weathra",
        description: "Mid-range outdoor finish",
        sizes: ["10L", "20L"],
        finish: "Rough & Tough",
        src: "/Assets/weathra.png"
      }
    ]
  },
  {
    title: "Enamel & Wood Finishes",
    icon: "🪵",
    products: [
      {
        name: "Calywood® Natural",
        description: "Translucent wood stain + sealer",
        sizes: ["1L", "5L"],
        finish: "Dead Flat",
        src: "/Assets/calywood.png"
      },
      {
        name: "Calyco PU Enamel",
        description: "Gloss enamel for wood & metal",
        sizes: ["1L"],
        finish: "High Gloss",
        src: "/Assets/novaa.png"
      },
      {
        name: "Calyco FastDry Enamel",
        description: "Quick dry enamel",
        sizes: ["500ml", "1L"],
        finish: "Tough Gloss",
        src: "/Assets/fastdry.png"
      }
    ]
  },
  {
    title: "Industrial Coatings",
    icon: "⚙️",
    products: [
      {
        name: "Calyco SteelSeal™",
        description: "Metal anti-corrosive enamel",
        sizes: ["10L", "20L"],
        finish: "Industrial Shield",
        src: "/Assets/novaa.png"
      },
      {
        name: "Calyco Fortify™",
        description: "Concrete & asphalt protector",
        sizes: ["5L", "15L"],
        finish: "Flat Heavy Duty",
        src: "/Assets/fortity.png"
      }
    ]
  }
];


export const Products = () => {
  const [activeCategory, setActiveCategory] = useState("Interior Paints");

  const handleCategoryClick = (title) => {
    setActiveCategory(title);
  };

  const activeProducts =
    productCategories.find((cat) => cat.title === activeCategory)?.products || [];

  return (
    <div className="mt-32 min-h-screen px-4 md:px-20">
        <div className="text-2xl md:text-3xl font-semibold text-center mb-10">
            Our Product Line
        </div>

        <div className="flex flex-wrap gap-4 md:gap-6 justify-center mb-8">
            {productCategories.map((category) => (
            <div
                key={category.title}
                onClick={() => handleCategoryClick(category.title)}
                className={`cursor-pointer px-3 py-2 rounded text-sm md:text-base ${
                activeCategory === category.title
                    ? "bg-gray-100 text-black"
                    : "text-black"
                }`}
            >
                {category.title}
            </div>
            ))}
        </div>

      {/* Product Cards with Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="flex flex-wrap gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {activeProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard
                src={product.src}
                name={product.name}
                description={product.description}
                sizes={product.sizes}
                finish={product.finish}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

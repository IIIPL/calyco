import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllProducts, getProductCategories, getProductsByCategory } from '../data/products';

const productCategories = [
  {
    title: "Interior Paints",
    icon: "🎨",
    products: getProductsByCategory("Interior")
  },
  {
    title: "Exterior Paints", 
    icon: "☀️",
    products: getProductsByCategory("Exterior")
  },
  {
    title: "Enamel & Wood Finishes",
    icon: "🪵", 
    products: getProductsByCategory("Enamel & Wood Finishes")
  },
  {
    title: "Industrial Coatings",
    icon: "⚙️",
    products: getProductsByCategory("Industrial Coatings")
  },
  {
    title: "Specialty Products",
    icon: "🔬",
    products: getProductsByCategory("Specialty")
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
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                shortDescription={product.shortDescription}
                image={product.image}
                sizes={product.sizes}
                sheens={product.sheens}
                tier={product.tier}
                price={product.price}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

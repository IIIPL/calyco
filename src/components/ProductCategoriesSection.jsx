import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCategoriesSection = () => {
  const categories = [
    {
      id: 1,
      title: "Interior Paints",
      description: "Eco-premium colors and finishes for every room.",
      image: "/Assets/Inspiration/living.jpg",
      alt: "Modern living room wall",
      link: "/products"
    },
    {
      id: 2,
      title: "Exterior Paints",
      description: "Durability, weatherproofing, and bold looks for outside walls.",
      image: "/Assets/Inspiration/IMG-20250718-WA0043.jpg",
      alt: "Villa or exterior wall facade",
      link: "/products"
    },
    {
      id: 3,
      title: "Stains & Sealers",
      description: "Protective coatings for wood, metal, and concrete surfaces.",
      image: "/Assets/Inspiration/IMG-20250718-WA0041.jpg",
      alt: "Painter applying stain/sealer on wood or metal",
      link: "/products"
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            One-stop shop for all things paint & coatings
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            From interiors to exteriors, discover the right Calyco product for your space or project.
          </p>
        </motion.div>

        {/* Product Cards Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:items-end lg:justify-between">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className={`w-full lg:w-1/3 ${
                index === 0 ? 'lg:mb-0' : 
                index === 1 ? 'lg:mb-24' : 
                'lg:mb-48'
              }`}
            >
              <Link to={category.link} className="block group">
                <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
                  {/* Background Image */}
                  <img
                    src={category.image}
                    alt={category.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Dark Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* CTA Button */}
                    <button className="inline-flex items-center px-4 py-2 border border-white text-white rounded-full text-sm font-medium transition-all duration-200 hover:bg-white hover:text-black group-hover:bg-white group-hover:text-black">
                      Explore now →
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategoriesSection;

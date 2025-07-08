import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FeatureCard = ({ number, title, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ 
      scale: 1.02,
      transition: { duration: 0.2 }
    }}
    className="bg-stone-100 p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
  >
    <div className="flex items-start gap-6">
      <motion.div 
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        viewport={{ once: true }}
        className="w-10 h-10 bg-[#493657] text-white rounded-full flex items-center justify-center text-lg font-semibold flex-shrink-0"
      >
        {number}
      </motion.div>
      <div>
        <motion.h4 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          className="font-semibold text-[#493657] mb-3 text-xl"
        >
          {title}
        </motion.h4>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          viewport={{ once: true }}
          className="text-gray-700 text-base leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </div>
  </motion.div>
);

const ProductCard = ({ image, title, description, features, generalUse, paintFinish, durability, dilution, performance, application, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 border-b border-gray-200 last:border-b-0"
    >
      {/* Product Header */}
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.05,
            rotate: 2,
            transition: { duration: 0.3 }
          }}
          className="w-full md:w-96 flex-shrink-0"
        >
          <img 
            src={image} 
            alt={title}
            className="w-full max-w-sm mx-auto object-contain rounded-lg shadow-md"
          />
        </motion.div>
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold text-[#493657] mb-6"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
            viewport={{ once: true }}
            className="text-xl text-gray-700 mb-10 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Key Features Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
      >
        {features.map((feature, idx) => (
          <FeatureCard 
            key={idx}
            number={feature.number}
            title={feature.title}
            description={feature.description}
            index={idx}
          />
        ))}
      </motion.div>

      {/* Product Specifications */}
      <motion.div 
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 + 0.8 }}
        viewport={{ once: true }}
        className="bg-stone-50 p-10 rounded-lg"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 1.0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 1.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-[#493657] mb-3 text-xl">General Use</h4>
              <p className="text-gray-700 text-base leading-relaxed">{generalUse}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 1.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-[#493657] mb-3 text-xl">Paint Finish</h4>
              <p className="text-gray-700 text-base leading-relaxed">{paintFinish}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 1.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-[#493657] mb-3 text-xl">Durability</h4>
              <p className="text-gray-700 text-base leading-relaxed">{durability}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 1.4 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-[#493657] mb-3 text-xl">Dilution & Cleanup</h4>
              <p className="text-gray-700 text-base leading-relaxed">{dilution}</p>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 1.0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 1.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-[#493657] mb-4 text-xl">Performance Characteristics</h4>
              <ul className="space-y-3">
                {performance.map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 1.2 + idx * 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-700 text-base flex items-start gap-3"
                  >
                    <span className="w-2 h-2 bg-[#493657] rounded-full mt-2 flex-shrink-0"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 1.5 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-[#493657] mb-4 text-xl">Application & Coverage</h4>
              <ul className="space-y-3">
                {application.map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 1.6 + idx * 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-700 text-base flex items-start gap-3"
                  >
                    <span className="w-2 h-2 bg-[#493657] rounded-full mt-2 flex-shrink-0"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Interior = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=400&fit=crop",
      title: "Calyco Latex Paint",
      description: "Calyco Latex Paint, with our exclusive Color Lock® technology, delivers the ultimate performance for color depth and richness that lasts. Perfect for all interior walls and ceilings.",
      features: [
        {
          number: "1",
          title: "Fresh Formulation",
          description: "Every batch is engineered for color precision and consistency."
        },
        {
          number: "2", 
          title: "Low-VOC, Safer Indoors",
          description: "Meets or exceeds modern standards for low emissions, making it ideal for homes, offices, and institutions."
        },
        {
          number: "3",
          title: "Smooth One-Coat Coverage", 
          description: "Fast application, less labor, and a flawless finish."
        },
        {
          number: "4",
          title: "Water-Based for Easy Cleanup",
          description: "Cleans up easily with soap and water — no harsh chemicals needed."
        }
      ],
      generalUse: "While primarily designed for interior surfaces, Calyco Latex Paint can be used outdoors, though darker colors may fade with prolonged sun exposure.",
      paintFinish: "A subtle sheen (above flat, below eggshell)",
      durability: "Paint on indoor walls can last 10+ years.",
      dilution: "Can be diluted with water. Washable with mild soap after curing.",
      performance: [
        "Stain-blocking: Yes",
        "Scrub-resistant / Washable: Yes", 
        "Good UV resistance for light/mid-tones",
        "Excellent intercoat adhesion and bonding on properly primed surfaces"
      ],
      application: [
        "Application: Brush, roller, or spray",
        "Coats Required: 1–2 coats depending on color/coverage",
        "Drying Time: Recoatable in 1–2 hours"
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop", 
      title: "Calyco Premium Interior",
      description: "Calyco Premium Interior is a luxurious finish designed for high-end residential and commercial applications. Provides superior durability and easy maintenance.",
      features: [
        {
          number: "1",
          title: "Advanced Formula",
          description: "Engineered with premium resins for exceptional durability and color retention."
        },
        {
          number: "2",
          title: "Zero-VOC Technology", 
          description: "Completely emission-free formula ensures the healthiest indoor air quality."
        },
        {
          number: "3",
          title: "Superior Coverage",
          description: "Excellent hiding power reduces the need for multiple coats."
        },
        {
          number: "4", 
          title: "Antimicrobial Protection",
          description: "Built-in protection against mold and mildew for long-lasting cleanliness."
        }
      ],
      generalUse: "Specifically formulated for interior use on walls, ceilings, and trim. Ideal for high-traffic areas and commercial spaces.",
      paintFinish: "Elegant satin finish with excellent washability",
      durability: "Professional-grade durability lasting 15+ years in residential applications.",
      dilution: "Ready-to-use formula. Clean with warm water and mild detergent.",
      performance: [
        "Superior stain resistance",
        "Highly scrub-resistant and washable",
        "Fade-resistant technology",
        "Excellent adhesion on all properly prepared surfaces"
      ],
      application: [
        "Application: Brush, roller, or airless spray",
        "Coats Required: 1 coat over primer, 2 coats for dramatic color changes",
        "Drying Time: Touch dry in 30 minutes, recoatable in 2 hours"
      ]
    }
  ];

  return (
    <div className="px-6 md:px-16 lg:px-32 py-32 bg-white text-black font-poppins min-h-screen overflow-hidden">
      <div className="">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-7xl font-semibold text-[#493657] mb-6"
          >
            Interior
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-2xl md:text-3xl text-black"
          >
            Bold Color. Smooth Finish. Healthier Indoors.
          </motion.p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          style={{ 
            transform: `translateY(${scrollY * 0.1}px)` 
          }}
          className="mb-24"
        >
          <motion.img 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop" 
            alt="Beautiful interior room with painted walls" 
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Products Section */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-20"
          >
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-[#493657] mb-6"
            >
              Our Interior Paint Collection
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              Discover our premium interior paint solutions, each crafted to deliver exceptional performance and lasting beauty for your spaces.
            </motion.p>
          </motion.div>

          {products.map((product, index) => (
            <ProductCard 
              key={index}
              image={product.image}
              title={product.title}
              description={product.description}
              features={product.features}
              generalUse={product.generalUse}
              paintFinish={product.paintFinish}
              durability={product.durability}
              dilution={product.dilution}
              performance={product.performance}
              application={product.application}
              index={index}
            />
          ))}
        </div>

        {/* Additional Images Section */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-24 pt-16 border-t border-gray-200"
        >
          <motion.h3 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-[#493657] mb-12 text-center"
          >
            Transform Your Space
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop",
                alt: "Living room with painted walls",
                title: "Living Spaces"
              },
              {
                src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
                alt: "Bedroom with painted walls",
                title: "Bedrooms"
              },
              {
                src: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=400&h=300&fit=crop",
                alt: "Kitchen with painted walls",
                title: "Kitchens"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="space-y-4"
              >
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={item.src}
                  alt={item.alt}
                  className="w-full rounded-lg shadow-md"
                />
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-700 text-center"
                >
                  {item.title}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-24 pt-16 border-t border-gray-200"
        >
          <motion.h3 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-[#493657] mb-6"
          >
            Need Help Choosing the Right Paint?
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Our experts are here to help you find the perfect solution for your project. Contact us for personalized recommendations and color consultations.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

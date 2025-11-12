import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TrustSection = () => {
  const trustCards = [
    {
      id: 1,
      title: "Paint that fits your project schedule",
      description: "Fast-drying, one-coat coverage for contractors and developers on timelines.",
      image: "/Assets/Inspiration/bedroom.jpg",
      alt: "Man in hard hat painting a white wall with roller",
      cta: "Get Started",
      link: "/product"
    },
    {
      id: 2,
      title: "Trusted by builders & developers",
      description: "Proven by large residential and commercial projects across India.",
      image: "/Assets/Inspiration/living.jpg",
      alt: "Man in hard hat with blueprints and building background",
      cta: "Request a Quote",
      link: "/contact"
    },
    {
      id: 3,
      title: "Durability you can count on",
      description: "Low-VOC, scrub-resistant paints engineered to last 10+ years indoors.",
      image: "/Assets/Inspiration/dining.jpg",
      alt: "Close-up of smooth matte purple painted surface",
      cta: "Explore Finishes",
      link: "/product"
    },
    {
      id: 4,
      title: "Eco-certified, safe formulas",
      description: "Water-based, eco-friendly paints with global sustainability standards.",
      image: "/Assets/Product Images/Luxury Interior Emulsion/1.png",
      alt: "CALYCO paint bucket with green leaf logo on wooden surface",
      cta: "Learn More",
      link: "/about"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by builders & developers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Proven by large residential and commercial projects across India.
          </p>
        </motion.div>

        {/* Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Link to={card.link} className="block group">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-[500px] max-w-sm mx-auto">
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {card.description}
                    </p>
                    
                    {/* CTA Button */}
                    <button className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full text-sm font-medium transition-all duration-200 hover:bg-gray-800">
                      {card.cta}
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

export default TrustSection;

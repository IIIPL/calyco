import React from 'react';
import { motion } from 'framer-motion';

const WhyTrustUs = () => {
  const trustReasons = [
    {
      id: 1,
      title: "Premium Quality",
      description: "Every Calyco product meets the highest industry standards for durability and finish quality.",
      image: "/Assets/LustroLite/inhouse.png",
      icon: "🏆"
    },
    {
      id: 2,
      title: "Expert Formulation",
      description: "Our paints are formulated by experts with decades of experience in the coatings industry.",
      image: "/Assets/Defense/NoBg.png",
      icon: "🔬"
    },
    {
      id: 3,
      title: "Proven Results",
      description: "Trusted by thousands of contractors and homeowners across India for their projects.",
      image: "/Assets/DeckSure/inuse.png",
      icon: "✅"
    },
    {
      id: 4,
      title: "Eco-Friendly",
      description: "Low-VOC, water-based formulas that are safe for your family and the environment.",
      image: "/Assets/LustroLite/ontable.png",
      icon: "🌱"
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
            Why Trust Calyco?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're not just another paint company. We're your partners in creating beautiful, lasting spaces.
          </p>
        </motion.div>

        {/* Trust Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustReasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Start Your Project
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTrustUs;

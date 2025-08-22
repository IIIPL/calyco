import React from 'react';
import { motion } from 'framer-motion';
import ValueCard from './ValueCard';

const MissionValues = ({ values = [] }) => {
  const defaultValues = [
    {
      icon: "🎨",
      title: "Color Excellence",
      body: "A carefully curated range of pigment-rich paint colors engineered for superior coverage and lasting vibrancy in both interior and exterior applications."
    },
    {
      icon: "💪",
      title: "Uncompromising Quality",
      body: "Our high-performance, scrubbable formula delivers perfectly even coverage and a long-lasting flawless finish every time, backed by our EcoMax Technology."
    },
    {
      icon: "🌱",
      title: "Planet-First Approach",
      body: "We put people and planet at the heart of every decision we make, from our innovative production process to our commitment to zero-VOC formulations."
    }
  ];

  const displayValues = values.length > 0 ? values : defaultValues;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-[#493657] mb-6 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            
            <motion.p 
              className="text-lg text-[#493657]/70 leading-relaxed tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              At Calyco Paints, we're committed to revolutionizing the paint industry through sustainable innovation. 
              Our mission is to provide premium, eco-friendly paint solutions that don't compromise on performance, 
              helping create healthier living spaces while protecting our environment for future generations.
            </motion.p>
          </motion.div>

          {/* Right Column - Values */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {displayValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ValueCard {...value} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionValues;

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-20 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
            Ready to paint a better future?
          </h2>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/products')}
              className="w-full md:w-auto px-6 py-3 bg-black text-white rounded-full font-medium text-base hover:bg-gray-800 transition-colors duration-300"
            >
              Explore Products
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="w-full md:w-auto px-6 py-3 border-2 border-black text-black rounded-full font-medium text-base hover:bg-black hover:text-white transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WhyTrustUs = () => {
  const navigate = useNavigate();
  
  return (
    <section className="w-full py-20 bg-white">
      <div className="w-full">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 px-4 md:px-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Quality you can trust, 
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-[#C6843A]">
          Colors you’ll love
          </p>
        </motion.div>

        {/* Four Cards Grid - offset layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {/* Left Column - Cards positioned higher */}
          <div className="flex flex-col gap-1 -mt-8 md:-mt-12">
            {/* Card 1: Care that fits your schedule */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-[#F6F0E9] p-12 shadow-sm rounded-[28px] overflow-hidden transition-all duration-300 min-h-[600px]"
            >
              <div className="text-center mb-6">
                <h3 className="text-5xl font-bold text-gray-900 mb-2">
                  Colors that fit
                </h3>
                <h3 className="text-5xl font-bold text-[#C6843A] -mt-1 mb-4">
                  your lifestyle
                </h3>
                <p className="text-gray-600 mb-6">
                  Personalized shade recommendations for every room and style—designed to match your home perfectly.
                </p>
                
                <button 
                  onClick={() => navigate('/colors')}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-colors"
                >
                  Explore Colors
                </button>
              </div>
              
              {/* Phone Mockup Image */}
              <div className="flex justify-center mt-20">
                <img 
                  src="/Assets/card1-trust.png"
                  alt="Picture of cards depicting losing weight"
                  className="w-[400px] h-[300px] object-cover rounded-xl shadow-md"
                />
              </div>
            </motion.div>

            {/* Card 3: Clinically proven ingredients */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-[#F6F0E9] p-12 shadow-sm rounded-[28px] overflow-hidden transition-all duration-300 min-h-[600px]"
            >
              <div className="text-center mb-6">
                <h3 className="text-5xl font-bold text-gray-900 mb-2">
                  Recommended by
                </h3>
                <h3 className="text-5xl font-bold text-[#C6843A] -mt-1 mb-4">
                  design experts
                </h3>
            
                <p className="text-gray-600 mb-6">
                  Professional advice and curated palettes to help you choose the right paints for lasting beauty.
                </p>
                <button 
                  onClick={() => navigate('/about')}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-colors"
                >
                  Get Expert Advice
                </button>
              </div>
              
              {/* Ingredients Image */}
              <div className="flex justify-center mt-20">
                <img 
                  src="/Assets/piotrekf_A_minimalistic_Scandinavian-style_interior_with_soft_n_89b15a3a-fb0e-4751-a060-037b2ec6493f.png"
                  alt="Image"
                  className="w-[400px] h-[300px] object-cover rounded-xl shadow-md"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Cards positioned lower */}
          <div className="flex flex-col gap-1 mt-8 md:mt-12">
            {/* Card 2: Prescribed by licensed providers */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-[#F6F0E9] p-12 shadow-sm rounded-[28px] overflow-hidden transition-all duration-300 min-h-[600px]"
            >
              <div className="text-center mb-6">
                <h3 className="text-5xl font-bold text-gray-900 mb-2">
                  Premium eco-friendly
                </h3>
                <h3 className="text-5xl font-bold text-[#C6843A] -mt-1 mb-4">
                  paints
                </h3>
    
                <p className="text-gray-600 mb-6">
                  Low-VOC, non-toxic paints tested for long-lasting finish and safe for kids and pets.
                </p>
                <button 
                  onClick={() => navigate('/products')}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-colors"
                >
                  View Paint Range
                </button>
              </div>
              
              {/* Doctor Image */}
              <div className="flex justify-center mt-20">
                <img 
                  src="/Assets/myth62340277_46978_A_modern_and_minimalist_living_room_with_bei_cd304044-6f5d-43ee-a38b-519f4a16a63d.png"
                  alt="Image"
                  className="w-[400px] h-[300px] object-cover rounded-xl shadow-md"
                />
              </div>
            </motion.div>

            {/* Card 4: FDA-regulated pharmacies */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-[#F6F0E9] p-12 shadow-sm rounded-[28px] overflow-hidden transition-all duration-300 min-h-[600px]"
            >
              <div className="text-center mb-6">
                <h3 className="text-5xl font-bold text-gray-900 mb-2">
                  Certified & trusted
                </h3>
                <h3 className="text-5xl font-bold text-[#C6843A] -mt-1 mb-4">
                  delivery
                </h3>
             
                <p className="text-gray-600 mb-6">
                  Delivered fresh from our certified facilities with quick, reliable shipping right to your door.
                </p>
                <button 
                  onClick={() => navigate('/products')}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-colors"
                >
                  Shop Now
                </button>
              </div>
              
              {/* Pharmacy Image */}
              <div className="flex justify-center mt-20">
                <img 
                  src="/Assets/mastergrain_73120_Modern_luxury_home_entrance_in_soft_diffused__9014453c-84fd-49cb-ae8f-9a8ed9477c63.png"
                  alt="collage of pictures with medicine making machines"
                  className="w-[400px] h-[300px] object-cover rounded-xl shadow-md"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-center text-xs text-gray-500 max-w-3xl mx-auto leading-relaxed px-4 md:px-8">
        At Calyco Paints, we are committed to delivering high-quality, durable, and eco-friendly products. While our paints and coatings are not FDA-approved, we ensure that they meet stringent industry standards for performance and safety. We prioritize transparency and trust by providing clear product information and offering professional consultation to help you choose the best solutions for your needs.
        </p>
      </div>
    </section>
  );
};

export default WhyTrustUs;

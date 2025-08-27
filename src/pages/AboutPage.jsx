import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import SEO from '../components/SEO';

// Simplified animation variants - very subtle
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

export default function AboutPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "About Us - Calyco Paints | Eco-Premium, Safety-First";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-poppins bg-white min-h-screen">
      <SEO 
        title="About Us - Calyco Paints | Eco-Premium, Safety-First"
        description="Learn about Calyco's mission to provide eco-premium paints with low VOC and water-based formulations."
        ogType="website"
      />
      {/* Hero Section - Full width with large image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/Assets/Inspiration/bedroom.jpg')",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-3xl md:text-[2.75rem] font-bold mb-6 tracking-tight drop-shadow-lg"
            style={{ fontWeight: 700 }}
            variants={fadeUp}
          >
            About Calyco
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 leading-relaxed drop-shadow-md max-w-2xl mx-auto font-light"
            variants={fadeUp}
          >
            Next-generation sustainable paint solutions for a cleaner future
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeUp}
          >
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-normal hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base"
            >
              Our Products
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onClick={() => navigate('/contact')}
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-normal hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base group"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Story & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Doing Things the Right Way
            </h2>
            <motion.div 
              className="w-20 h-1 bg-gradient-to-r from-[#F0C85A] to-[#493657] rounded-full mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            ></motion.div>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">We believe paint should enhance, protect and preserve without compromising our planet. From raw material sourcing to end‑of‑life disposal, we hold ourselves to the highest environmental standards.</p>
              <p className="text-xl text-gray-600 leading-relaxed">Our paints are formulated to be low‑VOC, water‑based and free of harmful chemicals. We work closely with suppliers who share our values and implement closed‑loop manufacturing to minimise waste.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology & Leadership */}
      <section id="ecomax" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">EcoMax™ Technology</h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">Our proprietary EcoMax™ technology blends high‑performance pigments with renewable binders, delivering colour depth, coverage and durability previously thought impossible for eco‑friendly paints.</p>
              <p className="text-xl text-gray-600 leading-relaxed">By engineering at the molecular level, we create paints that are stain‑resistant, scrub‑resistant and maintain vibrant colour for years. It's how we keep our promise to both homeowners and professionals.</p>
            </div>
            <div className="relative">
              <motion.div 
                className="aspect-square rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img 
                  src="/Assets/dudarte_A_cozy_living_room_with_fireplace_and_large_window_with_a2a959ab-0338-4553-87a0-f68ce48befa8.png"
                  alt="Modern interior showcasing Calyco paint technology"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Leadership</h3>
              <p className="text-gray-600 leading-relaxed">Founded by materials scientist Dr. Asha Mehta, Calyco is guided by experts in chemistry, sustainability and design. Our team believes that better paint can contribute to healthier, more beautiful spaces for all.</p>
            </motion.div>
            <motion.div 
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community & Partnerships</h3>
              <p className="text-gray-600 leading-relaxed">We collaborate with architects, contractors and communities to create spaces that inspire. By listening and co‑creating, we design solutions tailored to real projects and visions.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Calyco
            </h2>
            <motion.div 
              className="w-20 h-1 bg-gradient-to-r from-[#F0C85A] to-[#493657] rounded-full mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            ></motion.div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Every Calyco can is packed with innovation. Here are a few ways our paints stand out in the industry.</p>
          </motion.div>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img 
                  src="/Assets/asiiiasia0631_realistic_modern_interior_bright_minimalist_room__aedc26f1-f314-4909-b18e-756e99406eb9.png"
                  alt="Color consistency showcase"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">True Colour Consistency</h3>
              <p className="text-gray-600 leading-relaxed">Our precision tinting ensures that the colour you choose is the colour you get, every time. No surprises, just perfect shades.</p>
            </motion.div>
            <motion.div 
              className="p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img 
                  src="/Assets/sorbey._A_wide-shot_of_an_elegant_dining_room_featuring_a_woode_939e60b7-773c-49ed-b028-27b75f2fa5d1.png"
                  alt="Durable protection showcase"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ultra Durable Protection</h3>
              <p className="text-gray-600 leading-relaxed">Advanced resin systems and crosslinking deliver surfaces that resist stains, scrubbing and fading—indoors and out.</p>
            </motion.div>
            <motion.div 
              className="p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img 
                  src="/Assets/marketinghbh_Bright_modern_bathroom_warm_minimalism_strong_domi_9a9eafd9-1ec8-4df7-866a-122067cd26b3.png"
                  alt="Environmental responsibility showcase"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Environmentally Responsible</h3>
              <p className="text-gray-600 leading-relaxed">From our zero‑VOC formulas to recyclable packaging, we prioritise the planet at every step of our process.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid sm:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-[#493657] mb-4">0</div>
                <p className="text-xl text-gray-600 font-medium">VOC Emissions</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-[#493657] mb-4">100%</div>
                <p className="text-xl text-gray-600 font-medium">Water‑based Formulas</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-[#493657] mb-4">10+</div>
                <p className="text-xl text-gray-600 font-medium">Years of Protection</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Materials & Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Materials & Ingredients</h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">We obsess over what goes into our cans. Only the finest pigments, binders and additives make the cut, selected for performance and safety.</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-3 text-lg">
                <li>Renewable plant‑based binders</li>
                <li>High‑purity mineral pigments</li>
                <li>Non‑toxic additives for flow & leveling</li>
                <li>Recyclable aluminium cans & packaging</li>
              </ul>
            </div>
            <div className="relative">
              <motion.div 
                className="aspect-square rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img 
                  src="/Assets/bulendi_Frame_mockup_with_white_inside_hanging_on_wall_around_m_50856212-3b35-4550-8a87-7443af3cf317.png"
                  alt="Premium materials and ingredients showcase"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Testing & Certifications</h2>
            <p className="text-xl text-gray-600 mb-8 text-center leading-relaxed max-w-3xl mx-auto">Every batch is tested for adhesion, scrub resistance, colour retention and environmental impact. We proudly hold certifications from:</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-xl shadow-lg text-center">
                <h3 className="font-bold text-lg mb-2">GreenSeal GS‑11</h3>
                <p className="text-gray-600">Low‑emission coatings</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg text-center">
                <h3 className="font-bold text-lg mb-2">ISO 9001 & 14001</h3>
                <p className="text-gray-600">Quality & environmental management</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg text-center">
                <h3 className="font-bold text-lg mb-2">LEED v4</h3>
                <p className="text-gray-600">Compliant for sustainable buildings</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg text-center">
                <h3 className="font-bold text-lg mb-2">Cradle to Cradle™</h3>
                <p className="text-gray-600">Material health certification</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Planet First & Building Better */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Planet‑First Approach</h2>
            <motion.div 
              className="w-20 h-1 bg-gradient-to-r from-[#F0C85A] to-[#493657] rounded-full mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            ></motion.div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Sustainability isn't an afterthought—it's at the core of our business. From sourcing to manufacturing to end use, we minimise our footprint while maximising performance.</p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img 
                  src="/Assets/Inspiration/IMG-20250718-WA0045.jpg"
                  alt="Renewable energy showcase"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Renewable Energy</h3>
              <p className="text-gray-600 leading-relaxed">Our production facilities are powered by solar and wind, reducing carbon emissions and operating impact.</p>
            </motion.div>
            <motion.div 
              className="p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img 
                  src="/Assets/Inspiration/IMG-20250718-WA0043.jpg"
                  alt="Waste reduction showcase"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Waste Reduction</h3>
              <p className="text-gray-600 leading-relaxed">We've implemented closed‑loop systems that reuse solvents, recycle water and recycle unused pigments.</p>
            </motion.div>
            <motion.div 
              className="p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img 
                  src="/Assets/Inspiration/IMG-20250718-WA0044.jpg"
                  alt="Community projects showcase"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Projects</h3>
              <p className="text-gray-600 leading-relaxed">We donate a portion of profits to building and renovating community spaces using our sustainable products.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#1A1C24] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to paint a better future?</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">Join us on our mission to transform spaces with sustainable colour. Explore our products or talk to our team today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => navigate('/products')}
                className="px-8 py-4 bg-white text-[#1A1C24] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Products
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => navigate('/contact')}
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#1A1C24] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



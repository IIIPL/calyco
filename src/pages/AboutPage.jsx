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
            backgroundImage: "url('/Assets/mastergrain_73120_Modern_luxury_home_entrance_in_soft_diffused__9014453c-84fd-49cb-ae8f-9a8ed9477c63 (1).png')",
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
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">At <strong className="text-slate-700">Calyco Paints</strong>, we believe in doing things the right way. That's why we set out to make our paint the best it can be—combining cutting-edge sustainability with uncompromising performance.</p>
              <p className="text-xl text-gray-600 leading-relaxed">Founded in 2023, we've developed our exclusive <strong className="text-slate-700">EcoMax™ Technology</strong> that delivers gorgeous, vibrant hues with unsurpassed durability while maintaining zero-VOC formulations. It's the science behind Calyco's commitment to healthier living and environmental responsibility.</p>
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
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">Most traditional paint colorants require harsh chemicals that can weaken paint performance and indoor air quality. We realized that by developing our own eco-friendly colorants, designed specifically for our sustainable formulations, we could eliminate unnecessary chemicals that compromise both durability and health.</p>
              <p className="text-xl text-gray-600 leading-relaxed">What we created is a formula that's <strong className="text-slate-700">better, stronger, and cleaner</strong>—delivering exceptional color vibrancy while maintaining our commitment to zero-VOC, low-odor performance.</p>
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
                             <p className="text-gray-600 leading-relaxed">At the heart of this initiative is <strong className="text-slate-700">Armaan Kothary</strong>, a young environmental entrepreneur who launched Calyco Paints at the age of 16 with a vision to build smarter solutions for sustainable home living. His goal was to create a brand that combines environmental responsibility with design excellence—while offering safer and more breathable paints and coatings to Indian households and builders.</p>
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

      {/* Products Section */}
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
              Superior Performance, Sustainable Results
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">True Color Consistency</h3>
              <p className="text-gray-600 leading-relaxed">Our proprietary EcoMax™ colorants ensure the exact color you choose stays vibrant and true for years, maintaining consistency across our entire spectrum.</p>
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
              <p className="text-gray-600 leading-relaxed">Engineered to resist fading, peeling, and cracking, our paints stand up to daily wear and harsh conditions so you repaint when you want to, not out of necessity.</p>
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
              <p className="text-gray-600 leading-relaxed">Zero-VOC waterborne tinting system ensures our low-VOC paints remain environmentally safe even after tinting—an innovation others can't replicate.</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Future of Sustainable Painting</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">Through Calyco, we're making sustainability a standard, not a specialty, in Indian homes and construction. Every product is developed with meticulous attention to finish quality, color consistency, environmental safety, and real-world application performance.</p>
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What We're All About</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                  <h5 className="text-lg font-semibold text-slate-700 mb-3">Color Excellence</h5>
                  <p className="text-gray-600">
                    A carefully curated range of pigment-rich paint colors engineered for superior coverage and lasting vibrancy in both interior and exterior applications.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                  <h5 className="text-lg font-semibold text-slate-700 mb-3">Uncompromising Quality</h5>
                  <p className="text-gray-600">
                    Our high-performance, scrubbable formula delivers perfectly even coverage and a long-lasting flawless finish every time, backed by our EcoMax™ Technology.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                  <h5 className="text-lg font-semibold text-slate-700 mb-3">Planet-First Approach</h5>
                  <p className="text-gray-600">
                    We put people and planet at the heart of every decision we make, from our innovative production process to our commitment to zero-VOC formulations.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                  <h5 className="text-lg font-semibold text-slate-700 mb-3">Building Better Homes</h5>
                  <p className="text-gray-600">
                    We're here to help transform Indian homes with sustainable solutions, providing expert guidance and premium products for every painting project.
                  </p>
                </div>
              </div>
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



import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  useEffect(() => {
    document.title = "About Us - Calyco Paints | Eco-Premium, Safety-First";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
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
            className="text-4xl md:text-6xl font-light mb-8 leading-tight tracking-wide"
            variants={fadeUp}
          >
            About
            <span className="block font-bold">Calyco Paints</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-12 text-gray-200 leading-relaxed max-w-2xl mx-auto font-light"
            variants={fadeUp}
          >
            Next-generation sustainable paint solutions for a cleaner future
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeUp}
          >
            <Link
              to="/products"
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-none font-medium text-base transition-all duration-300 border border-white"
            >
              Our Products
            </Link>
            <Link
              to="/contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white px-8 py-3 rounded-none font-medium text-base transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Story & Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Doing Things the Right Way</h2>
            <p className="text-gray-600 mb-4">We believe paint should enhance, protect and preserve without compromising our planet. From raw material sourcing to end‑of‑life disposal, we hold ourselves to the highest environmental standards.</p>
            <p className="text-gray-600">Our paints are formulated to be low‑VOC, water‑based and free of harmful chemicals. We work closely with suppliers who share our values and implement closed‑loop manufacturing to minimise waste.</p>
                </div>
        </div>
      </section>

      {/* Technology & Leadership */}
      <section id="ecomax" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">EcoMax™ Technology</h2>
              <p className="text-gray-600 mb-4">Our proprietary EcoMax™ technology blends high‑performance pigments with renewable binders, delivering colour depth, coverage and durability previously thought impossible for eco‑friendly paints.</p>
              <p className="text-gray-600 mb-6">By engineering at the molecular level, we create paints that are stain‑resistant, scrub‑resistant and maintain vibrant colour for years. It's how we keep our promise to both homeowners and professionals.</p>
                </div>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Leadership</h3>
                <p className="text-gray-600">Founded by materials scientist Dr. Asha Mehta, Calyco is guided by experts in chemistry, sustainability and design. Our team believes that better paint can contribute to healthier, more beautiful spaces for all.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Community & Partnerships</h3>
                <p className="text-gray-600">We collaborate with architects, contractors and communities to create spaces that inspire. By listening and co‑creating, we design solutions tailored to real projects and visions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Calyco</h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">Every Calyco can is packed with innovation. Here are a few ways our paints stand out in the industry.</p>
              </div>
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-2">True Colour Consistency</h3>
            <p className="text-gray-600">Our precision tinting ensures that the colour you choose is the colour you get, every time. No surprises, just perfect shades.</p>
              </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-2">Ultra Durable Protection</h3>
            <p className="text-gray-600">Advanced resin systems and crosslinking deliver surfaces that resist stains, scrubbing and fading—indoors and out.</p>
                </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-2">Environmentally Responsible</h3>
            <p className="text-gray-600">From our zero‑VOC formulas to recyclable packaging, we prioritise the planet at every step of our process.</p>
            </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-purple-700 mb-2">0</div>
              <p className="text-gray-600">VOC Emissions</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-700 mb-2">100%</div>
              <p className="text-gray-600">Water‑based Formulas</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-700 mb-2">10+</div>
              <p className="text-gray-600">Years of Protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials & Certifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Materials & Ingredients</h2>
            <p className="text-gray-600 mb-4">We obsess over what goes into our cans. Only the finest pigments, binders and additives make the cut, selected for performance and safety.</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Renewable plant‑based binders</li>
              <li>High‑purity mineral pigments</li>
              <li>Non‑toxic additives for flow & leveling</li>
              <li>Recyclable aluminium cans & packaging</li>
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Testing & Certifications</h2>
            <p className="text-gray-600 mb-4">Every batch is tested for adhesion, scrub resistance, colour retention and environmental impact. We proudly hold certifications from:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>GreenSeal GS‑11: Low‑emission coatings</li>
              <li>ISO 9001 & 14001 quality & environmental management</li>
              <li>LEED v4 compliant for sustainable buildings</li>
              <li>Cradle to Cradle™ material health certification</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Planet First & Building Better */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Planet‑First Approach</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">Sustainability isn't an afterthought—it's at the core of our business. From sourcing to manufacturing to end use, we minimise our footprint while maximising performance.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Renewable Energy</h3>
            <p className="text-gray-600">Our production facilities are powered by solar and wind, reducing carbon emissions and operating impact.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Waste Reduction</h3>
            <p className="text-gray-600">We've implemented closed‑loop systems that reuse solvents, recycle water and recycle unused pigments.</p>
                </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Community Projects</h3>
            <p className="text-gray-600">We donate a portion of profits to building and renovating community spaces using our sustainable products.</p>
                </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-purple-700 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to paint a better future?</h2>
          <p className="text-purple-100 mb-6">Join us on our mission to transform spaces with sustainable colour. Explore our products or talk to our team today.</p>
        </div>
      </section>
    </div>
  );
}



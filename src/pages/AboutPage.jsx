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

// Mission & Values data
const VALUES = [
  {
    icon: "",
    title: "Color Excellence",
    description: "A carefully curated range of pigment-rich paint colors engineered for superior coverage and lasting vibrancy in both interior and exterior applications.",
  },
  {
    icon: "",
    title: "Uncompromising Quality",
    description: "Our high-performance, scrubbable formula delivers perfectly even coverage and a long-lasting flawless finish every time, backed by our EcoMax Technology.",
  },
  {
    icon: "",
    title: "Planet-First Approach",
    description: "We put people and planet at the heart of every decision we make, from our innovative production process to our commitment to zero-VOC formulations.",
  },
  {
    icon: "",
    title: "Building Better Homes",
    description: "We're here to help transform Indian homes with sustainable solutions, providing expert guidance and premium products for every painting project.",
  },
];

// Impact stats data
const IMPACT_STATS = [
  {
    number: "0",
    label: "VOC Emissions",
    description: "Zero-VOC formulations",
  },
  {
    number: "100%",
    label: "Water-Based Formula",
    description: "Eco-friendly solutions",
  },
  {
    number: "10+",
    label: "Years Durability",
    description: "Long-lasting protection",
  },
];

// Team data
const TEAM = [
  {
    name: "Armaan Kothary",
    role: "Founder & Innovator",
    image: "/Assets/color-banner.png",
    description: "Launched Calyco Paints at age 15 with a vision to build smarter solutions for sustainable home living.",
  },
];

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

      {/* Company Introduction Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide uppercase"
              variants={fadeUp}
            >
              Doing Things the Right Way
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-[#5E3A98] to-[#F0C85A] mx-auto rounded-full"
              variants={fadeUp}
            />
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="bg-gradient-to-br from-[#efe7ff] to-[#fff3c6] rounded-3xl p-8 md:p-12 shadow-lg mb-12"
          >
            <p className="text-xl leading-relaxed text-gray-700 mb-6">
              At <strong className="text-[#5E3A98]">Calyco Paints</strong>, we believe in doing things the right way. That's why we set out to make our paint the best it can be—combining cutting-edge sustainability with uncompromising performance.
            </p>
            <p className="text-xl leading-relaxed text-gray-700">
              Founded in 2023, we've developed our exclusive <strong className="text-[#5E3A98]">EcoMax Technology</strong> that delivers gorgeous, vibrant hues with unsurpassed durability while maintaining zero-VOC formulations. It's the science behind Calyco's commitment to healthier living and environmental responsibility.
            </p>
          </motion.div>

          {/* Technology Innovation Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center mb-12"
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">EcoMax: The Science of Sustainable Strength</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Most traditional paint colorants require harsh chemicals that can weaken paint performance and indoor air quality. We realized that by developing our own eco-friendly colorants, designed specifically for our sustainable formulations, we could eliminate unnecessary chemicals that compromise both durability and health.
                </p>
                <p>
                  What we created is a formula that's <strong className="text-[#5E3A98]">better, stronger, and cleaner</strong>—delivering exceptional color vibrancy while maintaining our commitment to zero-VOC, low-odor performance.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 shadow-lg border border-[#5E3A98]">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#5E3A98] to-[#F0C85A] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">🧪</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">EcoMax Technology</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  "EcoMax makes our paint cleaner on the inside and truer on the outside, delivering sustainable performance that lasts for years."
                </p>
                <p className="text-[#5E3A98] text-xs mt-3 font-medium">— ARMAAN KOTHARY, FOUNDER</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h3 variants={fadeUp} className="text-3xl font-bold text-gray-800 mb-8">Meet Our Founder</motion.h3>
            
            <motion.div variants={fadeUp} className="mb-12">
              <div className="space-y-6 text-lg text-gray-700 text-center max-w-7xl mx-auto">
                <p>
                  At the heart of this initiative is <strong className="text-[#5E3A98]">Armaan Kothary</strong>, a young environmental
                  entrepreneur who launched Calyco Paints at the age of 15 with a vision to build smarter
                  solutions for sustainable home living.
                </p>
                <p>
                  His goal was to create a brand that combines environmental responsibility with design excellence—while offering safer and more breathable paints and coatings to Indian households and builders.
                </p>
                <p>
                  From product development and sourcing to formulation, testing, and outreach, Armaan leads every step of Calyco's operations, pioneering a cleaner, smarter, and more responsible way to paint and protect the future.
                </p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex justify-center"
          >
            <div className="bg-gradient-to-br from-[#efe7ff] to-[#fff3c6] rounded-3xl p-8 shadow-lg max-w-md">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="w-20 h-20 bg-gradient-to-br from-[#5E3A98] to-[#F0C85A] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">AK</span>
                </div>
                <h4 className="text-xl font-bold text-center text-gray-800 mb-2">Armaan Kothary</h4>
                <p className="text-center text-gray-600">Founder & Innovator</p>
                <p className="text-center text-sm text-[#5E3A98] mt-2">Age 15 at founding</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h3 
              className="text-3xl font-bold text-gray-800 mb-4"
              variants={fadeUp}
            >
              Superior Performance, Sustainable Results
            </motion.h3>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-[#5E3A98] to-[#F0C85A] mx-auto rounded-full"
                variants={fadeUp}
            />
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            <motion.div variants={scaleIn} className="bg-white rounded-2xl p-8 shadow-lg border border-[#5E3A98] hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#5E3A98] to-[#7a56b4] rounded-xl mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded opacity-80"></div>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Interior Water-Based Latex Paints</h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                Zero-VOC, quick-drying, and completely odor-free paints for walls and ceilings. Our EcoMax Technology ensures vibrant colors that resist fading indoors while maintaining exceptional durability.
              </p>
              <div className="text-sm font-medium">
                ✓ Zero-VOC Formula  ✓ Fade Resistant  ✓ Superior Coverage
              </div>
            </motion.div>
            
            <motion.div variants={scaleIn} className="bg-white rounded-2xl p-8 shadow-lg border border-[#F0C85A] hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F0C85A] to-[#e3b842] rounded-xl mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded opacity-80"></div>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Multi-Surface Stains & Sealers</h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                Advanced waterborne coatings for wood, concrete, masonry, and metal. Engineered to withstand harsh weather conditions while providing long-term protection and flexibility.
              </p>
              <div className="text-sm font-medium">
                ✓ Weather Resistant  ✓ Multi-Surface  ✓ Long-Lasting Protection
              </div>
            </motion.div>
          </motion.div>

          {/* Quality Promise Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
            className="bg-gradient-to-br from-gray-50 to-[#efe7ff] rounded-3xl p-8 md:p-12"
          >
            <div className="grid lg:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-[#5E3A98]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">True Color Consistency</h4>
                <p className="text-gray-600">
                  Our proprietary EcoMax colorants ensure the exact color you choose stays vibrant and true for years, maintaining consistency across our entire spectrum.
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-[#F0C85A]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-[#F0C85A] text-2xl">🛡️</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Ultra Durable Protection</h4>
                <p className="text-gray-600">
                  Engineered to resist fading, peeling, and cracking, our paints stand up to daily wear and harsh conditions so you repaint when you want to, not out of necessity.
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-[#5E3A98]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Environmentally Responsible</h4>
                <p className="text-gray-600">
                  Zero-VOC waterborne tinting system ensures our low-VOC paints remain environmentally safe even after tinting—an innovation others can't replicate.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="bg-[rgb(17,24,39)] rounded-3xl p-12 text-center text-white mb-12"
          >
            <h3 className="text-3xl font-bold mb-6 text-white">The Future of Sustainable Painting</h3>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8 text-white">
              Through Calyco, we're making sustainability a standard, not a specialty, in Indian homes and construction. Every product is developed with meticulous attention to finish quality, color consistency, environmental safety, and real-world application performance.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2 text-[#F0C85A]">0</div>
                <div className="text-sm uppercase tracking-wide text-white">VOC Emissions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2 text-[#F0C85A]">100%</div>
                <div className="text-sm uppercase tracking-wide text-white">Water-Based Formula</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2 text-[#F0C85A]">10+</div>
                <div className="text-sm uppercase tracking-wide text-white">Years Durability</div>
              </div>
            </div>
              </motion.div>
        </div>
      </section>

      {/* Research & Innovation Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
            {/* LEFT: taller column */}
            <motion.div variants={fadeUp} className="space-y-6">
              {/* Pioneering Innovation */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5E3A98] to-[#F0C85A] rounded-xl mb-6 flex items-center justify-center">
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4">Pioneering Innovation</h4>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our commitment to research and development has positioned us as leaders in sustainable paint technology.
                  We continuously innovate to create products that are effective, safe, and minimize environmental impact.
                  Using our EcoMax colorant system and low-VOC binders, we prototype, test, and iterate until performance
                  meets CALYCO standards for coverage, washability, and UV stability.
                </p>
                <div className="text-[#5E3A98] text-sm font-medium space-y-1">
                  <div>✓ In-house R&D facility  ✓ Proprietary formulations  ✓ Continuous testing</div>
                  <div>✓ Zero-VOC tinting workflow that preserves low-VOC after color</div>
                </div>
              </div>

              {/* Materials, Testing & Certifications */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#5E3A98]/30">
                <div className="w-16 h-16 bg-[#5E3A98]/10 rounded-xl mb-6 flex items-center justify-center">
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Materials, Testing & Certifications</h4>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Every batch passes accelerated weathering, scrub-resistance, and adhesion tests. We validate against BIS/ASTM
                  methods and run field panels on masonry, metal, and wood to prove long-term durability in Indian climates.
                </p>
              </div>
            </motion.div>
            
            {/* RIGHT: keep as before */}
            <motion.div variants={fadeUp}>
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">What We're All About</h4>
                <p className="text-gray-600 text-base leading-relaxed">
                  Our core values drive everything we do, from product development to customer service. We're committed to
                  delivering excellence in every aspect of our business.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-md border border-[#5E3A98]">
                  <h5 className="text-lg font-semibold text-[#5E3A98] mb-2">Color Excellence</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    A carefully curated range of pigment-rich paint colors engineered for superior coverage and lasting
                    vibrancy in both interior and exterior applications.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-5 shadow-md border border-[#F0C85A]">
                  <h5 className="text-lg font-semibold text-[#5E3A98] mb-2">Uncompromising Quality</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our high-performance, scrubbable formula delivers perfectly even coverage and a long-lasting flawless finish
                    every time, backed by our EcoMax Technology.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-5 shadow-md border border-[#5E3A98]">
                  <h5 className="text-lg font-semibold text-[#5E3A98] mb-2">Planet-First Approach</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We put people and planet at the heart of every decision we make, from our innovative production process to
                    our commitment to zero-VOC formulations.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-5 shadow-md border border-[#F0C85A]">
                  <h5 className="text-lg font-semibold text-[#5E3A98] mb-2">Building Better Homes</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We're here to help transform Indian homes with sustainable solutions, providing expert guidance and premium
                    products for every painting project.
                  </p>
                </div>
          </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values Section - Clean grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide uppercase"
              variants={fadeUp}
            >
              Mission & Values
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
              variants={fadeUp}
            >
              Four pillars that guide everything we do at Calyco
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {VALUES.map((value, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center p-8 bg-white hover:bg-gray-50 transition-all duration-300 border border-gray-100"
              >

                <h3 className="text-lg font-medium text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm font-light">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Section - Clean cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide uppercase"
              variants={fadeUp}
            >
              Impact in Numbers
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
              variants={fadeUp}
            >
              Real results from our commitment to safety and sustainability
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {IMPACT_STATS.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-light text-gray-900 mb-4">
                  {stat.number}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-gray-600 text-sm font-light">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our People Section - Large profile images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide uppercase"
              variants={fadeUp}
            >
              Our People
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
              variants={fadeUp}
            >
              Meet the team driving innovation and sustainability at Calyco
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex justify-center"
          >
            {TEAM.map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-white overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 max-w-sm"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed text-sm font-light">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* Final CTA Section - Full width dark background */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light mb-8 tracking-wide uppercase"
              variants={fadeUp}
            >
              Ready to paint a better future?
            </motion.h2>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeUp}
            >
              <Link
                to="/colors"
                className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-none font-medium text-base transition-all duration-300 border border-white"
              >
                Explore Colors
              </Link>
              <Link
                to="/contact"
                className="bg-transparent hover:bg-white/10 text-white border border-white px-8 py-3 rounded-none font-medium text-base transition-all duration-300"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
      </div>
      </section>
    </div>
  );
}



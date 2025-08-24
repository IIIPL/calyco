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

      {/* Hero Block - Company Introduction */}
      <section className="relative py-24 bg-[#F8F7F2] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_100%_0%,rgba(240,200,90,.08),transparent)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          {/* Hero Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-[clamp(2.25rem,5vw,4rem)] font-bold text-[#1A1C24] mb-6 leading-tight tracking-tight"
              variants={fadeUp}
            >
              Doing Things the Right Way
            </motion.h2>
            <motion.p 
              className="text-xl text-[#1A1C24]/80 max-w-3xl mx-auto mb-8 leading-relaxed"
              variants={fadeUp}
            >
              Next-generation sustainable paint solutions that combine cutting-edge innovation with uncompromising environmental responsibility.
            </motion.p>
            

          </motion.div>
        </div>
      </section>

      {/* Two-Column Grid: Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Left Column: Lifestyle Image */}
            <motion.div variants={fadeUp}>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/Assets/Inspiration/living.jpg"
                  alt="Family enjoying their beautifully painted living space"
                  className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C24]/20 to-transparent"></div>
              </div>
            </motion.div>
            
            {/* Right Column: Who We Are Narrative */}
            <motion.div variants={fadeUp} className="space-y-6">
              <h3 className="text-3xl font-bold text-[#1A1C24] mb-6">Who We Are</h3>
                              <div className="space-y-4 text-[#1A1C24]/80 leading-relaxed">
                  <p>
                    At <strong className="text-[#1A1C24]">Calyco Paints</strong>, we believe in doing things the right way. That's why we set out to make our paint the best it can be—combining cutting-edge sustainability with uncompromising performance.
                  </p>
                  <p>
                    Founded in 2023, we've developed our exclusive <strong className="text-[#1A1C24]">EcoMax Technology</strong> that delivers gorgeous, vibrant hues with unsurpassed durability while maintaining zero-VOC formulations. It's the science behind Calyco's commitment to healthier living and environmental responsibility.
                  </p>
                  <p>
                    Most traditional paint colorants require harsh chemicals that can weaken paint performance and indoor air quality. We realized that by developing our own eco-friendly colorants, designed specifically for our sustainable formulations, we could eliminate unnecessary chemicals that compromise both durability and health.
                  </p>
                </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-[#1A1C24] mb-6">Our Journey</h3>
            <p className="text-[#1A1C24]/80 max-w-2xl mx-auto">Key milestones that shaped Calyco's path to innovation and sustainability.</p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { year: "2023", title: "Founded", desc: "Calyco Paints launched with a vision for sustainable solutions" },
              { year: "2023", title: "EcoMax Tech", desc: "Developed proprietary zero-VOC colorant system" },
              { year: "2024", title: "Government Projects", desc: "Secured compliance certifications and partnerships" },
              { year: "2024", title: "Sacred Palette", desc: "Launched curated color collection for Indian homes" }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-[#1A1C24]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-[#1A1C24] text-2xl font-bold">{milestone.year}</span>
                </div>
                <h4 className="text-lg font-bold text-[#1A1C24] mb-2">{milestone.title}</h4>
                <p className="text-[#1A1C24]/70 text-sm">{milestone.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Promise - Radial Gradient Panel */}
      <section className="py-20 bg-gradient-to-br from-[#1A1C24] via-[#1A1C24] to-[#1A1C24] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_100%_0%,rgba(240,200,90,.12),transparent)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-3xl font-bold text-white mb-6">Our Promise</h3>
              <p className="text-xl text-white/80 mb-6 leading-relaxed">
                What we created is a formula that's <strong className="text-[#F0C85A]">better, stronger, and cleaner</strong>—delivering exceptional color vibrancy while maintaining our commitment to zero-VOC, low-odor performance.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-white mb-3">EcoMax Technology</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    "EcoMax makes our paint cleaner on the inside and truer on the outside, delivering sustainable performance that lasts for years."
                  </p>
                  <p className="text-white/60 text-xs mt-3 font-medium">— ARMAAN KOTHARY, FOUNDER</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeUp}>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/Assets/painter.webp"
                  alt="Professional painter applying Calyco paint"
                  className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C24]/20 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={fadeUp} className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="text-2xl font-bold text-[#1A1C24] mb-4">Our Vision</h4>
              <p className="text-[#1A1C24]/80 leading-relaxed">
                To make sustainability a standard, not a specialty, in Indian homes and construction. Every product is developed with meticulous attention to finish quality, color consistency, environmental safety, and real-world application performance.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="text-2xl font-bold text-[#1A1C24] mb-4">Our Mission</h4>
              <p className="text-[#1A1C24]/80 leading-relaxed">
                To provide safer, more breathable paints and coatings to Indian households and builders while maintaining uncompromising quality and performance standards that exceed industry expectations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Curved Separator */}
      <div aria-hidden="true">
        <svg viewBox="0 0 1440 100" className="block w-full text-[#FAFAF7]" preserveAspectRatio="none">
          <path d="M0,64 C240,96 480,112 720,112 C960,112 1200,96 1440,64 L1440,100 L0,100 Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Stats Section - Improved composition */}
      <section className="py-10 md:py-14 bg-[#FAFAF7]">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="rounded-2xl border shadow-sm p-8 md:p-10 bg-white"
          >
            <ul className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#1A1C24]/10">
              {[
                { number: "20+", label: "Core Products", desc: "Complete eco-premium range" },
                { number: "10+", label: "Years Durability", desc: "Long-lasting protection" },
                { number: "Zero-VOC", label: "Certified", desc: "Safer formulations" }
              ].map((stat, index) => (
                <motion.li 
                  key={index}
                  variants={fadeUp}
                  className="py-6 sm:py-0 sm:px-8 text-center"
                >
                  <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A1C24]">
                    {stat.number}
                  </div>
                  <div className="mt-2 text-base font-semibold text-[#1A1C24]">{stat.label}</div>
                  <p className="mt-1 text-sm text-[#1A1C24]/80">{stat.desc}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Curved Divider */}
      <div className="relative bg-white">
        <svg className="w-full h-16 text-[#FAFAF7]" viewBox="0 0 1200 64" fill="currentColor">
          <path d="M0,0 C400,64 800,64 1200,0 L1200,64 L0,64 Z"></path>
        </svg>
      </div>

      {/* Founder Section */}
      <section className="py-20 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h3 variants={fadeUp} className="text-3xl font-bold text-[#1A1C24] mb-8">Meet Our Founder</motion.h3>
            
            <motion.div variants={fadeUp} className="mb-12">
              <div className="space-y-6 text-lg text-[#1A1C24]/80 text-center max-w-7xl mx-auto">
                <p>
                  At the heart of this initiative is <strong className="text-[#1A1C24]">Armaan Kothary</strong>, a young environmental
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
            <div className="max-w-md">
              <div className="p-4">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1A1C24] to-[#493657] rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">AK</span>
                </div>
                <h4 className="text-base font-bold text-center text-[#1A1C24] mb-1">Armaan Kothary</h4>
                <p className="text-center text-[#1A1C24]/70 text-xs">Founder & Innovator</p>
                <p className="text-center text-xs text-[#1A1C24] mt-1">Age 15 at founding</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

            {/* Products Section */}
      <section className="py-20 bg-[#F8F7F2] relative overflow-hidden">
        {/* Radial Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_100%_0%,rgba(240,200,90,.12),transparent)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h3 
              className="text-4xl md:text-5xl font-black text-[#1A1C24] mb-4"
              variants={fadeUp}
            >
              Superior Performance, Sustainable Results
            </motion.h3>
                        <motion.div 
              className="w-24 h-1 bg-[#F0C85A] mx-auto rounded-full"
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
            <motion.div variants={scaleIn} className="p-8 hover:shadow-2xl transition-shadow duration-300 border border-[#1A1C24]/20 rounded-2xl bg-white/50">
              <h4 className="text-2xl font-bold text-[#1A1C24] mb-4">Interior Water-Based Latex Paints</h4>
              <p className="text-[#1A1C24]/90 leading-relaxed mb-4">
                Zero-VOC, quick-drying, and completely odor-free paints for walls and ceilings. Our EcoMax Technology ensures vibrant colors that resist fading indoors while maintaining exceptional durability.
              </p>
              <div className="text-sm font-medium text-[#1A1C24]/70">
                ✓ Zero-VOC Formula  ✓ Fade Resistant  ✓ Superior Coverage
              </div>
            </motion.div>
            
            <motion.div variants={scaleIn} className="p-8 hover:shadow-2xl transition-shadow duration-300 border border-[#1A1C24]/20 rounded-2xl bg-white/50">
              <h4 className="text-2xl font-bold text-[#1A1C24] mb-4">Multi-Surface Stains & Sealers</h4>
              <p className="text-[#1A1C24]/90 leading-relaxed mb-4">
                Advanced waterborne coatings for wood, concrete, masonry, and metal. Engineered to withstand harsh weather conditions while providing long-term protection and flexibility.
              </p>
              <div className="text-sm font-medium text-[#1A1C24]/80">
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
            className="bg-white/80 rounded-3xl p-8 md:p-12 border border-[#1A1C24]/10"
          >
            <div className="grid lg:grid-cols-3 gap-8 text-center">
                              <div className="p-6 border border-[#1A1C24]/20 rounded-2xl">
                  <h4 className="text-2xl font-bold text-[#1A1C24] mb-3">True Color Consistency</h4>
                  <p className="text-[#1A1C24]/80">
                    Our proprietary EcoMax colorants ensure the exact color you choose stays vibrant and true for years, maintaining consistency across our entire spectrum.
                  </p>
                </div>
                
                <div className="p-6 border border-[#1A1C24]/20 rounded-2xl">
                  <h4 className="text-2xl font-bold text-[#1A1C24] mb-3">Ultra Durable Protection</h4>
                  <p className="text-[#1A1C24]/80">
                    Engineered to resist fading, peeling, and cracking, our paints stand up to daily wear and harsh conditions so you repaint when you want to, not out of necessity.
                  </p>
                </div>
                
                <div className="p-6 border border-[#1A1C24]/20 rounded-2xl">
                  <h4 className="text-2xl font-bold text-[#1A1C24] mb-3">Environmentally Responsible</h4>
                  <p className="text-[#1A1C24]/80">
                    Zero-VOC waterborne tinting system ensures our low-VOC paints remain environmentally safe even after tinting—an innovation others can't replicate.
                  </p>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="bg-[#8B733F] rounded-3xl p-12 text-center text-white mb-12 shadow-2xl border border-white/10"
          >
            <h3 className="text-3xl font-bold mb-6 text-white">The Future of Sustainable Painting</h3>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8 text-white/90">
              Through Calyco, we're making sustainability a standard, not a specialty, in Indian homes and construction. Every product is developed with meticulous attention to finish quality, color consistency, environmental safety, and real-world application performance.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                <div className="text-3xl font-bold mb-2 text-white">0</div>
                <div className="text-sm uppercase tracking-wide text-white/90">VOC Emissions</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                <div className="text-3xl font-bold mb-2 text-white">100%</div>
                <div className="text-sm uppercase tracking-wide text-white/90">Water-Based Formula</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                <div className="text-3xl font-bold mb-2 text-white">10+</div>
                <div className="text-sm uppercase tracking-wide text-white/90">Years Durability</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research & Innovation Section */}
      <section className="py-20 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: taller column */}
            <div className="space-y-6">
              {/* Pioneering Innovation */}
              <div className="p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
                <h4 className="text-2xl font-bold text-[#1A1C24] mb-4">Pioneering Innovation</h4>
                <p className="text-[#1A1C24]/80 leading-relaxed mb-4">
                  Our commitment to research and development has positioned us as leaders in sustainable paint technology.
                  We continuously innovate to create products that are effective, safe, and minimize environmental impact.
                  Using our EcoMax colorant system and low-VOC binders, we prototype, test, and iterate until performance
                  meets CALYCO standards for coverage, washability, and UV stability.
                </p>
                <div className="text-[#1A1C24] text-sm font-medium space-y-1">
                  <div>✓ In-house R&D facility  ✓ Proprietary formulations  ✓ Continuous testing</div>
                  <div>✓ Zero-VOC tinting workflow that preserves low-VOC after color</div>
                </div>
              </div>

              {/* Materials, Testing & Certifications */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                <h4 className="text-2xl font-bold text-[#1A1C24] mb-3">Materials, Testing & Certifications</h4>
                <p className="text-[#1A1C24]/80 leading-relaxed mb-4">
                  Every batch passes accelerated weathering, scrub-resistance, and adhesion tests. We validate against BIS/ASTM
                  methods and run field panels on masonry, metal, and wood to prove long-term durability in Indian climates.
                </p>
              </div>
            </div>
            
            {/* RIGHT: keep as before */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-[#1A1C24] mb-2">What We're All About</h4>
                <p className="text-[#1A1C24]/80 text-base leading-relaxed">
                  Our core values drive everything we do, from product development to customer service. We're committed to
                  delivering excellence in every aspect of our business.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="p-5 bg-white/50 rounded-xl border border-white/30">
                  <h5 className="text-lg font-semibold text-[#1A1C24] mb-2">Color Excellence</h5>
                  <p className="text-[#1A1C24]/80 text-sm leading-relaxed">
                    A carefully curated range of pigment-rich paint colors engineered for superior coverage and lasting
                    vibrancy in both interior and exterior applications.
                  </p>
                </div>
                
                <div className="p-5 bg-white/50 rounded-xl border border-white/30">
                  <h5 className="text-lg font-semibold text-[#1A1C24] mb-2">Uncompromising Quality</h5>
                  <p className="text-[#1A1C24]/80 text-sm leading-relaxed">
                    Our high-performance, scrubbable formula delivers perfectly even coverage and a long-lasting flawless finish
                    every time, backed by our EcoMax Technology.
                  </p>
                </div>
                
                <div className="p-5 bg-white/50 rounded-xl border border-white/30">
                  <h5 className="text-lg font-semibold text-[#1A1C24] mb-2">Planet-First Approach</h5>
                  <p className="text-[#1A1C24]/80 text-sm leading-relaxed">
                    We put people and planet at the heart of every decision we make, from our innovative production process to
                    our commitment to zero-VOC formulations.
                  </p>
                </div>
                
                <div className="p-5 bg-white/50 rounded-xl border border-white/30">
                  <h5 className="text-lg font-semibold text-[#1A1C24] mb-2">Building Better Homes</h5>
                  <p className="text-[#1A1C24] text-sm leading-relaxed">
                    We're here to help transform Indian homes with sustainable solutions, providing expert guidance and premium
                    products for every painting project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section - Clean grid */}
      <section className="py-20 bg-[#1A1C24] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide uppercase"
              variants={fadeUp}
            >
              Mission & Values
            </motion.h2>
            <motion.p 
              className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light"
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
                className="text-center p-8 bg-white/95 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 border border-white/20 rounded-2xl shadow-2xl"
              >

                <h3 className="text-lg font-medium text-[#1A1C24] mb-3">{value.title}</h3>
                <p className="text-[#1A1C24]/80 leading-relaxed text-sm font-light">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Section - Clean cards */}
      <section className="py-20 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-[#1A1C24] mb-6 tracking-wide uppercase"
              variants={fadeUp}
            >
              Impact in Numbers
            </motion.h2>
            <motion.p 
              className="text-lg text-[#1A1C24]/80 max-w-2xl mx-auto leading-relaxed font-light"
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
                className="text-center p-8 bg-white/95 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 rounded-2xl shadow-2xl"
              >
                <div className="text-5xl md:text-6xl font-light text-[#1A1C24] mb-4">
                  {stat.number}
                </div>
                <h3 className="text-lg font-medium text-[#1A1C24] mb-2">{stat.label}</h3>
                <p className="text-[#1A1C24]/80 text-sm font-light">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our People Section - Large profile images */}
      <section className="py-20 bg-[#1A1C24] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide uppercase"
              variants={fadeUp}
            >
              Our People
            </motion.h2>
            <motion.p 
              className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light"
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
                className="bg-white/95 backdrop-blur-sm overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 max-w-md rounded-2xl shadow-2xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium text-[#1A1C24] mb-2">{member.name}</h3>
                  <p className="text-[#1A1C24]/70 font-medium mb-2">{member.role}</p>
                  <p className="text-[#1A1C24]/80 leading-relaxed text-sm font-light">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* Final CTA Section - Full width white background */}
      <section className="py-20 bg-white text-[#1A1C24] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_100%_0%,rgba(240,200,90,.08),transparent)]"></div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center">
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
                className="bg-[#F0C85A] hover:bg-[#E6B84A] text-[#1A1C24] px-8 py-3 rounded-2xl font-semibold text-base transition-all duration-300 hover:shadow-glowGold hover:-translate-y-0.5"
              >
                Explore Colors
              </Link>
              <Link
                to="/contact"
                className="bg-transparent hover:bg-[#1A1C24]/5 text-[#1A1C24] border border-[#1A1C24]/20 px-8 py-3 rounded-2xl font-semibold text-base transition-all duration-300 hover:border-[#F0C85A]/70"
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



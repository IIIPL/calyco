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
    icon: "🛡️",
    title: "Safe Surfaces",
    description: "Low-VOC, healthy coatings that protect your family",
  },
  {
    icon: "🌱",
    title: "Sustainable Progress",
    description: "Eco-friendly, water-based solutions for tomorrow",
  },
  {
    icon: "⚡",
    title: "Trusted Performance",
    description: "Durable finishes backed by comprehensive warranty",
  },
  {
    icon: "💻",
    title: "Accessible Innovation",
    description: "Digital-first buying experience, no dealer hassle",
  },
];

// Impact stats data
const IMPACT_STATS = [
  {
    number: "10,000+",
    label: "Litres VOC reduced",
    description: "Environmental impact",
  },
  {
    number: "100+",
    label: "Projects painted",
    description: "Trusted by professionals",
  },
  {
    number: "20+",
    label: "Certified eco-safe colors",
    description: "Safety guaranteed",
  },
];

// Team data
const TEAM = [
  {
    name: "Priya Sharma",
    role: "Founder & CEO",
    image: "/Assets/color-banner.png",
    description: "Leading Calyco's mission for safer, sustainable paints",
  },
  {
    name: "Rajesh Kumar",
    role: "Head of Innovation",
    image: "/Assets/color-banner.png",
    description: "Pioneering eco-premium coating technologies",
  },
  {
    name: "Anjali Patel",
    role: "Sustainability Director",
    image: "/Assets/color-banner.png",
    description: "Ensuring every product meets our green standards",
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
            Painting safer, brighter spaces.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-12 text-gray-200 leading-relaxed max-w-2xl mx-auto font-light"
            variants={fadeUp}
          >
            Calyco creates eco-premium, safety-first paints for homes, contractors, and public projects.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeUp}
          >
            <Link
              to="/products"
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-none font-medium text-base transition-all duration-300 border border-white"
            >
              Explore Products
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

      {/* Our Story Section - Large image with text overlay */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
            {/* Left Column - Large Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/Assets/Inspiration/living.jpg"
                  alt="Calyco factory and projects"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            {/* Right Column - Content with dark background */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="bg-gray-900 text-white p-16 lg:p-20"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-light text-white mb-8 tracking-wide uppercase"
                variants={fadeUp}
              >
                Our Story
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl font-light"
                variants={fadeUp}
              >
                Born from a vision to make premium paints accessible and safe, Calyco combines 
                <span className="font-normal text-white"> eco-premium quality</span> with 
                <span className="font-normal text-white"> digital-first simplicity</span>.
              </motion.p>
              
              <motion.p 
                className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl font-light"
                variants={fadeUp}
              >
                We deliver <span className="font-normal text-white">lifestyle inspiration</span> through 
                <span className="font-normal text-white"> trusted performance</span>, 
                ensuring every project meets the highest standards of safety and sustainability.
              </motion.p>
              
              <motion.div variants={fadeUp}>
                <Link
                  to="/sustainability"
                  className="inline-flex items-center text-white hover:text-gray-300 font-medium text-base transition-colors duration-300 border-b border-white pb-1 hover:border-gray-300"
                >
                  Read Our Sustainability Promise
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section - Clean grid */}
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
                <div className="text-4xl mb-6 text-gray-800">{value.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm font-light">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mt-16"
          >
            <Link
              to="/safety"
              className="inline-flex items-center bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-none font-medium text-base transition-all duration-300 border border-gray-900 hover:border-black"
            >
              See Why Safety Matters
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Different Section - Full width with image background */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/Assets/Inspiration/kitchen.jpg')",
            backgroundSize: "cover",
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
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
              What Makes Us Different
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
              variants={fadeUp}
            >
              We deliver eco-premium, safety-first coatings online, without dealer hassle.
            </motion.p>
            
            <motion.div variants={fadeUp}>
              <Link
                to="/products"
                className="inline-flex items-center bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-none font-medium text-base transition-all duration-300 border border-white"
              >
                Compare Products
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section - Clean cards */}
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
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mt-16"
          >
            <Link
              to="/projects"
              className="inline-flex items-center bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-none font-medium text-base transition-all duration-300 border border-gray-900 hover:border-black"
            >
              See Our Projects
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our People Section - Large profile images */}
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
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TEAM.map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-white overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed text-sm font-light">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mt-16"
          >
            <Link
              to="/team"
              className="inline-flex items-center bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-none font-medium text-base transition-all duration-300 border border-gray-900 hover:border-black"
            >
              Meet the Team
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sustainability Section - Large image with text overlay */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/Assets/Inspiration/dining.jpg"
                  alt="Sustainability"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="bg-green-800 text-white p-16 lg:p-20"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-light text-white mb-8 tracking-wide uppercase"
                variants={fadeUp}
              >
                Sustainability
              </motion.h2>
              
              <motion.p 
                className="text-lg text-green-100 mb-8 leading-relaxed max-w-2xl font-light"
                variants={fadeUp}
              >
                Every bucket is water-based, low-VOC, and safe for families.
              </motion.p>
              
              <motion.div variants={fadeUp}>
                <Link
                  to="/sustainability"
                  className="inline-flex items-center text-white hover:text-green-200 font-medium text-base transition-colors duration-300 border-b border-white pb-1 hover:border-green-200"
                >
                  Read Sustainability Report
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Careers Section - Full width with image background */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{
            backgroundImage: "url('/Assets/Inspiration/bedroom.jpg')",
            backgroundSize: "cover",
          }}
        />
        
        {/* Light overlay for better contrast */}
        <div className="absolute inset-0 bg-white/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-light text-gray-800 mb-6 tracking-wide uppercase"
              variants={fadeUp}
            >
              Join the mission.
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
              variants={fadeUp}
            >
              We're building a cleaner, safer paint future — come be part of it.
            </motion.p>
            
            <motion.div variants={fadeUp}>
              <Link
                to="/careers"
                className="inline-flex items-center bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-none font-medium text-base transition-all duration-300 border border-gray-900 hover:border-black"
              >
                View Open Roles
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
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



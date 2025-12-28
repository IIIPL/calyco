import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPaintBrush } from "react-icons/fa";
import { motion } from "framer-motion";

export default function NotFound() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f2] to-white font-poppins flex items-center justify-center px-4 pt-32">
      <motion.div 
        className="max-w-2xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number */}
        <motion.h1 
          className="text-8xl md:text-9xl font-bold text-[#493657]/20 mb-8"
          variants={itemVariants}
        >
          404
        </motion.h1>

        {/* 404 Illustration Image */}
        <motion.div 
          className="mb-8 flex justify-center"
          variants={itemVariants}
        >
          <img 
            src="/404.png" 
            alt="Empty paint bucket - 404 not found" 
            className="w-56 h-56 md:w-72 md:h-72 object-contain"
            loading="lazy"
          />
        </motion.div>

        {/* Error Message */}
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-[#493657] mb-4"
          variants={itemVariants}
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p 
          className="text-lg md:text-xl text-[#493657]/70 mb-8 leading-relaxed"
          variants={itemVariants}
        >
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </motion.p>

        {/* Back to Home Button */}
        <motion.div variants={itemVariants}>
          <Link 
            to="/"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#301A44] to-[#493657] text-white font-semibold py-4 px-8 rounded-2xl hover:shadow-2xl hover:shadow-[#301A44]/30 transition-all duration-500 transform hover:-translate-y-1"
          >
            <FaHome className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>

        {/* Additional Help */}
        <motion.div 
          className="mt-12 text-sm text-[#493657]/50"
          variants={itemVariants}
        >
          <p>Need help? Try our <Link to="/product" className="underline hover:text-[#493657] transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Products</Link> or <Link to="/inspiration" className="underline hover:text-[#493657] transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Inspiration</Link> pages.</p>
        </motion.div>
      </motion.div>
    </div>
  );
} 

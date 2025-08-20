import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SustainabilityPage() {
  useEffect(() => {
    document.title = "Sustainability - Calyco Paints";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Sustainability Promise
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our commitment to eco-premium, safety-first paints that protect both your family and the environment.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300"
          >
            Back to About Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

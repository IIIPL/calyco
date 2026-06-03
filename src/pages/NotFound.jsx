import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, CalendarCheck, ArrowRight } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F6] font-poppins flex flex-col items-center justify-center px-5 py-12">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 404 */}
        <h1 className="text-[120px] sm:text-[160px] font-bold text-[#493657]/12 leading-none select-none">
          404
        </h1>

        <div className="mb-6 -mt-4 flex justify-center">
          <img
            src="/404.png"
            alt="Page not found"
            className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
            loading="lazy"
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#493657]">
          Page not found
        </h2>
        <p className="text-[#493657]/60 mt-3 mb-8 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
          The page you're looking for doesn't exist. It may have moved or been deleted.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0 })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#493657] text-white px-6 py-3 font-semibold text-sm hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/services"
            onClick={() => window.scrollTo({ top: 0 })}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#493657]/20 text-[#493657] px-6 py-3 font-semibold text-sm hover:border-[#493657] transition-colors"
          >
            Browse Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Service quick-action cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
          <Link
            to="/calculators/service-cost-calculator"
            onClick={() => window.scrollTo({ top: 0 })}
            className="group rounded-2xl bg-white border border-[#e5e0d8] p-5 text-left hover:border-[#493657]/30 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#493657]/8 flex items-center justify-center mb-3">
              <Calculator className="w-5 h-5 text-[#493657]" />
            </div>
            <p className="font-bold text-[#0F1221] text-sm">Calculate Cost</p>
            <p className="text-xs text-gray-500 mt-1">Transparent estimates for any service</p>
          </Link>
          <a
            href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit."
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-white border border-[#e5e0d8] p-5 text-left hover:border-[#493657]/30 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F0C85A]/15 flex items-center justify-center mb-3">
              <CalendarCheck className="w-5 h-5 text-[#493657]" />
            </div>
            <p className="font-bold text-[#0F1221] text-sm">Free Site Visit</p>
            <p className="text-xs text-gray-500 mt-1">Book on WhatsApp, no charge</p>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

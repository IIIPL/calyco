import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Crumb = ({ children }) => (
  <span className="text-sm text-gray-500">{children}</span>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ShippingDelivery() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="pt-28 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <nav className="mb-6 flex items-center gap-2">
            <Link to="/" className="text-sm underline text-[#354147] hover:text-[#1A1C24] transition-colors">Home</Link>
            <Crumb>/</Crumb>
            <Link to="/policies" className="text-sm underline text-[#354147] hover:text-[#1A1C24] transition-colors">Policies</Link>
            <Crumb>/</Crumb>
            <Crumb>Shipping & Delivery</Crumb>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative h-[70vh] min-h-[500px] overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="absolute inset-0">
          <img
            src="/Assets/asiiiasia0631_realistic_modern_interior_bright_minimalist_room__aedc26f1-f314-4909-b18e-756e99406eb9.png"
            alt="Modern Interior with CALYCO Paints"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1C24]/80 via-[#1A1C24]/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
            <div className="max-w-3xl">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
                variants={itemVariants}
              >
                Shipping & Delivery
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Fast, reliable, eco-conscious delivery for your CALYCO paints and sealers.
              </motion.p>
              <motion.div variants={itemVariants}>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 bg-white text-[#1A1C24] font-semibold px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-white/30 transition-all duration-500 transform hover:-translate-y-1"
                >
                  Shop CALYCO Paints
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Coverage & Timelines Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#354147] mb-6">Coverage & Timelines</h2>
            <p className="text-xl text-[#354147]/70 max-w-3xl mx-auto">
              We deliver CALYCO paints and sealers across India with care and precision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#354147]">Serviceable Areas</h3>
                </div>
                <div className="space-y-4">
                  <div className="text-[#354147] font-medium">• All major cities and towns across India</div>
                  <div className="text-[#354147] font-medium">• Remote areas with special handling</div>
                  <div className="text-[#354147] font-medium">• Express delivery to metro cities</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#354147]">Delivery Windows</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-[#354147] font-medium">Metro Cities</span>
                    <span className="text-[#1A1C24] font-bold text-lg">2-3 days</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-[#354147] font-medium">Tier 2 Cities</span>
                    <span className="text-[#1A1C24] font-bold text-lg">3-5 days</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-[#354147] font-medium">Remote Areas</span>
                    <span className="text-[#1A1C24] font-bold text-lg">5-7 days</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Charges Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#354147] mb-6">Delivery Charges</h2>
            <p className="text-xl text-[#354147]/70 max-w-3xl mx-auto">
              Transparent pricing with free delivery options for your convenience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gradient-to-br from-[#1A1C24]/10 to-black/5 rounded-3xl p-8 border-2 border-[#1A1C24]/20"
              variants={itemVariants}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#354147] mb-4">Free Delivery</h3>
                <div className="text-4xl font-bold text-[#1A1C24] mb-2">₹2,500+</div>
                <p className="text-[#354147]/70 mb-6">Minimum order value for free shipping</p>
                <ul className="text-left space-y-2 text-[#354147]">
                  <li>• All standard delivery areas</li>
                  <li>• No hidden charges</li>
                  <li>• Eco-friendly packaging</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              variants={itemVariants}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#354147] mb-4">Standard Delivery</h3>
                <div className="text-4xl font-bold text-[#1A1C24] mb-2">₹150</div>
                <p className="text-[#354147]/70 mb-6">For orders below ₹2,500</p>
                <ul className="text-left space-y-2 text-[#354147]">
                  <li>• Reliable courier partners</li>
                  <li>• Real-time tracking</li>
                  <li>• Safe handling guaranteed</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              variants={itemVariants}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#354147] mb-4">Remote Areas</h3>
                <div className="text-4xl font-bold text-[#1A1C24] mb-2">₹300</div>
                <p className="text-[#354147]/70 mb-6">Additional charge for remote locations</p>
                <ul className="text-left space-y-2 text-[#354147]">
                  <li>• Special handling required</li>
                  <li>• Extended delivery time</li>
                  <li>• Extra care packaging</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tracking & Delays Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#354147] mb-6">Tracking & Support</h2>
            <p className="text-xl text-[#354147]/70 max-w-3xl mx-auto">
              Stay informed about your order with real-time tracking and dedicated support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-[#354147] mb-6">
                  How to Track Your Order
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#1A1C24] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#354147] mb-1">Order Confirmation</h4>
                      <p className="text-[#354147]/70">You'll receive an email with your tracking number</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#1A1C24] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#354147] mb-1">Real-time Updates</h4>
                      <p className="text-[#354147]/70">Track your package location and delivery status</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#1A1C24] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#354147] mb-1">Delivery Notification</h4>
                      <p className="text-[#354147]/70">Get notified when your order is out for delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-[#354147] mb-6">
                  Handling Delays
                </h3>
                <div className="space-y-4">
                  <div className="bg-[#1A1C24]/10 rounded-2xl p-4">
                    <h4 className="font-semibold text-[#354147] mb-2">Weather Delays</h4>
                    <p className="text-[#354147]/70 text-sm">We prioritize safety during extreme weather conditions</p>
                  </div>
                  <div className="bg-[#1A1C24]/10 rounded-2xl p-4">
                    <h4 className="font-semibold text-[#354147] mb-2">Address Issues</h4>
                    <p className="text-[#354147]/70 text-sm">Our team will contact you to resolve any delivery issues</p>
                  </div>
                  <div className="bg-[#1A1C24]/10 rounded-2xl p-4">
                    <h4 className="font-semibold text-[#354147] mb-2">Custom Solutions</h4>
                    <p className="text-[#354147]/70 text-sm">We work with you to find the best delivery solution</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Customer Assurance Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-[#1A1C24] to-black relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your CALYCO Order is Safe, Timely, and Handled with Care
            </h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              We understand that your paint project is important. That's why we go the extra mile to ensure your CALYCO products arrive in perfect condition, on time, and with the care they deserve.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-white mb-2">Safe Handling</h3>
                <p className="text-white/80 text-sm">Specialized packaging for paint products</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-white mb-2">On-Time Delivery</h3>
                <p className="text-white/80 text-sm">Reliable delivery within promised timelines</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-white mb-2">Care & Support</h3>
                <p className="text-white/80 text-sm">Dedicated customer service throughout</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Support Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#354147] mb-6">Need Help?</h2>
            <p className="text-xl text-[#354147]/70 max-w-3xl mx-auto">
              Our customer support team is here to help with any delivery questions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              className="bg-gradient-to-br from-[#1A1C24]/10 to-black/5 rounded-3xl p-8 border-2 border-[#1A1C24]/20 text-center"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-[#354147] mb-4">Call Us</h3>
              <p className="text-[#354147]/70 mb-4">Speak directly with our support team</p>
              <a 
                href="tel:+91-99589-66881" 
                className="text-[#1A1C24] font-bold text-xl hover:text-black transition-colors"
              >
                +91-99589-66881
              </a>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-black/10 to-[#1A1C24]/5 rounded-3xl p-8 border-2 border-black/20 text-center"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-[#354147] mb-4">Email Us</h3>
              <p className="text-[#354147]/70 mb-4">Send us your questions anytime</p>
              <a 
                href="mailto:support@calycopaints.com" 
                className="text-[#1A1C24] font-bold text-lg hover:text-black transition-colors"
              >
                support@calycopaints.com
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// FAQ Data
const FAQ_DATA = [
  {
    question: "Are Calyco paints safe?",
    answer: "Yes, all paints are low-VOC and eco-certified. We prioritize family safety with every formulation."
  },
  {
    question: "Do you offer contractor pricing?",
    answer: "Yes, contact our bulk team for competitive rates and volume discounts on large projects."
  },
  {
    question: "How fast is delivery?",
    answer: "Standard 48 hours; site delivery available for bulk orders. Express delivery options for urgent projects."
  },
  {
    question: "Can I preview colors?",
    answer: "Yes, use our Room Visualizer tool or request physical samples. We also offer virtual consultations."
  },
  {
    question: "What's your warranty policy?",
    answer: "All Calyco paints come with comprehensive warranty coverage. Contact us for specific terms based on your project."
  }
];

export default function ContactPage() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
    consent: false
  });

  useEffect(() => {
    document.title = "Contact Us - Calyco Paints | Get Support & Quotes";
    window.scrollTo(0, 0);
  }, []);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/Assets/Inspiration/living.jpg')",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-light mb-8 leading-tight tracking-wide"
            variants={fadeUp}
          >
            Talk to Calyco.
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-3xl mx-auto font-light"
            variants={fadeUp}
          >
            Eco-premium paint support for homes, contractors, and public projects.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeUp}
          >
            <button
              onClick={() => scrollToSection('general-inquiry')}
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-none font-medium text-base transition-all duration-300 border border-white"
            >
              General Inquiry
            </button>
            <button
              onClick={() => scrollToSection('contractor-section')}
              className="bg-transparent hover:bg-white/10 text-white border border-white px-8 py-4 rounded-none font-medium text-base transition-all duration-300"
            >
              Contractor / Bulk Quote
            </button>
            <button
              onClick={() => scrollToSection('contractor-section')}
              className="bg-transparent hover:bg-white/10 text-white border border-white px-8 py-4 rounded-none font-medium text-base transition-all duration-300"
            >
              Government / Tenders
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Channels Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Call Card */}
            <motion.div
              variants={scaleIn}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
            >
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">+91-00000-00000</p>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Call Now →
              </button>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.div
              variants={scaleIn}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Quick chat support</p>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Open WhatsApp →
              </button>
            </motion.div>

            {/* Email Card */}
            <motion.div
              variants={scaleIn}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
            >
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">hello@calyco.com</p>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Send Email →
              </button>
            </motion.div>

            {/* Support Hours Card */}
            <motion.div
              variants={scaleIn}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-4">🕒</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Support Hours</h3>
              <p className="text-gray-600 mb-4">Mon–Sat, 9am–7pm IST</p>
              <p className="text-sm text-gray-500">24/7 online support</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* General Inquiry Form */}
      <section id="general-inquiry" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide"
              variants={fadeUp}
            >
              General Inquiry
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
              variants={fadeUp}
            >
              Get in touch with our team for any questions about our products or services.
            </motion.p>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeUp}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeUp}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic *
                </label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a topic</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="color-consultation">Color Consultation</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="pricing">Pricing Information</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>
            </div>

            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Tell us about your inquiry..."
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachment (Optional)
              </label>
              <input
                type="file"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleFormChange}
                required
                className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-600">
                I agree to be contacted and accept the{" "}
                <Link to="/privacy" className="text-purple-600 hover:text-purple-700 underline">
                  Privacy Policy
                </Link>
              </label>
            </motion.div>

            <motion.div variants={fadeUp}>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-8 rounded-lg font-medium text-base transition-all duration-300"
              >
                Send Message
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                We typically respond within 24 hours
              </p>
            </motion.div>
          </motion.form>
        </div>
      </section>

      {/* Contractor & Government Section */}
      <section id="contractor-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide"
              variants={fadeUp}
            >
              For Contractors & Institutions
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
              variants={fadeUp}
            >
              Specialized support for large-scale projects and institutional requirements
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Contractors & Developers */}
            <motion.div
              variants={scaleIn}
              className="bg-white p-12 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="text-5xl mb-6">🏗️</div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4">
                Contractors & Developers
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Bulk pricing, quick-buy, and site delivery support for large-scale projects.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium text-base transition-all duration-300">
                Request Quote
              </button>
            </motion.div>

            {/* Government & Tenders */}
            <motion.div
              variants={scaleIn}
              className="bg-white p-12 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="text-5xl mb-6">🏛️</div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4">
                Government & Tenders
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Tender-ready compliance, SDS/TDS, and empanelment support for public projects.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium text-base transition-all duration-300">
                Contact Tender Desk
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Office & Map Section */}
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
              className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide"
              variants={fadeUp}
            >
              Visit Us
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeUp}>
              <div className="text-4xl mb-6">📍</div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                Calyco Paints Headquarters
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Block T26, House No. 9, First Floor,<br />
                DLF Phase 3, Sector 24,<br />
                Gurugram, Haryana 122001
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium text-base transition-all duration-300">
                Get Directions
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg shadow-lg overflow-hidden">
                {/* Placeholder for Google Maps iframe */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p>Google Maps Integration</p>
                    <p className="text-sm">Interactive map will be embedded here</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide"
              variants={fadeUp}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
              variants={fadeUp}
            >
              Quick answers to common questions about Calyco products and services
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className={`transform transition-transform duration-200 ${activeFAQ === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {activeFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light mb-8 tracking-wide"
              variants={fadeUp}
            >
              Ready to paint safer, brighter spaces?
            </motion.h2>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeUp}
            >
              <button
                onClick={() => scrollToSection('general-inquiry')}
                className="bg-white hover:bg-gray-100 text-purple-600 px-8 py-4 rounded-lg font-medium text-base transition-all duration-300"
              >
                Send Message
              </button>
              <button
                onClick={() => scrollToSection('contractor-section')}
                className="bg-transparent hover:bg-white/10 text-white border border-white px-8 py-4 rounded-lg font-medium text-base transition-all duration-300"
              >
                Request Bulk Quote
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



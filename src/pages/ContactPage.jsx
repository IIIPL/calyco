import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    question: "What is Calyco Paints?",
    answer: "Calyco Paints is an eco-premium paint and coatings company that blends modern lifestyle design with sustainability. We offer low-VOC, water-based, safe-for-family paints and industrial-grade coatings for contractors, developers, and government projects."
  },
  {
    question: "How is Calyco different from other paint brands?",
    answer: "Unlike traditional dealer-driven paint companies, Calyco is online-first, delivering paints directly to homes, projects, and government buyers. We combine luxury lifestyle appeal (like Asian Paints), minimal modern UI (like Birla Opus), and eco-premium positioning (like Lick Paint) with a special focus on contractors and government compliance."
  },
  {
    question: "Are Calyco paints safe for children and pets?",
    answer: "Yes. All our paints are low-VOC, odor-free, and non-toxic, making them safe for indoor spaces where families live, sleep, and play."
  },
  {
    question: "What does low-VOC mean?",
    answer: "VOC (Volatile Organic Compounds) are chemicals that evaporate into the air and harm indoor air quality. Our low-VOC paints reduce exposure, improving health and environmental safety."
  },
  {
    question: "What surfaces can Calyco paints be used on?",
    answer: "Our range covers interior walls, exterior walls, wood, metal, concrete, asphalt, roofing, and specialty industrial surfaces."
  },
  {
    question: "Are your paints waterproof and weather-resistant?",
    answer: "Yes. We offer waterproof coatings, anti-fungal interior paints, heat-reflective roof coatings, and long-lasting exterior emulsions designed for Indian weather conditions."
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
          

        </motion.div>
      </section>









      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help you with your painting needs.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E3A98] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E3A98] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E3A98] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Inquiry *
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E3A98] focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="">Select inquiry type</option>
                  <option value="general">General</option>
                  <option value="bulk-order">Bulk Order</option>
                  <option value="dealer">Dealer</option>
                  <option value="media">Media</option>
                  <option value="support">Support</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E3A98] focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Tell us about your inquiry or project requirements..."
              />
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleFormChange}
                required
                className="mt-1 h-4 w-4 text-[#5E3A98] focus:ring-[#5E3A98] border-gray-300 rounded"
              />
              <label htmlFor="consent" className="text-sm text-gray-600">
                I agree to Calyco Paints processing my personal data in accordance with the{' '}
                <Link to="/privacy" className="text-[#5E3A98] hover:underline">
                  Privacy Policy
                </Link>
                . *
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A1C24] text-white rounded-lg font-semibold hover:bg-[#2a2f3a] transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Send Message
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#1A1C24]">
        <div className="w-full px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Calyco
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full space-y-0"
          >
            {[
              {
                question: "What is Calyco Paints?",
                answer: "Calyco Paints is an eco-premium paint and coatings company that blends modern lifestyle design with sustainability. We offer low-VOC, water-based, safe-for-family paints and industrial-grade coatings for contractors, developers, and government projects."
              },
              {
                question: "How is Calyco different from other paint brands?",
                answer: "Unlike traditional dealer-driven paint companies, Calyco is online-first, delivering paints directly to homes, projects, and government buyers. We combine luxury lifestyle appeal (like Asian Paints), minimal modern UI (like Birla Opus), and eco-premium positioning (like Lick Paint) with a special focus on contractors and government compliance."
              },
              {
                question: "Are Calyco paints safe for children and pets?",
                answer: "Yes. All our paints are low-VOC, odor-free, and non-toxic, making them safe for indoor spaces where families live, sleep, and play."
              },
              {
                question: "What does low-VOC mean?",
                answer: "VOC (Volatile Organic Compounds) are chemicals that evaporate into the air and harm indoor air quality. Our low-VOC paints reduce exposure, improving health and environmental safety."
              },
              {
                question: "What surfaces can Calyco paints be used on?",
                answer: "Our range covers interior walls, exterior walls, wood, metal, concrete, asphalt, roofing, and specialty industrial surfaces."
              },
              {
                question: "Are your paints waterproof and weather-resistant?",
                answer: "Yes. We offer waterproof coatings, anti-fungal interior paints, heat-reflective roof coatings, and long-lasting exterior emulsions designed for Indian weather conditions."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full py-6 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <span className="text-lg font-bold text-white">{faq.question}</span>
                  <span className={`text-white text-xl font-bold transform transition-transform duration-300 ${activeFAQ === index ? 'rotate-45' : ''}`}>
                    {activeFAQ === index ? '×' : '+'}
                  </span>
                </button>
                <AnimatePresence>
                {activeFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-4">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                    </motion.div>
                )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* See All FAQs Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <button
                onClick={() => window.location.href = '/faq'}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1A1C24] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                See All FAQs
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-white text-gray-900">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light mb-8 tracking-wide text-gray-900"
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
                className="bg-[#1A1C24] hover:bg-[#2a2f3a] text-white px-8 py-4 rounded-lg font-medium text-base transition-all duration-300"
              >
                Send Message
              </button>
              <button
                onClick={() => scrollToSection('contractor-section')}
                className="bg-transparent hover:bg-gray-100 text-gray-900 border border-gray-300 px-8 py-4 rounded-lg font-medium text-base transition-all duration-300"
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



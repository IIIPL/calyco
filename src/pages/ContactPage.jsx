import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useForm, ValidationError } from '@formspree/react';

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
  const [toast, setToast] = useState(null);
  const [state, handleSubmit] = useForm("xnnbaygb");

  useEffect(() => {
    document.title = "Contact Us - Calyco Paints | Get Support & Quotes";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (state.succeeded) {
      setToast({ type: "success", message: "Message sent successfully!" });
    } else if (state.errors && state.errors.length > 0) {
      setToast({ type: "error", message: "Failed to send message. Please try again." });
    }
  }, [state.succeeded, state.errors]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const resetForm = () => {
    window.location.reload();
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
            backgroundImage: "url('/Assets/canal.health.hacks_Realistic_photo_of_a_modern_house_in_dark_gr_9200c95a-bf7d-42e8-b335-37b3695167c4.png')",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
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

      {/* Contact Info Cards Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the most convenient way to get in touch with our expert team.
            </p>
          </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Phone Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak directly with our experts</p>
              <a 
                href="tel:+919958966881" 
                className="text-gray-900 text-xl font-semibold hover:underline"
              >
                +91-99589-66881
              </a>
              <p className="text-sm text-gray-500 mt-2">Mon–Sat, 10am–6pm IST</p>
            </motion.div>

            {/* Email Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Us</h3>
              <p className="text-gray-600 mb-4">Get detailed responses quickly</p>
              <a 
                href="mailto:support@calycopaints.com" 
                className="text-gray-900 text-lg font-semibold hover:underline"
              >
                support@calycopaints.com
              </a>
              <p className="text-sm text-gray-500 mt-2">24/7 support available</p>
            </motion.div>

            {/* Location Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visit Us</h3>
              <p className="text-gray-600 mb-4">Our headquarters</p>
              <p className="text-gray-900 text-lg font-semibold">
                B-37, Sector - 1, Noida NCR, India
              </p>
              <p className="text-sm text-gray-500 mt-2">By appointment only</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Form Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Send Us a Message
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full mb-6"></div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Tell us about your project, ask questions, or request a quote. Our team will get back to you within 24 hours with personalized solutions.
                </p>
              </div>

              {state.succeeded ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center space-y-6 bg-green-50 p-8 rounded-2xl"
            >
              <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
              <h3 className="text-3xl font-semibold text-gray-800">Message Sent!</h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Thanks for reaching out. We've received your message and will get back to you within 1–2 business days.
              </p>
              <button
                onClick={resetForm}
                     className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
                   className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
                 >
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                     <div className="space-y-2">
                       <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your full name"
                  />
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                    className="text-red-600 text-xs mt-1"
                  />
                </div>

                     <div className="space-y-2">
                       <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your email address"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-600 text-xs mt-1"
                  />
                </div>
              </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                     <div className="space-y-2">
                       <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                     <div className="space-y-2">
                       <label htmlFor="topic" className="block text-sm font-semibold text-gray-700">
                    Type of Inquiry *
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    required
                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 bg-gray-50 focus:bg-white"
                  >
                    <option value="">Select inquiry type</option>
                         <option value="general">General Inquiry</option>
                    <option value="bulk-order">Bulk Order</option>
                         <option value="dealer">Dealer Partnership</option>
                         <option value="media">Media & Press</option>
                         <option value="support">Technical Support</option>
                         <option value="quote">Request Quote</option>
                  </select>
                  <ValidationError 
                    prefix="Topic" 
                    field="topic"
                    errors={state.errors}
                    className="text-red-600 text-xs mt-1"
                  />
                </div>
              </div>

                   <div className="mb-8 space-y-2">
                     <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                       rows={5}
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                       placeholder="Tell us about your project, requirements, or any questions you have..."
                />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                  className="text-red-600 text-xs mt-1"
                />
              </div>

                   <div className="flex items-start space-x-3 mb-8 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                       className="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-900 rounded border-gray-300"
                />
                     <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                  I agree to Calyco Paints processing my personal data in accordance with the{' '}
                       <Link to="/privacy" className="text-gray-900 hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                  . *
                </label>
              </div>
              <ValidationError 
                prefix="Consent" 
                field="consent"
                errors={state.errors}
                className="text-red-600 text-xs mt-1"
              />

                   <div className="pt-4">
                <button
                  type="submit"
                  disabled={state.submitting}
                       className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                       {state.submitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </div>

              {toast && (
                <div className={`mt-4 text-center text-sm ${toast.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {toast.message}
                </div>
              )}
            </motion.form>
          )}
            </motion.div>

            {/* Image Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <img 
                  src="/Assets/card1-trust.png"
                  alt="Contact us illustration"
                  className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl"
              >
                                 <div className="text-center">
                   <div className="text-3xl font-bold text-gray-900 mb-2">24h</div>
                   <div className="text-sm text-gray-600">Response Time</div>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* International Offices Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Global Presence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with our team across the globe for local support and expertise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {/* India */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">India</h3>
                <p className="text-gray-600 text-sm mb-4">Headquarters</p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <a href="mailto:info@calycopaints.com" className="text-gray-900 hover:underline font-semibold">
                      info@calycopaints.com
                    </a>
                  </p>
                  <p className="text-gray-600">
                    B-37, Sector - 1, Noida NCR, India
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Dubai */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Dubai</h3>
                <p className="text-gray-600 text-sm mb-4">Middle East</p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <a href="mailto:dubai@calycopaints.com" className="text-gray-900 hover:underline font-semibold">
                      dubai@calycopaints.com
                    </a>
                  </p>
                  <p className="text-gray-600">
                    Po Box: 42747 Hamriyah FZ, Sharjah, U.A.E.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Thailand */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Thailand</h3>
                <p className="text-gray-600 text-sm mb-4">Southeast Asia</p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <a href="mailto:thailand@calycopaints.com" className="text-gray-900 hover:underline font-semibold">
                      thailand@calycopaints.com
                    </a>
                  </p>
                  <p className="text-gray-600">
                    75 Ocean Tower - II, 18C Floor Sukhumvit Road, Bangkok, Thailand
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
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
              Frequently Asked Questions
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
                question: "How can I contact Calyco Paints?",
                answer: "You can reach us through multiple channels: Call us at +91-99589-66881 (Mon–Sat, 10am–6pm IST), email us at support@calycopaints.com, or fill out the contact form above. We also have offices across multiple countries for local support."
              },
              {
                question: "What are your customer service hours?",
                answer: "Our customer service team is available Monday through Saturday, from 10:00 AM to 6:00 PM IST. For urgent inquiries outside these hours, please email us and we'll respond within 24 hours."
              },
              {
                question: "How quickly do you respond to inquiries?",
                answer: "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly. Technical questions and bulk orders may require additional time for detailed responses."
              },
              {
                question: "Do you offer support for bulk orders?",
                answer: "Yes! For bulk orders, contractor inquiries, and government projects, we provide dedicated support. Please select 'Bulk Order' in the inquiry type when filling out the contact form, or call us directly for immediate assistance."
              },
              {
                question: "Can I get technical support for paint application?",
                answer: "Absolutely. Our technical team can help with application guidance, surface preparation, color matching, and troubleshooting. Select 'Support' in the inquiry type or call us for immediate technical assistance."
              },
              {
                question: "Do you have international offices?",
                answer: "Yes, we have offices in multiple countries including India (headquarters), Dubai, and Thailand. Each office provides local support and expertise for their respective markets."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-b border-gray-700 last:border-b-0"
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
              Ready to transform your space?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
              variants={fadeUp}
            >
              Let's discuss your project and find the perfect colors for your vision.
            </motion.p>
            
            <motion.div 
              className="flex justify-center"
              variants={fadeUp}
            >
              <button
                onClick={() => scrollToSection('contact-form')}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Send Message
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



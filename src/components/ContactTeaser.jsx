import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactTeaser = ({ href = "/contact" }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsValid(false);
      return;
    }
    // Handle email signup logic here
    console.log('Email signup:', email);
    setEmail('');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-[#493657] mb-6 tracking-wide">
                Get in Touch
              </h2>
              <p className="text-lg text-[#493657]/70 leading-relaxed mb-8">
                Ready to transform your space with sustainable paint solutions? Our team is here to help you find the perfect colors and products for your project.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F0C85A]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#5E3A98]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#493657] mb-1">Email Us</h3>
                  <p className="text-[#493657]/70">info@calyco.com</p>
                  <p className="text-sm text-[#493657]/60">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F0C85A]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#5E3A98]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#493657] mb-1">Call Us</h3>
                  <p className="text-[#493657]/70">+91 98765 43210</p>
                  <p className="text-sm text-[#493657]/60">Mon-Fri, 9AM-6PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F0C85A]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#5E3A98]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#493657] mb-1">Visit Us</h3>
                  <p className="text-[#493657]/70">Mumbai, Maharashtra, India</p>
                  <p className="text-sm text-[#493657]/60">By appointment only</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form Teaser */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#493657] mb-2">Stay Updated</h3>
              <p className="text-[#493657]/70 text-sm">
                Subscribe to our newsletter for the latest product updates, sustainability tips, and exclusive offers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#493657] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0C85A] transition-colors duration-300 ${
                    isValid ? 'border-gray-300' : 'border-red-500'
                  }`}
                  placeholder="Enter your email"
                  aria-describedby={!isValid ? "email-error" : undefined}
                />
                {!isValid && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">
                    Please enter a valid email address
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[#F0C85A] text-[#493657] py-3 px-6 rounded-lg font-semibold hover:bg-[#e3b842] transition-colors duration-300 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe to Newsletter
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-[#493657]/60 mb-4">
                Need immediate assistance? Get in touch with our team.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={href}
                  className="inline-flex items-center gap-2 text-[#5E3A98] font-semibold hover:text-[#493657] transition-colors duration-300"
                >
                  Contact Our Team
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactTeaser;

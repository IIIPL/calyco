import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaUsers, FaHeadset, FaGlobe, FaCheckCircle } from "react-icons/fa";
import emailjs from '@emailjs/browser';

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { delay: 0.3, duration: 0.8, ease: "easeOut" },
    },
};

export const ContactUs = () => {
    const form = useRef();
    const [toast, setToast] = useState(null);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        document.title = "Contact Calyco";
        emailjs.init('o3nHktLCZY2hMn6EE');
    }, [])

    // Toaster auto-hide
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3500);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const sendEmail = (e) => {
        e.preventDefault();
        setSending(true);
        emailjs.sendForm('service_nztkw4l', 'template_qaobwqf', form.current, 'o3nHktLCZY2hMn6EE')
            .then((result) => {
                setToast({ type: 'success', message: 'Message sent!' });
                form.current.reset();
                setSending(false);
            }, (error) => {
                setToast({ type: 'error', message: 'Failed to send. Please try again.' });
                setSending(false);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Toaster at the top with motion and icon */}
            {toast && (
                <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl font-semibold shadow-2xl flex items-center gap-3 transition-all duration-300 ${toast.type === 'success' ? 'bg-[#d1fae5] text-[#059669]' : 'bg-red-100 text-red-700'}`}
                    style={{ minWidth: '320px', maxWidth: '90vw' }}
                >
                    {toast.type === 'success' && <FaCheckCircle className="text-2xl text-[#059669]" />}
                    <span>{toast.type === 'success' ? "Message sent, we'll get back to you soon." : toast.message}</span>
                </motion.div>
            )}
            {/* Hero Section with Background Image */}
            <div className="relative h-96 bg-gradient-to-r from-[#493657] to-[#F0C85A] overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div> */}
                
                <div className="relative z-10 flex items-center justify-center h-full px-6">
                    <div className="text-center text-white">
                        <motion.h1
                            className="text-6xl font-bold mb-4"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            Contact Us
                        </motion.h1>
                        <motion.p
                            className="text-xl opacity-90 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            We're here to help you achieve your goals. Let's connect and make something amazing together.
                        </motion.p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 -mt-20 relative z-20">
                {/* Main Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                        >
                            <div className="w-20 h-20 mx-auto mb-6 bg-[#493657] rounded-full flex items-center justify-center">
                                {i === 0 && <FaPhoneAlt className="text-3xl text-white" />}
                                {i === 1 && <FaEnvelope className="text-3xl text-white" />}
                                {i === 2 && <FaMapMarkerAlt className="text-3xl text-white" />}
                            </div>
                            
                            {i === 0 && (
                                <>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Call Us</h3>
                                    <a href="tel:+919958966881" className="text-xl text-[#493657] hover:text-[#F0C85A] transition-colors font-semibold block mb-2">
                                        +91-99589-66881
                                    </a>
                                    <p className="text-gray-600">Available Mon–Sat, 10am–6pm</p>
                                </>
                            )}
                            {i === 1 && (
                                <>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Email Us</h3>
                                    <a href="mailto:info@calycopaints.com" className="text-xl text-[#493657] hover:text-[#F0C85A] transition-colors font-semibold block mb-2">
                                        info@calycopaints.com
                                    </a>
                                    <p className="text-gray-600">We reply within 24 hours</p>
                                </>
                            )}
                            {i === 2 && (
                                <>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Visit Us</h3>
                                    <div className="text-xl text-gray-800 font-semibold mb-2">B37, Sector 1</div>
                                    <div className="text-lg text-gray-600">Noida, NCR</div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Why Choose Us Section */}
                <motion.div
                    className="bg-white rounded-3xl shadow-xl p-12 mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Calyco?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                <FaUsers className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Team</h3>
                            <p className="text-gray-600">Our experienced professionals are dedicated to delivering excellence in every project.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                                <FaHeadset className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
                            <p className="text-gray-600">Round-the-clock assistance to ensure your needs are met promptly and efficiently.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                <FaGlobe className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Reach</h3>
                            <p className="text-gray-600">Serving clients worldwide with innovative solutions and exceptional service quality.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Office Hours Card */}
                <motion.div
                    className="bg-gradient-to-r from-[#493657] to-[#F0C85A] rounded-3xl shadow-xl p-8 text-center text-white mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.7 }}
                >
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <FaClock className="text-3xl" />
                        <h3 className="text-2xl font-bold">Office Hours</h3>
                    </div>
                    <p className="text-lg opacity-90">Monday to Saturday: 10:00 AM – 6:00 PM</p>
                    <p className="text-sm opacity-75 mt-2">Sunday: Closed</p>
                </motion.div>

                {/* Contact Form Section */}
                <motion.div
                    className="bg-white rounded-3xl shadow-xl p-12 mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Get In Touch</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Have a question or want to discuss a project? Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                    <form ref={form} onSubmit={sendEmail} className="max-w-2xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    name="user_name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    name="user_email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                            <input 
                                type="text" 
                                name="subject"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent"
                                placeholder="How can we help you?"
                            />
                        </div>
                        <div className="mb-8">
                            <label className="block text-gray-700 font-semibold mb-2">Message</label>
                            <textarea 
                                rows="5" 
                                name="message"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent resize-none"
                                placeholder="Tell us more about your project or inquiry..."
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" disabled={sending} className={`bg-gradient-to-r from-[#493657] to-[#F0C85A] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-[#5a4067] hover:to-[#f5d470] transition-all duration-300 transform hover:scale-105 shadow-lg ${sending ? 'opacity-60 cursor-not-allowed' : ''}`}>
                                {sending ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Map Section */}
                <motion.div
                    className="bg-white rounded-3xl shadow-xl overflow-hidden mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                >
                    <div className="p-8">
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Find Us</h2>
                        <p className="text-center text-gray-600 mb-8">Located in the heart of Noida, NCR</p>
                    </div>
                    <div className="h-96 bg-gradient-to-br from-[#F0C85A]/10 to-[#493657]/10 flex items-center justify-center">
                        <div className="text-center">
                            <FaMapMarkerAlt className="text-6xl text-[#493657] mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">B37, Sector 1</h3>
                            <p className="text-lg text-gray-600">Noida, NCR</p>
                            <p className="text-sm text-gray-500 mt-2">Interactive map coming soon</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaUsers, FaHeadset, FaGlobe, FaCheckCircle  } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { Button } from "../components/Button";
import { AddressCard } from "../components/AddressCard";

// EmailJS Configuration
const SERVICE_ID = "service_nztkw4l";
const TEMPLATE_CONTACT = "template_qaobwqf";
const TEMPLATE_CONFIRM = "template_confirmation";
const PUBLIC_KEY = "o3nHktLCZY2hMn6EE";

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
};

export const ContactUs = () => {
    const form = useRef();
    const [toast, setToast] = useState(null);
    const [sending, setSending] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.title = "Contact Calyco";
        // Modern EmailJS initialization
        emailjs.init({ publicKey: PUBLIC_KEY });
    }, []);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3500);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

    const validate = () => {
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = "First name is required.";
        if (!lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!validateEmail(email)) newErrors.email = "Enter a valid email address.";
        if (!message.trim()) newErrors.message = "Message is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setFirstName("");
        setLastName("");
        setPostalCode("");
        setEmail("");
        setMessage("");
        setErrors({});
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSending(true);
        const userName = `${firstName} ${lastName}`.trim();

        try {
            // Build explicit template params the template can use:
            const templateParams = {
                from_name: userName || "Website visitor",
                reply_to: email,
                message,
                postal_code: postalCode || "",
                time: new Date().toLocaleString(),
            };

            // main notification
            await emailjs.send(SERVICE_ID, TEMPLATE_CONTACT, templateParams, {
                publicKey: PUBLIC_KEY,
            });

            // optional: user confirmation — only if that template exists in your EmailJS account
            try {
                await emailjs.send(
                    SERVICE_ID,
                    TEMPLATE_CONFIRM, // make sure this template exists
                    {
                        to_email: email,
                        to_name: userName || "there",
                    },
                    { publicKey: PUBLIC_KEY }
                );
            } catch (e) {
                // Non-fatal — skip if template isn't configured
                console.warn("Confirmation email skipped:", e?.text || e);
            }

            setToast({ type: "success", message: "Message sent!" });
            setFirstName(""); setLastName(""); setPostalCode(""); setEmail(""); setMessage("");
            setIsSubmitted(true);
            setErrors({});
        } catch (error) {
            console.error("Failed to send email:", error);
            setToast({
                type: "error",
                message: `Failed to send. ${
                    error?.text || error?.message || error?.status || "Unknown error"
                }`,
            });
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="pt-20 min-h-screen">
            {/* Hero */}
            <div className="relative h-80 bg-gradient-to-r from-[#493657] to-[#F0C85A] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center text-white px-6">
                    <motion.h1
                        className="text-6xl font-bold mb-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        Contact Us
                    </motion.h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 -mt-20 relative z-20">
                {/* Main */}
                <div className="flex flex-col md:flex-row gap-8 mb-20">
                    {/* Form (left) */}
                    <motion.div
                        className="bg-white w-full md:w-4/5 max-w-3xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">Send Us a Message</h2>
                        <p className="text-gray-600 mb-8 text-center max-w-prose mx-auto">
                            Fill out the form below and we'll get back to you as soon as possible.
                        </p>

                        {isSubmitted ? (
                            <div className="flex flex-col items-center text-center space-y-4">
                                <FaCheckCircle className="text-green-500 text-4xl" />
                                <h3 className="text-2xl font-semibold text-gray-800">Message Sent!</h3>
                                <p className="text-gray-600 max-w-prose">
                                    Thanks for reaching out. We've received your message and will get back to you within 1–2 business days.
                                </p>
                                <div className="text-center flex justify-center">
                                    <Button onClick={resetForm}>Send another message</Button>
                                </div>
                            </div>
                        ) : (
                            <form id="contact-form" ref={form} onSubmit={sendEmail} className="space-y-6">
                                <input type="hidden" name="user_name" value={`${firstName} ${lastName}`.trim()} />
                                <input type="hidden" name="name" value={`${firstName} ${lastName}`.trim()} />
                                <input type="hidden" name="title" value="Contact Form Submission" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">First Name</label>
                                        <input 
                                            type="text" 
                                            id="firstName"
                                            name="first_name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent transition-all duration-200"
                                            placeholder="Your first name"
                                            required
                                        />
                                        {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Last Name</label>
                                        <input 
                                            type="text" 
                                            id="lastName"
                                            name="last_name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent transition-all duration-200"
                                            placeholder="Your last name"
                                            required
                                        />
                                        {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        name="user_email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent transition-all duration-200"
                                        placeholder="your@email.com"
                                        required
                                    />
                                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                                    <textarea 
                                        rows="6"
                                        id="message"
                                        name="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent resize-y transition-all duration-200"
                                        placeholder="Tell us more about your project or inquiry..."
                                        required
                                    ></textarea>
                                    {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
                                </div>

                                <div className="text-center pt-4">
                                    <Button type="submit" disabled={sending}>
                                        {sending ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </div>
                            </form>
                        )}

                        {toast && (
                            <div className={`mt-4 text-center ${toast.type === "success" ? "text-green-600" : "text-red-600"}`}>
                                {toast.message}
                            </div>
                        )}
                    </motion.div>

                    {/* Right panel (actions + blended Expert Team) */}
                    <motion.div
                        className="bg-white w-full md:w-2/5 max-w-3xl flex flex-col shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                    >
                        <div className="mb-8 flex items-start">
                            <div className="flex-shrink-0 mr-4 text-white bg-[#493657] rounded-full p-2">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-1">Call Us</h4>
                                <p className="text-gray-700 text-lg"><a href="tel:+919958966881">+91-99589-66881</a></p>
                                <p className="text-gray-500 text-sm">Available Mon–Sat, 10am–6pm IST</p>
                            </div>
                        </div>

                        <div className="mb-6 flex items-start">
                            <div className="flex-shrink-0 mr-4 text-white bg-[#493657] rounded-full p-2">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 4v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7m18 0a2 2 0 00-2-2H5a2 2 0 00-2 2m18 0V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-1">Email Us</h4>
                                <p className="text-gray-700 text-lg"><a href="mailto:info@calycopaints.com">support@calycopaints.com</a></p>
                                <p className="text-gray-500 text-sm">We reply within 24 hours</p>
                            </div>
                        </div>

                        {/* subtle divider to blend sections */}
                        <div className="border-t border-gray-100 my-4" />

                        {/* Expert Team (blended style) */}
                        <div className="mb-3 flex items-start">
                            <div className="flex-shrink-0 mr-4 text-white bg-[#493657] rounded-full p-2">
                                <FaUsers className="h-8 w-8" />
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-1">Expert Team</h4>
                                <p className="text-gray-500 text-sm">Collective 70+ years experience • Local market expertise</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-lg border border-gray-100 px-3 py-3">
                                <div className="text-lg font-bold text-gray-800">25</div>
                                <div className="text-gray-500 text-xs">Years Architecture</div>
                            </div>
                            <div className="rounded-lg border border-gray-100 px-3 py-3">
                                <div className="text-lg font-bold text-gray-800">27</div>
                                <div className="text-gray-500 text-xs">Years Design</div>
                            </div>
                            <div className="rounded-lg border border-gray-100 px-3 py-3">
                                <div className="text-lg font-bold text-[#f59e0b]">19M+</div>
                                <div className="text-gray-500 text-xs">Sq Ft Delivered</div>
                            </div>
                            <div className="rounded-lg border border-gray-100 px-3 py-3">
                                <div className="text-lg font-bold text-[#f59e0b]">15+</div>
                                <div className="text-gray-500 text-xs">Awards Won</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Address cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="flex justify-center">
                        <AddressCard
                            CountrName="India"
                            emailId="info@calycopaints.com"
                            completeAddress="B-37, Sector - 1, Noida NCR, India"
                        />
                    </div>
                    <div className="flex justify-center">
                        <AddressCard
                            CountrName="Dubai"
                            emailId="dubai@calycopaints.com"
                            completeAddress="Po Box: 42747 Hamriyah FZ, Sharjah, U.A.E."
                        />
                    </div>
                    <div className="flex justify-center">
                        <AddressCard
                            CountrName="Thailand"
                            emailId="thailand@calycopaints.com"
                            completeAddress="75 Ocean Tower - II, 18C Floor Sukhumvit Road, Bangkok, Thailand"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ContactUs;

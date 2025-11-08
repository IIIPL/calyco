import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaUsers, FaHeadset, FaGlobe, FaCheckCircle  } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { Button } from "../components/Button";
import { AddressCard } from "../components/AddressCard";
import contactData from "../data/admin/contact.json";

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
                                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-1">Contact Us</h4>
                                <p className="text-gray-700 text-base mb-2">
                                    <a
                                        href={contactData.contact.whatsapp.link}
                                        className="inline-flex items-center gap-2 text-[#493657] hover:text-[#F0C85A] font-semibold transition-colors underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {contactData.contact.whatsapp.displayText}
                                    </a>
                                </p>
                                <p className="text-gray-500 text-sm">{contactData.contact.workingHours.days}, {contactData.contact.workingHours.time}</p>
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

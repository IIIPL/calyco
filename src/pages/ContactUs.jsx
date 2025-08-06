import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaUsers, FaHeadset, FaGlobe, FaCheckCircle  } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { Button } from "../components/Button";
import { AddressCard } from "../components/AddressCard";

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
};

// Removed imageVariants as the specific image section is being replaced.

export const ContactUs = () => {
    const form = useRef();
    const [toast, setToast] = useState(null);
    const [sending, setSending] = useState(false);

    // State for form fields to control their values for emailjs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        document.title = "Contact Calyco";
        // Initialize emailjs with your public key
        // Ensure this key is correct and accessible.
        emailjs.init('o3nHktLCZY2hMn6EE'); 
    }, []);

    // Toaster auto-hide
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3500);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const sendEmail = async (e) => {
        e.preventDefault();
        setSending(true);

        // Construct the user_name, subject, and message for emailjs
        // This ensures the existing emailjs template receives expected fields.
        const userName = `${firstName} ${lastName}`.trim();
        const subject = `Website Inquiry from ${userName}`;
        const messageContent = `
            First Name: ${firstName}
            Last Name: ${lastName}
            Email: ${email}
            Postal Code: ${postalCode}
        `;

        // Create a temporary form data object to send to emailjs
        // This is a workaround to send custom data when the form fields don't directly match template variables.
        const formData = new FormData();
        formData.append('user_name', userName);
        formData.append('user_email', email);
        formData.append('subject', subject);
        formData.append('message', messageContent);

        try {
            // Using emailjs.send instead of emailjs.sendForm to send custom data
            await emailjs.send('service_nztkw4l', 'template_qaobwqf', Object.fromEntries(formData));
            setToast({ type: 'success', message: 'Message sent!' });
            // Clear form fields after successful submission
            setFirstName('');
            setLastName('');
            setPostalCode('');
            setEmail('');
        } catch (error) {
            console.error('Failed to send email:', error);
            setToast({ type: 'error', message: 'Failed to send. Please try again.' });
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="pt-20 min-h-screen">
            {/* Hero Section with Background Image */}
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
                {/* Main Contact Content - Replaced existing cards with new layout */}
                <div className="flex flex-col md:flex-row gap-8 mb-20">
                    {/* Right Column: Contact Form */}

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
                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">First Name</label>
                                    <input 
                                        type="text" 
                                        id="firstName"
                                        name="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent transition-all duration-200"
                                        placeholder="Your first name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="lastName"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent transition-all duration-200"
                                        placeholder="Your last name"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent transition-all duration-200"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                                <textarea 
                                    rows="6" // Increased rows for more space
                                    id="message" // Added ID for label association
                                    name="message"
                                    value={message} // Bind to the new message state
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent resize-y transition-all duration-200"
                                    placeholder="Tell us more about your project or inquiry..."
                                    required
                                ></textarea>
                            </div>
                            
                            <div className="text-center pt-4">
                                <Button
                                    type="submit"
                                    disabled={sending}
                                    onClick={() => {/* optional custom logic */}}
                                >
                                    {sending ? 'Sending...' : 'Send Message'}
                                </Button>
                            </div>

                        </form>
                    </motion.div>
                    <motion.div
                        className="bg-white w-full md:w-2/5 max-w-3xl flex flex-col shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                    >
                        

                        <div class="mb-8 flex items-start">
                            <div class="flex-shrink-0 mr-4 text-white bg-[#493657] rounded-full p-2">
                                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold text-gray-800 mb-1">Call Us</h4>
                                <p class="text-gray-700 text-lg"><a href="tel:+919958966881">+91-99589-66881</a></p>
                                <p class="text-gray-500 text-sm">Available Mon–Sat, 10am–6pm IST</p>
                            </div>
                        </div>

                        <div class="mb-8 flex items-start">
                            <div class="flex-shrink-0 mr-4 text-white bg-[#493657] rounded-full p-2">
                                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 4v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7m18 0a2 2 0 00-2-2H5a2 2 0 00-2 2m18 0V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold text-gray-800 mb-1">Email Us</h4>
                                <p class="text-gray-700 text-lg"><a href="mailto:info@calycopaints.com">support@calycopaints.com</a></p>
                                <p class="text-gray-500 text-sm">We reply within 24 hours</p>
                            </div>
                        </div>

                        <div class="mb-8 flex items-start">
                            <div class="flex-shrink-0 mr-4 text-white bg-[#493657] rounded-full p-2">
                                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-1">Visit Us</h4>
                                <p className="text-gray-700 text-lg">MEC Office, Civil Lines</p>
                                <p className="text-gray-700 text-lg">Nagpur, Maharashtra 440001</p>
                            </div>
                        </div>
                     
                        <div class="mb-8 flex items-start">
                            <div class="flex-shrink-0 mr-4 text-white bg-[#493657]  rounded-full p-2">
                                <FaGlobe className="h-8 w-8" />
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold text-gray-800 mb-1">Global Presence</h4>
                                <p class="text-gray-700 text-lg">PROLIFIC ENERGY FZE</p>
                                <p class="text-gray-700 text-lg">Po Box: 42747 Hamriyah FZ,</p>
                                <p class="text-gray-700 text-lg">Sharjah, U.A.E.</p>
                                <p class="text-gray-500 text-sm"><a href="tel:+971588285925">+97-15882-85925</a></p>
                            </div>
                        </div>


                    </motion.div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="flex justify-center">
                        <AddressCard
                            CountrName="India"
                            emailId="info@calycopaints.com"
                            completeAddress="MEC Office, Civil Lines Nagpur, Maharashtra 440001"
                        />
                    </div>
                    <div className="flex justify-center">
                        <AddressCard
                            CountrName="Dubai"
                            emailId="dubai@calycopaints.com"
                            completeAddress="PROLIFIC ENERGY FZE Po Box: 42747 Hamriyah FZ, Sharjah, U.A.E."
                        />
                    </div>
                    <div className="flex justify-center">
                        <AddressCard
                            CountrName="Thailand"
                            emailId="thailand@calycopaints.com"
                            completeAddress="75 Ocean Tower - II, 18C Floor Sukhumvit Road, Bangkok, Thailand"
                        />
                    </div>
                    <div className="flex justify-center">
                        <AddressCard
                            CountrName="Korea"
                            emailId="korea@calycopaints.com"
                            completeAddress="Regus Gangnam Station 16F, Seocho-dong, Seoul, Korea"
                        />
                    </div>
                    <div className="flex justify-center">
                        <AddressCard
                            CountrName="Japan"
                            emailId="japan@calycopaints.com"
                            completeAddress="19F Parks Tower, Nanbanaka, Naniwa-ku, Osaka-shi, Japan"
                        />
                    </div>
                    <div className="flex justify-center">
                        <AddressCard
                            CountrName="Turkey"
                            emailId="turkey@calycopaints.com"
                            completeAddress="Karamehmet Mh. Avrupa Serbest Bolgesi, Ergene/Tekirdag, Turkey"
                        />
                    </div>
                    {/* <div className="flex justify-center">
                        <AddressCard
                            CountrName="USA"
                            emailId="usa@calycopaints.com"
                            completeAddress="762 Green St. Iselin, NJ 08830, USA"
                        />
                    </div> */}
                    <div className="flex justify-center">
                        <AddressCard
                            CountrName="Singapore"
                            emailId="singapore@calycopaints.com"
                            completeAddress="Levels 21 Centennial Tower, 3 Temasek Avenue, Singapore"
                        />
                    </div>
                    <div className="flex justify-center">
                        <AddressCard
                            CountrName="Netherlands"
                            emailId="netherlands@calycopaints.com"
                            completeAddress="Zuidplein 126WTC, Toren H, 1077 XV Amsterdam, The Netherlands"
                        />
                    </div>
                    <div className="flex justify-center">
                        <AddressCard
                            CountrName="Indonesia"
                            emailId="infonesia@calycopaints.com"
                            completeAddress="Jl. Modern Industri XVIII, Desa Nambo Udik, Cikande, Serang - Banten, Indonesia"
                        />
                    </div>
                    </div>
                    


            </div>
        </div>
    );
}

export default ContactUs;

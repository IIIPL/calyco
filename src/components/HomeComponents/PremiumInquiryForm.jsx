import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const PremiumInquiryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        projectType: '',
        contactMethod: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        console.log('Form submitted:', formData);

        // Show success message
        setTimeout(() => {
            setIsSubmitted(true);
        }, 1000);
    };

    const inputClasses = "w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#998850] transition-colors duration-300 resize-none";
    const labelClasses = "block text-xs font-semibold text-[#998850] mb-1 tracking-[0.15em] uppercase";

    return (
        <section id="premium-inquiry" className="bg-[#0F1221] py-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#998850]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#432452]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* Left Side: Copy */}
                    <div className="lg:w-1/2 space-y-12 pt-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-[#998850] font-bold tracking-[0.2em] uppercase text-sm block mb-4">
                                START YOUR PROJECT -- CONTACT FORM SECTION
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                                Start With a Conversation. <br />
                                <span className="text-white/40">Not a Contract.</span>
                            </h2>
                            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
                                Tell us what you're working on. We'll come back with product recommendations, coverage calculations, and a delivered price -- usually within 48 hours. If the numbers work, we move forward together. If they don't, no pressure. We'd rather earn a long-term partner than rush a single order.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            {/* Step 01 */}
                            <div className="flex gap-6 group">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#998850]/50 transition-colors duration-300">
                                    <span className="text-[#998850] font-bold">01</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg mb-1">Share your scope.</h4>
                                    <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                                        Area, substrates, finish preferences, timeline. Upload a BOQ or floor plan if you have one -- it helps us be precise.
                                    </p>
                                </div>
                            </div>

                            {/* Step 02 */}
                            <div className="flex gap-6 group">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#998850]/50 transition-colors duration-300">
                                    <span className="text-[#998850] font-bold">02</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg mb-1">We recommend a system.</h4>
                                    <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                                        Primer through topcoat, matched to your substrates and conditions. You get a spec sheet and a landed cost.
                                    </p>
                                </div>
                            </div>

                            {/* Step 03 */}
                            <div className="flex gap-6 group">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#998850]/50 transition-colors duration-300">
                                    <span className="text-[#998850] font-bold">03</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg mb-1">You get a person.</h4>
                                    <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                                        A dedicated account contact who knows your project, tracks your order, and is available when you need them. Not a ticket number.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:w-1/2 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
                    >
                        <AnimatePresence mode='wait'>
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-[#0F1221]/95"
                                >
                                    <div className="w-20 h-20 rounded-full bg-[#998850]/20 flex items-center justify-center mb-6">
                                        <CheckCircle className="w-10 h-10 text-[#998850]" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
                                    <p className="text-white/60 max-w-xs mx-auto">
                                        Thanks for starting the conversation. We'll be in touch within 48 hours with next steps.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-8 text-sm text-[#998850] underline underline-offset-4 hover:text-white transition-colors"
                                    >
                                        Start another conversation
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="p-8 md:p-12"
                                >
                                    <form onSubmit={handleSubmit} className="space-y-8">

                                        {/* Row 1: Name & Company */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className={labelClasses}>Contact Name *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Your Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClasses}>Company Name</label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    placeholder="Optional"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </div>

                                        {/* Row 2: Phone & Email */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className={labelClasses}>Phone *</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="+91 ..."
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClasses}>Email *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="name@company.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Row 3: Project Type */}
                                        <div>
                                            <label className={labelClasses}>Project Type *</label>
                                            <div className="relative">
                                                <select
                                                    name="projectType"
                                                    value={formData.projectType}
                                                    onChange={handleChange}
                                                    className={`${inputClasses} bg-transparent appearance-none cursor-pointer pr-10`}
                                                    required
                                                >
                                                    <option value="" className="bg-[#0F1221] text-white/50">Select Project Type</option>
                                                    <option value="Residential Development" className="bg-[#0F1221]">Residential Development</option>
                                                    <option value="Commercial Fit-Out" className="bg-[#0F1221]">Commercial Fit-Out</option>
                                                    <option value="Hospitality" className="bg-[#0F1221]">Hospitality</option>
                                                    <option value="Healthcare & Education" className="bg-[#0F1221]">Healthcare & Education</option>
                                                    <option value="Infrastructure" className="bg-[#0F1221]">Infrastructure</option>
                                                    <option value="Maintenance & Repaint" className="bg-[#0F1221]">Maintenance & Repaint</option>
                                                    <option value="Other" className="bg-[#0F1221]">Other</option>
                                                </select>
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row 4: Preferred Contact Method */}
                                        <div>
                                            <label className={labelClasses}>Preferred Contact Method</label>
                                            <div className="flex flex-wrap gap-6 mt-3">
                                                {['Email', 'Phone', 'WhatsApp'].map((method) => (
                                                    <label key={method} className="flex items-center gap-3 cursor-pointer group select-none">
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.contactMethod === method ? 'border-[#998850] bg-[#998850]' : 'border-white/40 bg-transparent group-hover:border-white/60'}`}>
                                                            {formData.contactMethod === method && <div className="w-2 h-2 rounded-full bg-white" />}
                                                        </div>
                                                        <input
                                                            type="radio"
                                                            name="contactMethod"
                                                            value={method}
                                                            checked={formData.contactMethod === method}
                                                            onChange={handleChange}
                                                            className="hidden"
                                                        />
                                                        <span className={`text-sm transition-colors ${formData.contactMethod === method ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>{method}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Row 5: Message */}
                                        <div>
                                            <label className={labelClasses}>Message / Specific Needs</label>
                                            <textarea
                                                name="message"
                                                rows="3"
                                                placeholder="Tell us about your project -- area, substrates, timeline. The more you share, the more useful our quote will be."
                                                value={formData.message}
                                                onChange={handleChange}
                                                className={inputClasses}
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                className="w-full bg-[#998850] text-[#0F1221] py-5 rounded-xl font-bold uppercase tracking-[0.15em] hover:bg-[#B3A060] transition-colors shadow-lg flex items-center justify-center gap-3 group"
                                            >
                                                Let's Talk
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </motion.button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </ AnimatePresence>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default PremiumInquiryForm;

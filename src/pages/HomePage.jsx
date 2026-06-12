import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { WhyChooseCard } from "../components/WhyChooseCard";
import { FaPaintbrush, FaAward, FaUsers, FaShieldHalved, FaRocket } from "react-icons/fa6";
import Slider from "../components/Slider";
import { useNavigate } from "react-router-dom";
import { ColorTrends } from "../components/ColorComponents/ColorTrends";
import MiniVisualizer from "../components/MiniVisualizer";
import MiniInspirationGallery from "../components/HomeComponents/MiniInspirationGallyer";
import ColorSlider from "../components/ColorSlider";
import TrustBar from "../components/HomeComponents/TrustBar";
import DelhiNCRServices from "../components/HomeComponents/DelhiNCRServices";
import SocialProof from "../components/HomeComponents/SocialProof";

export const HomePage = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.3 });
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Calyco Paints - India's #2 Paint Brand | Premium Quality, 20% More Affordable";
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.8
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div>
            {/* Hero Slider - Cleaner, More Professional */}
            <section className="relative overflow-hidden">
                <ColorSlider />
            </section>

            {/* Trust Bar - Immediate Value Props */}
            <TrustBar />

            {/* Popular Colors Section - Kept as Requested */}
            <section className="py-16 md:py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#493657]/5 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#F0C85A]/20 text-[#493657] px-4 py-2 rounded-full text-xs font-medium mb-5">
                            <FaAward />
                            <span>Premium Products</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#493657] mb-4 leading-tight">
                            Shop by Color
                        </h2>
                        <p className="text-base md:text-lg text-[#493657]/70 max-w-2xl mx-auto leading-relaxed">
                            Browse our curated collection of premium colors. From bold statements to subtle elegance.
                        </p>
                    </motion.div>

                    <div className="relative z-10">
                        <Slider/>
                    </div>
                </div>
            </section>

            {/* Shop by Room Section */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F0C85A]/5 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#493657]/10 text-[#493657] px-4 py-2 rounded-full text-xs font-medium mb-5">
                            <FaRocket />
                            <span>Visualize Your Space</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#493657] mb-4 leading-tight">
                            See Colors Come to Life
                        </h2>
                        <p className="text-base md:text-lg text-[#493657]/70 max-w-2xl mx-auto leading-relaxed">
                            Try our interactive room visualizer and see exactly how your space will look before you paint.
                        </p>
                    </motion.div>

                    <div className="relative z-10">
                        <MiniVisualizer/>
                    </div>
                </div>
            </section>

            {/* Delhi NCR Services - New Landing Page Style Section */}
            <DelhiNCRServices />

            {/* Social Proof - Build Trust with Numbers */}
            <SocialProof />

            {/* Inspiration Gallery - Kept as Requested */}
            <section className="py-16 md:py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#493657]/5 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#F0C85A]/20 text-[#493657] px-4 py-2 rounded-full text-xs font-medium mb-5">
                            <FaPaintbrush />
                            <span>Real Projects</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#493657] mb-4 leading-tight">
                            Get Inspired by Real Homes
                        </h2>
                        <p className="text-base md:text-lg text-[#493657]/70 max-w-2xl mx-auto leading-relaxed">
                            See how homeowners across India are transforming their spaces with Calyco paints.
                        </p>
                    </motion.div>

                    <div className="relative z-10">
                        <MiniInspirationGallery height={200} cardWidth={280} />
                    </div>
                </div>
            </section>

            {/* Why Choose Section - Updated with New USPs */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-[#493657]/5 to-white relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-[#F0C85A]/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-[#493657]/10 to-transparent rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        className="text-center mb-12 md:mb-16 z-10"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-[#493657]/10 text-[#493657] px-4 py-2 rounded-full text-xs font-medium mb-5">
                            <FaShieldHalved />
                            <span>Our Promise</span>
                        </div>
                        <h2 className="font-bold text-[#493657] text-3xl md:text-4xl mb-4 leading-tight">
                            Why Choose Calyco
                        </h2>
                        <p className="text-base md:text-lg text-[#493657]/70 max-w-2xl mx-auto leading-relaxed">
                            Quality you can trust, value you'll love, and service that exceeds expectations
                        </p>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ 
                                    scale: 1.05, 
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <WhyChooseCard index={index} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Color Trends Section - Can be removed or kept based on preference */}
            {/* <section className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F0C85A]/5 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#493657]/10 text-[#493657] px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FaUsers />
                            <span>Trending Colors</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#493657] mb-6">
                            Color Trends 2025
                        </h2>
                        <p className="text-xl text-[#493657]/70 max-w-3xl mx-auto">
                            Stay ahead with the latest color trends and design inspirations for your home.
                        </p>
                    </motion.div>

                    <div className="relative z-10">
                        <ColorTrends/>
                    </div>
                </div>
            </section> */}

            {/* Call to Action Section */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-[#493657] to-[#5a4067] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium mb-5">
                            <FaRocket />
                            <span>Start Your Project</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                            Ready to Transform Your Space?
                        </h2>
                        <p className="text-base md:text-lg mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto">
                            Join thousands of homeowners who chose quality, affordability, and peace of mind with Calyco.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                                onClick={() => navigate('/colors')}
                                className="px-8 py-4 bg-[#F0C85A] text-[#493657] rounded-lg font-semibold hover:bg-[#E6B84A] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                            >
                                <FaPaintbrush />
                                Explore Colors
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                                onClick={() => navigate('/contact')}
                                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#493657] transition-all duration-300 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                            >
                                <FaUsers />
                                Get Free Consultation
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

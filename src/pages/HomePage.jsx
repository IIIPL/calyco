import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useMemo } from "react";
import { WhyChooseCard } from "../components/WhyChooseCard";
import { FaPaintbrush, FaAward, FaUsers, FaShieldHalved, FaRocket } from "react-icons/fa6";
import Slider from "../components/Slider";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "../components/HomeComponents/HeroSection";
import { ColorTrends } from "../components/ColorComponents/ColorTrends";
import MiniVisualizer from "../components/MiniVisualizer";
import MiniInspirationGallery from "../components/HomeComponents/MiniInspirationGallyer";
import VisualizerBanner from "../components/VisualizerBanner";

export const HomePage = () => {
    const navigate = useNavigate();
    
    // Check for reduced motion preference
    const prefersReducedMotion = useRef(
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ).current;

    // Memoized animation variants to avoid recreation
    const containerVariants = useRef({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: prefersReducedMotion ? 0.01 : 0.8
            }
        }
    }).current;

    const itemVariants = useRef({
        hidden: { y: prefersReducedMotion ? 0 : 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: prefersReducedMotion ? 0.01 : 0.6,
                ease: "easeOut"
            }
        }
    }).current;

    // In-view gates for heavy sections
    const sliderRef = useRef(null);
    const sliderInView = useInView(sliderRef, { once: true, margin: "-100px" });
    const vizRef = useRef(null);
    const vizInView = useInView(vizRef, { once: true, margin: "-100px" });
    const inspRef = useRef(null);
    const inspInView = useInView(inspRef, { once: true, margin: "-100px" });
    const trendsRef = useRef(null);
    const trendsInView = useInView(trendsRef, { once: true, margin: "-100px" });

    // Memoized array to avoid recreation on each render
    const whyCards = useRef([0, 1, 2, 3, 4, 5]).current;
    
    useEffect(() => {
        document.title = "Calyco Paints - Premium Paint Solutions";
    }, []);

    return (
        <div className="pt-20">
            {/* Enhanced Hero Section */}
            <HeroSection />
            <VisualizerBanner />
            
            {/* Enhanced Product Showcase Section */}
            <section className="py-20 bg-white relative overflow-hidden" aria-labelledby="prod-range-h">
                <div className="absolute inset-0 bg-gradient-to-br from-[#493657]/5 to-transparent" aria-hidden="true"></div>
                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div 
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#F0C85A]/20 text-[#5E3A98] px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FaAward />
                            <span>Premium Solutions</span>
                        </div>
                        <h2 id="prod-range-h" className="text-4xl md:text-5xl font-bold text-[#5E3A98] mb-6">
                            Our Product Range
                        </h2>
                        <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                            Discover our comprehensive range of premium paints and coatings designed for every surface and need.
                        </p>
                    </motion.div>
                    
                    <div ref={sliderRef} className="relative z-10 will-change-transform">
                        {sliderInView && <Slider/>}
                    </div>
                </div>
            </section>

            {/* Enhanced Visualizer Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" aria-labelledby="visualizer-h">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F0C85A]/5 to-transparent" aria-hidden="true"></div>
                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div 
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#493657]/10 text-[#5E3A98] px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FaRocket />
                            <span>Try Before You Buy</span>
                        </div>
                        <h2 id="visualizer-h" className="text-4xl md:text-5xl font-bold text-[#5E3A98] mb-6">
                            Visualize Your Space
                        </h2>
                        <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                            See how our colors transform your space with our interactive room visualizer.
                        </p>
                    </motion.div>
                    
                    <div ref={vizRef} className="relative z-10 will-change-transform">
                        {vizInView && <MiniVisualizer/>}
                    </div>
                </div>
            </section>

            {/* Enhanced Inspiration Gallery */}
            <section className="py-20 bg-white relative overflow-hidden" aria-labelledby="inspire-h">
                <div className="absolute inset-0 bg-gradient-to-br from-[#493657]/5 to-transparent" aria-hidden="true"></div>
                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div 
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#F0C85A]/20 text-[#5E3A98] px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FaPaintbrush />
                            <span>Design Inspiration</span>
                        </div>
                        <h2 id="inspire-h" className="text-4xl md:text-5xl font-bold text-[#5E3A98] mb-6">
                            Get Inspired
                        </h2>
                        <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                            Explore beautiful room designs and color combinations to inspire your next project.
                        </p>
                    </motion.div>
                    
                    <div ref={inspRef} className="relative z-10 will-change-transform">
                        {inspInView && <MiniInspirationGallery height={200} cardWidth={280} />}
                    </div>
                </div>
            </section>

            {/* Enhanced Why Choose Section */}
            <section className="py-20 bg-gradient-to-br from-[#493657]/5 to-white relative overflow-hidden" aria-labelledby="why-h">
                {/* Enhanced Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-[#F0C85A]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} aria-hidden="true"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-[#493657]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} aria-hidden="true"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#F0C85A]/10 to-[#493657]/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}} aria-hidden="true"></div>

                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div 
                        className="text-center mb-16 z-10"
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-[#493657]/10 text-[#5E3A98] px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FaShieldHalved />
                            <span>Why Choose Us</span>
                        </div>
                        <motion.h2 
                            id="why-h"
                            className="font-bold text-[#5E3A98] text-4xl md:text-5xl mb-6"
                            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Why Choose Calyco?
                        </motion.h2>
                        <motion.p 
                            className="text-xl text-[#333333] max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            Discover what makes us the preferred choice for premium paint solutions
                        </motion.p>
                        <motion.div 
                            className="w-20 h-1 bg-gradient-to-r from-[#F0C85A] to-[#493657] rounded-full mx-auto mt-6"
                            initial={{ width: 0 }}
                            whileInView={{ width: "5rem" }}
                            transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: 0.6 }}
                            viewport={{ once: true }}
                        ></motion.div>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {whyCards.map((index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ 
                                    scale: prefersReducedMotion ? 1 : 1.05, 
                                    boxShadow: prefersReducedMotion ? "0 4px 8px rgba(0,0,0,0.1)" : "0 20px 40px rgba(0,0,0,0.1)" 
                                }}
                                transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
                            >
                                <WhyChooseCard index={index} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Enhanced Color Trends Section */}
            <section className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden" aria-labelledby="trends-h">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F0C85A]/5 to-transparent" aria-hidden="true"></div>
                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div 
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#493657]/10 text-[#5E3A98] px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FaUsers />
                            <span>Trending Colors</span>
                        </div>
                        <h2 id="trends-h" className="text-4xl md:text-5xl font-bold text-[#5E3A98] mb-6">
                            Color Trends 2024
                        </h2>
                        <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                            Stay ahead with the latest color trends and design inspirations for your home.
                        </p>
                    </motion.div>
                    
                    <div ref={trendsRef} className="relative z-10 will-change-transform">
                        {trendsInView && <ColorTrends/>}
                    </div>
                </div>
            </section>

            {/* Enhanced Call to Action Section */}
            <section className="py-20 bg-gradient-to-r from-[#5E3A98] to-[#4a2e7a] relative overflow-hidden" aria-labelledby="cta-h">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" aria-hidden="true"></div>
                <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center text-[#F9F6F2]">
                    <motion.div 
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 text-[#F9F6F2]">
                            <FaRocket />
                            <span>Ready to Start?</span>
                        </div>
                        <h2 id="cta-h" className="text-4xl md:text-5xl font-bold mb-6 text-[#F9F6F2]">
                            Transform Your Space Today
                        </h2>
                        <p className="text-xl mb-10 opacity-90 leading-relaxed text-[#F9F6F2]">
                            Join thousands of satisfied customers who have transformed their homes with Calyco's premium paint solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <motion.button 
                                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                                onClick={() => navigate('/product')}
                                className="px-10 py-5 bg-[#C9A941] text-[#5E3A98] rounded-xl font-semibold hover:bg-[#E6B84A] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5E3A98] focus:outline-none"
                            >
                                <FaPaintbrush />
                                Shop Now
                            </motion.button>
                            <motion.button 
                                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                                onClick={() => navigate('/contact')}
                                className="px-10 py-5 border-2 border-[#F9F6F2] text-[#F9F6F2] rounded-xl font-semibold hover:bg-white hover:text-[#5E3A98] transition-all duration-300 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5E3A98] focus:outline-none"
                            >
                                <FaUsers />
                                Get Expert Advice
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
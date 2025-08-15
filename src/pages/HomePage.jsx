import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HomeCard } from "../components/HomeCard";
import { WhyChooseCard } from "../components/WhyChooseCard";
import { FaArrowRight, FaPaintbrush, FaLeaf, FaAward, FaUsers, FaShieldHalved, FaRocket } from "react-icons/fa6";
import Slider from "../components/Slider";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { HeroSection } from "../components/HomeComponents/HeroSection";
import { flatColors } from "../data/flatColors";
import { ColorTrends } from "../components/ColorComponents/ColorTrends";
import {HeroSlider} from "../components/HomeComponents/HeroSlider";
import Carousel from "../components/HomeComponents/Carousel";
import HeroColorShowcase from "../components/HeroColorShowcase";
import CategoryNav from "../components/CategoryNav";
import MiniVisualizer from "../components/MiniVisualizer";
import MiniInspirationGallery from "../components/HomeComponents/MiniInspirationGallyer";

const galleryImages = [
  {
    src: "/Assets/Inspiration/IMG-20250718-WA0043.jpg",
    alt: "Modern kitchen design",
  },
  {
    src: "/Assets/Inspiration/bedroom.jpg",
    alt: "Cozy bedroom in neutral tones",
  },
  {
    src: "/Assets/Inspiration/living.jpg",
    alt: "Bright living room with artwork",
  },
  {
    src: "/Assets/Inspiration/IMG-20250718-WA0041.jpg",
    alt: "Spa-like bathroom design",
  },
  {
    src: "/Assets/Inspiration/dining.jpg",
    alt: "Elegant dining area",
  },
  {
    src: "/Assets/Inspiration/IMG-20250718-WA0044.jpg",
    alt: "Modern office space",
  },
];

export const HomePage = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.3 });
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = "Calyco Paints - Premium Paint Solutions";
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
        <div className="pt-20">
            {/* Enhanced Hero Section */}
            <section className="relative min-h-screen bg-gradient-to-br from-[#F9F6F1] via-white to-[#F0C85A]/10 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-[#F0C85A]/20 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-[#493657]/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-[#F0C85A]/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                
                <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                        {/* Enhanced Left Content */}
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-center lg:text-left space-y-8"
                        >
                            <div className="space-y-4">
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 bg-[#493657]/10 text-[#493657] px-4 py-2 rounded-full text-sm font-medium"
                                >
                                    <FaLeaf className="text-green-600" />
                                    <span>Eco-Friendly Premium Paints</span>
                                </motion.div>
                                
                                <motion.h1 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-5xl md:text-7xl font-bold text-[#493657] leading-tight"
                                >
                                    ELEVATE
                                    <br />
                                    <span className="text-[#F0C85A]">YOUR SPACES</span>
                                </motion.h1>
                                
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-xl text-[#493657]/70 max-w-lg lg:max-w-none"
                                >
                                    Transform your home with our premium, eco-friendly paint collection. 
                                    Experience the perfect blend of beauty, durability, and sustainability.
                                </motion.p>
                            </div>

                            {/* Enhanced Stats */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="grid grid-cols-3 gap-6"
                            >
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#493657]">108+</div>
                                    <div className="text-sm text-[#493657]/70">Colors</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#493657]">100%</div>
                                    <div className="text-sm text-[#493657]/70">Low-VOC</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#493657]">10+</div>
                                    <div className="text-sm text-[#493657]/70">Years</div>
                                </div>
                            </motion.div>

                            {/* Enhanced CTA Buttons */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <button 
                                    onClick={() => navigate('/product')}
                                    className="px-8 py-4 bg-[#493657] text-white rounded-xl font-semibold hover:bg-[#5a4067] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <FaPaintbrush />
                                    Explore Products
                                </button>
                                <button 
                                    onClick={() => navigate('/colors')}
                                    className="px-8 py-4 border-2 border-[#493657] text-[#493657] rounded-xl font-semibold hover:bg-[#493657] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <FaArrowRight />
                                    View Colors
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Enhanced Right Image */}
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                <img
                                    src="https://res.cloudinary.com/dr98axi2n/image/upload/v1754145841/CALYCO_PREMIUM_Paints__NOVA_DEFENSE_1_mymkfw.png"
                                    alt="Calyco Premium Paints"
                                    className="w-full h-auto object-contain"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                            </div>
                            
                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#F0C85A] rounded-full opacity-20 animate-pulse shadow-lg"></div>
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#493657] rounded-full opacity-20 animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Enhanced Product Showcase Section */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#493657]/5 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#F0C85A]/20 text-[#493657] px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FaAward />
                            <span>Premium Solutions</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#493657] mb-6">
                            Our Product Range
                        </h2>
                        <p className="text-xl text-[#493657]/70 max-w-3xl mx-auto">
                            Discover our comprehensive range of premium paints and coatings designed for every surface and need.
                        </p>
                    </motion.div>
                    
                    <div className="relative z-10">
                        <Slider/>
                    </div>
                </div>
            </section>

            {/* Enhanced Visualizer Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
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
                            <FaRocket />
                            <span>Try Before You Buy</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#493657] mb-6">
                            Visualize Your Space
                        </h2>
                        <p className="text-xl text-[#493657]/70 max-w-3xl mx-auto">
                            See how our colors transform your space with our interactive room visualizer.
                        </p>
                    </motion.div>
                    
                    <div className="relative z-10">
                        <MiniVisualizer/>
                    </div>
                </div>
            </section>

            {/* Enhanced Inspiration Gallery */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#493657]/5 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#F0C85A]/20 text-[#493657] px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FaPaintbrush />
                            <span>Design Inspiration</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#493657] mb-6">
                            Get Inspired
                        </h2>
                        <p className="text-xl text-[#493657]/70 max-w-3xl mx-auto">
                            Explore beautiful room designs and color combinations to inspire your next project.
                        </p>
                    </motion.div>
                    
                    <div className="relative z-10">
                        <MiniInspirationGallery height={200} cardWidth={280} />
                    </div>
                </div>
            </section>

            {/* Enhanced Why Choose Section */}
            <section className="py-20 bg-gradient-to-br from-[#493657]/5 to-white relative overflow-hidden">
                {/* Enhanced Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-[#F0C85A]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-[#493657]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#F0C85A]/10 to-[#493657]/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>

                <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div 
                        className="text-center mb-16 z-10"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-[#493657]/10 text-[#493657] px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FaShieldHalved />
                            <span>Why Choose Us</span>
                        </div>
                        <motion.h2 
                            className="font-bold text-[#493657] text-4xl md:text-5xl mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Why Choose Calyco?
                        </motion.h2>
                        <motion.p 
                            className="text-xl text-[#493657]/70 max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            Discover what makes us the preferred choice for premium paint solutions
                        </motion.p>
                        <motion.div 
                            className="w-20 h-1 bg-gradient-to-r from-[#F0C85A] to-[#493657] rounded-full mx-auto mt-6"
                            initial={{ width: 0 }}
                            whileInView={{ width: "5rem" }}
                            transition={{ duration: 0.8, delay: 0.6 }}
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

            {/* Enhanced Color Trends Section */}
            <section className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
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
                            Color Trends 2024
                        </h2>
                        <p className="text-xl text-[#493657]/70 max-w-3xl mx-auto">
                            Stay ahead with the latest color trends and design inspirations for your home.
                        </p>
                    </motion.div>
                    
                    <div className="relative z-10">
                        <ColorTrends/>
                    </div>
                </div>
            </section>

            {/* Enhanced Call to Action Section */}
            <section className="py-20 bg-gradient-to-r from-[#493657] to-[#5a4067] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center text-white">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FaRocket />
                            <span>Ready to Start?</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Transform Your Space Today
                        </h2>
                        <p className="text-xl mb-10 opacity-90 leading-relaxed">
                            Join thousands of satisfied customers who have transformed their homes with Calyco's premium paint solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <motion.button 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                                onClick={() => navigate('/product')}
                                className="px-10 py-5 bg-[#F0C85A] text-[#493657] rounded-xl font-semibold hover:bg-[#E6B84A] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                <FaPaintbrush />
                                Shop Now
                            </motion.button>
                            <motion.button 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                                onClick={() => navigate('/contact')}
                                className="px-10 py-5 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-[#493657] transition-all duration-300 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
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
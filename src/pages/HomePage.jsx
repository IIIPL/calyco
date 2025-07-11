import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { HomeCard } from "../components/HomeCard";
import { WhyChooseCard } from "../components/WhyChooseCard";
import { FaArrowRight } from "react-icons/fa6";
import Slider from "../components/Slider";

export const HomePage = () => {
    const ref = useRef(null);
    const heroRef = useRef(null);
    const isInView = useInView(ref, { threshold: 0.3 });
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    
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

    const floatingVariants = {
        floating: {
            y: [-10, 10, -10],
            rotate: [-2, 2, -2],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="pt-20">
            {/* Enhanced Hero Section */}
            <section className="min-h-screen bg-gradient-to-br from-[#F0C85A]/10 via-white to-[#493657]/10 px-6 md:px-20 py-20 flex flex-col md:flex-row items-center relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#F0C85A]/10 to-[#493657]/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#493657]/10 to-[#F0C85A]/10 rounded-full blur-3xl"></div>
                </div>

                {/* Left Text */}
                <motion.div 
                    className="flex-1 z-10 relative"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    ref={heroRef}
                >
                    <motion.h1 
                        className="text-5xl md:text-7xl font-bold text-[#493657] mb-6 leading-tight"
                        variants={itemVariants}
                    >
                        Transform Your
                        <span className="block bg-gradient-to-r from-[#F0C85A] to-[#493657] bg-clip-text text-transparent">
                            Space with Calyco Paints
                        </span>
                    </motion.h1>

                    <motion.p 
                        className="text-xl text-[#493657]/70 mb-8 max-w-2xl leading-relaxed"
                        variants={itemVariants}
                    >
                        Experience the perfect blend of innovation and artistry with Calyco Paints. 
                        Our premium formulations bring walls to life with rich, lasting colors.
                    </motion.p>

                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4"
                        variants={itemVariants}
                    >
                        {/* Updated Golden Button */}
                        <button className="group relative px-10 py-5 bg-gradient-to-r from-[#F0C85A] to-[#F0C85A]/80 text-[#493657] font-semibold rounded-2xl border border-[#F0C85A]/50 hover:shadow-2xl hover:shadow-[#F0C85A]/30 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden">
                            {/* Golden shimmer overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F0C85A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                            
                            {/* Purple glow border */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#493657]/20 via-[#493657]/10 to-[#493657]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                            
                            {/* Particles effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="absolute top-2 left-4 w-1 h-1 bg-[#F0C85A] rounded-full animate-ping"></div>
                                <div className="absolute top-6 right-6 w-0.5 h-0.5 bg-[#493657] rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                                <div className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-[#F0C85A] rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                                <div className="absolute bottom-5 right-4 w-1 h-1 bg-[#F0C85A]/70 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
                            </div>
                            
                            {/* Inner glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#F0C85A]/50 via-[#F0C85A]/30 to-[#F0C85A]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <span className="relative flex items-center gap-3 text-lg tracking-wide">
                                <span className="bg-gradient-to-r from-[#493657] to-[#493657]/80 bg-clip-text text-transparent font-bold">
                                Explore Products
                                </span>
                                <FaArrowRight className="w-5 h-5 text-[#493657] group-hover:translate-x-2 group-hover:text-[#493657]/80 transition-all duration-300 drop-shadow-sm" />
                            </span>
                            
                            {/* Purple accent line */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#493657] to-[#493657]/80 group-hover:w-full transition-all duration-500 rounded-full"></div>
                        </button>

                        <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-[#493657]/20 text-[#493657] font-semibold rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                            Color Consultation
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div 
                        className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-[#493657]/20"
                        variants={itemVariants}
                    >
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#F0C85A]">50K+</div>
                            <div className="text-sm text-[#493657]/60">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#493657]">500+</div>
                            <div className="text-sm text-[#493657]/60">Color Options</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#F0C85A]">15+</div>
                            <div className="text-sm text-[#493657]/60">Years Experience</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Image */}
                <motion.div 
                    className="flex-1 flex justify-center z-10"
                    variants={floatingVariants}
                    animate="floating"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F0C85A]/20 to-[#493657]/20 rounded-3xl blur-2xl transform rotate-6"></div>
                        <img
                            src="/image.png"
                            alt="Calyco Paint Solutions"
                            className="relative w-full max-w-xs md:max-w-md lg:max-w-lg rounded-3xl shadow-2xl object-contain transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Enhanced Who We Serve Section */}
            <section className="min-h-screen bg-gradient-to-b from-white to-[#493657]/5 flex flex-col relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                
                <motion.div 
                    className="flex flex-col lg:flex-row gap-12 lg:gap-24 my-20 mx-6 md:mx-28 z-10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="lg:w-1/3">
                        <h2 className="font-bold text-4xl md:text-5xl text-[#493657] mb-4">
                            Who We Serve
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#F0C85A] to-[#493657] rounded-full"></div>
                    </div>
                    <div className="lg:w-2/3">
                        <p className="text-xl text-[#493657]/70 leading-relaxed">
                            We are committed to revolutionizing spaces through the power of premium paint technology 
                            and personalized color solutions. From homeowners to commercial contractors, we serve 
                            diverse industries with excellence and innovation.
                        </p>
                    </div>
                </motion.div>

                <motion.div 
                    className="flex flex-col md:flex-row lg:flex-row gap-6 justify-center mt-8 px-6 mx-10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <HomeCard index={0} paintName={"Interior"} />
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <HomeCard index={1} paintName="Stain & Sealer" />
                    </motion.div>
                </motion.div>

                <motion.button 
                    className="flex justify-center mt-20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="group flex items-center justify-center gap-3 px-12 py-5 mt-3 mb-10 bg-gradient-to-r from-[#493657] to-[#493657]/80 text-white text-lg font-semibold rounded-2xl hover:shadow-2xl hover:shadow-[#493657]/25 transition-all duration-300 transform hover:-translate-y-1">
                        <span>View All Products</span>
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.button>

                <Slider />
            </section>

            {/* Enhanced Why Choose Section */}
            <section className="min-h-screen bg-gradient-to-br from-[#493657]/5 to-white flex flex-col px-6 md:px-32 pt-20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-[#F0C85A]/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-[#493657]/20 to-transparent rounded-full blur-3xl"></div>

                <motion.div 
                    className="text-center mb-16 z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-bold text-[#493657] text-4xl md:text-5xl mb-6">
                        Why Choose Calyco?
                    </h2>
                    <p className="text-xl text-[#493657]/70 max-w-3xl mx-auto">
                        Discover what makes us the preferred choice for premium paint solutions
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#F0C85A] to-[#493657] rounded-full mx-auto mt-6"></div>
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

                <motion.button 
                    className="flex justify-center mt-16 z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="group flex items-center justify-center gap-3 px-10 py-4 mt-3 mb-10 bg-gradient-to-r from-[#F0C85A] to-[#F0C85A]/80 text-[#493657] text-lg font-semibold rounded-2xl hover:shadow-2xl hover:shadow-[#F0C85A]/25 transition-all duration-300 transform hover:-translate-y-1">
                        <span>View All Products</span>
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.button>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 px-6 md:px-32">
                <motion.div 
                    className="text-center text-[#493657]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Transform Your Space?
                    </h2>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have trusted Calyco Paints for their projects
                    </p>
                    <motion.button 
                        className="group px-10 py-4 bg-white text-[#493657] font-semibold rounded-2xl border border-[#493657]/20 hover:bg-[#493657]/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="flex items-center gap-2">
                            Get Free Consultation
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </motion.button>
                </motion.div>
            </section>

            {/* <Footer/> */}
        </div>
    );
};
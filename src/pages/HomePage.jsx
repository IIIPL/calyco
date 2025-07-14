import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { HomeCard } from "../components/HomeCard";
import { WhyChooseCard } from "../components/WhyChooseCard";
import { FaArrowRight } from "react-icons/fa6";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";

export const HomePage = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.3 });
    
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
            <section className="min-h-screen bg-[#F9F6F1] flex items-center justify-center">
                <div className="max-w-screen-xl w-full px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                    
                    {/* Left Text Section */}
                    <div className="text-center md:text-left md:w-1/2 space-y-4">
                        <h1 className="text-4xl font-semibold text-[#301A44]">Calyco</h1>
                        <h2 className="text-2xl text-[#301A44]">Premium Finishes for Every Surface</h2>
                        <p className="text-gray-700">
                            Engineered coatings for interiors, exteriors, wood, metal, and more — crafted for durability, beauty, and sustainability.
                        </p>
                        <button className="mt-4 bg-[#301A44] text-white px-6 py-2 rounded-full hover:bg-[#40265d] transition">
                            <Link to="/product" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Explore Products</Link>
                        </button>
                    </div>

                    {/* Right Image Section */}
                    <div className="">
                    <img
                        src="/Assets/home.png"
                        alt="Calyco Hero"
                        className="w-full max-w-lg mx-auto md:mx-0 object-contain"

                    />
                    </div>

                </div>
            </section>


            {/* Enhanced Who We Serve Section */}
            <section className="min-h-screen bg-gradient-to-b from-white to-[#493657]/5 flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                
                {/* Enhanced Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-[#F0C85A]/10 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-[#493657]/10 to-transparent rounded-full blur-3xl"></div>
                </div>
                
                <motion.div 
                    className="flex flex-col lg:flex-row gap-12 lg:gap-24 my-20 mx-6 md:mx-28 z-10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="lg:w-1/3">
                        <motion.h2 
                            className="font-bold text-4xl md:text-5xl text-[#493657] mb-4"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Who We Serve
                        </motion.h2>
                        <motion.div 
                            className="w-20 h-1 bg-gradient-to-r from-[#F0C85A] to-[#493657] rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "5rem" }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                        ></motion.div>
                    </div>
                    <div className="lg:w-2/3">
                        <motion.p 
                            className="text-xl text-[#493657]/70 leading-relaxed"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            We are committed to revolutionizing spaces through the power of premium paint technology 
                            and personalized color solutions. From homeowners to commercial contractors, we serve 
                            diverse industries with excellence and innovation.
                        </motion.p>
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
                    <div className="group flex items-center justify-center gap-3 px-12 py-5 mt-3 mb-10 bg-gradient-to-r from-[#493657] to-[#493657]/80 text-white text-lg font-semibold rounded-2xl hover:shadow-2xl hover:shadow-[#493657]/25 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                        {/* Enhanced button background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F0C85A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="relative">View All Products</span>
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative" />
                    </div>
                </motion.button>

                <Slider />
            </section>

            {/* Enhanced Why Choose Section */}
            <section className="min-h-screen bg-gradient-to-br from-[#493657]/5 to-white flex flex-col px-6 md:px-32 pt-20 relative overflow-hidden">
                {/* Enhanced Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-[#F0C85A]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-[#493657]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#F0C85A]/10 to-[#493657]/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>

                <motion.div 
                    className="text-center mb-16 z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
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

                <motion.button 
                    className="flex justify-center mt-16 z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="group flex items-center justify-center gap-3 px-10 py-4 mt-3 mb-10 bg-gradient-to-r from-[#F0C85A] to-[#F0C85A]/80 text-[#493657] text-lg font-semibold rounded-2xl hover:shadow-2xl hover:shadow-[#F0C85A]/25 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                        {/* Enhanced button background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#493657]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="relative">View All Products</span>
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative" />
                    </div>
                </motion.button>
            </section>

            {/* Enhanced Call to Action Section */}
            <section className="py-20 px-6 md:px-32 relative overflow-hidden">
                {/* Enhanced Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-b from-[#F0C85A]/10 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-t from-[#493657]/10 to-transparent rounded-full blur-3xl"></div>
                </div>
                
                <motion.div 
                    className="text-center text-[#493657] relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Ready to Transform Your Space?
                    </motion.h2>
                    <motion.p 
                        className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Join thousands of satisfied customers who have trusted Calyco Paints for their projects
                    </motion.p>
                    <motion.button 
                        className="group px-10 py-4 bg-white text-[#493657] font-semibold rounded-2xl border border-[#493657]/20 hover:bg-[#493657]/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Enhanced button background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F0C85A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="flex items-center gap-2 relative">
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
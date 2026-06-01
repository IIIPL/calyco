import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductGallery = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const showcaseImages = [
        "/home page redesign/WhatsApp Image 2026-02-06 at 14.58.13.jpeg",
        "/home page redesign/WhatsApp Image 2026-02-06 at 14.58.36.jpeg",
        "/home page redesign/WhatsApp Image 2026-02-06 at 15.02.23~2.jpeg"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % showcaseImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [showcaseImages.length]);

    return (
        <section className="relative w-full h-[80vh] overflow-hidden bg-[#0F1221]">

            {/* Background Image Carousel */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={showcaseImages[currentIndex]}
                        alt="Gallery Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay - Explicitly separated to ensure no brightness reduction on image itself */}
                    <div className="absolute inset-0 bg-black/50" />
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <span className="text-[#998850] font-bold tracking-[0.2em] uppercase text-sm block mb-4">
                            Why Choose Calyco
                        </span>

                        <h2 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg">
                            Walls That Stand Out
                        </h2>

                        <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl drop-shadow-md leading-relaxed">
                            Engineered for life, designed for luxury. Experience the perfect blend of aesthetics and performance.
                        </p>

                        <div className="pt-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/products')}
                                className="bg-white text-[#0F1221] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#998850] hover:text-white transition-colors duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                            >
                                Explore All Products
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {showcaseImages.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-8 h-2 bg-[#998850]' : 'w-2 h-2 bg-white/50 hover:bg-white'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

        </section>
    );
};

export default ProductGallery;

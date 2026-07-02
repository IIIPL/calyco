import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMiniStar } from 'react-icons/hi2';
import { BsQuote } from 'react-icons/bs';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

const TestimonialsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const testimonials = [
        {
            role: "Residential Developer, NCR",
            title: "Project Lead",
            quote: "We tested Calyco on one building to compare it against what we'd been using. Same coverage, cleaner finish, and the invoice was noticeably lower. But what made us switch permanently was the account manager. He knew our build schedule better than some of our own people. Third reorder and counting.",
            category: "Developer"
        },
        {
            role: "Hospitality Practice, Gurgaon",
            title: "Interior Designer",
            quote: "I needed a textured finish that photographed like imported product on a domestic budget. Calyco gave me three options I wouldn't have found from the usual brands. They sent physical samples before I committed and walked me through the primer spec for a difficult retrofit substrate. It felt like working with a partner, not placing an order.",
            category: "Designer"
        },
        {
            role: "Multi-Property Hotel Group",
            title: "Maintenance Director",
            quote: "Three hotels, interior and exterior. Eighteen months in -- the exterior has held through two monsoons. The corridors still wipe clean. Low odour meant we could paint with guests in-house. But what keeps me with Calyco is one thing: I have one person I call, he knows my properties, and I never re-explain anything. That continuity is worth more than any discount.",
            category: "Facility Manager"
        }
    ];

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Auto-advance -- empty deps + functional updater avoids stale closure and prevents interval recreation on every slide change
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        })
    };

    return (
        <section className="py-10 bg-[#F5F5F0] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#998850]/10 blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#432452]/5 blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[#998850] font-medium tracking-[0.2em] uppercase text-sm block mb-6"
                    >
                        What Happens After the First Order
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl lg:text-5xl font-light text-[#0F1221] leading-[1.15] mb-8 max-w-4xl mx-auto"
                    >
                        Try One Room. Judge the Finish Yourself.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-base md:text-lg text-[#0F1221]/50 leading-[1.75] max-w-2xl mx-auto font-light"
                    >
                        Book a small repaint, rental flat, or single-room project first. If the experience feels different, scale to the full home.
                    </motion.p>
                </div>

                {/* Carousel Container -- keyboard navigation via arrow keys */}
                <div
                    className="relative max-w-5xl mx-auto min-h-[400px] md:min-h-[350px] outline-none"
                    tabIndex={0}
                    role="region"
                    aria-label="Customer testimonials"
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') prevSlide();
                        if (e.key === 'ArrowRight') nextSlide();
                    }}
                >
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.4 }
                            }}
                            className="w-full"
                        >
                            <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-[0_20px_60px_-15px_rgba(15,18,33,0.08)] border border-[#0F1221]/5 relative">
                                <BsQuote className="absolute top-8 left-8 text-[#998850]/8 text-4xl pointer-events-none select-none" />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Stars */}
                                    <div className="flex gap-1 text-[#998850] mb-8">
                                        {[...Array(5)].map((_, i) => (
                                            <HiMiniStar key={i} className="w-5 h-5" />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="text-xl md:text-2xl lg:text-[1.75rem] leading-[1.6] text-[#0F1221] font-light mb-10 max-w-4xl">
                                        "{testimonials[currentIndex].quote}"
                                    </blockquote>

                                    {/* Author Info */}
                                    <div className="space-y-2">
                                        <div className="text-[#998850] font-medium tracking-[0.15em] text-sm uppercase">
                                            {testimonials[currentIndex].category}
                                        </div>
                                        <h4 className="text-lg font-bold text-[#0F1221]">
                                            {testimonials[currentIndex].title}
                                        </h4>
                                        <p className="text-[#0F1221]/70 text-sm md:text-base font-light">
                                            {testimonials[currentIndex].role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 lg:-left-24 z-20">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full bg-white text-[#0F1221] shadow-lg flex items-center justify-center hover:bg-[#998850] hover:text-white transition-all duration-300 group"
                        >
                            <GoArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 lg:-right-24 z-20">
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full bg-white text-[#0F1221] shadow-lg flex items-center justify-center hover:bg-[#998850] hover:text-white transition-all duration-300 group"
                        >
                            <GoArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-[#998850]' : 'w-2 bg-[#0F1221]/10 hover:bg-[#0F1221]/20'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;

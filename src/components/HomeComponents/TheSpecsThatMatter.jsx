import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getTypographyClasses } from '../../data/admin/typography';

const TheSpecsThatMatter = () => {
    const specs = [
        {
            value: "15–20%",
            label: "Below national brand pricing",
            desc: "Same acrylic copolymer chemistry, direct-from-manufacturer.",
            color: "#059669" // Emerald
        },
        {
            value: "< 50 g/L",
            label: "VOC content",
            desc: "Green Building compliant. Low odour for occupied spaces.",
            color: "#0891B2" // Cyan
        },
        {
            value: "10–12 m²/L",
            label: "Coverage per coat",
            desc: "Full hide in two coats on primed surfaces. Less product, less labour.",
            color: "#2563EB" // Blue
        },
        {
            value: "30 min",
            label: "Surface dry",
            desc: "At 25°C / 50% RH. Recoat in 3–4 hours. Two coats in one day.",
            color: "#D97706" // Amber
        },
        {
            value: "8 years",
            label: "Interior warranty",
            desc: "Applied and maintained to spec. Full terms on request.",
            color: "#7C3AED" // Violet
        },
        {
            value: "300,000+",
            label: "Square metres applied",
            desc: "NTPC power stations, Bhilai Steel, infrastructure with L&T, GE, Mitsubishi.",
            color: "#DB2777" // Pink
        },
        {
            value: "25+ years",
            label: "Continuous production",
            desc: "Manufacturing since 1997. Lab-tested every batch.",
            color: "#EA580C" // Orange
        },
        {
            value: "1,000 L",
            label: "Bulk tote supply",
            desc: "Built-in dispensing. Lowest per-litre cost. Reduces packaging waste.",
            color: "#4B5563" // Slate
        }
    ];

    return (
        <section className="py-24 bg-[#FAFAFA] relative overflow-hidden text-[#1a1a1a]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

                {/* Header */}
                <div className="mb-20 max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="block text-[#C4A962] text-xs font-medium tracking-[0.2em] uppercase mb-4"
                    >
                        The Specs That Matter
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-[52px] leading-[1.1] mb-6 font-serif font-light text-[#1a1a1a]"
                    >
                        Don’t Trust the Marketing. <br /><span className="italic text-[#1a1a1a]/50 font-light">Trust the Data.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[#1a1a1a]/70 text-lg leading-relaxed max-w-2xl font-light"
                    >
                        Every claim on this page ties back to a test result, a spec sheet, or a project delivered. Here’s the data that matters when you’re making a procurement decision.
                    </motion.p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-20 border-t border-[#1a1a1a]/10 pt-12">
                    {specs.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="text-3xl font-bold mb-2 font-serif" style={{ color: item.color }}>
                                {item.value}
                            </div>
                            <div className="text-sm font-bold uppercase tracking-wide text-[#1a1a1a]/40 mb-3">
                                {item.label}
                            </div>
                            <p className="text-[#1a1a1a]/70 text-sm leading-relaxed border-l-2 pl-3" style={{ borderColor: `${item.color}4D` }}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 border-t border-[#1a1a1a]/10 pt-12"
                >
                    <p className="max-w-3xl text-[#1a1a1a]/60 text-sm leading-relaxed font-light italic">
                        100% acrylic copolymer binder. UV-resistant pigments. Advanced cross-linking technology. Anti-fungal and anti-microbial as standard. Recyclable HDPE packaging.
                    </p>

                    <Link
                        to="/downloads"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#998850] transition-colors duration-300 shadow-xl shadow-black/5 whitespace-nowrap"
                    >
                        <span>Download Technical Data</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default TheSpecsThatMatter;

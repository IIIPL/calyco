import React from 'react';
import { motion } from 'framer-motion';
import { getTypographyClasses } from '../../data/admin/typography';

const WhoWeWorkWith = () => {
    const professionals = [
        {
            number: "01",
            title: "Architects & Interior Designers",
            problem: "The finish has to look intentional. Textured walls, warm contemporary palettes, something that photographs well. But the materials budget was committed two revisions ago.",
            solution: "Textured, matt, and decorative finishes across thousands of RAL and custom tints — the same aesthetic range as imported product, manufactured direct. We’ll send physical finish samples and full spec sheets before you commit. 15–20% below what you’d pay for a comparable branded range."
        },
        {
            number: "02",
            title: "Developers & Builders",
            problem: "Materials cost is eating margin. Finish needs to pass buyer inspection. And the last supplier quoted three weeks for delivery — twice.",
            solution: "Two-coat coverage at 10–12 m²/L — less product, fewer hours, faster handover. 8-year interior warranty reduces callback risk. Bulk tote supply (1,000L) drops your per-litre cost further. Your account manager tracks your build schedule so resupply happens before you chase it."
        },
        {
            number: "03",
            title: "Contractors & Applicators",
            problem: "Slow-drying paint burns daylight. Resupply gaps burn days. Cheap product that fails on the wall burns your reputation.",
            solution: "Surface dry in 30 minutes. Recoat in 3–4 hours. Water-based cleanup. Low odour for occupied buildings. Lab-tested consistency batch to batch — what works on unit one works on unit forty. Supplied in the volumes that keep your crew moving."
        },
        {
            number: "04",
            title: "Facility & Property Managers",
            problem: "High-traffic areas look tired within months. Every repaint means downtime, disruption, and cost approval headaches.",
            solution: "Washable matt finish that handles daily abuse — stains wipe away with soapy water. Anti-fungal, anti-microbial protection for corridors, kitchens, and wet areas. Longer repaint cycles. One call to your account manager to schedule recurring supply against your maintenance calendar."
        }
    ];

    return (
        <section className="py-32 bg-[#1A1A1A] relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/Assets/Textures/Urban%20Concrete%20(The%20Grey%20Cement%20Look).webp"
                    alt="Background Texture"
                    className="w-full h-full object-cover opacity-20 invert"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#1A1A1A]/95 to-[#111]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

                {/* Header */}
                <div className="mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="block text-[#C4A962] text-xs font-medium tracking-[0.2em] uppercase mb-6"
                    >
                        Who We Work With
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`${getTypographyClasses('h2')} text-white text-3xl md:text-5xl lg:text-[52px] leading-[1.1] mb-8 font-light tracking-tight max-w-3xl`}
                    >
                        Different Professionals.<br />Same Frustration. <span className="text-[#C4A962]">One Fix.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/70 text-lg leading-[1.7] max-w-2xl font-light border-l border-white/10 pl-6"
                    >
                        Wherever you sit in the project chain, the problem is the same: you’re paying more than you should for coatings that don’t perform any better than ours. Here’s how we fit into your workflow.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 lg:gap-x-32">
                    {professionals.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                            className="group relative"
                        >
                            <div className="flex flex-col gap-6">
                                {/* Large Faint Number */}
                                <div className="text-8xl md:text-9xl font-light text-white opacity-[0.03] absolute -top-16 -left-8 select-none font-serif z-0 transition-opacity duration-500 group-hover:opacity-[0.05]">
                                    {item.number}
                                </div>

                                {/* Content */}
                                <div className="relative z-10 pl-4 border-l border-white/10 group-hover:border-[#C4A962]/50 transition-colors duration-500">
                                    <h3 className={`${getTypographyClasses('h3')} text-2xl md:text-3xl text-white mb-8 font-medium`}>
                                        {item.title}
                                    </h3>

                                    <div className="mb-8">
                                        <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-white/40 mb-3">The Problem</span>
                                        <p className="text-white/65 leading-[1.7] font-light text-[15px] italic">
                                            "{item.problem}"
                                        </p>
                                    </div>

                                    <div>
                                        <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-[#C4A962] mb-3">Our Solution</span>
                                        <p className="text-white/85 leading-[1.7] text-[15px] font-light">
                                            {item.solution}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhoWeWorkWith;

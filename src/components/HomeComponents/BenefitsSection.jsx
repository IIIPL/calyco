import React from 'react';
import { motion } from 'framer-motion';
import { getTypographyClasses } from '../../data/admin/typography';

const BenefitsSection = () => {
    const benefits = [
        {
            label: "The Price Problem",
            headline: "Same Chemistry. Smaller Invoice.",
            description: "You’re not paying for better chemistry when you buy a national brand. You’re paying for their advertising, their distribution chain, and their retail margins. Calyco uses the same 100% acrylic copolymer binder — we just sell it direct. Full coverage in two coats at 10–12 m²/L. That’s 15–20% less per project, with the same spec sheet performance. The maths isn’t complicated."
        },
        {
            label: "The Complexity Problem",
            headline: "One Supplier. Every Surface. Already Compliant.",
            description: "Interior emulsion, exterior weathercoats, textured finishes, primers, sealers, waterproofing — from one manufacturer. All water-based, all < 50 g/L VOC, all Green Building compliant out of the tin. Zero heavy metals. Zero formaldehyde. Recyclable packaging. You don’t need to source eco-specialty products or coordinate across multiple suppliers. One relationship handles it."
        },
        {
            label: "The Trust Problem",
            headline: "A Person Who Knows Your Project. Not a Portal.",
            description: "30-minute surface dry. 3–4 hour recoat. Your crew keeps moving. But the real speed is in the relationship: quotes within 48 hours, dispatch on committed dates, and a dedicated account contact who knows what you ordered, when it’s due, and what’s coming next. When something needs solving, you call a person — not a helpline."
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-[#F7F6F3] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                    {benefits.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.12 }}
                            className="group relative flex flex-col items-start text-left"
                        >
                            {/* Optional Oversized Number */}
                            <div className="absolute -top-16 -left-6 text-[140px] font-bold text-[#0F1221] opacity-[0.03] select-none pointer-events-none leading-none font-serif">
                                0{index + 1}
                            </div>

                            {/* Small Label */}
                            <div className="mb-4">
                                <span className="text-xs md:text-sm font-medium uppercase tracking-[0.15em] text-[#0F1221]/45">
                                    {item.label}
                                </span>
                                {/* Subtle divider */}
                                <div className="mt-2 h-[1px] w-full bg-[#0F1221]/10" />
                            </div>

                            {/* Main Headline */}
                            <h3 className={`${getTypographyClasses('h3')} text-2xl md:text-[28px] lg:text-[32px] leading-[1.2] mb-6 text-[#0F1221] font-serif group-hover:text-[#342347] transition-colors duration-300`}>
                                {item.headline}
                            </h3>

                            {/* Body Copy */}
                            <p className="text-[16px] md:text-[17px] leading-[1.75] text-[#0F1221]/65 max-w-[420px] font-light">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;

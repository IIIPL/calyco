import React from "react";
import { motion } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Colors that fit",
    highlight: "your lifestyle",
    description: "Personalised shade recommendations for every room and style—designed to match your home perfectly.",
    image: "/Assets/card1-trust.png",
  },
  {
    id: 2,
    title: "Premium eco-friendly",
    highlight: "paints",
    description: "Low-VOC, non-toxic paints tested for long-lasting finishes and safe for kids and pets.",
    image: "/Assets/myth62340277_46978_A_modern_and_minimalist_living_room_with_bei_cd304044-6f5d-43ee-a38b-519f4a16a63d.png",
  },
  {
    id: 3,
    title: "Recommended by",
    highlight: "design experts",
    description: "Professional advice and curated palettes to help you choose the right paints for lasting beauty.",
    image: "/Assets/piotrekf_A_minimalistic_Scandinavian-style_interior_with_soft_n_89b15a3a-fb0e-4751-a060-037b2ec6493f.png",
  },
  {
    id: 4,
    title: "Certified & trusted",
    highlight: "delivery",
    description: "Paints are dispatched fresh from our certified facilities with reliable, trackable shipping to your door.",
    image: "/Assets/mastergrain_73120_Modern_luxury_home_entrance_in_soft_diffused__9014453c-84fd-49cb-ae8f-9a8ed9477c63.png",
  },
];

const WhyTrustUs = () => {
  return (
    <section className="relative bg-[#F6F3EE] py-20 font-poppins md:py-24 lg:py-32 overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B007D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[32px] font-bold text-[#0F1221] md:text-[40px] lg:text-[48px] leading-tight tracking-[-0.01em]">
            Quality You Can <span className="text-[#4B007D]">Trust</span>,<br />
            Colors You'll <span className="text-[#D4AF37]">Love</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-[#0F1221]/70 leading-relaxed max-w-2xl mx-auto">
            Discover why thousands choose CALYCO for premium paints that transform spaces with lasting beauty.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:gap-10"
        >
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex h-full flex-col rounded-[24px] bg-white border border-[#0F1221]/10 shadow-[0_8px_32px_rgba(15,18,33,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_16px_64px_rgba(75,0,125,0.15)] hover:-translate-y-2"
            >
              {/* Card Image */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.highlight} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  loading="lazy" 
                />
                {/* Purple Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4B007D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Card Content */}
              <div className="flex flex-col flex-1 p-8 md:p-10 text-center">
                <h3 className="text-[28px] md:text-[32px] font-bold text-[#0F1221] leading-tight tracking-[-0.01em]">
                  {card.title}
                </h3>
                <h3 className="mt-1 text-[28px] md:text-[32px] font-bold text-[#4B007D] leading-tight tracking-[-0.01em]">
                  {card.highlight}
                </h3>
                <p className="mt-5 text-sm md:text-base text-[#0F1221]/70 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center text-xs leading-relaxed text-[#0F1221]/50 max-w-4xl mx-auto"
        >
          CALYCO Paints products are formulated to meet strict industry standards for safety, durability, and performance.
          Always review product specifications and consult a professional for correct application.
        </motion.p>
      </div>
    </section>
  );
};

export default WhyTrustUs;

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    id: 1,
    title: "Colors that fit",
    highlight: "your lifestyle",
    description: "Personalised shade recommendations for every room and style—designed to match your home perfectly.",
    ctaLabel: "Explore Colors",
    ctaHref: "/colors",
    image: "/Assets/card1-trust.png",
  },
  {
    id: 2,
    title: "Premium eco-friendly",
    highlight: "paints",
    description: "Low-VOC, non-toxic paints tested for long-lasting finishes and safe for kids and pets.",
    ctaLabel: "View Paint Range",
    ctaHref: "/products",
    image: "/Assets/myth62340277_46978_A_modern_and_minimalist_living_room_with_bei_cd304044-6f5d-43ee-a38b-519f4a16a63d.png",
  },
  {
    id: 3,
    title: "Recommended by",
    highlight: "design experts",
    description: "Professional advice and curated palettes to help you choose the right paints for lasting beauty.",
    ctaLabel: "Get Expert Advice",
    ctaHref: "/about",
    image: "/Assets/piotrekf_A_minimalistic_Scandinavian-style_interior_with_soft_n_89b15a3a-fb0e-4751-a060-037b2ec6493f.png",
  },
  {
    id: 4,
    title: "Certified & trusted",
    highlight: "delivery",
    description: "Paints are dispatched fresh from our certified facilities with reliable, trackable shipping to your door.",
    ctaLabel: "Shop Now",
    ctaHref: "/products",
    image: "/Assets/mastergrain_73120_Modern_luxury_home_entrance_in_soft_diffused__9014453c-84fd-49cb-ae8f-9a8ed9477c63.png",
  },
];

const WhyTrustUs = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 font-poppins md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">Quality you can trust,</h2>
          <p className="mt-2 text-2xl font-semibold text-[#C6843A] md:text-3xl">Colors you’ll love</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-12 grid gap-8 md:grid-cols-2"
        >
          {cards.map((card) => (
            <article
              key={card.id}
              className="flex h-full flex-col gap-6 rounded-[28px] bg-[#F6F0E9] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-10"
            >
              <div className="text-center">
                <h3 className="text-3xl font-semibold text-gray-900 md:text-4xl">{card.title}</h3>
                <h3 className="mt-1 text-3xl font-semibold text-[#C6843A] md:text-4xl">{card.highlight}</h3>
                <p className="mt-4 text-sm text-gray-600 md:text-base">{card.description}</p>
                <button
                  onClick={() => navigate(card.ctaHref)}
                  className="mt-5 inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
                >
                  {card.ctaLabel}
                </button>
              </div>
              <div className="mt-auto overflow-hidden rounded-2xl border border-white/80 shadow-md">
                <img src={card.image} alt={card.highlight} className="h-full w-full object-cover" loading="lazy" />
              </div>
            </article>
          ))}
        </motion.div>

        <p className="mt-12 text-center text-xs leading-relaxed text-gray-500">
          CALYCO Paints products are formulated to meet strict industry standards for safety, durability, and performance.
          Always review product specifications and consult a professional for correct application.
        </p>
      </div>
    </section>
  );
};

export default WhyTrustUs;


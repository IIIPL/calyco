import React from "react";
import { Link } from "react-router-dom";

type Card = {
  id: number;
  title: string;
  highlight: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

const colorSwatches: { hex: string; label: string }[] = [
  { hex: "#4B007D", label: "Purple" },
  { hex: "#D4AF37", label: "Gold" },
  { hex: "#805AD5", label: "Lavender" },
  { hex: "#68D391", label: "Sage" },
  { hex: "#C53030", label: "Barn Red" },
];

const cards: Card[] = [
  {
    id: 1,
    title: "Moving in the",
    highlight: "right direction",
    body: "Get a personalised plan designed with one goal in mind: helping you feel great in your space with palettes curated for every lifestyle.",
    ctaLabel: "Explore products",
    ctaHref: "/products",
    image: "/Assets/InteriorInspiratoin/header-inspiration-bathroom-c-mobile.jpg",
  },
  {
    id: 2,
    title: "Paint smarter,",
    highlight: "last longer",
    body: "Choose premium, durable paints in the CALYCO range to protect and enhance every surface with minimal upkeep.",
    ctaLabel: "Get started",
    ctaHref: "/colors",
    image: "/Assets/InteriorInspiratoin/header-inspiration-bedroom-b-mobile.jpg",
  },
  {
    id: 3,
    title: "Expert colour",
    highlight: "guidance on call",
    body: "Book a consultation with CALYCO specialists for room-by-room advice, specification support, and on-site application tips.",
    ctaLabel: "Book a consult",
    ctaHref: "/contact",
    image: "/Assets/InteriorInspiratoin/living-room.png",
  },
];

export default function HowItWorks(): JSX.Element {
  return (
    <section className="relative isolate overflow-hidden bg-[#F6F3EE] py-20 md:py-24 lg:py-32">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B007D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Header Section - Image Left, Content Right */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          {/* Image on Left */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="rounded-[24px] border border-[#0F1221]/10 bg-white p-4 shadow-[0_24px_80px_rgba(75,0,125,0.12)]">
              <img
                src="/Assets/painter-how-it-works.webp"
                alt="Professional painter applying colour"
                loading="lazy"
                className="h-[320px] w-full rounded-[20px] object-cover md:h-[400px] lg:h-[520px]"
              />
            </div>
          </div>

          {/* Content on Right */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <h2 className="font-poppins text-[#0F1221] text-[32px] font-bold leading-tight tracking-[-0.01em] md:text-[40px] lg:text-[48px] mb-6">
              Access a Range of{" "}
              <span className="text-[#4B007D]">Eco-Premium Paints</span> & Coatings
            </h2>
            <p className="font-poppins text-base md:text-lg text-[#0F1221]/70 leading-relaxed mb-8">
              Low-VOC, high performance chemistry engineered for Indian climates. Choose palettes curated by designers and tested by professionals.
            </p>
            
            {/* Color Swatches */}
            <div className="flex items-end gap-3 mb-8">
              {colorSwatches.map((swatch, index) => (
                <div
                  key={swatch.hex}
                  className="transition-transform hover:scale-110 hover:-translate-y-2 duration-300"
                  style={{ 
                    height: index === 2 ? '80px' : '64px',
                    width: '48px',
                    backgroundColor: swatch.hex,
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(75, 0, 125, 0.15)'
                  }}
                  aria-label={swatch.label}
                />
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 font-poppins">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#4B007D] px-8 py-3.5 text-base font-semibold text-white shadow-[0_8px_32px_rgba(75,0,125,0.25)] transition hover:bg-[#3d0066] hover:shadow-[0_12px_48px_rgba(75,0,125,0.35)] hover:-translate-y-0.5"
              >
                Explore Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/colors"
                className="inline-flex items-center justify-center gap-2 rounded-[12px] border-2 border-[#4B007D] px-8 py-3.5 text-base font-semibold text-[#4B007D] transition hover:bg-[#4B007D] hover:text-white hover:-translate-y-0.5"
              >
                Try Color Visualizer
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Cards Grid - Original 3-column layout */}
        <div className="grid gap-8 lg:gap-10 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.id}
              className="group flex h-full flex-col gap-6 rounded-[24px] border border-[#0F1221]/10 bg-white p-8 shadow-[0_8px_32px_rgba(15,18,33,0.08)] transition-all duration-300 hover:shadow-[0_16px_64px_rgba(75,0,125,0.15)] hover:-translate-y-1 md:p-10"
            >
              {/* Card Image */}
              <div className="relative h-56 overflow-hidden rounded-[16px] border border-[#0F1221]/10">
                <img 
                  src={card.image} 
                  alt={card.highlight} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  loading="lazy" 
                />
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4B007D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Content */}
              <div className="flex-1">
                <h3 className="font-poppins text-[28px] md:text-[32px] font-semibold leading-tight tracking-[-0.01em] text-[#0F1221]">
                  {card.title}{" "}
                  <span className="block text-[#4B007D] mt-1">{card.highlight}</span>
                </h3>
                <p className="mt-4 font-poppins text-sm leading-relaxed text-[#0F1221]/70 md:text-base">
                  {card.body}
                </p>
              </div>

              {/* CTA */}
              <div>
                <Link
                  to={card.ctaHref}
                  className="inline-flex items-center gap-2 rounded-[12px] bg-[#4B007D]/5 px-5 py-3 text-sm font-semibold text-[#4B007D] border border-[#4B007D]/20 transition-all duration-300 hover:bg-[#4B007D] hover:text-white hover:border-[#4B007D] group/btn"
                >
                  {card.ctaLabel}
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                  >
                    <path 
                      d="M7 17 17 7m0 0H9m8 0v8" 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

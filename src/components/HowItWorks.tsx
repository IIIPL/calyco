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
  { hex: "#B58A3C", label: "Ochre" },
  { hex: "#6E89F6", label: "Azure" },
  { hex: "#E2C884", label: "Saffron" },
  { hex: "#D9B16C", label: "Maple" },
  { hex: "#8C6239", label: "Walnut" },
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
    ctaHref: "/products",
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
    <section
      className="relative isolate overflow-hidden text-white"
      style={
        {
          "--bg1": "#B77D34",
          "--bg2": "#A86F2E",
          "--bg3": "#8F5A23",
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_-80px,rgba(255,255,255,0.14),transparent_60%),linear-gradient(to_bottom,var(--bg1),var(--bg2),var(--bg3))]" />

      <svg className="pointer-events-none absolute left-0 top-[132px] w-full" viewBox="0 0 1728 120" fill="none">
        <path d="M0 60 C320 10 560 110 864 60 C1168 10 1408 110 1728 60" stroke="rgba(255,220,170,.5)" strokeWidth="2" />
        {Array.from({ length: 14 }).map((_, index) => (
          <circle key={index} cx={(index + 1) * 118} cy={60 + (index % 2 ? 8 : -8)} r="2.2" fill="rgba(255,220,170,.85)" />
        ))}
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 pt-16 md:pt-20 lg:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-poppins text-white/95 text-[36px] font-semibold leading-tight tracking-[-0.01em] md:text-[48px]">
            <span className="block">Access a range of</span>
            eco-premium paints & coatings
          </h1>
          <p className="mt-4 font-poppins text-sm text-white/80 md:text-base">
            Low-VOC, high performance chemistry engineered for Indian climates. Choose palettes curated by designers and tested by professionals.
          </p>
          <div className="mt-6 flex items-end justify-center gap-4">
            {colorSwatches.map((swatch) => (
              <div
                key={swatch.hex}
                className="h-16 w-9 rounded-xl shadow-[0_10px_26px_rgba(0,0,0,0.25)]"
                style={{ backgroundColor: swatch.hex }}
                aria-label={swatch.label}
              />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 font-poppins sm:flex-row">
            <Link
              to="/products"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#6B431C] shadow-lg transition hover:bg-[#F2E6D8]"
            >
              Explore Products
            </Link>
            <Link
              to="/colors"
              className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-white/10"
            >
              Try Color Visualizer
            </Link>
          </div>
          <div className="mt-10 rounded-[28px] border border-white/20 bg-white/10 p-3 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            <img
              src="/Assets/painter-how-it-works.webp"
              alt="Professional painter applying colour"
              loading="lazy"
              className="h-[320px] w-full rounded-[24px] object-cover md:h-[380px]"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 md:pb-24">
        <div className="grid gap-8 lg:gap-10 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.id}
              className="flex h-full flex-col gap-6 rounded-[28px] border border-white/15 bg-white/10 p-8 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] backdrop-blur-[2px] md:p-10"
            >
              <div>
                <h3 className="font-poppins text-[32px] font-semibold leading-[1.08] tracking-[-0.01em] md:text-[36px]">
                  {card.title}
                  <span className="block text-[#F4C372]">{card.highlight}</span>
                </h3>
                <p className="mt-4 font-poppins text-sm leading-6 text-white/85 md:text-base">{card.body}</p>
              </div>
              <div className="h-52 overflow-hidden rounded-2xl border border-white/20 shadow-[0_30px_60px_-35px_rgba(0,0,0,0.7)]">
                <img src={card.image} alt={card.highlight} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div>
                <Link
                  to={card.ctaHref}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white hover:text-[#6B431C]"
                >
                  {card.ctaLabel}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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


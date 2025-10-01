import React from "react";
import {
  SparklesIcon,
  ArrowPathIcon,
  HandThumbUpIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const heroImage = "/Assets/assets_task_01k3h8ndhef0v9as4ksr6636ap_1756147620_img_0.webp";

const principles = [
  {
    title: "Low-VOC Formulas",
    description:
      "Calyco reformulates every blend to stay significantly below global limits for Volatile Organic Compounds. Water-based chemistry and purified pigments keep indoor air crisp from day one, protecting families, designers, and professional applicators alike.",
    Icon: SparklesIcon,
    accent: "bg-[#FFF5BF]",
  },
  {
    title: "Waste Reduction",
    description:
      "Smart coverage calculators, made-to-order tinting, and refill-friendly pack sizes mean you receive exactly what the project demands. Recycled and recyclable packaging plus disposal coaching on every invoice keep surplus paint out of landfills.",
    Icon: ArrowPathIcon,
    accent: "bg-[#FFF1B8]",
  },
  {
    title: "Ethical Sourcing",
    description:
      "We audit raw material partners for transparency, fair labour, and reduced transport miles. Every pigment and resin is tracked from extraction to application so specifiers can document sustainability with confidence.",
    Icon: HandThumbUpIcon,
    accent: "bg-[#FFEAA0]",
  },
  {
    title: "Product Longevity",
    description:
      "High-build resins, scrub-resistant finishes, and UV-stable pigments extend repaint cycles. Better durability means fewer site visits, less embodied carbon, and enduring beauty for every Calyco space.",
    Icon: ShieldCheckIcon,
    accent: "bg-[#FFE38C]",
  },
];

const certificationHighlights = [
  "Third-party verified low VOC",
  "Virtually odorless application",
  "Approved for sensitive spaces",
];

export default function EnvironmentalSustainability() {
  return (
    <main className="bg-white text-[#1F1F1F]">
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-3 text-xs md:text-sm tracking-[0.35em] uppercase text-[#6C6C6C]">
                <span className="h-px w-10 bg-[#FFD700]" aria-hidden="true" />
                Calyco Policies
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[#1C1C1C]">
                Environmental & Sustainability
              </h1>
              <p className="text-lg md:text-xl text-[#2F2F2F]">
                Eco-Premium Paints. Performance without Compromise.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-[#3F3F3F]">
                At Calyco, sustainability is foundational, not an afterthought. We're committed to minimizing our environmental footprint while delivering the highest quality, low-VOC paints that contribute to healthier homes and a healthier planet.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-8 h-32 w-32 rounded-full border border-[#FFD700] opacity-30" aria-hidden="true" />
              <div className="absolute -bottom-10 -right-6 h-28 w-28 rounded-full bg-[#FFF3B0] blur-2xl opacity-70" aria-hidden="true" />
              <div className="relative z-10 overflow-hidden rounded-[36px] border border-[#F0F0F0] bg-white shadow-[0_30px_60px_rgba(17,17,17,0.08)]">
                <img
                  src={heroImage}
                  alt="A serene, eco-conscious Calyco interior showcasing sustainable finishes"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1F1F1F]">Our Green Promise</h2>
            <p className="mt-4 text-base md:text-lg text-[#464646] leading-relaxed">
              Every Calyco finish is engineered to balance circular design principles with the premium performance designers demand. These four pillars guide every formulation and every project consultation we deliver.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {principles.map((principle) => {
              const Icon = principle.Icon;
              return (
                <article
                  key={principle.title}
                  className="group relative overflow-hidden rounded-[28px] border border-[#F0F0F0] bg-white p-8 shadow-[0_20px_50px_rgba(23,23,23,0.08)] transition-shadow duration-200 hover:shadow-[0_28px_60px_rgba(17,17,17,0.12)]"
                >
                  <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-[#FFD700]" aria-hidden="true" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-full ${principle.accent}`}>
                        <Icon className="h-7 w-7 text-[#866A00]" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#1D1D1D]">{principle.title}</h3>
                    </div>
                    <p className="mt-5 text-sm md:text-base leading-relaxed text-[#3F3F3F]">
                      {principle.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAF9] py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="relative overflow-hidden rounded-[36px] border border-[#F0F0F0] bg-white px-8 py-12 md:px-12 md:py-16 shadow-[0_30px_60px_rgba(19,19,19,0.08)]">
            <div className="absolute -top-3 left-16 h-1 w-24 bg-[#FFD700]" aria-hidden="true" />
            <div className="absolute -bottom-8 -right-10 h-32 w-32 rounded-full bg-[#FFF0A8] blur-3xl opacity-60" aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1F1F1F]">
                Certifiably Better: Our Low-VOC Standard
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-[#3C3C3C]">
                Our paints meet rigorous international standards for low-VOC content, making them suitable for sensitive environments like schools and hospitals. We believe beautiful colors shouldn't come at the expense of air quality. Our commitment ensures that every can of Calyco paint is virtually odorless and free from harmful toxins.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {certificationHighlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="inline-flex items-center gap-2 rounded-full border border-[#FFE590] bg-[#FFF9DC] px-4 py-2 text-xs md:text-sm font-medium text-[#5C4A00]"
                  >
                    <span className="block h-2 w-2 rounded-full bg-[#FFD700]" aria-hidden="true" />
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative order-2 overflow-hidden rounded-[32px] border border-[#F0F0F0] bg-white shadow-[0_26px_60px_rgba(17,17,17,0.08)] lg:order-1">
              <img
                src="/Assets/painter-how-it-works.webp"
                alt="Eco-conscious paint packaging prepared for recycling"
                className="w-full object-cover"
              />
              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-[#5C4A00] shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#FFD700]" aria-hidden="true" />
                Circular by design
              </div>
            </div>
            <div className="order-1 space-y-6 lg:order-2">
              <span className="inline-flex items-center gap-3 text-xs md:text-sm tracking-[0.28em] uppercase text-[#6C6C6C]">
                <span className="h-px w-10 bg-[#FFD700]" aria-hidden="true" />
                Circular Economy
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1F1F1F]">
                Closing the Loop: Packaging & Recycling
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-[#3F3F3F]">
                Calyco paint cans are made from 100% post-consumer recycled steel or HDPE and designed for curbside recycling. Clear guidance accompanies every order so customers can quickly rinse, reseal, and return empties to local programs.
              </p>
              <ul className="space-y-4 text-sm md:text-base leading-relaxed text-[#3F3F3F]">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#FFD700]" aria-hidden="true" />
                  Rinse cans with minimal water, allow to dry, and drop them at metal or plastic recycling streams according to your municipality's guidance.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#FFD700]" aria-hidden="true" />
                  Keep leftover paint sealed and label the shade; our advisors can help you donate usable volumes to community projects.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#FFD700]" aria-hidden="true" />
                  For dried paint skins or applicators, follow our waste segregation checklist to ensure safe, compliant disposal.
                </li>
              </ul>
              <div className="rounded-3xl border border-[#FFE48A] bg-[#FFFBEB] px-6 py-5 text-sm md:text-base text-[#5C4A00]">
                Need support? Our sustainability concierge can coordinate pick-ups with certified recycling partners and provide documentation for your ESG reporting.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";

const sustainabilityPrinciples = [
  {
    title: "Low-VOC Formulations",
    details: "Every CALYCO paint is formulated to stay significantly below global VOC limits. Water-based chemistry and purified pigments ensure indoor air quality from day one, protecting families and professional applicators.",
  },
  {
    title: "Waste Reduction",
    details: "Smart coverage calculators, made-to-order tinting, and refill-friendly pack sizes mean you receive exactly what your project demands. Recycled packaging keeps surplus paint out of landfills.",
  },
  {
    title: "Ethical Sourcing",
    details: "We audit raw material partners for transparency, fair labor practices, and reduced transport miles. Every pigment and resin is tracked from extraction to application.",
  },
  {
    title: "Product Longevity",
    details: "High-build resins, scrub-resistant finishes, and UV-stable pigments extend repaint cycles. Better durability means fewer site visits, less embodied carbon, and enduring beauty.",
  },
];

const environmentalImpact = [
  {
    title: "Carbon Footprint Reduction",
    details: "Optimized manufacturing processes, local sourcing where possible, and energy-efficient production facilities reduce our carbon emissions by 30% compared to industry averages.",
  },
  {
    title: "Water Conservation",
    details: "Closed-loop water recycling systems in our production facilities minimize water waste. We've reduced water consumption by 40% over the past three years.",
  },
  {
    title: "Renewable Energy",
    details: "Our manufacturing facilities use 50% renewable energy from solar installations, with a goal of 100% renewable energy by 2027.",
  },
  {
    title: "Zero Liquid Discharge",
    details: "Advanced wastewater treatment ensures zero liquid discharge from our facilities, protecting local water ecosystems and communities.",
  },
];

const packagingInitiatives = [
  "100% post-consumer recycled steel or HDPE paint cans",
  "Recyclable and biodegradable protective packaging materials",
  "Minimal use of plastic wrapping and non-recyclable materials",
  "Clear recycling instructions on every product label",
  "Refillable container programs for commercial customers",
  "Reduced packaging sizes to minimize waste",
];

const certifications = [
  { title: "Green Building Compliance", details: "CALYCO paints meet IGBC and LEED requirements for low-VOC content, contributing to green building certification points." },
  { title: "ISO 14001 Certified", details: "Environmental Management System certification ensuring continuous improvement in environmental performance and compliance." },
  { title: "Third-Party VOC Testing", details: "Independent laboratory verification of VOC levels, ensuring our products meet or exceed international standards." },
  { title: "Safety & Health Standards", details: "Compliance with WHO indoor air quality guidelines and Indian safety regulations for paint manufacturing and application." },
];

const recyclingGuidelines = [
  { step: "Empty Cans", instruction: "Rinse cans with minimal water, allow to dry completely, and drop at metal or plastic recycling centers according to local guidelines." },
  { step: "Leftover Paint", instruction: "Keep usable paint sealed and labeled with shade details. Contact us to donate surplus paint to community projects or schools." },
  { step: "Dried Paint", instruction: "Follow our waste segregation checklist to ensure safe, compliant disposal of dried paint skins and contaminated materials." },
  { step: "Applicators", instruction: "Clean brushes and rollers thoroughly. Reusable tools extend lifespan; dispose of worn materials at designated waste facilities." },
];

const sustainabilityGoals = [
  { year: "2025", goal: "Achieve 50% renewable energy in all manufacturing facilities" },
  { year: "2026", goal: "Launch nationwide paint can recycling program with collection points" },
  { year: "2027", goal: "Transition to 100% renewable energy across all operations" },
  { year: "2030", goal: "Achieve carbon-neutral manufacturing and distribution" },
];

export default function EnvironmentalSustainability() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionPad = "py-10 md:py-12";
  const sectionPadTight = "py-7 md:py-9";

  return (
    <div className="min-h-screen bg-white text-[#0F1221] font-poppins">
      <SEO
        title="Environmental & Sustainability Policy | CALYCO Paints"
        description="Learn about CALYCO's commitment to sustainability through low-VOC formulations, waste reduction, ethical sourcing, and circular economy practices."
        ogType="website"
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-20 pb-12 bg-[#0F1221]">
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.png"
              alt="Eco-conscious CALYCO sustainable interior"
              className="h-full w-full object-cover brightness-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/25" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 py-14 text-center">
            <h1 className="text-4xl font-semibold text-white leading-tight md:text-5xl">
              Eco-Premium Paints Without Compromise
            </h1>
          </div>
        </section>

        {/* Introduction */}
        <section className={`${sectionPad} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-3 text-[#0F1221]">Our Environmental Commitment</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-[#23263a] mb-1">
            At CALYCO, we believe that premium quality and environmental responsibility go hand in hand. Our eco-premium paints are engineered to deliver exceptional performance while minimizing environmental impact at every stage—from raw material sourcing to manufacturing, packaging, application, and disposal.
          </p>
          <p className="text-base max-w-3xl mx-auto text-[#23263a] mb-1">
            We're not just meeting environmental standards—we're setting them. Our commitment to sustainability is embedded in our formulations, operations, and long-term vision for a greener future.
          </p>
          <p className="text-base max-w-3xl mx-auto text-[#23263a]">
            This policy outlines our sustainability principles, environmental impact reduction strategies, certifications, recycling programs, and future goals.
          </p>
        </section>

        {/* Four Pillars */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Four Pillars of Sustainability</h2>
          <p className="text-lg text-[#23263a] mb-6">
            Every CALYCO formulation and project consultation is guided by these four foundational sustainability principles.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {sustainabilityPrinciples.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0F1221]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Low-VOC Standard */}
        <section className={`${sectionPadTight} bg-white max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Certifiably Better: Our Low-VOC Standard</h2>
          <p className="text-lg text-[#23263a] mb-6">
            Our paints meet rigorous international standards for low-VOC content, making them safe for sensitive environments like homes, schools, and hospitals.
          </p>
          <div className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#0F1221] mb-3">VOC Compliance Highlights</h3>
            <ul className="space-y-3 text-base text-[#23263a]">
              <li><span className="text-[#D4AF37] mr-3 mt-1">✓</span><strong>VOC Levels:</strong> Less than 50 g/L for premium interior paints, less than 100 g/L for exterior paints</li>
              <li><span className="text-[#D4AF37] mr-3 mt-1">✓</span><strong>Third-Party Verified:</strong> Independent lab testing confirms compliance with international VOC standards</li>
              <li><span className="text-[#D4AF37] mr-3 mt-1">✓</span><strong>Virtually Odorless:</strong> Minimal paint smell during and after application for comfortable living spaces</li>
              <li><span className="text-[#D4AF37] mr-3 mt-1">✓</span><strong>Safe for Sensitive Spaces:</strong> Approved for use in children's rooms, hospitals, and educational facilities</li>
              <li><span className="text-[#D4AF37] mr-3 mt-1">✓</span><strong>No Harmful Toxins:</strong> Free from lead, mercury, heavy metals, and carcinogenic compounds</li>
            </ul>
          </div>
        </section>

        {/* Environmental Impact */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Reducing Our Environmental Footprint</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {environmentalImpact.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0F1221]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packaging & Recycling */}
        <section className={`${sectionPadTight} bg-white max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Circular Economy: Packaging & Recycling</h2>
          <p className="text-lg text-[#23263a] mb-6">
            CALYCO paint cans are designed for circularity—made from recycled materials and fully recyclable after use.
          </p>
          <div className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-8 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-[#0F1221] mb-3">Our Packaging Initiatives</h3>
            <ul className="space-y-2 text-base text-[#23263a]">
              {packagingInitiatives.map((initiative) => (
                <li key={initiative} className="flex items-start">
                  <span className="text-[#D4AF37] mr-3 mt-1">•</span>{initiative}
                </li>
              ))}
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-[#0F1221] mb-4">Recycling Guidelines</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {recyclingGuidelines.map((item) => (
              <div key={item.step} className="rounded-xl bg-white border border-[#0F1221]/10 p-6 shadow-sm">
                <h4 className="text-base font-semibold text-[#0F1221] mb-2">{item.step}</h4>
                <p className="text-sm text-[#23263a]">{item.instruction}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border-2 border-[#D4AF37]/30 bg-white p-6 shadow-sm">
            <p className="text-sm text-[#23263a]"><strong className="text-[#0F1221]">Need Support?</strong> Our sustainability team can coordinate pick-ups with certified recycling partners and provide documentation for your ESG reporting. Contact us for assistance.</p>
          </div>
        </section>

        {/* Certifications */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Certifications & Compliance</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0F1221]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Future Goals */}
        <section className={`${sectionPadTight} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Our Sustainability Roadmap</h2>
          <p className="text-lg text-[#23263a] mb-5">
            We're committed to continuous improvement. Here are our environmental targets for the coming years:
          </p>
          <div className="space-y-4">
            {sustainabilityGoals.map((item) => (
              <div key={item.year} className="rounded-xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F1221] text-white font-bold text-lg">
                    {item.year}
                  </div>
                </div>
                <p className="text-base text-[#23263a]">{item.goal}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Questions About Sustainability?</h2>
          <p className="text-lg text-[#23263a] mb-6">
            Our sustainability team is here to answer your questions about our environmental practices, certifications, and recycling programs.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Email</h3>
              <a href="mailto:sustainability@calycopaints.com" className="text-sm text-[#23263a] hover:text-[#D4AF37] underline">
                sustainability@calycopaints.com
              </a>
            </div>
            <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Phone</h3>
              <p className="text-sm text-[#23263a]">
                Sustainability Team: <a href="tel:+919145000500" className="hover:text-[#D4AF37] font-semibold">+91 9145 000 500</a>
              </p>
              <p className="text-xs text-[#23263a]/80 mt-2">Monday - Saturday: 9:00 AM - 6:00 PM IST</p>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-14 bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12 text-center">
          <p className="text-sm text-[#23263a]/80 mb-1">
            CALYCO's environmental and sustainability practices are continually evolving based on emerging technologies, regulations, and best practices.
          </p>
          <p className="text-xs text-[#23263a]/70">
            We welcome feedback and suggestions from customers, partners, and environmental advocates to improve our sustainability initiatives.
          </p>
          <p className="mt-3 text-sm text-[#0F1221] font-semibold">
            Effective date: 20 August 2025
          </p>
        </section>
      </main>
    </div>
  );
}

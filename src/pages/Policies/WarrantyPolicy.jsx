import React from "react";
import { Link } from "react-router-dom";

const Page = ({ children }) => (
  <main className="bg-white text-[#0b0b0b]">{children}</main>
);

const Hero = () => (
  <section className="relative isolate">
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <img
        src="/Assets/InteriorInspiratoin/living-room.png"
        alt="Modern interior with CALYCO paint"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1C24]/80 via-[#1A1C24]/60 to-transparent" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">Warranty Policy</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">Trust in Every Coat. Learn what’s covered, conditions for validity, and how to make a claim.</p>
            <Link to="/products" className="inline-flex items-center gap-3 bg-white text-[#1A1C24] font-semibold px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-white/30 transition-all duration-500 transform hover:-translate-y-1">Shop CALYCO Paints</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Section = ({ title, subtitle, children, grey = false }) => (
  <section className={grey ? "bg-[#f7f7f7]" : "bg-white"}>
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <header className="mb-6 md:mb-8">
        <h2 className="text-2xl font-semibold text-black md:text-3xl">{title}</h2>
        {subtitle && (
          <p className="mt-2 max-w-[60ch] text-[15px] leading-7 text-neutral-600">{subtitle}</p>
        )}
      </header>
      {children}
    </div>
  </section>
);

const Card = ({ icon, title, children }) => (
  <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-700">{icon}</span>
      <h3 className="text-lg font-medium text-black">{title}</h3>
    </div>
    <div className="text-[15px] leading-7 text-neutral-700">{children}</div>
  </div>
);

const Step = ({ step, title, children }) => (
  <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
    <div className="mb-2 text-xs tracking-widest text-neutral-500">STEP {step}</div>
    <h3 className="text-lg font-medium text-black">{title}</h3>
    <div className="mt-2 text-[15px] leading-7 text-neutral-700">{children}</div>
  </div>
);

const CTA = () => (
  <div className="sticky bottom-4 z-10 mx-auto mt-10 flex max-w-6xl justify-end px-6 md:static md:mt-0 md:px-6">
    <Link
      to="/products"
      className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black hover:ring-1 hover:ring-black"
    >
      Shop CALYCO Paints
    </Link>
  </div>
);

export default function WarrantyPolicy() {
  return (
    <Page>
      <Hero />

      <Section title="Coverage" subtitle="Manufacturing defects; what’s included/excluded." grey>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card icon={<span aria-hidden>⬛</span>} title="Manufacturing Defects">
            Covers defects arising from manufacturing processes that affect performance or appearance under normal use.
          </Card>
          <Card icon={<span aria-hidden>⬜</span>} title="What’s Included">
            Peeling, flaking, blistering, or premature fading when applied as per CALYCO system guidelines.
          </Card>
          <Card icon={<span aria-hidden>▭</span>} title="What’s Excluded">
            Surface movement, water ingress, structural cracks, contamination, mishandling, or non-recommended usage.
          </Card>
        </div>
      </Section>

      <Section title="Conditions" subtitle="Correct surface prep, recommended system, storage & application.">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Step step={1} title="Surface Preparation">
            Substrates must be clean, dry, sound, and free from dust, oil, salts, algae, or loose material prior to application.
          </Step>
          <Step step={2} title="Recommended System">
            Use the specified CALYCO primer, putty, and topcoat system for the surface and environment.
          </Step>
          <Step step={3} title="Application & Storage">
            Follow label TDS for thinning, coverage, recoat intervals, and storage between 10–35°C away from direct sun.
          </Step>
          <Step step={4} title="Maintenance">
            Allow full cure before cleaning. Use mild detergents; avoid abrasive tools that can damage the film.
          </Step>
        </div>
      </Section>

      <Section title="Claims" subtitle="Inspection, documentation, remedy (repair/replace/credit)." grey>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card icon={<span aria-hidden>○</span>} title="Inspection & Documentation">
            Share order details, batch numbers, photographs/videos, and a brief description. Our technical team may inspect the site.
          </Card>
          <Card icon={<span aria-hidden>◇</span>} title="Remedy">
            Upon validation, CALYCO may repair, replace, or offer store credit for the affected product as appropriate.
          </Card>
        </div>
      </Section>

      <Section title="Questions?" subtitle="We’re here to help with any warranty queries.">
        <CTA />
      </Section>
    </Page>
  );
}

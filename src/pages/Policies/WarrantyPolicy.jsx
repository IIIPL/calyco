import React from "react";
import { getTypographyClasses, getButtonClasses } from "../../data/admin/typography";

const TONE_MAP = {
  plum: {
    section: "bg-gradient-to-br from-[#31104d] via-[#220836] to-[#0c021b] text-white",
    title: "text-white",
    subtitle: "text-white/70",
    kicker: "text-[#f8d35e]",
    kickerBg: "bg-white/10",
    decor: (
      <>
        <div
          className="pointer-events-none absolute -left-12 top-16 h-60 w-60 rounded-full bg-[#f8d35e]/20 blur-3xl sm:-left-24 sm:h-72 sm:w-72"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 translate-x-1/3 rounded-full bg-[#7c3aed]/25 blur-3xl sm:-right-24 sm:h-80 sm:w-80"
          aria-hidden
        />
      </>
    ),
  },
  canvas: {
    section: "bg-[#fff7ec] text-[#2c0f47]",
    title: "text-[#2c0f47]",
    subtitle: "text-[#54306d]",
    kicker: "text-[#7c3aed]",
    kickerBg: "bg-[#f8d35e]/20",
  },
  lilac: {
    section: "bg-gradient-to-br from-[#e8dbff] via-[#f4ecff] to-[#fbf7ff] text-[#271245]",
    title: "text-[#271245]",
    subtitle: "text-[#4c2d74]",
    kicker: "text-[#a855f7]",
    kickerBg: "bg-white/60",
    decor: (
      <>
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#f8d35e]/30 blur-3xl sm:h-72 sm:w-72"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -right-10 h-52 w-52 rounded-full bg-[#d6bbff]/60 blur-3xl"
          aria-hidden
        />
      </>
    ),
  },
};

const Page = ({ children }) => (
  <main className="bg-[#090014] text-white antialiased">{children}</main>
);

const Hero = () => (
  <section className="relative isolate h-[75vh] sm:h-[65vh] md:h-[70vh] lg:h-[70vh] overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="/Assets/InteriorInspiratoin/living-room.png"
        alt="Modern interior with CALYCO paint"
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="pointer-events-none absolute -left-16 bottom-12 h-56 w-56 rounded-full bg-[#f8d35e]/25 blur-3xl sm:-left-24 sm:h-72 sm:w-72" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 rounded-full bg-[#8b5cf6]/30 blur-3xl sm:h-80 sm:w-80" aria-hidden />
    </div>

    <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6 md:px-10">
      <div className="max-w-3xl">
        <span className="inline-flex items-center rounded-full bg-[#f8d35e] px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-[#2b0f4a]">
          Calyco Warranty Care
        </span>
        <h1 className="mt-6 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
          Colorful confidence for every finished surface
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">
          We design coatings that last, so your spaces glow longer. Explore what is protected, how to make a claim, and the paperwork you need—all in one vibrant hub.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold uppercase text-white/80">
          <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
            <span aria-hidden>🎨</span> Premium Finishes
          </span>
          <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
            <span aria-hidden>🛡️</span> Low-VOC Commitment
          </span>
          <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
            <span aria-hidden>⚡</span> Fast Support
          </span>
        </div>
      </div>
    </div>
  </section>
);

const Section = ({ title, subtitle, children, tone = "canvas", kicker }) => {
  const toneStyles = TONE_MAP[tone] ?? TONE_MAP.canvas;

  return (
    <section className={`relative overflow-hidden ${toneStyles.section}`}>
      {toneStyles.decor ?? null}
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 md:py-24">
        <header className="mb-10 flex flex-col gap-3">
          {kicker && (
            <span className={`inline-flex max-w-max items-center gap-2 rounded-full ${toneStyles.kickerBg} px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] ${toneStyles.kicker}`}>
              {kicker}
            </span>
          )}
          <h2 className={`text-3xl font-black uppercase tracking-tight md:text-4xl ${toneStyles.title}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`max-w-3xl text-base leading-7 md:text-lg ${toneStyles.subtitle}`}>
              {subtitle}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
};

const Card = ({ icon, title, children, className = "", iconClassName = "" }) => (
  <div
    className={`group rounded-3xl border-2 border-white/10 bg-white/5 p-8 shadow-[0_24px_60px_-30px_rgba(20,0,40,0.9)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-28px_rgba(20,0,40,0.8)] ${className}`}
  >
    <div className="mb-5 flex items-center gap-4">
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold text-[#2b0f4a] ${iconClassName}`}
      >
        {icon}
      </span>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
    </div>
    <p className="text-base leading-7 text-white/80 group-hover:text-white/95">{children}</p>
  </div>
);

const documentLinks = [
  {
    name: "Premium Interior Emulsion",
    href: "/Assets/docs/premium-interior-warranty.pdf",
  },
  {
    name: "Premium Exterior Emulsion",
    href: "/Assets/docs/premium-exterior-warranty.pdf",
  },
  {
    name: "Exterior Latex Paint",
    href: "/Assets/docs/exterior-latex-warranty.pdf",
  },
  {
    name: "Interior Latex Paint",
    href: "/Assets/docs/interior-latex-warranty.pdf",
  },
  {
    name: "Waterproofing Sealer",
    href: "/Assets/docs/waterproof-sealer-warranty.pdf",
  },
];

const ContactSection = () => {
  const inputClasses = "w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder-white/60 shadow-[0_12px_25px_-18px_rgba(8,0,24,0.9)] focus:border-[#f8d35e] focus:outline-none focus:ring-2 focus:ring-[#f8d35e]/60";
  const labelClasses = "mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/70";

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#2b0f55] via-[#13042c] to-[#05000f]">
      <img
        src="/Assets/canal.health.hacks_Realistic_photo_of_a_modern_house_in_dark_gr_9200c95a-bf7d-42e8-b335-37b3695167c4.png"
        alt="Modern architectural facade with moody lighting"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#31104d]/80 via-[#140429]/90 to-[#080114]/95" />
      <div className="pointer-events-none absolute -left-12 top-8 h-56 w-56 rounded-full bg-[#f8d35e]/30 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 rounded-full bg-[#7c3aed]/35 blur-3xl" aria-hidden />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 md:flex-row md:items-center md:py-24">
        <div className="w-full md:w-5/12">
          <span className="inline-flex items-center rounded-full bg-[#f8d35e] px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#2b0f4a]">
            Talk To A Specialist
          </span>
          <h2 className="mt-6 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            Questions? Let’s Connect
          </h2>
          <p className="mt-4 text-base leading-7 text-white/80">
            Fill this quick form and one of our coating consultants will reach out with the right system, shade, and warranty details for your project.
          </p>
        </div>

        <form className="w-full rounded-[32px] bg-white/10 p-6 shadow-[0_24px_70px_-32px_rgba(8,0,24,0.8)] backdrop-blur-xl md:w-7/12 md:p-8" noValidate>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClasses} htmlFor="warranty-topic">
                How can we help you?
              </label>
              <select
                id="warranty-topic"
                className="w-full appearance-none rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-base font-semibold text-white shadow-[0_12px_25px_-18px_rgba(8,0,24,0.9)] focus:border-[#f8d35e] focus:outline-none focus:ring-2 focus:ring-[#f8d35e]/60"
                defaultValue=""
              >
                <option value="" disabled hidden className="text-neutral-500">
                  Select an option
                </option>
                <option value="product-support" className="text-neutral-900">Product support</option>
                <option value="warranty-claim" className="text-neutral-900">Warranty claim</option>
                <option value="technical-advice" className="text-neutral-900">Technical advice</option>
              </select>
            </div>

            <div>
              <label className={labelClasses} htmlFor="warranty-name">
                Name
              </label>
              <input
                id="warranty-name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses} htmlFor="warranty-email">
                Email ID
              </label>
              <input
                id="warranty-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses} htmlFor="warranty-phone">
                Phone Number
              </label>
              <input
                id="warranty-phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 90000 00000"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses} htmlFor="warranty-pincode">
                Pincode
              </label>
              <input
                id="warranty-pincode"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="Enter pincode"
                className={inputClasses}
              />
            </div>

<div className="mt-2 flex items-start gap-3 md:col-span-2">
              <input
                id="warranty-consent"
                type="checkbox"
                className="mt-1 h-5 w-5 cursor-pointer rounded border-white/40 bg-transparent accent-[#f8d35e] focus:ring-[#f8d35e]"
              />
              <label htmlFor="warranty-consent" className="text-sm leading-6 text-white/80">
                I have read and agree to the <a href="#" className="text-[#f8d35e] underline decoration-transparent transition hover:decoration-[#f8d35e]">terms &amp; conditions</a> and the <a href="#" className="text-[#f8d35e] underline decoration-transparent transition hover:decoration-[#f8d35e]">privacy policy</a>.
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#f8d35e] via-[#f3b74f] to-[#a855f7] px-6 py-4 text-base font-semibold uppercase tracking-wide text-[#2b0f4a] shadow-[0_18px_45px_-20px_rgba(248,211,94,0.9)] transition hover:shadow-[0_25px_55px_-20px_rgba(248,211,94,0.9)]"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default function WarrantyPolicy() {
  return (
    <Page>
      <Hero />

      <Section
        title="Coverage"
        subtitle="Manufacturing defects; what is included and excluded."
        tone="plum"
        kicker="Protected Coverage"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card icon="🎨" title="Manufacturing Defects" iconClassName="bg-gradient-to-br from-[#f8d35e] via-[#fce6a4] to-[#fff7d6] text-[#2b0f4a] shadow-[0_12px_30px_-20px_rgba(248,211,94,0.8)]">
            Covers defects arising from manufacturing processes that affect performance or appearance under normal use.
          </Card>
          <Card icon="🛡️" title="What is Included" iconClassName="bg-gradient-to-br from-[#f8d35e] via-[#fce6a4] to-[#fff7d6] text-[#2b0f4a] shadow-[0_12px_30px_-20px_rgba(248,211,94,0.8)]">
            Peeling, flaking, blistering, or premature fading when applied as per CALYCO system guidelines.
          </Card>
          <Card icon="⚠️" title="What is Excluded" iconClassName="bg-gradient-to-br from-[#f8d35e] via-[#fce6a4] to-[#fff7d6] text-[#2b0f4a] shadow-[0_12px_30px_-20px_rgba(248,211,94,0.8)]">
            Surface movement, water ingress, structural cracks, contamination, mishandling, or non-recommended usage.
          </Card>
        </div>
      </Section>

      <Section
        title="Warranty Documents"
        subtitle="Access the latest warranty coverage and claim guidance for our flagship systems."
        tone="canvas"
        kicker="Download Centre"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {documentLinks.map((doc) => (
            <div
              key={doc.name}
              className="flex h-full flex-col justify-between gap-6 rounded-[28px] border-2 border-[#d8c7ff] bg-white p-6 shadow-[0_18px_45px_-28px_rgba(67,19,110,0.35)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(67,19,110,0.45)]"
            >
              <div>
                <h3 className="text-xl font-semibold text-[#2c0f47]">{doc.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#4f2c6a]">
                  Download the full warranty statement and coverage checklist for this product line.
                </p>
              </div>
              <a
                href={doc.href}
                download
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#f8d35e] via-[#f3b74f] to-[#a855f7] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#2b0f4a] shadow-[0_12px_35px_-18px_rgba(248,211,94,0.7)] transition hover:shadow-[0_16px_45px_-16px_rgba(248,211,94,0.7)]"
              >
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Claims"
        subtitle="Inspection, documentation, remedy (repair, replace, or credit)."
        tone="lilac"
        kicker="Support Journey"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border-2 border-white/60 bg-white/80 p-8 shadow-[0_20px_55px_-28px_rgba(78,22,131,0.45)] backdrop-blur-md">
            <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-[#f8d35e] px-4 py-2 text-sm font-semibold text-[#2b0f4a]">
              <span aria-hidden>📝</span> Inspection &amp; Documentation
            </div>
            <p className="text-base leading-7 text-[#2c0f47]">
              Share order details, batch numbers, photographs or videos, and a brief description. Our technical team may inspect the site to validate conditions.
            </p>
          </div>
          <div className="rounded-[28px] border-2 border-white/60 bg-white/80 p-8 shadow-[0_20px_55px_-28px_rgba(78,22,131,0.45)] backdrop-blur-md">
            <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-[#a855f7] px-4 py-2 text-sm font-semibold text-white">
              <span aria-hidden>🔄</span> Remedy
            </div>
            <p className="text-base leading-7 text-[#2c0f47]">
              Upon validation, CALYCO may repair, replace, or offer store credit for the affected product as appropriate to keep your project on schedule.
            </p>
          </div>
        </div>
      </Section>

      <ContactSection />
    </Page>
  );
}

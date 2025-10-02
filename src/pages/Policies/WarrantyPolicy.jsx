import React from "react";

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
          <div className="max-w-3xl text-left">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">Warranty Policy</h1>
            <p className="text-xl leading-relaxed text-white/90 md:text-2xl">
              Trust in every coat. Learn what is covered, conditions for validity, and how to make a claim.
            </p>
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

const documentLinks = [
  {
    name: "Premium Interior Emulsion",
    href: "/assets/docs/premium-interior-warranty.pdf",
  },
  {
    name: "Exterior Weather Shield",
    href: "/assets/docs/exterior-weather-shield-warranty.pdf",
  },
  {
    name: "Wood & Metal Primer",
    href: "/assets/docs/wood-metal-primer-warranty.pdf",
  },
];

const ContactSection = () => {
  const inputClasses = "w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/60 focus:border-[#f3de79] focus:outline-none focus:ring-1 focus:ring-[#f3de79]";
  const labelClasses = "mb-2 block text-sm font-medium text-white";

  return (
    <section className="relative isolate overflow-hidden bg-[#0B0B0B]">
      <img
        src="/Assets/canal.health.hacks_Realistic_photo_of_a_modern_house_in_dark_gr_9200c95a-bf7d-42e8-b335-37b3695167c4.png"
        alt="Modern architectural facade with moody lighting"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#0B0B0B]/80" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:flex-row md:items-center">
        <div className="w-full md:w-5/12">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Questions? Let's Connect</h2>
          <p className="mt-4 text-base text-white/80">Fill the form and our expert will reach out to you.</p>
        </div>

        <form className="w-full rounded-2xl bg-white/5 p-6 backdrop-blur-sm md:w-7/12" noValidate>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClasses} htmlFor="warranty-topic">
                How can we help you?
              </label>
              <select
                id="warranty-topic"
                className="w-full appearance-none rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white focus:border-[#f3de79] focus:outline-none focus:ring-1 focus:ring-[#f3de79]"
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
                className="mt-1 h-4 w-4 cursor-pointer rounded border-white/30 bg-transparent accent-[#f3de79] focus:ring-[#f3de79]"
              />
              <label htmlFor="warranty-consent" className="text-sm text-white/80">
                I have read and agree to the <a href="#" className="text-[#f3de79] underline decoration-transparent transition hover:decoration-[#f3de79]">terms & conditions</a> and the <a href="#" className="text-[#f3de79] underline decoration-transparent transition hover:decoration-[#f3de79]">privacy policy</a>.
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#f3de79] to-[#a57f24] px-6 py-3 text-base font-semibold text-[#1A1C24] shadow-md transition hover:shadow-lg"
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

      <Section title="Coverage" subtitle="Manufacturing defects; what is included and excluded." grey>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card icon={<span aria-hidden="true">?</span>} title="Manufacturing Defects">
            Covers defects arising from manufacturing processes that affect performance or appearance under normal use.
          </Card>
          <Card icon={<span aria-hidden="true">?</span>} title="What is Included">
            Peeling, flaking, blistering, or premature fading when applied as per CALYCO system guidelines.
          </Card>
          <Card icon={<span aria-hidden="true">?</span>} title="What is Excluded">
            Surface movement, water ingress, structural cracks, contamination, mishandling, or non-recommended usage.
          </Card>
        </div>
      </Section>

      <Section
        title="Warranty Documents"
        subtitle="Access the latest warranty coverage and claim guidance for our flagship systems."
      >
        <div className="space-y-4">
          {documentLinks.map((doc) => (
            <div
              key={doc.name}
              className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="text-lg font-medium text-black">{doc.name}</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  Download the full warranty statement and coverage checklist for this product line.
                </p>
              </div>
              <a
                href={doc.href}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#f3de79] to-[#a57f24] px-6 py-2 text-sm font-semibold text-[#1A1C24] shadow-sm transition hover:shadow-md"
              >
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Claims" subtitle="Inspection, documentation, remedy (repair, replace, or credit)." grey>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card icon={<span aria-hidden="true">?</span>} title="Inspection & Documentation">
            Share order details, batch numbers, photographs or videos, and a brief description. Our technical team may inspect the site.
          </Card>
          <Card icon={<span aria-hidden="true">?</span>} title="Remedy">
            Upon validation, CALYCO may repair, replace, or offer store credit for the affected product as appropriate.
          </Card>
        </div>
      </Section>

      <ContactSection />
    </Page>
  );
}

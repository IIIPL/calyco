import React from "react";
import { Link } from "react-router-dom";

const Page = ({ children }) => (
  <main className="bg-white text-[#0b0b0b]">{children}</main>
);

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Assets/InteriorInspiratoin/living-room.png')" }}
    >
      <div className="absolute inset-0 bg-black/55" />
    </div>
    <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight tracking-wide">Privacy Policy</h1>
      <p className="text-sm text-gray-200 mb-4">Last updated —</p>
      <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light">Your Data, Our Responsibility. Learn how CALYCO collects, uses, stores, and protects information under India’s DPDP Act.</p>
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

const CTA = () => (
  <section className="py-24 bg-white text-gray-900">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h3 className="text-3xl md:text-4xl font-light mb-6 tracking-wide">Explore eco‑premium coatings</h3>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Discover colors and finishes engineered for performance and designed for modern spaces.</p>
      <Link
        to="/products"
        className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-8 py-4 text-white font-semibold hover:bg:white hover:text-gray-900 hover:ring-1 hover:ring-gray-900 transition-all duration-300"
      >
        Explore Our Products
      </Link>
    </div>
  </section>
);

export default function Privacy() {
  return (
    <Page>
      <Hero />

      <Section title="Scope" subtitle="How CALYCO collects, uses, stores and protects personal data under India's DPDP Act." grey>
        <div className="prose prose-neutral max-w-none text-[15px] leading-7 text-neutral-700">
          <p>We collect and process your personal data in accordance with applicable laws. This policy explains what data we collect, why we collect it, how we use it, and the choices you have.</p>
          <hr className="my-6 border-neutral-200" />
          <p>Our practices apply to interactions on our website, customer support channels, and order fulfillment workflows. We keep your data confidential and use it only for legitimate purposes described here.</p>
        </div>
      </Section>

      <Section title="What We Collect" subtitle="Contact details, order info, site usage.">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card icon={<span aria-hidden>✉️</span>} title="Identity & Contact">
            Name, email, phone number, billing and shipping addresses.
          </Card>
          <Card icon={<span aria-hidden>🧾</span>} title="Order & Payment">
            Order history, invoices, transaction identifiers (processed via secure payment providers).
          </Card>
          <Card icon={<span aria-hidden>🌐</span>} title="Site Usage">
            Device and analytics data like pages viewed, session info, and preferences (via cookies/SDKs).
          </Card>
          <Card icon={<span aria-hidden>🔒</span>} title="Security">
            Logs for fraud prevention, consent and preference records.
          </Card>
        </div>
      </Section>

      <Section title="Your Rights" subtitle="Access, correction, consent withdrawal, grievance." grey>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card icon={<span aria-hidden>①</span>} title="Access & Portability">
            Request a copy of your data and details of how it’s processed.
          </Card>
          <Card icon={<span aria-hidden>②</span>} title="Correction">
            Ask us to correct inaccurate or incomplete personal data.
          </Card>
          <Card icon={<span aria-hidden>③</span>} title="Withdraw Consent">
            Manage cookies/marketing consents. You may withdraw consent at any time.
          </Card>
          <Card icon={<span aria-hidden>④</span>} title="Grievance">
            Raise concerns with our Grievance Officer; we will respond within statutory timelines.
          </Card>
        </div>
      </Section>

      <CTA />
    </Page>
  );
}

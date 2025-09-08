import React from "react";
import { Link } from "react-router-dom";

const Page = ({ children }) => (
  <main className="bg-white text-[#0b0b0b]">
    {children}
  </main>
);

const Hero = () => (
  <section className="relative isolate">
    <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
      <img
        src="/Assets/InteriorInspiratoin/living-room.png"
        alt="CALYCO modern interior"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1C24]/80 via-[#1A1C24]/60 to-transparent" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">Returns & Refunds</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">Easy, Transparent, Secure. If something isn’t right, we’ll help you make it right—quickly and securely.</p>
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
        {subtitle && <p className="mt-2 max-w-[60ch] text-[15px] leading-7 text-neutral-600">{subtitle}</p>}
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

export default function ReturnsRefunds() {
  return (
    <Page>
      <Hero />

      <Section title="Eligibility" subtitle="Defects, transit damage, wrong item; made-to-order exclusions etc." grey>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card icon={<span aria-hidden>⬛</span>} title="Defective or Damaged">
            Eligible if product is damaged, leaked, or defective upon arrival. Notify us within the return window with clear photos/videos.
          </Card>
          <Card icon={<span aria-hidden>⬜</span>} title="Wrong Item Received">
            If you receive the wrong shade, finish, or quantity, we will arrange a replacement or refund after verification.
          </Card>
          <Card icon={<span aria-hidden>▭</span>} title="Exclusions">
            Made-to-order and opened/used products are not eligible unless defective. Outer packaging alone isn’t considered damage.
          </Card>
        </div>
      </Section>

      <Section title="How to Initiate" subtitle="Window, proof required, pickup/drop process.">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Step step={1} title="Request Return">
            Contact support within the specified window with your order ID and reason. Attach proof (images/videos) where applicable.
          </Step>
          <Step step={2} title="Verification & Pickup">
            Our team verifies eligibility and schedules a pickup or provides a drop-off address. Items must be securely packed.
          </Step>
          <Step step={3} title="Quality Check & Resolution">
            Once received and inspected, we process a replacement or refund as per policy. You’ll be notified by email/SMS.
          </Step>
        </div>
      </Section>

      <Section title="Refund Method" subtitle="Original payment mode timelines." grey>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card icon={<span aria-hidden>○</span>} title="Refund Timeline">
            Refunds are issued to the original payment method within 5–7 business days after quality check completion. Bank posting times may vary.
          </Card>
          <Card icon={<span aria-hidden>◇</span>} title="Shipping Fees">
            If the return is due to our error (defect/damage/wrong item), shipping charges are fully covered by CALYCO.
          </Card>
        </div>
      </Section>

      <Section title="Questions?" subtitle="We’re here to help with any return or refund queries.">
        <CTA />
      </Section>
    </Page>
  );
}

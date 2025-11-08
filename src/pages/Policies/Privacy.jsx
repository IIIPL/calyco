import React, { useEffect } from "react";
import SEO from "../../components/SEO";

const dataCollection = [
  {
    title: "Identity & Contact",
    details: "Name, email, phone, billing and shipping addresses provided during enquiries, account creation, or checkout.",
  },
  {
    title: "Order & Transaction",
    details: "Order history, invoice details, payment identifiers processed through PCI-DSS compliant gateways.",
  },
  {
    title: "Technical Data",
    details: "IP address, browser type, device identifiers, session analytics captured via cookies and SDKs.",
  },
  {
    title: "Preferences & Consent",
    details: "Marketing preferences, cookie consents, grievance records, and communication history.",
  },
];

const useOfData = [
  {
    title: "Order Fulfilment",
    details: "Processing orders, arranging delivery, managing returns, and issuing invoices.",
  },
  {
    title: "Customer Support",
    details: "Responding to enquiries, warranty claims, product feedback, and technical assistance.",
  },
  {
    title: "Marketing & Personalisation",
    details: "Sending product updates, offers, and newsletters with opt-out options available in every message.",
  },
  {
    title: "Analytics & Improvement",
    details: "Improving website performance, product experience, and security using aggregated insights.",
  },
];

const dataSharing = [
  {
    title: "Logistics & Delivery Partners",
    details: "Address and contact details shared for shipping, tracking, and proof of delivery.",
  },
  {
    title: "Payment Gateways",
    details: "Transaction processing handled by secure gateways; CALYCO never stores card or UPI credentials.",
  },
  {
    title: "Marketing Platforms",
    details: "Email automation and analytics tools process data strictly for CALYCO campaigns with confidentiality obligations.",
  },
  {
    title: "Legal Disclosures",
    details: "Information may be shared when required by law, regulation, or to protect CALYCO's rights.",
  },
];

const cookieTypes = [
  { title: "Essential", details: "Required for core functionality such as cart, checkout, and security." },
  { title: "Functional", details: "Remember preferences like language, saved addresses, or recently viewed items." },
  { title: "Analytics", details: "Measure site performance, popular content, and navigation paths to improve UX." },
  { title: "Advertising", details: "Serve relevant offers across platforms; stored only with explicit consent." },
];

const securityMeasures = [
  "HTTPS encryption across the entire site.",
  "Role-based access to personal data and secure data centres.",
  "Regular vulnerability assessments and third-party audits.",
  "Incident response plan aligned with Indian DPDP Bill requirements.",
];

const userRights = [
  { title: "Access & Portability", details: "Request a copy of your data and processing information." },
  { title: "Correction", details: "Update inaccurate or incomplete personal information stored with us." },
  { title: "Erasure", details: "Request deletion subject to legal retention obligations." },
  { title: "Opt-out & Consent", details: "Manage marketing preferences and cookie choices at any time." },
];

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Compact vertical spacing variables
  const sectionPad = "py-10 md:py-14";
  const sectionPadTight = "py-8 md:py-10";

  return (
    <div className="min-h-screen bg-white text-[#0F1221] font-poppins">
      <SEO
        title="Privacy Policy | CALYCO Paints"
        description="Understand how CALYCO collects, uses, shares, and protects personal data. Review cookie usage, security practices, and your privacy rights under India's DPDP Act."
        ogType="website"
      />

      <main>
        {/* Hero */}
        <section className="relative h-[75vh] sm:h-[65vh] md:h-[70vh] lg:h-[70vh] overflow-hidden bg-[#0F1221]">
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.png"
              alt="Calm living room showcasing CALYCO colours"
              className="h-full w-full object-cover brightness-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center flex items-center justify-center h-full">
            <div>
            <h1 className="text-4xl font-semibold text-white leading-tight md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-white/90 text-base md:text-lg">
              Your data protection is our priority
            </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className={`${sectionPad} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12 text-center`}>
          <h2 className="text-3xl font-bold mb-6 text-[#0F1221]">Introduction & Scope</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-[#23263a]">
            This policy applies to visitors, customers, partners, and suppliers interacting with CALYCO across digital properties, customer support, and offline order fulfilment. We process personal data as data fiduciaries under the Digital Personal Data Protection Act (India) and adhere to GDPR principles for international users.
          </p>
        </section>

        {/* Data collection */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-6 text-[#0F1221] text-center">Data We Collect</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {dataCollection.map((item) => (
              <div key={item.title} className="rounded-xl border border-[#0F1221]/15 bg-white p-7 shadow-sm hover:shadow transition">
                <h3 className="text-lg font-semibold text-[#0F1221]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use of data */}
        <section className={`${sectionPadTight} bg-white max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-6 text-[#0F1221] text-center">How We Use Your Information</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {useOfData.map((item) => (
              <div key={item.title} className="rounded-xl border border-[#0F1221]/15 bg-[#FBF9F6] p-7 shadow-sm hover:shadow transition">
                <h3 className="text-lg font-semibold text-[#0F1221]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Data sharing */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-6 text-[#0F1221] text-center">Data Sharing & Disclosure</h2>
          <p className="text-center mb-6 text-[#23263a] max-w-3xl mx-auto leading-relaxed">
            We never sell personal data. Information is shared only with trusted partners under contractual safeguards or when required by law.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {dataSharing.map((item) => (
              <div key={item.title} className="rounded-xl border border-[#0F1221]/15 bg-white p-7 shadow-sm hover:shadow transition">
                <h3 className="text-lg font-semibold text-[#0F1221]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cookies */}
        <section className={`${sectionPadTight} bg-white max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[#0F1221]">Cookie Policy</h2>
              <p className="text-base text-[#23263a] leading-relaxed max-w-3xl">
                We use cookies to personalise your experience, understand usage patterns, and show relevant offers. Manage preferences via the cookie banner or browser settings.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {cookieTypes.map((cookie) => (
                <div key={cookie.title} className="rounded-xl border border-[#0F1221]/15 bg-[#FBF9F6] p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-[#0F1221]">{cookie.title}</h3>
                  <p className="mt-1 text-sm text-[#23263a]">{cookie.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-6 text-[#0F1221] text-center">Data Security & Retention</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[#0F1221]/15 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Security Measures</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-[#23263a]">
                {securityMeasures.map((measure) => (
                  <li key={measure}>{measure}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#0F1221]/15 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Retention Policy</h3>
              <p className="text-sm text-[#23263a] leading-relaxed">
                Personal data is retained only as long as necessary to fulfil the purpose collected, comply with statutory obligations, resolve disputes, and enforce agreements. We anonymise or delete data once retention requirements lapse.
              </p>
            </div>
          </div>
        </section>

        {/* User rights */}
        <section className={`${sectionPadTight} bg-white max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-6 text-[#0F1221] text-center">Your Rights & Choices</h2>
          <p className="text-lg text-[#23263a] mb-8 max-w-3xl mx-auto leading-relaxed text-center">
            We respond to verified requests within statutory timelines. Use the data request form below to exercise your rights.
          </p>
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {userRights.map((item) => (
              <div key={item.title} className="rounded-xl border border-[#0F1221]/15 bg-[#FBF9F6] p-7 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0F1221]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>

          {/* Data Request Form */}
          <div className="rounded-xl border border-[#0F1221]/15 bg-white p-8 shadow-sm max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-[#0F1221] mb-5 text-center">Request Access, Correction, or Deletion</h3>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-1 text-[#0F1221]">
                  <span className="text-sm font-medium">Full Name</span>
                  <input
                    type="text"
                    className="rounded-lg border border-[#0F1221]/15 px-4 py-2 text-sm outline-none focus:border-[#0F1221] focus:ring-2 focus:ring-[#0F1221]/15"
                    placeholder="Your name"
                  />
                </label>
                <label className="flex flex-col gap-1 text-[#0F1221]">
                  <span className="text-sm font-medium">Email</span>
                  <input
                    type="email"
                    className="rounded-lg border border-[#0F1221]/15 px-4 py-2 text-sm outline-none focus:border-[#0F1221] focus:ring-2 focus:ring-[#0F1221]/15"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1 text-[#0F1221]">
                <span className="text-sm font-medium">Request Type</span>
                <select className="rounded-lg border border-[#0F1221]/15 px-4 py-2 text-sm outline-none focus:border-[#0F1221] focus:ring-2 focus:ring-[#0F1221]/15">
                  <option value="access">Access / Portability</option>
                  <option value="correction">Correction</option>
                  <option value="erasure">Erasure</option>
                  <option value="consent">Withdraw Consent</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-[#0F1221]">
                <span className="text-sm font-medium">Details</span>
                <textarea
                  rows={4}
                  className="resize-none rounded-lg border border-[#0F1221]/15 px-4 py-2 text-sm outline-none focus:border-[#0F1221] focus:ring-2 focus:ring-[#0F1221]/15"
                  placeholder="Provide any reference numbers or additional context."
                />
              </label>
              <button
                type="submit"
                className="mx-auto block rounded-lg bg-[#D4AF37] px-8 py-2 text-sm font-semibold text-[#0F1221] shadow-md hover:bg-[#bb9831] transition border-0"
              >
                Submit Request
              </button>
              <p className="text-center text-xs text-[#23263a]/80 mt-3 max-w-xs mx-auto">
                We may request additional information to verify your identity before processing the request to protect your data.
              </p>
            </form>
          </div>
        </section>

        {/* Contact */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-6 text-[#0F1221] text-center">Privacy & Grievance Contact</h2>
          <p className="text-lg text-[#23263a] mb-8 max-w-3xl mx-auto text-center leading-relaxed">
            For privacy-related queries or grievances, contact us through the following channels. We respond within prescribed timelines under applicable IT rules.
          </p>
          <div className="grid md:grid-cols-2 gap-7 max-w-4xl mx-auto">
            <div className="rounded-xl border border-[#0F1221]/15 bg-white p-7 shadow-sm text-center">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Email</h3>
              <a
                href="mailto:privacy@calycopaints.com"
                className="text-[#23263a] hover:text-[#0F1221] underline break-words"
              >
                privacy@calycopaints.com
              </a>
            </div>
            <div className="rounded-xl border border-[#0F1221]/15 bg-white p-7 shadow-sm text-center">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Contact Us</h3>
              <p className="text-sm text-[#23263a] mb-3">For grievances and urgent privacy concerns</p>
              <a
                href="https://wa.me/918826733064"
                className="text-[#D4AF37] hover:text-[#0F1221] font-semibold underline block mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Message
              </a>
              <p className="text-xs text-[#23263a]/80 leading-relaxed mb-1">
                Please contact us only via WhatsApp message for any grievance or urgent privacy concern.
              </p>
              <p className="text-xs text-[#23263a]/80 leading-relaxed mb-1">
                Phone calls are not accepted on this number.
              </p>
              <p className="text-xs text-[#23263a]/70 mt-2">(Mon–Sat, 10:00 AM – 6:00 PM IST)</p>
            </div>
          </div>
        </section>

        {/* Updates Notice */}
        <section className={`${sectionPadTight} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12 text-center`}>
          <p className="text-sm text-[#23263a]/80 mb-1">
            CALYCO may update this policy periodically. Significant changes will be notified via email or prominent website banners.
          </p>
          <p className="text-xs text-[#23263a]/70">
            Please review this page regularly to stay informed about our privacy practices.
          </p>
          <p className="mt-2 text-sm text-[#0F1221] font-semibold">Effective date: 30 October 2025</p>
        </section>
      </main>
    </div>
  );
}

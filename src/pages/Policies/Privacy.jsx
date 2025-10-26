import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0F1221] font-poppins">
      <SEO
        title="Privacy Policy | CALYCO Paints"
        description="Understand how CALYCO collects, uses, shares, and protects personal data. Review cookie usage, security practices, and your privacy rights under India's DPDP Act."
        ogType="website"
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-28 bg-[#0F1221]">
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.png"
              alt="Calm living room showcasing CALYCO colours"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/35 to-black/20" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center md:px-10 md:py-20 lg:px-12">
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white/85 backdrop-blur mb-6">
              Privacy Policy
            </span>
            <h1 className="text-3xl font-bold text-white md:text-5xl mb-4">
              Protecting Your Data Is Integral to Our Promise
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/90 md:text-lg mb-8">
              This policy explains how CALYCO Paints Private Limited collects, uses, shares, and safeguards personal data in compliance with Indian DPDP, GDPR, and other applicable regulations.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="rounded-xl bg-[#D4AF37] px-8 py-3 text-base font-semibold text-[#0F1221] shadow-lg transition hover:bg-[#bb9831]"
            >
              Contact Privacy Team
            </button>
            <p className="mt-6 text-xs text-white/70">Last updated: 30 October 2025</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-6">Introduction & Scope</h2>
            <p className="text-lg text-[#31274B]/85 mb-4">
              This policy applies to visitors, customers, partners, and suppliers interacting with CALYCO across digital properties, customer support, and offline order fulfilment.
            </p>
            <p className="text-base text-[#31274B]/85">
              We process personal data as data fiduciaries under the Digital Personal Data Protection Act (India) and adhere to GDPR principles for international users.
            </p>
          </div>
        </section>

        {/* Data collection */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Data We Collect</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              We collect only the information required to deliver services, comply with legal obligations, and enhance the CALYCO experience.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {dataCollection.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use of data */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-8">How We Use Your Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {useOfData.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sharing */}
        <section className="py-20 bg-[#FBF9F6]" id="sharing">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Data Sharing & Disclosure</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              We never sell personal data. Information is shared only with trusted partners under contractual safeguards or when required by law.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {dataSharing.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cookies */}
        {/* Cookies */}
<section className="py-20 bg-white" id="cookies">
  <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#4B007D]">Cookie Policy</h2>
        <p className="text-base text-[#31274B]/85">
          We use cookies to personalise your experience, understand usage patterns, and show relevant offers. Manage preferences via the cookie banner or browser settings.
        </p>
      </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {cookieTypes.map((cookie) => (
                  <div key={cookie.title} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-[#4B007D]">{cookie.title}</h3>
                    <p className="mt-2 text-sm text-[#31274B]/80">{cookie.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-8">Data Security & Retention</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Security Measures</h3>
                <ul className="space-y-2 text-sm text-[#31274B]/85">
                  {securityMeasures.map((measure) => (
                    <li key={measure} className="flex items-start">
                      <span className="text-[#D4AF37] mr-2">•</span>
                      <span>{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Retention Policy</h3>
                <p className="text-sm text-[#31274B]/85">
                  Personal data is retained only as long as necessary to fulfil the purpose collected, comply with statutory obligations, resolve disputes, and enforce agreements. We anonymise or delete data once retention requirements lapse.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User rights */}
        <section className="py-20 bg-white" id="rights">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Your Rights & Choices</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              We respond to verified requests within statutory timelines. Use the data request form to exercise your rights.
            </p>
            <div className="grid gap-4 md:grid-cols-2 mb-10">
              {userRights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>

            {/* Data Request Form */}
            <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-[#4B007D] mb-6">Request Access, Correction, or Deletion</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[#4B007D]">Full Name</span>
                    <input
                      type="text"
                      className="rounded-xl border border-[#0F1221]/15 px-4 py-3 text-sm text-[#0F1221] outline-none focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[#4B007D]">Email</span>
                    <input
                      type="email"
                      className="rounded-xl border border-[#0F1221]/15 px-4 py-3 text-sm text-[#0F1221] outline-none focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#4B007D]">Request Type</span>
                  <select className="rounded-xl border border-[#0F1221]/15 px-4 py-3 text-sm text-[#0F1221] outline-none focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20">
                    <option value="access">Access / Portability</option>
                    <option value="correction">Correction</option>
                    <option value="erasure">Erasure</option>
                    <option value="consent">Withdraw Consent</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#4B007D]">Details</span>
                  <textarea
                    rows={4}
                    className="resize-none rounded-xl border border-[#0F1221]/15 px-4 py-3 text-sm text-[#0F1221] outline-none focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                    placeholder="Provide any reference numbers or additional context."
                  />
                </label>
                <button type="submit" className="rounded-xl bg-[#D4AF37] px-8 py-3 text-sm font-semibold text-[#0F1221] shadow-sm transition hover:bg-[#bb9831]">
                  Submit Request
                </button>
                <p className="text-xs text-[#31274B]/70">
                  We may request additional information to verify your identity before processing the request to protect your data.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 bg-[#FBF9F6]" id="contact">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Contact & Grievance Officer</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              For privacy-related queries or grievances, contact our designated officer. We respond within the timelines prescribed under the Information Technology (Reasonable Security Practices and Procedures) Rules, 2011.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Email</h3>
                <a href="mailto:privacy@calycopaints.com" className="text-sm text-[#31274B]/85 hover:text-[#4B007D] underline">
                  privacy@calycopaints.com
                </a>
              </div>
              <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Grievance Officer</h3>
                <p className="text-sm text-[#31274B]/85">
                  Rahul Mehra<br />
                  CALYCO Paints Private Limited<br />
                  Sector V, MIDC Industrial Estate<br />
                  Nashik, Maharashtra 422010
                </p>
                <p className="text-sm text-[#31274B]/85 mt-2">
                  Phone: <a href="tel:+919145000100" className="hover:text-[#4B007D]">+91 9145 000 100</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Updates Notice */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12 text-center">
            <p className="text-sm text-[#31274B]/70 mb-2">
              CALYCO may update this policy periodically. Significant changes will be notified via email or prominent website banners.
            </p>
            <p className="text-xs text-[#31274B]/70">
              Please review this page regularly to stay informed about our privacy practices.
            </p>
            <p className="mt-4 text-sm text-[#4B007D] font-semibold">Effective date: 30 October 2025</p>
          </div>
        </section>
      </main>
    </div>
  );
}
